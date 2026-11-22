# Drill apps: roadmap

Running list of future features, extra languages and TODOs. Covers Kana Drill and the planned sibling apps. Move items to "Done" (with the date) as they ship.

Status key: `[ ]` not started · `[~]` in progress · `[x]` done

---

## 1. Future features

### Kana Drill
- [ ] **Type-the-answer reading.** In Read mode, type the romaji and check it instantly, giving a real score instead of relying on Peek. Accept alternative spellings (*si* for し, *tu* for つ, *o* for を).
- [ ] **Draw on screen.** A writing pad on the card for tablets and phones. Check with Peek, clear on Next.
- [ ] **Timed rounds.** Total time and average per card, with a best time for each round type.
- [ ] **Extended katakana.** ファ フィ フェ フォ, ティ ディ, ヴ, ウィ ウェ ウォ, シェ ジェ チェ and so on. A fourth group in Settings (katakana only).
- [ ] **Pronunciation audio.** A speaker button using the browser's Japanese voice. Left out on purpose for now.
- [ ] **Sync between devices.** Export/import (copy a code) or a small backend, so weak-spot history moves between phone and computer.

### Cross-app
- [ ] Shared home/launcher page listing all drill apps.
- [ ] Optional stroke-order hints (see per-language notes below).
- [x] **Read-mode timing (recording).** Time on each card from when it appears until Next or Show again; pauses for panels, Reveal all and hidden tabs. Shown per card in Reveal all, colour-banded: under 1s proficient, up to 3s ok, 3–5s needs improvement, over 5s really needs improvement. Kept in memory for the page session only (`S.sessionTimes`). The **Timer** setting (On/Off, default On) switches recording and display on all three apps.
- [ ] **Auto "again" from timers.** Use the recorded times to treat a slow card like Show again (re-queue it and score it as a miss) without a click: e.g. over 3s = needs improvement, over 5s = really needs improvement. Decide the thresholds and whether to apply them per card or to a character's average.
- [ ] Timing follow-ups: also record time to first Peek (a cleaner measure of recall than time to Next), save timing history across sessions, show each character's average time, and feed slow characters into Weak spots.

---

## 2. Additional languages / drills

| Drill | Content | Notes |
|---|---|---|
| **English letters & numbers** | A–Z (upper/lower), 0–9, maybe punctuation | **Built as Eigo Drill** (`public/eigo-drill/`). Write mode shows the letter name ("bee"); Read mode shows the character. Ideas for more: phonics sound prompts (/b/), "capital → write lowercase" mode, punctuation, separate upper/lower cards, sight words. |
| **Kanji Drill** | Kanji → meaning + on/kun readings. Jōyō set (2,136): grade 1 (80), grade 2 (160), then up to grade 6 (1,026 total) | **Prototype started** (`public/kanji-drill/`, grade 1 only, hand-entered data). Separate app on `drill-core`. See "Kanji Drill" under TODOs. Top ~1,000 kanji cover about 90% of everyday text. |
| **Korean Hangul** | Consonants, vowels, then syllable blocks | Same shape as kana: rows = consonant groups. |
| **Cyrillic / Greek / Arabic / Hebrew alphabets** | Letters with transliteration | Mostly just new data once the core is shared. |
| **Numbers in other languages** | 1–100 | Later. |

---

## 3. TODOs

### Housekeeping
- [ ] Fix the stale README. It refers to `kana-drill.html`; the file is `public/kana-drill/index.html`. Update "Getting started" and "Where things are in the code".
- [ ] Namespace localStorage keys per app (`kana-drill:settings`, `kana-drill:stats`). The settings key is currently `hiragana-drill-settings-v1`. Migrate the existing keys so nobody loses history.
- [ ] Sidebar link in `astro.config.mjs` still uses the Starlight starter title and links ("My Docs", Example Guide). Clean up.

### Codebase organisation (decision made: share a core, keep separate apps)
- [x] Create `public/drill-core/engine.js` and `ui.css` (built with Eigo Drill).
- [x] Classic `<script>` tags, not ES modules, so the apps still open from `file://`.
- [x] Generic item shape `{sid, key, ...}`; stats keyed per app (`eigo-drill:stats`).
- [ ] Migrate Kana Drill onto the core (after the UI tweaks). Kana needs: script badge (`badge.cls: 'inv'` for katakana), row tag via `view().rowTag`, `variant` for the hira/kata tag in Reveal, `--face: 'Klee One'`. Kana's inline CSS currently carries a copy of the colour themes, radii and gaps from `ui.css`; delete it when migrating. Migrate the old `hiragana-drill-settings-v1` / `kana-drill-stats-v1` keys.
- [ ] Rename "look-alikes" to "confusable sets" in the core UI text if it reads oddly for non-kana apps.
- [x] Build `public/eigo-drill/` on the same core as the proof that the split works.
- [x] App switcher: tapping the logo/name in the header opens a menu of all drill apps (`public/drill-core/switcher.js`). **Adding a new app: add it to `APPS` in that file**, and give it a `data-theme` colour.
- [ ] Revisit: move to Astro pages + TypeScript in `src/lib/` if we want tests or more than 3–4 apps.

### Kanji Drill
- [x] Grade 1 prototype: 80 kanji in 8 themed rows (numbers, days & time, nature, people & body, school & words, directions & size, colours, things & actions). Peek shows meaning plus on/kun readings.
- [ ] Check the hand-entered grade 1 data against KANJIDIC2 (grade, meanings, readings). KANJIDIC2 is CC BY-SA, so add an attribution line to the app.
- [ ] Grades 2–6 (generate the data file from KANJIDIC2 rather than typing it).
- [ ] Settings: choose what Peek shows (meaning / readings / both); group by grade or by theme.
- [ ] Reading practice: type or choose the reading; meaning ↔ kanji multiple choice.
- [ ] Look-alike sets beyond grade 1 (e.g. 未/末, 土/士, 待/持).
- [ ] Example words per kanji (e.g. 日本, 火曜日) and stroke-order hints.
- [ ] JLPT level filter (N5–N1) as an alternative to school grades.

### Eigo Drill
- [ ] Number groups are 1–9, 10–90 and 100–900 (no zero). Later: zero, teens (11–19), 1000+, mixed numbers like 47 and 305.
- [ ] Letter names use "zed" (Australian). Add a Settings option for "zee".
- [ ] Optional guide lines (baseline / midline) behind the answer to help with letter size and shape.
- [ ] A school-style handwriting font option (the current one is Patrick Hand).

### Kana UI tweaks
- [ ] _(to be listed: waiting on Andrew's list)_

---

## Done
_(nothing yet)_
