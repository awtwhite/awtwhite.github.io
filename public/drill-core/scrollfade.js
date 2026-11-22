/*
 * drill-core/scrollfade.js: marks every `.pbody` (the scrolling options area of a modal) with
 * `fade-top` while it is scrolled down (content hidden above) and `fade-bottom` while there is
 * more content below the visible part.
 * The CSS (in ui.css, and Kana Drill's inline copy) turns those classes into fades under the
 * sticky header and above the footer.
 * Classic script; tracks scrolling, resizing and content re-renders.
 */
(function () {
'use strict';

function watch(el) {
  const update = () => {
    el.classList.toggle('fade-top', el.scrollTop > 2);
    el.classList.toggle('fade-bottom', el.scrollHeight - el.scrollTop - el.clientHeight > 2);
  };
  el.addEventListener('scroll', update, {passive: true});
  if (window.ResizeObserver) new ResizeObserver(update).observe(el);          // opened, rotated, window resized
  new MutationObserver(update).observe(el, {childList: true, subtree: true}); // settings re-rendered
  update();
}

function init() { document.querySelectorAll('.pbody').forEach(watch); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
