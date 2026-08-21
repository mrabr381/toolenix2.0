/**
 * Toolenix — footer.js
 * Injects the shared footer into every page
 */

(function () {
  'use strict';

  const FOOTER_HTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">

        <div class="footer__main">

          <!-- Brand col -->
          <div class="footer__brand">
            <a href="${SITE_BASE}index.html" class="footer__brand-logo" aria-label="Toolenix home">
              <div class="footer__brand-logo-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="20" height="20">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <span class="footer__brand-name">Toolenix</span>
            </a>

            <p class="footer__tagline">
              40+ free online tools for PDFs, images, text, and developer tasks.
              No signup. No limits. Just results.
            </p>

            <div class="footer__social" aria-label="Social media links">
              <a href="#" class="footer__social-link" aria-label="Follow on Twitter / X">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="Follow on GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="Follow on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            <!-- Newsletter -->
            <form class="newsletter-form" onsubmit="return false;" aria-label="Newsletter signup">
              <label for="newsletter-email" class="sr-only">Email address</label>
              <input
                type="email"
                id="newsletter-email"
                class="newsletter-input"
                placeholder="you@example.com"
                autocomplete="email"
              >
              <button type="submit" class="btn btn--primary btn--sm">Subscribe</button>
            </form>
          </div>

          <!-- PDF Tools -->
          <div class="footer__col">
            <h3 class="footer__col-title">PDF Tools</h3>
            <ul class="footer__col-list">
              <li><a href="${SITE_BASE}pdf/merge-pdf.html"         class="footer__col-link">Merge PDF</a></li>
              <li><a href="${SITE_BASE}pdf/split-pdf.html"         class="footer__col-link">Split PDF</a></li>
              <li><a href="${SITE_BASE}pdf/compress-pdf.html"      class="footer__col-link">Compress PDF</a></li>
              <li><a href="${SITE_BASE}pdf/pdf-to-word.html"       class="footer__col-link">PDF to Word</a></li>
              <li><a href="${SITE_BASE}pdf/pdf-to-jpg.html"        class="footer__col-link">PDF to JPG</a></li>
              <li><a href="${SITE_BASE}pdf/ocr-pdf.html"           class="footer__col-link">OCR PDF</a></li>
              <li><a href="${SITE_BASE}pdf/protect-pdf.html"       class="footer__col-link">Protect PDF</a></li>
              <li><a href="${SITE_BASE}pdf/rotate-pdf.html"        class="footer__col-link">Rotate PDF</a></li>
            </ul>
          </div>

          <!-- Utilities -->
          <div class="footer__col">
            <h3 class="footer__col-title">Utilities</h3>
            <ul class="footer__col-list">
              <li><a href="${SITE_BASE}utilities/image-compressor.html"   class="footer__col-link">Image Compressor</a></li>
              <li><a href="${SITE_BASE}utilities/image-resizer.html"      class="footer__col-link">Image Resizer</a></li>
              <li><a href="${SITE_BASE}utilities/qr-code-generator.html"  class="footer__col-link">QR Generator</a></li>
              <li><a href="${SITE_BASE}utilities/password-generator.html" class="footer__col-link">Password Generator</a></li>
              <li><a href="${SITE_BASE}utilities/word-counter.html"       class="footer__col-link">Word Counter</a></li>
              <li><a href="${SITE_BASE}utilities/json-formatter.html"     class="footer__col-link">JSON Formatter</a></li>
              <li><a href="${SITE_BASE}utilities/hash-generator.html"     class="footer__col-link">Hash Generator</a></li>
              <li><a href="${SITE_BASE}utilities/meta-tag-generator.html" class="footer__col-link">Meta Tag Generator</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div class="footer__col">
            <h3 class="footer__col-title">Company</h3>
            <ul class="footer__col-list">
              <li><a href="${SITE_BASE}about.html"   class="footer__col-link">About</a></li>
              <li><a href="${SITE_BASE}contact.html" class="footer__col-link">Contact</a></li>
              <li><a href="${SITE_BASE}privacy.html" class="footer__col-link">Privacy Policy</a></li>
              <li><a href="${SITE_BASE}terms.html"   class="footer__col-link">Terms of Use</a></li>
              <li><a href="${SITE_BASE}404.html"     class="footer__col-link">Sitemap</a></li>
            </ul>
          </div>

        </div><!-- /.footer__main -->

        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; <span id="footer-year"></span> Toolenix. All rights reserved.
          </p>
          <div class="footer__bottom-links">
            <a href="${SITE_BASE}privacy.html" class="footer__bottom-link">Privacy</a>
            <a href="${SITE_BASE}terms.html"   class="footer__bottom-link">Terms</a>
            <a href="${SITE_BASE}contact.html" class="footer__bottom-link">Contact</a>
          </div>
        </div>

      </div><!-- /.container -->
    </footer>
  `;

  function buildFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = FOOTER_HTML.trim();
    placeholder.replaceWith(wrapper.firstElementChild);

    // Set year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Newsletter submit
    const form = document.querySelector('.newsletter-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          if (window.Toolenix?.Toast) {
            window.Toolenix.Toast.show('Thanks for subscribing!', 'success');
          }
          input.value = '';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', buildFooter);

})();
