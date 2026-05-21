// ==============================================================
// NOSECUT CHINA v2 — Static Pages
// /about, /contacts, /advertising, /legal/*, 404
// ==============================================================
const {
  V2_REVIEWS, v2Num, V2ReviewCard,
  V2Header, V2Crumbs, V2Footer,
} = window;

// ── Shared text page wrapper ──────────────────────────────────
function TextPageShell({ navigate, cur, crumbs, children }) {
  return (
    <div>
      <V2Header navigate={navigate} cur={cur || ''} />
      <div className="container" style={{ padding:'28px 20px' }}>
        <V2Crumbs navigate={navigate} items={crumbs} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:40 }}>
          <div>{children}</div>
          {/* Mini sidebar */}
          <aside>
            <div className="nc-section-title">Разделы</div>
            {[
              { l:'Новости', p:'news' }, { l:'Статьи', p:'articles' },
              { l:'Бренды', p:'brands' }, { l:'О проекте', p:'about' },
              { l:'Контакты', p:'contacts' }, { l:'Реклама', p:'advertising' },
            ].map(({ l, p }) => (
              <button key={p} onClick={() => navigate(p)} style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'9px 0', borderBottom:'1px solid var(--border)',
                fontSize:13, color:'#555', fontFamily:'Oswald,sans-serif',
                fontWeight:600, letterSpacing:.4, transition:'color .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color='var(--acc)'}
                onMouseLeave={e => e.currentTarget.style.color='#555'}
              >{l}</button>
            ))}

            <div style={{ marginTop:24 }} className="nc-section-title">Правовое</div>
            {[
              { l:'Политика конфиденциальности', p:'legal-privacy' },
              { l:'Cookie-политика', p:'legal-cookies' },
              { l:'Пользовательское соглашение', p:'legal-terms' },
            ].map(({ l, p }) => (
              <button key={p} onClick={() => navigate(p)} style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'8px 0', borderBottom:'1px solid var(--border)',
                fontSize:12, color:'#444', transition:'color .15s', lineHeight:1.4,
              }}
                onMouseEnter={e => e.currentTarget.style.color='var(--acc)'}
                onMouseLeave={e => e.currentTarget.style.color='#444'}
              >{l}</button>
            ))}
          </aside>
        </div>
      </div>
      <V2Footer navigate={navigate} />
    </div>
  );
}

// Shared prose styles
const proseH1 = { fontFamily:'Oswald,sans-serif', fontSize:28, fontWeight:700, fontStyle:'italic', marginBottom:16 };
const proseH2 = { fontFamily:'Oswald,sans-serif', fontSize:18, fontWeight:700, color:'#ccc', margin:'28px 0 10px', letterSpacing:.3 };
const proseP  = { fontSize:14, color:'#888', lineHeight:1.85, marginBottom:14 };
const proseUpdated = { fontSize:12, color:'#444', marginBottom:20 };

