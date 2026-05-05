/* Hamburger nav toggle */
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  for (const link of document.querySelectorAll('.nav-links a')) {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  }
}

/* Section fade-in on scroll (hero handled separately via CSS keyframes) */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

for (const el of document.querySelectorAll('.section')) {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
}

/* Card-level staggered fade-up — entries, projects, expertise, highlight blocks reveal individually as they scroll into view */
const fadeUpEls = document.querySelectorAll(
  '.entry, .project, .expertise-card, .highlights-block'
);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fadeUpEls.length && !reduced) {
  for (const el of fadeUpEls) el.classList.add('fade-up');

  const fadeUpObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeUpObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  for (const el of fadeUpEls) fadeUpObserver.observe(el);
}

/* Animated stat counters — count up from 0 to target on scroll into view */
const compactFmt = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatStatValue(n, format) {
  if (format === 'compact') return compactFmt.format(Math.floor(n));
  return Math.floor(n).toString();
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateStat(el, target, duration) {
  const fmt = el.dataset.format;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = easeOutCubic(t);
    el.textContent = formatStatValue(eased * target, fmt);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = formatStatValue(target, fmt);
    }
  }
  requestAnimationFrame(step);
}

const statsSection = document.querySelector('.stats-section');
if (statsSection && !prefersReducedMotion) {
  const statValues = statsSection.querySelectorAll('.stat-value');
  // Reset animatable stats to 0 so the count-up is visible. Static stats (no data-target) keep their text.
  for (const el of statValues) {
    if (el.dataset.target) {
      el.textContent = formatStatValue(0, el.dataset.format);
    }
  }

  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          statValues.forEach((el, idx) => {
            if (!el.dataset.target) return;
            const target = parseInt(el.dataset.target, 10);
            setTimeout(() => animateStat(el, target, 900), idx * 70);
          });
          obs.disconnect();
        }
      }
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

/* Section progress dots — scroll-spy that highlights the active section */
const sectionDots = document.querySelectorAll('.section-dots a');
if (sectionDots.length) {
  const tracked = Array.from(sectionDots)
    .map((dot) => ({ dot, section: document.getElementById(dot.dataset.section) }))
    .filter((p) => p.section);

  const dotObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          for (const dot of sectionDots) {
            dot.classList.toggle('active', dot.dataset.section === id);
          }
        }
      }
    },
    { rootMargin: '-40% 0px -40% 0px' }
  );

  for (const { section } of tracked) dotObserver.observe(section);
}

/* Contact form */
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submit = form.querySelector('.form-submit');
    const data = Object.fromEntries(new FormData(form).entries());

    submit.disabled = true;
    statusEl.className = 'form-status';
    statusEl.textContent = 'Sending…';

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      statusEl.className = 'form-status success';
      statusEl.textContent = 'Thanks — I’ll get back to you soon.';
      form.reset();
    } catch (err) {
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Something went wrong. Email me directly instead.';
    } finally {
      submit.disabled = false;
    }
  });
}
