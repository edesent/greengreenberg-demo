/* ============================================================================
   GREEN & GREENBERG — SITE SCRIPT
   Three small, self-contained pieces:
     A) HERO SLIDER   – auto-rotating banner with dots + arrows
     B) MOBILE NAV    – hamburger toggle
     C) SCROLL REVEAL – fade-in sections as they enter the viewport
   ============================================================================ */

/* ---------- A) HERO SLIDER -------------------------------------------------- */
(function heroSlider() {
  const track = document.getElementById('slides');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('heroDots');
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  let i = 0, timer;

  // build a dot per slide
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    if (n === 0) b.classList.add('is-active');
    b.addEventListener('click', () => go(n, true));
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function go(n, user) {
    slides[i].classList.remove('is-active');
    dots[i].classList.remove('is-active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    dots[i].classList.add('is-active');
    if (user) restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); }

  prev.addEventListener('click', () => go(i - 1, true));
  next.addEventListener('click', () => go(i + 1, true));
  restart();
})();

/* ---------- B) MOBILE NAV --------------------------------------------------- */
(function mobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
})();

/* ---------- C) SCROLL REVEAL ------------------------------------------------ */
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();
