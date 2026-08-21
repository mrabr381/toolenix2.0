/**
 * Toolenix — search.js
 * Command-palette style search overlay
 * Depends on TOOLS array from main.js (window.Toolenix.TOOLS)
 */

(function () {
  'use strict';

  /* ============================================================
     Build overlay HTML
     ============================================================ */
  const OVERLAY_HTML = `
    <div
      id="search-overlay"
      class="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
    >
      <div class="search-modal" id="search-modal">
        <div class="search-modal__input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search"
            id="search-input"
            class="search-modal__input"
            placeholder="Search 40+ tools…"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            aria-autocomplete="list"
            aria-controls="search-results"
          >
          <button class="search-modal__close" id="search-close" aria-label="Close search">ESC</button>
        </div>
        <div id="search-results" class="search-results" role="listbox" aria-label="Search results"></div>
      </div>
    </div>
  `;

  const CATEGORY_LABELS = {
    pdf:   'PDF Tools',
    image: 'Image Tools',
    text:  'Text Tools',
    dev:   'Developer',
    seo:   'SEO',
    util:  'Utilities',
  };

  const CATEGORY_ICONS = {
    pdf:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    text:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="18" y2="18"/></svg>`,
    dev:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    seo:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    util:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  };

  const ARROW_SVG = `<svg class="search-result-item__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  /* ============================================================
     Search Logic
     ============================================================ */
  function searchTools(query, tools) {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return tools
      .filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }

  function highlight(str, query) {
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return str.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
  }

  /* ============================================================
     Render results
     ============================================================ */
  function renderResults(results, query, container) {
    if (!results.length) {
      container.innerHTML = `
        <div class="search-empty" role="status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>No tools found for "<strong>${query}</strong>"</p>
          <p style="font-size:0.8rem;margin-top:8px;color:var(--clr-text-3)">Try "PDF", "image", "JSON" or a tool name</p>
        </div>
      `;
      return;
    }

    // Group by category
    const grouped = {};
    results.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t);
    });

    const html = Object.entries(grouped).map(([cat, tools]) => `
      <div class="search-result-group">
        <div class="search-result-group__label">${CATEGORY_LABELS[cat] || cat}</div>
        ${tools.map((t, i) => `
          <a
            href="${SITE_BASE}${t.file}"
            class="search-result-item"
            role="option"
            data-result-index="${i}"
            aria-label="${t.name}"
          >
            <div class="search-result-item__icon icon-${t.category}" aria-hidden="true">
              ${CATEGORY_ICONS[t.category] || ''}
            </div>
            <div>
              <div style="font-weight:600;color:var(--clr-text)">${highlight(t.name, query)}</div>
              <div style="font-size:0.78rem;color:var(--clr-text-3);margin-top:2px">${highlight(t.desc, query)}</div>
            </div>
            ${ARROW_SVG}
          </a>
        `).join('')}
      </div>
    `).join('');

    container.innerHTML = html;
  }

  function renderDefault(container, tools) {
    const popular = tools.slice(0, 8);
    container.innerHTML = `
      <div class="search-result-group">
        <div class="search-result-group__label">Popular tools</div>
        ${popular.map(t => `
          <a href="${SITE_BASE}${t.file}" class="search-result-item" role="option" aria-label="${t.name}">
            <div class="search-result-item__icon icon-${t.category}" aria-hidden="true">
              ${CATEGORY_ICONS[t.category] || ''}
            </div>
            <div>
              <div style="font-weight:600;color:var(--clr-text)">${t.name}</div>
              <div style="font-size:0.78rem;color:var(--clr-text-3);margin-top:2px">${t.desc}</div>
            </div>
            ${ARROW_SVG}
          </a>
        `).join('')}
      </div>
    `;
  }

  /* ============================================================
     Keyboard navigation
     ============================================================ */
  function initKeyboardNav(container, inputEl) {
    let focusIndex = -1;

    function getItems() {
      return Array.from(container.querySelectorAll('.search-result-item'));
    }

    function setFocus(idx) {
      const items = getItems();
      items.forEach((item, i) => item.classList.toggle('focused', i === idx));
      if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
      focusIndex = idx;
    }

    inputEl.addEventListener('keydown', e => {
      const items = getItems();
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocus(Math.min(focusIndex + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocus(Math.max(focusIndex - 1, 0));
      } else if (e.key === 'Enter' && focusIndex >= 0) {
        e.preventDefault();
        items[focusIndex]?.click();
      }
    });

    // Reset on input change
    inputEl.addEventListener('input', () => { focusIndex = -1; });
  }

  /* ============================================================
     Init
     ============================================================ */
  function init() {
    // Inject overlay
    document.body.insertAdjacentHTML('beforeend', OVERLAY_HTML);

    const overlay   = document.getElementById('search-overlay');
    const modal     = document.getElementById('search-modal');
    const input     = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    const closeBtn  = document.getElementById('search-close');
    const trigger   = document.getElementById('search-trigger');

    // Inject mark styles
    const style = document.createElement('style');
    style.textContent = 'mark { background: rgba(79,110,247,0.18); color: var(--clr-primary); border-radius: 3px; padding: 0 2px; font-weight: 600; }';
    document.head.appendChild(style);

    let isOpen = false;
    const tools = () => window.Toolenix?.TOOLS || [];

    function openSearch() {
      isOpen = true;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      trigger?.setAttribute('aria-expanded', 'true');
      renderDefault(resultsEl, tools());
      setTimeout(() => input.focus(), 50);
    }

    function closeSearch() {
      isOpen = false;
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      trigger?.setAttribute('aria-expanded', 'false');
      input.value = '';
    }

    // Triggers
    trigger?.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);

    overlay.addEventListener('click', e => {
      if (!modal.contains(e.target)) closeSearch();
    });

    // Keyboard shortcut ⌘K / Ctrl+K
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape' && isOpen) closeSearch();
    });

    // Search input
    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const q = input.value.trim();
        if (!q) {
          renderDefault(resultsEl, tools());
        } else {
          renderResults(searchTools(q, tools()), q, resultsEl);
        }
      }, 120);
    });

    initKeyboardNav(resultsEl, input);
  }

  document.addEventListener('DOMContentLoaded', init);

})();
