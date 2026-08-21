/**
 * Toolenix — navigation.js
 * Sticky navbar, mega menu toggle, mobile drawer, keyboard nav
 */

(function () {
  'use strict';

  /* ============================================================
     SVG Icon helper (shared across nav renders)
     ============================================================ */
  const SVG = {
    tools:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    chevron:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
    pdf:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    image:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    text:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="18" y2="18"/></svg>`,
    code:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    seo:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    util:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
    search:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    moon:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    sun:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    arrow:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  };

  /* ============================================================
     Mega menu data
     ============================================================ */
  const MEGA_MENU_DATA = [
    {
      title: 'PDF Tools',
      iconKey: 'pdf',
      items: [
        { name: 'Merge PDF',          href: 'pdf/merge-pdf.html' },
        { name: 'Split PDF',          href: 'pdf/split-pdf.html' },
        { name: 'Compress PDF',       href: 'pdf/compress-pdf.html' },
        { name: 'PDF to Word',        href: 'pdf/pdf-to-word.html' },
        { name: 'Word to PDF',        href: 'pdf/word-to-pdf.html' },
        { name: 'PDF to JPG',         href: 'pdf/pdf-to-jpg.html' },
        { name: 'Rotate PDF',         href: 'pdf/rotate-pdf.html' },
        { name: 'Protect PDF',        href: 'pdf/protect-pdf.html' },
        { name: 'Unlock PDF',         href: 'pdf/unlock-pdf.html' },
        { name: 'OCR PDF',            href: 'pdf/ocr-pdf.html' },
      ]
    },
    {
      title: 'More PDF',
      iconKey: 'pdf',
      items: [
        { name: 'PDF to Excel',       href: 'pdf/pdf-to-excel.html' },
        { name: 'Excel to PDF',       href: 'pdf/excel-to-pdf.html' },
        { name: 'PDF to PPT',         href: 'pdf/pdf-to-ppt.html' },
        { name: 'PPT to PDF',         href: 'pdf/ppt-to-pdf.html' },
        { name: 'JPG to PDF',         href: 'pdf/jpg-to-pdf.html' },
        { name: 'PNG to PDF',         href: 'pdf/png-to-pdf.html' },
        { name: 'HTML to PDF',        href: 'pdf/html-to-pdf.html' },
        { name: 'Searchable PDF',     href: 'pdf/searchable-pdf.html' },
        { name: 'Delete PDF Pages',   href: 'pdf/delete-pdf-pages.html' },
        { name: 'Extract PDF Pages',  href: 'pdf/extract-pdf-pages.html' },
      ]
    },
    {
      title: 'Image Tools',
      iconKey: 'image',
      items: [
        { name: 'Image Compressor',   href: 'utilities/image-compressor.html' },
        { name: 'Image Resizer',      href: 'utilities/image-resizer.html' },
        { name: 'Image Converter',    href: 'utilities/image-converter.html' },
        { name: 'Background Remover', href: 'utilities/background-remover.html' },
      ]
    },
    {
      title: 'Text Tools',
      iconKey: 'text',
      items: [
        { name: 'Word Counter',       href: 'utilities/word-counter.html' },
        { name: 'Character Counter',  href: 'utilities/character-counter.html' },
        { name: 'Case Converter',     href: 'utilities/case-converter.html' },
      ]
    },
    {
      title: 'Developer',
      iconKey: 'code',
      items: [
        { name: 'JSON Formatter',     href: 'utilities/json-formatter.html' },
        { name: 'JSON Validator',     href: 'utilities/json-validator.html' },
        { name: 'Base64 Tool',        href: 'utilities/base64-tool.html' },
        { name: 'URL Encoder',        href: 'utilities/url-encoder.html' },
        { name: 'Hash Generator',     href: 'utilities/hash-generator.html' },
        { name: 'UUID Generator',     href: 'utilities/uuid-generator.html' },
        { name: 'HTML Minifier',      href: 'utilities/html-minifier.html' },
        { name: 'CSS Minifier',       href: 'utilities/css-minifier.html' },
      ]
    },
    {
      title: 'SEO & Utilities',
      iconKey: 'seo',
      items: [
        { name: 'Meta Tag Generator', href: 'utilities/meta-tag-generator.html' },
        { name: 'Robots.txt',         href: 'utilities/robots-txt.html' },
        { name: 'QR Code Generator',  href: 'utilities/qr-code-generator.html' },
        { name: 'Password Generator', href: 'utilities/password-generator.html' },
        { name: 'Password Strength',  href: 'utilities/password-checker.html' },
      ]
    },
  ];

  /* ============================================================
     Navbar HTML Injection
     (Called once per page — replaces <nav id="navbar-placeholder">)
     ============================================================ */
  function buildNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    const mega = MEGA_MENU_DATA.map(col => `
      <div class="mega-menu__col">
        <div class="mega-menu__col-title">${col.title}</div>
        <ul class="mega-menu__list">
          ${col.items.map(item => `
            <li>
              <a href="${SITE_BASE}${item.href}" class="mega-menu__item">
                ${SVG.arrow}${item.name}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    const mobileDrawer = MEGA_MENU_DATA.map(col => `
      <div class="mobile-drawer__category">
        <div class="mobile-drawer__category-title">${col.title}</div>
        <div class="mobile-drawer__grid">
          ${col.items.map(item => `
            <a href="${SITE_BASE}${item.href}" class="mobile-drawer__link">
              ${SVG.arrow} ${item.name}
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');

    placeholder.outerHTML = `
      <header>
        <a href="#main-content" class="skip-link">Skip to content</a>

        <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
          <div class="container navbar__inner">

            <a href="${SITE_BASE}index.html" class="navbar__logo" aria-label="Toolenix home">
              <div class="navbar__logo-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <span class="navbar__logo-text">Toolenix</span>
            </a>

            <nav class="navbar__nav" aria-label="Tool categories">
              <a href="${SITE_BASE}index.html" class="navbar__link">Home</a>
              <button
                class="navbar__link"
                id="mega-menu-trigger"
                aria-expanded="false"
                aria-controls="mega-menu"
                aria-haspopup="true"
              >
                All Tools ${SVG.chevron}
              </button>
              <a href="${SITE_BASE}about.html"   class="navbar__link">About</a>
              <a href="${SITE_BASE}contact.html" class="navbar__link">Contact</a>
            </nav>

            <div class="navbar__actions">
              <button
                class="navbar__search-btn"
                id="search-trigger"
                aria-label="Search tools"
                aria-expanded="false"
                aria-controls="search-overlay"
              >
                ${SVG.search}
                <span>Search tools…</span>
                <kbd class="kbd">⌘K</kbd>
              </button>

              <button
                class="theme-toggle"
                id="theme-toggle"
                aria-label="Toggle dark mode"
              >
                <span class="icon-sun">${SVG.sun}</span>
                <span class="icon-moon">${SVG.moon}</span>
              </button>

              <button
                class="navbar__hamburger"
                id="hamburger"
                aria-label="Open navigation menu"
                aria-expanded="false"
                aria-controls="mobile-drawer"
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>

          <!-- Mega menu -->
          <div id="mega-menu" class="mega-menu" role="region" aria-label="All tools">
            <div class="container">
              <div class="mega-menu__inner">${mega}</div>
            </div>
          </div>
        </nav>

        <!-- Mobile drawer -->
        <div id="mobile-drawer" class="mobile-drawer" aria-label="Mobile navigation">
          <div class="mobile-drawer__inner">${mobileDrawer}</div>
        </div>
      </header>
    `;
  }

  /* ============================================================
     Sticky scroll
     ============================================================ */
  function initStickyNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     Mega Menu
     ============================================================ */
  function initMegaMenu() {
    const trigger = document.getElementById('mega-menu-trigger');
    const menu    = document.getElementById('mega-menu');
    if (!trigger || !menu) return;

    let isOpen = false;

    function open() {
      isOpen = true;
      menu.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      isOpen = false;
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => isOpen ? close() : open());

    // Close on outside click
    document.addEventListener('click', e => {
      if (isOpen && !trigger.contains(e.target) && !menu.contains(e.target)) close();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) { close(); trigger.focus(); }
    });

    // Close on nav link click
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* ============================================================
     Mobile Drawer
     ============================================================ */
  function initMobileDrawer() {
    const btn    = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');
    if (!btn || !drawer) return;

    let open = false;

    function openDrawer() {
      open = true;
      drawer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close navigation menu');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      open = false;
      drawer.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => open ? closeDrawer() : openDrawer());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && open) { closeDrawer(); btn.focus(); }
    });

    // Close on link tap
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }

  /* ============================================================
     Active link highlight
     ============================================================ */
  function highlightActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.navbar__link, .mega-menu__item, .mobile-drawer__link, .footer__col-link').forEach(a => {
      if (a.tagName === 'A' && a.getAttribute('href') && path.endsWith(a.getAttribute('href').replace(/^\//, ''))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     Init
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    buildNavbar();
    initStickyNav();
    initMegaMenu();
    initMobileDrawer();
    highlightActiveLink();
  });

})();
