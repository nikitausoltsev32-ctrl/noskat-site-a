// ==============================================================
// NOSECUT CHINA v2 — Data & Utilities
// Термин: «ноускаты» (основной), «ноускат» (ед.ч.)
// ==============================================================

// ── Категории новостей ────────────────────────────────────────
const V2_NEWS_CATS = ['Рынок','Новинки','Поставки','Таможня','События'];

// ── Категории статей/обзоров ──────────────────────────────────
const V2_REVIEW_CATS = ['Обзоры','Гиды','Кейсы','Аналитика','Сравнения'];

// ── Цвета категорий ───────────────────────────────────────────
const V2_CAT_COLORS = {
  'Рынок':'#1d4ed8','Новинки':'#15803d','Поставки':'#7c3aed',
  'Таможня':'#b45309','События':'#0f766e',
  'Обзоры':'#b91c1c','Гиды':'#c2410c','Кейсы':'#374151',
  'Аналитика':'#0e7490','Сравнения':'#6d28d9',
};

// ── Новости (короткие) ────────────────────────────────────────
const V2_NEWS = [
  {id:101, type:'news', slug:'haval-f7x-nouskat-stock',     title:'Haval F7x: новые ноускаты поступили на склады в России',               excerpt:'Первая партия ноускатов для обновлённого Haval F7x 2025 года прибыла на склады московских дистрибьюторов.',            cat:'Новинки', brand:'Haval',  date:'19.05.2026', views:1840, bg:'#180606', readMins:2},
  {id:102, type:'news', slug:'market-growth-q1-2026',       title:'Рынок ноускатов вырос на 38% в первом квартале 2026 года',             excerpt:'По данным участников рынка, объём поставок ноускатов из КНР в Россию и СНГ увеличился на треть год к году.',         cat:'Рынок',   brand:null,     date:'18.05.2026', views:4320, bg:'#060e18', readMins:3},
  {id:103, type:'news', slug:'customs-tightening-2026',     title:'Таможня ужесточила правила ввоза кузовных деталей из КНР',             excerpt:'ФТС обновила коды ТН ВЭД и ставки пошлин на ряд кузовных деталей. Поставщики ноускатов адаптируются к изменениям.',  cat:'Таможня', brand:null,     date:'17.05.2026', views:3150, bg:'#100c02', readMins:3},
  {id:104, type:'news', slug:'byd-nouskat-sng-2026',        title:'BYD расширяет ассортимент ноускатов для рынка СНГ',                    excerpt:'Компания BYD анонсировала расширение каталога запасных частей для Han EV, Seal и Atto 3 в СНГ.',                       cat:'Новинки', brand:'BYD',    date:'16.05.2026', views:2860, bg:'#06101a', readMins:2},
  {id:105, type:'news', slug:'omoda-kazakhstan-route',      title:'Omoda запускает прямые поставки ноускатов через Казахстан',            excerpt:'Новый логистический маршрут Гуанчжоу–Алматы–Москва сократит срок доставки ноускатов Omoda до 18 дней.',               cat:'Поставки', brand:'Omoda', date:'15.05.2026', views:1920, bg:'#08100a', readMins:2},
  {id:106, type:'news', slug:'chery-tiggo8-nouskat-update', title:'Chery обновила линейку ноускатов Tiggo 8 Pro Max',                     excerpt:'После рестайлинга 2025 года Chery выпустила новую спецификацию ноускатов — несовместимую с предыдущим поколением.',   cat:'Новинки', brand:'Chery',  date:'14.05.2026', views:1540, bg:'#180c04', readMins:2},
  {id:107, type:'news', slug:'jac-js4-nouskat-russia',      title:'JAC JS4: первые ноускаты появились у российских поставщиков',          excerpt:'После выхода JAC JS4 на российский рынок поставщики запасных частей начали завозить ноускаты и оптику.',                cat:'Новинки', brand:'JAC',    date:'13.05.2026', views:1100, bg:'#060c16', readMins:2},
  {id:108, type:'news', slug:'geely-atlas-pro-shipment',    title:'Geely Atlas Pro 2025 — ноускаты уже в пути из Гуанчжоу',              excerpt:'Очередная партия ноускатов для Geely Atlas Pro 2025 года отгружена из порта Гуанчжоу. Ожидаемое прибытие — 15 июня.',  cat:'Поставки', brand:'Geely', date:'12.05.2026', views:980,  bg:'#060818', readMins:2},
  {id:109, type:'news', slug:'china-export-record-2025',    title:'Экспорт автодеталей из Китая бьёт рекорды второй год подряд',          excerpt:'Китайский экспорт кузовных деталей и оптики установил новый рекорд. Россия вошла в топ-5 рынков сбыта.',                cat:'Рынок',   brand:null,     date:'11.05.2026', views:3680, bg:'#0c0c0c', readMins:3},
  {id:110, type:'news', slug:'haval-dargo-x-incompatible',  title:'Haval Dargo X: ноускат после рестайлинга несовместим с прежней версией',excerpt:'GWM подтвердил: ноускаты Haval Dargo X до и после рестайлинга 2025 года полностью несовместимы по крепежу и геометрии.',cat:'Рынок',   brand:'Haval',  date:'10.05.2026', views:2240, bg:'#160404', readMins:2},
];

