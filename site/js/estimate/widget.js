// @ts-check
/**
 * Marketing cost calculator. Mounts on every element with a data-qd-estimate
 * attribute, in one of two variants:
 *
 *   <div data-qd-estimate></div>
 *     The calculator: one wide card. Left "01 / Your price" (live price,
 *     fees + media breakdown, volume tiers, what's included). Right "A couple
 *     of details" (role, service, campaign count), then the quick capture
 *     (name + phone) once the visitor says "This works. Let's talk".
 *     Below ~760px the two halves stack, price first.
 *
 *   <div data-qd-estimate="starter"></div>
 *     "Your next project" band: copy left, name + phone card right. The button
 *     takes the visitor to the calculator (catalog.pricingPath) with their
 *     name and phone carried over in sessionStorage, never in the URL.
 *
 * Optional attributes:
 *   data-market="dubai"         fix the market (hides the India/Dubai switch)
 *   data-role, data-service, data-count, data-addons   preselect inputs
 *   data-source="guide:cpql"    label stored with the lead (defaults to the page path)
 *   data-tone="gold"            gold variant instead of brand violet
 *   data-sync-url="true"        mirror the selection in the address bar
 *   starter copy: data-eyebrow, data-heading, data-heading-em, data-lede
 *
 * Needs catalog.js, engine.js and /js/lead-capture.js first (embed.js does that).
 * Dispatches "qd-estimate-ready" on window once loaded, so a React section can
 * mount late: window.QDEstimateWidget.mountAll(container).
 */
