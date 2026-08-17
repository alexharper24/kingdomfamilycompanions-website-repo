/* Kingdom Family Companions — shared JS: nav drawer, scroll reveal, inquiry form */

/* ---------- mobile nav drawer ---------- */
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  links.parentElement.appendChild(overlay); // true sibling of the drawer
  const setMenu = (open) => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  overlay.addEventListener('click', () => setMenu(false));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
})();

/* ---------- scroll reveal ----------
   Two speeds:
   - default: fires 300px early, so content is already there when the reader arrives
     instead of fading in underneath them.
   - inside .hold-reveal: waits until the element is genuinely on screen, for a section
     that should not appear until the reader scrolls to it.
*/
(function () {
  // Marks that JS is running. The hidden state lives on .js .reveal, so if this script
  // never executes nothing is left invisible.
  document.documentElement.classList.add('js');

  const all = [...document.querySelectorAll('.reveal')];
  if (!all.length) return;
  const show = el => el.classList.add('in');

  if (!('IntersectionObserver' in window)) { all.forEach(show); return; }

  // A held section must not appear until the reader actually scrolls. Visibility alone
  // is not enough: on a tall window, or when the browser is zoomed out, the section is
  // already on screen at load and would reveal straight away.
  const heldEls = all.filter(el => el.closest('.hold-reveal'));
  const earlyEls = all.filter(el => !el.closest('.hold-reveal'));
  let scrolled = window.scrollY > 30;

  const onIntersect = (entries, obs) => entries.forEach(en => {
    if (en.isIntersecting) { show(en.target); obs.unobserve(en.target); }
  });
  const early = new IntersectionObserver(onIntersect, { threshold: 0, rootMargin: '300px 0px' });
  earlyEls.forEach(el => early.observe(el));

  let held = null;
  const armHeld = () => {
    if (held || !heldEls.length) return;
    held = new IntersectionObserver(onIntersect, { threshold: 0, rootMargin: '-8% 0px -5% 0px' });
    heldEls.forEach(el => held.observe(el));
  };
  if (scrolled) armHeld();

  const onFirstScroll = () => {
    if (window.scrollY <= 30) return;
    scrolled = true;
    armHeld();
    removeEventListener('scroll', onFirstScroll);
  };
  addEventListener('scroll', onFirstScroll, { passive: true });

  // Keyboard safety: if someone tabs into the held section before scrolling, show it
  // rather than moving focus into invisible content.
  document.querySelectorAll('.hold-reveal').forEach(sec => {
    sec.addEventListener('focusin', () => { heldEls.forEach(show); }, { once: true });
  });

  // Backstop: some environments have IntersectionObserver but never deliver callbacks.
  // A cheap scroll/resize check reveals anything already on screen, so content can
  // never be stranded at opacity 0. Held sections still wait until they are in view.
  const sweep = () => {
    let remaining = 0;
    all.forEach(el => {
      if (el.classList.contains('in')) return;
      const r = el.getBoundingClientRect();
      const isHeld = el.closest('.hold-reveal');
      if (isHeld && !scrolled) { remaining++; return; }   // waits for a real scroll
      const margin = isHeld ? 0 : 300;
      if (r.top < innerHeight + margin && r.bottom > -margin) show(el); else remaining++;
    });
    if (!remaining) {
      removeEventListener('scroll', sweep);
      removeEventListener('resize', sweep);
    }
  };
  addEventListener('scroll', sweep, { passive: true });
  addEventListener('resize', sweep, { passive: true });
  sweep();
})();

