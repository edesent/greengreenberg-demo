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

/* ---------- D) LIVE CHAT WIDGET --------------------------------------------
   A self-contained chat widget: opens a panel, echoes the visitor's message,
   and replies with a canned answer based on simple keyword matching.
   Swap the replies below (or point sendToBackend() at a real service)
   to make it production chat.
   -------------------------------------------------------------------------- */
(function liveChat() {
  const root = document.getElementById('chat');
  if (!root) return;
  const launch = document.getElementById('chatLaunch');
  const close = document.getElementById('chatClose');
  const log = document.getElementById('chatLog');
  const form = document.getElementById('chatForm');
  const text = document.getElementById('chatText');
  const quick = document.getElementById('chatQuick');
  const badge = root.querySelector('.chat-badge');

  // canned replies keyed by keyword — edit freely
  const REPLIES = [
    { k: ['deny', 'denied', 'denial', 'appeal'], a: "I'm sorry to hear that. A denial is very common and can be appealed — our attorneys handle appeals through every level. Call (844) 331-8989 for a free review of your denial." },
    { k: ['fee', 'cost', 'price', 'pay', 'charge'], a: "There's no fee unless we win. Our fee is a capped percentage of the past-due benefits we recover, approved under federal rules — nothing out of pocket up front." },
    { k: ['long', 'time', 'how long', 'wait', 'take'], a: "Timelines vary by case and hearing backlog, but we push to keep things moving and meet every deadline. We'll give you a realistic estimate during your free consultation." },
    { k: ['ssdi', 'ssi', 'disability', 'qualify', 'eligible'], a: "We focus exclusively on SSDI and SSI claims. The quickest way to know if you qualify is a free case review — want us to call you?" },
    { k: ['hi', 'hello', 'hey'], a: "Hi there! 👋 How can we help with your Social Security Disability claim today?" }
  ];
  const FALLBACK = "Thanks for your message! A team member will follow up. For immediate help, call (844) 331-8989 — your consultation is free.";

  function open() { root.classList.add('open'); if (badge) badge.style.display = 'none'; setTimeout(() => text.focus(), 300); }
  function shut() { root.classList.remove('open'); }
  launch.addEventListener('click', open);
  close.addEventListener('click', shut);

  function bubble(msg, who) {
    const el = document.createElement('div');
    el.className = 'chat-msg ' + who;
    el.textContent = msg;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }
  function botReply(userMsg) {
    const t = document.createElement('div');
    t.className = 'chat-msg bot typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(t); log.scrollTop = log.scrollHeight;
    const low = userMsg.toLowerCase();
    const hit = REPLIES.find(r => r.k.some(k => low.includes(k)));
    setTimeout(() => { t.remove(); bubble(hit ? hit.a : FALLBACK, 'bot'); }, 900);
  }
  function send(msg) {
    if (!msg.trim()) return;
    bubble(msg, 'user');
    if (quick) quick.style.display = 'none';
    botReply(msg);
  }

  form.addEventListener('submit', e => { e.preventDefault(); send(text.value); text.value = ''; });
  quick.addEventListener('click', e => { if (e.target.tagName === 'BUTTON') send(e.target.textContent); });
})();

/* ---------- E) WHY-US ACCORDION --------------------------------------------
   Click a reason to expand its detail. Opening one closes the others.
   -------------------------------------------------------------------------- */
(function whyAccordion() {
  const acc = document.getElementById('whyAccordion');
  if (!acc) return;
  const items = Array.from(acc.querySelectorAll('.acc-item'));
  items.forEach(item => {
    const head = item.querySelector('.acc-head');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => { i.classList.remove('open'); i.querySelector('.acc-head').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) { item.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
    });
  });
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
