export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    const imageRow = rows[0];
    const contentRow = rows[1];
    const contentCell = contentRow.querySelector(':scope > div') || contentRow;

    // Preserve existing <picture> with its <source> elements; fall back to wrapping bare <img>
    let pictureEl;
    const picture = imageRow.querySelector('picture');
    if (picture) {
      pictureEl = picture;
    } else {
      const img = imageRow.querySelector('img');
      if (img) {
        pictureEl = document.createElement('picture');
        pictureEl.append(img);
      }
    }

    if (pictureEl) {
      // Wrap image in a container for split layout (base variant)
      if (!block.classList.contains('article')) {
        const imageCol = document.createElement('div');
        imageCol.classList.add('hero-image-col');
        imageCol.append(pictureEl);
        contentCell.classList.add('hero-content-col');
        block.replaceChildren(imageCol, contentCell);
      } else {
        block.replaceChildren(pictureEl, contentCell);
      }
    } else {
      block.replaceChildren(contentCell);
    }
  }

  // Tag pills: eyebrow p and em-wrapped tags
  const contentDiv = block.querySelector(':scope > div, :scope > .hero-content-col');
  if (contentDiv) {
    const firstP = contentDiv.querySelector(':scope > p:first-child');
    if (firstP && !firstP.querySelector('a, img')) firstP.classList.add('tag-pill');
    contentDiv.querySelectorAll('em').forEach((em) => {
      if (!em.querySelector('a')) em.classList.add('tag-pill');
    });
  }
}
