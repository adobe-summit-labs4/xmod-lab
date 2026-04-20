/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block.
 * Source: https://www.georgiapower.com/
 * Handles: nav-bar quick links (#responsive-nav-bar .nav-bar)
 *          and marketplace product items (.marketplace-items)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: Quick links nav bar (.nav-bar__item elements)
  const navItems = element.querySelectorAll('.nav-bar__item');
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      const icon = item.querySelector('.nav-bar__icon img, img');
      const label = item.querySelector('span');
      const href = item.getAttribute('href');
      const row = [];
      if (icon) row.push(icon);
      const textCell = [];
      if (label) {
        const link = document.createElement('a');
        link.href = href || '#';
        link.textContent = label.textContent.trim();
        textCell.push(link);
      }
      if (textCell.length > 0) row.push(textCell);
      if (row.length > 0) cells.push(row);
    });
  }

  // Pattern 2: Marketplace product items (.marketplace-item)
  const marketplaceItems = element.querySelectorAll('.marketplace-item');
  if (marketplaceItems.length > 0) {
    marketplaceItems.forEach((item) => {
      const img = item.querySelector('.marketplace-item__image img, img');
      const name = item.querySelector('.marketplace-item__name');
      const priceLabel = item.querySelector('.marketplace-item__general-label');
      const price = item.querySelector('.marketplace-item__price-sale');
      const row = [];
      if (img) row.push(img);
      const detailCell = [];
      if (name) detailCell.push(name);
      if (priceLabel) detailCell.push(priceLabel);
      if (price) detailCell.push(price);
      if (detailCell.length > 0) row.push(detailCell);
      if (row.length > 0) cells.push(row);
    });
  }

  // Fallback: generic card items
  if (cells.length === 0) {
    const items = element.querySelectorAll('a, .item, .card');
    items.forEach((item) => {
      const img = item.querySelector('img');
      const text = item.querySelector('h3, h4, p, span');
      const row = [];
      if (img) row.push(img);
      if (text) row.push(text);
      if (row.length > 0) cells.push(row);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
