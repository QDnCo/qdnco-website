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
const pick = (needs = [], addons = [], market = 'india') => engine.normalise(catalog, { market, needs, addons })

test('catalog ids are unique across needs and add-ons', () => {
  const items = [...catalog.needs, ...catalog.addons]
  assert.equal(new Set(items.map(i => i.id)).size, items.length)
})
test('toggle adds and removes needs and add-ons', () => {
  let s = pick()
  s = engine.toggle(catalog, s, 'needs', 'ads')
  s = engine.toggle(catalog, s, 'addons', 'drone')
  assert.deepEqual(plain(s), { market: 'india', needs: ['ads'], addons: ['drone'] })
  s = engine.toggle(catalog, s, 'needs', 'ads')
  assert.deepEqual(plain(s.needs), [])
})
test('"Not sure yet" is exclusive in both directions', () => {
  let s = pick(['ads', 'follow-up'])
  s = engine.toggle(catalog, s, 'needs', 'unsure')
  assert.deepEqual(plain(s.needs), ['unsure'])
  s = engine.toggle(catalog, s, 'needs', 'launch-page')
  assert.deepEqual(plain(s.needs), ['launch-page'])
})
test('unknown ids and markets are dropped', () => {
  const s = engine.normalise(catalog, { market: 'mars', needs: ['nope', 'ads', 'ads'], addons: ['x'] })
  assert.deepEqual(plain(s), { market: 'india', needs: ['ads'], addons: [] })
})
test('selection survives a URL round trip', () => {
  const s = pick(['ads', 'follow-up'], ['motion'], 'dubai')
  const q = engine.toQuery(s)
  assert.equal(q, '?market=dubai&needs=ads%2Cfollow-up&addons=motion')
  assert.deepEqual(plain(engine.normalise(catalog, engine.fromQuery(q))), plain(s))
})
test('lead carries every field the backend requires, with no invented budget', () => {
  const lead = engine.buildLead(catalog, pick(['ads'], ['drone'], 'dubai'), { name: 'A', phone: '+91 90000 00000', project: '' }, 'about')
  for (const key of ['name', 'phone', 'project', 'catchment', 'budget']) assert.ok(lead[key], key)
  assert.equal(lead.project, 'Project not named · Ads + Drone')
  assert.equal(lead.catchment, 'Dubai'); assert.equal(lead.budget, 'Discuss on call'); assert.equal(lead.source, 'about')
})
test('phone validation matches the backend rule', () => {
  assert.equal(engine.validPhone('+91 90000 00000'), true)
  for (const bad of ['', '1234', 'letters12345678', '+1 234567890123456']) assert.equal(engine.validPhone(bad), false, bad)
})
test('estimate scripts type-check under TypeScript strict mode', () => {
  const files = ['types.d.ts', 'catalog.js', 'engine.js', 'widget.js', 'embed.js'].map(f => new URL(f, dir).pathname)
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
