/**
 * Toolenix — theme.js
 * Dark / light mode toggle with system preference detection
 * Runs before DOMContentLoaded to prevent flash
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'toolenix-theme';

  /* ── Apply theme immediately (in <head>) to prevent FOUC ── */
  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply immediately (runs synchronously in <head> if script is placed there)
  applyTheme(getPreferred());

  /* ── Toggle button wiring (after DOM ready) ── */
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      btn.setAttribute('aria-label', `Switch to ${next === 'dark' ? 'light' : 'dark'} mode`);
    }

    btn.addEventListener('click', toggleTheme);

    // Keyboard: also support Enter/Space (button handles this natively)
    // Sync with system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // Only follow system if user hasn't manually set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

})();
