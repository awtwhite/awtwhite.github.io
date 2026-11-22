/*
 * drill-core/engine.js: shared engine for the drill apps (eigo-drill, later kana-drill).
 * Classic script (no ES modules) so apps still open from file://.
 *
 * Usage: DrillCore.create(config). See public/eigo-drill/index.html for a full example.
 *
 * view() back may also carry `cls` (extra class on the answer, e.g. 'sm' for smaller text) and `sub`
 * (a second answer line; only shown if the page has an element with id=answerSub).
 *
 * config:
 *   id              app id; localStorage keys are `${id}:settings` and `${id}:stats`
 *   defaults        default settings object (needs mode, order; the rest is the app's)
 *   sanitize(raw)   -> valid settings from stored JSON, or null
 *   fullItems(s)    -> items for a full round
 *   lookItems(s)    -> items for the look-alike round (grouped by item.key)
 *   itemFromSid(id) -> item for a stats id, or null if unknown
 *   inScope(it, s)  optional; false for items the current settings exclude (e.g. unticked rows).
 *                   Applied to EVERY round type (full, look-alike, weak spots), so no round can
 *                   show a card the user switched off.
 *   view(it, reading, s) -> {front:{text,glyph}, back:{text,glyph}, rowTag?, badge?:{text,cls}}
 *   tile(it, mixed, s)   -> {main, sub, tag?} for the reveal grid and weak chips
 *   brand(s)        -> [sealText, name]
 *   prompts         {write, read}: one-line instructions for the intro card
 *   fullHint(s,n), lookHint(s,n)  -> text for the Rounds panel
 *   settingsHTML(draft), settingsCount(draft), onSettingsClick(button, draft)
 *   applySettings(s)  optional; called on every render (e.g. to set CSS variables)
 *   sorters         optional {orderName: compareFn}; extra Order settings that sort the deck instead of
 *                   shuffling it (e.g. az, za). Look-alike rounds always stay grouped by set.
 *   settings.timer  optional boolean (default on): time each card in Read mode. Apps put the toggle in
 *                   their settings panel and keep `timer` through sanitize().
 *   modes           optional; which of ['write','read'] the app offers (default both). With one
 *                   mode the Write/Read toggle is hidden and the M shortcut does nothing.
 *
 * An item is {sid, key, ...anything}. `sid` identifies it in weak-spot stats,
 * `key` groups it for "by row" ordering. Optional `variant` makes the reveal grid
 * tag tiles when a round mixes variants.
 */
