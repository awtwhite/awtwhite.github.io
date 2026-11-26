# Nihongo Drill: draft plan

**Status: BUILT (first version).** Decisions from the Q&A are in section 9. Page P10 (Class 6) was supplied; the book has nothing after Class 8, so 355 cards in 12 groups.

## 1. Concept

A read-only recall drill for Japanese **words**, same shape as Eigo Drill:

- The card shows a Japanese word. You try to recall the meaning.
- **Peek** shows the English. **Show again** and **Next** work as normal.
- Words are **grouped**, and Settings lets you tick which groups to practise.
- Timer, weak spots, Show again counts, Reveal all, Rounds: all inherited from `drill-core`.
- App id `nihongo-drill`, brand "Nihongo Drill", **pink** colour theme.

Source: *はじめての にほんごくらす 2* (Japanese Classes for Beginners 2), vocabulary list from the Sapporo International Communication Plaza Foundation (SICPF). Your scan: `jpn_beginner2_vocabulary_20261126-1049.pdf`.

## 2. What is in the PDF

- 15 pages: cover, then P1–P15 (Classes 1–8). **P10 is missing** from the scan, and it looks like it holds Class 6's main word list (P11 continues Class 6 with minutes and hours).
- Columns: Japanese (almost all kana, hardly any kanji), romaji ("Alphabet"), English, Chinese. We would use Japanese + English, and possibly romaji. Chinese is ignored.
- About **325 entries so far**:

| Class | Content | Entries |
|---|---|---|
| 1 | Sapporo wards and directions, jobs, meats and dishes, ordering at an izakaya, personal details; counters ひとつ (things) and ひとり (people) | 76 |
| 2 | Describing places, station and bus stop, kitchen items, pets, rooms and homes; family | 51 |
| 3 | Location words (ue, shita, naka…), vegetables, here/there | 26 |
| 4 | Classroom items, everyday verbs with their verb group; counters ほん (long things), さい (age) | 54 |
| 5 | Hobbies and sports, frequency words | 21 |
| 6 | Counters ふん (minutes), じかん (hours). **Main list missing.** | 20+ |
| 7 | Restrooms, shopping, clothes, food, discounts; counters かい (floors), こ (small items) | 67 |
| 8 | Connectors, souvenirs, photos | 10 |

Things in the scan that need a decision:

- **Counters** have only numerals in the English column ("1", "2"…). Several counters all mean "1", so a card needs a label to be meaningful (see question 4).
- **Question forms** appear as "?" (いくつ, なんにん, なんぼん…).
- **Phrases and sentences** are mixed in with words (おいくつですか, こちらでおめしあがりですか, にほんごで なんですか).
- **Variants** on one line (ひとり, ななにん、しちにん, じゅっぽん/じっぽん).
- **Verb group markers** (1), (2), (3) on verbs.
- **Mixed script**: Suica, Tシャツ, 10%, ２わりびき, 50えんびき.
- **Romaji** is the school's own spelling (jyuusho, kooen, tennpura), not Hepburn like Kana Drill.
- **Sapporo-specific**: the ward names and a few shop/food words. Fine to keep for now.
- Row 1 of Class 1 reads "word" in the English column, probably "ward" (区).

## 3. Shared vs unique

**Reuse as is** from `drill-core`: deck, shuffle, Show again with counts, scoring and Weak spots, Timer and the Reveal all colour bands, settings storage and panel (sections, chips, fixed footer, fades), Rounds panel, `modes: ['read']`, scroll fade, app switcher, phone layout fixes.

**Small, general changes to the shared core** (they help every app):

