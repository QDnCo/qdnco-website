// @ts-check
/**
 * Estimate catalog: the one place to change roles, services, rates and
 * add-ons. Every estimate card on the site (About, guides, blog embeds, the
 * calculator pages) reads from here, so a change lands everywhere at once.
 *
 * Pricing (ported from the QDnCo New contact-page calculator):
 * - Only `priced` services for `client` roles show a price; everything else
 *   shows "Let's connect".
 * - `rates[rateKey][n - 1]` is the monthly fee per campaign for n campaigns
 *   (the last entry applies to 5+).
 * - Dubai fees are per project in AED: INR rate × dubai.aedBase / dubai.inrBase.
 */
(function (root) {
  'use strict';

  /** @type {import('./types').EstimateCatalog} */
  const catalog = {
    version: '2026-10-16-3',
    endpoint: 'https://script.google.com/macros/s/AKfycbzfTd1BieV-6g4OFB99RTufHTYxhFdS9J0w3qHik2IxxPDlJ2ss8Xkugcs10VINJBKb/exec',
    toolPath: '/tools/marketing-cost-calculator.html',
    contactEmail: 'qdnco01@gmail.com',
    whatsapp: '918861179992',
    budgetLabel: 'Discuss on call',
    maxCount: 5,
    markets: {
      india: { label: 'India' },
      dubai: { label: 'Dubai' },
    },
    roles: [
      { id: 'developer', label: 'Developer', group: 'client', rateKey: 'developer' },
      { id: 'mandate', label: 'Mandate firm', group: 'client', rateKey: 'developer' },
      { id: 'channel-partner', label: 'Channel partner', dubaiLabel: 'Realtor / Channel partner', group: 'client', rateKey: 'channelPartner' },
      { id: 'collaborator', label: 'Collaborator / agency partner', group: 'other' },
      { id: 'provider', label: 'Service provider / specialist', group: 'other' },
      { id: 'press', label: 'Media / press', group: 'other' },
      { id: 'other', label: 'Other', group: 'other' },
    ],
    services: [
      { id: 'ads', label: 'Meta/Google Ad Campaigns', priced: true },
      { id: 'seo', label: 'Real Estate SEO & AI Search Optimization' },
      { id: 'crm', label: 'CRM Setup & Automation' },
      { id: 'landing-pages', label: 'Landing Pages' },
      { id: 'whatsapp', label: 'AI Lead Follow-Up & WhatsApp Automation' },
      { id: 'full', label: 'Full marketing & technology support' },
      { id: 'others', label: 'Others' },
    ],
    rates: {
      developer: [78000, 70200, 66000, 66000, 62400],
      channelPartner: [54000, 48600, 45600, 45600, 43200],
    },
    dubai: { aedBase: 4650, inrBase: 54000 },
    addons: [
      { id: 'shoot', label: 'Photo & video shoot', short: 'Shoot' },
      { id: 'drone', label: 'Drone', short: 'Drone' },
      { id: 'ugc', label: 'UGC creators', short: 'UGC' },
      { id: 'motion', label: 'Motion graphics', short: 'Motion' },
    ],
  };

  root.QDEstimateCatalog = Object.freeze(catalog);
})(globalThis);
