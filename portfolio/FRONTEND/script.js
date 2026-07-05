emailjs.init({
    publicKey: "o2ufeC8yNmHLmVfL_"
});

/* ─── DOM READY ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticles();
  initCursor();
  initNavbar();
  initTypingEffect();
  initScrollProgress();
  initRevealAnimations();
  initTabSwitcher();
  initProjectFilters();
  initSkillBars();
  initCircularSkills();
  initCounters();
  initTiltCards();
  initContactForm();
  initBackToTop();
  initSectionDots();
  initFloatBadges();
  initActiveNavLinks();
});

emailjs.init({
    publicKey: "o2ufeC8yNmHLmVfL_"
});


/*LOADER */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const MIN_VISIBLE_MS = 420;

  const startAt = performance.now(); 

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';

  const dismiss = (delay = 0) => {
    setTimeout(() => {
      if (loader.classList.contains('hidden')) return;
      loader.classList.add('loader--done');

      // Let the internal exit animation play, then hide completely.
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 9020);
    }, delay);
  };

  // Dismiss smoothly when everything is loaded (assets/images/etc.)
  window.addEventListener(
    'load',
    () => {
      const elapsed = performance.now() - startAt;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      dismiss(remaining);
    },
    { once: true }
  );

  // Safety net: if load doesn't fire for some reason, dismiss after a cap.
  setTimeout(() => {
    if (loader.classList.contains('hidden') || loader.classList.contains('loader--done')) return;
    dismiss(0);
  }, 150000);
}



/*PARTICLES.JS */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  // Respect reduced motion: skip particles entirely.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const el = document.getElementById('particles-js');
    if (el) el.style.display = 'none';
    return;
  }

  fetch('particles.json')
    .then(r => r.json())
    .then(config => particlesJS('particles-js', config))
    .catch(() => {
 
      particlesJS('particles-js', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 1000 } },
          color: { value: ['#00E5FF', '#8B5CF6', '#e3dfee'] },
          shape: { type: 'circle' },
          opacity: { value: 0.45, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
          size: { value: 2.5, random: true },
          line_linked: { enable: true, distance: 120, color: '#00E5FF', opacity: 0.12, width: 1 },
          move: { enable: true, speed: 1.0, random: true, out_mode: 'out', attract: { enable: false } }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { grab: { distance: 180, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
      });
    });
}

/*CUSTOM CURSOR*/
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

 
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0; // live mouse position
  let ringX  = 0, ringY  = 0; // ring's current drawn position
  let rafId  = null;
  let isMoving = false;

 
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

   
    dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;

    if (!isMoving) {
      isMoving = true;
      rafId = requestAnimationFrame(animateRing);
    }
  }, { passive: true });


  function animateRing() {
    const dx = mouseX - ringX;
    const dy = mouseY - ringY;

    ringX += dx * 0.75;
    ringY += dy * 0.75;

    ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;

   
    if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
      rafId = requestAnimationFrame(animateRing);
    } else {
     
      isMoving = false;
      rafId = null;
    }
  }

  // Hover expansion 

  document.body.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .project-card, .interest-card, .achievement-card, .idea-card, .filter-btn, .tab-btn, .tech-icon, .tilt-card')) {
      ring.classList.add('hover');
    }
  });
  document.body.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .project-card, .interest-card, .achievement-card, .idea-card, .filter-btn, .tab-btn, .tech-icon, .tilt-card')) {
      ring.classList.remove('hover');
    }
  });

  // Hide/show on window leave/enter 
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  }, { passive: true });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  }, { passive: true });
}

/* NAVBAR  */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!navbar) return;

  // Scroll behaviour
  let navTicking = false;
  const onScroll = () => {
    if (!navTicking) {
      navTicking = true;
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        navTicking = false;
      });
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile 
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      // Animate bars
      const bars = toggle.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }
}

