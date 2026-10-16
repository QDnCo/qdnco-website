// @ts-check
/**
 * Marketing cost calculator card. Mounts on every element with a
 * data-qd-estimate attribute and completes the enquiry in place:
 *   1. Calculate   market, role, service, campaign count -> live price
 *   2. Contact     name + phone (project optional), sent with the quote
 *
 *   <div data-qd-estimate></div>
 *
 * Optional attributes:
 *   data-layout="card"        card only (default "band": copy left, card right)
 *   data-role="channel-partner"  preselect a role (ids from catalog.js)
 *   data-service="ads"        preselect a service
 *   data-count="2"            preselect the campaign / project count
 *   data-addons="drone"       pre-tick add-ons
 *   data-market="dubai"       start on Dubai (also ?dubai or ?market=dubai in the URL)
 *   data-source="guide:cpql"  label stored with the lead (defaults to the page path)
 *   data-tone="gold"          gold variant instead of brand violet
 *   data-sync-url="true"      mirror the selection in the address bar (shareable links)
 *   band copy: data-eyebrow, data-heading, data-heading-em, data-lede
 *
 * Needs catalog.js, engine.js and /js/lead-capture.js first (embed.js does that).
 */
(function (root) {
  'use strict';

  /** @typedef {import('./types').EstimateCatalog} Catalog */
  /** @typedef {import('./types').Selection} Selection */
  /** @typedef {import('./types').EstimateEngine} Engine */
  /** @typedef {import('./types').Quote} Quote */
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

  /* ───────────────────────── Step 1: price ───────────────────────── */

  /**
   * @param {Card} c
   * @param {Extract<Quote, { priced: true }>} q
   * @returns {HTMLElement[]}
   */
  function pricedBody(c, q) {
    const money = (/** @type {number} */ n) => c.deps.engine.formatMoney(q.currency, n);
    const dubai = q.market === 'dubai';
    const plural = q.count === 1 ? '' : 's';
    const out = [
      h('span', { class: 'qde-price-role' }, [q.roleLabel + (dubai ? ' · ' + q.countLabel + ' project' + plural + ' · ' + q.countLabel + ' campaign' + plural : '')]),
      h('strong', { class: 'qde-price-value' }, [money(q.perUnit)]),
      h('small', { class: 'qde-price-unit' }, [dubai ? 'per project / month · one campaign per project' : 'per campaign / month · INR · media spend additional']),
    ];
    if (q.count > 1) out.push(h('p', { class: 'qde-price-total' }, [(q.isFloor ? 'Starting from ' : '') + money(q.total) + ' / month total']));
    out.push(h('p', { class: 'qde-sub' }, [dubai
      ? 'Research, strategy, campaign management, weekly reporting and a dedicated relationship manager. Three-month engagement; final scope agreed in writing.'
      : 'Indicative campaign retainer. Three-month engagement. Final scope confirmed after a project review.']));
    out.push(h('p', { class: 'qde-hint' }, [dubai
      ? 'Media spend is paid directly to Meta/Google, separately from agency fees.'
      : 'Recommended media: ₹1 lakh per campaign monthly.']));
    out.push(tierTable(c, q));
    return out;
  }

  /**
   * @param {Card} c
   * @param {Extract<Quote, { priced: true }>} q
   * @returns {HTMLElement}
   */
  function tierTable(c, q) {
    const rows = q.tiers.map((t) => h('li', { class: q.countLabel === t.label || (t.label === '3–4' && (q.count === 3 || q.count === 4)) ? 'is-current' : undefined }, [
      h('span', {}, [t.label]),
      h('b', {}, [c.deps.engine.formatMoney(q.currency, t.amount)]),
    ]));
    return h('div', { class: 'qde-tiers' }, [h('span', {}, ['Monthly price per ' + q.unit + ' by volume']), h('ul', {}, rows)]);
  }

  /**
   * @param {Extract<Quote, { priced: false }>} q
   * @returns {HTMLElement[]}
   */
  function unpricedBody(q) {
    return [
      h('strong', { class: 'qde-price-value' }, ['Let’s connect.']),
      h('p', { class: 'qde-sub' }, [q.isClient
        ? 'We’ll tailor the scope and quote for your selected service. Fixed calculator pricing applies only to Meta/Google Ad Campaigns.'
        : 'Partnerships, collaborations and other enquiries don’t need a campaign retainer. Tell us how you would like to connect.']),
    ];
  }

  /**
   * @param {Card} c
   * @param {Quote} q
   * @returns {HTMLElement}
   */
  function priceBlock(c, q) {
    return h('div', { class: 'qde-price', 'aria-live': 'polite' }, q.priced ? pricedBody(c, q) : unpricedBody(q));
  }

  /* ───────────────────────── Step 1: controls ───────────────────────── */

  /**
   * @param {string} id
   * @param {string} label
   * @param {string} name
   * @param {Array<{ value: string, label: string, group?: string }>} options
   * @param {string} value
   * @returns {HTMLElement}
   */
  function selectRow(id, label, name, options, value) {
    /** @type {Map<string, HTMLElement>} */
    const groups = new Map();
    const select = h('select', { id, name });
    for (const o of options) {
      const opt = h('option', { value: o.value, selected: o.value === value }, [o.label]);
      if (!o.group) { select.append(opt); continue; }
      if (!groups.has(o.group)) { const g = h('optgroup', { label: o.group }); groups.set(o.group, g); select.append(g); }
      groups.get(o.group)?.append(opt);
    }
    return h('label', { class: 'qde-row', for: id }, [h('span', {}, [label]), select]);
  }

  /**
   * @param {Card} c
   * @param {Quote} q
   * @returns {HTMLElement | null}
   */
  function stepper(c, q) {
    if (!q.priced) return null;
    const noun = q.unit === 'project' ? 'projects' : 'campaigns';
    const n = c.state.selection.count;
    const max = c.deps.catalog.maxCount;
    const labelId = c.uid + '-count';
    return h('div', { class: 'qde-row' }, [
      h('span', { id: labelId }, ['Number of ' + noun]),
      h('div', { class: 'qde-step', role: 'group', 'aria-labelledby': labelId }, [
        h('button', { type: 'button', 'data-action': 'dec', 'aria-label': 'Fewer ' + noun, disabled: n <= 1 }, ['−']),
        h('output', { 'aria-live': 'polite' }, [q.countLabel]),
        h('button', { type: 'button', 'data-action': 'inc', 'aria-label': 'More ' + noun, disabled: n >= max }, ['+']),
      ]),
    ]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement}
   */
  function addonsBlock(c) {
    const open = c.state.addonsOpen || c.state.selection.addons.length > 0;
    const panelId = c.uid + '-addons';
    const chips = c.deps.catalog.addons.map((a) => h('label', { class: 'qde-chip' }, [
      h('input', { type: 'checkbox', name: 'addons', value: a.id, checked: c.state.selection.addons.indexOf(a.id) >= 0 }),
      h('span', {}, [a.label]),
    ]));
    return h('div', { class: 'qde-extra' }, [
      h('button', { type: 'button', class: 'qde-link', 'data-action': 'addons', 'aria-expanded': String(open), 'aria-controls': panelId }, [open ? '− Creative production (quoted separately)' : '+ Add creative production']),
      h('div', { id: panelId, class: 'qde-chips', role: 'group', 'aria-label': 'Creative production add-ons', hidden: !open }, chips),
    ]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement[]}
   */
  function stepOne(c) {
    const { catalog, engine } = c.deps;
    const s = c.state.selection;
    const q = engine.quote(catalog, s);
    const roles = catalog.roles.map((r) => ({
      value: r.id,
      label: s.market === 'dubai' && r.dubaiLabel ? r.dubaiLabel : r.label,
      group: r.group === 'client' ? 'Real estate businesses' : 'Collaborations & other enquiries',
    }));
    const parts = [
      h('h3', { tabindex: '-1' }, ['Calculate your marketing cost.']),
      priceBlock(c, q),
      selectRow(c.uid + '-role', 'Which best describes you?', 'role', roles, s.role),
      selectRow(c.uid + '-service', 'What service are you looking for?', 'service', catalog.services.map((x) => ({ value: x.id, label: x.label })), s.service),
      stepper(c, q),
      addonsBlock(c),
      h('button', { type: 'button', class: 'qde-button', 'data-action': 'next' }, [q.priced ? 'This works. Let’s talk ' : 'Let’s connect for a tailored scope ', arrow()]),
      h('small', { class: 'qde-foot' }, ['No contact details needed to explore pricing']),
    ];
    return parts.filter((part) => part !== null);
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
   * @returns {HTMLElement}
   */
  function quoteRecap(c) {
    const q = c.deps.engine.quote(c.deps.catalog, c.state.selection);
    const money = q.priced ? c.deps.engine.formatMoney(q.currency, q.perUnit) + ' per ' + q.unit + ' / month' : 'Tailored quote';
    return h('button', { type: 'button', class: 'qde-recap', 'data-action': 'back' }, [
      h('span', {}, [q.roleLabel + (q.priced ? ' · ' + q.countLabel + ' ' + q.unit + (q.count === 1 ? '' : 's') : '')]),
      h('b', {}, [money]),
      h('small', {}, ['← Change']),
    ]);
  }

  /**
   * @param {Card} c
   * @returns {HTMLElement[]}
   */
  function stepTwo(c) {
    const s = c.state;
    const form = h('form', { class: 'qde-form', novalidate: true, 'aria-label': 'Where should we send your plan' }, [
      h('div', { class: 'qde-fields' }, [
        field(c.uid + '-name', 'Your name', { name: 'name', autocomplete: 'name', placeholder: 'Add your name', maxlength: '120', value: s.name }),
        field(c.uid + '-phone', 'Phone / WhatsApp', { name: 'phone', type: 'tel', autocomplete: 'tel', inputmode: 'tel', placeholder: '+91 …', maxlength: '40', value: s.phone }),
      ]),
      field(c.uid + '-project', 'Project name (optional)', { name: 'project', placeholder: 'e.g. your launch or locality', maxlength: '120', value: s.project }),
      h('button', { type: 'submit', class: 'qde-button', disabled: s.busy }, [s.busy ? 'Sending…' : 'Get my plan and quote ', s.busy ? null : arrow()]),
      statusLine(c),
    ]);
    return [
      quoteRecap(c),
      h('h3', { tabindex: '-1' }, ['Where should we send it?']),
      form,
      h('small', { class: 'qde-foot' }, ['We’ll WhatsApp your plan within one working day · No commitment']),
    ];
  }

  /* ───────────────────────── Done ───────────────────────── */

  /**
   * @param {Card} c
   * @returns {HTMLElement[]}
   */
  function stepDone(c) {
    const text = 'Hi QDnCo, I just requested a quote for: ' + c.deps.engine.summaryText(c.deps.catalog, c.state.selection);
    const wa = 'https://wa.me/' + c.deps.catalog.whatsapp + '?text=' + encodeURIComponent(text);
    return [
      h('h3', { tabindex: '-1' }, ['Thanks, ' + c.state.name + '. We’re on it.']),
      h('p', { class: 'qde-sub' }, ['Our team will WhatsApp you within one working day with your plan and quote. Want to talk sooner?']),
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
      h('span', { class: 'qde-eyebrow' }, [c.state.step === 3 ? 'Sent' : 'Step ' + c.state.step + ' of 2']),
      c.state.step === 1 ? h('div', { class: 'qde-mkt', role: 'group', 'aria-label': 'Market' }, markets) : null,
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
    const t = event.target;
    const s = c.state;
    if (t instanceof HTMLSelectElement && (t.name === 'role' || t.name === 'service')) {
      s.selection = c.deps.engine.normalise(c.deps.catalog, { ...s.selection, [t.name]: t.value });
      return render(c, 'select[name="' + t.name + '"]');
    }
    if (t instanceof HTMLInputElement && t.name === 'addons') {
      s.selection = c.deps.engine.toggleAddon(s.selection, t.value);
      render(c, 'input[name="addons"][value="' + t.value + '"]');
    }
  }

  /**
   * @param {Card} c
   * @param {string} action
   * @param {HTMLElement} target
   * @returns {void}
   */
  function runAction(c, action, target) {
    const s = c.state;
    const step = (/** @type {number} */ by) => {
      s.selection = c.deps.engine.normalise(c.deps.catalog, { ...s.selection, count: s.selection.count + by });
      const next = by > 0 && s.selection.count >= c.deps.catalog.maxCount ? 'dec' : by < 0 && s.selection.count <= 1 ? 'inc' : action;
      render(c, '[data-action="' + next + '"]');
    };
    if (action === 'inc') return step(1);
    if (action === 'dec') return step(-1);
    if (action === 'addons') { s.addonsOpen = target.getAttribute('aria-expanded') !== 'true'; return render(c, '[data-action="addons"]'); }
    if (action === 'back') { s.step = 1; s.status = ''; return render(c, 'h3'); }
    if (action === 'next') { s.step = 2; s.status = ''; render(c, 'input[name="name"]'); }
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
    return 'mailto:' + catalog.contactEmail + '?subject=' + encodeURIComponent('Quote enquiry — ' + lead.name) + '&body=' + encodeURIComponent(body);
  }

  /**
   * @param {Record<string, string>} lead
   * @returns {void}
   */
  function track(lead) {
    const gtag = /** @type {{ gtag?: (...args: unknown[]) => void }} */ (/** @type {unknown} */ (root)).gtag;
    if (typeof gtag === 'function') gtag('event', 'generate_lead', { form: 'calculator', service: lead.services, addons: lead.addons });
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
    const ds = el.dataset;
    const fromUrl = deps.engine.fromQuery(root.location.search);
    const addons = (ds.addons || '').split(',').map((s) => s.trim()).filter(Boolean);
    const fromAttrs = { market: /** @type {import('./types').MarketId} */ (ds.market === 'dubai' ? 'dubai' : 'india'), role: ds.role, service: ds.service, count: Number(ds.count) || 1, addons };
    const useUrl = ds.syncUrl === 'true' && root.location.search.length > 1;
    const merged = useUrl ? fromUrl : { ...fromAttrs, market: fromUrl.market === 'dubai' ? 'dubai' : fromAttrs.market };
    return deps.engine.normalise(deps.catalog, merged);
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
