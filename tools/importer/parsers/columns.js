/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns block.
 * Source: https://www.georgiapower.com/ - .header-promos, .marketplace-promo, content-card sections
 * Extracts column sections from Georgia Power column-control layouts.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find column sections within bootstrap grid
  const columns = element.querySelectorAll(':scope .bootstrap-container > .row > section, :scope > .bootstrap-container > .row > section');

  if (columns.length > 0) {
    // Multi-column layout: extract content from each column
    const row = [];
    columns.forEach((col) => {
      const colContent = [];

      // Item grid pattern (promo cards)
      const title = col.querySelector('.item-grid__title, h3, h2');
      const desc = col.querySelector('.item-grid__description, p');
      const link = col.querySelector('.item-grid__link-container, a.btn, a');

      if (title) colContent.push(title);
      if (desc) colContent.push(desc);
      if (link && !title?.closest('a')) colContent.push(link);

      // Content card pattern
      if (colContent.length === 0) {
        const cardTitle = col.querySelector('.content-card__title');
        const cardContent = col.querySelectorAll('.content-card--content p, .content-card--content a');
        if (cardTitle) colContent.push(cardTitle);
        cardContent.forEach((el) => colContent.push(el));
      }

      // Fallback: grab all meaningful content
      if (colContent.length === 0) {
        const allContent = col.querySelectorAll('h2, h3, h4, p, a, img, ul');
        allContent.forEach((el) => colContent.push(el));
      }

      if (colContent.length > 0) row.push(colContent);
    });
    if (row.length > 0) cells.push(row);
  } else {
    // Single element with mixed content (e.g., marketplace header, content cards)
    const contentCell = [];
    const headings = element.querySelectorAll('h2, h3, h4');
    const paragraphs = element.querySelectorAll('p');
    const links = element.querySelectorAll('a.btn, a[class*="btn"]');
    const images = element.querySelectorAll('img');

    headings.forEach((el) => contentCell.push(el));
    images.forEach((el) => contentCell.push(el));
    paragraphs.forEach((el) => contentCell.push(el));
    links.forEach((el) => contentCell.push(el));

    if (contentCell.length > 0) cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