/*TYPING EFFECT */
function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const words = [
    'Developer',
    'AI Enthusiast',
    'Full Stack Developer',
    'ML Explorer',
    'Open Source Contributor',
    'Creative Technologist',
    'Game Developer',
    'UI/UX Designer'
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseCount = 0;

  const TYPING_SPEED  = 80;
  const DELETE_SPEED  = 40;
  const PAUSE_FRAMES  = 22; 

  function tick() {
    const word = words[wordIdx];

    if (!deleting) {
      // Typing
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        // Pause before deleting
        pauseCount++;
        if (pauseCount >= PAUSE_FRAMES) { deleting = true; pauseCount = 0; }
        setTimeout(tick, 120);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      // Deleting
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  setTimeout(tick, 1200);
}

/* SCROLL PROGRESS BAR*/
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let spTicking = false;
  window.addEventListener('scroll', () => {
    if (!spTicking) {
      spTicking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        spTicking = false;
      });
    }
  }, { passive: true });
}

/* REVEAL ON SCROLL*/
function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('.reveal')]
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/*JOURNEY TAB SWITCHER */
function initTabSwitcher() {
  const btns = document.querySelectorAll('.tab-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      // Update buttons
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide containers
      document.querySelectorAll('.timeline-container').forEach(c => {
        if (c.id === `tab-${tab}`) {
          c.classList.remove('hidden');
          // Re-trigger reveals inside
          c.querySelectorAll('.reveal').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 100);
          });
        } else {
          c.classList.add('hidden');
        }
      });
    });
  });
}

/*PROJECT FILTERS */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards with animation
      cards.forEach(card => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s var(--ease) both';
          setTimeout(() => { card.style.animation = ''; }, 500);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/*SKILL BARS */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.dataset.width || 0;
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/*CIRCULAR SKILL */
function initCircularSkills() {
  const circles = document.querySelectorAll('.circle-prog');
  if (!circles.length) return;

  // Circle circumference = 2πr = 2 × π × 38 ≈ 238.76
  const CIRCUMFERENCE = 238.76;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle  = entry.target;
        const percent = parseFloat(circle.dataset.percent) || 0;
        const offset  = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
        circle.style.strokeDashoffset = offset;

        // Add percentage label
        const svg    = circle.closest('svg');
        const parent = svg?.parentElement;
        if (parent && !parent.querySelector('.circle-pct')) {
          const label = document.createElement('span');
          label.className = 'circle-pct';
          label.textContent = percent + '%';
          label.style.cssText = `
            position:absolute; top:50%; left:50%;
            transform:translate(-50%,-50%);
            font-family:var(--font-display); font-size:16px;
            font-weight:900; color:var(--white);
            pointer-events:none;
          `;
          parent.style.position = 'relative';
          parent.appendChild(label);
        }

        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.4 });

  circles.forEach(c => observer.observe(c));
}

/* ANIMATED COUNTERS*/
function initCounters() {
  const counterEls = document.querySelectorAll('.counter-number, .stat-num');
  if (!counterEls.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10) || 0;
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

/*  TILT CARDS */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  // Disable on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect    = card.getBoundingClientRect();
      const cx      = rect.left + rect.width  / 2;
      const cy      = rect.top  + rect.height / 2;
      const dx      = (e.clientX - cx) / (rect.width  / 2);
      const dy      = (e.clientY - cy) / (rect.height / 2);
      const rotateX = dy * -8;
      const rotateY = dx *  8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/*  CONTACT FORM */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btnText    = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    const btnIcon    = btn.querySelector('.btn-icon');

    // Validate
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      shakeForm(form);
      return;
    }
    if (!isValidEmail(email)) {
      shakeInput(form.email);
      return;
    }

    // Loading state
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    if (btnIcon) btnIcon.classList.add('hidden');

    try {

  await emailjs.send(
    "service_73ibiiu",
    "template_9oitkir",
    {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    }
  );

  showSuccess();
  form.reset();

} catch (error) {

  console.error(error);
  alert("Failed to send message.");

} finally {

  btn.disabled = false;
  btnText.classList.remove('hidden');
  btnLoading.classList.add('hidden');

  if (btnIcon) btnIcon.classList.remove('hidden');

}
  });

  function showSuccess() {
    if (!success) return;
    success.classList.remove('hidden');
    success.style.animation = 'fadeInUp 0.4s var(--ease)';
    setTimeout(() => {
      success.classList.add('hidden');
      success.style.animation = '';
    }, 5000);
  }

  function shakeForm(el) {
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => { el.style.animation = ''; }, 400);
  }

  function shakeInput(el) {
    el.style.borderColor = '#ef4444';
    el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.2)';
    el.style.animation   = 'shake 0.4s ease';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow   = '';
      el.style.animation   = '';
    }, 1000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Floating label effect
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

