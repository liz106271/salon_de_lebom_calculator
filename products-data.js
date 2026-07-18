const CONFIG = {
  currency: '₩',
  locale: 'zh-TW',
  decimals: 0,
};

const SERIES_LIST = [
  { series: '親屬肝係證明書', subseries: '가족간계증명서',
    characters: [
      { name: '九緣書(攻)', subname: '구연서' },
      { name: '柳珉赫(受)', subname: '유민혁' },
    ] },
  { series: '浪漫啟示錄', subseries: '낭만 묵시록',
    characters: [
      { name: '廉泰華(攻)', subname: '염태화' },
      { name: '蔡定鉉(受)', subname: '채정현' },
    ] },
  { series: '今晚溫柔點', subseries: '밤은 부드러워라',
    characters: [
      { name: '高希宰(攻)', subname: '고희재' },
      { name: '鮮于真(受)', subname: '선우진' },
    ] },
  { series: '無根之樹', subseries: '뿌리 없는 나무',
    characters: [
      { name: '權熙書(攻)', subname: '권희서' },
      { name: '車泰京(受)', subname: '차태경' },
    ] },
  { series: '神結', subseries: '신결',
    characters: [
      { name: '鄭泰伍(攻)', subname: '정태오' },
      { name: '趙之遠(受)', subname: '조지원' },
    ] },
  { series: '星期一的救贖', subseries: '월요일의 구원자',
    characters: [
      { name: '具允元(攻)', subname: '구윤원' },
      { name: '元燿日(受)', subname: '원요일' },
    ] },
  { series: '和平之上', subseries: '주의 평화',
    characters: [
      { name: '安和平(攻)', subname: '안평화' },
      { name: '朱仁徹(受)', subname: '주인철' },
    ] },
  { series: 'Full Book', subseries: '풀북',
    characters: [
      { name: '閔皓淵(攻)', subname: '민호연' },
      { name: '崔在昇(受)', subname: '최재승' },
    ] },
];

// 每個分類固定一個前綴字母；mode 決定如何依 SERIES_LIST 展開。
// 'perCharacter' 每系列 2 個角色各一項；'perSeries' 每系列 1 項。
const CATEGORY_LIST = [
  { prefix: 'A', category: '壓克力立牌',        subcategory: '아크릴 스탠드',            price: 15000, limited: 3, mode: 'perCharacter' },
  { prefix: 'B', category: '甜點壓克力立牌',     subcategory: '스위츠 아크릴 스탠드',     price: 15000, limited: 3, mode: 'perCharacter' },
  { prefix: 'C', category: '女僕執事壓克力套組', subcategory: '메이드와 집사 아크릴 블록', price: 30000, limited: 3, mode: 'perSeries' },
  { prefix: 'D', category: 'SD飯友套組',        subcategory: 'SD 커플 아크릴 블록',       price: 15000, limited: 3, mode: 'perSeries' },
  { prefix: 'E', category: '名牌吊飾組',        subcategory: '네임 플레이트 패키지',      price: 13500, limited: 3, mode: 'perCharacter' },
  { prefix: 'G', category: 'Lebom限定相卡',     subcategory: '레봄 필름 인화 사진',       price: 2000,  limited: 5, mode: 'perSeries' },
  { prefix: 'H', category: 'Lebom限定貼紙',     subcategory: '레봄 조각 스티커',         price: 2000,  limited: 5, mode: 'perSeries' },
];

// F 前綴：5 個子類別共用同一字母，尾碼依宣告順序固定為 1~5（無 series 概念）。
const RANDOM_CATEGORY_LIST = [
  { prefix: 'F', seq: 1, category: '隨機拍立得',             subcategory: '데코 포토팩',           price: 5000,  limited: 10 },
  { prefix: 'F', seq: 2, category: '隨機壓克力磁鐵',         subcategory: '스위츠 아크릴 마그넷', price: 7000,  limited: 10 },
  { prefix: 'F', seq: 3, category: '隨機愛心徽章',           subcategory: '하트 캔뱃지',           price: 5000,  limited: 10 },
  { prefix: 'F', seq: 4, category: '隨機愛心徽章壓克力框架', subcategory: '아크릴 캔뱃지 프레임', price: 17000, limited: 3 },
  { prefix: 'F', seq: 5, category: '隨機卡包',               subcategory: '컬렉션 포토카드',       price: 5000,  limited: 10 },
];

// 依 mode 展開，code 在此一次性、確定性地產生 —— 這就是固定編號的來源。
const PRODUCTS = [];
CATEGORY_LIST.forEach(cat => {
  if (cat.mode === 'perCharacter') {
    let n = 0;
    SERIES_LIST.forEach(s => s.characters.forEach(ch => {
      n++;
      PRODUCTS.push({
        code: `${cat.prefix}-${n}`,
        category: cat.category, subcategory: cat.subcategory,
        price: cat.price, limited: cat.limited,
        series: s.series, subseries: s.subseries,
        name: ch.name, subname: ch.subname,
      });
    }));
  } else { // 'perSeries'
    SERIES_LIST.forEach((s, i) => {
      PRODUCTS.push({
        code: `${cat.prefix}-${i + 1}`,
        category: cat.category, subcategory: cat.subcategory,
        price: cat.price, limited: cat.limited,
        series: s.series, subseries: s.subseries,
        name: s.series, subname: s.subseries,
      });
    });
  }
});
RANDOM_CATEGORY_LIST.forEach(cat => {
  PRODUCTS.push({
    code: `${cat.prefix}-${cat.seq}`,
    category: cat.category, subcategory: cat.subcategory,
    price: cat.price, limited: cat.limited,
    series: null, subseries: null,
    name: cat.category, subname: '',
  });
});

// category 的預設顯示/篩選順序：一般商品種類接著隨機商品種類。
const CATEGORY_ORDER = [...CATEGORY_LIST, ...RANDOM_CATEGORY_LIST].map(c => c.category);
