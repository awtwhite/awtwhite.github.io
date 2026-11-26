/*
 * drill-core/switcher.js: app switcher for the drill apps.
 * Clicking the logo + app name (.brand) in the header opens a menu of all drill apps.
 * Classic script, injects its own CSS (uses the page's theme variables), so it works
 * on pages that don't load ui.css (Kana Drill still has inline CSS).
 *
 * Adding an app: add an entry to APPS below. Paths are relative (../<id>/index.html), so
 * each app must live in a sibling folder under the site root.
 */
(function () {
'use strict';

const APPS = [
  {id:'kana-drill',  name:'Kana Drill',  sub:'Hiragana & katakana', seal:'あ',  accent:'#6b46c1'},
  {id:'eigo-drill',  name:'Eigo Drill',  sub:'Letters & numbers',   seal:'Aa', accent:'#2f7d4f'},
  {id:'kanji-drill', name:'Kanji Drill', sub:'Grade 1 kanji',       seal:'漢',  accent:'#2b6cb0'},
  {id:'nihongo-drill', name:'Nihongo Drill', sub:'Japanese words',    seal:'語',  accent:'#c2255c'},
];

const CSS = `
.hrow{position:relative}
.brand[data-switcher]{cursor:pointer;user-select:none;border-radius:6px}
.brand[data-switcher]:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.brand .sw-caret{width:14px;height:14px;opacity:.55;margin-left:-4px;transition:transform .15s}
.brand[aria-expanded=true] .sw-caret{transform:rotate(180deg)}
.sw-menu{position:absolute;top:calc(100% + 6px);left:0;z-index:20;min-width:250px;max-width:calc(100vw - 40px);display:none;flex-direction:column;gap:2px;
  background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px;box-shadow:0 10px 28px rgba(0,0,0,.2);font-size:15px;font-weight:700}
.sw-menu.open{display:flex}
.sw-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;color:var(--ink);text-decoration:none}
.sw-item:hover,.sw-item:focus-visible{background:var(--accent-soft);outline:none}
.sw-item[aria-current=page]{background:var(--bg)}
.sw-seal{width:30px;height:30px;border-radius:4px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:15px;flex:none}
.sw-text small{display:block;color:var(--muted);font-weight:600;font-size:12px}
.sw-check{margin-left:auto;color:var(--accent);font-weight:800}
`;

function init() {
  const brand = document.querySelector('.brand');
  if (!brand) return;
  const here = APPS.find(a => location.pathname.indexOf('/' + a.id + '/') !== -1);

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // The brand becomes a button
  brand.setAttribute('data-switcher', '');
  brand.setAttribute('role', 'button');
  brand.setAttribute('tabindex', '0');
  brand.setAttribute('aria-haspopup', 'true');
  brand.setAttribute('aria-expanded', 'false');
  brand.setAttribute('aria-label', 'Switch app');
  brand.insertAdjacentHTML('beforeend',
    '<svg class="sw-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>');

  // The menu sits next to the brand (inside the same header row), not inside it
  const menu = document.createElement('div');
  menu.className = 'sw-menu';
  menu.setAttribute('role', 'menu');
  APPS.forEach(a => {
    const link = document.createElement('a');
    link.className = 'sw-item';
    link.href = '../' + a.id + '/index.html';
    link.setAttribute('role', 'menuitem');
    if (here && here.id === a.id) link.setAttribute('aria-current', 'page');
    const seal = document.createElement('span');
    seal.className = 'sw-seal'; seal.style.background = a.accent; seal.textContent = a.seal;
    const text = document.createElement('span');
    text.className = 'sw-text'; text.textContent = a.name;
    const sub = document.createElement('small'); sub.textContent = a.sub; text.appendChild(sub);
    link.append(seal, text);
    if (here && here.id === a.id) { const c = document.createElement('span'); c.className = 'sw-check'; c.textContent = '✓'; link.appendChild(c); }
    menu.appendChild(link);
  });
  brand.insertAdjacentElement('afterend', menu);

  const setOpen = open => {
    menu.classList.toggle('open', open);
    brand.setAttribute('aria-expanded', String(open));
  };
  const isOpen = () => menu.classList.contains('open');

  brand.addEventListener('click', e => { e.stopPropagation(); setOpen(!isOpen()); });
  // Space/Enter on the focused brand must not also advance the card (the drill listens on document)
  brand.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); setOpen(!isOpen()); }
    else if (e.key === 'Escape' && isOpen()) { e.stopPropagation(); setOpen(false); }
  });
  menu.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); brand.focus(); } });
  document.addEventListener('click', e => { if (isOpen() && !menu.contains(e.target)) setOpen(false); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