/*  BACK TO TOP */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  let bttTicking = false;
  window.addEventListener('scroll', () => {
    if (!bttTicking) {
      bttTicking = true;
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 500);
        bttTicking = false;
      });
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/*  SECTION DOTS */
function initSectionDots() {
  const dots    = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('section[id]');
  if (!dots.length || !sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id  = entry.target.id;
        dots.forEach(d => {
          d.classList.toggle('active', d.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* FLOATING BADGES  */
function initFloatBadges() {
  const badges = document.querySelectorAll('.float-badge');
  if (!badges.length) return;

  let bx = 0, by = 0, rafPending = false;

  document.addEventListener('mousemove', e => {
    bx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
    by = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        badges.forEach((badge, i) => {
          const depth = (i % 3 + 1) * 5;
          badge.style.transform = `translate3d(${bx * depth}px,${by * depth}px,0)`;
        });
        rafPending = false;
      });
    }
  }, { passive: true });
}

/*  ACTIVE NAV LINKS */
function initActiveNavLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/*fadeInUp*/
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();

/*SCROLLING */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // navbar height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/*hero glows*/
(function initParallaxBlobs() {
  const glows = document.querySelectorAll('.hero-bg-glow');
  if (!glows.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        glows.forEach((g, i) => {
          g.style.transform = `translate3d(0,${y * (i + 1) * 0.07}px,0)`;
        });
        ticking = false;
      });
    }
  }, { passive: true });
})();

/*  ROADMAP NODE ANIMATION */
(function initRoadmapReveal() {
  const nodes = document.querySelectorAll('.roadmap-node');
  if (!nodes.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.5s var(--ease) both';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  nodes.forEach((node, i) => {
    node.style.opacity = '0';
    observer.observe(node);
    // Stagger
    node.style.animationDelay = `${i * 0.1}s`;
  });
})();

/* ACHIEVEMENT CARD HOVER GLOW */
(function initAchievementHover() {
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.ach-icon');
      if (!icon) return;
      if      (icon.classList.contains('trophy') || icon.classList.contains('medal'))
        card.style.boxShadow = '0 8px 40px rgba(255,209,102,0.15)';
      else if (icon.classList.contains('cert') || icon.classList.contains('code'))
        card.style.boxShadow = '0 8px 40px rgba(0,229,255,0.15)';
      else
        card.style.boxShadow = '0 8px 40px rgba(139,92,246,0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });
})();


(function initInterestCards() {
  document.querySelectorAll('.interest-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.interest-icon');
      if (icon) icon.style.transform = 'scale(1.15) rotate(8deg)';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.interest-icon');
      if (icon) icon.style.transform = '';
    });
  });
})();

/* SOCIAL LINK */
(function initSocialLinks() {
  document.querySelectorAll('.social-link').forEach(link => {
    const label = link.getAttribute('aria-label');
    if (label) link.title = label;
  });
})();

/* TIMELINE CARD CONNECTOR */
(function initTimelineGlow() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.style.setProperty('--line-glow', '1');
      }
    });
  }, { threshold: 0.2 });

  observer.observe(timeline);
})();

/* PERFORMANCE  */
(function lazyEnhancements() {
  const idleCb = window.requestIdleCallback || (cb => setTimeout(cb, 100));

  idleCb(() => {
    const featured = document.querySelector('.featured-project');
    if (featured) {
      featured.style.animation = 'featuredBorder 6s linear infinite';
    }
  });

  idleCb(() => {
    // Section number parallax 
    const nums = [...document.querySelectorAll('.section-number')];
    if (!nums.length) return;
    let snTicking = false;
    window.addEventListener('scroll', () => {
      if (!snTicking) {
        snTicking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          nums.forEach((num, i) => {
            num.style.transform = `translate3d(0,${Math.sin(y * 0.002 + i) * 3}px,0)`;
          });
          snTicking = false;
        });
      }
    }, { passive: true });
  });
})();