// ── /about ───────────────────────────────────────────────────
function AboutPage({ navigate }) {
  return (
    <TextPageShell navigate={navigate} cur="about"
      crumbs={[{ label:'Главная', page:'home' }, { label:'О проекте' }]}>
      <h1 style={proseH1}>О проекте</h1>
      <div style={{
        background:'var(--bg3)', borderLeft:'3px solid var(--acc)',
        padding:'14px 16px', marginBottom:24,
      }}>
        <p style={{ fontSize:14, color:'#888', lineHeight:1.7, margin:0 }}>
          NOSECUT CHINA — независимый информационный портал о ноускатах
          и передних частях автомобилей из Китая. Мы не продаём детали
          и не являемся агрегатором заказов. Только редакционный контент.
        </p>
      </div>
      <p style={proseP}>
        Портал создан в 2025 году командой журналистов и специалистов
        в области китайского авторынка. Наша задача — давать актуальную,
        проверенную информацию о рынке ноускатов, логистике, таможне,
        брендах и восстановлении автомобилей.
      </p>
      <h2 style={proseH2}>Что мы публикуем</h2>
      <ul style={{ fontSize:14, color:'#888', lineHeight:2, paddingLeft:20 }}>
        {[
          'Новости китайского авторынка и поставщиков ноускатов',
          'Обзоры и разборы ноускатов для конкретных моделей',
          'Гиды по выбору, заказу и растаможке деталей',
          'Кейсы восстановления автомобилей после ДТП',
          'Аналитику рынка и сравнительные материалы',
          'Тематические хабы по брендам (Haval, Geely, Chery и др.)',
        ].map((item, i) => (
          <li key={i} style={{ marginBottom:4 }}>
            <span style={{ color:'var(--acc)', marginRight:8 }}>▸</span>{item}
          </li>
        ))}
      </ul>
      <h2 style={proseH2}>Редакционная политика</h2>
      <p style={proseP}>
        Все материалы проходят фактчекинг. Информация о ценах, сроках и
        совместимости деталей актуализируется по мере поступления данных
        от участников рынка. Редакция не несёт ответственности за
        решения, принятые на основе материалов портала.
      </p>
      <h2 style={proseH2}>Сотрудничество</h2>
      <p style={proseP}>
        Если вы — поставщик ноускатов, дилер, эксперт или СТО
        и хотите стать источником информации или разместить материал,
        напишите нам через раздел «Контакты» или «Реклама».
      </p>
    </TextPageShell>
  );
}

