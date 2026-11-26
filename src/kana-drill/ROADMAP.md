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
| **Nihongo Drill** | Japanese words from the Beginner Japanese Classes 2 vocabulary list (Sapporo), grouped by class, English on Peek | **Built** (`public/nihongo-drill/`, 355 cards from Classes 1-8; plan and decisions in `src/nihongo-drill/PLAN.md`). Read-only, pink theme, on `drill-core`. |
| **Korean Hangul** | Consonants, vowels, then syllable blocks | Same shape as kana: rows = consonant groups. |
| **Cyrillic / Greek / Arabic / Hebrew alphabets** | Letters with transliteration | Mostly just new data once the core is shared. |
| **Numbers in other languages** | 1–100 | Later. |

---

## 3. TODOs

### Housekeeping
- [x] Fix the stale Kana README (file name, getting started, where things are in the code; added Timer and the new storage keys).
- [x] Namespace Kana's localStorage keys (`kana-drill:settings`, `kana-drill:stats`); the old keys are moved across once on load, so no history is lost.
- [x] Replaced the Starlight starter placeholders: site title, GitHub link, sidebar (now one "Drill apps" group linking to `/<app>/index.html`, which works in dev too), the home page, and removed the example guide/reference pages and the template image. The repo's root `README.md` is still the Starlight starter text.

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

### Nihongo Drill
- [x] First version: Classes 1-8 as groups (counters split out), English shown on Reveal, pink theme, 355 cards.
- [x] **Line breaks in long phrases** are controlled: a `·` in `data.js` marks where a line may break (26 entries marked; spaces and slashes are handled automatically). When adding words, mark long phrases the same way; see the `data.js` header.
- [x] **Preview all** before a round starts (every selected word, grouped, nothing scored). Optional in the engine (`preview: true`); could be offered in the other apps too.
- [x] **Reset** is disabled until a round has started (it only reshuffled the deck before), in every app.
- [x] Card flow: **Reveal**, then **Try again** / **Got it** (no Peek). Time is measured to Reveal. Button names are `labels` in the app config.
- [ ] Auto-**missed** from the timer: treat a slow Reveal (over 3s, or 5s) as a miss without asking. (Same idea as the general "auto again from timers" item.)
- [ ] Offer the Reveal / Got it / Try again flow as an option in the other apps (Kana, Eigo, Kanji), where the engine already supports it (`flow: 'grade'`).
- [x] In the grade flow the small "Reveal all" button (and the finished-round button) is called "Review round"; `labels.revealAll` in the config changes it.
- [ ] **Romaji option (small, below the Japanese word).** The book's romaji is its own spelling (jyuusho, kooen); decide between that and Hepburn converted from the kana, as in Kana Drill.
- [ ] **Show the verb group (1)(2)(3)** as a hint when a verb is revealed. (It is already shown in the Study page's Type view, grouped under Verbs.)
- [x] **Sentences group:** Study > Type > "Phrases & sentences" (27) lists them all, and Settings > Choose by Type can drill just them. [ ] Still to do: an alternative lesson option (study by sentence).
- [x] **Theme and word-type groups** (Study page and Settings > Choose by). Every word has one theme (12, rolled up from 30 topic tags), one word type (noun, verb, i- or na-adjective, adverb, connector, phrase, counter) and a book class; loanwords and Sapporo words are filters.
- [x] **Study page** (replaces Preview all): browse by Theme, Type, Class or your Weak words; tap a word to flip it, or Hide English to test yourself; search; filter chips (Loanwords, Sapporo, My selection); Practise these on any section.
- [ ] **Check the word types and themes in `data.js`** (hand-checked pre-fill: 168 nouns, 34 verbs, 11 i-adjectives, 7 na-adjectives, 8 adverbs, 7 connectors, 27 phrases, 93 counters). Counters are sub-grouped by what they count, worked out from the English.
- [ ] Study page ideas: star words as "needs work" (feeds Weak spots); reverse mode (English first, recall the Japanese); a "seen / not seen" status (needs the drill to remember cards it has shown; the weak list only keeps words with a score above zero); remember the chosen view and open sections.
- [ ] Verbs: group by plain form vs ます form, or show the other forms.
- [ ] Review the Sapporo-specific words (the wards and some shop/food terms); decide whether they stay in the core list or move to an optional "Sapporo" group.
- [ ] **Check the transcription against the book.** Three deliberate changes to confirm: 2割引 written as "20% off" (the book says 2%); 10% and 10%引 written out in kana from the book's romaji; counters given descriptive English.
- [ ] Optional: Write mode (English to Japanese) once Read mode is settled.
- [ ] Optional: a Class 1 starter default is used; consider remembering the last selection per device (already saved) vs a "start here" suggestion for new users.

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
