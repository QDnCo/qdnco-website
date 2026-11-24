import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { calculateForecast } from '../site/tools/booking-forecast-engine.js';

const model = JSON.parse(await readFile(new URL('../site/data/booking-forecast-model.json', import.meta.url), 'utf8'));

test('reproduces the strategy handoff three-month reference vector', () => {
  const { input, expectedThreeMonthTotals } = model.referenceVector;
  const actual = calculateForecast(model, {
    ...input,
    unitsLeft: '',
  }).threeMonthTotals;
  assert.deepEqual({
    leads: actual.leads,
    qualifiedLeads: actual.qualifiedLeads,
    siteVisits: actual.siteVisits,
    bookings: actual.bookings,
  }, expectedThreeMonthTotals);
});

test('supports all-Meta and all-Google scenarios without division errors', () => {
  const base = { budgetInr: 300000, ticketBand: '75l-1.5cr', followUpSpeed: '5min', unitsLeft: '' };
  const metaOnly = calculateForecast(model, { ...base, metaShare: 1 });
  const googleOnly = calculateForecast(model, { ...base, metaShare: 0 });
  assert.ok(metaOnly.monthThree.siteVisits > 0);
  assert.ok(googleOnly.monthThree.siteVisits > 0);
  assert.equal(metaOnly.totals.google.leads, 0);
  assert.equal(googleOnly.totals.meta.leads, 0);
  assert.equal(metaOnly.totals.google.costPerLeadInr, null);
});

test('rejects budgets outside the declared domain and invalid configuration', () => {
  const base = { metaShare: 0.5, ticketBand: '75l-1.5cr', followUpSpeed: '5min', unitsLeft: '' };
  assert.throws(() => calculateForecast(model, { ...base, budgetInr: 0 }), RangeError);
  assert.throws(() => calculateForecast(model, { ...base, budgetInr: 300000, ticketBand: 'unknown' }), RangeError);
  assert.throws(() => calculateForecast(model, { ...base, budgetInr: 300000, metaShare: 1.4 }), RangeError);
});

test('sell-out estimate uses Month 3 bookings pace and validates unit count', () => {
  const result = calculateForecast(model, {
    budgetInr: 300000, metaShare: 0.5, ticketBand: '75l-1.5cr', followUpSpeed: '5min', unitsLeft: 30,
  });
  assert.equal(result.monthsToSellOutAtMonthThreePace, Math.ceil(30 / result.monthThree.bookings));
  assert.throws(() => calculateForecast(model, {
    budgetInr: 300000, metaShare: 0.5, ticketBand: '75l-1.5cr', followUpSpeed: '5min', unitsLeft: 2.5,
  }), RangeError);
});

test('calculator structured data describes visible content and the requested entity types', async () => {
  const html = await readFile(new URL('../site/tools/real-estate-booking-forecast-calculator.html', import.meta.url), 'utf8');
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(jsonLd, 'JSON-LD script exists');
  const graph = JSON.parse(jsonLd[1])['@graph'];
  const types = new Set(graph.map((node) => node['@type']));
  for (const type of ['Organization', 'SoftwareApplication', 'Service', 'BreadcrumbList', 'FAQPage']) assert.ok(types.has(type), `${type} schema is present`);
  const faqNode = graph.find((node) => node['@type'] === 'FAQPage');
  const visibleQuestions = [...html.matchAll(/<details><summary>(.*?)<\/summary>/g)].map((match) => match[1]);
  assert.deepEqual(faqNode.mainEntity.map((item) => item.name), visibleQuestions);
});

test('public model contract and schema are linked from the calculator', async () => {
  const html = await readFile(new URL('../site/tools/real-estate-booking-forecast-calculator.html', import.meta.url), 'utf8');
  const schema = JSON.parse(await readFile(new URL('../site/data/booking-forecast-model.schema.json', import.meta.url), 'utf8'));
  assert.match(html, /href="\.\.\/data\/booking-forecast-model\.json"/);
  assert.match(html, /href="\.\.\/data\/booking-forecast-model\.schema\.json"/);
  assert.equal(schema['$schema'], 'https://json-schema.org/draft/2020-12/schema');
  assert.deepEqual(schema.required, ['modelVersion', 'currency', 'status', 'source', 'limits', 'months', 'channels', 'ticketBands', 'followUpSpeed', 'formula', 'referenceVector']);
});
