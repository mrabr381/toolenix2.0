/**
 * Toolenix — main.js
 * App bootstrap, tool registry, animation observers, utilities
 */

/* ============================================================
   Tool Registry
   Single source of truth for all 40 tools
   ============================================================ */
const TOOLS = [
  // PDF Tools
  { id: 'merge-pdf',          name: 'Merge PDF',             category: 'pdf',     icon: 'merge',     file: 'pdf/merge-pdf.html',       desc: 'Combine multiple PDF files into one document instantly.' },
  { id: 'split-pdf',          name: 'Split PDF',             category: 'pdf',     icon: 'split',     file: 'pdf/split-pdf.html',       desc: 'Split a PDF into individual pages or custom ranges.' },
  { id: 'compress-pdf',       name: 'Compress PDF',          category: 'pdf',     icon: 'compress',  file: 'pdf/compress-pdf.html',    desc: 'Reduce PDF file size without sacrificing quality.' },
  { id: 'pdf-to-word',        name: 'PDF to Word',           category: 'pdf',     icon: 'convert',   file: 'pdf/pdf-to-word.html',     desc: 'Convert PDF documents to editable Word files.' },
  { id: 'word-to-pdf',        name: 'Word to PDF',           category: 'pdf',     icon: 'convert',   file: 'pdf/word-to-pdf.html',     desc: 'Convert Word documents to PDF format instantly.' },
  { id: 'pdf-to-excel',       name: 'PDF to Excel',          category: 'pdf',     icon: 'table',     file: 'pdf/pdf-to-excel.html',    desc: 'Extract tables from PDF into editable Excel files.' },
  { id: 'excel-to-pdf',       name: 'Excel to PDF',          category: 'pdf',     icon: 'table',     file: 'pdf/excel-to-pdf.html',    desc: 'Convert Excel spreadsheets to PDF documents.' },
  { id: 'pdf-to-ppt',         name: 'PDF to PPT',            category: 'pdf',     icon: 'slides',    file: 'pdf/pdf-to-ppt.html',      desc: 'Convert PDF presentations into PowerPoint files.' },
  { id: 'ppt-to-pdf',         name: 'PPT to PDF',            category: 'pdf',     icon: 'slides',    file: 'pdf/ppt-to-pdf.html',      desc: 'Convert PowerPoint presentations to PDF.' },
  { id: 'pdf-to-jpg',         name: 'PDF to JPG',            category: 'pdf',     icon: 'image',     file: 'pdf/pdf-to-jpg.html',      desc: 'Convert each PDF page to a high-quality JPG image.' },
  { id: 'jpg-to-pdf',         name: 'JPG to PDF',            category: 'pdf',     icon: 'image',     file: 'pdf/jpg-to-pdf.html',      desc: 'Convert JPG images into a PDF document.' },
  { id: 'png-to-pdf',         name: 'PNG to PDF',            category: 'pdf',     icon: 'image',     file: 'pdf/png-to-pdf.html',      desc: 'Convert PNG images to a PDF file quickly.' },
  { id: 'html-to-pdf',        name: 'HTML to PDF',           category: 'pdf',     icon: 'code',      file: 'pdf/html-to-pdf.html',     desc: 'Render HTML pages or snippets as PDF documents.' },
  { id: 'ocr-pdf',            name: 'OCR PDF',               category: 'pdf',     icon: 'scan',      file: 'pdf/ocr-pdf.html',         desc: 'Extract text from scanned PDFs using OCR.' },
  { id: 'searchable-pdf',     name: 'Searchable PDF',        category: 'pdf',     icon: 'search',    file: 'pdf/searchable-pdf.html',  desc: 'Make scanned PDFs searchable with embedded text.' },
  { id: 'protect-pdf',        name: 'Protect PDF',           category: 'pdf',     icon: 'lock',      file: 'pdf/protect-pdf.html',     desc: 'Password-protect your PDF with encryption.' },
  { id: 'unlock-pdf',         name: 'Unlock PDF',            category: 'pdf',     icon: 'unlock',    file: 'pdf/unlock-pdf.html',      desc: 'Remove password protection from a PDF file.' },
  { id: 'rotate-pdf',         name: 'Rotate PDF',            category: 'pdf',     icon: 'rotate',    file: 'pdf/rotate-pdf.html',      desc: 'Rotate PDF pages to the correct orientation.' },
  { id: 'delete-pdf-pages',   name: 'Delete PDF Pages',      category: 'pdf',     icon: 'delete',    file: 'pdf/delete-pdf-pages.html',desc: 'Remove unwanted pages from a PDF document.' },
  { id: 'extract-pdf-pages',  name: 'Extract PDF Pages',     category: 'pdf',     icon: 'extract',   file: 'pdf/extract-pdf-pages.html',desc: 'Pull specific pages out of a PDF into a new file.' },

  // Utility Tools
  { id: 'image-compressor',   name: 'Image Compressor',      category: 'image',   icon: 'compress',  file: 'utilities/image-compressor.html',    desc: 'Compress JPG, PNG and WebP images without visible quality loss.' },
  { id: 'image-resizer',      name: 'Image Resizer',         category: 'image',   icon: 'resize',    file: 'utilities/image-resizer.html',       desc: 'Resize images to exact dimensions in pixels or percent.' },
  { id: 'image-converter',    name: 'Image Converter',       category: 'image',   icon: 'convert',   file: 'utilities/image-converter.html',     desc: 'Convert between JPG, PNG, WebP, GIF and more.' },
  { id: 'background-remover', name: 'Background Remover',    category: 'image',   icon: 'erase',     file: 'utilities/background-remover.html',  desc: 'Remove image backgrounds automatically in seconds.' },
  { id: 'qr-code-generator',  name: 'QR Code Generator',     category: 'util',    icon: 'qr',        file: 'utilities/qr-code-generator.html',   desc: 'Generate QR codes for URLs, text, Wi-Fi and more.' },
  { id: 'password-generator', name: 'Password Generator',    category: 'util',    icon: 'key',       file: 'utilities/password-generator.html',  desc: 'Generate strong, secure passwords instantly.' },
  { id: 'password-checker',   name: 'Password Strength',     category: 'util',    icon: 'shield',    file: 'utilities/password-checker.html',    desc: 'Check how strong your password is in real time.' },
  { id: 'word-counter',       name: 'Word Counter',          category: 'text',    icon: 'text',      file: 'utilities/word-counter.html',        desc: 'Count words, characters, sentences and paragraphs.' },
  { id: 'character-counter',  name: 'Character Counter',     category: 'text',    icon: 'text',      file: 'utilities/character-counter.html',   desc: 'Count characters with and without spaces instantly.' },
  { id: 'case-converter',     name: 'Case Converter',        category: 'text',    icon: 'case',      file: 'utilities/case-converter.html',      desc: 'Convert text between uppercase, lowercase, title case and more.' },
  { id: 'json-formatter',     name: 'JSON Formatter',        category: 'dev',     icon: 'code',      file: 'utilities/json-formatter.html',      desc: 'Beautify and format raw JSON with syntax highlighting.' },
  { id: 'json-validator',     name: 'JSON Validator',        category: 'dev',     icon: 'check',     file: 'utilities/json-validator.html',      desc: 'Validate JSON syntax and find errors instantly.' },
  { id: 'base64-tool',        name: 'Base64 Encoder/Decoder',category: 'dev',     icon: 'encode',    file: 'utilities/base64-tool.html',         desc: 'Encode or decode Base64 strings online.' },
  { id: 'url-encoder',        name: 'URL Encoder/Decoder',   category: 'dev',     icon: 'link',      file: 'utilities/url-encoder.html',         desc: 'Encode or decode URLs and query strings.' },
  { id: 'hash-generator',     name: 'Hash Generator',        category: 'dev',     icon: 'hash',      file: 'utilities/hash-generator.html',      desc: 'Generate MD5, SHA-1, SHA-256 hashes from text.' },
  { id: 'uuid-generator',     name: 'UUID Generator',        category: 'dev',     icon: 'id',        file: 'utilities/uuid-generator.html',      desc: 'Generate random UUID v4 identifiers instantly.' },
  { id: 'html-minifier',      name: 'HTML Minifier',         category: 'dev',     icon: 'minify',    file: 'utilities/html-minifier.html',       desc: 'Minify HTML code to reduce file size.' },
  { id: 'css-minifier',       name: 'CSS Minifier',          category: 'dev',     icon: 'minify',    file: 'utilities/css-minifier.html',        desc: 'Minify CSS stylesheets for faster page loads.' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator',    category: 'seo',     icon: 'tag',       file: 'utilities/meta-tag-generator.html',  desc: 'Generate SEO meta tags for any webpage.' },
  { id: 'robots-txt',         name: 'Robots.txt Generator',  category: 'seo',     icon: 'robot',     file: 'utilities/robots-txt.html',          desc: 'Create a robots.txt file for search engine control.' },
];

const CATEGORIES = {
  pdf:   { name: 'PDF Tools',    color: 'icon-pdf',   count: 20 },
  image: { name: 'Image Tools',  color: 'icon-image', count: 4  },
  text:  { name: 'Text Tools',   color: 'icon-text',  count: 3  },
  dev:   { name: 'Developer',    color: 'icon-dev',   count: 9  },
  seo:   { name: 'SEO Tools',    color: 'icon-seo',   count: 2  },
  util:  { name: 'Utilities',    color: 'icon-util',  count: 3  },
};

/* ============================================================
   Scroll Animation Observer
   ============================================================ */
function initScrollAnimations() {
  const targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const anim = el.dataset.animate;
        const delay = el.dataset.delay ? `${el.dataset.delay}ms` : '0ms';

        el.style.transitionDelay = delay;
        el.classList.add('animated', `anim-${anim}`);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    el.classList.add('pre-animate');
    observer.observe(el);
  });
}