/*  PREVENT FOUC css fail */
window.addEventListener('load', () => {
  // If loader exists and we didn't already hide it (e.g., due to safety net), ensure it exits.
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden') && !loader.classList.contains('loader--done')) {
    loader.classList.add('loader--done');
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 520);
  }
});


/*  KEYBOARD NAVIGATION  */
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    // Showing focus outlines 
    document.body.classList.add('keyboard-nav');
  }
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

const kbStyle = document.createElement('style');
kbStyle.textContent = `
  .keyboard-nav *:focus {
    outline: 2px solid var(--cyan) !important;
    outline-offset: 3px !important;
  }
`;
document.head.appendChild(kbStyle);

/* Konami Code*/
(function initKonami() {
  const code = [38,38,40,40,37,39,37,39,66,65];
  let idx = 0;

  document.addEventListener('keydown', e => {
    if (e.keyCode === code[idx]) {
      idx++;
      if (idx === code.length) {
        idx = 0;
        // Trigger 
        document.body.style.animation = 'rainbow 2s linear';
        const rStyle = document.createElement('style');
        rStyle.textContent = `@keyframes rainbow { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }`;
        document.head.appendChild(rStyle);
        setTimeout(() => { document.body.style.animation = ''; }, 2000);
      }
    } else {
      idx = 0;
    }
  });
})();

console.log(
  '%c⚡ Arnav Portfolio %c\nBuilt with pure HTML · CSS · JS\nKonami Code: ↑↑↓↓←→←→BA for a surprise 🎉',
  'background: linear-gradient(135deg, #00E5FF, #8B5CF6); color: #050816; font-size: 16px; font-weight: bold; padding: 6px 12px; border-radius: 4px;',
  'color: #9CA3AF; font-size: 12px;'
);

/*  PROJECT MODAL SYSTEM*/

