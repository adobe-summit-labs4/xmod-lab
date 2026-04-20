/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block.
 * Source: https://www.georgiapower.com/ - .adaptive-hero-carousel
 * Extracts first slide from adaptive carousel (mobile copy used for content).
 */
export default function parse(element, { document }) {
  // Extract from the first slide's mobile copy (has all the content)
  const slide = element.querySelector('.slides li') || element;
  const mobileCopy = slide.querySelector('.wrap-copy.hide-desktop article') || slide.querySelector('article');

  // Get background image from picture element
  const bgImg = slide.querySelector('picture img, img');

  // Get heading, description, CTA from article
  const heading = mobileCopy ? mobileCopy.querySelector('h2, h1, .adaptive-carousel--title') : element.querySelector('h2, h1');
  const description = mobileCopy ? mobileCopy.querySelector('p:not(.article-carousel-button)') : null;
  const ctaLink = mobileCopy ? mobileCopy.querySelector('.article-carousel-button a, a.btn') : element.querySelector('a.btn, a');

  const cells = [];

  // Row 1: background image (if available)
  if (bgImg) cells.push([bgImg]);

  // Row 2: heading + description + CTA
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (ctaLink) contentCell.push(ctaLink);
  if (contentCell.length > 0) cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