1. **Look-alike round becomes optional.** The Rounds panel always shows it today. Words have no look-alike sets, so hide the button when an app supplies none.
2. **Long text fits the card.** The big word is sized for 1–3 kana (`clamp(5rem,20vw,12rem)`). A phrase like こちらでおめしあがりですか would overflow. Add length-based size steps for the card front, Reveal all tiles and weak-spot chips. Long English answers also need the existing smaller `sm` size and wrapping.
3. **Chips without a sample glyph.** Group chips currently show a sample character; word groups need a label and a count instead (Kanji's chips already do this, so it is mostly a variant).
4. **Pink theme** added to `ui.css` (light and dark), selected with `data-theme="pink"`.
5. **App switcher entry** for Nihongo Drill (`switcher.js`, `APPS`), plus the sidebar link in `astro.config.mjs`.

**Unique to this app:**

- `public/nihongo-drill/data.js`: the word list and groups (classic script, a global array, so it opens from `file://` like the others).
- `public/nihongo-drill/index.html`: a thin page of config, like Eigo and Kanji (`view`, `tile`, `fullItems`, `settingsHTML`, and so on).

No new engine code is needed. The work is mostly data entry, plus the five small shared changes.

## 4. Data model

One entry per card:

```js
{id:'c1-14', cls:1, group:'jobs', ja:'しごと', ro:'shigoto', en:'work', note:'', topic:'jobs'}
```

- `id` is stable and unique (`c<class>-<n>`). Text can't be the id: それから appears in both Class 1 and Class 8.
- `group` is the book class (and, where useful, a sub-group such as counters). `topic` is a second tag kept in the data, so topic-based grouping can come later without re-entering anything.
- `ro` is the romaji from the book, if we show it. `note` holds things like the verb group.
- Stats key per card is `nihongo-drill:stats`, keyed by `id`.

## 5. Groups for version 1

Faithful to the book: **Class 1 to Class 8**, with each class's counters split into their own chip so they can be ticked separately (for example "Class 4: counters").

Not for v1, but the data carries a `topic` tag so we can offer these later:

Sapporo wards and directions · Jobs · Food and restaurant · Personal details · Numbers and counters · Family · Home and places · Pets and animals · Vegetables · Location words · Verbs · Hobbies and sports · Clothes and shopping · Describing words · Time · Phrases and connectors

## 6. Card design

- **Front:** the Japanese word in Klee One (the textbook handwriting font used in Kana and Kanji).
- **Peek:** the English as the big answer, and a smaller line under it for romaji and/or a note, if we show them.
- **Reveal all tiles:** Japanese on top, shortened English underneath.

## 7. Build steps (once questions are answered)

1. Transcribe the PDF into `data.js` and list it for you to check.
2. Shared core changes 1–5 above (each tested in all three existing apps, so Eigo, Kana and Kanji don't change).
3. Build `index.html` with the config.
4. Test: every card appears once, long text fits at phone width, groups filter every round type, light and dark.
5. Roadmap, README note, one PR.

## 8. Risks

- **Transcription accuracy.** I'm reading a scan and typing the words in by hand, so there will be mistakes. The data file needs your review against the book (a printed list in the same order makes that quick).
- **Missing pages.** P10, and anything after P15, aren't in the PDF.
- **Counters** are the one place where English needs authoring, not copying.

## 9. Decisions (from the Q&A)

1. **Pages:** P10 supplied (Class 6, 28 entries). Nothing after Class 8.
2. **Peek** shows the English only. **TODO:** an option to show romaji, small, below the Japanese word.
3. **Groups:** the book's Classes 1-8, with each class's counters split into their own group (Class 1, 4, 6 and 7 counters). Every word also carries a `topic` tag (and a `kind`) in `data.js` for grouping by theme later.
4. **Counter labels** added ("1 person", "1 long thing", "1 year old", "10th floor"...).
5. **Verb group markers (1)(2)(3)** are kept in the data (`vg`) but not shown. **Possible addition later.**
6. **Phrases and sentences** sit with the words (`kind` = p). **Later:** a group of all sentences, and an alternative lesson option.
7. **Odd entries** included. 区 is "ward".
8. **Transcription** done by hand from the scan; the data file lists what was changed (see its header).
9. **Name, logo and position** as proposed: "Nihongo Drill", 語, after Kanji Drill.

10. **Card flow changed (after the first build):** no Peek. The main button is **Reveal** (shows the English). After it, the buttons are **Try again** (the card comes back later and counts as a miss) and **Got it** (moves on clean). The timer now measures **time to Reveal** (thinking after the answer is shown is not counted). Implemented as an optional `flow: 'grade'` in the shared engine; the other apps keep Peek.

11. **Preview all:** before a round starts, the small "Reveal all" button (disabled until then) becomes **Preview all** (key V). It opens a page listing every card of the selected groups in book order, under group headings, with the English. Nothing is scored. Back returns to Ready; Start round (or Space) begins. Implemented as an optional `preview` / `groupTitle` in the shared engine; other apps are unchanged.

Also decided while building: the default selection is **Class 1 only** (54 cards); the app is read-only (Write mode is not offered); the Look-alike round is hidden because words have no look-alike sets.

## 10. What was built

- `public/nihongo-drill/index.html` and `data.js` (355 cards: 262 class words + 93 counter forms).
- Shared-core changes: optional look-alike round; text-width size steps for the card front, Reveal tiles and chips (`len1`-`len4`, measured in ems so Latin digits and kana are treated differently); an `xs` answer size for long English; the pink theme in `ui.css`; the app switcher entry; the sidebar link.
