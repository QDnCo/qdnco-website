// @ts-check
/**
 * Estimate engine: pure functions, no DOM. Turns a selection (market + need
 * ids + add-on ids) into URL state and the lead the backend stores.
 * Unit-tested in tests/estimate.test.mjs.
 */
(function (root) {
  'use strict';

  /** @typedef {import('./types').EstimateCatalog} Catalog */
  /** @typedef {import('./types').Selection} Selection */
  /** @typedef {import('./types').CatalogItem} CatalogItem */
  /** @typedef {import('./types').Kind} Kind */

  /**
   * @param {string[]} ids
   * @returns {string[]}
   */
  function unique(ids) {
    return ids.filter((id, index) => ids.indexOf(id) === index);
  }

  /**
   * @param {CatalogItem[]} list
   * @param {string[] | undefined} ids
   * @returns {string[]}
   */
  function known(list, ids) {
    return unique((ids || []).filter((id) => list.some((item) => item.id === id)));
  }

  /**
   * Add a need. An exclusive need replaces everything; any other need
   * clears the exclusive ones.
   * @param {Catalog} catalog
   * @param {string[]} current
   * @param {string} id
   * @returns {string[]}
   */
  function addNeed(catalog, current, id) {
    const item = catalog.needs.find((need) => need.id === id);
    if (item && item.exclusive) return [id];
    const exclusive = catalog.needs.filter((need) => need.exclusive).map((need) => need.id);
    return unique(current.filter((existing) => exclusive.indexOf(existing) < 0).concat(id));
  }

  /**
   * Drop unknown ids and resolve exclusivity (last pick wins).
   * @param {Catalog} catalog
   * @param {Partial<Selection>} raw
   * @returns {Selection}
   */
  function normalise(catalog, raw) {
    const market = raw.market && raw.market in catalog.markets ? raw.market : 'india';
    const needs = known(catalog.needs, raw.needs).reduce((acc, id) => addNeed(catalog, acc, id), /** @type {string[]} */ ([]));
    return { market, needs, addons: known(catalog.addons, raw.addons) };
  }

  /**
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @param {Kind} kind
   * @param {string} id
   * @returns {Selection}
   */
  function toggle(catalog, selection, kind, id) {
    if (selection[kind].indexOf(id) >= 0) {
      return { ...selection, [kind]: selection[kind].filter((existing) => existing !== id) };
    }
    if (kind === 'needs') return { ...selection, needs: addNeed(catalog, selection.needs, id) };
    return { ...selection, addons: unique(selection.addons.concat(id)) };
  }

  /**
   * Compact one-line description of a selection, for the lead record.
   * @param {Catalog} catalog
   * @param {Selection} selection
   * @returns {string}
   */
  function summaryText(catalog, selection) {
    const names = (/** @type {CatalogItem[]} */ list, /** @type {string[]} */ ids) =>
      list.filter((item) => ids.indexOf(item.id) >= 0).map((item) => item.short);
    const needs = names(catalog.needs, selection.needs);
    const addons = names(catalog.addons, selection.addons);
    const parts = [needs.length ? needs.join(', ') : 'Nothing picked'];
    if (addons.length) parts.push('+ ' + addons.join(', '));
    return parts.join(' ');
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
   * phone, project, catchment and budget. The card never asks for a budget,
   * so it says so honestly instead of inventing one.
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
      services: selection.needs.join(','),
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
    if (selection.needs.length) params.set('needs', selection.needs.join(','));
    if (selection.addons.length) params.set('addons', selection.addons.join(','));
    const query = params.toString();
    return query ? '?' + query : '';
  }

  /**
   * @param {string} search
   * @returns {Partial<Selection>}
   */
  function fromQuery(search) {
    const params = new URLSearchParams(search);
    const list = (/** @type {string} */ key) => (params.get(key) || '').split(',').map((s) => s.trim()).filter(Boolean);
    const market = params.get('market') === 'dubai' ? 'dubai' : 'india';
    return { market, needs: list('needs'), addons: list('addons') };
  }

  /** @type {import('./types').EstimateEngine} */
  const engine = { normalise, toggle, summaryText, buildLead, validPhone, toQuery, fromQuery };
  root.QDEstimate = Object.freeze(engine);
})(globalThis);
