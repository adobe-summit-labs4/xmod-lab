var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-georgia-power-homepage.js
  var import_georgia_power_homepage_exports = {};
  __export(import_georgia_power_homepage_exports, {
    default: () => import_georgia_power_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const slide = element.querySelector(".slides li") || element;
    const mobileCopy = slide.querySelector(".wrap-copy.hide-desktop article") || slide.querySelector("article");
    const bgImg = slide.querySelector("picture img, img");
    const heading = mobileCopy ? mobileCopy.querySelector("h2, h1, .adaptive-carousel--title") : element.querySelector("h2, h1");
    const description = mobileCopy ? mobileCopy.querySelector("p:not(.article-carousel-button)") : null;
    const ctaLink = mobileCopy ? mobileCopy.querySelector(".article-carousel-button a, a.btn") : element.querySelector("a.btn, a");
    const cells = [];
    if (bgImg) cells.push([bgImg]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (ctaLink) contentCell.push(ctaLink);
    if (contentCell.length > 0) cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse2(element, { document }) {
    const cells = [];
    const columns = element.querySelectorAll(":scope .bootstrap-container > .row > section, :scope > .bootstrap-container > .row > section");
    if (columns.length > 0) {
      const row = [];
      columns.forEach((col) => {
        const colContent = [];
        const title = col.querySelector(".item-grid__title, h3, h2");
        const desc = col.querySelector(".item-grid__description, p");
        const link = col.querySelector(".item-grid__link-container, a.btn, a");
        if (title) colContent.push(title);
        if (desc) colContent.push(desc);
        if (link && !title?.closest("a")) colContent.push(link);
        if (colContent.length === 0) {
          const cardTitle = col.querySelector(".content-card__title");
          const cardContent = col.querySelectorAll(".content-card--content p, .content-card--content a");
          if (cardTitle) colContent.push(cardTitle);
          cardContent.forEach((el) => colContent.push(el));
        }
        if (colContent.length === 0) {
          const allContent = col.querySelectorAll("h2, h3, h4, p, a, img, ul");
          allContent.forEach((el) => colContent.push(el));
        }
        if (colContent.length > 0) row.push(colContent);
      });
      if (row.length > 0) cells.push(row);
    } else {
      const contentCell = [];
      const headings = element.querySelectorAll("h2, h3, h4");
      const paragraphs = element.querySelectorAll("p");
      const links = element.querySelectorAll('a.btn, a[class*="btn"]');
      const images = element.querySelectorAll("img");
      headings.forEach((el) => contentCell.push(el));
      images.forEach((el) => contentCell.push(el));
      paragraphs.forEach((el) => contentCell.push(el));
      links.forEach((el) => contentCell.push(el));
      if (contentCell.length > 0) cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse3(element, { document }) {
    const cells = [];
    const navItems = element.querySelectorAll(".nav-bar__item");
    if (navItems.length > 0) {
      navItems.forEach((item) => {
        const icon = item.querySelector(".nav-bar__icon img, img");
        const label = item.querySelector("span");
        const href = item.getAttribute("href");
        const row = [];
        if (icon) row.push(icon);
        const textCell = [];
        if (label) {
          const link = document.createElement("a");
          link.href = href || "#";
          link.textContent = label.textContent.trim();
          textCell.push(link);
        }
        if (textCell.length > 0) row.push(textCell);
        if (row.length > 0) cells.push(row);
      });
    }
    const marketplaceItems = element.querySelectorAll(".marketplace-item");
    if (marketplaceItems.length > 0) {
      marketplaceItems.forEach((item) => {
        const img = item.querySelector(".marketplace-item__image img, img");
        const name = item.querySelector(".marketplace-item__name");
        const priceLabel = item.querySelector(".marketplace-item__general-label");
        const price = item.querySelector(".marketplace-item__price-sale");
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
    if (cells.length === 0) {
      const items = element.querySelectorAll("a, .item, .card");
      items.forEach((item) => {
        const img = item.querySelector("img");
        const text = item.querySelector("h3, h4, p, span");
        const row = [];
        if (img) row.push(img);
        if (text) row.push(text);
        if (row.length > 0) cells.push(row);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/georgiapower-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        ".skip-header"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        // Header and navigation
        "header.site-header",
        ".headerv2",
        ".header--version-2",
        ".header__nav",
        ".header__aux-nav",
        // Footer
        ".footer-column",
        ".soco-footer",
        // Tracking and non-content elements
        "iframe",
        "link",
        "noscript",
        "noindex"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/import-georgia-power-homepage.js
  var parsers = {
    "hero": parse,
    "columns": parse2,
    "cards": parse3
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "georgia-power-homepage",
    description: "Georgia Power homepage with hero, promotions, quick links, content cards, marketplace, and resources",
    urls: [
      "https://www.georgiapower.com/"
    ],
    blocks: [
      {
        name: "hero",
        instances: [".hero-container .adaptive-hero-carousel"]
      },
      {
        name: "columns",
        instances: [".header-promos", ".marketplace-promo .cta-row-sm", "#SOCO-ContentCard953320fc-b005-49ed-a308-052fcdbcb7c1"]
      },
      {
        name: "cards",
        instances: ["#responsive-nav-bar .nav-bar", ".marketplace-promo .marketplace-items"]
      }
    ],
    sections: [
      { id: "section-1", name: "Hero Banner", selector: ".hero-container", style: null, blocks: ["hero"], defaultContent: [] },
      { id: "section-2", name: "Promo Banner Strip", selector: ".header-promos", style: null, blocks: ["columns"], defaultContent: [] },
      { id: "section-3", name: "Quick Links Bar", selector: "#responsive-nav-bar", style: null, blocks: ["cards"], defaultContent: [] },
      { id: "section-4", name: "Rain or Shine Content", selector: "#SOCO-ContentCardb44d664f-8446-486d-9e23-78a716b47adc", style: null, blocks: [], defaultContent: [".content-card__title", ".content-card--content p", ".content-card--content a"] },
      { id: "section-5", name: "Marketplace Products", selector: ".marketplace-promo", style: null, blocks: ["columns", "cards"], defaultContent: [] },
      { id: "section-6", name: "Tips Section", selector: "#SOCO-ContentCardd46c286a-26fe-4919-be60-ab261f60a257", style: null, blocks: ["columns"], defaultContent: ["h2", "p"] },
      { id: "section-7", name: "Featured Resources", selector: "#SOCO-ContentCard953320fc-b005-49ed-a308-052fcdbcb7c1", style: null, blocks: ["columns"], defaultContent: ["h2"] }
    ]
  };
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_georgia_power_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = "/georgia-test";
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_georgia_power_homepage_exports);
})();
