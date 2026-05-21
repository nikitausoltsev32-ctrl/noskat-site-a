// ==============================================================
// NOSECUT CHINA v2 — Home Page
// Requires nc-data-v2.jsx + nc-components-v2.jsx
// ==============================================================
const {
  V2_NEWS_CATS, V2_REVIEW_CATS, V2_CAT_COLORS,
  V2_NEWS, V2_REVIEWS, V2_ALL, V2_BRANDS, V2_FAQ,
  v2Num, V2Img, V2Badge, V2EyeIcon, V2ClockIcon,
  V2Header, V2Ticker, V2HeroPortal, V2FeaturedSlider,
  V2NewsCard, V2ReviewCard, V2LargeCard,
  V2Sidebar, V2BrandNav, V2CatTabs,
  V2Pagination, V2Crumbs, V2Faq, V2Footer,
} = window;

// ── Categories grid ───────────────────────────────────────────
function V2CatGrid({ navigate }) {
  const cats = [...V2_NEWS_CATS, ...V2_REVIEW_CATS];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:2 }}>
      {cats.map(cat => {
        const col = V2_CAT_COLORS[cat] || '#374151';
        const count = V2_ALL.filter(a => a.cat === cat).length;
        return (
          <div key={cat} onClick={() => navigate(V2_NEWS_CATS.includes(cat) ? 'news-cat' : 'articles-cat', { cat })}
            style={{
              background:`${col}14`, border:`1px solid ${col}28`,
              padding:'14px 14px 14px 18px', cursor:'pointer',
              position:'relative', overflow:'hidden', transition:'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background=`${col}24`; e.currentTarget.style.borderColor=`${col}55`; }}
            onMouseLeave={e => { e.currentTarget.style.background=`${col}14`; e.currentTarget.style.borderColor=`${col}28`; }}
          >
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:col }} />
            <div style={{ fontFamily:'Oswald,sans-serif', fontSize:13, fontWeight:700,
                          letterSpacing:.3, color:'#bbb' }}>{cat}</div>
            <div style={{ fontSize:11, color:'#444', marginTop:2 }}>{count} материалов</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Brands grid ───────────────────────────────────────────────
function V2BrandsGrid({ navigate }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
      {V2_BRANDS.map(b => (
        <div key={b.slug} onClick={() => navigate('brand', { brand:b })}
          style={{
            background:`${b.color}10`, border:`1px solid ${b.color}25`,
            padding:'16px 16px 16px 20px', cursor:'pointer',
            position:'relative', overflow:'hidden', transition:'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background=`${b.color}22`; e.currentTarget.style.borderColor=`${b.color}50`; }}
          onMouseLeave={e => { e.currentTarget.style.background=`${b.color}10`; e.currentTarget.style.borderColor=`${b.color}25`; }}
        >
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:b.color }} />
          <div style={{ fontFamily:'Oswald,sans-serif', fontSize:16, fontWeight:700,
                        fontStyle:'italic', letterSpacing:.5, color:'#d0d0d0' }}>{b.name}</div>
          <div style={{ fontSize:11, color:'#555', marginTop:2 }}>{b.tagline}</div>
          <div style={{ fontSize:11, color:'#3a3a3a', marginTop:4 }}>{b.count} материалов</div>
        </div>
      ))}
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────
function HomePageV2({ navigate, reviewLayout = 'grid' }) {
  const latestNews = V2_NEWS.slice(0, 6);
  const topReviews = V2_REVIEWS.slice(0, 3);
  const featuredNews = V2_NEWS.slice(0, 1)[0];
  const sideNews = V2_NEWS.slice(1, 5);

  return (
    <div>
      <V2Ticker />
      <V2HeroPortal navigate={navigate} />
      <V2BrandNav navigate={navigate} />

      <div className="container" style={{ padding:'36px 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>

          {/* ── Main column ──────────────────────────────── */}
          <div>

            {/* 1. Главное сегодня */}
            <div style={{ marginBottom:36 }}>
              <div className="nc-section-title">Главное сегодня</div>
              <V2FeaturedSlider navigate={navigate} />
            </div>

            {/* 2. Последние новости */}
            <div style={{ marginBottom:36 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="nc-section-title">Последние новости</div>
                <button onClick={() => navigate('news')} style={{
                  fontSize:12, color:'var(--acc)', fontFamily:'Oswald,sans-serif',
                  letterSpacing:.6, fontWeight:700, textTransform:'uppercase', marginBottom:16,
                }}>Все новости →</button>
              </div>
              {/* Featured news + list */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:2 }}>
                <div style={{ gridRow:'span 3' }}>
                  <V2LargeCard art={featuredNews} navigate={navigate} />
                </div>
                {sideNews.map(a => (
                  <V2NewsCard key={a.id} art={a} navigate={navigate} />
                ))}
              </div>
              {/* 2 more news below */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:2 }}>
                {V2_NEWS.slice(5, 7).map(a => (
                  <div key={a.id} className="nc-card" onClick={() => navigate('news-detail', { article:a })}
                    style={{ padding:'14px' }}>
                    <V2Badge cat={a.cat} />
                    <p style={{
                      fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:600,
                      lineHeight:1.3, margin:'7px 0 6px', color:'#ccc',
                    }}>{a.title}</p>
                    <div style={{ fontSize:11, color:'#444' }}>{a.date}&nbsp;·&nbsp;<V2EyeIcon />{v2Num(a.views)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Статьи и обзоры */}
            <div style={{ marginBottom:36 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="nc-section-title">Статьи и обзоры</div>
                <button onClick={() => navigate('articles')} style={{
                  fontSize:12, color:'var(--acc)', fontFamily:'Oswald,sans-serif',
                  letterSpacing:.6, fontWeight:700, textTransform:'uppercase', marginBottom:16,
                }}>Все статьи →</button>
              </div>
              {reviewLayout === 'grid' ? (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
                  {topReviews.map(a => <V2ReviewCard key={a.id} art={a} navigate={navigate} />)}
                </div>
              ) : (
                <div>
                  {topReviews.map(a => (
                    <div key={a.id} onClick={() => navigate('article-detail', { article:a })}
                      style={{
                        display:'flex', gap:14, padding:'14px 0',
                        borderBottom:'1px solid var(--border)', cursor:'pointer',
                      }}>
                      <div style={{ flexShrink:0, width:130, height:90, overflow:'hidden' }}>
                        <V2Img bg={a.bg} height="90px" cat={a.cat} />
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                          <V2Badge cat={a.cat} />
                          <span style={{ fontSize:11, color:'#444' }}>{a.date}</span>
                          <span style={{ fontSize:11, color:'#444' }}><V2ClockIcon />{a.readMins} мин</span>
                        </div>
                        <h3 style={{ fontFamily:'Oswald,sans-serif', fontSize:16, fontWeight:600,
                                     lineHeight:1.3, color:'#ccc', marginBottom:6 }}>{a.title}</h3>
                        <p style={{ fontSize:12, color:'#555', lineHeight:1.5 }}>{a.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3.5 Что такое ноускат? */}
            <div style={{ marginBottom:36 }}>
              <div style={{
                background:'var(--bg3)', border:'1px solid var(--border)',
                borderLeft:'4px solid var(--acc)', padding:'24px 24px 20px',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
                  <div style={{ flex:1, minWidth:220 }}>
                    <div style={{
                      fontFamily:'Oswald,sans-serif', fontSize:20, fontWeight:700,
                      fontStyle:'italic', marginBottom:10, letterSpacing:.3,
                    }}>Что такое ноускат?</div>
                    <p style={{ fontSize:14, color:'#888', lineHeight:1.75, marginBottom:12 }}>
                      <strong style={{ color:'#ccc' }}>Ноускат (nose cut)</strong> — передняя часть кузова автомобиля,
                      снятая с донора целиком: бампер, фары, решётка радиатора, иногда крылья.
                      Используется при восстановлении машины после ДТП — вместо покупки и покраски
                      каждой детали по отдельности.
                    </p>
                    <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
                      {[
                        ['5–7', 'деталей в комплекте'],
                        ['2–4×', 'дешевле оригинала'],
                        ['30–45', 'дней доставки из КНР'],
                      ].map(([num, label]) => (
                        <div key={label} style={{ textAlign:'center' }}>
                          <div style={{
                            fontFamily:'Oswald,sans-serif', fontSize:22, fontWeight:700,
                            color:'var(--acc)', lineHeight:1,
                          }}>{num}</div>
                          <div style={{ fontSize:11, color:'#555', marginTop:2 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => navigate('what-is-noscat')} style={{
                    background:'var(--acc)', color:'#fff', padding:'10px 22px',
                    fontFamily:'Oswald,sans-serif', fontSize:13, fontWeight:700,
                    letterSpacing:.6, textTransform:'uppercase', flexShrink:0, alignSelf:'flex-end',
                    transition:'background .15s', boxShadow:'0 4px 16px rgba(215,38,31,.35)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background='#e8302a'}
                    onMouseLeave={e => e.currentTarget.style.background='var(--acc)'}
                  >Подробнее о ноускатах →</button>
                </div>
              </div>
            </div>

            {/* 4. Категории */}
            <div style={{ marginBottom:36 }}>
              <div className="nc-section-title">Разделы</div>
              <V2CatGrid navigate={navigate} />
            </div>

            {/* 5. Популярные материалы */}
            <div style={{ marginBottom:36 }}>
              <div className="nc-section-title">Популярное</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
                {[...V2_ALL].sort((a,b)=>b.views-a.views).slice(0,4).map(a => (
                  <div key={a.id} className="nc-card"
                    onClick={() => navigate(a.type==='news'?'news-detail':'article-detail',{article:a})}
                    style={{ padding:'14px', display:'flex', gap:12 }}>
                    <div style={{ flexShrink:0, width:70, height:52, overflow:'hidden' }}>
                      <V2Img bg={a.bg} height="52px" />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <V2Badge cat={a.cat} />
                      <p style={{
                        fontFamily:'Oswald,sans-serif', fontSize:13, fontWeight:600,
                        lineHeight:1.3, color:'#ccc', marginTop:4,
                        display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
                      }}>{a.title}</p>
                      <div style={{ fontSize:11, color:'#3a3a3a', marginTop:3 }}>
                        <V2EyeIcon />{v2Num(a.views)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Бренды / тематические хабы */}
            <div style={{ marginBottom:36 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="nc-section-title">Бренды</div>
                <button onClick={() => navigate('brands')} style={{
                  fontSize:12, color:'var(--acc)', fontFamily:'Oswald,sans-serif',
                  letterSpacing:.6, fontWeight:700, textTransform:'uppercase', marginBottom:16,
                }}>Все бренды →</button>
              </div>
              <V2BrandsGrid navigate={navigate} />
            </div>

            {/* 7. FAQ */}
            <div>
              <div className="nc-section-title">Частые вопросы</div>
              <V2Faq />
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────── */}
          <V2Sidebar navigate={navigate} />
        </div>
      </div>

      <V2Footer navigate={navigate} />
    </div>
  );
}

Object.assign(window, { HomePageV2, V2CatGrid, V2BrandsGrid });