// ── Статьи / обзоры (подробные) ───────────────────────────────
const V2_REVIEWS = [
  {id:201, type:'review', slug:'nouskat-guide-2026',            title:'Полный гид по ноускатам для китайских SUV: как выбрать, где заказать', excerpt:'Разбираемся, что такое ноускат, как он снимается, что входит в комплект и как не ошибиться при заказе из Китая.',        cat:'Гиды',      brand:null,     date:'18.05.2026', views:5840, bg:'#0e080e', readMins:12},
  {id:202, type:'review', slug:'chery-tiggo8-review',           title:'Chery Tiggo 8 Pro Max: разбираем ноускат нового поколения',            excerpt:'Детальный разбор ноускатa Chery Tiggo 8 Pro Max рестайл. Геометрия, крепёж, совместимость с дорестайлом, цены.',          cat:'Обзоры',    brand:'Chery',  date:'17.05.2026', views:3920, bg:'#180c04', readMins:9},
  {id:203, type:'review', slug:'customs-guide-2026',            title:'Как работает таможня при поставке ноускатов из Китая в 2026 году',     excerpt:'Актуальные ставки пошлин, коды ТН ВЭД, документы, схемы оформления и реальные сроки прохождения таможни.',              cat:'Гиды',      brand:null,     date:'16.05.2026', views:4510, bg:'#0a0c10', readMins:10},
  {id:204, type:'review', slug:'omoda-c5-disassembly',          title:'Omoda C5: разбираем ноускат целиком. Крылья, фары, бампер',            excerpt:'Полный разбор передней части Omoda C5: чем ноускат отличается от Chery, как снимается, что с качеством деталей.',       cat:'Обзоры',    brand:'Omoda',  date:'15.05.2026', views:2780, bg:'#081008', readMins:8},
  {id:205, type:'review', slug:'top-suvs-nouskat-2025',         title:'Рейтинг: лучшие ноускаты для китайских SUV по итогам 2025 года',      excerpt:'Какие ноускаты выигрывают по соотношению цена/качество/срок? Анализ 200+ поставок за год по 6 ключевым маркам.',         cat:'Аналитика', brand:null,     date:'14.05.2026', views:6320, bg:'#0c0c08', readMins:14},
  {id:206, type:'review', slug:'jetour-x70-case',               title:'Jetour X70: восстановление после ДТП. Ноускат из Китая за 35 дней',   excerpt:'Реальный кейс: ДТП, поиск ноуската, заказ из Китая, таможня, доставка, установка. Со всеми деталями и чеками.',         cat:'Кейсы',     brand:'Jetour', date:'13.05.2026', views:4150, bg:'#12080a', readMins:11},
  {id:207, type:'review', slug:'byd-nouskat-russia-guide',      title:'BYD ноускаты в России: полный гид по поставкам и ценам 2026',         excerpt:'Всё о ноускатах BYD Han EV, Seal и Atto 3: где брать, сколько стоит, что входит в комплект, сроки доставки.',            cat:'Гиды',      brand:'BYD',    date:'12.05.2026', views:3240, bg:'#060e18', readMins:9},
  {id:208, type:'review', slug:'exeed-rx-nouskat-guide',        title:'Как выбрать ноускат для Exeed RX: инструкция с фото',                 excerpt:'Пошаговое руководство: какие VIN-префиксы важны, как отличить рестайл от дорестайла, где заказать оригинал.',           cat:'Гиды',      brand:'Exeed',  date:'11.05.2026', views:2090, bg:'#140808', readMins:7},
  {id:209, type:'review', slug:'geely-atlas-generations',       title:'Geely Atlas Pro: сравниваем ноускаты первого и второго поколения',    excerpt:'Детальное сравнение ноускатов Geely Atlas Pro 2022 и 2025 года: крепёж, форма бампера, совместимость оптики и цена.',    cat:'Сравнения', brand:'Geely',  date:'10.05.2026', views:2360, bg:'#06091c', readMins:8},
  {id:210, type:'review', slug:'changan-cs75-crack-fix',        title:'Changan CS75 Plus: трещины в ноускате — причины и решения',           excerpt:'Массовая проблема с ноускатами CS75 Plus первых годов выпуска. Разбираем причины, варианты замены и профилактику.',    cat:'Кейсы',     brand:'Changan',date:'09.05.2026', views:3180, bg:'#100c06', readMins:7},
];