const PROJECT_DATA = {
'emw-encrypted-messaging': {
     title:   'EmW – Encrypted Messaging Website',
    tag:     'Cybersecurity · Web',
    tagClass:'ai-tag',
    icon:    'fas fa-hand-paper',
    iconBg:  'rgba(0,229,255,0.12)',
    iconColor: 'var(--cyan)',
    desc: `Developed a secure messaging platform that implements password-based encryption to protect user communications. The application transforms plain text into encrypted ASCII-encoded data and allows authorized users to recover the original message using the correct password, demonstrating practical web security and cryptography concepts.`,
    features: [
       'End-to-end password-based message protection',
    'Custom text-to-encrypted ASCII conversion system',
    'Secure message recovery using matching credentials',
    'Responsive cross-device user experience',
    ],
    tech:['HTML', 'CSS', 'JavaScript', 'Cryptography', 'ASCII Encoding', 'Responsive Web Design'],
    stats: [
      { val: '<50ms', label: 'Response Time' },
      { val: '98%',    label: 'safe' },
      
    ],
    github: '#',
    demo:   '#',
  },

  'gesture-control system': {
     title:   'Gesture Control System',
    tag:     'python· Web',
    tagClass:'ai-tag',
    icon:    'fas fa-hand-paper',
    iconBg:  'rgba(0,229,255,0.12)',
    iconColor: 'var(--cyan)',
    desc: `A real-time hand gesture recognition system built using Python, OpenCV, and MediaPipe. The application detects multiple hand gestures from a webcam feed, displays them in real time, and includes an air drawing feature controlled by hand gestures.`,
    features: [
       'Real-time hand tracking. Supports tracking up to two hands simultaneously',
    'Full-screen webcam interface',
    'low-light image enhancement',
    'Gesture recognition with smoothing for stable predictions',
    ],
    tech:['Python', 'OpenCV', 'MediaPipe'],
    stats: [
      { val: '<50ms', label: 'Response Time' },
      { val: '95%',    label: 'smooth' },
      
    ],
    github: '#',
    demo:   '#',
  },


  'Gesture-vfx': {
    title:   'Gesture-vfx system',
    tag:     'CV · Machine Learning',
    tagClass:'ai-tag',
    icon:    'fas fa-sign-language',
    iconBg:  'rgba(139,92,246,0.12)',
    iconColor: 'var(--purple)',
    desc: `Real-time superhero VFX powered entirely by your webcam, your hands, and OpenCV.No controllers, no sensors, no green screen — just MediaPipe hand/face tracking
 and a from-scratch particle and lightning engine rendered live on every frame.
`,
    features: [
      'A four-file Python application that:',
      'Tracks **both hands simultaneously** and your **face** in real time via MediaPipe',
      'Recognises **19 single-hand gestures**, each triggering a distinct power',
      'Recognises **17 two-hand combos** — effects that only fire when *both* hands show specific shapes together',
      'Overlays **15 face AR skins** (Iron Man, Thanos, Loki, Groot, and more) that react to your mouth and eyese',
      'Renders everything itself: particles, lightning, portals, beams, bloom, screen shake — no external rendering engine',
    ],
    tech: ['Python', 'mediapipe', 'OpenCV', 'NumPy',],
    stats: [
      { val: '96%',  label: 'Accuracy' },
      { val: '25+', label: 'Effects' },
      { val: '15',   label: 'AR/face skins' },
    ],
    github: '#',
    demo:   '#',
  },

  'quiz-app': {
    title:   'Interactive Quiz App',
    tag:         'Web App · Education',
    tagClass:'web-tag',
    icon:    'fas fa-tachometer-alt',
    iconBg:  'rgba(255,209,102,0.12)',
    iconColor: 'var(--gold)',
    desc:`An engaging quiz application designed to make learning interactive and fun. Users can test their knowledge across different categories, receive instant feedback, and track their scores through a clean and responsive interface.`,
    features: [
     'Multiple quiz categories including Science, and General Knowledge',
      'Real-time score calculation and performance tracking',
      'Instant feedback for correct and incorrect answers',
      'Responsive design for desktop, tablet, and mobile devices',
      'Timer-based quiz mode for an added challenge',
      'Local storage support to save scores and progress',
    ],
    tech: ['HTML', 'CSS', 'JavaScript' ],
    stats: [
      { val: '90+',  label: 'Questions' },
      { val: '3',   label: 'User Roles' },
      { val: '60fps', label: 'Animation' },
    ],
    github: '#',
    demo:   '#',
  },

  'space-invaders': {
    title:   'Space Dodger',
    tag:     'Game Development',
    tagClass:'game-tag',
    icon:    'fas fa-gamepad',
    iconBg:  'rgba(139,92,246,0.12)',
    iconColor: 'var(--purple)',
    desc: `A production-quality browser-based arcade survival game built with pure HTML, CSS, and JavaScript. Dodge procedurally generated asteroids, collect powerful upgrades, survive increasingly difficult waves, and compete against your personal best with persistent local storage tracking.`,
    features: [
      'Procedurally generated asteroids with rotation and dynamic difficulty scaling',
      'Power-up system featuring Shield, Slow Motion, and Score Booster abilities',
      'Particle effects, explosion animations, screen shake, and engine trails',
      'Web Audio API sound synthesis with ambient audio and gameplay effects',
      'Persistent statistics and high-score tracking using localStorage',
      'Responsive design with keyboard and touch controls for desktop and mobile',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'Web Audio API'],

    stats: [
      { val: '60fps', label: 'Framerate' },
      { val: '500+',  label: 'Max Particles' },
      { val: '5+',   label: 'Power-ups' },
    ],
    github: '#',
    demo:   '#',
  },

'password-strength-checker': {
    title:   ' Password Analyzer',
    tag:     'Cybersecurity · Web',
    tagClass:'ai-tag',
    icon:     'fas fa-shield-alt',
    iconBg:  'rgba(0,229,255,0.12)',
    iconColor: 'var(--cyan)',
    desc: `A secure, Real-time password strength evaluation with dynamic scoring algorithm. This will analyze your password and rate it also suggest to improve it.It also includes muti-factor security validation including length,character diversity, and complexity checks.`,
    features: [
      
   'Real-time password strength evaluation with dynamic scoring algorithm',
   'Multi-factor security validation including length, character diversity, and complexity checks',
   'Entropy-based security analysis for estimating password resilience',
   'Built-in secure password generator for creating strong credentials instantly',
   'Interactive visual strength meter with detailed security feedback',
   'Flask REST API architecture enabling seamless frontend-backend integration'

    ],
    tech: [ 'Python',
      'Flask',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Cybersecurity'],
    stats: [
      { val: '99.2%', label: 'Accuracy' },
      { val: '<5s',   label: 'Enrollment Time' },
      
    ],
    github: '#',
    demo:   '#',
  },
};


function openModal(btn) {
  
  const card     = btn.closest('.project-card');
  const titleEl  = card.querySelector('[data-project]');
  const projectId = titleEl ? titleEl.dataset.project : null;
  if (!projectId || !PROJECT_DATA[projectId]) return;

  const p = PROJECT_DATA[projectId];

  const iconWrap = document.getElementById('modalIcon');
  iconWrap.innerHTML = `<i class="${p.icon}"></i>`;
  iconWrap.style.background = p.iconBg;
  iconWrap.style.color      = p.iconColor;

  // Tag
  const tagEl = document.getElementById('modalTag');
  tagEl.textContent = p.tag;
  tagEl.className   = `modal-tag ${p.tagClass}`;

  // Title
  document.getElementById('modalTitle').textContent = p.title;

  // Description
  document.getElementById('modalDesc').textContent = p.desc;

  // Features
  const featuresEl = document.getElementById('modalFeatures');
  featuresEl.innerHTML = p.features
    .map(f => `<li>${f}</li>`)
    .join('');

  // Tech
  const techEl = document.getElementById('modalTech');
  techEl.innerHTML = p.tech
    .map(t => `<span>${t}</span>`)
    .join('');

  // Stats
  const statsEl = document.getElementById('modalStats');
  statsEl.innerHTML = p.stats
    .map(s => `
      <div class="modal-stat">
        <span class="modal-stat-val">${s.val}</span>
        <span class="modal-stat-label">${s.label}</span>
      </div>
    `).join('');

  // Links
  document.getElementById('modalGithub').href = p.github;
  document.getElementById('modalDemo').href   = p.demo;

  // Open overlay
  const overlay = document.getElementById('projectModal');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    document.getElementById('modalClose').focus();
  }, 100);
}

