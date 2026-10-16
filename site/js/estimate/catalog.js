// @ts-check
/**
 * Estimate catalog: the one place to add or change what visitors can pick.
 * Every estimate card on the site (About page, guides, blog embeds, the tool
 * page) reads from here, so a change lands everywhere at once.
 *
 * `needs` are outcome-first choices (step 1). `addons` sit behind the
 * "+ Add creative production" toggle. An item with `exclusive: true`
 * ("Not sure yet") clears the others when picked, and is cleared by them.
 * No prices: the estimate itself comes from the team.
 */
(function (root) {
  'use strict';

  /** @type {import('./types').EstimateCatalog} */
  const catalog = {
    version: '2026-10-16',
    endpoint: 'https://script.google.com/macros/s/AKfycbzfTd1BieV-6g4OFB99RTufHTYxhFdS9J0w3qHik2IxxPDlJ2ss8Xkugcs10VINJBKb/exec',
    toolPath: '/tools/estimate.html',
    contactEmail: 'qdnco01@gmail.com',
    whatsapp: '918861179992',
    budgetLabel: 'Discuss on call',
    markets: {
      india: { label: 'India' },
      dubai: { label: 'Dubai' },
    },
    needs: [
      { id: 'ads', label: 'More enquiries', detail: 'Meta & Google ads', short: 'Ads' },
      { id: 'follow-up', label: 'Faster follow-up', detail: 'CRM and WhatsApp automation', short: 'CRM + WhatsApp' },
      { id: 'launch-page', label: 'A launch page', detail: 'Landing pages and SEO', short: 'Landing page + SEO' },
      { id: 'unsure', label: 'Not sure yet', detail: 'Help me decide', short: 'Unsure', exclusive: true },
    ],
    addons: [
      { id: 'shoot', label: 'Photo & video shoot', short: 'Shoot' },
      { id: 'drone', label: 'Drone', short: 'Drone' },
      { id: 'ugc', label: 'UGC creators', short: 'UGC' },
      { id: 'motion', label: 'Motion graphics', short: 'Motion' },
    ],
  };

  root.QDEstimateCatalog = Object.freeze(catalog);
})(globalThis);