/* ============================================================
   Counter Animation
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const start  = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / dur, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   FAQ Accordion
   ============================================================ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // Open clicked
      if (!isOpen) item.classList.add('open');
    });

    // Keyboard
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

/* ============================================================
   Toast Notification System
   ============================================================ */
const Toast = (() => {
  let container;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', 'Notifications');
      document.body.appendChild(container);
    }
    return container;
  }

  const ICONS = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };

  function show(message, type = 'info', duration = 4000) {
    const c     = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <span class="toast__icon">${ICONS[type] || ICONS.info}</span>
      <span class="toast__message">${message}</span>
      <button class="toast__close" aria-label="Close notification">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    toast.querySelector('.toast__close').addEventListener('click', () => remove(toast));
    c.appendChild(toast);

    const timer = setTimeout(() => remove(toast), duration);
    toast._timer = timer;

    return toast;
  }

  function remove(toast) {
    clearTimeout(toast._timer);
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }

  return { show, remove };
})();

/* ============================================================
   Copy to Clipboard utility
   ============================================================ */
async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const original = button.innerHTML;
      button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      setTimeout(() => { button.innerHTML = original; }, 2000);
    }
    Toast.show('Copied to clipboard', 'success', 2500);
  } catch {
    Toast.show('Failed to copy — please select and copy manually', 'error');
  }
}

