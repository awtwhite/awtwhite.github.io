/*
 * nihongo-drill word list.
 * Source: はじめての にほんごくらす 2 (Japanese Classes for Beginners 2), vocabulary list,
 * Sapporo International Communication Plaza Foundation (SICPF). Classes 1-8.
 * Typed in from a scan, so check it against the book. The Chinese column is not used.
 *
 * Each line:   japanese | english | topic | kind | verb group | word type
 *   topic       tag; the themes below group the tags (Study page, Settings)
 *   kind        w = word, p = phrase or sentence, c = counter form
 *   verb group  1, 2 or 3 as marked in the book (verbs only)
 *   word type   noun, verb, adj-i, adj-na, adverb, connector, expression or counter (see NIHONGO_TYPES)
 *               Pre-filled from topic, kind and the word's ending, then hand-corrected: please check.
 * A card's id is "<group>:<japanese>", so editing the English or reordering lines is safe.
 * Do not repeat the same Japanese text twice inside one group.
 *
 * Line breaks on long phrases: a "·" inside the Japanese marks where a line may break; the page turns it
 * into an invisible break point and never breaks Japanese anywhere else. A space in the text (as the book
 * writes some phrases) is also a break point. The marker is not part of the id and is not shown. Endings of
 * one or two kana (か, ね, が) are kept attached to the part before them. A slash between alternatives
 * ("おとうとさん / おとうと") stays with the first part and breaks after it.
 *
 * "@id" starts a group. Corrections / decisions made while typing it in (please check):
 *   - c1 first line: the book's English reads "word"; the ward (区) is meant ("ward").
 *   - c7 ２わりびき: the book says "2% discount", but 2割引 is 20% off, so it says 20% off here.
 *   - c7 10% / 10%びき: the book prints them as "10%" with no kana; written out as the
 *     kana from its romaji (jyuppaasento).
 *   - Counters: the book only gives numerals, so the English says which counter ("1 person",
 *     "1 long thing", "1 year old"...).
 */
const NIHONGO_GROUPS = [
  {id:'c1', name:'Class 1', blurb:'Wards, jobs, food, ordering, personal details'},
  {id:'c2', name:'Class 2', blurb:'Describing places, kitchen, pets, home, family'},
  {id:'c3', name:'Class 3', blurb:'Where things are, vegetables'},
  {id:'c4', name:'Class 4', blurb:'Classroom items, everyday verbs'},
  {id:'c5', name:'Class 5', blurb:'Hobbies and sports'},
  {id:'c6', name:'Class 6', blurb:'Getting around, transport'},
  {id:'c7', name:'Class 7', blurb:'Shopping, clothes, discounts'},
  {id:'c8', name:'Class 8', blurb:'Connectors, souvenirs, photos'},
  {id:'n1', name:'Class 1 counters', blurb:'items, people', counters:true},
  {id:'n4', name:'Class 4 counters', blurb:'long things, age', counters:true},
  {id:'n6', name:'Class 6 counters', blurb:'minutes, hours', counters:true},
  {id:'n7', name:'Class 7 counters', blurb:'floors, small items', counters:true},
];

// Study page and Settings group words by theme. Every topic tag belongs to exactly one theme (checked on load).
const NIHONGO_THEMES = [
  {id:'food',     name:'Food & drink',       topics:['food','drinks','restaurant','vegetables','kitchen']},
  {id:'people',   name:'People & family',    topics:['family','people','jobs','personal']},
  {id:'home',     name:'Home & places',      topics:['home','places','wards','animals']},
  {id:'travel',   name:'Getting around',     topics:['travel','directions','location']},
  {id:'shopping', name:'Shopping & clothes', topics:['shopping','clothes']},
  {id:'free',     name:'Free time',          topics:['hobbies','sports']},
  {id:'school',   name:'School & language',  topics:['classroom','language']},
  {id:'time',     name:'Time & how often',   topics:['time','frequency']},
  {id:'counters', name:'Counters',           topics:['counters']},
  {id:'describe', name:'Describing words',   topics:['adjectives']},
  {id:'actions',  name:'Actions',            topics:['verbs']},
  {id:'talk',     name:'Talking',            topics:['conversation','greetings','connectors']},
];
// Names for the topic tags (the sub-sections inside a theme)
const NIHONGO_TOPIC_NAMES = {
  food:'Food', drinks:'Drinks', restaurant:'Restaurant', vegetables:'Vegetables', kitchen:'Kitchen',
  family:'Family', people:'People', jobs:'Jobs', personal:'Personal details',
  home:'Home', places:'Places', wards:'Sapporo wards', animals:'Animals',
  travel:'Travel', directions:'Directions', location:'Where things are',
  shopping:'Shopping', clothes:'Clothes', hobbies:'Hobbies', sports:'Sports',
  classroom:'Classroom', language:'Language',
  time:'Time', frequency:'How often', counters:'Counters',
  adjectives:'Adjectives', verbs:'Verbs', conversation:'Conversation', greetings:'Greetings', connectors:'Connectors',
};
// Word types (one per word). Verbs also carry their verb group in the data.
const NIHONGO_TYPES = [
  {id:'noun',       name:'Nouns & pronouns',      blurb:'things, places, people, here/there'},
  {id:'verb',       name:'Verbs',                 blurb:'with verb group 1, 2 or 3'},
  {id:'adj-i',      name:'い-adjectives',          blurb:'たかい, やすい...'},
  {id:'adj-na',     name:'な-adjectives',          blurb:'しずかです, きれい...'},
  {id:'adverb',     name:'Adverbs & time words',  blurb:'よく, いま, はじめて...'},
  {id:'connector',  name:'Particles & connectors', blurb:'から, まで, でも...'},
  {id:'expression', name:'Phrases & sentences',   blurb:'whole expressions and ~ patterns'},
  {id:'counter',    name:'Counters',              blurb:'items, people, age, time, floors'},
];

