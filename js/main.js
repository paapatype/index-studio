/* ========================================
   INDEX STUDIO — Main JS
   ======================================== */
(function () {
  'use strict';

  /* --- Sticky Header --- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleNav() {
    document.body.classList.toggle('nav-open');
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      closeNav();

      var headerOffset = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    });
  });

  /* --- Intersection Observer for Animations --- */
  var animatedEls = document.querySelectorAll('.fade-in, .slide-up');

  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- FAQ Accordion --- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq-open');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('faq-open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('faq-open');
      }
    });
  });

  /* --- Contact Form Validation --- */
  var contactForm = document.getElementById('contactForm');

  function validateField(input) {
    var group = input.closest('.form-group');
    if (!group) return true;

    var error = group.querySelector('.form-error');
    var value = input.value.trim();
    var isValid = true;

    if (input.hasAttribute('required') && !value) {
      isValid = false;
      if (error) error.textContent = 'This field is required';
    } else if (input.type === 'email' && value) {
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value)) {
        isValid = false;
        if (error) error.textContent = 'Please enter a valid email';
      }
    } else if (input.type === 'tel' && value) {
      var phoneRe = /^[\d\s\-+()]{7,}$/;
      if (!phoneRe.test(value)) {
        isValid = false;
        if (error) error.textContent = 'Please enter a valid phone number';
      }
    }

    group.classList.toggle('has-error', !isValid);
    return isValid;
  }

  if (contactForm) {
    // Real-time validation on blur
    contactForm.querySelectorAll('.form-input, .form-select').forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(this);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputs = contactForm.querySelectorAll('.form-input, .form-select');
      var allValid = true;

      inputs.forEach(function (input) {
        if (!validateField(input)) {
          allValid = false;
        }
      });

      if (allValid) {
        var btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Sent! We\'ll be in touch.';
          btn.disabled = true;
          btn.style.opacity = '0.7';
        }
        contactForm.reset();
      }
    });
  }

  /* --- Lucide Icons --- */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