const V2_ALL = [...V2_NEWS, ...V2_REVIEWS];

// ── Бренды ────────────────────────────────────────────────────
const V2_BRANDS = [
  {slug:'haval',  name:'Haval',  ru:'Хавал',   tagline:'Лидер по ноускатам в России',       description:'Haval — SUV-бренд китайского концерна GWM (Great Wall Motors). Один из самых популярных в России. Широкая сеть дилеров, хорошая доступность ноускатов и запчастей.', models:['F7','F7x','H6','Jolion','Jolion Pro','Dargo','Dargo X','H9'],    color:'#b91c1c', count:24},
  {slug:'geely',  name:'Geely',  ru:'Джили',   tagline:'Широкий выбор ноускатов',           description:'Geely — один из крупнейших китайских автопроизводителей. Владеет Volvo, Lotus, Proton. Ноускаты Geely отличаются хорошим качеством и разумными ценами.',             models:['Atlas','Atlas Pro','Coolray','Tugella','Monjaro','Emgrand'],       color:'#1d4ed8', count:18},
  {slug:'chery',  name:'Chery',  ru:'Чери',    tagline:'Самый продаваемый бренд Китая',     description:'Chery — один из старейших независимых автопроизводителей Китая. Хорошая база ноускатов, широкий выбор комплектаций для разных поколений.',                           models:['Tiggo 4 Pro','Tiggo 7 Pro','Tiggo 8 Pro','Tiggo 8 Pro Max','Arrizo 8'], color:'#c2410c', count:21},
  {slug:'byd',    name:'BYD',    ru:'Би Вай Ди',tagline:'Ноускаты для электромобилей',      description:'BYD (Build Your Dreams) — мировой лидер продаж электромобилей. Ноускаты для Han, Seal, Atto 3 появились на российском рынке в 2026 году.',                          models:['Han EV','Seal','Atto 3','Dolphin','Tang','Song Plus'],             color:'#15803d', count:12},
  {slug:'exeed',  name:'Exeed',  ru:'Иксид',   tagline:'Премиум-ноускаты из Китая',         description:'Exeed — премиум-суббренд Chery. Ноускаты отличаются сложной геометрией, встроенной оптикой и более высокой ценой по сравнению с массовым сегментом.',                models:['RX','VX','TXL','LX Plus'],                                        color:'#7c3aed', count:9},
  {slug:'changan',name:'Changan',ru:'Чанган',  tagline:'Надёжные ноускаты для CS-серии',    description:'Changan — государственный автоконцерн Китая. Широкая линейка SUV с хорошей доступностью ноускатов. Особенно популярны CS35 Plus, CS55 Plus и CS75 Plus.',          models:['CS35 Plus','CS55 Plus','CS75 Plus','UNI-T','UNI-V','Lamore'],      color:'#b45309', count:15},
  {slug:'omoda',  name:'Omoda',  ru:'Омода',   tagline:'Доступные ноускаты нового бренда',  description:'Omoda — суббренд Chery для молодой аудитории. Ноускаты Omoda C5 совместимы с рядом компонентов Chery, что упрощает подбор деталей.',                                 models:['C5','C9'],                                                        color:'#0f766e', count:7},
  {slug:'jetour', name:'Jetour', ru:'Джетур',  tagline:'Ноускаты для туристических SUV',    description:'Jetour — суббренд Chery для путешествий. Ноускаты Jetour X70 и X90 Plus пользуются спросом после ДТП благодаря относительно умеренным ценам.',                      models:['X70','X70 Plus','X90 Plus','Dashing'],                             color:'#374151', count:8},
];

