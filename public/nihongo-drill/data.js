/*
 * nihongo-drill word list.
 * Source: はじめての にほんごくらす 2 (Japanese Classes for Beginners 2), vocabulary list,
 * Sapporo International Communication Plaza Foundation (SICPF). Classes 1-8.
 * Typed in from a scan, so check it against the book. The Chinese column is not used.
 *
 * Each line:   japanese | english | topic | kind | verb group
 *   topic       tag kept for future grouping by theme (not used by Settings yet)
 *   kind        w = word (default), p = phrase or sentence, c = counter form
 *   verb group  1, 2 or 3 as marked in the book; kept for later, not shown yet
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

const NIHONGO_TEXT = `
@c1
く|ward|wards
ひがし|east|directions
にし|west|directions
みなみ|south|directions
きた|north|directions
ちゅうおう|central (Chuo ward)|wards
しろいし|Shiroishi ward|wards
とよひら|Toyohira ward|wards
ていね|Teine ward|wards
あつべつ|Atsubetsu ward|wards
きよた|Kiyota ward|wards
（お）ひさし·ぶりです|It's been a while|greetings|p
～じん|a person of ~|people|p
しごと|work|jobs
かいしゃいん|company employee|jobs
がくせい|student|jobs
しゅふ|housewife|jobs
にほんごで なんですか|what is it in Japanese?|language|p
か|mosquito|animals
ぎゅうにく|beef|food
ぶたにく|pork|food
とりにく|chicken|food
ぎゅうどん|beef bowl|food
とんかつ|pork cutlet|food
おやこどん|oyakodon|food
からあげ|fried chicken|food
うどん|udon|food
そば|soba|food
カレー|curry|food
～に します|I'll have ...|restaurant|p
さしみ|sashimi|food
てんぷら|tempura|food
やきとり|yakitori|food
えだまめ|edamame|food
なまビール|draft beer|drinks
ウーロンちゃ|oolong tea|drinks
いざかや|izakaya|restaurant
みせのひと|shop staff|restaurant
いらっしゃいませ|welcome|restaurant|p
そうですね|Well... / Let me think|conversation|p
それから|and then...|connectors
～ください|Please ...|restaurant|p
こちらで·おめしあがり·ですか|Will you be eating here?|restaurant|p
おもちかえり|takeout|restaurant
たんぴん|single item|restaurant
セット|set|restaurant
なまえ|name|personal
じゅうしょ|address|personal
ゆうびん·ばんごう|postal code|personal
せいねん·がっぴ|date of birth|personal
～さい|~ years old|personal|p
でんわ·ばんごう|telephone number|personal
けいたい|cell phone|personal
できましたか|Did you finish?|conversation|p

@n1
ひとつ|1 item|counters|c
ふたつ|2 items|counters|c
みっつ|3 items|counters|c
よっつ|4 items|counters|c
いつつ|5 items|counters|c
むっつ|6 items|counters|c
ななつ|7 items|counters|c
やっつ|8 items|counters|c
ここのつ|9 items|counters|c
とお|10 items|counters|c
いくつ|how many items?|counters|c
ひとり|1 person|counters|c
ふたり|2 people|counters|c
さんにん|3 people|counters|c
よにん|4 people|counters|c
ごにん|5 people|counters|c
ろくにん|6 people|counters|c
ななにん、·しちにん|7 people|counters|c
はちにん|8 people|counters|c
きゅうにん|9 people|counters|c
じゅうにん|10 people|counters|c
なんにん|how many people?|counters|c

@c2
かぞく|family|family
しつれいですが|Excuse me, ...|conversation|p
おいくつですか|How old are you?|personal|p
～に すんでいます|I live in ~|personal|p
しずかです|quiet|adjectives
にぎやかです|lively|adjectives
えき|station|places
バスてい|bus stop|places
ちかいです|close|adjectives
とおいです|far|adjectives
べんりです|convenient|adjectives
ふべんです|inconvenient|adjectives
こうえん|park|places
がっこう|school|places
やかん|kettle|kitchen
なべ|pot|kitchen
フライパン|frying pan|kitchen
おたま|ladle|kitchen
コーヒー·メーカー|coffee maker|kitchen
あります|there is / there are (things)|verbs
どこで かいましたか|Where did you buy it?|shopping|p
～で かいました|I bought it at ~|shopping|p
ペット|pet|animals
います|there is / there are (living things)|verbs
いぬ|dog|animals
ねこ|cat|animals
うさぎ|rabbit|animals
とり|bird|animals
げんかん|entrance|home
おふろ|bathroom|home
トイレ|toilet|home
リビング|living room|home
だいどころ|kitchen|home
にわ|garden|home
アパート|apartment|home
マンション|condominium|home
いっこだて|single-family house|home
りょう|dormitory|home
おじいさん / そふ|grandfather|family
おばあさん / そぼ|grandmother|family
おとうさん / ちち|father|family
おかあさん / はは|mother|family
おにいさん / あに|older brother|family
おねえさん / あね|older sister|family
おとうとさん / おとうと|younger brother|family
いもうとさん / いもうと|younger sister|family
こどもさん / こども|child|family
ごしゅじん / おっと|husband|family
おくさん / つま|wife|family
むすこさん / むすこ|son|family
むすめさん / むすめ|daughter|family

@c3
どこ|where|location
きがえます|I'll change my clothes|verbs
へや|room|home
こういしつ|changing room|places
（おちゃを）·いれます|I'll pour (tea)|verbs|p
ありました|I found it.|verbs|p
ここ|here|location
そこ|there|location
あそこ|over there|location
いました|I found him/her.|verbs|p
うえ|up|location
した|down|location
となり|next to|location
なか|inside|location
そと|outside|location
はこ|box|home
じてんしゃ|bicycle|travel
じゃがいも|potato|vegetables
たまねぎ|onion|vegetables
にんじん|carrot|vegetables
キャベツ|cabbage|vegetables
レタス|lettuce|vegetables
ブロッコリー|broccoli|vegetables
きゅうり|cucumber|vegetables
なす|eggplant|vegetables
ピーマン|bell pepper|vegetables

@c4
つくえ|desk|classroom
まど|window|classroom
あけます|open|verbs||2
しめます|close|verbs||2
ドア|door|classroom
かさ|umbrella|classroom
かします|lend|verbs||1
ペン|pen|classroom
おかね|money|shopping
かきます|write|verbs||1
いそぎます|hurry|verbs||1
まちます|wait|verbs||1
とります|take|verbs||1
よびます|call|verbs||1
だします|take out|verbs||1
かります|borrow|verbs||2
ききます|listen|verbs||1
およぎます|swim|verbs||1
つかいます|use|verbs||1
もちます|hold|verbs||1
はいります|enter|verbs||1
やすみます|rest|verbs||1
あそびます|play|verbs||1
はなします|talk|verbs||1
おしえます|teach|verbs||2
シャワーを あびます|take a shower|verbs||2
けっこん·します|get married|verbs||3
うんてん·します|drive|verbs||3
クレジット·カード|credit card|shopping

@n4
いっぽん|1 long thing|counters|c
にほん|2 long things|counters|c
さんぼん|3 long things|counters|c
よんほん|4 long things|counters|c
ごほん|5 long things|counters|c
ろっぽん|6 long things|counters|c
ななほん|7 long things|counters|c
はっぽん|8 long things|counters|c
きゅうほん|9 long things|counters|c
じゅっぽん/じっぽん|10 long things|counters|c
なんぼん|how many long things?|counters|c
いっさい|1 year old|counters|c
にさい|2 years old|counters|c
さんさい|3 years old|counters|c
よんさい|4 years old|counters|c
ごさい|5 years old|counters|c
ろくさい|6 years old|counters|c
ななさい|7 years old|counters|c
はっさい|8 years old|counters|c
きゅうさい|9 years old|counters|c
じゅっさい/じっさい|10 years old|counters|c
じゅう·いっさい|11 years old|counters|c
じゅうにさい|12 years old|counters|c
じゅう·はっさい|18 years old|counters|c
にじゅっさい/はたち|20 years old|counters|c
なんさい|how old?|counters|c

@c5
しゅみ|hobbies|hobbies
よく|often|frequency
ときどき|sometimes|frequency
いつも|always|frequency
かいしゃの·ひと|people from the company|people
たいいくかん|gymnasium|places
バドミントン|badminton|sports
バレーボール|volleyball|sports
バスケット·ボール|basketball|sports
サッカー|soccer|sports
たっきゅう|table tennis|sports
ジョギング|jogging|sports
どくしょ|reading|hobbies
えいが|movies|hobbies
ゲーム|games|hobbies
カラオケ|karaoke|hobbies
うち|home|home
やすみ|day off|time
ゆっくり·します|(to) relax|verbs||3
ごろごろ·します|(to) laze around|verbs||3
いそがしいです|busy|adjectives

@c6
から|from|travel
まで|to|travel
バス|bus|travel
ちかてつ|subway|travel
くるま|car|travel
じてんしゃ|bicycle|travel
ひこうき|airplane|travel
あるいて|on foot / walking|travel
どうやって|how|travel
かかります|it takes ~|verbs||1
ぐらい|about|travel
ちかい|near|adjectives
とおい|far|adjectives
ぎんこう|bank|places
ゆうびん·きょく|post office|places
びょういん|hospital|places
がっこう|school|places
かいしゃ|company|places
こうえん|park|places
のります|get on|verbs||1
おります|get off|verbs||2
のりかえます|transfer|verbs||2
とまります|stop|verbs||1
いま|now|time
つぎ|next|travel
～せん|~ line|travel|p
～ばんせん|platform number ~|travel|p
～いき|~ bound|travel|p

@n6
いっぷん|1 minute|counters|c
にふん|2 minutes|counters|c
さんぷん|3 minutes|counters|c
よんふん/よんぷん|4 minutes|counters|c
ごふん|5 minutes|counters|c
ろっぷん|6 minutes|counters|c
ななふん|7 minutes|counters|c
はちふん/はっぷん|8 minutes|counters|c
きゅうふん|9 minutes|counters|c
じゅっぷん|10 minutes|counters|c
じゅうごふん|15 minutes|counters|c
にじゅっぷん|20 minutes|counters|c
なんぷん|how many minutes?|counters|c
いちじかん|1 hour|counters|c
いちじかん·はん|1.5 hours|counters|c
にじかん|2 hours|counters|c
よじかん|4 hours|counters|c
くじかん|9 hours|counters|c
じゅうじかん|10 hours|counters|c
じゅうよ·じかん|14 hours|counters|c
なんじかん|how many hours?|counters|c

@c7
けしょうしつ|restroom|places
だんせいよう|men's|places
じょせいよう|women's|places
かわいい|cute|adjectives
たかい|expensive|adjectives
やすい|cheap|adjectives
おもしろい|interesting|adjectives
かっこいい|cool|adjectives
すてき|nice|adjectives
きれい|beautiful|adjectives
くつ|shoes|clothes
くつした|socks|clothes
かばん / バッグ|bag|clothes
シャツ|shirt|clothes
ズボン / パンツ|pants|clothes
Tシャツ|T-shirt|clothes
ワンピース|dress|clothes
ぼうし|hat|clothes
ジャケット|jacket|clothes
コート|coat|clothes
もらいます|receive|verbs||1
チョコレート·ケーキ|chocolate cake|food
チーズケーキ|cheesecake|food
おにぎり|rice ball|food
こんぶ|kelp|food
たらこ|cod roe|food
うめ|plum|food
おねがい·します|please|conversation|p|3
こちら|here|location
あたためますか|Would you like it warmed?|shopping|p
けっこうです|No thank you|conversation|p
スプーン|spoon|shopping
はし|chopsticks|shopping
おつけしますか|Would you like some?|shopping|p
だいじょうぶです|It's okay (meaning I don't need any)|conversation|p
Suica|Suica|shopping
タッチして·ください|Please touch|shopping|p
わりびき|discount|shopping
２わりびき|20% off|shopping
じゅっ·パーセント|10%|shopping
じゅっ·パーセントびき|10% discount|shopping
50えんびき|50 yen discount|shopping
はんがく|half price|shopping

@n7
じゅっかい|10th floor|counters|c
きゅうかい|9th floor|counters|c
はちかい/はっかい|8th floor|counters|c
ななかい|7th floor|counters|c
ろっかい|6th floor|counters|c
ごかい|5th floor|counters|c
よんかい|4th floor|counters|c
さんかい/さんがい|3rd floor|counters|c
にかい|2nd floor|counters|c
いっかい|1st floor|counters|c
ちかいっかい|basement 1 (B1)|counters|c
ちかにかい|basement 2 (B2)|counters|c
なんかい/なんがい|which floor?|counters|c
いっこ|1 small item|counters|c
にこ|2 small items|counters|c
さんこ|3 small items|counters|c
よんこ|4 small items|counters|c
ごこ|5 small items|counters|c
ろっこ|6 small items|counters|c
ななこ|7 small items|counters|c
はちこ/はっこ|8 small items|counters|c
きゅうこ|9 small items|counters|c
じゅっこ|10 small items|counters|c
なんこ|how many small items?|counters|c

@c8
それに|and|connectors
でも|but|connectors
おみやげ|souvenirs|shopping
しゃしん|photos|hobbies
とります|take (a photo)|verbs||1
いちにち·じゅう|all day long|time
たいへんです|hard / difficult / tough|adjectives
すごい|amazing|adjectives
はじめて|first time|time
それから|and then|connectors
`;
