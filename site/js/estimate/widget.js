// @ts-check
/**
 * Marketing cost calculator, lead-gated. Mounts on every element with a
 * data-qd-estimate attribute. No price is ever shown before the lead is sent.
 *
 *   1. Gate: "Your next project" band (copy left, name + phone card right).
 *      "Get my free estimate" validates, SENDS the lead, and only then opens
 *      the calculator. A visitor who already did this in this session
 *      (sessionStorage) skips straight to the calculator.
 *   2. Calculator: one wide card. Left "01 / Your price" (price for the chosen
 *      count, fees + media total, terms, what's included). Right "A couple of
 *      details" (role, service, campaign count).
 *   3. "This works. Let's talk" sends the exact quote as a follow-up lead for
 *      the same contact, then shows the thank-you with a WhatsApp link.
 *
 *   <div data-qd-estimate></div>            gate, then the calculator in place
 *   <div data-qd-estimate="starter"></div>  gate only; then goes to catalog.pricingPath
 *
 * Optional attributes:
 *   data-market="dubai"         fix the market (hides the India/Dubai switch)
 *   data-role, data-service, data-count   preselect inputs
 *   data-source="guide:cpql"    label stored with the lead (defaults to the page path)
 *   data-tone="gold"            gold variant instead of brand violet
 *   data-sync-url="true"        mirror the selection in the address bar
 *   gate copy: data-eyebrow, data-heading, data-heading-em, data-lede
 *
 * Needs catalog.js, engine.js, listbox.js and /js/lead-capture.js first (embed.js does that).
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
  /** @typedef {{ name: string, phone: string }} Contact */
  /** @typedef {{ catalog: Catalog, engine: Engine, listbox: import('./types').ListboxApi, leads: import('./types').LeadCaptureApi | null }} Deps */
  /** @typedef {{ selection: Selection, contact: Contact, sent: boolean, status: string, busy: boolean, failedLead: Record<string, string> | null }} State */
  /** @typedef {{ deps: Deps, el: HTMLElement, left: HTMLElement, right: HTMLElement, uid: string, state: State }} Calc */

  const CONTACT_KEY = 'qd-estimate-contact';
  /* The Apps Script backend can take 15-30 s to answer (cold start, sheet
     write, alert email). Wait this long for a confirmation, then carry on
     while the send finishes in the background with a longer limit. */
  const FAST_WAIT_MS = 5000;
  const SEND_TIMEOUT_MS = 60000;
  /* Default gate copy, written for the searches in seo/keyword-clusters.json
     (real estate marketing agency, real estate leads, agency pricing). QDnCo
     markets projects for developers; it does not sell property. */
  const GATE_COPY = {
    india: {
      eyebrow: 'Real estate marketing pricing',
      heading: 'Need more qualified leads for your project?',
      headingEm: 'Get your marketing estimate.',
      lede: 'Meta and Google campaigns for real estate developers, mandate firms and channel partners in Bengaluru. Share your name and number to see your monthly fee.',
    },
    dubai: {
      eyebrow: 'Dubai real estate marketing pricing',
      heading: 'Need more qualified buyer leads in Dubai?',
      headingEm: 'Get your marketing estimate.',
      lede: 'Meta and Google campaigns for Dubai developers and realtors, priced in AED per project. Share your name and number to see your monthly fee.',
    },
  };
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

  /**
   * @param {() => void} action
   * @returns {void}
   */
  function quietly(action) {
    try { action(); } catch (error) { console.warn('[qd-estimate] storage unavailable', error); }
  }

  /**
   * Contact saved in this session. `sent` is false when the About starter
   * handed it over and the gate lead still has to go out from this page.
   * @returns {{ contact: Contact, sent: boolean } | null}
   */
  function storedContact() {
    /** @type {{ contact: Contact, sent: boolean } | null} */
    let saved = null;
    quietly(() => {
      const raw = JSON.parse(root.sessionStorage.getItem(CONTACT_KEY) || 'null');
      if (raw && typeof raw.name === 'string' && typeof raw.phone === 'string') saved = { contact: { name: raw.name, phone: raw.phone }, sent: raw.captured === true };
    });
    return saved;
  }

  /**
   * @param {Contact} contact
   * @param {boolean} sent
   * @returns {void}
   */
  function rememberContact(contact, sent) {
    quietly(() => root.sessionStorage.setItem(CONTACT_KEY, JSON.stringify({ ...contact, captured: sent })));
  }

  /**
   * Resolves 'done' if `sending` settles within `ms`, 'slow' otherwise.
   * A rejection inside the window rejects; a later one is the caller's to handle.
   * @param {Promise<void>} sending
   * @param {number} ms
   * @returns {Promise<'done' | 'slow'>}
   */
  function within(sending, ms) {
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timer;
    const slow = new Promise((resolve) => { timer = setTimeout(() => resolve(/** @type {'slow'} */ ('slow')), ms); });
    return Promise.race([sending.then(() => /** @type {'done'} */ ('done')), slow]).finally(() => clearTimeout(timer));
  }

  /**
   * @param {HTMLElement} el
   * @returns {import('./types').MarketId}
   */
  function marketOf(el) {
    if (el.dataset.market) return el.dataset.market === 'dubai' ? 'dubai' : 'india';
    return /dubai/i.test(root.location.search) ? 'dubai' : 'india';
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
    await deps.leads.send(deps.catalog.endpoint, lead, { timeoutMs: SEND_TIMEOUT_MS });
  }

  /**
   * @param {Catalog} catalog
   * @param {Record<string, string>} lead
   * @returns {string}
   */
  function mailtoFor(catalog, lead) {
    const body = ['name', 'phone', 'project', 'catchment', 'source'].map((k) => k + ': ' + (lead[k] || '')).join('\n');
    return 'mailto:' + catalog.contactEmail + '?subject=' + encodeURIComponent('Website enquiry — ' + lead.name) + '&body=' + encodeURIComponent(body);
  }

  /**
   * @param {string} form label sent to analytics
   * @param {Record<string, string>} lead
   * @returns {void}
   */
  function track(form, lead) {
    const gtag = /** @type {{ gtag?: (...args: unknown[]) => void }} */ (/** @type {unknown} */ (root)).gtag;
    if (typeof gtag === 'function') gtag('event', 'generate_lead', { form, service: lead.services, addons: lead.addons });
  }

  /**
   * @param {string} message
   * @param {string} [mailto]
   * @returns {HTMLElement}
   */
  function statusLine(message, mailto) {
    return h('p', { class: 'qde-status', role: 'status' }, [message, mailto ? h('a', { href: mailto }, [' Email us instead.']) : null]);
  }

  /* ───────────────────────── 1. Gate ───────────────────────── */

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
   * @param {HTMLElement} el
   * @returns {HTMLElement}
   */
  function gateCopy(el) {
    const ds = el.dataset;
    const copy = GATE_COPY[marketOf(el)];
    return h('div', { class: 'qde-copy' }, [
      h('span', { class: 'qde-eyebrow' }, [ds.eyebrow || copy.eyebrow]),
      h('h2', {}, [ds.heading || copy.heading, h('br'), h('em', {}, [ds.headingEm || copy.headingEm])]),
      h('p', {}, [ds.lede || copy.lede]),
    ]);
  }

  /**
   * @param {string} uid
   * @returns {HTMLFormElement}
   */
  function gateForm(uid) {
    return /** @type {HTMLFormElement} */ (h('form', { class: 'qde-card qde-starter', novalidate: true, 'aria-label': 'Get your marketing estimate' }, [
      h('span', { class: 'qde-eyebrow' }, ['A small first step']),
      h('h3', {}, ['Get your marketing estimate.']),
      h('p', { class: 'qde-sub' }, ['Share your name and phone number to get started.']),
      h('div', { class: 'qde-fields' }, [
        field(uid + '-name', 'Your name', { name: 'name', autocomplete: 'name', placeholder: 'Add your name', maxlength: '120', required: 'true' }),
        field(uid + '-phone', 'Phone number', { name: 'phone', type: 'tel', autocomplete: 'tel', inputmode: 'tel', placeholder: 'Let’s connect', maxlength: '40', required: 'true' }),
      ]),
      h('button', { type: 'submit', class: 'qde-button' }, ['Get my free estimate ', arrow()]),
      h('p', { class: 'qde-status', role: 'status' }),
      h('small', { class: 'qde-foot' }, ['Continue to the full enquiry · No commitment']),
    ]));
  }

  /**
   * @param {Deps} deps
   * @param {HTMLFormElement} form
   * @returns {Contact | null} the contact, or null after showing the problem
   */
  function readGate(deps, form) {
    const data = new FormData(form);
    const contact = { name: String(data.get('name') || '').trim(), phone: String(data.get('phone') || '').trim() };
    const status = /** @type {HTMLElement} */ (form.querySelector('.qde-status'));
    const bad = !contact.name ? 'name' : !deps.engine.validPhone(contact.phone) ? 'phone' : '';
    if (!bad) return contact;
    status.replaceChildren(bad === 'name' ? 'Please add your name.' : 'Please enter a valid phone number, with country code.');
    /** @type {HTMLElement | null} */ (form.querySelector('input[name="' + bad + '"]'))?.focus();
    return null;
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @param {HTMLFormElement} form
   * @param {(contact: Contact, pending: Promise<void> | null) => void} onCaptured
   * @returns {Promise<void>}
   */
  async function submitGate(deps, el, form, onCaptured) {
    const contact = readGate(deps, form);
    if (!contact) return;
    if (el.dataset.qdEstimate === 'starter') {
      // Navigating would cancel an in-flight send, so the pricing page sends it.
      rememberContact(contact, false);
      return onCaptured(contact, null);
    }
    const button = /** @type {HTMLButtonElement} */ (form.querySelector('button[type=submit]'));
    const status = /** @type {HTMLElement} */ (form.querySelector('.qde-status'));
    button.disabled = true;
    status.replaceChildren('Saving your details…');
    const sending = sendGateLead(deps, el, contact);
    try {
      const outcome = await within(sending, FAST_WAIT_MS);
      onCaptured(contact, outcome === 'slow' ? sending : null);
    } catch (error) {
      console.error('[qd-estimate] gate lead not confirmed', error);
      button.disabled = false;
      const lead = deps.engine.buildGateLead(deps.catalog, marketOf(el), contact, el.dataset.source || root.location.pathname);
      status.replaceChildren(statusLine('We could not confirm your details were received. Please try again.', mailtoFor(deps.catalog, lead)));
    }
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @param {Contact} contact
   * @returns {Promise<void>}
   */
  async function sendGateLead(deps, el, contact) {
    const lead = deps.engine.buildGateLead(deps.catalog, marketOf(el), contact, el.dataset.source || root.location.pathname);
    await deliver(deps, lead);
    rememberContact(contact, true);
    track('pricing-gate', lead);
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @param {(contact: Contact, pending: Promise<void> | null) => void} onCaptured
   * @returns {void}
   */
  function mountGate(deps, el, onCaptured) {
    const form = gateForm('qde' + ++mountCount);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitGate(deps, el, form, onCaptured);
    });
    el.classList.add('qde');
    el.replaceChildren(h('div', { class: 'qde-band' }, [gateCopy(el), form]));
  }

  /* ───────────────────────── 2. Left: your price ───────────────────────── */

  /**
   * @param {Calc} c
   * @param {Priced} q
   * @returns {HTMLElement[]}
   */
  function pricedLeft(c, q) {
    const dubai = q.market === 'dubai';
    const unit = dubai ? 'per project / month · one campaign per project' : 'per campaign / month · INR · media spend additional';
    return [
      h('h3', { class: 'qde-role' }, [q.roleLabel]),
      h('p', { class: 'qde-price', role: 'status', 'aria-atomic': 'true' }, [
        h('strong', {}, [c.deps.engine.formatMoney(q.currency, q.perUnit)]),
        h('small', {}, [unit]),
      ]),
      h('p', { class: 'qde-terms' }, [dubai
        ? 'Research, strategy, campaign management, weekly reporting and a dedicated relationship manager. Three-month engagement; final scope agreed in writing.'
        : 'Indicative campaign retainer. Three-month engagement. Final scope confirmed after a project review.']),
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

  /* ───────────────────────── 2. Right: a couple of details ───────────────────────── */

  /**
   * A labelled dropdown (listbox.js) for role or service.
   * @param {Calc} c
   * @param {'role' | 'service'} name
   * @param {string} label
   * @param {import('./types').ListboxOption[]} options
   * @returns {HTMLElement}
   */
  function dropdownRow(c, name, label, options) {
    const id = c.uid + '-' + name;
    const box = c.deps.listbox.create({
      id, labelId: id + '-label', options, value: c.state.selection[name],
      onChange: (value) => {
        c.state.selection = c.deps.engine.normalise(c.deps.catalog, { ...c.state.selection, [name]: value });
        render(c, '#' + id);
      },
    });
    return h('div', { class: 'qde-row' }, [h('span', { id: id + '-label' }, [label]), box]);
  }

  /**
   * @param {Priced} q
   * @returns {string}
   */
  function stepHint(q) {
    if (q.flat) return 'Flat fee: the same price for every ' + q.unit + '.';
    return q.unit === 'project' ? 'One campaign per project. Your per-project price updates automatically.' : 'Your per-campaign retainer updates automatically.';
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
      h('small', { class: 'qde-hint' }, [stepHint(q)]),
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
    const s = c.state;
    const q = engine.quote(catalog, s.selection);
    const roles = catalog.roles.map((r) => ({
      value: r.id,
      label: s.selection.market === 'dubai' && r.dubaiLabel ? r.dubaiLabel : r.label,
      group: r.group === 'client' ? 'Real estate businesses' : 'Collaborations & other enquiries',
    }));
    const services = catalog.services.map((x) => ({ value: x.id, label: x.label, hint: x.priced ? 'Instant price' : 'Tailored quote' }));
    const cta = s.busy ? 'Sending…' : q.priced ? 'This works. Let’s talk ' : 'Let’s connect for a tailored scope ';
    return [
      h('div', { class: 'qde-head' }, [h('span', { class: 'qde-eyebrow' }, ['Calculate your starting cost']), marketSwitch(c)]),
      h('h3', { tabindex: '-1' }, ['A couple of details, ' + s.contact.name + '.']),
      dropdownRow(c, 'role', 'Which best describes you?', roles),
      dropdownRow(c, 'service', 'What service are you looking for?', services),
      stepper(c, q),
      h('button', { type: 'button', class: 'qde-button', 'data-action': 'send', disabled: s.busy }, [cta, s.busy ? null : arrow()]),
      s.status ? statusLine(s.status, s.failedLead ? mailtoFor(catalog, s.failedLead) : undefined) : null,
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
      h('h3', { tabindex: '-1' }, ['Thanks, ' + c.state.contact.name + '. We’re on it.']),
      h('p', { class: 'qde-sub' }, ['Our team will call you on ' + c.state.contact.phone + ' within one working day with your plan and quote. Want to talk sooner?']),
      h('a', { class: 'qde-button', href: wa, target: '_blank', rel: 'noopener' }, ['Chat on WhatsApp now ', arrow()]),
      c.state.status ? statusLine(c.state.status, c.state.failedLead ? mailtoFor(c.deps.catalog, c.state.failedLead) : undefined) : h('span'),
    ];
  }

  /* ───────────────────────── Render + events ───────────────────────── */

  /**
   * @param {Calc} c
   * @param {string} [focus] selector to focus after rendering
   * @returns {void}
   */
  function render(c, focus) {
    const right = c.state.sent ? rightDone(c) : rightDetails(c);
    c.left.replaceChildren(...leftPanel(c));
    c.right.replaceChildren(...right.filter((node) => node !== null));
    if (c.el.dataset.syncUrl === 'true') {
      root.history.replaceState(null, '', root.location.pathname + c.deps.engine.toQuery(c.state.selection) + root.location.hash);
    }
    if (focus) /** @type {HTMLElement | null} */ (c.right.querySelector(focus))?.focus();
  }

  /**
   * Send the exact quote as a follow-up lead for the captured contact.
   * @param {Calc} c
   * @returns {Promise<void>}
   */
  async function sendQuote(c) {
    const s = c.state;
    const lead = c.deps.engine.buildLead(c.deps.catalog, s.selection, { name: s.contact.name, phone: s.contact.phone, project: '' }, c.el.dataset.source || root.location.pathname);
    s.busy = true; s.status = ''; s.failedLead = null;
    render(c);
    const sending = deliver(c.deps, lead).then(() => track('pricing-quote', lead));
    try {
      if ((await within(sending, FAST_WAIT_MS)) === 'slow') watchSend(c, sending, lead, 'your quote');
      s.sent = true;
    } catch (error) {
      console.error('[qd-estimate] quote not confirmed', error);
      s.status = 'We could not confirm your quote was received. Please try again.';
      s.failedLead = lead;
    }
    s.busy = false;
    render(c, s.sent ? 'h3' : '[data-action="send"]');
  }

  /**
   * A send still running after the fast wait: report only a real failure.
   * @param {Calc} c
   * @param {Promise<unknown>} sending
   * @param {Record<string, string> | null} lead
   * @param {string} what
   * @returns {void}
   */
  function watchSend(c, sending, lead, what) {
    sending.catch((error) => {
      console.error('[qd-estimate] background send failed', error);
      c.state.status = 'We could not confirm ' + what + ' reached us. WhatsApp or email us and we will pick it up.';
      c.state.failedLead = lead;
      render(c);
    });
  }

  /**
   * @param {Calc} c
   * @param {string} action
   * @returns {void}
   */
  function runAction(c, action) {
    const s = c.state;
    if (action === 'inc' || action === 'dec') {
      const by = action === 'inc' ? 1 : -1;
      s.selection = c.deps.engine.normalise(c.deps.catalog, { ...s.selection, count: s.selection.count + by });
      const atEdge = by > 0 ? s.selection.count >= c.deps.catalog.maxCount : s.selection.count <= 1;
      return render(c, '[data-action="' + (atEdge ? (by > 0 ? 'dec' : 'inc') : action) + '"]');
    }
    if (action === 'send' && !s.busy) sendQuote(c);
  }

  /**
   * @param {Calc} c
   * @param {Event} event
   * @returns {void}
   */
  function onClick(c, event) {
    // Stay inside the panel: the host element itself may carry data-market.
    const target = /** @type {HTMLElement} */ (event.target).closest('[data-action],[data-market]');
    if (!(target instanceof HTMLElement) || !c.right.contains(target)) return;
    const market = target.dataset.market;
    if (market) {
      c.state.selection = c.deps.engine.normalise(c.deps.catalog, { ...c.state.selection, market: /** @type {import('./types').MarketId} */ (market) });
      return render(c, '[data-market="' + market + '"]');
    }
    runAction(c, target.dataset.action || '');
  }

  /* ───────────────────────── Mount ───────────────────────── */

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @returns {Selection}
   */
  function initialSelection(deps, el) {
    const ds = el.dataset;
    const market = marketOf(el);
    const useUrl = ds.syncUrl === 'true' && root.location.search.length > 1;
    const raw = useUrl ? { ...deps.engine.fromQuery(root.location.search), market, addons: [] } : { market, role: ds.role, service: ds.service, count: Number(ds.count) || 1, addons: [] };
    return deps.engine.normalise(deps.catalog, raw);
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @param {Contact} contact
   * @param {boolean} focusNow
   * @param {Promise<void> | null} pending gate send still running, if any
   * @returns {void}
   */
  function mountCalculator(deps, el, contact, focusNow, pending) {
    const left = h('div', { class: 'qde-left' });
    const right = h('div', { class: 'qde-right' });
    /** @type {Calc} */
    const c = { deps, el, left, right, uid: 'qde' + ++mountCount, state: { selection: initialSelection(deps, el), contact, sent: false, status: '', busy: false, failedLead: null } };
    right.addEventListener('click', (e) => onClick(c, e));
    el.classList.add('qde');
    el.replaceChildren(h('div', { class: 'qde-card qde-split' }, [left, right]));
    render(c, focusNow ? 'h3' : undefined);
    if (pending) watchSend(c, pending, deps.engine.buildGateLead(deps.catalog, marketOf(el), contact, el.dataset.source || root.location.pathname), 'your details');
  }

  /** @returns {Deps | null} */
  function resolveDeps() {
    const catalog = root.QDEstimateCatalog;
    const engine = root.QDEstimate;
    const listbox = root.QDListbox;
    if (!catalog || !engine || !listbox) {
      console.error('[qd-estimate] catalog.js, engine.js and listbox.js must load before widget.js');
      return null;
    }
    if (!root.QDLeadCapture) console.warn('[qd-estimate] lead-capture.js missing; enquiries fall back to email');
    return { catalog, engine, listbox, leads: root.QDLeadCapture || null };
  }

  /**
   * @param {Deps} deps
   * @param {HTMLElement} el
   * @returns {void}
   */
  function mountOne(deps, el) {
    const starter = el.dataset.qdEstimate === 'starter';
    const toPricing = () => { root.location.href = deps.catalog.pricingPath[marketOf(el)]; };
    const known = storedContact();
    if (known && !starter) {
      // Handed over from the About starter: send the gate lead from here.
      return mountCalculator(deps, el, known.contact, false, known.sent ? null : sendGateLead(deps, el, known.contact));
    }
    mountGate(deps, el, (contact, pending) => (starter ? toPricing() : mountCalculator(deps, el, contact, true, pending)));
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
      mountOne(deps, el);
    }
  }

  root.QDEstimateWidget = Object.freeze({ mountAll });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAll());
  else mountAll();
  root.dispatchEvent(new Event('qd-estimate-ready'));
})(globalThis);
