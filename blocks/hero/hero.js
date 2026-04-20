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

  // Bigfoot footprint trail — eerie pale impressions pressed into darkness
  // Left foot: organic shape with splayed toes, claw marks
  const leftFoot = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 120" fill="none">
    <defs>
      <radialGradient id="lpad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
        <stop offset="50%" stop-color="rgba(220,210,190,0.5)"/>
        <stop offset="85%" stop-color="rgba(180,160,130,0.25)"/>
        <stop offset="100%" stop-color="rgba(150,130,100,0)"/>
      </radialGradient>
      <radialGradient id="ltoe" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.6)"/>
        <stop offset="60%" stop-color="rgba(200,190,170,0.4)"/>
        <stop offset="100%" stop-color="rgba(150,130,100,0)"/>
      </radialGradient>
      <filter id="lgrit">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feComposite in="SourceGraphic" in2="noise" operator="in" result="textured"/>
        <feGaussianBlur in="textured" stdDeviation="0.6" result="blurred"/>
        <feBlend in="SourceGraphic" in2="blurred" mode="multiply"/>
      </filter>
    </defs>
    <g filter="url(#lgrit)">
      <path d="M24,95 C13,92 7,78 8,62 C9,48 16,40 23,36 C28,33 33,35 35,38 C37,35 44,33 50,38 C57,45 60,58 58,74 C55,88 45,98 35,98 C30,97 27,96 24,95Z" fill="url(#lpad)"/>
      <path d="M28,90 C19,87 15,76 16,64 C17,54 22,46 28,43 C32,41 35,43 35,46 C35,43 40,41 44,44 C50,50 52,62 50,76 C48,87 42,93 35,93Z" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="16" cy="30" rx="7.5" ry="11" transform="rotate(-20,16,30)" fill="url(#ltoe)"/>
      <ellipse cx="16" cy="30" rx="4" ry="7" transform="rotate(-20,16,30)" fill="rgba(255,255,255,0.3)"/>
      <line x1="13" y1="18" x2="15" y2="22" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="28" cy="23" rx="7.5" ry="11.5" transform="rotate(-8,28,23)" fill="url(#ltoe)"/>
      <ellipse cx="28" cy="23" rx="4" ry="7.5" transform="rotate(-8,28,23)" fill="rgba(255,255,255,0.3)"/>
      <line x1="27" y1="10" x2="28" y2="14" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="41" cy="23" rx="7" ry="11" transform="rotate(5,41,23)" fill="url(#ltoe)"/>
      <ellipse cx="41" cy="23" rx="4" ry="7" transform="rotate(5,41,23)" fill="rgba(255,255,255,0.3)"/>
      <line x1="41" y1="11" x2="41" y2="15" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="53" cy="29" rx="6" ry="9.5" transform="rotate(20,53,29)" fill="url(#ltoe)"/>
      <ellipse cx="53" cy="29" rx="3.5" ry="6" transform="rotate(20,53,29)" fill="rgba(255,255,255,0.25)"/>
      <line x1="56" y1="19" x2="55" y2="22" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="59" cy="40" rx="4.5" ry="7" transform="rotate(30,59,40)" fill="url(#ltoe)"/>
      <ellipse cx="59" cy="40" rx="2.5" ry="4.5" transform="rotate(30,59,40)" fill="rgba(255,255,255,0.2)"/>
    </g>
  </svg>`;

  // Right foot: mirrored
  const rightFoot = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 120" fill="none">
    <defs>
      <radialGradient id="rpad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
        <stop offset="50%" stop-color="rgba(220,210,190,0.5)"/>
        <stop offset="85%" stop-color="rgba(180,160,130,0.25)"/>
        <stop offset="100%" stop-color="rgba(150,130,100,0)"/>
      </radialGradient>
      <radialGradient id="rtoe" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.6)"/>
        <stop offset="60%" stop-color="rgba(200,190,170,0.4)"/>
        <stop offset="100%" stop-color="rgba(150,130,100,0)"/>
      </radialGradient>
      <filter id="rgrit">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feComposite in="SourceGraphic" in2="noise" operator="in" result="textured"/>
        <feGaussianBlur in="textured" stdDeviation="0.6" result="blurred"/>
        <feBlend in="SourceGraphic" in2="blurred" mode="multiply"/>
      </filter>
    </defs>
    <g filter="url(#rgrit)" transform="translate(70,0) scale(-1,1)">
      <path d="M24,95 C13,92 7,78 8,62 C9,48 16,40 23,36 C28,33 33,35 35,38 C37,35 44,33 50,38 C57,45 60,58 58,74 C55,88 45,98 35,98 C30,97 27,96 24,95Z" fill="url(#rpad)"/>
      <path d="M28,90 C19,87 15,76 16,64 C17,54 22,46 28,43 C32,41 35,43 35,46 C35,43 40,41 44,44 C50,50 52,62 50,76 C48,87 42,93 35,93Z" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="16" cy="30" rx="7.5" ry="11" transform="rotate(-20,16,30)" fill="url(#rtoe)"/>
      <ellipse cx="16" cy="30" rx="4" ry="7" transform="rotate(-20,16,30)" fill="rgba(255,255,255,0.3)"/>
      <line x1="13" y1="18" x2="15" y2="22" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="28" cy="23" rx="7.5" ry="11.5" transform="rotate(-8,28,23)" fill="url(#rtoe)"/>
      <ellipse cx="28" cy="23" rx="4" ry="7.5" transform="rotate(-8,28,23)" fill="rgba(255,255,255,0.3)"/>
      <line x1="27" y1="10" x2="28" y2="14" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="41" cy="23" rx="7" ry="11" transform="rotate(5,41,23)" fill="url(#rtoe)"/>
      <ellipse cx="41" cy="23" rx="4" ry="7" transform="rotate(5,41,23)" fill="rgba(255,255,255,0.3)"/>
      <line x1="41" y1="11" x2="41" y2="15" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round"/>
      <ellipse cx="53" cy="29" rx="6" ry="9.5" transform="rotate(20,53,29)" fill="url(#rtoe)"/>
      <ellipse cx="53" cy="29" rx="3.5" ry="6" transform="rotate(20,53,29)" fill="rgba(255,255,255,0.25)"/>
      <line x1="56" y1="19" x2="55" y2="22" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="59" cy="40" rx="4.5" ry="7" transform="rotate(30,59,40)" fill="url(#rtoe)"/>
      <ellipse cx="59" cy="40" rx="2.5" ry="4.5" transform="rotate(30,59,40)" fill="rgba(255,255,255,0.2)"/>
    </g>
  </svg>`;

  // Alternating left/right feet walking diagonally across the hero
  const prints = [
    { x: '55%', y: '2%', rot: -20, scale: 0.6, opacity: 0.55, foot: 'L' },
    { x: '63%', y: '18%', rot: -12, scale: 0.75, opacity: 0.7, foot: 'R' },
    { x: '70%', y: '36%', rot: -25, scale: 0.9, opacity: 0.8, foot: 'L' },
    { x: '78%', y: '55%', rot: -15, scale: 1, opacity: 0.9, foot: 'R' },
    { x: '85%', y: '74%', rot: -22, scale: 0.85, opacity: 0.75, foot: 'L' },
  ];

  const trail = document.createElement('div');
  trail.className = 'hero-footprint-trail';
  trail.setAttribute('aria-hidden', 'true');

  prints.forEach((p) => {
    const print = document.createElement('div');
    print.className = 'hero-footprint';
    print.innerHTML = p.foot === 'L' ? leftFoot : rightFoot;
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
