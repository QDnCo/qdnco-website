(function (root) {
  'use strict';
  const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  /*
   * Every lead goes to two places at once: the Google Apps Script (Sheet +
   * email alert, the endpoint each caller passes in) and the Vyostra AI CRM.
   * The form id is public by design, the same id Vyostra's own form widget
   * puts in a page; no API key is involved.
   */
  const VYOSTRA = {
    endpoint: 'https://vyostra.com/api/forms/leads',
    formId: 'a60aafd4-1e2d-4c08-a99a-3f9847f684dd',
  };
  // Lead field -> answer label on the Vyostra lead. Vyostra reads name, phone,
  // project and budget from these labels into its own CRM columns.
  const VYOSTRA_LABELS = [
    ['name', 'Name'], ['phone', 'Phone'], ['project', 'Project'], ['catchment', 'Market'],
    ['budget', 'Budget'], ['role', 'Role'], ['service_name', 'Service'], ['quote', 'Quoted fee'],
    ['addons', 'Add-ons'], ['estimate', 'Estimate summary'], ['source', 'Source'],
    ['utm_source', 'UTM source'], ['utm_medium', 'UTM medium'], ['utm_campaign', 'UTM campaign'],
    ['utm_content', 'UTM content'], ['utm_term', 'UTM term'], ['referrer', 'Referrer'],
    ['request_id', 'Request ID'],
  ];

  function context(pageUrl, referrer) {
    const page = new URL(pageUrl);
    const result = { page: page.origin + page.pathname, referrer: '' };
    for (const field of fields) result[field] = (page.searchParams.get(field) || '').trim().slice(0, 200);
    try { result.referrer = referrer ? new URL(referrer).origin : ''; } catch (_) {}
    return result;
  }

  function requestId() {
    if (root.crypto && root.crypto.randomUUID) return root.crypto.randomUUID();
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  async function post(fetcher, url, init, timeoutMs, read) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetcher(url, { ...init, method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'follow', signal: controller.signal });
      if (!response.ok || response.type === 'opaque') throw new Error('receipt_unconfirmed');
      return read(await response.json());
    } finally {
      clearTimeout(timer);
    }
  }

  function sendToSheet(fetcher, endpoint, lead, timeoutMs) {
    const init = { headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead) };
    return post(fetcher, endpoint, init, timeoutMs, (receipt) => {
      if (!receipt || receipt.ok !== true) throw new Error('receipt_unconfirmed');
      if (receipt.request_id && receipt.request_id !== lead.request_id) throw new Error('receipt_mismatch');
      return receipt;
    });
  }

  function vyostraAnswers(lead) {
    const answers = {};
    for (const [field, label] of VYOSTRA_LABELS) {
      if (lead[field]) answers[label] = String(lead[field]).slice(0, 2000);
    }
    return answers;
  }

  function sendToVyostra(fetcher, vyostra, lead, timeoutMs) {
    // Path only: a query string can carry unrelated personal data.
    const page = String(lead.page || '').split(/[?#]/)[0];
    const sourceUrl = page || (root.location ? root.location.origin + '/' : 'https://qdnco.com/');
    const body = JSON.stringify({ formId: vyostra.formId, sourceUrl, customFields: vyostraAnswers(lead) });
    return post(fetcher, vyostra.endpoint, { headers: { 'Content-Type': 'application/json' }, body }, timeoutMs, (reply) => {
      if (!reply || reply.success !== true) throw new Error('crm_unconfirmed');
      return { ok: true, request_id: lead.request_id, via: 'vyostra' };
    });
  }

  /**
   * Sends to the Sheet and to Vyostra in parallel and resolves with the first
   * confirmed receipt, so the visitor waits for the faster one. Rejects only
   * when neither confirms. `options.vyostra: null` sends to the Sheet only.
   */
  async function send(endpoint, lead, options) {
    const settings = options || {};
    const fetcher = settings.fetch || root.fetch.bind(root);
    const timeoutMs = settings.timeoutMs || 25000;
    const vyostra = settings.vyostra === undefined ? VYOSTRA : settings.vyostra;
    const sends = [sendToSheet(fetcher, endpoint, lead, timeoutMs)];
    if (vyostra) sends.push(sendToVyostra(fetcher, vyostra, lead, timeoutMs));
    try {
      return await Promise.any(sends);
    } catch (_) {
      throw new Error('receipt_unconfirmed');
    }
  }

  root.QDLeadCapture = Object.freeze({ context, requestId, send, vyostraAnswers });
})(globalThis);