// ── FAQ общий ─────────────────────────────────────────────────
const V2_FAQ = [
  {q:'Что такое ноускат автомобиля?',              a:'Ноускат (nose cut) — передняя часть кузова: бампер, фары, решётка радиатора, иногда крылья, снятые с донора целиком. Используется при восстановлении авто после ДТП.'},
  {q:'Сколько стоит ноускат китайского авто из Китая?', a:'От 30 000 до 200 000 руб. в зависимости от марки и комплектации. Средняя цена для популярных SUV (Haval, Chery, Geely) — 60–90 000 руб. с доставкой до РФ.'},
  {q:'Как долго идёт ноускат из Китая?',           a:'Стандартная доставка — 25–45 дней. Экспресс через Гуанчжоу — 15–25 дней. Сроки зависят от загрузки таможни и выбранного маршрута.'},
  {q:'Совместим ли ноускат до и после рестайлинга?', a:'В большинстве случаев — нет. После рестайлинга производители меняют крепёж и геометрию. Проверяйте совместимость по VIN и году выпуска.'},
  {q:'Что входит в стандартный комплект ноуската?', a:'Бампер, фары (левая и правая), решётка радиатора, усилитель бампера, крепёж. По запросу — крылья, капот, радиаторная рамка.'},
];

// ── Утилиты ───────────────────────────────────────────────────
function v2Num(n) { return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n); }

function V2Img({ bg = '#111', aspect = '56.25%', cat = '', height, overlay = false }) {
  const catColor = V2_CAT_COLORS[cat];
  const s = {
    position:'relative', overflow:'hidden', flexShrink:0,
    background:`linear-gradient(135deg, ${bg} 0%, #050508 100%)`,
    width:'100%',
  };
  if (height) s.height = height; else s.paddingTop = aspect;
  return (
    <div style={s}>
      {/* Grid texture */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)',
        backgroundSize:'40px 40px',
      }} />
      {/* Car silhouette */}
      <svg viewBox="0 0 320 120" style={{
        position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
        opacity:.07, width:'88%', pointerEvents:'none',
      }} fill="#fff">
        <path d="M8 92L30 48 80 33 134 27 182 29 232 46 272 67 288 92Z"/>
        <ellipse cx="72" cy="97" rx="23" ry="23"/>
        <ellipse cx="234" cy="97" rx="23" ry="23"/>
        <rect x="88" y="35" width="130" height="32" rx="5" opacity=".45"/>
      </svg>
      {/* Red glow */}
      <div style={{
        position:'absolute', bottom:-20, left:-20, width:200, height:120,
        background:'radial-gradient(ellipse,rgba(215,38,31,.12) 0%,transparent 70%)',
        pointerEvents:'none',
      }} />
      {cat && catColor && (
        <span style={{
          position:'absolute', top:10, left:10, zIndex:2,
          background:catColor, color:'#fff', fontSize:10, fontWeight:700,
          padding:'2px 8px', letterSpacing:.8, textTransform:'uppercase',
          fontFamily:'Oswald,sans-serif',
        }}>{cat}</span>
      )}
    </div>
  );
}

function V2Badge({ cat }) {
  const bg = V2_CAT_COLORS[cat] || '#374151';
  return <span style={{display:'inline-block',background:bg,color:'#fff',fontSize:10,fontWeight:700,padding:'2px 8px',letterSpacing:.8,textTransform:'uppercase',fontFamily:'Oswald,sans-serif'}}>{cat}</span>;
}

function V2EyeIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:2}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

function V2ClockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:2}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}

Object.assign(window, {
  V2_NEWS_CATS, V2_REVIEW_CATS, V2_CAT_COLORS,
  V2_NEWS, V2_REVIEWS, V2_ALL, V2_BRANDS, V2_FAQ,
  v2Num, V2Img, V2Badge, V2EyeIcon, V2ClockIcon,
});
