// ==============================================================
// NOSECUT CHINA v2 — News Pages (/news, /news/cat, /news/[slug])
// ==============================================================
const { useState: uSN } = React;
const {
  V2_NEWS_CATS, V2_CAT_COLORS, V2_NEWS, V2_REVIEWS, V2_FAQ,
  v2Num, V2Img, V2Badge, V2EyeIcon, V2ClockIcon,
  V2Header, V2Ticker, V2BrandNav,
  V2NewsCard, V2ReviewCard, V2LargeCard,
  V2Sidebar, V2CatTabs, V2Pagination, V2Crumbs, V2Faq, V2Footer,
} = window;

// ── /news — список новостей ───────────────────────────────────
function NewsListPage({ navigate }) {
  const [cat, setCat] = uSN('all');
  const [page, setPage] = uSN(1);
  const PER = 8;

  const filtered = cat === 'all' ? V2_NEWS : V2_NEWS.filter(a => a.cat === cat);
  const total = Math.max(1, Math.ceil(filtered.length / PER));
  const shown = filtered.slice((page - 1) * PER, page * PER);

  const handleCat = (c) => { setCat(c); setPage(1); };

  return (
    <div>
      <V2Header navigate={navigate} cur="news" />
      <V2Ticker />

      <div className="container" style={{ padding:'28px 20px' }}>
        <V2Crumbs navigate={navigate} items={[
          { label:'Главная', page:'home' },
          { label:'Новости' },
        ]} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
          <div>
            <h1 style={{ fontFamily:'Oswald,sans-serif', fontSize:28, fontWeight:700,
                         fontStyle:'italic', marginBottom:20 }}>Новости</h1>

            <V2CatTabs cats={V2_NEWS_CATS} active={cat} onChange={handleCat} />

            {/* First card large */}
            {shown.slice(0,1).map(a => (
              <div key={a.id} style={{ marginBottom:2 }}>
                <V2LargeCard art={a} navigate={navigate} />
              </div>
            ))}

            {/* Rest as compact list */}
            <div style={{ marginTop:2 }}>
              {shown.slice(1).map(a => <V2NewsCard key={a.id} art={a} navigate={navigate} />)}
            </div>

            <V2Pagination page={page} total={total} onChange={setPage} />
          </div>
          <V2Sidebar navigate={navigate} />
        </div>
      </div>

      <V2BrandNav navigate={navigate} />
      <V2Footer navigate={navigate} />
    </div>
  );
}

// ── /news/category/[cat] — категория новостей ─────────────────
function NewsCatPage({ navigate, cat }) {
  const [page, setPage] = uSN(1);
  const PER = 8;
  const catColor = V2_CAT_COLORS[cat] || 'var(--acc)';

  const items = V2_NEWS.filter(a => a.cat === cat);
  const total = Math.max(1, Math.ceil(items.length / PER));
  const shown = items.slice((page - 1) * PER, page * PER);

  return (
    <div>
      <V2Header navigate={navigate} cur="news" />
      <V2Ticker />

      {/* Category banner */}
      <div style={{
        background:`linear-gradient(135deg, ${catColor}1a 0%, #06060a 100%)`,
        borderBottom:`2px solid ${catColor}35`,
      }}>
        <div className="container" style={{ padding:'24px 20px' }}>
          <V2Crumbs navigate={navigate} items={[
            { label:'Главная', page:'home' },
            { label:'Новости', page:'news' },
            { label:cat },
          ]} />
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:4, height:32, background:catColor, flexShrink:0 }} />
            <h1 style={{ fontFamily:'Oswald,sans-serif', fontSize:26, fontWeight:700,
                         fontStyle:'italic' }}>{cat}</h1>
            <span style={{
              background:'var(--bg3)', border:'1px solid var(--border)',
              padding:'2px 10px', fontSize:11, color:'#555',
              fontFamily:'Oswald,sans-serif',
            }}>{items.length} новостей</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'28px 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
          <div>
            {items.length === 0 ? (
              <div style={{ color:'#555', padding:'40px 0', textAlign:'center',
                            fontFamily:'Oswald,sans-serif', fontSize:16 }}>
                В этой категории пока нет материалов
              </div>
            ) : (
              <>
                {shown.slice(0,1).map(a => (
                  <div key={a.id} style={{ marginBottom:2 }}>
                    <V2LargeCard art={a} navigate={navigate} />
                  </div>
                ))}
                <div style={{ marginTop:2 }}>
                  {shown.slice(1).map(a => <V2NewsCard key={a.id} art={a} navigate={navigate} />)}
                </div>
                <V2Pagination page={page} total={total} onChange={setPage} />
              </>
            )}

            {/* Other news cats */}
            <div style={{ marginTop:36 }}>
              <div className="nc-section-title">Другие рубрики новостей</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {V2_NEWS_CATS.filter(c => c !== cat).map(c => (
                  <button key={c} onClick={() => navigate('news-cat', { cat:c })} style={{
                    background:`${V2_CAT_COLORS[c]}12`,
                    border:`1px solid ${V2_CAT_COLORS[c]}28`,
                    color:'#888', fontSize:12, padding:'6px 12px',
                    fontFamily:'Oswald,sans-serif', fontWeight:600, letterSpacing:.4,
                    transition:'all .15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=V2_CAT_COLORS[c]; e.currentTarget.style.color='#eee'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=`${V2_CAT_COLORS[c]}28`; e.currentTarget.style.color='#888'; }}
                  >{c}</button>
                ))}
              </div>
            </div>
          </div>
          <V2Sidebar navigate={navigate} />
        </div>
      </div>

      <V2BrandNav navigate={navigate} />
      <V2Footer navigate={navigate} />
    </div>
  );
}

