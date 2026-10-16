import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'

const dir = new URL('../site/js/estimate/', import.meta.url)
const read = name => fs.readFileSync(new URL(name, dir), 'utf8')
const ctx = vm.createContext({ URLSearchParams })
vm.runInContext(read('catalog.js'), ctx)
vm.runInContext(read('engine.js'), ctx)
const catalog = ctx.QDEstimateCatalog
const engine = ctx.QDEstimate
const plain = value => JSON.parse(JSON.stringify(value))
const sel = (over = {}) => engine.normalise(catalog, { role: 'developer', service: 'ads', ...over })
const price = over => engine.quote(catalog, sel(over))

// Developer / mandate rates come from the original QDnCo New calculator.
// Channel partner in India is a flat ₹45,000 per campaign (owner, 16 Oct 2026).
// Dubai keeps the original AED figures for both roles.
const cpLegacy = [54000, 48600, 45600, 45600, 43200], dev = [78000, 70200, 66000, 66000, 62400]
const legacyInr = (role, n) => (role === 'channel-partner' ? 45000 : dev[Math.min(n, 5) - 1])
const legacyAed = (role, n) => Math.round((role === 'channel-partner' ? cpLegacy : dev)[Math.min(n, 5) - 1] * 4650 / cpLegacy[0])

test('India rates: developer tiers as before, channel partner flat ₹45,000', () => {
  for (const role of ['developer', 'mandate', 'channel-partner']) {
    for (let n = 1; n <= 5; n++) {
      const q = price({ role, count: n })
      assert.equal(q.priced, true); assert.equal(q.currency, 'INR')
      assert.equal(q.perUnit, legacyInr(role, n), `${role} x${n}`)
      assert.equal(q.total, legacyInr(role, n) * n)
      assert.equal(q.flat, role === 'channel-partner')
    }
  }
})
test('Dubai rates are the INR rate x 4,650 / 54,000 in AED per project', () => {
  for (const role of ['developer', 'channel-partner']) {
    for (let n = 1; n <= 5; n++) {
      const q = price({ role, count: n, market: 'dubai' })
      assert.equal(q.currency, 'AED'); assert.equal(q.unit, 'project')
      assert.equal(q.perUnit, legacyAed(role, n), `${role} x${n}`)
    }
  }
  assert.equal(price({ role: 'channel-partner', market: 'dubai' }).roleLabel, 'Realtor / Channel partner')
})
test('5 is shown as 5+ and its total is a floor', () => {
  const q = price({ count: 9 })
  assert.equal(q.count, 5); assert.equal(q.countLabel, '5+'); assert.equal(q.isFloor, true)
  assert.equal('tiers' in q, false, 'no per-volume price table is exposed')
})
test('only Meta/Google ads for client roles get a price', () => {
  assert.deepEqual(plain(price({ service: 'crm' })), { priced: false, isClient: true, roleLabel: 'Developer' })
  assert.deepEqual(plain(price({ role: 'press' })), { priced: false, isClient: false, roleLabel: 'Media / press' })
})
test('the gate lead carries contact and market but no price', () => {
  const lead = engine.buildGateLead(catalog, 'dubai', { name: 'A', phone: '+971 50 000 0000' }, 'home:pricing')
  for (const key of ['name', 'phone', 'project', 'catchment', 'budget']) assert.ok(lead[key], key)
  assert.equal(lead.project, 'Opened the pricing calculator'); assert.equal(lead.catchment, 'Dubai')
  assert.equal(/₹|AED/.test(JSON.stringify(lead)), false)
})
test('money formats per market', () => {
  assert.equal(engine.formatMoney('INR', 140400), '₹1,40,400')
  assert.equal(engine.formatMoney('AED', 6717), 'AED 6,717')
})
test('lead carries the exact quote and every field the backend requires', () => {
  const lead = engine.buildLead(catalog, sel({ count: 2, addons: ['drone'] }), { name: 'A', phone: '+91 90000 00000', project: 'Skyline' }, 'about')
  for (const key of ['name', 'phone', 'project', 'catchment', 'budget']) assert.ok(lead[key], key)
  assert.equal(lead.project, 'Skyline · Developer · Meta/Google Ad Campaigns · 2 campaigns · ₹70,200/campaign/mo · + Drone')
  assert.equal(lead.catchment, 'India'); assert.equal(lead.budget, 'Discuss on call')
})
test('selection survives a URL round trip; legacy ?dubai still opens Dubai', () => {
  const s = sel({ market: 'dubai', role: 'channel-partner', count: 3, addons: ['motion'] })
  assert.deepEqual(plain(engine.normalise(catalog, engine.fromQuery(engine.toQuery(s)))), plain(s))
  assert.equal(engine.fromQuery('?dubai').market, 'dubai')
})
test('unknown ids fall back to defaults; add-ons toggle', () => {
  const s = engine.normalise(catalog, { market: 'mars', role: 'x', service: 'y', count: 0, addons: ['ugc', 'ugc', 'nope'] })
  assert.deepEqual(plain(s), { market: 'india', role: 'developer', service: 'ads', count: 1, addons: ['ugc'] })
  assert.deepEqual(plain(engine.toggleAddon(s, 'ugc').addons), [])
})
test('time zone picks the default market; elsewhere falls back to the page', () => {
  assert.equal(engine.marketFromTimeZone('Asia/Dubai'), 'dubai')
  assert.equal(engine.marketFromTimeZone('Asia/Kolkata'), 'india')
  assert.equal(engine.marketFromTimeZone('Asia/Calcutta'), 'india')
  assert.equal(engine.marketFromTimeZone('Europe/London'), null)
  assert.equal(engine.marketFromTimeZone(''), null)
})
test('phone validation matches the backend rule', () => {
  assert.equal(engine.validPhone('+91 90000 00000'), true)
  for (const bad of ['', '1234', 'letters12345678', '+1 234567890123456']) assert.equal(engine.validPhone(bad), false, bad)
})
test('estimate scripts type-check under TypeScript strict mode', () => {
  const files = ['types.d.ts', 'catalog.js', 'engine.js', 'listbox.js', 'widget.js', 'embed.js'].map(f => new URL(f, dir).pathname)
  const program = ts.createProgram(files, {
    allowJs: true, checkJs: true, strict: true, noEmit: true,
    target: ts.ScriptTarget.ES2022, lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    types: [],
  })
  const diagnostics = ts.getPreEmitDiagnostics(program).map(d => {
    const where = d.file ? `${d.file.fileName.split('/').pop()}:${d.file.getLineAndCharacterOfPosition(d.start || 0).line + 1}` : ''
    return `${where} ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`
  })
  assert.deepEqual(diagnostics, [])
})