(function (root) {
  'use strict';

  /** @typedef {import('./types').EstimateCatalog} Catalog */
  /** @typedef {import('./types').Selection} Selection */
  /** @typedef {import('./types').EstimateEngine} Engine */
  /** @typedef {import('./types').Quote} Quote */
  /** @typedef {Extract<Quote, { priced: true }>} Priced */
  /** @typedef {{ catalog: Catalog, engine: Engine, leads: import('./types').LeadCaptureApi | null }} Deps */
  /** @typedef {{ selection: Selection, step: 1 | 2 | 3, name: string, phone: string, project: string, addonsOpen: boolean, status: string, busy: boolean, failedLead: Record<string, string> | null }} State */
  /** @typedef {{ deps: Deps, el: HTMLElement, left: HTMLElement, right: HTMLElement, uid: string, state: State }} Calc */

  const CONTACT_KEY = 'qd-estimate-contact';
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

  /**
   * @param {string} [glyph]
   * @returns {HTMLElement}
   */
  function arrow(glyph) {
    return h('span', { 'aria-hidden': 'true' }, [glyph || '↗']);
  }

  /**
   * @param {() => void} action
   * @returns {void}
   */
  function quietly(action) {
    try { action(); } catch (error) { console.warn('[qd-estimate] storage unavailable', error); }
  }

  /* ───────────────────────── Shared inputs ───────────────────────── */

  /**
   * Boxed field from the "A small first step" card.
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
   * @param {string} uid
   * @param {{ name: string, phone: string }} values
   * @returns {HTMLElement}
   */
  function contactFields(uid, values) {
    return h('div', { class: 'qde-fields' }, [
      field(uid + '-name', 'Your name', { name: 'name', autocomplete: 'name', placeholder: 'Add your name', maxlength: '120', value: values.name }),
      field(uid + '-phone', 'Phone number', { name: 'phone', type: 'tel', autocomplete: 'tel', inputmode: 'tel', placeholder: 'Let’s connect', maxlength: '40', value: values.phone }),
    ]);
  }

  /* ───────────────────────── Left: your price ───────────────────────── */

  /**
   * @param {Calc} c
   * @param {Priced} q
   * @returns {HTMLElement}
   */
  function breakdown(c, q) {
    const money = (/** @type {number} */ n) => c.deps.engine.formatMoney(q.currency, n);
    const rows = [h('div', {}, [h('span', {}, ['Agency fee' + (q.count > 1 ? ' · ' + q.countLabel + ' ' + q.unit + 's' : '')]), h('b', {}, [money(q.total)])])];
    if (q.mediaTotal !== null) {
      rows.push(h('div', {}, [h('span', {}, ['Recommended media, paid to Meta/Google']), h('b', {}, [money(q.mediaTotal)])]));
      rows.push(h('div', { class: 'qde-sum' }, [h('span', {}, ['Total monthly investment']), h('b', {}, [(q.isFloor ? 'From ' : '') + money(q.total + q.mediaTotal)])]));
    }
    return h('div', { class: 'qde-breakdown' }, rows);
  }

  /**
   * @param {Calc} c
   * @param {Priced} q
   * @returns {HTMLElement}
   */
  function tiers(c, q) {
    const current = (/** @type {string} */ label) => label === q.countLabel || (label === '3–4' && (q.count === 3 || q.count === 4));
    const rows = q.tiers.map((t) => h('li', { class: current(t.label) ? 'is-current' : undefined }, [
      h('span', {}, [t.label + ' ' + q.unit + (t.label === '1' ? '' : 's')]),
      h('b', {}, [c.deps.engine.formatMoney(q.currency, t.amount)]),
    ]));
    return h('div', { class: 'qde-tiers' }, [h('span', {}, ['Per ' + q.unit + ' / month, by volume']), h('ul', {}, rows)]);
  }

  /**
   * @param {Calc} c
   * @param {Priced} q
   * @returns {HTMLElement[]}
   */
  function pricedLeft(c, q) {
    const dubai = q.market === 'dubai';
    const value = c.deps.engine.formatMoney(q.currency, q.perUnit);
    const unit = dubai ? 'per project / month · one campaign per project' : 'per campaign / month · INR · media spend additional';
    return [
      h('h3', { class: 'qde-role' }, [q.roleLabel]),
      h('p', { class: 'qde-price', role: 'status', 'aria-atomic': 'true' }, [
        h('strong', {}, [value]),
        h('small', {}, [unit]),
      ]),
      breakdown(c, q),
      h('p', { class: 'qde-terms' }, [dubai
        ? 'Research, strategy, campaign management, weekly reporting and a dedicated relationship manager. Three-month engagement; final scope agreed in writing.'
        : 'Indicative campaign retainer. Three-month engagement. Final scope confirmed after a project review.']),
      tiers(c, q),
      h('ul', { class: 'qde-includes', 'aria-label': 'Included in the fee' }, c.deps.catalog.includes.map((line) => h('li', {}, [line]))),
    ];
  }

  /**
   * @param {Extract<Quote, { priced: false }>} q
   * @returns {HTMLElement[]}
   */
  function unpricedLeft(q) {
    return [
      h('h3', { class: 'qde-role' }, [q.roleLabel]),
      h('p', { class: 'qde-price', role: 'status', 'aria-atomic': 'true' }, [h('strong', {}, ['Let’s connect.']), h('small', {}, ['Scoped and quoted for you'])]),
      h('p', { class: 'qde-terms' }, [q.isClient
        ? 'We’ll tailor the scope and quote for your selected service. Fixed calculator pricing applies only to Meta/Google Ad Campaigns.'
        : 'Partnerships, collaborations and other enquiries don’t need a campaign retainer. Tell us how you would like to connect.']),
    ];
  }

  /**
   * @param {Calc} c
   * @returns {HTMLElement[]}
   */
  function leftPanel(c) {
    const q = c.deps.engine.quote(c.deps.catalog, c.state.selection);
    return [h('span', { class: 'qde-eyebrow' }, ['01 / Your price']), ...(q.priced ? pricedLeft(c, q) : unpricedLeft(q))];
  }

  /* ───────────────────────── Right: a couple of details ───────────────────────── */

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
   * @param {Calc} c
   * @param {Quote} q
   * @returns {HTMLElement | null}
   */
  function stepper(c, q) {
    if (!q.priced) return null;
    const noun = q.unit === 'project' ? 'projects' : 'campaigns';
    const n = c.state.selection.count;
    const labelId = c.uid + '-count';
    return h('div', { class: 'qde-row' }, [
      h('span', { id: labelId }, ['Number of ' + noun]),
      h('div', { class: 'qde-step', role: 'group', 'aria-labelledby': labelId }, [
        h('button', { type: 'button', 'data-action': 'dec', 'aria-label': 'Fewer ' + noun, disabled: n <= 1 }, ['−']),
        h('output', {}, [q.countLabel]),
        h('button', { type: 'button', 'data-action': 'inc', 'aria-label': 'More ' + noun, disabled: n >= c.deps.catalog.maxCount }, ['+']),
      ]),
      h('small', { class: 'qde-hint' }, [q.unit === 'project' ? 'One campaign per project. Per-project price and monthly total update automatically.' : 'Your per-campaign retainer updates automatically.']),
    ]);
  }

  /**
   * @param {Calc} c
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
      h('button', { type: 'button', class: 'qde-link', 'data-action': 'addons', 'aria-expanded': String(open), 'aria-controls': panelId }, [open ? '− Studio production (quoted separately)' : '+ Add studio production']),
      h('div', { id: panelId, class: 'qde-chips', role: 'group', 'aria-label': 'Studio production add-ons', hidden: !open }, chips),
    ]);
  }

  /**
   * @param {Calc} c
   * @returns {HTMLElement | null}
   */
  function marketSwitch(c) {
    if (c.el.dataset.market) return null;
    const buttons = Object.entries(c.deps.catalog.markets).map(([id, m]) =>
      h('button', { type: 'button', 'data-market': id, 'aria-pressed': String(c.state.selection.market === id) }, [m.label]));
    return h('div', { class: 'qde-mkt', role: 'group', 'aria-label': 'Market' }, buttons);
  }

  /**
   * @param {Calc} c
   * @returns {Array<HTMLElement | null>}
   */
  function rightDetails(c) {
    const { catalog, engine } = c.deps;
    const s = c.state.selection;
    const q = engine.quote(catalog, s);
    const roles = catalog.roles.map((r) => ({
      value: r.id,
      label: s.market === 'dubai' && r.dubaiLabel ? r.dubaiLabel : r.label,
      group: r.group === 'client' ? 'Real estate businesses' : 'Collaborations & other enquiries',
    }));
    return [
      h('div', { class: 'qde-head' }, [h('span', { class: 'qde-eyebrow' }, ['Calculate your starting cost']), marketSwitch(c)]),
      h('h3', { tabindex: '-1' }, ['A couple of details.']),
      h('p', { class: 'qde-sub' }, ['No contact details needed to explore pricing.']),
      selectRow(c.uid + '-role', 'Which best describes you?', 'role', roles, s.role),
      selectRow(c.uid + '-service', 'What service are you looking for?', 'service', catalog.services.map((x) => ({ value: x.id, label: x.label })), s.service),
      stepper(c, q),
      addonsBlock(c),
      h('button', { type: 'button', class: 'qde-button', 'data-action': 'next' }, [q.priced ? 'This works. Let’s talk ' : 'Let’s connect for a tailored scope ', arrow()]),
    ];
  }

  /**
   * The image-15 quick capture, inside the calculator.
   * @param {Calc} c
   * @returns {Array<HTMLElement | null>}
   */
  function rightContact(c) {
    const s = c.state;
    const lead = s.failedLead;
    const form = h('form', { class: 'qde-form', novalidate: true, 'aria-label': 'Get your marketing estimate' }, [
      contactFields(c.uid, s),
      field(c.uid + '-project', 'Project name (optional)', { name: 'project', placeholder: 'e.g. your launch or locality', maxlength: '120', value: s.project }),
      h('button', { type: 'submit', class: 'qde-button', disabled: s.busy }, [s.busy ? 'Sending…' : 'Get my free estimate ', s.busy ? null : arrow()]),
      h('p', { class: 'qde-status', role: 'status' }, [s.status, lead ? h('a', { href: mailtoFor(c.deps.catalog, lead) }, [' Email it to us instead.']) : null]),
    ]);
    return [
      h('div', { class: 'qde-head' }, [h('span', { class: 'qde-eyebrow' }, ['A small first step']), h('button', { type: 'button', class: 'qde-link', 'data-action': 'back' }, ['← Change details'])]),
      h('h3', { tabindex: '-1' }, ['Get your marketing estimate.']),
      h('p', { class: 'qde-sub' }, ['Share your name and phone number to get started.']),
      form,
      h('small', { class: 'qde-foot' }, ['We’ll WhatsApp your plan within one working day · No commitment']),
    ];
  }

  /**
   * @param {Calc} c
   * @returns {HTMLElement[]}
   */
  function rightDone(c) {
    const text = 'Hi QDnCo, I just requested a quote for: ' + c.deps.engine.summaryText(c.deps.catalog, c.state.selection);
    const wa = 'https://wa.me/' + c.deps.catalog.whatsapp + '?text=' + encodeURIComponent(text);
    return [
      h('span', { class: 'qde-eyebrow' }, ['Sent']),
      h('h3', { tabindex: '-1' }, ['Thanks, ' + c.state.name + '. We’re on it.']),
      h('p', { class: 'qde-sub' }, ['Our team will WhatsApp you within one working day with your plan and quote. Want to talk sooner?']),
      h('a', { class: 'qde-button', href: wa, target: '_blank', rel: 'noopener' }, ['Chat on WhatsApp now ', arrow()]),
    ];
  }

  /* ───────────────────────── Render + events ───────────────────────── */

  /**
   * @param {Calc} c
   * @param {string} [focus] selector to focus after rendering
   * @returns {void}
   */
  function render(c, focus) {
    const s = c.state;
    const right = s.step === 1 ? rightDetails(c) : s.step === 2 ? rightContact(c) : rightDone(c);
    c.left.replaceChildren(...leftPanel(c));
    c.right.replaceChildren(...right.filter((node) => node !== null));
    if (c.el.dataset.syncUrl === 'true') {
      root.history.replaceState(null, '', root.location.pathname + c.deps.engine.toQuery(s.selection) + root.location.hash);
    }
    if (focus) /** @type {HTMLElement | null} */ (c.right.querySelector(focus))?.focus();
  }

  /**
   * @param {Calc} c
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
   * @param {Calc} c
   * @param {string} action
   * @param {HTMLElement} target
   * @returns {void}
   */
  function runAction(c, action, target) {
    const s = c.state;
    const step = (/** @type {number} */ by) => {
      s.selection = c.deps.engine.normalise(c.deps.catalog, { ...s.selection, count: s.selection.count + by });
      const atEdge = by > 0 ? s.selection.count >= c.deps.catalog.maxCount : s.selection.count <= 1;
      render(c, '[data-action="' + (atEdge ? (by > 0 ? 'dec' : 'inc') : action) + '"]');
    };
    if (action === 'inc') return step(1);
    if (action === 'dec') return step(-1);
    if (action === 'addons') { s.addonsOpen = target.getAttribute('aria-expanded') !== 'true'; return render(c, '[data-action="addons"]'); }
    if (action === 'back') { s.step = 1; s.status = ''; return render(c, 'h3'); }
    if (action === 'next') { s.step = 2; s.status = ''; render(c, s.name ? 'button[type=submit]' : 'input[name="name"]'); }
  }

  /**
   * @param {Calc} c
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
   * @param {Calc} c
   * @returns {void}
   */
  function keepTyped(c) {
    for (const key of /** @type {Array<'name' | 'phone' | 'project'>} */ (['name', 'phone', 'project'])) {
      const input = c.right.querySelector('input[name="' + key + '"]');
      if (input instanceof HTMLInputElement) c.state[key] = input.value.trim();
    }
  }

  /**
   * @param {Calc} c
   * @returns {string} empty when valid, otherwise the field name to fix
   */
  function invalidField(c) {
    const s = c.state;
    if (!s.name) { s.status = 'Please add your name.'; return 'name'; }
    if (!c.deps.engine.validPhone(s.phone)) { s.status = 'Please enter a valid phone number, with country code.'; return 'phone'; }
    return '';
  }

  /**
   * @param {Calc} c
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
      quietly(() => root.sessionStorage.removeItem(CONTACT_KEY));
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

  /* ───────────────────────── Starter band (About) ───────────────────────── */

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
   * @returns {void}
   */
  function mountStarter(deps, el) {
    const uid = 'qde' + ++mountCount;
    const form = h('form', { class: 'qde-card qde-starter', novalidate: true, 'aria-label': 'Start your project enquiry' }, [
      h('span', { class: 'qde-eyebrow' }, ['A small first step']),
      h('h3', {}, ['Get your marketing estimate.']),
      h('p', { class: 'qde-sub' }, ['Share your name and phone number to get started.']),
      contactFields(uid, { name: '', phone: '' }),
      h('button', { type: 'submit', class: 'qde-button' }, ['Get my free estimate ', arrow()]),
      h('small', { class: 'qde-foot' }, ['Continue to the full enquiry · No commitment']),
    ]);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(/** @type {HTMLFormElement} */ (form));
      const contact = { name: String(data.get('name') || '').trim(), phone: String(data.get('phone') || '').trim() };
      quietly(() => root.sessionStorage.setItem(CONTACT_KEY, JSON.stringify(contact)));
      const market = el.dataset.market === 'dubai' ? 'dubai' : 'india';
      root.location.href = deps.catalog.pricingPath[market];
    });
    el.classList.add('qde');
    el.replaceChildren(h('div', { class: 'qde-band' }, [bandCopy(el), form]));
  }

  /* ───────────────────────── Mount ───────────────────────── */

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @returns {Selection}
   */
  function initialSelection(deps, el) {
    const ds = el.dataset;
    const fromUrl = deps.engine.fromQuery(root.location.search);
    const addons = (ds.addons || '').split(',').map((s) => s.trim()).filter(Boolean);
    const market = /** @type {import('./types').MarketId} */ (ds.market === 'dubai' || (!ds.market && fromUrl.market === 'dubai') ? 'dubai' : 'india');
    const useUrl = ds.syncUrl === 'true' && root.location.search.length > 1;
    const raw = useUrl ? { ...fromUrl, market } : { market, role: ds.role, service: ds.service, count: Number(ds.count) || 1, addons };
    return deps.engine.normalise(deps.catalog, raw);
  }

  /** @returns {{ name: string, phone: string }} */
  function savedContact() {
    let saved = { name: '', phone: '' };
    quietly(() => {
      const raw = JSON.parse(root.sessionStorage.getItem(CONTACT_KEY) || '{}');
      saved = { name: typeof raw.name === 'string' ? raw.name : '', phone: typeof raw.phone === 'string' ? raw.phone : '' };
    });
    return saved;
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @returns {void}
   */
  function mountCalculator(deps, el) {
    const uid = 'qde' + ++mountCount;
    const left = h('div', { class: 'qde-left' });
    const right = h('div', { class: 'qde-right' });
    const contact = savedContact();
    /** @type {Calc} */
    const c = { deps, el, left, right, uid, state: { selection: initialSelection(deps, el), step: 1, name: contact.name, phone: contact.phone, project: '', addonsOpen: false, status: '', busy: false, failedLead: null } };
    right.addEventListener('change', (e) => onChange(c, e));
    right.addEventListener('click', (e) => onClick(c, e));
    right.addEventListener('submit', (e) => { onSubmit(c, e); });
    el.classList.add('qde');
    el.replaceChildren(h('div', { class: 'qde-card qde-split' }, [left, right]));
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
      if (el.dataset.qdEstimate === 'starter') mountStarter(deps, el);
      else mountCalculator(deps, el);
    }
  }

  root.QDEstimateWidget = Object.freeze({ mountAll });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAll());
  else mountAll();
  root.dispatchEvent(new Event('qd-estimate-ready'));
})(globalThis);
