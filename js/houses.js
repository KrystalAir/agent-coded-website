// Targets use the dimension names in questions.js. The editorial profiles are
// based on the project brief, with one deliberately distinct reading per house.
const houses = [
  {
    id: 'chanel', name: 'Chanel', word: 'Timeless', label: '雋永經典', accent: '#b6a288',
    targets: { continuity: 2, visibility: 0, craft: 1, form: 1, expression: 0, construction: -2, temperature: 0, play: -1, ritual: 1, meaning: -2 },
    description: '把黑白、珠飾與粗花呢放回同一套造型，靠比例和質地讓熟悉的組合一直成立。這份風格從容，知道哪些元素值得年年重穿。',
    styleTip: '試試深色直身洋裝或長褲，加一件短版粗花呢外套，再用一點珠光收尾。',
  },
  {
    id: 'louis-vuitton', name: 'Louis Vuitton', word: 'Iconic', label: '鮮明印記', accent: '#b47d4a',
    targets: { continuity: 1, visibility: 2, craft: 0, form: 0, expression: 1, construction: -1, temperature: 1, play: 0, ritual: 0, meaning: -2 },
    description: '像一只帶著旅行故事的硬箱，輪廓和圖案一眼就能被記住。經典符號可以搭街頭單品，也可以成為全身唯一的視覺焦點。',
    styleTip: '用帶重複圖紋或復古旅行感的包作為重點，搭牛仔褲和顏色乾淨的上衣。',
  },
  {
    id: 'hermes', name: 'Hermès', word: 'Craftsmanship', label: '長久工藝', accent: '#c27b43',
    targets: { continuity: 2, visibility: -1, craft: 2, form: 0, expression: -1, construction: -2, temperature: 1, play: -1, ritual: -1, meaning: -1 },
    description: '皮革的收邊、精準的線跡、用久之後的手感，都是一件實用品值得留下來的理由。偏好的是工藝藏在經典結構裡，越用越熟悉。',
    styleTip: '挑一條收邊扎實的焦糖色皮帶或一雙素面皮鞋，搭一套能穿很多年的襯衫和長褲。',
  },
  {
    id: 'gucci', name: 'Gucci', word: 'Eclectic', label: '繁複混搭', accent: '#b66f59',
    targets: { continuity: -1, visibility: 2, craft: 0, form: 0, expression: 2, construction: 0, temperature: 1, play: 2, ritual: 1, meaning: -1 },
    description: '復古、花紋和小小的誇張可以在同一套衣服裡同時出現。你會從不同年代挑各自精彩的片段，讓它們在一起產生新的趣味。',
    styleTip: '挑一件花紋襯衫和一雙帶金屬飾件的樂福鞋，再用一條重複同色的配件串起來。',
  },
  {
    id: 'dior', name: 'Dior', word: 'Romantic', label: '浪漫儀式', accent: '#c29698',
    targets: { continuity: 2, visibility: 0, craft: 1, form: 2, expression: 1, construction: -1, temperature: 1, play: -1, ritual: 2, meaning: -2 },
    description: '收束的腰線、會隨動作展開的下襬，加上一點柔和質地。這種浪漫帶有正式感，特別適合想為某個場合完整打扮的一天。',
    styleTip: '用收腰外套搭有份量的下襬，加一雙細緻鞋款，讓腰線成為整套造型的重點。',
  },
  {
    id: 'prada', name: 'Prada', word: 'Intellectual', label: '理性異趣', accent: '#9a9d89',
    targets: { continuity: -1, visibility: -1, craft: 0, form: 0, expression: -1, construction: 1, temperature: -1, play: 0, ritual: -1, meaning: 2 },
    description: '第一眼乾淨冷靜，再看才發現一處有點不合常理的配色、比例或材料。整套依然可以穿進日常，細節卻足夠讓人回想。',
    styleTip: '用一件深色尼龍單品搭端正的襯衫，再加入一抹略顯生澀的灰綠或芥黃色。',
  },
  {
    id: 'saint-laurent', name: 'Saint Laurent', word: 'Sleek', label: '俐落夜色', accent: '#938695',
    targets: { continuity: 1, visibility: 0, craft: 0, form: 1, expression: -1, construction: -1, temperature: -2, play: -2, ritual: 1, meaning: 0 },
    description: '深色、直線、精準的肩部比例，帶一點夜晚的搖滾氣息。造型的力量集中在剪裁和姿態，配件留給一兩個清楚的重點。',
    styleTip: '黑色窄版西裝外套搭直筒長褲和尖頭鞋，只放一件銀色配件。',
  },
  {
    id: 'burberry', name: 'Burberry', word: 'Heritage', label: '實用傳承', accent: '#b09770',
    targets: { continuity: 2, visibility: 1, craft: 0, form: -1, expression: 0, construction: -2, temperature: -1, play: -1, ritual: -2, meaning: -2 },
    description: '想像一件有清楚來歷、天氣轉壞時也穿得住的外套。從熟悉的格紋到能走一整天的鞋，實用性本身就能形成風格。',
    styleTip: '用中長版風衣搭耐走的鞋，讓格紋圍巾或內搭露出一小段。',
  },
  {
    id: 'balenciaga', name: 'Balenciaga', word: 'Disruptive', label: '叛逆破格', accent: '#8d9697',
    targets: { continuity: -2, visibility: 1, craft: -1, form: -2, expression: 1, construction: 2, temperature: -1, play: 1, ritual: 0, meaning: 1 },
    description: '街上熟悉的鞋、外套和帽衫，只要換掉原本的尺寸與比例，就能故意打亂大家對日常服裝的預期。',
    styleTip: '讓大一號的外套和厚底鞋主導比例，其他單品扮演安靜的背景。',
  },
  {
    id: 'bottega-veneta', name: 'Bottega Veneta', word: 'Subtle', label: '含蓄質感', accent: '#8f9780',
    targets: { continuity: 0, visibility: -2, craft: 2, form: 0, expression: -1, construction: 0, temperature: 1, play: 0, ritual: 0, meaning: 0 },
    description: '編織表面、有彈性的皮革、摸得到的厚度，提供一種安靜而近身的辨識方式。整套造型很收斂，最花心思的部分留在材質。',
    styleTip: '用編織或壓紋的配件搭兩件素面衣服，讓觸感和表面紋理成為看點。',
  },
  {
    id: 'the-row', name: 'The Row', word: 'Hushed', label: '靜謐留白', accent: '#b0aaa1',
    targets: { continuity: 1, visibility: -2, craft: 1, form: -1, expression: -2, construction: -1, temperature: 0, play: -2, ritual: -1, meaning: 0 },
    description: '讓衣服和身體之間留一點空間，靠布料的垂墜和精確的長度讓基本款成立。第一眼平靜，細看比例幾乎沒有多餘的地方。',
    styleTip: '挑一件垂墜的深色長褲與一件同色系寬版上衣，配件收得越簡單越好。',
  },
  {
    id: 'schiaparelli', name: 'Schiaparelli', word: 'Surreal', label: '超現實戲劇', accent: '#bf8c59',
    targets: { continuity: -1, visibility: 1, craft: 1, form: 1, expression: 2, construction: 1, temperature: 0, play: 1, ritual: 2, meaning: 2 },
    description: '把一個身體部位、物件或錯視圖案當成珠寶與雕塑來穿。造型像一幕可以走進去的藝術場景，完整地回應值得打扮的時刻。',
    styleTip: '用一件有錯視效果或雕塑感的金色飾品搭深色衣服，讓想像力集中在一處。',
  },
  {
    id: 'miu-miu', name: 'Miu Miu', word: 'Playful', label: '俏皮反差', accent: '#c29a96',
    targets: { continuity: -1, visibility: 0, craft: 0, form: 1, expression: 0, construction: 0, temperature: 1, play: 2, ritual: 0, meaning: -1 },
    description: '學院感、芭蕾細節和一點沒整理好的層次，把熟悉的乖巧元素穿出俏皮反差。變化往往藏在襪子、袖口或衣襬裡。',
    styleTip: '把針織外套、長襪和芭蕾款平底鞋放在一起，讓袖口或內搭自然露出一截。',
  },
  {
    id: 'jacquemus', name: 'Jacquemus', word: 'Sunlit', label: '日光敘事', accent: '#d0a561',
    targets: { continuity: 0, visibility: 0, craft: -1, form: 0, expression: -1, construction: 0, temperature: 2, play: 2, ritual: -1, meaning: -1 },
    description: '暖光、自然布料和有點誇張的配件，像從度假相簿抽出一格。造型整體輕巧，一個尺寸上的玩笑就足夠。',
    styleTip: '用米白亞麻作底，挑一只迷你包或一頂寬得剛剛好的草帽。',
  },
  {
    id: 'loewe', name: 'Loewe', word: 'Artisanal', label: '工藝玩心', accent: '#a79365',
    targets: { continuity: -1, visibility: -1, craft: 2, form: 0, expression: 1, construction: 1, temperature: 1, play: 2, ritual: 0, meaning: 1 },
    description: '皮革或布料可以做成令人意外的形狀，湊近看又經得起對技法的好奇。造型兼顧物件的幽默和漂亮收邊。',
    styleTip: '在沉穩衣著上加一件造型奇特但質地細緻的配件，例如異形小包或手工胸針。',
  },
  {
    id: 'rick-owens', name: 'Rick Owens', word: 'Brutalist', label: '冷冽建築感', accent: '#8d8280',
    targets: { continuity: -1, visibility: -1, craft: 0, form: -2, expression: -1, construction: 1, temperature: -2, play: -2, ritual: 0, meaning: 1 },
    description: '灰黑色讓視線集中在垂墜、長度與步伐。衣服像建築般佔據空間，厚底和長線條一起維持冷冽的調性。',
    styleTip: '用深灰和黑色疊出長短差，再用一雙厚底靴壓住整套輪廓。',
  },
  {
    id: 'maison-margiela', name: 'Maison Margiela', word: 'Deconstructed', label: '解構匿名', accent: '#9c9b91',
    targets: { continuity: -2, visibility: -2, craft: 0, form: -1, expression: -1, construction: 2, temperature: -1, play: 0, ritual: -1, meaning: 2 },
    description: '外露的接縫、留下痕跡的標籤或重新拼接的零件，讓原本藏起來的結構成為主角。這種風格在低辨識度中保留鮮明觀點。',
    styleTip: '選一件有外露接縫或拼接的舊衣，搭沒有明顯圖案的基本款，讓結構自己被看見。',
  },
  {
    id: 'alaia', name: 'Alaïa', word: 'Sculptural', label: '雕塑曲線', accent: '#b58d80',
    targets: { continuity: 1, visibility: -1, craft: 2, form: 2, expression: -1, construction: 0, temperature: 0, play: -2, ritual: 1, meaning: 0 },
    description: '針織的彈性、收與放的位置、身體移動的樣子，共同決定造型。材質和剪裁很有存在感，外部裝飾可以很少。',
    styleTip: '試試沿身體曲線收放的素色針織上衣或洋裝，搭一件線條乾淨的外套。',
  },
  {
    id: 'comme-des-garcons', name: 'Comme des Garçons', word: 'Avant-garde', label: '前衛異形', accent: '#a38d91',
    targets: { continuity: -2, visibility: -1, craft: -1, form: -2, expression: 2, construction: 2, temperature: -1, play: 0, ritual: 1, meaning: 2 },
    description: '用偏在一側的體積、不對稱或陌生形狀，重新分配衣服和身體之間的空間。整體輪廓本身就足以提出一個問題。',
    styleTip: '先從不對稱下襬或單邊有體積的外套出發，用簡單下身把輪廓留完整。',
  },
  {
    id: 'acne-studios', name: 'Acne Studios', word: 'Understated', label: '低調巧思', accent: '#ab95a0',
    targets: { continuity: 0, visibility: -1, craft: 0, form: -1, expression: -1, construction: 0, temperature: 0, play: 1, ritual: -2, meaning: 0 },
    description: '從一套能天天穿的基本款開始，再把圍巾放大、把牛仔色調洗淡，或讓一抹顏色介於熟悉和奇怪之間。',
    styleTip: '搭寬鬆牛仔褲、素色上衣與一條稍微過大的圍巾，讓顏色或比例多一點意外。',
  },
];
