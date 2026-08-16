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

/* ---------- scroll reveal ---------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
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
