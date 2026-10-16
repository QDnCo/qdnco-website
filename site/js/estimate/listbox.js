// @ts-check
/**
 * Select-only combobox for the estimate widget (WAI-ARIA APG pattern).
 * Replaces native <select> so the menu matches the card in light and dark,
 * keeps grouped options, and works the same on desktop and touch.
 *
 * Focus stays on the trigger button; aria-activedescendant points at the
 * highlighted option. Keys: Enter/Space/ArrowDown/ArrowUp open; arrows,
 * Home/End and typing move; Enter/Space/Tab choose; Escape closes.
 *
 *   QDListbox.create({ id, labelId, options, value, onChange })
 */
(function (root) {
  'use strict';

  /** @typedef {import('./types').ListboxOption} Option */
  /** @typedef {import('./types').ListboxConfig} Config */
  /** @typedef {{ cfg: Config, wrap: HTMLElement, button: HTMLElement, list: HTMLElement, items: HTMLElement[], active: number, typed: string, typedAt: number, onDoc: (e: Event) => void }} Box */

  const SVG = 'http://www.w3.org/2000/svg';
  const TYPEAHEAD_MS = 600;

  /**
   * @param {string} tag
   * @param {Record<string, string>} attrs
   * @param {Array<Node | string>} [children]
   * @returns {HTMLElement}
   */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    for (const child of children || []) node.append(child);
    return node;
  }

  /**
   * @param {string} cls
   * @param {string} d path data on a 20x20 grid
   * @returns {SVGSVGElement}
   */
  function icon(cls, d) {
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', cls);
    const path = document.createElementNS(SVG, 'path');
    path.setAttribute('d', d);
    svg.append(path);
    return svg;
  }

  /**
   * @param {Config} cfg
   * @param {Option} o
   * @param {number} i
   * @returns {HTMLElement}
   */
  function optionNode(cfg, o, i) {
    const text = el('span', { class: 'qde-dd-text' }, [o.label]);
    if (o.hint) text.append(el('small', {}, [o.hint]));
    return el('div', {
      id: cfg.id + '-opt-' + i, role: 'option', class: 'qde-dd-opt',
      'data-value': o.value, 'aria-selected': String(o.value === cfg.value),
    }, [text, icon('qde-dd-check', 'M4.5 10.5l3.5 3.5 7.5-8')]);
  }

  /**
   * Options in source order, wrapped in role="group" when they carry a group.
   * @param {Config} cfg
   * @param {HTMLElement} list
   * @returns {HTMLElement[]}
   */
  function fillList(cfg, list) {
    /** @type {Map<string, HTMLElement>} */
    const groups = new Map();
    const items = cfg.options.map((o, i) => optionNode(cfg, o, i));
    cfg.options.forEach((o, i) => {
      if (!o.group) { list.append(items[i]); return; }
      let group = groups.get(o.group);
      if (!group) {
        const headId = cfg.id + '-grp-' + groups.size;
        group = el('div', { role: 'group', 'aria-labelledby': headId }, [el('div', { id: headId, class: 'qde-dd-group' }, [o.group])]);
        groups.set(o.group, group);
        list.append(group);
      }
      group.append(items[i]);
    });
    return items;
  }

  /**
   * @param {Box} box
   * @param {number} index
   * @returns {void}
   */
  function highlight(box, index) {
    box.active = Math.max(0, Math.min(box.items.length - 1, index));
    box.items.forEach((item, i) => item.classList.toggle('is-active', i === box.active));
    const item = box.items[box.active];
    box.button.setAttribute('aria-activedescendant', item.id);
    const top = item.offsetTop, bottom = top + item.offsetHeight;
    if (top < box.list.scrollTop) box.list.scrollTop = top - 6;
    else if (bottom > box.list.scrollTop + box.list.clientHeight) box.list.scrollTop = bottom - box.list.clientHeight + 6;
  }

  /** @param {Box} box @returns {boolean} */
  function isOpen(box) {
    return box.button.getAttribute('aria-expanded') === 'true';
  }

  /**
   * Open below the trigger, or above it when the viewport has no room below.
   * @param {Box} box
   * @returns {void}
   */
  function open(box) {
    if (isOpen(box)) return;
    const rect = box.button.getBoundingClientRect();
    const below = root.innerHeight - rect.bottom, above = rect.top;
    const up = below < 280 && above > below;
    box.wrap.classList.toggle('is-up', up);
    box.list.style.maxHeight = Math.max(160, Math.min(340, (up ? above : below) - 16)) + 'px';
    box.list.hidden = false;
    box.button.setAttribute('aria-expanded', 'true');
    box.wrap.classList.add('is-open');
    highlight(box, Math.max(0, box.cfg.options.findIndex((o) => o.value === box.cfg.value)));
    document.addEventListener('pointerdown', box.onDoc, true);
  }

  /**
   * @param {Box} box
   * @returns {void}
   */
  function close(box) {
    document.removeEventListener('pointerdown', box.onDoc, true);
    if (!isOpen(box)) return;
    box.list.hidden = true;
    box.button.setAttribute('aria-expanded', 'false');
    box.button.removeAttribute('aria-activedescendant');
    box.wrap.classList.remove('is-open');
  }

  /**
   * @param {Box} box
   * @param {number} index
   * @returns {void}
   */
  function choose(box, index) {
    close(box);
    const o = box.cfg.options[index];
    if (o && o.value !== box.cfg.value) box.cfg.onChange(o.value);
  }

  /**
   * Jump to the next option whose label starts with what was just typed.
   * @param {Box} box
   * @param {string} key
   * @returns {void}
   */
  function typeahead(box, key) {
    const now = Date.now();
    box.typed = (now - box.typedAt < TYPEAHEAD_MS ? box.typed : '') + key.toLowerCase();
    box.typedAt = now;
    open(box);
    const n = box.items.length;
    const start = box.typed.length === 1 ? box.active + 1 : box.active;
    for (let k = 0; k < n; k++) {
      const i = (start + k) % n;
      if (box.cfg.options[i].label.toLowerCase().startsWith(box.typed)) return highlight(box, i);
    }
  }

  /**
   * @param {Box} box
   * @param {KeyboardEvent} e
   * @returns {boolean} whether the key was handled
   */
  function keyClosed(box, e) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].indexOf(e.key) < 0 && e.key !== 'Home' && e.key !== 'End') return false;
    open(box);
    if (e.key === 'Home') highlight(box, 0);
    if (e.key === 'End') highlight(box, box.items.length - 1);
    return true;
  }

  /**
   * @param {Box} box
   * @param {KeyboardEvent} e
   * @returns {boolean} whether the key was handled
   */
  function keyOpen(box, e) {
    const moves = { ArrowDown: box.active + 1, ArrowUp: box.active - 1, Home: 0, End: box.items.length - 1, PageDown: box.active + 5, PageUp: box.active - 5 };
    if (e.key in moves) { highlight(box, moves[/** @type {keyof typeof moves} */ (e.key)]); return true; }
    if (e.key === 'Enter' || e.key === ' ') { choose(box, box.active); return true; }
    if (e.key === 'Escape') { close(box); return true; }
    if (e.key === 'Tab') choose(box, box.active);
    return false;
  }

  /**
   * @param {Box} box
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  function onKey(box, e) {
    if (e.altKey && e.key === 'ArrowUp' && isOpen(box)) { e.preventDefault(); return choose(box, box.active); }
    if (e.key.length === 1 && e.key !== ' ' && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); return typeahead(box, e.key); }
    const handled = isOpen(box) ? keyOpen(box, e) : keyClosed(box, e);
    if (handled) e.preventDefault();
  }

  /**
   * @param {Box} box
   * @returns {void}
   */
  function wire(box) {
    box.button.addEventListener('click', () => (isOpen(box) ? close(box) : open(box)));
    box.button.addEventListener('keydown', (e) => onKey(box, e));
    box.button.addEventListener('blur', () => close(box));
    // pointerdown keeps focus on the trigger, so blur does not close first.
    box.list.addEventListener('pointerdown', (e) => e.preventDefault());
    box.list.addEventListener('pointermove', (e) => {
      const item = /** @type {HTMLElement} */ (e.target).closest('[role="option"]');
      if (item instanceof HTMLElement) highlight(box, box.items.indexOf(item));
    });
    box.list.addEventListener('click', (e) => {
      const item = /** @type {HTMLElement} */ (e.target).closest('[role="option"]');
      if (item instanceof HTMLElement) choose(box, box.items.indexOf(item));
    });
  }

  /**
   * @param {Config} cfg
   * @returns {HTMLElement}
   */
  function create(cfg) {
    const current = cfg.options.find((o) => o.value === cfg.value) || cfg.options[0];
    const button = el('button', {
      type: 'button', id: cfg.id, class: 'qde-dd-btn', role: 'combobox',
      'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-controls': cfg.id + '-list',
      'aria-labelledby': cfg.labelId + ' ' + cfg.id,
    }, [el('span', { class: 'qde-dd-value' }, [current ? current.label : '']), icon('qde-dd-chev', 'M5.5 8l4.5 4.5L14.5 8')]);
    const list = el('div', { id: cfg.id + '-list', class: 'qde-dd-list', role: 'listbox', 'aria-labelledby': cfg.labelId, tabindex: '-1' });
    list.hidden = true;
    const wrap = el('div', { class: 'qde-dd' }, [button, list]);
    /** @type {Box} */
    const box = { cfg, wrap, button, list, items: fillList(cfg, list), active: 0, typed: '', typedAt: 0, onDoc: () => {} };
    box.onDoc = (e) => { if (!(e.target instanceof Node) || !wrap.contains(e.target)) close(box); };
    wire(box);
    return wrap;
  }

  root.QDListbox = Object.freeze({ create });
})(globalThis);