// ── /contacts ─────────────────────────────────────────────────
function ContactsPage({ navigate }) {
  const [sent, setSent] = React.useState(false);
  return (
    <TextPageShell navigate={navigate} cur="contacts"
      crumbs={[{ label:'Главная', page:'home' }, { label:'Контакты' }]}>
      <h1 style={proseH1}>Контакты</h1>
      <p style={proseP}>
        По вопросам редакции, сотрудничества, рекламы и технической
        поддержки — пишите на почту или через форму ниже.
      </p>

      {/* Contact grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:28 }}>
        {[
          { label:'E-mail редакции', val:'news@nosecut-china.ru' },
          { label:'По рекламе', val:'adv@nosecut-china.ru' },
          { label:'Telegram', val:'@nosecutchina' },
          { label:'Время ответа', val:'1–2 рабочих дня' },
        ].map(({ label, val }) => (
          <div key={label} style={{
            background:'var(--bg3)', border:'1px solid var(--border)', padding:'16px',
          }}>
            <div style={{ fontSize:11, color:'#555', fontFamily:'Oswald,sans-serif',
                          letterSpacing:.8, textTransform:'uppercase', marginBottom:5 }}>{label}</div>
            <div style={{ fontSize:14, color:'#ccc' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      {sent ? (
        <div style={{
          background:'var(--bg3)', borderLeft:'3px solid var(--acc)',
          padding:'20px', textAlign:'center',
        }}>
          <div style={{ fontFamily:'Oswald,sans-serif', fontSize:18, fontWeight:700,
                        color:'#ddd', marginBottom:6 }}>Сообщение отправлено</div>
          <p style={{ fontSize:13, color:'#666' }}>Мы ответим в течение 1–2 рабочих дней.</p>
        </div>
      ) : (
        <div>
          <div className="nc-section-title" style={{ marginBottom:16 }}>Форма обратной связи</div>
          {[
            { id:'name', label:'Имя', type:'text', placeholder:'Ваше имя' },
            { id:'email', label:'Email', type:'email', placeholder:'you@example.com' },
          ].map(f => (
            <div key={f.id} style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12, color:'#666',
                              fontFamily:'Oswald,sans-serif', marginBottom:5, letterSpacing:.5 }}>
                {f.label}
              </label>
              <input type={f.type} placeholder={f.placeholder} style={{
                width:'100%', background:'var(--bg3)', border:'1px solid var(--border)',
                color:'#ddd', padding:'10px 14px', fontSize:14, fontFamily:'PT Sans,sans-serif',
                outline:'none',
              }}
                onFocus={e => e.currentTarget.style.borderColor='var(--acc)'}
                onBlur={e => e.currentTarget.style.borderColor='var(--border)'}
              />
            </div>
          ))}
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:12, color:'#666',
                            fontFamily:'Oswald,sans-serif', marginBottom:5, letterSpacing:.5 }}>
              Сообщение
            </label>
            <textarea placeholder="Ваш вопрос или предложение..." rows={5} style={{
              width:'100%', background:'var(--bg3)', border:'1px solid var(--border)',
              color:'#ddd', padding:'10px 14px', fontSize:14, fontFamily:'PT Sans,sans-serif',
              resize:'vertical', outline:'none',
            }}
              onFocus={e => e.currentTarget.style.borderColor='var(--acc)'}
              onBlur={e => e.currentTarget.style.borderColor='var(--border)'}
            />
          </div>
          <button onClick={() => setSent(true)} style={{
            background:'var(--acc)', color:'#fff', padding:'11px 28px',
            fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:700, letterSpacing:.6,
            transition:'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='#e8302a'}
            onMouseLeave={e => e.currentTarget.style.background='var(--acc)'}
          >Отправить сообщение</button>
        </div>
      )}
    </TextPageShell>
  );
}

// ── /advertising ──────────────────────────────────────────────
function AdvertisingPage({ navigate }) {
  return (
    <TextPageShell navigate={navigate} cur="advertising"
      crumbs={[{ label:'Главная', page:'home' }, { label:'Реклама' }]}>
      <h1 style={proseH1}>Реклама на портале</h1>
      <p style={proseP}>
        NOSECUT CHINA — специализированный портал для аудитории, интересующейся
        ноускатами, кузовными деталями и китайскими автомобилями. Целевая аудитория:
        владельцы китайских авто, СТО, оптовые поставщики запчастей.
      </p>
      <h2 style={proseH2}>Форматы размещения</h2>
      {[
        ['Нативный материал', 'Экспертная статья или обзор с вашим продуктом', '—'],
        ['Баннер в шапке', '728×90 px, показ на всех страницах', '—'],
        ['Баннер в сайдбаре', '300×250 px, показ во всех разделах', '—'],
        ['Спецпроект', 'Брендированный раздел с контентом', '—'],
      ].map(([title, desc, price]) => (
        <div key={title} style={{
          display:'grid', gridTemplateColumns:'1fr 2fr auto',
          gap:16, padding:'14px 16px', marginBottom:2,
          background:'var(--bg3)', border:'1px solid var(--border)',
        }}>
          <div style={{ fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:700, color:'#ccc' }}>{title}</div>
          <div style={{ fontSize:13, color:'#666' }}>{desc}</div>
          <div style={{ fontSize:13, color:'var(--acc)', fontFamily:'Oswald,sans-serif', fontWeight:700 }}>{price}</div>
        </div>
      ))}
      <h2 style={proseH2}>Контакт по рекламе</h2>
      <p style={proseP}>
        Напишите на <span style={{ color:'var(--acc)' }}>adv@nosecut-china.ru</span> — пришлите
        бриф или опишите задачу. Мы вернёмся с медиакитом и предложением в течение 1 рабочего дня.
      </p>
    </TextPageShell>
  );
}

// ── Legal pages shared template ───────────────────────────────
function LegalPage({ navigate, cur, title, updated, crumbLabel, sections }) {
  return (
    <TextPageShell navigate={navigate} cur={cur}
      crumbs={[{ label:'Главная', page:'home' }, { label:'Правовое' }, { label:crumbLabel }]}>
      <h1 style={proseH1}>{title}</h1>
      <p style={proseUpdated}>Последнее обновление: {updated}</p>
      {sections.map(({ h, body }, i) => (
        <div key={i}>
          {h && <h2 style={proseH2}>{h}</h2>}
          <p style={proseP}>{body}</p>
        </div>
      ))}
    </TextPageShell>
  );
}

function PrivacyPage({ navigate }) {
  return <LegalPage navigate={navigate} cur="legal-privacy" crumbLabel="Политика конфиденциальности"
    title="Политика конфиденциальности" updated="19.05.2026"
    sections={[
      { h:null, body:'Настоящая Политика конфиденциальности описывает, как NOSECUT CHINA собирает, использует и защищает персональные данные пользователей портала.' },
      { h:'1. Сбор данных', body:'Мы собираем данные, которые вы предоставляете самостоятельно: имя, email через форму обратной связи. Автоматически собираются технические данные: IP, тип браузера, страницы просмотра — только с вашего согласия через настройки cookie.' },
      { h:'2. Использование данных', body:'Данные используются исключительно для ответа на ваши обращения и улучшения работы портала. Мы не передаём данные третьим лицам без вашего явного согласия.' },
      { h:'3. Cookie', body:'Портал использует необходимые и аналитические cookie. Аналитика (Яндекс.Метрика) загружается только после вашего согласия. Подробнее — в Cookie-политике.' },
      { h:'4. Ваши права', body:'Вы вправе запросить удаление ваших данных, написав на news@nosecut-china.ru. Запрос будет обработан в течение 30 дней.' },
      { h:'5. Контакт', body:'По вопросам обработки данных: news@nosecut-china.ru.' },
    ]}
  />;
}

function CookiesPage({ navigate }) {
  return <LegalPage navigate={navigate} cur="legal-cookies" crumbLabel="Cookie-политика"
    title="Cookie-политика" updated="19.05.2026"
    sections={[
      { h:null, body:'Настоящая политика описывает, как и зачем NOSECUT CHINA использует файлы cookie.' },
      { h:'Необходимые cookie', body:'Обеспечивают базовую работу сайта. Не требуют согласия. Хранятся в течение сессии или до 1 года. Отключить невозможно.' },
      { h:'Аналитические cookie', body:'Яндекс.Метрика — сбор статистики посещений: страницы, время на сайте, источники трафика. Загружаются только с вашего согласия. Вы можете отозвать согласие в настройках cookie (кнопка в футере).' },
      { h:'Управление cookie', body:'При первом посещении сайта вы видите баннер с выбором: принять все cookie, принять только необходимые, или настроить параметры вручную. Выбор сохраняется на 12 месяцев.' },
      { h:'Изменение настроек', body:'В любой момент вы можете изменить настройки cookie через ссылку «Настройки cookie» в нижней части каждой страницы.' },
    ]}
  />;
}

function TermsPage({ navigate }) {
  return <LegalPage navigate={navigate} cur="legal-terms" crumbLabel="Пользовательское соглашение"
    title="Пользовательское соглашение" updated="19.05.2026"
    sections={[
      { h:null, body:'Настоящее Соглашение регулирует использование информационного портала NOSECUT CHINA (nosecut-china.ru).' },
      { h:'1. Общие условия', body:'Используя портал, вы соглашаетесь с условиями настоящего соглашения. Портал предоставляет исключительно информационный контент и не является магазином, агрегатором заказов или сервисом по продаже деталей.' },
      { h:'2. Ограничение ответственности', body:'Редакция прилагает усилия для актуальности информации, однако не гарантирует её полноту и точность. Решения о покупке деталей принимаются пользователем самостоятельно.' },
      { h:'3. Интеллектуальная собственность', body:'Все материалы портала (тексты, изображения, логотипы) защищены авторским правом. Копирование допускается только с указанием источника и активной ссылки.' },
      { h:'4. Изменения', body:'Редакция вправе изменять условия соглашения. Актуальная версия всегда доступна на этой странице.' },
      { h:'5. Контакт', body:'По вопросам: news@nosecut-china.ru.' },
    ]}
  />;
}

// ── 404 Page ──────────────────────────────────────────────────
function NotFoundPage({ navigate }) {
  return (
    <div>
      <V2Header navigate={navigate} cur="" />
      <div style={{
        minHeight:'70vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', padding:'60px 20px',
        textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Big 404 watermark */}
        <div style={{
          position:'absolute', fontSize:'28vw', fontFamily:'Oswald,sans-serif',
          fontWeight:700, fontStyle:'italic', color:'rgba(255,255,255,.018)',
          userSelect:'none', pointerEvents:'none', lineHeight:1,
        }}>404</div>

        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(215,38,31,.12)', border:'1px solid rgba(215,38,31,.28)',
            padding:'4px 14px', marginBottom:20,
          }}>
            <div style={{ width:6, height:6, background:'var(--acc)', borderRadius:'50%' }} />
            <span style={{
              fontFamily:'Oswald,sans-serif', fontSize:10, fontWeight:700,
              letterSpacing:2.2, textTransform:'uppercase', color:'var(--acc)',
            }}>Страница не найдена</span>
          </div>

          <h1 style={{
            fontFamily:'Oswald,sans-serif', fontSize:64, fontWeight:700,
            fontStyle:'italic', letterSpacing:2, color:'#ddd', marginBottom:16,
          }}>
            404
          </h1>
          <p style={{ fontSize:16, color:'#555', maxWidth:400, margin:'0 auto 32px', lineHeight:1.7 }}>
            Страница не существует или была перемещена.
            Попробуйте вернуться на главную или найти нужный материал через навигацию.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('home')} style={{
              background:'var(--acc)', color:'#fff', padding:'11px 28px',
              fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:700, letterSpacing:.6,
            }}>На главную</button>
            <button onClick={() => navigate('news')} style={{
              background:'var(--bg3)', color:'#bbb', padding:'11px 24px',
              fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:700, letterSpacing:.6,
              border:'1px solid var(--border)',
            }}>Новости</button>
            <button onClick={() => navigate('articles')} style={{
              background:'var(--bg3)', color:'#bbb', padding:'11px 24px',
              fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:700, letterSpacing:.6,
              border:'1px solid var(--border)',
            }}>Статьи</button>
          </div>
        </div>
      </div>
      <V2Footer navigate={navigate} />
    </div>
  );
}

