export default function decorate(block) {
  // Wrap each image cell in a <figure> with a <figcaption> derived from alt text
  block.querySelectorAll('picture').forEach((picture) => {
    const img = picture.querySelector('img');
    if (!img || !img.alt) return;

    const cell = picture.closest('div');
    if (!cell || cell.classList.contains('gallery-figure')) return;

    const figure = document.createElement('figure');
    figure.className = 'gallery-figure';

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'gallery-caption';
    figcaption.textContent = img.alt;

    // Move picture into figure, add caption, replace cell content
    figure.append(picture, figcaption);
    cell.textContent = '';
    cell.append(figure);
  });
}
