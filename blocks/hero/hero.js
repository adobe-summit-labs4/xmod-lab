export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    const imageRow = rows[0];
    const contentRow = rows[1];
    const contentCell = contentRow.querySelector(':scope > div') || contentRow;

    // Preserve existing <picture> with its <source> elements; fall back to wrapping bare <img>
    const picture = imageRow.querySelector('picture');
    if (picture) {
      block.replaceChildren(picture, contentCell);
    } else {
      const img = imageRow.querySelector('img');
      if (img) {
        const pic = document.createElement('picture');
        pic.append(img);
        block.replaceChildren(pic, contentCell);
      } else {
        block.replaceChildren(contentCell);
      }
    }
  }

  // Bigfoot footprint trail across the hero
  const footprintSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 100" fill="white">
    <ellipse cx="30" cy="62" rx="16" ry="28" />
    <ellipse cx="30" cy="62" rx="10" ry="24" fill="rgba(0,0,0,0.15)" />
    <ellipse cx="10" cy="28" rx="6" ry="9" />
    <ellipse cx="10" cy="28" rx="3.5" ry="6" fill="rgba(0,0,0,0.1)" />
    <ellipse cx="22" cy="20" rx="6.5" ry="9.5" />
    <ellipse cx="22" cy="20" rx="4" ry="6.5" fill="rgba(0,0,0,0.1)" />
    <ellipse cx="36" cy="18" rx="6.5" ry="9.5" />
    <ellipse cx="36" cy="18" rx="4" ry="6.5" fill="rgba(0,0,0,0.1)" />
    <ellipse cx="49" cy="24" rx="6" ry="9" />
    <ellipse cx="49" cy="24" rx="3.5" ry="6" fill="rgba(0,0,0,0.1)" />
    <ellipse cx="41" cy="32" rx="4" ry="6.5" />
    <ellipse cx="41" cy="32" rx="2.5" ry="4.5" fill="rgba(0,0,0,0.1)" />
  </svg>`;

  const prints = [
    { x: '58%', y: '5%', rot: -25, scale: 0.65, opacity: 0.35 },
    { x: '68%', y: '25%', rot: -10, scale: 0.8, opacity: 0.45 },
    { x: '76%', y: '48%', rot: -30, scale: 1, opacity: 0.5 },
    { x: '84%', y: '72%', rot: -18, scale: 0.7, opacity: 0.4 },
  ];

  const trail = document.createElement('div');
  trail.className = 'hero-footprint-trail';
  trail.setAttribute('aria-hidden', 'true');

  prints.forEach((p) => {
    const print = document.createElement('div');
    print.className = 'hero-footprint';
    print.innerHTML = footprintSvg;
    print.style.cssText = `left:${p.x};top:${p.y};transform:rotate(${p.rot}deg) scale(${p.scale});opacity:${p.opacity};`;
    trail.append(print);
  });

  block.append(trail);

  // Tag pills: eyebrow p and em-wrapped tags
  const contentDiv = block.querySelector(':scope > div');
  if (contentDiv) {
    const firstP = contentDiv.querySelector(':scope > p:first-child');
    if (firstP && !firstP.querySelector('a, img')) firstP.classList.add('tag-pill');
    contentDiv.querySelectorAll('em').forEach((em) => {
      if (!em.querySelector('a')) em.classList.add('tag-pill');
    });
  }
}