function closeModal() {
  const overlay = document.getElementById('projectModal');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────────────────────────
// CLICK SOUND FX (global button clicks)
// Uses event delegation so it works for all existing buttons.
// ─────────────────────────────────────────────────────────────
(function initClickSound() {
  // NOTE: Browsers require user interaction before audio can play.
  let unlocked = false;

  // You need to place a small audio file at this path:
  // FRONTEND/assets/click.mp3 (or change the extension below)
  const clickAudio = new Audio('assets/click.mp3');
  clickAudio.preload = 'auto';
  clickAudio.volume = 0.5;

  // Simple cooldown to avoid rapid re-triggering on double clicks/drag
  let lastPlayedAt = 0;
  const COOLDOWN_MS = 90;

  function unlockAudioOnce() {
    if (unlocked) return;
    unlocked = true;
    // Attempt a silent play to satisfy autoplay policies
    clickAudio.currentTime = 0;
    clickAudio.volume = 0;
    clickAudio.play().catch(() => {}).finally(() => {
      clickAudio.volume = 0.5;
    });
  }

  function playClickIfAllowed(target) {
    const now = Date.now();
    if (now - lastPlayedAt < COOLDOWN_MS) return;
    lastPlayedAt = now;

    // Only play for real button interactions
    if (!target) return;
    const btn = target.closest('button, input[type="button"], input[type="submit"], input[type="reset"], a[role="button"]');
    if (!btn) return;

    // Some clicks may happen before unlock; ignore until unlocked.
    if (!unlocked) return;

    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  }

  // Unlock on first user interaction
  document.addEventListener('pointerdown', unlockAudioOnce, { once: true, passive: true });
  document.addEventListener('keydown', unlockAudioOnce, { once: true });

  // Play sound for all subsequent button clicks
  document.addEventListener('click', (e) => {
    playClickIfAllowed(e.target);
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  // Close button
  document.getElementById('modalClose')?.addEventListener('click', closeModal);

  document.getElementById('projectModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('projectModal')) closeModal();
  });


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
