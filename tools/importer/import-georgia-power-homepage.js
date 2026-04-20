/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import columnsParser from './parsers/columns.js';
import cardsParser from './parsers/cards.js';

// TRANSFORMER IMPORTS
import georgiapowerCleanup from './transformers/georgiapower-cleanup.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'columns': columnsParser,
  'cards': cardsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  georgiapowerCleanup,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'georgia-power-homepage',
  description: 'Georgia Power homepage with hero, promotions, quick links, content cards, marketplace, and resources',
  urls: [
    'https://www.georgiapower.com/',
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['.hero-container .adaptive-hero-carousel'],
    },
    {
      name: 'columns',
      instances: ['.header-promos', '.marketplace-promo .cta-row-sm', '#SOCO-ContentCard953320fc-b005-49ed-a308-052fcdbcb7c1'],
    },
    {
      name: 'cards',
      instances: ['#responsive-nav-bar .nav-bar', '.marketplace-promo .marketplace-items'],
    },
  ],
  sections: [
    { id: 'section-1', name: 'Hero Banner', selector: '.hero-container', style: null, blocks: ['hero'], defaultContent: [] },
    { id: 'section-2', name: 'Promo Banner Strip', selector: '.header-promos', style: null, blocks: ['columns'], defaultContent: [] },
    { id: 'section-3', name: 'Quick Links Bar', selector: '#responsive-nav-bar', style: null, blocks: ['cards'], defaultContent: [] },
    { id: 'section-4', name: 'Rain or Shine Content', selector: '#SOCO-ContentCardb44d664f-8446-486d-9e23-78a716b47adc', style: null, blocks: [], defaultContent: ['.content-card__title', '.content-card--content p', '.content-card--content a'] },
    { id: 'section-5', name: 'Marketplace Products', selector: '.marketplace-promo', style: null, blocks: ['columns', 'cards'], defaultContent: [] },
    { id: 'section-6', name: 'Tips Section', selector: '#SOCO-ContentCardd46c286a-26fe-4919-be60-ab261f60a257', style: null, blocks: ['columns'], defaultContent: ['h2', 'p'] },
    { id: 'section-7', name: 'Featured Resources', selector: '#SOCO-ContentCard953320fc-b005-49ed-a308-052fcdbcb7c1', style: null, blocks: ['columns'], defaultContent: ['h2'] },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path — output to /georgia-test
    const path = '/georgia-test';

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
