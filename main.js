/* Surf Dracula — tiny, dependency-free */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- starfield (canvas) ---------- */
  const cv = document.getElementById('stars');
  const ctx = cv.getContext('2d');
  let W, H, DPR, stars = [], shooting = null;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
    const n = Math.round((innerWidth * innerHeight) / 5200);
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.9,
      r: (Math.random() ** 3 * 1.6 + 0.35) * DPR,
      a: Math.random() * 0.7 + 0.2, s: Math.random() * 0.02 + 0.004, p: Math.random() * 6.28,
      warm: Math.random() < 0.18
    }));
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const tw = reduce ? s.a : s.a * (0.6 + 0.4 * Math.sin(s.p + t * s.s * 0.06));
      ctx.globalAlpha = tw;
      ctx.fillStyle = s.warm ? '#ffe9b0' : '#e8e4ff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
    if (!reduce) {
      if (!shooting && Math.random() < 0.0025) {
        shooting = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.35, vx: (6 + Math.random() * 4) * DPR, vy: (2 + Math.random() * 2) * DPR, life: 1 };
      }
      if (shooting) {
        const s = shooting, g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
        g.addColorStop(0, `rgba(255,240,210,${s.life})`); g.addColorStop(1, 'rgba(255,240,210,0)');
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.6 * DPR;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14); ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= 0.018;
        if (s.life <= 0) shooting = null;
      }
      requestAnimationFrame(draw);
    }
    ctx.globalAlpha = 1;
  }
  resize(); requestAnimationFrame(draw);
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { resize(); if (reduce) draw(0); }, 150); });

  /* ---------- nav ---------- */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 24);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .runtime').forEach((el, i) => {
    if (el.closest('.hero')) el.style.transitionDelay = `${0.08 * i}s`;
    io.observe(el);
  });
  document.querySelectorAll('.phases .phase').forEach((el, i) => el.style.transitionDelay = `${i * 0.12}s`);

  /* ---------- hero parallax (pointer + scroll) ---------- */
  const art = document.getElementById('heroArt');
  if (!reduce && art) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const fine = matchMedia('(pointer: fine)').matches;
    if (fine) addEventListener('pointermove', (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      art.style.setProperty('--mx', cx.toFixed(3));
      art.style.setProperty('--my', cy.toFixed(3));
      art.style.setProperty('--sy', Math.min(scrollY / innerHeight, 1).toFixed(3));
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- copy CA ---------- */
  const toast = document.getElementById('toast');
  let tt;
  function say(msg) {
    toast.textContent = msg; toast.classList.add('is-on');
    clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('is-on'), 2200);
  }
  document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const val = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: val });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    say(val.startsWith('REPLACE') ? 'Placeholder copied. Real CA drops at launch 🧛' : 'Contract address copied 🏄');
  }));
})();
