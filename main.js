/* ============================================================
   SNEHA BANKAPALLI — PORTFOLIO SCRIPTS
   ============================================================ */

/* ---------- SCROLL PROGRESS BAR ---------- */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / maxScroll) * 100}%`;
});

/* ---------- NAV SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});


/* ---------- SPARKLE CURSOR ---------- */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorGlow');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let lastSparkle = 0;
  let lastX = 0, lastY = 0;

  const sparkleColors = [
    'rgba(167,139,250,1)',
    'rgba(6,182,212,1)',
    'rgba(255,255,255,0.9)',
    'rgba(236,72,153,0.9)',
    'rgba(250,204,21,0.9)',
  ];
  const starChars = ['✦', '✧', '⋆', '·', '✶', '★'];

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    const dx = mx - lastX;
    const dy = my - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const now = Date.now();
    if (speed > 2 && now - lastSparkle > 30) {
      spawnSparkle(mx, my);
      lastSparkle = now;
    }
    lastX = mx;
    lastY = my;
  });

  function animateRing() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  function spawnSparkle(x, y) {
    const useStar = Math.random() > 0.45;
    const color   = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

    if (useStar) {
      const el = document.createElement('span');
      el.className = 'sparkle-star';
      el.textContent = starChars[Math.floor(Math.random() * starChars.length)];
      const size = 8 + Math.random() * 10;
      const lift = 14 + Math.random() * 22;
      const dx   = (Math.random() - 0.5) * 20;
      const rot  = (Math.random() > 0.5 ? 1 : -1) * (45 + Math.random() * 90);
      const dur  = 500 + Math.random() * 350;
      el.style.cssText = `left:${x+(Math.random()-0.5)*14}px;top:${y+(Math.random()-0.5)*14}px;color:${color};--sz:${size}px;--lift:${lift}px;--dx:${dx}px;--rot:${rot}deg;--dur:${dur}ms;text-shadow:0 0 6px ${color};`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), dur);
    } else {
      const el  = document.createElement('div');
      el.className = 'sparkle';
      const size = 3 + Math.random() * 5;
      const lift = 10 + Math.random() * 20;
      const dur  = 400 + Math.random() * 300;
      el.style.cssText = `left:${x+(Math.random()-0.5)*16}px;top:${y+(Math.random()-0.5)*16}px;width:${size}px;height:${size}px;background:${color};box-shadow:0 0 ${size*2}px ${color};--lift:${lift}px;--dur:${dur}ms;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), dur);
    }
  }

  document.querySelectorAll('a, button, .tilt-card, .badge, .cert-card, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('large'); ring.classList.add('large'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('large'); ring.classList.remove('large'); });
  });

  window.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) setTimeout(() => spawnSparkle(e.clientX, e.clientY), i * 30);
  });
})();


/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---------- TYPED TEXT ---------- */
const titles = [
  'Data Engineer',
  'Pipeline Architect',
  'Snowflake Expert',
  'Cloud Data Architect',
  'AI & Data Architect',
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = titles[titleIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 2200);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, isDeleting ? 50 : 85);
}
type();

/* ---------- MARQUEE DUPLICATE (seamless loop) ---------- */
(function initMarquee() {
  const inner = document.getElementById('marqueeInner');
  if (!inner) return;
  const clone = inner.cloneNode(true);
  inner.parentElement.appendChild(clone);
})();

/* ---------- PARTICLE CANVAS (with mouse parallax) ---------- */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mx = 0;
  let my = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : canvas.height + 10;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.35 + 0.08);
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212';
      this.parallaxFactor = Math.random() * 0.04 + 0.01;
    }
    update() {
      this.x = this.baseX + mx * this.parallaxFactor * canvas.width * 0.1;
      this.y = this.baseY + my * this.parallaxFactor * canvas.height * 0.1;
      this.baseX += this.speedX;
      this.baseY += this.speedY;
      if (this.baseY < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ---------- MAGNETIC BUTTONS ---------- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    setTimeout(() => { btn.style.transition = ''; }, 500);
  });
});

/* ---------- 3D CARD TILT ---------- */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = y * -10;
    const rotY = x * 10;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });
});

/* ---------- SKILLS TABS ---------- */
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(`tab-${btn.dataset.tab}`);
    target.classList.add('active');
    animateSkillBars(target);
  });
});

function animateSkillBars(panel) {
  panel.querySelectorAll('.skill-fill').forEach(bar => {
    bar.classList.remove('animated');
    requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('animated')));
  });
}
const defaultPanel = document.getElementById('tab-data');
if (defaultPanel) animateSkillBars(defaultPanel);

/* ---------- COUNTER ANIMATION ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ---------- INTERSECTION OBSERVER (AOS + counters) ---------- */
const countersStarted = new Set();

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        if (!countersStarted.has(el)) { countersStarted.add(el); animateCounter(el); }
      });
      const panel = entry.target.querySelector('.skills-panel.active');
      if (panel) animateSkillBars(panel);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => io.observe(el));

const heroSection = document.getElementById('hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
          if (!countersStarted.has(el)) {
            countersStarted.add(el);
            setTimeout(() => animateCounter(el), 700);
          }
        });
      }
    });
  }, { threshold: 0.5 });
  heroObserver.observe(heroSection);
}

/* ---------- TERMINAL ANIMATION ---------- */
(function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;
  const lines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: '<span class="t-highlight">sneha_bankapalli</span> — Senior Data Engineer' },
    { type: 'cmd', text: 'cat skills.txt | grep expert' },
    { type: 'out', text: 'Snowflake · PySpark · Kafka · dbt · Airflow · AWS' },
    { type: 'cmd', text: 'echo $YEARS_EXPERIENCE' },
    { type: 'out', text: '<span class="t-highlight">7+</span> years across fintech · healthcare · telecom' },
    { type: 'cmd', text: '_' },
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let currentEl = null;

  function nextLine() {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    const span = document.createElement('span');
    span.className = 't-line';
    if (line.type === 'cmd') {
      span.innerHTML = '<span class="t-prompt">$ </span><span class="t-cmd"></span>';
      body.appendChild(span);
      currentEl = span.querySelector('.t-cmd');
    } else {
      span.innerHTML = `<span class="t-out">${line.text}</span>`;
      body.appendChild(span);
      lineIdx++;
      setTimeout(nextLine, 180);
      return;
    }
    typeChar(line.text);
  }

  function typeChar(text) {
    if (charIdx < text.length) {
      if (text[charIdx] === '_') {
        currentEl.innerHTML = '<span class="t-cursor-blink">█</span>';
        return;
      }
      currentEl.textContent += text[charIdx];
      charIdx++;
      setTimeout(() => typeChar(text), 55 + Math.random() * 30);
    } else {
      charIdx = 0;
      lineIdx++;
      setTimeout(nextLine, 300);
    }
  }

  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(nextLine, 600);
        terminalObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  terminalObserver.observe(body);
})();

/* ---------- CONTACT FORM (Formspree) ---------- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit');
  const orig = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/mojkpogg', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm),
    });
    if (res.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#059669';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.textContent = 'Failed — try emailing directly';
    btn.style.background = '#dc2626';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
});

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));
