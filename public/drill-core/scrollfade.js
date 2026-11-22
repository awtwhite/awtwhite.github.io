/*
 * drill-core/scrollfade.js: adds the class `fade-bottom` to every `.pbody` (the scrolling
 * options area of a modal) while there is more content below the visible part.
 * The CSS (in ui.css, and Kana Drill's inline copy) turns that class into a bottom fade.
 * Classic script; tracks scrolling, resizing and content re-renders.
 */
(function () {
'use strict';

function watch(el) {
  const update = () => el.classList.toggle('fade-bottom', el.scrollHeight - el.scrollTop - el.clientHeight > 2);
  el.addEventListener('scroll', update, {passive: true});
  if (window.ResizeObserver) new ResizeObserver(update).observe(el);          // opened, rotated, window resized
  new MutationObserver(update).observe(el, {childList: true, subtree: true}); // settings re-rendered
  update();
}

function init() { document.querySelectorAll('.pbody').forEach(watch); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
