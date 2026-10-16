/**
 * QDnCo lead capture. Existing seven columns are preserved; receipt/source
 * columns are appended. Sheet persistence and email-alert status are separate.
 *
 * Update the existing Apps Script project, then edit its existing Web app
 * deployment to a new version so the website /exec URL remains unchanged.
 * Verify the deployed version using GET, then a labelled owner test enquiry.
 * Never place account passwords or private API credentials in this file.
 *
 * Every saved lead is also forwarded to the Vyostra AI CRM. Set two Script
 * Properties: VYOSTRA_API_URL (https://vyostra.com, the public API host; no
 * trailing slash) and VYOSTRA_FORM_ID (the "QDnCo website" form in Vyostra).
 * Without both, forwarding is skipped and the Vyostra column says so.
 */
var NOTIFY_EMAIL = 'qdnco01@gmail.com';
var SHEET_NAME = 'Leads';
var PROPS = PropertiesService.getScriptProperties();
var SHEET_ID = PROPS.getProperty('SHEET_ID');
var LEAD_VERSION = '2026-10-16-vyostra-v1';
var FIELDS = ['submitted', 'name', 'phone', 'project', 'catchment', 'budget', 'page',
  'request_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'referrer', 'notification', 'services', 'addons', 'estimate', 'source',
  'role', 'service_name', 'quote', 'vyostra'];
// Optional context sent by the estimate widget (site/js/estimate/). Never required.
var OPTIONAL_FIELDS = ['services', 'addons', 'estimate', 'source', 'role', 'service_name', 'quote'];
// Sheet field -> the answer label stored on the Vyostra lead. Vyostra reads
// name, phone, project and budget from these labels into its own columns.
var VYOSTRA_LABELS = [
  ['name', 'Name'], ['phone', 'Phone'], ['project', 'Project'], ['catchment', 'Market'],
  ['budget', 'Budget'], ['role', 'Role'], ['service_name', 'Service'], ['quote', 'Quoted fee'],
  ['addons', 'Add-ons'], ['estimate', 'Estimate summary'], ['source', 'Source'],
  ['utm_source', 'UTM source'], ['utm_medium', 'UTM medium'], ['utm_campaign', 'UTM campaign'],
  ['request_id', 'Request ID']];

function book() {
  // Never fall back to a different workbook after a target/access error.
  return SpreadsheetApp.openById(SHEET_ID);
}

