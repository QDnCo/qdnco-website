import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'

const backend = fs.readFileSync(new URL('../apps-script/lead-backend.gs', import.meta.url), 'utf8')
const client = fs.readFileSync(new URL('../public/js/lead-capture.js', import.meta.url), 'utf8')
const base = { name: 'Local test', phone: '+91 90000 00000', project: 'TEST ONLY', catchment: 'Bengaluru', budget: 'Not decided yet', page: 'https://qdnco.com/?email=private@example.com', request_id: 'local-test-0001' }
function harness(options = {}) {
  const rows = options.rows ? structuredClone(options.rows) : []
  const emails = []
  let released = 0
  const sheet = {
    getLastRow: () => rows.length,
    getLastColumn: () => rows[0]?.length || 0,
    appendRow: values => { if (options.saveFail) throw new Error('test'); rows.push([...values]) },
    setFrozenRows: () => {},
    getRange: (r, c, n = 1, m = 1) => ({
      getValues: () => Array.from({ length: n }, (_, y) => Array.from({ length: m }, (_, x) => rows[r - 1 + y]?.[c - 1 + x] ?? '')),
      setValues: values => values.forEach((row, y) => row.forEach((value, x) => { (rows[r - 1 + y] ||= [])[c - 1 + x] = value })),
      setValue: value => { rows[r - 1][c - 1] = value },
    }),
  }
  const ctx = vm.createContext({
    console: { error() {} }, Date, JSON,
    Utilities: { getUuid: () => 'generated-test-uuid' },
    LockService: { getScriptLock: () => ({ tryLock: () => !options.busy, releaseLock: () => released++ }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => key === 'SHEET_ID' ? 'test-sheet-id' : null }) },
    SpreadsheetApp: { openById: id => { assert.equal(id, 'test-sheet-id'); if (options.bookFail) throw new Error('denied'); return { getSheetByName: () => sheet, insertSheet: () => sheet } }, flush() {} },
    MailApp: { sendEmail: mail => { if (options.mailFail) throw new Error('quota'); emails.push(mail) } },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: content => ({ setMimeType: () => JSON.parse(content) }) },
  })
  vm.runInContext(backend, ctx)
  return { rows, emails, submit: lead => ctx.doPost({ postData: { contents: typeof lead === 'string' ? lead : JSON.stringify(lead) } }), released: () => released }
}

