// @ts-check
/**
 * One-tag embed for the estimate widget. Drop this on any page, blog post or
 * guide, next to a placeholder:
 *
 *   <div data-qd-estimate="starter" data-services="ads-cpql"></div>
 *   <script defer src="/js/estimate/embed.js"></script>
 *
 * It loads the stylesheet, lead capture, catalog, engine and widget in order,
 * skipping anything the page already has. Options live on the placeholder;
 * see widget.js for the full list.
 */
(function (root) {
  'use strict';

  const VERSION = '2026-10-16-9';
  const BASE = '/js/estimate/';
  const CSS = '/css/estimate.css';
  /** @type {Array<[string, string]>} script URL, global it defines */
  const SCRIPTS = [
    ['/js/lead-capture.js', 'QDLeadCapture'],
    [BASE + 'catalog.js', 'QDEstimateCatalog'],
    [BASE + 'engine.js', 'QDEstimate'],
    [BASE + 'listbox.js', 'QDListbox'],
    [BASE + 'widget.js', 'QDEstimateWidget'],
  ];

  /**
   * @param {string} href
   * @returns {void}
   */
  function loadCss(href) {
    if (document.querySelector('link[href^="' + href + '"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href + '?v=' + VERSION;
    document.head.append(link);
  }

  /**
   * @param {string} src
   * @param {string} global
   * @returns {Promise<void>}
   */
  function loadScript(src, global) {
    if (global in root) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src + '?v=' + VERSION;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('failed to load ' + src));
      document.head.append(script);
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async function boot() {
    loadCss(CSS);
    for (const [src, global] of SCRIPTS) {
      try {
        await loadScript(src, global);
      } catch (error) {
        // Lead capture is optional (the widget falls back to email); the rest is not.
        if (global !== 'QDLeadCapture') throw error;
        console.warn('[qd-estimate]', error);
      }
    }
  }

  boot().catch((error) => console.error('[qd-estimate] embed failed', error));
})(globalThis);