const NIHONGO_TEXT = `
@c1
く|ward|wards|w||noun
ひがし|east|directions|w||noun
にし|west|directions|w||noun
みなみ|south|directions|w||noun
きた|north|directions|w||noun
ちゅうおう|central (Chuo ward)|wards|w||noun
しろいし|Shiroishi ward|wards|w||noun
とよひら|Toyohira ward|wards|w||noun
ていね|Teine ward|wards|w||noun
あつべつ|Atsubetsu ward|wards|w||noun
きよた|Kiyota ward|wards|w||noun
（お）ひさし·ぶりです|It's been a while|greetings|p||expression
～じん|a person of ~|people|p||expression
しごと|work|jobs|w||noun
かいしゃいん|company employee|jobs|w||noun
がくせい|student|jobs|w||noun
しゅふ|housewife|jobs|w||noun
にほんごで なんですか|what is it in Japanese?|language|p||expression
か|mosquito|animals|w||noun
ぎゅうにく|beef|food|w||noun
ぶたにく|pork|food|w||noun
とりにく|chicken|food|w||noun
ぎゅうどん|beef bowl|food|w||noun
とんかつ|pork cutlet|food|w||noun
おやこどん|oyakodon|food|w||noun
からあげ|fried chicken|food|w||noun
うどん|udon|food|w||noun
そば|soba|food|w||noun
カレー|curry|food|w||noun
～に します|I'll have ...|restaurant|p||expression
さしみ|sashimi|food|w||noun
てんぷら|tempura|food|w||noun
やきとり|yakitori|food|w||noun
えだまめ|edamame|food|w||noun
なまビール|draft beer|drinks|w||noun
ウーロンちゃ|oolong tea|drinks|w||noun
いざかや|izakaya|restaurant|w||noun
みせのひと|shop staff|restaurant|w||noun
いらっしゃいませ|welcome|restaurant|p||expression
そうですね|Well... / Let me think|conversation|p||expression
それから|and then...|connectors|w||connector
～ください|Please ...|restaurant|p||expression
こちらで·おめしあがり·ですか|Will you be eating here?|restaurant|p||expression
おもちかえり|takeout|restaurant|w||noun
たんぴん|single item|restaurant|w||noun
セット|set|restaurant|w||noun
なまえ|name|personal|w||noun
じゅうしょ|address|personal|w||noun
ゆうびん·ばんごう|postal code|personal|w||noun
せいねん·がっぴ|date of birth|personal|w||noun
～さい|~ years old|personal|p||expression
でんわ·ばんごう|telephone number|personal|w||noun
けいたい|cell phone|personal|w||noun
できましたか|Did you finish?|conversation|p||expression

@n1
ひとつ|1 item|counters|c||counter
ふたつ|2 items|counters|c||counter
みっつ|3 items|counters|c||counter
よっつ|4 items|counters|c||counter
いつつ|5 items|counters|c||counter
むっつ|6 items|counters|c||counter
ななつ|7 items|counters|c||counter
やっつ|8 items|counters|c||counter
ここのつ|9 items|counters|c||counter
とお|10 items|counters|c||counter
いくつ|how many items?|counters|c||counter
ひとり|1 person|counters|c||counter
ふたり|2 people|counters|c||counter
さんにん|3 people|counters|c||counter
よにん|4 people|counters|c||counter
ごにん|5 people|counters|c||counter
ろくにん|6 people|counters|c||counter
ななにん、·しちにん|7 people|counters|c||counter
はちにん|8 people|counters|c||counter
きゅうにん|9 people|counters|c||counter
じゅうにん|10 people|counters|c||counter
なんにん|how many people?|counters|c||counter

@c2
かぞく|family|family|w||noun
しつれいですが|Excuse me, ...|conversation|p||expression
おいくつですか|How old are you?|personal|p||expression
～に すんでいます|I live in ~|personal|p||expression
しずかです|quiet|adjectives|w||adj-na
にぎやかです|lively|adjectives|w||adj-na
えき|station|places|w||noun
バスてい|bus stop|places|w||noun
ちかいです|close|adjectives|w||adj-i
とおいです|far|adjectives|w||adj-i
べんりです|convenient|adjectives|w||adj-na
ふべんです|inconvenient|adjectives|w||adj-na
こうえん|park|places|w||noun
がっこう|school|places|w||noun
やかん|kettle|kitchen|w||noun
なべ|pot|kitchen|w||noun
フライパン|frying pan|kitchen|w||noun
おたま|ladle|kitchen|w||noun
コーヒー·メーカー|coffee maker|kitchen|w||noun
あります|there is / there are (things)|verbs|w||verb
どこで かいましたか|Where did you buy it?|shopping|p||expression
～で かいました|I bought it at ~|shopping|p||expression
ペット|pet|animals|w||noun
います|there is / there are (living things)|verbs|w||verb
いぬ|dog|animals|w||noun
ねこ|cat|animals|w||noun
うさぎ|rabbit|animals|w||noun
とり|bird|animals|w||noun
げんかん|entrance|home|w||noun
おふろ|bathroom|home|w||noun
トイレ|toilet|home|w||noun
リビング|living room|home|w||noun
だいどころ|kitchen|home|w||noun
にわ|garden|home|w||noun
アパート|apartment|home|w||noun
マンション|condominium|home|w||noun
いっこだて|single-family house|home|w||noun
りょう|dormitory|home|w||noun
おじいさん / そふ|grandfather|family|w||noun
おばあさん / そぼ|grandmother|family|w||noun
おとうさん / ちち|father|family|w||noun
おかあさん / はは|mother|family|w||noun
おにいさん / あに|older brother|family|w||noun
おねえさん / あね|older sister|family|w||noun
おとうとさん / おとうと|younger brother|family|w||noun
いもうとさん / いもうと|younger sister|family|w||noun
こどもさん / こども|child|family|w||noun
ごしゅじん / おっと|husband|family|w||noun
おくさん / つま|wife|family|w||noun
むすこさん / むすこ|son|family|w||noun
むすめさん / むすめ|daughter|family|w||noun

@c3
どこ|where|location|w||noun
きがえます|I'll change my clothes|verbs|w||verb
へや|room|home|w||noun
こういしつ|changing room|places|w||noun
（おちゃを）·いれます|I'll pour (tea)|verbs|p||expression
ありました|I found it.|verbs|p||expression
ここ|here|location|w||noun
そこ|there|location|w||noun
あそこ|over there|location|w||noun
いました|I found him/her.|verbs|p||expression
うえ|up|location|w||noun
した|down|location|w||noun
となり|next to|location|w||noun
なか|inside|location|w||noun
そと|outside|location|w||noun
はこ|box|home|w||noun
じてんしゃ|bicycle|travel|w||noun
じゃがいも|potato|vegetables|w||noun
たまねぎ|onion|vegetables|w||noun
にんじん|carrot|vegetables|w||noun
キャベツ|cabbage|vegetables|w||noun
レタス|lettuce|vegetables|w||noun
ブロッコリー|broccoli|vegetables|w||noun
きゅうり|cucumber|vegetables|w||noun
なす|eggplant|vegetables|w||noun
ピーマン|bell pepper|vegetables|w||noun

@c4
つくえ|desk|classroom|w||noun
まど|window|classroom|w||noun
あけます|open|verbs|w|2|verb
しめます|close|verbs|w|2|verb
ドア|door|classroom|w||noun
かさ|umbrella|classroom|w||noun
かします|lend|verbs|w|1|verb
ペン|pen|classroom|w||noun
おかね|money|shopping|w||noun
かきます|write|verbs|w|1|verb
いそぎます|hurry|verbs|w|1|verb
まちます|wait|verbs|w|1|verb
とります|take|verbs|w|1|verb
よびます|call|verbs|w|1|verb
だします|take out|verbs|w|1|verb
かります|borrow|verbs|w|2|verb
ききます|listen|verbs|w|1|verb
およぎます|swim|verbs|w|1|verb
つかいます|use|verbs|w|1|verb
もちます|hold|verbs|w|1|verb
はいります|enter|verbs|w|1|verb
やすみます|rest|verbs|w|1|verb
あそびます|play|verbs|w|1|verb
はなします|talk|verbs|w|1|verb
おしえます|teach|verbs|w|2|verb
シャワーを あびます|take a shower|verbs|w|2|verb
けっこん·します|get married|verbs|w|3|verb
うんてん·します|drive|verbs|w|3|verb
クレジット·カード|credit card|shopping|w||noun

@n4
いっぽん|1 long thing|counters|c||counter
にほん|2 long things|counters|c||counter
さんぼん|3 long things|counters|c||counter
よんほん|4 long things|counters|c||counter
ごほん|5 long things|counters|c||counter
ろっぽん|6 long things|counters|c||counter
ななほん|7 long things|counters|c||counter
はっぽん|8 long things|counters|c||counter
きゅうほん|9 long things|counters|c||counter
じゅっぽん/じっぽん|10 long things|counters|c||counter
なんぼん|how many long things?|counters|c||counter
いっさい|1 year old|counters|c||counter
にさい|2 years old|counters|c||counter
さんさい|3 years old|counters|c||counter
よんさい|4 years old|counters|c||counter
ごさい|5 years old|counters|c||counter
ろくさい|6 years old|counters|c||counter
ななさい|7 years old|counters|c||counter
はっさい|8 years old|counters|c||counter
きゅうさい|9 years old|counters|c||counter
じゅっさい/じっさい|10 years old|counters|c||counter
じゅう·いっさい|11 years old|counters|c||counter
じゅうにさい|12 years old|counters|c||counter
じゅう·はっさい|18 years old|counters|c||counter
にじゅっさい/はたち|20 years old|counters|c||counter
なんさい|how old?|counters|c||counter

@c5
しゅみ|hobbies|hobbies|w||noun
よく|often|frequency|w||adverb
ときどき|sometimes|frequency|w||adverb
いつも|always|frequency|w||adverb
かいしゃの·ひと|people from the company|people|w||noun
たいいくかん|gymnasium|places|w||noun
バドミントン|badminton|sports|w||noun
バレーボール|volleyball|sports|w||noun
バスケット·ボール|basketball|sports|w||noun
サッカー|soccer|sports|w||noun
たっきゅう|table tennis|sports|w||noun
ジョギング|jogging|sports|w||noun
どくしょ|reading|hobbies|w||noun
えいが|movies|hobbies|w||noun
ゲーム|games|hobbies|w||noun
カラオケ|karaoke|hobbies|w||noun
うち|home|home|w||noun
やすみ|day off|time|w||noun
ゆっくり·します|(to) relax|verbs|w|3|verb
ごろごろ·します|(to) laze around|verbs|w|3|verb
いそがしいです|busy|adjectives|w||adj-i

@c6
から|from|travel|w||connector
まで|to|travel|w||connector
バス|bus|travel|w||noun
ちかてつ|subway|travel|w||noun
くるま|car|travel|w||noun
じてんしゃ|bicycle|travel|w||noun
ひこうき|airplane|travel|w||noun
あるいて|on foot / walking|travel|w||adverb
どうやって|how|travel|w||adverb
かかります|it takes ~|verbs|w|1|verb
ぐらい|about|travel|w||connector
ちかい|near|adjectives|w||adj-i
とおい|far|adjectives|w||adj-i
ぎんこう|bank|places|w||noun
ゆうびん·きょく|post office|places|w||noun
びょういん|hospital|places|w||noun
がっこう|school|places|w||noun
かいしゃ|company|places|w||noun
こうえん|park|places|w||noun
のります|get on|verbs|w|1|verb
おります|get off|verbs|w|2|verb
のりかえます|transfer|verbs|w|2|verb
とまります|stop|verbs|w|1|verb
いま|now|time|w||adverb
つぎ|next|travel|w||noun
～せん|~ line|travel|p||expression
～ばんせん|platform number ~|travel|p||expression
～いき|~ bound|travel|p||expression

@n6
いっぷん|1 minute|counters|c||counter
にふん|2 minutes|counters|c||counter
さんぷん|3 minutes|counters|c||counter
よんふん/よんぷん|4 minutes|counters|c||counter
ごふん|5 minutes|counters|c||counter
ろっぷん|6 minutes|counters|c||counter
ななふん|7 minutes|counters|c||counter
はちふん/はっぷん|8 minutes|counters|c||counter
きゅうふん|9 minutes|counters|c||counter
じゅっぷん|10 minutes|counters|c||counter
じゅうごふん|15 minutes|counters|c||counter
にじゅっぷん|20 minutes|counters|c||counter
なんぷん|how many minutes?|counters|c||counter
いちじかん|1 hour|counters|c||counter
いちじかん·はん|1.5 hours|counters|c||counter
にじかん|2 hours|counters|c||counter
よじかん|4 hours|counters|c||counter
くじかん|9 hours|counters|c||counter
じゅうじかん|10 hours|counters|c||counter
じゅうよ·じかん|14 hours|counters|c||counter
なんじかん|how many hours?|counters|c||counter

@c7
けしょうしつ|restroom|places|w||noun
だんせいよう|men's|places|w||noun
じょせいよう|women's|places|w||noun
かわいい|cute|adjectives|w||adj-i
たかい|expensive|adjectives|w||adj-i
やすい|cheap|adjectives|w||adj-i
おもしろい|interesting|adjectives|w||adj-i
かっこいい|cool|adjectives|w||adj-i
すてき|nice|adjectives|w||adj-na
きれい|beautiful|adjectives|w||adj-na
くつ|shoes|clothes|w||noun
くつした|socks|clothes|w||noun
かばん / バッグ|bag|clothes|w||noun
シャツ|shirt|clothes|w||noun
ズボン / パンツ|pants|clothes|w||noun
Tシャツ|T-shirt|clothes|w||noun
ワンピース|dress|clothes|w||noun
ぼうし|hat|clothes|w||noun
ジャケット|jacket|clothes|w||noun
コート|coat|clothes|w||noun
もらいます|receive|verbs|w|1|verb
チョコレート·ケーキ|chocolate cake|food|w||noun
チーズケーキ|cheesecake|food|w||noun
おにぎり|rice ball|food|w||noun
こんぶ|kelp|food|w||noun
たらこ|cod roe|food|w||noun
うめ|plum|food|w||noun
おねがい·します|please|conversation|p|3|expression
こちら|here|location|w||noun
あたためますか|Would you like it warmed?|shopping|p||expression
けっこうです|No thank you|conversation|p||expression
スプーン|spoon|shopping|w||noun
はし|chopsticks|shopping|w||noun
おつけしますか|Would you like some?|shopping|p||expression
だいじょうぶです|It's okay (meaning I don't need any)|conversation|p||expression
Suica|Suica|shopping|w||noun
タッチして·ください|Please touch|shopping|p||expression
わりびき|discount|shopping|w||noun
２わりびき|20% off|shopping|w||noun
じゅっ·パーセント|10%|shopping|w||noun
じゅっ·パーセントびき|10% discount|shopping|w||noun
50えんびき|50 yen discount|shopping|w||noun
はんがく|half price|shopping|w||noun

@n7
じゅっかい|10th floor|counters|c||counter
きゅうかい|9th floor|counters|c||counter
はちかい/はっかい|8th floor|counters|c||counter
ななかい|7th floor|counters|c||counter
ろっかい|6th floor|counters|c||counter
ごかい|5th floor|counters|c||counter
よんかい|4th floor|counters|c||counter
さんかい/さんがい|3rd floor|counters|c||counter
にかい|2nd floor|counters|c||counter
いっかい|1st floor|counters|c||counter
ちかいっかい|basement 1 (B1)|counters|c||counter
ちかにかい|basement 2 (B2)|counters|c||counter
なんかい/なんがい|which floor?|counters|c||counter
いっこ|1 small item|counters|c||counter
にこ|2 small items|counters|c||counter
さんこ|3 small items|counters|c||counter
よんこ|4 small items|counters|c||counter
ごこ|5 small items|counters|c||counter
ろっこ|6 small items|counters|c||counter
ななこ|7 small items|counters|c||counter
はちこ/はっこ|8 small items|counters|c||counter
きゅうこ|9 small items|counters|c||counter
じゅっこ|10 small items|counters|c||counter
なんこ|how many small items?|counters|c||counter

@c8
それに|and|connectors|w||connector
でも|but|connectors|w||connector
おみやげ|souvenirs|shopping|w||noun
しゃしん|photos|hobbies|w||noun
とります|take (a photo)|verbs|w|1|verb
いちにち·じゅう|all day long|time|w||adverb
たいへんです|hard / difficult / tough|adjectives|w||adj-na
すごい|amazing|adjectives|w||adj-i
はじめて|first time|time|w||adverb
それから|and then|connectors|w||connector
`;