test('invalid or missing fields never write a sheet or email', () => {
  const h = harness()
  for (const input of ['{', {}, { ...base, phone: 'letters12345678' }, { ...base, request_id: 'bad' }, 'x'.repeat(12001)]) assert.equal(h.submit(input).ok, false)
  assert.equal(h.rows.length, 0); assert.equal(h.emails.length, 0)
})
test('a valid enquiry is recorded once and emailed to the website business address', () => {
  const h = harness(); const result = h.submit({ ...base, submitted: '1900-01-01', utm_source: 'instagram', referrer: 'https://instagram.com/account?token=private' })
  assert.equal(result.ok, true); assert.equal(result.notification_sent, true)
  assert.equal(h.rows.length, 2); assert.equal(h.emails.length, 1)
  assert.equal(h.emails[0].to, 'qdnco01@gmail.com')
  assert.equal(h.rows[1][6], 'https://qdnco.com/'); assert.equal(h.rows[1][8], 'instagram')
  assert.equal(h.rows[1][13], 'https://instagram.com'); assert.equal(h.rows[1][14], 'sent')
  assert.notEqual(h.rows[1][0], '1900-01-01'); assert.equal(h.released(), 1)
})
test('retries are idempotent; same phone can enquire about another project', () => {
  const h = harness(); h.submit(base)
  assert.equal(h.submit(base).duplicate, true)
  assert.equal(h.submit({ ...base, request_id: 'local-test-0002' }).duplicate, true)
  assert.equal(h.rows.length, 2); assert.equal(h.emails.length, 1)
  assert.equal(h.submit({ ...base, project: 'Another project', request_id: 'local-test-0003' }).ok, true)
  assert.equal(h.rows.length, 3); assert.equal(h.emails.length, 2)
})
test('legacy page URL retains allowed campaign tags without leaking unrelated query data', () => {
  const h = harness()
  const result = h.submit({ ...base, page: 'https://qdnco.com/?email=private@example.com&utm_source=instagram&utm_medium=organic+social&utm_campaign=portfolio%3Dtest&utm_content=%ZZ&utm_term=channel%20partners#secret' })
  assert.equal(result.ok, true)
  assert.deepEqual(h.rows[1].slice(8, 13), ['instagram', 'organic social', 'portfolio=test', '', 'channel partners'])
  assert.equal(JSON.stringify(h.rows).includes('private@example.com'), false)
  assert.equal(h.emails[0].body.includes('private@example.com'), false)
  const newer = harness()
  newer.submit({ ...base, page: 'https://qdnco.com/?utm_source=legacy', utm_source: 'explicit' })
  assert.equal(newer.rows[1][8], 'explicit')
})
test('legacy seven-column sheet is extended without changing old row values', () => {
  const original = ['2020-01-01', 'Old record', '12345678', 'Historical', 'Area', 'Band', 'https://qdnco.com/']
  const h = harness({ rows: [['Submitted', 'Name', 'Phone', 'Project', 'Catchment', 'Budget', 'Page'], original] })
  assert.equal(h.submit(base).ok, true)
  assert.deepEqual(h.rows[1], original); assert.equal(h.rows[0].length, 19)
})
test('formula-shaped inputs are stored as text', () => {
  const h = harness(); assert.equal(h.submit({ ...base, name: '=1+1' }).ok, true)
  assert.equal(h.rows[1][1], "'=1+1")
})
test('estimate widget context is stored and emailed but never required', () => {
  const h = harness(); const extra = { services: 'phase-0,crm', addons: 'drone', estimate: 'Phase 0, CRM + Drone', source: 'about' }
  assert.equal(h.submit({ ...base, ...extra }).ok, true)
  assert.deepEqual(h.rows[1].slice(15, 19), Object.values(extra))
  assert.ok(h.emails[0].body.includes('estimate: Phase 0, CRM + Drone'))
  const plain = harness(); assert.equal(plain.submit(base).ok, true); assert.deepEqual(plain.rows[1].slice(15, 19), ['', '', '', ''])
})
test('mail failure preserves the lead and records alert failure', () => {
  const h = harness({ mailFail: true }); const result = h.submit(base)
  assert.equal(result.ok, true); assert.equal(result.notification_sent, false)
  assert.equal(h.rows.length, 2); assert.equal(h.rows[1][14], 'failed')
})
test('busy, wrong headers and sheet-access errors never claim acceptance', () => {
  for (const options of [{ busy: true }, { bookFail: true }, { saveFail: true }, { rows: [['Wrong header']] }]) {
    const h = harness(options); assert.equal(h.submit(base).ok, false); assert.equal(h.emails.length, 0)
  }
})

const ctx = vm.createContext({ URL, AbortController, setTimeout, clearTimeout, Date, Math, crypto: { randomUUID: () => 'test-request-id' } })
vm.runInContext(client, ctx)
const api = ctx.QDLeadCapture

