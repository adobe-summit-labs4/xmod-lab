// Back to top button — appears after scrolling past the first section
function buildBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.append(btn);

  const scrollThreshold = 300;

  function toggleVisibility() {
    btn.classList.toggle('visible', window.scrollY > scrollThreshold);
  }

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Chat button — bottom-left with placeholder panel
function buildChatButton() {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-widget';
  wrapper.innerHTML = `
    <div class="chat-panel" aria-hidden="true">
      <div class="chat-panel-header">
        <span>WKND Chat</span>
        <button class="chat-panel-close" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="chat-panel-body">
        <p>Hey there! Chat is coming soon.</p>
        <p>In the meantime, drop us a line at <a href="mailto:hello@wknd-adventures.com">hello@wknd-adventures.com</a></p>
      </div>
    </div>
    <button class="chat-btn" aria-label="Open chat">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  `;
  document.body.append(wrapper);

  const btn = wrapper.querySelector('.chat-btn');
  const panel = wrapper.querySelector('.chat-panel');
  const closeBtn = wrapper.querySelector('.chat-panel-close');

  function toggle() {
    const isOpen = panel.getAttribute('aria-hidden') === 'false';
    panel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    btn.classList.toggle('active', !isOpen);
  }

  btn.addEventListener('click', toggle);
  closeBtn.addEventListener('click', toggle);
}

buildBackToTop();
buildChatButton();
