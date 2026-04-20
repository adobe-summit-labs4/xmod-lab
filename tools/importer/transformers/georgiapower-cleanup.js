/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Georgia Power cleanup.
 * Removes non-authorable content (header, footer, nav, cookie banners, tracking).
 * Selectors from captured DOM of https://www.georgiapower.com/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie/consent overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '.skip-header',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      // Header and navigation
      'header.site-header',
      '.headerv2',
      '.header--version-2',
      '.header__nav',
      '.header__aux-nav',
      // Footer
      '.footer-column',
      '.soco-footer',
      // Tracking and non-content elements
      'iframe',
      'link',
      'noscript',
      'noindex',
    ]);
    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-analytics');
    });
  }
}