// ── /what-is-noscat — полная статья о ноускатах ──────────────
function NoscatInfoPage({ navigate }) {
  return (
    <TextPageShell navigate={navigate} cur=""
      crumbs={[{ label:'Главная', page:'home' }, { label:'Что такое ноускат?' }]}>
      <h1 style={proseH1}>Что такое ноускат (nose cut)?</h1>
      <div style={{
        background:'var(--bg3)', borderLeft:'3px solid var(--acc)',
        padding:'14px 16px', marginBottom:24,
      }}>
        <p style={{ fontSize:14, color:'#999', lineHeight:1.75, margin:0 }}>
          <strong style={{ color:'#ddd' }}>Ноускат (nose cut, «носкат»)</strong> — передняя часть кузова автомобиля,
          снятая с донорской машины целиком. Используется при восстановлении автомобиля после фронтального ДТП
          как единый узел вместо отдельной покупки и подбора каждой детали.
        </p>
      </div>

      <h2 style={proseH2}>Происхождение термина</h2>
      <p style={proseP}>
        Термин пришёл из английского <em>nose cut</em> — буквально «отрезанный нос». В профессиональной
        среде автовосстановителей и разборщиков он прижился как «носкат» или «ноускат». Практика снятия
        и продажи передних частей целиком распространена в Японии, Южной Корее и Китае, откуда и попала
        на российский рынок вместе с азиатскими автомобилями.
      </p>

      <h2 style={proseH2}>Что входит в стандартный комплект</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:16 }}>
        {[
          ['Передний бампер', 'Основная деталь — с усилителем или без, зависит от комплектации'],
          ['Фары (2 шт.)', 'Левая и правая, часто с электрической косой и кронштейнами'],
          ['Решётка радиатора', 'Включая декоративные вставки и эмблему бренда'],
          ['Усилитель бампера', 'Металлическая балка за бампером — защита при ДТП'],
          ['Крепёж и кронштейны', 'Весь крепёж, скобы, заглушки — для правильной установки'],
          ['Крылья (опционально)', 'Переднее левое и правое — по отдельному запросу'],
        ].map(([title, desc]) => (
          <div key={title} style={{
            background:'var(--bg3)', border:'1px solid var(--border)', padding:'14px',
          }}>
            <div style={{ fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:700,
                          color:'#ccc', marginBottom:4 }}>
              <span style={{ color:'var(--acc)', marginRight:6 }}>▸</span>{title}
            </div>
            <div style={{ fontSize:12, color:'#666', lineHeight:1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <h2 style={proseH2}>Почему заказывают из Китая?</h2>
      <p style={proseP}>
        Китайский авторынок — крупнейший в мире. Поскольку большинство популярных в России моделей
        (Haval, Geely, Chery, BYD, Changan и др.) производятся именно там, запасные части и кузовные
        узлы доступны на китайских складах в огромном ассортименте по ценам ниже европейских и японских аналогов.
      </p>
      <p style={proseP}>
        Средняя стоимость ноуската из Китая для популярных SUV составляет <strong style={{ color:'#ccc' }}>60–90 000 руб.</strong>,
        тогда как покупка тех же деталей по отдельности у официальных дилеров обходится в 2–4 раза дороже.
        Срок доставки — от 18 до 45 дней в зависимости от маршрута и загрузки таможни.
      </p>

      <h2 style={proseH2}>Как это работает на практике</h2>
      {[
        ['1. Диагностика', 'Определяется объём повреждений. Если пострадала передняя часть — бампер, фары, решётка — ноускат закрывает все эти позиции одним заказом.'],
        ['2. Подбор и заказ', 'По VIN-номеру и году выпуска подбирается совместимый ноускат. Важно уточнить: до или после рестайлинга, с ксеноном или LED. Заказ размещается у поставщика в Китае.'],
        ['3. Доставка и монтаж', 'Ноускат едет из Китая морем или по суше через Казахстан. После прохождения таможни и доставки на СТО — установка занимает 3–6 часов.'],
      ].map(([title, body]) => (
        <div key={title} style={{
          display:'flex', gap:16, padding:'16px 0',
          borderBottom:'1px solid var(--border)',
        }}>
          <div style={{
            flexShrink:0, width:32, height:32, background:'var(--bg3)',
            border:'1px solid var(--border)', display:'flex', alignItems:'center',
            justifyContent:'center', fontFamily:'Oswald,sans-serif',
            fontSize:14, fontWeight:700, color:'var(--acc)',
          }}>{title.split('.')[0]}</div>
          <div>
            <div style={{ fontFamily:'Oswald,sans-serif', fontSize:15, fontWeight:700,
                          color:'#ccc', marginBottom:5 }}>{title.split('. ')[1]}</div>
            <p style={{ fontSize:13, color:'#888', lineHeight:1.7, margin:0 }}>{body}</p>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div style={{
        marginTop:32, background:'var(--bg3)', border:'1px solid var(--border)',
        borderLeft:'3px solid var(--acc)', padding:'20px',
      }}>
        <div style={{ fontFamily:'Oswald,sans-serif', fontSize:16, fontWeight:700,
                      color:'#ddd', marginBottom:10 }}>Читайте по теме</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {[
            { l:'Все статьи и обзоры', p:'articles' },
            { l:'Последние новости', p:'news' },
            { l:'Бренды', p:'brands' },
          ].map(({ l, p }) => (
            <button key={p} onClick={() => navigate(p)} style={{
              background:'var(--bg4)', border:'1px solid var(--border)',
              color:'#888', padding:'8px 16px', fontFamily:'Oswald,sans-serif',
              fontSize:13, fontWeight:700, letterSpacing:.4, transition:'all .15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--acc)'; e.currentTarget.style.color='var(--acc)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='#888'; }}
            >{l} →</button>
          ))}
        </div>
      </div>
    </TextPageShell>
  );
}

Object.assign(window, {
  AboutPage, ContactsPage, AdvertisingPage,
  PrivacyPage, CookiesPage, TermsPage,
  NotFoundPage, NoscatInfoPage,
});