test('attribution keeps campaign tags and referring origin, not unrelated URL data', () => {
  const value = api.context('https://qdnco.com/?utm_source=instagram&email=private%40example.com#secret', 'https://example.com/person?token=private')
  assert.equal(value.page, 'https://qdnco.com/'); assert.equal(value.utm_source, 'instagram'); assert.equal(value.referrer, 'https://example.com')
  assert.equal(JSON.stringify(value).includes('private'), false)
})
test('client requires a readable positive acknowledgement; old positive replies remain compatible', async () => {
  const accepted = await api.send('https://example.test/', base, { fetch: async (_url, request) => {
    assert.equal(request.mode, 'cors'); assert.equal(request.credentials, 'omit')
    return { ok: true, json: async () => ({ ok: true }) }
  } })
  assert.equal(accepted.ok, true)
  for (const response of [{ ok: false }, { ok: true, type: 'opaque' }, { ok: true, json: async () => ({ ok: false }) }, { ok: true, json: async () => ({ ok: true, request_id: 'wrong' }) }, { ok: true, json: async () => { throw new Error('not json') } }]) {
    await assert.rejects(api.send('https://example.test/', base, { fetch: async () => response }))
  }
})
test('a stalled request aborts instead of reporting success', async () => {
  await assert.rejects(api.send('https://example.test/', base, { timeoutMs: 5, fetch: async (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')))) }))
})
test('editable homepage JSX sources are syntactically complete', () => {
  for (const name of ['public/v4-final.html', '_jsx-source/index.html', '_jsx-source/dubai__index.html']) {
    const html = fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8')
    const script = html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/)?.[1]
    assert.ok(script); assert.ok(html.trim().endsWith('</html>'))
    const tree = ts.createSourceFile(name + '.jsx', script, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX)
    assert.deepEqual(tree.parseDiagnostics.map(x => ts.flattenDiagnosticMessageText(x.messageText, '\n')), [])
    assert.ok(html.includes('/js/lead-capture.js'))
  }
})

const VYOSTRA_URL = 'https://vyostra.com/api/forms/leads'
const quoted = { ...base, role: 'Developer', service_name: 'Meta/Google Ad Campaigns', quote: '₹78,000/campaign/mo', source: 'about' }
function router(sheetReply, crmReply, calls = []) {
  return async (url, request) => {
    calls.push({ url, request })
    const reply = url === VYOSTRA_URL ? crmReply : sheetReply
    if (reply instanceof Error) throw reply
    return { ok: true, json: async () => reply }
  }
}

test('every lead goes to the Sheet and to the Vyostra form, with the quote as labelled answers', async () => {
  const calls = []
  await api.send('https://sheet.test/', quoted, { fetch: router({ ok: true }, { success: true }, calls) })
  assert.deepEqual(calls.map(c => c.url).sort(), ['https://sheet.test/', VYOSTRA_URL])
  const crm = calls.find(c => c.url === VYOSTRA_URL)
  assert.equal(crm.request.headers['Content-Type'], 'application/json'); assert.equal(crm.request.credentials, 'omit')
  const body = JSON.parse(crm.request.body)
  assert.equal(body.formId, 'a60aafd4-1e2d-4c08-a99a-3f9847f684dd')
  assert.equal(body.sourceUrl, 'https://qdnco.com/')
  assert.equal(body.customFields.Name, base.name); assert.equal(body.customFields.Phone, base.phone)
  assert.equal(body.customFields['Quoted fee'], '₹78,000/campaign/mo'); assert.equal(body.customFields.Service, 'Meta/Google Ad Campaigns')
  assert.equal(body.customFields['Request ID'], base.request_id); assert.equal('Estimate summary' in body.customFields, false)
})
test('one confirmed destination is enough; the visitor sees an error only when both fail', async () => {
  assert.equal((await api.send('https://sheet.test/', base, { fetch: router(new Error('down'), { success: true }) })).via, 'vyostra')
  assert.equal((await api.send('https://sheet.test/', base, { fetch: router({ ok: true }, { success: false }) })).ok, true)
  await assert.rejects(api.send('https://sheet.test/', base, { fetch: router({ ok: false }, new Error('down')) }), /receipt_unconfirmed/)
})
test('vyostra: null sends to the Sheet only', async () => {
  const calls = []
  await api.send('https://sheet.test/', base, { vyostra: null, fetch: router({ ok: true }, { success: true }, calls) })
  assert.deepEqual(calls.map(c => c.url), ['https://sheet.test/'])
})