// ── /news/[slug] — детальная новость ─────────────────────────
function NewsDetailPage({ navigate, article }) {
  const art = article || V2_NEWS[0];
  const catColor = V2_CAT_COLORS[art.cat] || 'var(--acc)';
  const related = V2_NEWS.filter(a => a.id !== art.id && a.cat === art.cat).slice(0, 3);
  const moreReviews = V2_REVIEWS.slice(0, 2);

  return (
    <div>
      <V2Header navigate={navigate} cur="news" />
      <V2Ticker />

      <div className="container" style={{ padding:'28px 20px' }}>
        <V2Crumbs navigate={navigate} items={[
          { label:'Главная', page:'home' },
          { label:'Новости', page:'news' },
          { label:art.cat, page:'news-cat', params:{ cat:art.cat } },
          { label:art.title.substring(0,42) + '…' },
        ]} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
          {/* Article */}
          <article>
            {/* Meta */}
            <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
              <V2Badge cat={art.cat} />
              {art.brand && (
                <span style={{
                  background:'var(--bg3)', border:'1px solid var(--border)',
                  color:'#666', fontSize:10, padding:'2px 8px',
                  fontFamily:'Oswald,sans-serif', fontWeight:700,
                }}>{art.brand}</span>
              )}
              <span style={{ fontSize:12, color:'#555' }}>{art.date}</span>
              <span style={{ fontSize:12, color:'#444', marginLeft:'auto' }}>
                <V2EyeIcon />{v2Num(art.views)}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily:'Oswald,sans-serif', fontSize:32, fontWeight:700,
              fontStyle:'italic', lineHeight:1.2, marginBottom:16, letterSpacing:.3,
            }}>{art.title}</h1>

            {/* Lead */}
            <p style={{
              fontSize:16, color:'#999', lineHeight:1.8,
              borderLeft:`3px solid ${catColor}`,
              paddingLeft:16, marginBottom:24,
            }}>{art.excerpt}</p>

            {/* Image */}
            <V2Img bg={art.bg} aspect="42%" cat={art.cat} />

            {/* Body */}
            <div style={{ marginTop:24, fontSize:15, color:'#888', lineHeight:1.9 }}>
              <p style={{ marginBottom:16 }}>
                Рынок ноускатов для китайских автомобилей в России продолжает развиваться.
                Поставки из Китая набирают темп, и всё больше автовладельцев и СТО выбирают
                оригинальные передние части вместо дорогостоящих аналогов.
              </p>
              <h2 style={{
                fontFamily:'Oswald,sans-serif', fontSize:20, fontWeight:700,
                color:'#ccc', margin:'24px 0 12px', letterSpacing:.3,
              }}>Детали и подробности</h2>
              <p style={{ marginBottom:16 }}>
                По данным участников рынка, срок доставки ноуската из Гуанчжоу до склада
                в Москве составляет в среднем 28–35 дней при стандартном маршруте. Ряд
                поставщиков предлагает ускоренную отправку через Казахстан — от 18 дней.
              </p>
              {/* Highlight block */}
              <div style={{
                background:'var(--bg3)', borderLeft:`3px solid ${catColor}`,
                padding:'14px 16px', margin:'24px 0',
              }}>
                <div style={{
                  fontFamily:'Oswald,sans-serif', fontSize:12, fontWeight:700,
                  color:catColor, letterSpacing:.8, marginBottom:6, textTransform:'uppercase',
                }}>Важно знать</div>
                <p style={{ fontSize:13, color:'#777', lineHeight:1.7 }}>
                  Перед заказом ноуската уточняйте год выпуска и VIN-номер автомобиля.
                  Ноускаты до и после рестайлинга у большинства марок несовместимы по крепежу.
                </p>
              </div>
              <p>
                Следите за обновлениями в нашем разделе новостей — мы первыми сообщаем
                о поступлениях на склады, изменениях цен и таможенных нюансах.
              </p>
            </div>

            {/* Share */}
            <div style={{
              marginTop:28, paddingTop:18, borderTop:'1px solid var(--border)',
              display:'flex', gap:8, alignItems:'center',
            }}>
              <span style={{ fontSize:11, color:'#444', fontFamily:'Oswald,sans-serif',
                             letterSpacing:.8, textTransform:'uppercase' }}>Поделиться:</span>
              {['VK','TG','WA'].map(s => (
                <button key={s} style={{
                  background:'var(--bg3)', border:'1px solid var(--border)',
                  color:'#555', fontSize:11, padding:'5px 12px',
                  fontFamily:'Oswald,sans-serif', fontWeight:700, letterSpacing:.4,
                  transition:'all .15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--acc)'; e.currentTarget.style.color='var(--acc)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='#555'; }}
                >{s}</button>
              ))}
            </div>

            {/* Related news */}
            {related.length > 0 && (
              <div style={{ marginTop:36 }}>
                <div className="nc-section-title">Новости по теме: {art.cat}</div>
                <div>
                  {related.map(a => <V2NewsCard key={a.id} art={a} navigate={navigate} />)}
                </div>
              </div>
            )}

            {/* Related reviews */}
            <div style={{ marginTop:36 }}>
              <div className="nc-section-title">Читайте также</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
                {moreReviews.map(a => <V2ReviewCard key={a.id} art={a} navigate={navigate} />)}
              </div>
            </div>
          </article>

          <V2Sidebar navigate={navigate} />
        </div>
      </div>

      <V2BrandNav navigate={navigate} />
      <V2Footer navigate={navigate} />
    </div>
  );
}

Object.assign(window, { NewsListPage: NewsListPage, NewsCatPage, NewsDetailPage });
