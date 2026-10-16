// @ts-check
/**
 * Estimate engine: pure functions, no DOM. Turns a selection (market, role,
 * service, campaign count, add-ons) into a price quote, URL state and the
 * lead the backend stores. Unit-tested in tests/estimate.test.mjs.
 */
(function (root) {
  'use strict';

  /** @typedef {import('./types').EstimateCatalog} Catalog */
  /** @typedef {import('./types').Selection} Selection */
  /** @typedef {import('./types').Quote} Quote */
  /** @typedef {import('./types').Role} Role */

  /** Tier rows shown under the price: label and the rate index they use. */
  const TIERS = /** @type {Array<[string, number]>} */ ([['1', 0], ['2', 1], ['3–4', 2], ['5+', 4]]);

  /**
   * @param {Catalog} catalog
   * @param {Partial<Selection>} raw
   * @returns {Selection}
   */
  function normalise(catalog, raw) {
    const market = raw.market && raw.market in catalog.markets ? raw.market : 'india';
    const role = catalog.roles.some((r) => r.id === raw.role) ? String(raw.role) : catalog.roles[0].id;
    const service = catalog.services.some((s) => s.id === raw.service) ? String(raw.service) : catalog.services[0].id;
    const count = Math.min(catalog.maxCount, Math.max(1, Math.round(Number(raw.count) || 1)));
    const ids = (raw.addons || []).filter((id) => catalog.addons.some((a) => a.id === id));
    return { market, role, service, count, addons: ids.filter((id, i) => ids.indexOf(id) === i) };
  }

  /**
   * @param {Selection} selection
   * @param {string} id
   * @returns {Selection}
   */
  function toggleAddon(selection, id) {
    const has = selection.addons.indexOf(id) >= 0;
    return { ...selection, addons: has ? selection.addons.filter((a) => a !== id) : selection.addons.concat(id) };
  }

  /**
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @returns {Role}
   */
  function roleOf(catalog, selection) {
    return catalog.roles.find((r) => r.id === selection.role) || catalog.roles[0];
  }

  /**
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @returns {string}
   */
  function roleLabel(catalog, selection) {
    const role = roleOf(catalog, selection);
    return selection.market === 'dubai' && role.dubaiLabel ? role.dubaiLabel : role.label;
  }

  /**
   * Monthly rates for a role in the selected market's currency.
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @param {import('./types').RateKey} rateKey
   * @returns {number[]}
   */
  function ratesFor(catalog, selection, rateKey) {
    const inr = catalog.rates[rateKey];
    if (selection.market !== 'dubai') return inr;
    return inr.map((r) => Math.round((r * catalog.dubai.aedBase) / catalog.dubai.inrBase));
  }

  /**
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @returns {Quote}
   */
  function quote(catalog, selection) {
    const role = roleOf(catalog, selection);
    const service = catalog.services.find((s) => s.id === selection.service);
    const isClient = role.group === 'client';
    if (!isClient || !role.rateKey || !service || !service.priced) return { priced: false, isClient, roleLabel: roleLabel(catalog, selection) };
    const rates = ratesFor(catalog, selection, role.rateKey);
    const n = selection.count;
    const perUnit = rates[Math.min(n, rates.length) - 1];
    return {
      priced: true,
      market: selection.market,
      currency: selection.market === 'dubai' ? 'AED' : 'INR',
      roleLabel: roleLabel(catalog, selection),
      perUnit,
      total: perUnit * n,
      count: n,
      countLabel: n >= catalog.maxCount ? catalog.maxCount + '+' : String(n),
      unit: selection.market === 'dubai' ? 'project' : 'campaign',
      isFloor: n >= catalog.maxCount,
      tiers: TIERS.map(([label, index]) => ({ label, amount: rates[index] })),
      mediaTotal: catalog.mediaPerCampaign[selection.market] ? Number(catalog.mediaPerCampaign[selection.market]) * n : null,
    };
  }

  /**
   * @param {'INR' | 'AED'} currency
   * @param {number} amount
   * @returns {string}
   */
  function formatMoney(currency, amount) {
    return currency === 'AED' ? 'AED ' + amount.toLocaleString('en-US') : '₹' + amount.toLocaleString('en-IN');
  }

  /**
   * One-line description of the selection and its quote, for the lead record.
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @returns {string}
   */
  function summaryText(catalog, selection) {
    const q = quote(catalog, selection);
    const service = (catalog.services.find((s) => s.id === selection.service) || catalog.services[0]).label;
    const parts = [q.roleLabel, service];
    if (q.priced) parts.push(q.countLabel + ' ' + q.unit + (q.count === 1 ? '' : 's'), formatMoney(q.currency, q.perUnit) + '/' + q.unit + '/mo');
    const addons = catalog.addons.filter((a) => selection.addons.indexOf(a.id) >= 0).map((a) => a.short);
    if (addons.length) parts.push('+ ' + addons.join(', '));
    return parts.join(' · ');
  }

  /**
   * @param {string} phone
   * @returns {boolean}
   */
  function validPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15 && /^[+0-9\s().-]+$/.test(phone);
  }

  /**
   * Shape the enquiry for the existing lead backend, which requires name,
   * phone, project, catchment and budget. The card never asks for a media
   * budget, so it says so honestly instead of inventing one.
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @param {import('./types').ContactInput} input
   * @param {string} source
   * @returns {Record<string, string>}
   */
  function buildLead(catalog, selection, input, source) {
    const summary = summaryText(catalog, selection);
    return {
      name: input.name,
      phone: input.phone,
      project: ((input.project || 'Project not named') + ' · ' + summary).slice(0, 200),
      catchment: catalog.markets[selection.market].label,
      budget: catalog.budgetLabel,
      services: selection.service,
      addons: selection.addons.join(','),
      estimate: summary,
      source,
    };
  }

  /**
   * @param {Selection} selection
   * @returns {string}
   */
  function toQuery(selection) {
    const params = new URLSearchParams();
    if (selection.market !== 'india') params.set('market', selection.market);
    params.set('role', selection.role);
    params.set('service', selection.service);
    if (selection.count > 1) params.set('count', String(selection.count));
    if (selection.addons.length) params.set('addons', selection.addons.join(','));
    return '?' + params.toString();
  }

  /**
   * @param {string} search
   * @returns {Partial<Selection>}
   */
  function fromQuery(search) {
    const params = new URLSearchParams(search);
    const addons = (params.get('addons') || '').split(',').map((s) => s.trim()).filter(Boolean);
    return {
      market: /dubai/i.test(params.get('market') || search) ? 'dubai' : 'india',
      role: params.get('role') || undefined,
      service: params.get('service') || undefined,
      count: Number(params.get('count')) || 1,
      addons,
    };
  }

  /** @type {import('./types').EstimateEngine} */
  const engine = { normalise, toggleAddon, quote, formatMoney, summaryText, buildLead, validPhone, toQuery, fromQuery };
  root.QDEstimate = Object.freeze(engine);
})(globalThis);
