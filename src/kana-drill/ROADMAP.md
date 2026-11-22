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

---

## 2. Additional languages / drills

| Drill | Content | Notes |
|---|---|---|
| **English letters & numbers** | A–Z (upper/lower), 0–9, maybe punctuation | **Built as Eigo Drill** (`public/eigo-drill/`). Write mode shows the letter name ("bee"); Read mode shows the character. Ideas for more: phonics sound prompts (/b/), "capital → write lowercase" mode, punctuation, separate upper/lower cards, sight words. |
| **Kanji (grade 1 start)** | Meaning/reading ↔ character | Needs a data source and a decision on which readings to include. |
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
- [ ] Migrate Kana Drill onto the core (after the UI tweaks). Kana needs: script badge (`badge.cls: 'inv'` for katakana), row tag via `view().rowTag`, `variant` for the hira/kata tag in Reveal, `--face: 'Klee One'`. Migrate the old `hiragana-drill-settings-v1` / `kana-drill-stats-v1` keys.
- [ ] Rename "look-alikes" to "confusable sets" in the core UI text if it reads oddly for non-kana apps.
- [x] Build `public/eigo-drill/` on the same core as the proof that the split works.
- [ ] Revisit: move to Astro pages + TypeScript in `src/lib/` if we want tests or more than 3–4 apps.

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