(function (global) {
'use strict';

const $ = id => document.getElementById(id);
const clone = o => JSON.parse(JSON.stringify(o));

function shuffle(a){ for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function buildDeck(items, order){
  if (order === 'mixed') return shuffle(items.slice());
  const by = new Map();
  items.forEach(it => { if (!by.has(it.key)) by.set(it.key, []); by.get(it.key).push(it); });
  return shuffle([...by.values()]).flatMap(g => shuffle(g.slice()));
}

function create(cfg){
  const SETTINGS_KEY = cfg.id + ':settings', STATS_KEY = cfg.id + ':stats';
  const read = k => { try { return JSON.parse(localStorage.getItem(k)); } catch(e) { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };

  let settings = cfg.sanitize(read(SETTINGS_KEY)) || clone(cfg.defaults);
  let stats = (() => { const o = read(STATS_KEY); return o && typeof o === 'object' ? o : {}; })();
  const saveSettings = () => write(SETTINGS_KEY, settings);
  const saveStats = () => write(STATS_KEY, stats);

  // ---------- Weak spots: +2 when peeked / "show again", -1 when clean (0 to 10) ----------
  // Every round draws its cards through these, so inScope() is enforced in one place.
  const inScope = it => !!it && (!cfg.inScope || cfg.inScope(it, settings));
  const fullItems = () => cfg.fullItems(settings).filter(inScope);
  const lookItems = () => {
    const items = cfg.lookItems(settings).filter(inScope), n = new Map();
    items.forEach(it => n.set(it.key, (n.get(it.key) || 0) + 1));
    return items.filter(it => n.get(it.key) > 1);          // a set with one card left is nothing to compare
  };
  const weakList = () => Object.entries(stats).filter(([sid, v]) => v > 0 && inScope(cfg.itemFromSid(sid))).sort((a, b) => b[1] - a[1]);
  const weakItems = () => weakList().slice(0, 20).map(([sid]) => cfg.itemFromSid(sid));

  // ---------- Rounds ----------
  const ROUND_LABEL = {full:'', look:'look-alikes', weak:'weak spots', misses:'misses'};
  const S = {deck:[], idx:-1, finished:false, peeked:new Set(), again:new Set(), scored:new Set(), peekOn:false, round:'full', source:[], view:'drill',
             againCount:new Map(),   // card sid -> times "Show again" was pressed this round
             sessionAgain:{},       // same, running total for the whole page session (never reset, not saved)
             times:{}, cardMs:0, clockStart:null,   // read-mode timing: ms per shown card (by deck index), time on the current card, clock start
             sessionTimes:{}};       // card sid -> every time (ms) recorded this page session, not saved

  function startRound(items, type, forceOrder){
    S.source = items;
    const order = forceOrder || settings.order, sorter = cfg.sorters && cfg.sorters[order];
    S.deck = sorter ? items.slice().sort(sorter) : buildDeck(items, order);
    Object.assign(S, {idx:-1, finished:false, peeked:new Set(), again:new Set(), againCount:new Map(), times:{}, cardMs:0, clockStart:null, scored:new Set(), peekOn:false, round:type, view:'drill'});
    disarm(); closeOverlays(); render();
  }
  const startFull = () => startRound(fullItems(), 'full');
  const startLook = () => { const it = lookItems(); if (it.length) startRound(it, 'look', 'row'); };   // keep each look-alike set together
  const startWeak = () => { const it = weakItems(); if (it.length) startRound(it, 'weak'); };
  function restart(){
    if (S.round === 'look') startLook();
    else if (S.round === 'weak' && weakItems().length) startWeak();
    else if (S.round === 'misses') startRound(S.source, 'misses');
    else startFull();
  }

  // ---------- Actions ----------
  function scoreCard(i){
    if (i < 0 || i >= S.deck.length || S.scored.has(i)) return;
    S.scored.add(i);
    const k = S.deck[i].sid;
    const miss = S.peeked.has(i) || S.again.has(i);
    const v = miss ? Math.min(10, (stats[k] || 0) + 2) : Math.max(0, (stats[k] || 0) - 1);
    if (v) stats[k] = v; else delete stats[k];
    saveStats();
  }
  const timeBand = ms => ms < 1000 ? 'good' : ms <= 3000 ? 'ok' : ms <= 5000 ? 'slow' : 'veryslow';
  const fmtSecs = ms => (ms / 1000).toFixed(1) + 's';
  const timeLegend = '<div class="tlegend">Time on each card (read mode): <span class="tm-good">under 1s</span> proficient · <span class="tm-ok">1–3s</span> ok · <span class="tm-slow">3–5s</span> needs improvement · <span class="tm-veryslow">over 5s</span> really needs improvement</div>';
  // Read-mode timing: the clock runs only while a card is on screen in Read mode, and pauses for
  // panels, Reveal all and hidden tabs. A card's time is recorded when you move on (Next or Show again).
  const clockOn = () => S.view === 'drill' && S.idx >= 0 && !S.finished && settings.mode === 'read' && settings.timer !== false && !anyOverlay() && !document.hidden;
  function syncClock(){
    const run = clockOn(), now = performance.now();
    if (run && S.clockStart == null) S.clockStart = now;
    else if (!run && S.clockStart != null) { S.cardMs += now - S.clockStart; S.clockStart = null; }
  }
  function finishCard(){
    if (S.idx < 0 || S.finished) return;
    if (S.clockStart != null) { S.cardMs += performance.now() - S.clockStart; S.clockStart = null; }
    if (settings.mode === 'read' && settings.timer !== false && S.cardMs > 0) {
      S.times[S.idx] = S.cardMs;
      const sid = S.deck[S.idx].sid;
      (S.sessionTimes[sid] = S.sessionTimes[sid] || []).push(S.cardMs);
    }
  }
  function next(){
    if (S.view !== 'drill') return;
    if (S.finished) { reveal(); return; }
    finishCard();
    scoreCard(S.idx);
    if (S.idx < S.deck.length - 1) S.idx++; else S.finished = true;
    S.cardMs = 0; S.clockStart = null;
    S.peekOn = false; disarm(); render();
  }
  function showAgain(){
    if (S.view !== 'drill' || S.idx < 0 || S.finished) return;
    S.again.add(S.idx);
    const sid = S.deck[S.idx].sid;
    S.againCount.set(sid, (S.againCount.get(sid) || 0) + 1);
    S.sessionAgain[sid] = (S.sessionAgain[sid] || 0) + 1;
    const copy = {...S.deck[S.idx], again:true};
    const earliest = S.idx + 4;                     // at least 3 other cards in between
    const pos = earliest >= S.deck.length ? S.deck.length
              : earliest + Math.floor(Math.random() * (Math.min(5, S.deck.length - earliest) + 1));
    S.deck.splice(pos, 0, copy);
    next();
  }
  const againLabel = sid => { const n = S.againCount.get(sid) || 0; return n > 1 ? 'again ×' + n : 'again'; };
  function peek(){
    if (S.view !== 'drill' || S.idx < 0 || S.finished) return;
    S.peekOn = !S.peekOn;
    if (S.peekOn) S.peeked.add(S.idx);
    render();
  }
  function reveal(){ if (S.idx < 0) return; scoreCard(S.finished ? S.idx : -1); S.view = 'reveal'; S.peekOn = false; disarm(); render(); window.scrollTo(0, 0); }
  const canContinue = () => !S.finished && S.idx < S.deck.length - 1;
  function backToRound(){ if (!canContinue()) return; S.view = 'drill'; render(); }
  function missItems(){
    const seen = new Set(), out = [];
    [...new Set([...S.peeked, ...S.again])].sort((a, b) => a - b).forEach(i => {
      const it = S.deck[i];
      if (!seen.has(it.sid)) { seen.add(it.sid); out.push({...it, again:false}); }
    });
    return out;
  }
  function practiceMisses(){ const items = missItems(); if (items.length) startRound(items, 'misses'); }
  const modes = cfg.modes || ['write', 'read'];
  function setMode(m){ if (!modes.includes(m)) return; settings.mode = m; S.peekOn = false; S.cardMs = 0; S.clockStart = null; saveSettings(); render(); }

  // Two-press confirm helper (Reset mid-round, Clear history)
  let armedId = null, armTimer = null;
  function disarm(){ armedId = null; clearTimeout(armTimer); updateArmed(); }
  function confirmPress(id){
    if (armedId === id) { disarm(); return true; }
    armedId = id; clearTimeout(armTimer); armTimer = setTimeout(disarm, 2500); updateArmed(); return false;
  }
  function updateArmed(){
    const r = $('resetBtn'), c = $('clearWeak');
    r.classList.toggle('armed', armedId === 'reset');
    r.innerHTML = armedId === 'reset' ? 'Press again to reset<kbd>R</kbd>' : 'Reset<kbd>R</kbd>';
    c.textContent = armedId === 'clear' ? 'Click again to clear' : 'Clear history';
  }
  function reset(){
    const inProgress = S.view === 'drill' && S.idx >= 0 && !S.finished;
    if (inProgress && !confirmPress('reset')) return;
    restart();
  }

  // ---------- Render ----------
  function render(){
    syncClock();
    if (cfg.applySettings) cfg.applySettings(settings);
    const total = S.deck.length, shown = S.finished ? total : S.idx + 1;
    const brand = cfg.brand(settings);
    $('seal').textContent = brand[0]; $('brandName').textContent = brand[1];
    const reading = settings.mode === 'read';
    $('modeSeg').style.display = modes.length > 1 ? '' : 'none';
    [...$('modeSeg').children].forEach(b => { b.style.display = modes.includes(b.dataset.v) ? '' : 'none'; b.classList.toggle('on', b.dataset.v === settings.mode); });
    $('progress').innerHTML = `${shown} / ${total}` + (ROUND_LABEL[S.round] ? `<span class="badge">${ROUND_LABEL[S.round]}</span>` : '');
    $('barFill').style.width = total ? (shown / total * 100) + '%' : '0';

    const drill = S.view === 'drill';
    $('drill').classList.toggle('off', !drill);
    $('reveal').classList.toggle('on', !drill);

    if (drill) {
      const romaji = $('romaji'), sub = $('sub'), answer = $('kana'), badge = $('scripttag');
      $('peektag').textContent = ''; $('rowtag').textContent = '';
      badge.textContent = ''; badge.style.display = 'none';
      answer.className = 'answer'; answer.textContent = '';
      const asub = $('answerSub');             // optional second answer line
      if (asub) { asub.textContent = ''; asub.className = 'answer-sub'; }
      if (S.idx < 0) {
        romaji.className = 'romaji msg';
        romaji.textContent = {full:'Ready?', look:'Look-alike drill', weak:'Weak spots', misses:'Misses round'}[S.round];
        const lead = S.round === 'look' ? `${total} easily confused characters, grouped in sets so you compare them. `
                   : S.round === 'weak' ? `Your ${total} trickiest characters. ` : `${total} cards, shuffled. `;
        sub.textContent = lead + (reading ? cfg.prompts.read : cfg.prompts.write) + ' Not sure? Press Show again and it comes back later.';
      } else if (S.finished) {
        romaji.className = 'romaji msg'; romaji.textContent = 'Round complete';
        sub.textContent = `${total} cards · ${missItems().length} to review. Press Next to reveal all and check your page.`;
      } else {
        const it = S.deck[S.idx], v = cfg.view(it, reading, settings);
        romaji.className = 'romaji' + (v.front.glyph ? ' glyph' : v.front.text.length > 5 ? ' long' : '');
        romaji.textContent = v.front.text;
        sub.textContent = '';
        $('rowtag').textContent = v.rowTag || '';
        $('peektag').textContent = [it.again ? againLabel(it.sid) : '', S.peeked.has(S.idx) ? 'peeked' : ''].filter(Boolean).join(' · ');
        if (v.badge) { badge.style.display = ''; badge.textContent = v.badge.text; badge.className = 'scripttag' + (v.badge.cls ? ' ' + v.badge.cls : ''); }
        answer.className = 'answer' + (v.back.glyph ? ' glyph' : '') + (v.back.cls ? ' ' + v.back.cls : '') + (S.peekOn ? ' on' : '');
        answer.textContent = v.back.text;
        if (asub) { asub.textContent = v.back.sub || ''; asub.className = 'answer-sub' + (S.peekOn ? ' on' : ''); }
      }
      const active = S.idx >= 0 && !S.finished;
      const pb = $('peekBtn');
      pb.disabled = !active; pb.classList.toggle('peeking', S.peekOn);
      pb.innerHTML = (S.peekOn ? 'Hide' : 'Peek') + '<kbd>P</kbd>';
      $('againBtn').disabled = !active;
      $('nextBtn').innerHTML = (S.finished ? 'Reveal all' : S.idx < 0 ? 'Start' : 'Next') + '<kbd>Space</kbd>';
      $('revealBtn').disabled = S.idx < 0;
    } else {
      const list = S.deck.slice(0, shown);
      const needs = missItems().length;
      const mixed = new Set(list.map(it => it.variant)).size > 1;
      $('rTitle').textContent = S.finished ? 'Round complete' : 'So far';
      $('rMeta').innerHTML = `Shown ${shown} of ${total} · ${needs} to review` + (needs ? ` &nbsp;<span class="legend"></span>= peeked or marked "show again"` : '') + (Object.keys(S.times).length ? timeLegend : '');
      $('grid').innerHTML = list.map((it, i) => {
        const flag = S.peeked.has(i) || S.again.has(i), t = cfg.tile(it, mixed, settings);
        return `<div class="tile${flag ? ' peeked' : ''}${S.times[i] != null ? ' timed' : ''}"><span class="n">${i + 1}</span>`
          + (t.tag ? `<span class="st">${t.tag}</span>` : '')
          + `<div class="k">${t.main}</div><div class="r">${t.sub}</div>`
          + (it.again ? `<span class="tg">${againLabel(it.sid)}</span>` : '')
          + (S.times[i] != null ? `<span class="tm ${timeBand(S.times[i])}">${fmtSecs(S.times[i])}</span>` : '') + `</div>`;
      }).join('');
      $('backBtn').style.display = canContinue() ? '' : 'none';
      const mb = $('missBtn'); mb.disabled = !needs; mb.textContent = `Practice misses (${needs})`;
    }
  }

  // ---------- Rounds panel ----------
  function openRounds(){ renderRounds(); $('roundsOverlay').classList.add('open'); syncClock(); }
  function renderRounds(){
    $('rFullHint').textContent = cfg.fullHint(settings, fullItems().length);
    const nLook = lookItems().length;
    $('rLook').disabled = !nLook;
    $('rLookHint').textContent = nLook ? cfg.lookHint(settings, nLook) : 'No confusable sets in your selected rows.';
    const wl = weakList();
    $('rWeak').disabled = !wl.length;
    $('rWeakHint').textContent = wl.length ? (wl.length === 1 ? 'Your 1 tricky character' : `Your ${Math.min(20, wl.length)} trickiest characters`) + ', based on peeks and "show again" over time.'
                                           : 'Nothing yet. Characters you peek at or mark "show again" will collect here.';
    $('weakChips').innerHTML = wl.length ? wl.slice(0, 40).map(([sid, v]) => {
        const t = cfg.tile(cfg.itemFromSid(sid), false, settings);
        return `<div class="wchip" title="score ${v}/10"><span class="kh">${t.main}</span><span class="r">${t.sub}</span><span class="dots" style="width:${Math.max(12, v * 10)}%"></span></div>`;
      }).join('') : '<div class="empty">No weak spots recorded yet.</div>';
    $('clearWeak').style.display = wl.length ? '' : 'none';
  }

  // ---------- Settings panel (the controls themselves come from the app) ----------
  let draft = null;
  function openSettings(){ draft = clone(settings); renderSettings(); $('overlay').classList.add('open'); syncClock(); }
  function closeOverlays(){ document.querySelectorAll('.overlay').forEach(o => o.classList.remove('open')); syncClock(); }
  const anyOverlay = () => !!document.querySelector('.overlay.open');
  function renderSettings(){
    $('settingsBody').innerHTML = cfg.settingsHTML(draft);
    const n = cfg.settingsCount(draft);
    $('selCount').textContent = `${n} card${n === 1 ? '' : 's'} selected`;
    $('applyBtn').disabled = n === 0;
  }
  $('settingsBody').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    cfg.onSettingsClick(b, draft);
    renderSettings();
  });
  $('applyBtn').addEventListener('click', () => { if (!cfg.settingsCount(draft)) return; settings = draft; saveSettings(); startFull(); });
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeOverlays));
  document.querySelectorAll('.overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) closeOverlays(); }));
  $('modeSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { b.blur(); setMode(b.dataset.v); } });

  // ---------- Wiring ----------
  function tap(id, fn){ $(id).addEventListener('click', e => { e.currentTarget.blur(); fn(); }); }
  tap('nextBtn', next); tap('peekBtn', peek); tap('againBtn', showAgain); tap('revealBtn', reveal); tap('resetBtn', reset);
  tap('backBtn', backToRound); tap('missBtn', practiceMisses); tap('newBtn', restart); tap('otherBtn', openRounds);
  tap('settingsBtn', openSettings); tap('roundsBtn', openRounds);
  tap('rFull', startFull); tap('rLook', startLook); tap('rWeak', startWeak);
  tap('clearWeak', () => { if (confirmPress('clear')) { stats = {}; saveStats(); renderRounds(); } });

  document.addEventListener('visibilitychange', syncClock);
  document.addEventListener('keydown', e => {
    if (anyOverlay()) { if (e.key === 'Escape') closeOverlays(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'enter' || k === 'arrowright') { e.preventDefault(); next(); }
    else if (k === 'p') peek();
    else if (k === 'a') showAgain();
    else if (k === 'm' && modes.length > 1) setMode(settings.mode === 'read' ? 'write' : 'read');
    else if (k === 'e') { if (S.view === 'drill') reveal(); }
    else if (k === 'r') { S.view === 'reveal' ? restart() : reset(); }
    else if (k === 'escape') { if (S.view === 'reveal') backToRound(); }
  });

  startFull();
  return {state:S, startFull, startLook, startWeak};
}

// Heading for a group of settings (see .sect in ui.css)
const section = title => '<h3 class="sect">' + title + '</h3>';

global.DrillCore = {create, shuffle, buildDeck, section};
})(window);
