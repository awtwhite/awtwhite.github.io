# Kana Drill

A single-page web app for practising **hiragana** and **katakana**. You can practise **writing** (see the romaji, write the kana on paper) or **reading** (see the kana, say the romaji). Cards come in a random order so you can't learn the sequence instead of the characters.

Everything is in one file, `kana-drill.html`. There is nothing to install and no server to run.

---

## Getting started

1. Save `kana-drill.html` anywhere on your computer.
2. Double-click it to open it in your browser (Chrome, Edge, Firefox or Safari).
3. Press **Start** (or **Space**) to begin.

**Notes**
- The page loads two fonts from Google Fonts: *Klee One* for the kana (a textbook-style handwriting font that is good for copying stroke shapes) and *Nunito* for the text. Without an internet connection it still works, but it uses your system fonts.
- Your settings and weak-spot history are saved in your browser (`localStorage`). They stay on that computer and in that browser only, and are lost if you clear your browser data.

---

## How a session works

### Write mode (default)
1. A romaji sound appears in large text, e.g. **shi**.
2. Write the kana on paper.
3. Press **Peek** to check. The kana appears in red under the romaji.
4. Choose what to do next:
   - **Next** if you knew it.
   - **Show again** if you weren't sure. The card comes back later in the round.

In Write mode the card also shows:
- a **hiragana** / **katakana** label at the top, so you know which script to write;
- a **row label** (e.g. `da-row`) in the corner. This tells apart sounds that share the same romaji, such as **ji** (じ / ぢ) and **zu** (ず / づ). You can turn it off in Settings.

### Read mode
Switch with the **Write / Read** toggle in the top bar (or press **M**). The card now shows the kana, and **Peek** shows the romaji. The row label is hidden in Read mode because it would give away part of the answer. You can switch modes in the middle of a round without losing your place.

### Random order without repeats
Each round works like a shuffled deck: every character appears **once**, unless you press Show again.

- **By row** (default): the rows come in random order, and the characters within each row are shuffled too. You finish one row before moving on to the next, e.g. `ka-row: ko, ka, ke, ki, ku`, then `ma-row: …`.
- **Fully mixed**: every character is shuffled together. This is good once you know all the rows.

### Show again ("not sure")
Pressing **Show again** marks the card as "not sure" and moves on. A copy of the card is put back into the round **3–8 cards later**. If fewer than 3 cards are left, it goes at the end. The repeat has an **again** tag, and you can mark it Show again a second time if you're still unsure.

### Reveal all
Press **Reveal all** at any time, or **Next** at the end of a round. It shows every card from the round, in order, with its kana and romaji, so you can compare against what you wrote.

- Cards you **peeked at** or marked **Show again** are highlighted in red.
- **Back to round** continues the round if there are cards left.
- **Practice misses** starts a new round with only the highlighted characters, each one once.
- **New round** reshuffles the same kind of round.
- **Other rounds…** opens the Rounds menu.

### Reset
**Reset** reshuffles and starts the current kind of round again, which also clears the round's history. If a round is in progress, you need to press it twice so you don't lose your history by accident.

---

## Rounds menu

| Round | What it contains |
|---|---|
| **Full round** | Every character in the rows you selected in Settings. |
| **Look-alike drill** | Characters that are easy to confuse, drilled one set at a time so you compare them directly. Follows your Script setting. |
| **Weak spots** | Up to 20 of your trickiest characters, based on your history across sessions. |
| **Misses** (from Reveal all) | The characters you peeked at or marked Show again in the last round. |

**Look-alike sets**
- Hiragana: ぬ/め · わ/れ/ね · る/ろ · さ/ち/き · は/ほ/け · い/り/こ · あ/お · ま/も
- Katakana: シ/ツ · ソ/ン · ク/タ/ケ · ウ/ワ · フ/ラ/ヲ · ス/ヌ · コ/ユ/ロ · チ/テ · ノ/メ/ナ · ア/マ · ル/レ · ヤ/セ

### How weak spots are tracked
Each character (hiragana and katakana separately) has a score from 0 to 10. The score is updated when you move on from a card:
- **+2** if you peeked or pressed Show again
- **−1** if you moved on without help

Characters you keep getting right drop off the list over time. The Rounds panel shows your current weak spots, each with a red bar for how weak it is, and a **Clear history** button (press twice to confirm).

---

## Settings

| Setting | Options |
|---|---|
| **Script** | Hiragana · Katakana · Both. With Both, each sound appears once in each script. |
| **Order** | By row · Fully mixed |
| **Show row name** | On · Off (Write mode only) |
| **Rows** | Turn each row on or off, in three groups, each with All / None buttons: **Basic** (あ to ん, 46), **Dakuten & handakuten** (が ざ だ ば ぱ, 25), **Combinations / yōon** (きゃ to ぴゃ, 33). |

Press **Start new round** to apply your changes. Your settings are remembered for next time.

Romaji uses **Hepburn** spelling: shi, chi, tsu, fu, ji, zu, n, and **wo** for を/ヲ.

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| **Space** / **Enter** / **→** | Start / Next |
| **P** | Peek / Hide |
| **A** | Show again |
| **E** | Reveal all |
| **R** | Reset (press twice mid-round) · New round on the Reveal screen |
| **M** | Switch between Write and Read mode |
| **Esc** | Close a panel · Back to round from Reveal all |

On touch screens the shortcut hints are hidden, and everything works with the buttons.

---

## Where things are in the code

All the code is in the `<script>` at the bottom of `kana-drill.html`.

| What | Where |
|---|---|
| Character data (rows, romaji, hiragana) | `const GROUPS` |
| Look-alike sets | `const LOOKALIKES`. Add a string of characters, e.g. `'ほま'`. |
| Katakana | Generated from the hiragana by `toKata()`. Katakana sits exactly `0x60` above hiragana in Unicode. |
| Shuffling (by row / mixed) | `buildDeck()` |
| Show again re-insertion | `showAgain()` |
| Weak-spot scoring | `scoreCard()`. History is stored under the `kana-drill-stats-v1` key. |
| Saved settings | stored under the `hiragana-drill-settings-v1` key |

---

## Ideas for the future

Future features, extra languages and TODOs are tracked in [ROADMAP.md](ROADMAP.md).
