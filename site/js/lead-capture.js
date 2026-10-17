(function (root) {
  'use strict';
  const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function context(pageUrl, referrer) {
    const page = new URL(pageUrl);
    const result = { page: page.origin + page.pathname, referrer: '' };
    for (const field of fields) result[field] = (page.searchParams.get(field) || '').trim().slice(0, 200);
    try { result.referrer = referrer ? new URL(referrer).origin : ''; } catch (_) {}
    return result;
  }

  function requestId() {
    if (root.crypto && root.crypto.randomUUID) return root.crypto.randomUUID();
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  async function send(endpoint, lead, options) {
    const settings = options || {};
    const fetcher = settings.fetch || root.fetch.bind(root);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), settings.timeoutMs || 25000);
    try {
      const response = await fetcher(endpoint, {
        method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(lead), signal: controller.signal,
      });
      if (!response.ok || response.type === 'opaque') throw new Error('receipt_unconfirmed');
      const receipt = await response.json();
      if (!receipt || receipt.ok !== true) throw new Error('receipt_unconfirmed');
      if (receipt.request_id && receipt.request_id !== lead.request_id) throw new Error('receipt_mismatch');
      return receipt;
    } finally {
      clearTimeout(timer);
    }
  }

  root.QDLeadCapture = Object.freeze({ context, requestId, send });
})(globalThis);