/* ---------- chat launcher: call, text, or email from any page ---------- */
(function () {
  const fab = document.createElement('button');
  fab.className = 'chat-fab';
  fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>Let’s Chat';
  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.innerHTML = '<h3>Talk puppies with us</h3>'
    + '<p>Call or text is the fastest way to reach us. We are happy to answer questions or set up a visit or video call.</p>'
    + '<div class="row"><span class="lbl">Call/Text</span><a href="tel:+12603069010">(260) 306-9010</a></div>'
    + '<div class="row"><span class="lbl">Email</span><a href="mailto:info@kingdomfamilycompanions.com">Email us</a></div>'
    + '<div class="row"><span class="lbl">Inquiry</span><a href="contact.html">Start an inquiry</a></div>';
  document.body.appendChild(panel);
  document.body.appendChild(fab);
  fab.addEventListener('click', () => {
    const open = !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { panel.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); } });
})();

/* ---------- testimonials: reveal the rest on mobile ---------- */
(function () {
  const btn = document.getElementById('testiToggle');
  const grid = document.getElementById('testiGrid');
  if (!btn || !grid) return;
  btn.addEventListener('click', function () {
    const open = !grid.classList.contains('expanded');
    grid.classList.toggle('expanded', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Show fewer reviews' : 'Show more reviews';
    if (!open) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
})();

/* ---------- puppy photo carousel ---------- */
(function () {
  document.querySelectorAll('.carousel').forEach(function (car) {
    const slides = [...car.querySelectorAll('.frame img')];
    const thumbs = [...car.querySelectorAll('.cthumbs button')];
    const counter = car.querySelector('.count');
    if (slides.length < 2) {
      car.querySelectorAll('.cnav').forEach(b => b.remove());
      if (counter) counter.remove();
      return;
    }
    let i = 0;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.hidden = k !== i; });
      thumbs.forEach((t, k) => t.setAttribute('aria-current', k === i ? 'true' : 'false'));
      if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    };
    car.querySelector('.cprev').addEventListener('click', () => show(i - 1));
    car.querySelector('.cnext').addEventListener('click', () => show(i + 1));
    thumbs.forEach((t, k) => t.addEventListener('click', () => show(k)));
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { show(i - 1); }
      if (e.key === 'ArrowRight') { show(i + 1); }
    });
    show(0);
  });
})();

/* ---------- reserve buttons: friendly guard until PayPal links are configured ---------- */
(function () {
  const links = document.querySelectorAll('.pay-link');
  if (!links.length) return;
  links.forEach(a => a.addEventListener('click', function (e) {
    if (!a.href.includes('YOUR_PAYPAL')) return; // real link configured, let it through
    e.preventDefault();
    const box = a.closest('.reserve');
    const prev = box.querySelector('.form-error'); if (prev) prev.remove();
    const d = document.createElement('div');
    d.className = 'form-error';
    d.textContent = 'Online payment is not connected yet. Please call or text us at (260) 306-9010 to reserve, or start an inquiry below.';
    box.appendChild(d);
  }));
})();

/* ---------- inquiry form (Formspree, AJAX, on-page thank-you) ---------- */
(function () {
  const form = document.getElementById('inquiryForm');
  const thanks = document.getElementById('formThanks');
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const prev = form.querySelector('.form-error'); if (prev) prev.remove();
    if (form.action.includes('YOUR_FORM_ID')) {
      return showError("This form isn't connected yet. Please call or text us at (260) 306-9010, or email info@kingdomfamilycompanions.com.");
    }
    const original = btn.textContent;
    btn.classList.add('is-sending'); btn.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        form.hidden = true; thanks.hidden = false;
        thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
      } else {
        const d = await res.json().catch(() => ({}));
        showError(((d.errors && d.errors.map(x => x.message).join(', ')) || 'Something went wrong.') + ' Please try again, or call or text us.');
      }
    } catch {
      showError("We couldn't reach the server. Please check your connection and try again, or call or text us.");
    } finally {
      btn.classList.remove('is-sending'); btn.textContent = original;
    }
  });
  function showError(t) {
    const d = document.createElement('div');
    d.className = 'form-error'; d.textContent = t;
    form.querySelector('.submit-row').after(d);
  }
})();
