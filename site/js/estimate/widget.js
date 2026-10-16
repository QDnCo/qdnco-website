// @ts-check
/**
 * Estimate card. Mounts on every element with a data-qd-estimate attribute
 * and completes the whole enquiry in place, in two short steps:
 *   1. What do you need?        outcome tiles + optional creative add-ons
 *   2. Where should we send it? name + phone (project optional)
 *
 *   <div data-qd-estimate></div>
 *
 * Optional attributes:
 *   data-layout="card"        card only (default "band": copy left, card right)
 *   data-needs="ads"          pre-tick needs (ids from catalog.js)
 *   data-addons="drone"       pre-tick add-ons
 *   data-market="dubai"       start on Dubai
 *   data-source="guide:cpql"  label stored with the lead (defaults to the page path)
 *   data-tone="gold"          gold variant instead of brand violet
 *   data-sync-url="true"      mirror picks in the address bar (shareable links)
 *   band copy: data-eyebrow, data-heading, data-heading-em, data-lede
 *
 * Needs catalog.js, engine.js and /js/lead-capture.js first (embed.js does that).
 */
(function (root) {
  'use strict';

  /** @typedef {import('./types').EstimateCatalog} Catalog */
  /** @typedef {import('./types').Selection} Selection */
  /** @typedef {import('./types').EstimateEngine} Engine */
  /** @typedef {import('./types').CatalogItem} CatalogItem */
  /** @typedef {import('./types').Kind} Kind */
  /** @typedef {{ catalog: Catalog, engine: Engine, leads: import('./types').LeadCaptureApi | null }} Deps */
  /** @typedef {{ selection: Selection, step: 1 | 2 | 3, name: string, phone: string, project: string, addonsOpen: boolean, status: string, busy: boolean, failedLead: Record<string, string> | null }} State */
  /** @typedef {{ deps: Deps, el: HTMLElement, card: HTMLElement, uid: string, state: State }} Card */

  let mountCount = 0;

  /**
   * Tiny element builder. Text goes through textContent, never innerHTML.
   * @param {string} tag
   * @param {Record<string, string | boolean | undefined>} [attrs]
   * @param {Array<Node | string | null | undefined | false>} [children]
   * @returns {HTMLElement}
   */
  function h(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value === undefined || value === false) continue;
      if (key === 'class') node.className = String(value);
      else node.setAttribute(key, value === true ? '' : String(value));
    }
    for (const child of children || []) {
      if (child === null || child === undefined || child === false) continue;
      node.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
  }

  /** @returns {HTMLElement} */
  function arrow() {
    return h('span', { 'aria-hidden': 'true' }, ['↗']);
  }

  /* ───────────────────────── Step 1 ───────────────────────── */

  /**
   * @param {Card} c
   * @param {CatalogItem} item
   * @param {Kind} kind
   * @returns {HTMLElement}
   */
  function choice(c, item, kind) {
    const checked = c.state.selection[kind].indexOf(item.id) >= 0;
    const input = h('input', { type: 'checkbox', name: kind, value: item.id, checked });
    if (kind === 'addons') return h('label', { class: 'qde-chip' }, [input, h('span', {}, [item.label])]);
    return h('label', { class: 'qde-tile' }, [input, h('span', {}, [h('b', {}, [item.label]), h('small', {}, [item.detail || ''])])]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement}
   */
  function addonsBlock(c) {
    const open = c.state.addonsOpen || c.state.selection.addons.length > 0;
    const panelId = c.uid + '-addons';
    return h('div', { class: 'qde-extra' }, [
      h('button', { type: 'button', class: 'qde-link', 'data-action': 'addons', 'aria-expanded': String(open), 'aria-controls': panelId }, [open ? '− Creative production' : '+ Add creative production']),
      h('div', { id: panelId, class: 'qde-chips', role: 'group', 'aria-label': 'Creative production add-ons', hidden: !open }, c.deps.catalog.addons.map((item) => choice(c, item, 'addons'))),
    ]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement[]}
   */
  function stepOne(c) {
    const needs = c.deps.catalog.needs.map((item) => choice(c, item, 'needs'));
    return [
      h('h3', { tabindex: '-1' }, ['Get your marketing estimate.']),
      h('p', { class: 'qde-sub' }, ['What do you need? Pick one or more.']),
      h('div', { class: 'qde-tiles', role: 'group', 'aria-label': 'What you need' }, needs),
      addonsBlock(c),
      h('button', { type: 'button', class: 'qde-button', 'data-action': 'next' }, ['Next: where to send it ', arrow()]),
      h('p', { class: 'qde-status', role: 'status' }, [c.state.status]),
      h('small', { class: 'qde-foot' }, ['Takes 20 seconds · No commitment']),
    ];
  }

  /* ───────────────────────── Step 2 ───────────────────────── */

  /**
   * @param {string} id
   * @param {string} label
   * @param {Record<string, string>} input
   * @returns {HTMLElement}
   */
  function field(id, label, input) {
    return h('label', { class: 'qde-field', for: id }, [
      h('span', {}, [label]),
      h('span', { class: 'qde-field-row' }, [h('input', { id, ...input }), h('b', { 'aria-hidden': 'true' }, ['↗'])]),
    ]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement}
   */
  function statusLine(c) {
    const lead = c.state.failedLead;
    const mail = lead ? h('a', { href: mailtoFor(c.deps.catalog, lead) }, [' Email it to us instead.']) : null;
    return h('p', { class: 'qde-status', role: 'status' }, [c.state.status, mail]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement[]}
   */
  function stepTwo(c) {
    const s = c.state;
    const picked = c.deps.engine.summaryText(c.deps.catalog, s.selection);
    const form = h('form', { class: 'qde-form', novalidate: true, 'aria-label': 'Where should we send your estimate' }, [
      h('div', { class: 'qde-fields' }, [
        field(c.uid + '-name', 'Your name', { name: 'name', autocomplete: 'name', placeholder: 'Add your name', maxlength: '120', value: s.name }),
        field(c.uid + '-phone', 'Phone / WhatsApp', { name: 'phone', type: 'tel', autocomplete: 'tel', inputmode: 'tel', placeholder: '+91 …', maxlength: '40', value: s.phone }),
      ]),
      field(c.uid + '-project', 'Project name (optional)', { name: 'project', placeholder: 'e.g. your launch or locality', maxlength: '120', value: s.project }),
      h('button', { type: 'submit', class: 'qde-button', disabled: s.busy }, [s.busy ? 'Sending…' : 'Get my free estimate ', s.busy ? null : arrow()]),
      statusLine(c),
    ]);
    return [
      h('button', { type: 'button', class: 'qde-link qde-back', 'data-action': 'back' }, ['← ' + picked]),
      h('h3', { tabindex: '-1' }, ['Where should we send it?']),
      form,
      h('small', { class: 'qde-foot' }, ['We’ll WhatsApp your estimate within one working day · No commitment']),
    ];
  }

  /* ───────────────────────── Done ───────────────────────── */

  /**
   * @param {Card} c
   * @returns {HTMLElement[]}
   */
  function stepDone(c) {
    const text = 'Hi QDnCo, I just requested an estimate for: ' + c.deps.engine.summaryText(c.deps.catalog, c.state.selection);
    const wa = 'https://wa.me/' + c.deps.catalog.whatsapp + '?text=' + encodeURIComponent(text);
    return [
      h('h3', { tabindex: '-1' }, ['Thanks, ' + c.state.name + '. Your estimate is on its way.']),
      h('p', { class: 'qde-sub' }, ['Our team will WhatsApp you within one working day. Want to talk sooner?']),
      h('a', { class: 'qde-button', href: wa, target: '_blank', rel: 'noopener' }, ['Chat on WhatsApp now ', arrow()]),
    ];
  }

  /* ───────────────────────── Render ───────────────────────── */

  /**
   * @param {Card} c
   * @returns {HTMLElement}
   */
  function header(c) {
    const markets = Object.entries(c.deps.catalog.markets).map(([id, m]) =>
      h('button', { type: 'button', 'data-market': id, 'aria-pressed': String(c.state.selection.market === id) }, [m.label]));
    return h('div', { class: 'qde-head' }, [
      h('span', { class: 'qde-eyebrow' }, [c.state.step === 3 ? 'Sent' : 'A small first step · ' + c.state.step + ' of 2']),
      c.state.step === 3 ? null : h('div', { class: 'qde-mkt', role: 'group', 'aria-label': 'Market' }, markets),
    ]);
  }

  /**
   * @param {Card} c
   * @param {string} [focus] selector to focus after rendering
   * @returns {void}
   */
  function render(c, focus) {
    const s = c.state;
    const body = s.step === 1 ? stepOne(c) : s.step === 2 ? stepTwo(c) : stepDone(c);
    c.card.replaceChildren(header(c), ...body);
    if (c.el.dataset.syncUrl === 'true') {
      root.history.replaceState(null, '', root.location.pathname + c.deps.engine.toQuery(s.selection) + root.location.hash);
    }
    if (focus) /** @type {HTMLElement | null} */ (c.card.querySelector(focus))?.focus();
  }

  /* ───────────────────────── Events ───────────────────────── */

  /**
   * @param {Card} c
   * @param {Event} event
   * @returns {void}
   */
  function onChange(c, event) {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'checkbox') return;
    const kind = /** @type {Kind} */ (input.name);
    c.state.selection = c.deps.engine.toggle(c.deps.catalog, c.state.selection, kind, input.value);
    c.state.status = '';
    render(c, 'input[name="' + kind + '"][value="' + input.value + '"]');
  }

  /**
   * @param {Card} c
   * @param {string} action
   * @param {HTMLElement} target
   * @returns {void}
   */
  function runAction(c, action, target) {
    const s = c.state;
    if (action === 'addons') { s.addonsOpen = target.getAttribute('aria-expanded') !== 'true'; return render(c, '[data-action="addons"]'); }
    if (action === 'back') { s.step = 1; s.status = ''; return render(c, 'h3'); }
    if (action !== 'next') return;
    if (!s.selection.needs.length) { s.status = 'Pick at least one so we know where to start.'; return render(c, '[data-action="next"]'); }
    s.step = 2; s.status = '';
    render(c, 'input[name="name"]');
  }

  /**
   * @param {Card} c
   * @param {Event} event
   * @returns {void}
   */
  function onClick(c, event) {
    const target = /** @type {HTMLElement} */ (event.target).closest('[data-action],[data-market]');
    if (!(target instanceof HTMLElement)) return;
    keepTyped(c);
    const market = target.dataset.market;
    if (market) {
      c.state.selection = c.deps.engine.normalise(c.deps.catalog, { ...c.state.selection, market: /** @type {import('./types').MarketId} */ (market) });
      return render(c, '[data-market="' + market + '"]');
    }
    runAction(c, target.dataset.action || '', target);
  }

  /**
   * Copy typed contact details into state before a re-render.
   * @param {Card} c
   * @returns {void}
   */
  function keepTyped(c) {
    for (const key of /** @type {Array<'name' | 'phone' | 'project'>} */ (['name', 'phone', 'project'])) {
      const input = c.card.querySelector('input[name="' + key + '"]');
      if (input instanceof HTMLInputElement) c.state[key] = input.value.trim();
    }
  }

  /**
   * @param {Card} c
   * @returns {string} empty when valid, otherwise the field name to fix
   */
  function invalidField(c) {
    const s = c.state;
    if (!s.name) { s.status = 'Please add your name.'; return 'name'; }
    if (!c.deps.engine.validPhone(s.phone)) { s.status = 'Please enter a valid phone number, with country code.'; return 'phone'; }
    return '';
  }

  /**
   * @param {Card} c
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async function onSubmit(c, event) {
    event.preventDefault();
    keepTyped(c);
    const s = c.state;
    const bad = invalidField(c);
    if (bad) return render(c, 'input[name="' + bad + '"]');
    const lead = c.deps.engine.buildLead(c.deps.catalog, s.selection, { name: s.name, phone: s.phone, project: s.project }, c.el.dataset.source || root.location.pathname);
    s.busy = true; s.status = ''; s.failedLead = null;
    render(c);
    try {
      await deliver(c.deps, lead);
      s.step = 3;
      track(lead);
    } catch (error) {
      console.error('[qd-estimate] enquiry not confirmed', error);
      s.status = 'We could not confirm your enquiry was received.';
      s.failedLead = lead;
    }
    s.busy = false;
    render(c, s.step === 3 ? 'h3' : 'button[type=submit]');
  }

  /* ───────────────────────── Delivery ───────────────────────── */

  /**
   * @param {Deps} deps
   * @param {Record<string, string>} lead
   * @returns {Promise<void>}
   */
  async function deliver(deps, lead) {
    if (!deps.leads) throw new Error('lead_capture_missing');
    Object.assign(lead, deps.leads.context(root.location.href, document.referrer));
    lead.request_id = deps.leads.requestId();
    lead.submitted = new Date().toISOString();
    await deps.leads.send(deps.catalog.endpoint, lead);
  }

  /**
   * @param {Catalog} catalog
   * @param {Record<string, string>} lead
   * @returns {string}
   */
  function mailtoFor(catalog, lead) {
    const body = ['name', 'phone', 'project', 'catchment', 'source'].map((k) => k + ': ' + (lead[k] || '')).join('\n');
    return 'mailto:' + catalog.contactEmail + '?subject=' + encodeURIComponent('Estimate enquiry — ' + lead.name) + '&body=' + encodeURIComponent(body);
  }

  /**
   * @param {Record<string, string>} lead
   * @returns {void}
   */
  function track(lead) {
    const gtag = /** @type {{ gtag?: (...args: unknown[]) => void }} */ (/** @type {unknown} */ (root)).gtag;
    if (typeof gtag === 'function') gtag('event', 'generate_lead', { form: 'estimate', services: lead.services, addons: lead.addons });
  }

  /* ───────────────────────── Mount ───────────────────────── */

  /**
   * @param {HTMLElement} el
   * @returns {HTMLElement}
   */
  function bandCopy(el) {
    const ds = el.dataset;
    return h('div', { class: 'qde-copy' }, [
      h('span', { class: 'qde-eyebrow' }, [ds.eyebrow || 'Your next project']),
      h('h2', {}, [ds.heading || 'Need more property enquiries?', h('br'), h('em', {}, [ds.headingEm || 'Talk to our team.'])]),
      h('p', {}, [ds.lede || 'Tell us about your project. Get a marketing plan and pricing estimate.']),
    ]);
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @returns {Selection}
   */
  function initialSelection(deps, el) {
    const split = (/** @type {string | undefined} */ v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (el.dataset.syncUrl === 'true' && root.location.search) return deps.engine.normalise(deps.catalog, deps.engine.fromQuery(root.location.search));
    const market = el.dataset.market === 'dubai' ? 'dubai' : 'india';
    return deps.engine.normalise(deps.catalog, { market, needs: split(el.dataset.needs || el.dataset.services), addons: split(el.dataset.addons) });
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @returns {void}
   */
  function mount(deps, el) {
    const uid = 'qde' + ++mountCount;
    const card = h('div', { class: 'qde-card' });
    /** @type {Card} */
    const c = { deps, el, card, uid, state: { selection: initialSelection(deps, el), step: 1, name: '', phone: '', project: '', addonsOpen: false, status: '', busy: false, failedLead: null } };
    card.addEventListener('change', (e) => onChange(c, e));
    card.addEventListener('click', (e) => onClick(c, e));
    card.addEventListener('submit', (e) => { onSubmit(c, e); });
    const band = el.dataset.layout !== 'card';
    el.classList.add('qde');
    el.replaceChildren(h('div', { class: band ? 'qde-band' : 'qde-solo' }, [band ? bandCopy(el) : null, card]));
    render(c);
  }

  /** @returns {Deps | null} */
  function resolveDeps() {
    const catalog = root.QDEstimateCatalog;
    const engine = root.QDEstimate;
    if (!catalog || !engine) {
      console.error('[qd-estimate] catalog.js and engine.js must load before widget.js');
      return null;
    }
    if (!root.QDLeadCapture) console.warn('[qd-estimate] lead-capture.js missing; enquiries fall back to email');
    return { catalog, engine, leads: root.QDLeadCapture || null };
  }

  /**
   * @param {ParentNode} [scope]
   * @returns {void}
   */
  function mountAll(scope) {
    const deps = resolveDeps();
    if (!deps) return;
    const nodes = (scope || document).querySelectorAll('[data-qd-estimate]:not([data-qde-mounted])');
    for (const el of nodes) {
      if (!(el instanceof HTMLElement)) continue;
      el.setAttribute('data-qde-mounted', '');
      mount(deps, el);
    }
  }

  root.QDEstimateWidget = Object.freeze({ mountAll });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAll());
  else mountAll();
})(globalThis);