/* ============================================================
   Format bytes
   ============================================================ */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k    = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i    = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/* ============================================================
   Drag-and-drop upload helper
   ============================================================ */
function initUploadArea(areaEl, inputEl, { accept, multiple, onFiles } = {}) {
  if (!areaEl || !inputEl) return;

  if (accept)    inputEl.accept   = accept;
  if (multiple)  inputEl.multiple = multiple;

  function handleFiles(files) {
    const arr = Array.from(files);
    if (arr.length) onFiles?.(arr);
  }

  areaEl.addEventListener('click', e => {
    if (e.target !== inputEl) inputEl.click();
  });

  inputEl.addEventListener('change', () => handleFiles(inputEl.files));

  areaEl.addEventListener('dragenter', e => { e.preventDefault(); areaEl.classList.add('dragging'); });
  areaEl.addEventListener('dragover',  e => { e.preventDefault(); });
  areaEl.addEventListener('dragleave', e => {
    if (!areaEl.contains(e.relatedTarget)) areaEl.classList.remove('dragging');
  });
  areaEl.addEventListener('drop', e => {
    e.preventDefault();
    areaEl.classList.remove('dragging');
    handleFiles(e.dataTransfer.files);
  });
}

/* ============================================================
   Expose globals immediately (synchronous) so inline tool
   scripts that run after this file can call Toolenix APIs
   without waiting for DOMContentLoaded.
   ============================================================ */
/* ============================================================
   Site base path — resolves correctly regardless of how deep
   the site is deployed (root domain, github.io/reponame/, etc.)
   Any HTML file living inside /pdf/ or /utilities/ is one level
   deep; every other page is at the site root.
   ============================================================ */
const SITE_BASE = (() => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  return (segments.includes('pdf') || segments.includes('utilities')) ? '../' : './';
})();

window.Toolenix = { TOOLS, CATEGORIES, Toast, copyToClipboard, formatBytes, initUploadArea, SITE_BASE };

/* ============================================================
   Bootstrap — UI initialisation after DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  animateCounters();
  initFAQ();
});

/* ============================================================
   Scroll-animation CSS (injected so no extra file needed)
   ============================================================ */
const animStyles = document.createElement('style');
animStyles.textContent = `
  .pre-animate {
    opacity: 0;
    transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .pre-animate.anim-fade-up    { transform: translateY(28px); }
  .pre-animate.anim-fade-in    { transform: none; }
  .pre-animate.anim-fade-left  { transform: translateX(-28px); }
  .pre-animate.anim-fade-right { transform: translateX(28px); }
  .pre-animate.anim-scale-up   { transform: scale(0.94); }

  .animated {
    opacity: 1;
    transform: none !important;
  }
`;
document.head.appendChild(animStyles);