function textField(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function sheetText(value) {
  var text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function campaignTag(input, field) {
  if (input[field] != null) return textField(input[field], 200);
  // The still-live legacy form sends tags inside page, not separate fields.
  // Extract only the five allowed tags before discarding unrelated query data.
  var page = textField(input.page, 8000).split('#')[0];
  var queryAt = page.indexOf('?');
  if (queryAt < 0 || !/^https?:\/\//i.test(page)) return '';
  var pairs = page.slice(queryAt + 1).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var equalAt = pairs[i].indexOf('=');
    var key = equalAt < 0 ? pairs[i] : pairs[i].slice(0, equalAt);
    var value = equalAt < 0 ? '' : pairs[i].slice(equalAt + 1);
    try {
      if (decodeURIComponent(key.replace(/\+/g, ' ')) === field) {
        return textField(decodeURIComponent(value.replace(/\+/g, ' ')), 200);
      }
    } catch (err) { /* Ignore a malformed pair; the enquiry is still valid. */ }
  }
  return '';
}

function cleanLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('invalid_input');
  var lead = {};
  ['name', 'phone', 'project', 'catchment', 'budget'].forEach(function (field) {
    lead[field] = textField(input[field], field === 'phone' ? 40 : 200);
    if (!lead[field]) throw new Error('missing_field');
  });
  var digits = lead.phone.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15 || !/^[+0-9\s().-]+$/.test(lead.phone)) throw new Error('invalid_phone');
  lead.submitted = new Date().toISOString(); // server time, never an untrusted client timestamp
  lead.request_id = textField(input.request_id || Utilities.getUuid(), 80);
  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(lead.request_id)) throw new Error('invalid_receipt');
  // URL query strings can contain unrelated personal data. Keep only the page path.
  lead.page = textField(input.page, 1000).split(/[?#]/)[0];
  if (lead.page && !/^https?:\/\//i.test(lead.page)) lead.page = '';
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (field) {
    lead[field] = campaignTag(input, field);
  });
  var origin = textField(input.referrer, 1000).match(/^https?:\/\/[^/?#]+/i);
  lead.referrer = origin ? origin[0] : '';
  lead.notification = 'pending';
  lead.vyostra = 'pending';
  OPTIONAL_FIELDS.forEach(function (field) { lead[field] = textField(input[field], 300); });
  return lead;
}

function leadSheet() {
  var ss = book();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (!sheet.getLastRow()) {
    sheet.appendRow(FIELDS.map(function (field) { return field.charAt(0).toUpperCase() + field.slice(1); }));
    sheet.setFrozenRows(1);
  }
  var columns = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(function (field) { return String(field).trim().toLowerCase(); });
  // Detect a different sheet format instead of writing a lead into wrong columns.
  FIELDS.slice(0, 7).forEach(function (field, index) {
    if (columns[index] !== field) throw new Error('unexpected_headers');
  });
  var missing = FIELDS.filter(function (field) { return columns.indexOf(field) === -1; });
  if (missing.length) {
    sheet.getRange(1, columns.length + 1, 1, missing.length).setValues([
      missing.map(function (field) { return field.charAt(0).toUpperCase() + field.slice(1); })
    ]);
    columns = columns.concat(missing);
  }
  return { sheet: sheet, columns: columns };
}

function notifyLead(lead) {
  var body = FIELDS.filter(function (field) { return field !== 'notification' && field !== 'vyostra'; })
    .map(function (field) { return field + ': ' + (lead[field] || '-'); }).join('\n');
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New website enquiry — ' + (lead.project || lead.name),
    body: body + '\n\nContact phone: ' + lead.phone + '\n',
  });
}

function vyostraAnswers(lead) {
  var answers = {};
  VYOSTRA_LABELS.forEach(function (pair) {
    if (lead[pair[0]]) answers[pair[1]] = String(lead[pair[0]]);
  });
  return answers;
}

// Sends the lead to the Vyostra AI form-submit endpoint, the one its form
// widget uses, so it lands in the CRM with the WhatsApp alert and CRM sync.
// Returns the status written to the Sheet; never throws.
function forwardToVyostra(lead) {
  var apiUrl = PROPS.getProperty('VYOSTRA_API_URL');
  var formId = PROPS.getProperty('VYOSTRA_FORM_ID');
  if (!apiUrl || !formId) return 'not_configured';
  try {
    var response = UrlFetchApp.fetch(apiUrl.replace(/\/+$/, '') + '/api/forms/leads', {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify({ formId: formId, sourceUrl: lead.page || 'https://qdnco.com/', customFields: vyostraAnswers(lead) }),
    });
    var code = response.getResponseCode();
    if (code === 201) return 'sent';
    console.error('vyostra_forward_rejected', code, lead.request_id);
    return 'failed_' + code;
  } catch (err) {
    console.error('vyostra_forward_failed', lead.request_id);
    return 'failed';
  }
}

function setStatus(record, rowNumber, field, value) {
  try {
    record.sheet.getRange(rowNumber, record.columns.indexOf(field) + 1).setValue(value);
  } catch (err) {
    console.error('lead_status_write_failed', field, rowNumber);
  }
}

function doPost(e) {
  var lead;
  try {
    if (!e || !e.postData || typeof e.postData.contents !== 'string' || e.postData.contents.length > 12000) {
      return json({ ok: false, error: 'invalid_request' });
    }
    lead = cleanLead(JSON.parse(e.postData.contents));
  } catch (err) {
    return json({ ok: false, error: 'invalid_request' });
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return json({ ok: false, error: 'busy_retry' });
  var record, rowNumber;
  try {
    record = leadSheet();
    var sheet = record.sheet, columns = record.columns;
    var last = sheet.getLastRow();
    if (last >= 2) {
      var start = Math.max(2, last - 99);
      var recent = sheet.getRange(start, 1, last - start + 1, columns.length).getValues();
      var now = Date.now();
      for (var i = 0; i < recent.length; i++) {
        var row = recent[i];
        var sameReceipt = String(row[columns.indexOf('request_id')] || '') === lead.request_id;
        var age = now - new Date(row[0]).getTime();
        var sameSubmission = String(row[2]).replace(/\D/g, '') === lead.phone.replace(/\D/g, '') &&
          String(row[3]).replace(/^'/, '') === lead.project && age >= 0 && age < 10 * 60 * 1000;
        if (sameReceipt || sameSubmission) return json({ ok: true, duplicate: true, request_id: lead.request_id });
      }
    }
    sheet.appendRow(columns.map(function (field) { return sheetText(lead[field] || ''); }));
    SpreadsheetApp.flush();
    rowNumber = sheet.getLastRow();
  } catch (err) {
    // Log the failure category without logging submitted personal details.
    console.error('lead_persistence_failed', lead.request_id);
    return json({ ok: false, error: 'capture_unavailable' });
  } finally {
    lock.releaseLock();
  }

  var notified = false;
  try {
    notifyLead(lead);
    notified = true;
  } catch (err) {
    console.error('lead_alert_failed', lead.request_id);
  }
  setStatus(record, rowNumber, 'notification', notified ? 'sent' : 'failed');
  setStatus(record, rowNumber, 'vyostra', forwardToVyostra(lead));
  // A failed email or CRM forward does not erase or falsely reject an enquiry saved in the Sheet.
  return json({ ok: true, request_id: lead.request_id, notification_sent: notified });
}

function doGet() {
  return json({ ok: true, service: 'QDnCo lead capture', version: LEAD_VERSION });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
