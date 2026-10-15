/**
 * MAFA AMAZING PEACE LTD - MAIN JAVASCRIPT CONTROLLER
 * Vanilla ES6+ - Zero external libraries or frameworks
 * Clean, modular, fully accessible, and console-error free.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Component Initializations
  initNavigation();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
});

/**
 * Sticky Navigation and Mobile Hamburger Menu
 */
function initNavigation() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toggleBtn && navMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
      toggleBtn.setAttribute('aria-expanded', String(isExpanded));
      navMenu.classList.toggle('is-open', isExpanded);
      toggleBtn.classList.toggle('is-active', isExpanded);
      document.body.classList.toggle('menu-open', isExpanded);
    };

    toggleBtn.addEventListener('click', () => toggleMenu());

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMenu(false);
        toggleBtn.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') && !header.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }
}

/**
 * Scroll Reveal Animation via IntersectionObserver
 * Respects prefers-reduced-motion settings.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Accessible Smooth Scrolling for Internal Anchor Links
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  const header = document.getElementById('site-header');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight : 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * STEP 7 - Accessible Contact Form Controller
 * Validates fields client-side, prepares pre-filled WhatsApp message to Marie Ange (07852 591933),
 * and exposes mailto email fallback.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const phoneInput = document.getElementById('form-phone');
  const typeSelect = document.getElementById('form-event-type');
  const dateInput = document.getElementById('form-event-date');
  const messageInput = document.getElementById('form-message');
  const statusBox = document.getElementById('form-status');
  const fallbackPanel = document.getElementById('fallback-panel');
  const mailtoLink = document.getElementById('mailto-fallback-link');

  // Set minimum date to today
  if (dateInput) {
    try {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    } catch (_) {
      // Graceful fallback
    }
  }

  // Clear validation styling dynamically on input
  const allFields = [
    { el: nameInput, errId: 'name-error' },
    { el: emailInput, errId: 'email-error' },
    { el: phoneInput, errId: 'phone-error' },
    { el: typeSelect, errId: 'type-error' },
    { el: dateInput, errId: 'date-error' },
    { el: messageInput, errId: 'message-error' }
  ];

  allFields.forEach(({ el, errId }) => {
    if (!el) return;
    const clearErr = () => {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    };

    el.addEventListener('input', clearErr);
    el.addEventListener('change', clearErr);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    let firstInvalidField = null;

    const setError = (input, errId, message) => {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errId);
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = message;
      if (!firstInvalidField) firstInvalidField = input;
      isValid = false;
    };

    const clearError = (input, errId) => {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    };

    // 1. Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      setError(nameInput, 'name-error', 'Please enter your full name (minimum 2 characters).');
    } else {
      clearError(nameInput, 'name-error');
    }

    // 2. Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      setError(emailInput, 'email-error', 'Please provide a valid email address.');
    } else {
      clearError(emailInput, 'email-error');
    }

    // 3. Validate Phone
    const phoneVal = phoneInput.value.trim();
    const phoneRegex = /^[\d\s+()\-]{7,22}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      setError(phoneInput, 'phone-error', 'Please provide a valid phone number (e.g. 07852 591933).');
    } else {
      clearError(phoneInput, 'phone-error');
    }

    // 4. Validate Event Type
    const typeVal = typeSelect.value;
    if (!typeVal) {
      setError(typeSelect, 'type-error', 'Please select an event type.');
    } else {
      clearError(typeSelect, 'type-error');
    }

    // 5. Validate Event Date
    const dateVal = dateInput.value;
    if (!dateVal) {
      setError(dateInput, 'date-error', 'Please select your estimated celebration date.');
    } else {
      clearError(dateInput, 'date-error');
    }

    // 6. Validate Message
    const msgVal = messageInput.value.trim();
    if (!msgVal || msgVal.length < 5) {
      setError(messageInput, 'message-error', 'Please describe your event styling or custom mug vision.');
    } else {
      clearError(messageInput, 'message-error');
    }

    // Stop if validation fails
    if (!isValid) {
      if (firstInvalidField && typeof firstInvalidField.focus === 'function') {
        firstInvalidField.focus();
      }
      return;
    }

    // Construct formatted message
    const formattedMessage = 
      `*New Event Enquiry | MAFA AMAZING PEACE LTD*\n\n` +
      `*Name:* ${nameVal}\n` +
      `*Email:* ${emailVal}\n` +
      `*Phone:* ${phoneVal}\n` +
      `*Event Type:* ${typeVal}\n` +
      `*Event Date:* ${dateVal}\n\n` +
      `*Vision & Requirements:*\n${msgVal}\n\n` +
      `---\n` +
      `Sent via mafaamazingpeace.co.uk`;

    // WhatsApp Direct Link to Marie Ange Melin (07852 591933)
    const waUrl = `https://wa.me/447852591933?text=${encodeURIComponent(formattedMessage)}`;

    // Mailto Fallback Link
    // TODO: Replace hello@mafaamazingpeace.co.uk with verified business email once configured
    const mailtoSubject = encodeURIComponent(`Event Consultation Enquiry: ${typeVal} - ${nameVal}`);
    const mailtoBody = encodeURIComponent(
      `Hello Marie Ange,\n\n` +
      `I would like to enquire about MAFA AMAZING PEACE LTD event services.\n\n` +
      `Name: ${nameVal}\n` +
      `Email: ${emailVal}\n` +
      `Phone: ${phoneVal}\n` +
      `Event Type: ${typeVal}\n` +
      `Event Date: ${dateVal}\n\n` +
      `Vision & Requirements:\n${msgVal}\n\n` +
      `Best regards,\n${nameVal}`
    );
    const mailtoUrl = `mailto:hello@mafaamazingpeace.co.uk?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Configure Fallback Button
    if (mailtoLink) {
      mailtoLink.href = mailtoUrl;
    }
    if (fallbackPanel) {
      fallbackPanel.style.display = 'flex';
    }

    // Display Status Message
    statusBox.className = 'form-status-box is-success';
    statusBox.innerHTML = `
      <strong>Enquiry Prepared Successfully!</strong><br>
      Opening WhatsApp to connect directly with Marie Ange Melin (07852 591933).<br>
      If WhatsApp didn't open automatically, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; font-weight: 700;">click here to launch WhatsApp</a>.
    `;
    statusBox.style.display = 'block';

    // Launch WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}
