// ==============================================================
// NOSECUT CHINA v2 — Articles, Reviews & Brands Pages
// /articles, /articles/cat, /articles/[slug], /brands, /brands/[slug]
// ==============================================================
const { useState: uSA } = React;
const {
  V2_REVIEW_CATS, V2_CAT_COLORS, V2_NEWS, V2_REVIEWS, V2_BRANDS, V2_FAQ,
  v2Num, V2Img, V2Badge, V2EyeIcon, V2ClockIcon,
  V2Header, V2Ticker, V2BrandNav,
  V2NewsCard, V2ReviewCard, V2LargeCard,
  V2Sidebar, V2CatTabs, V2Pagination, V2Crumbs, V2Faq, V2Footer,
} = window;

// ── /articles — список статей ─────────────────────────────────
function ArticlesListPage({ navigate }) {
  const [cat, setCat] = uSA('all');
  const [page, setPage] = uSA(1);
  const PER = 6;

  const filtered = cat === 'all' ? V2_REVIEWS : V2_REVIEWS.filter(a => a.cat === cat);
  const total = Math.max(1, Math.ceil(filtered.length / PER));
  const shown = filtered.slice((page - 1) * PER, page * PER);

  return (
    <div>
      <V2Header navigate={navigate} cur="articles" />
      <V2Ticker />

      <div className="container" style={{ padding:'28px 20px' }}>
        <V2Crumbs navigate={navigate} items={[
          { label:'Главная', page:'home' },
          { label:'Статьи и обзоры' },
        ]} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
          <div>
            <h1 style={{ fontFamily:'Oswald,sans-serif', fontSize:28, fontWeight:700,
                         fontStyle:'italic', marginBottom:6 }}>Статьи и обзоры</h1>
            <p style={{ fontSize:14, color:'#555', marginBottom:20, lineHeight:1.6 }}>
              Экспертные материалы, гиды, кейсы и сравнительные обзоры ноускатов из Китая.
            </p>

            <V2CatTabs cats={V2_REVIEW_CATS} active={cat} onChange={(c) => { setCat(c); setPage(1); }} />

            {/* First one large */}
            {shown.slice(0,1).map(a => (
              <div key={a.id} style={{ marginBottom:2 }}>
                <V2LargeCard art={a} navigate={navigate} />
              </div>
            ))}

            {/* Rest in 2-col grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:2 }}>
              {shown.slice(1).map(a => <V2ReviewCard key={a.id} art={a} navigate={navigate} />)}
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

// ── /articles/category/[cat] — категория статей ───────────────
function ArticlesCatPage({ navigate, cat }) {
  const [page, setPage] = uSA(1);
  const PER = 6;
  const catColor = V2_CAT_COLORS[cat] || 'var(--acc)';
  const items = V2_REVIEWS.filter(a => a.cat === cat);
  const total = Math.max(1, Math.ceil(items.length / PER));
  const shown = items.slice((page-1)*PER, page*PER);

  return (
    <div>
      <V2Header navigate={navigate} cur="articles" />
      <V2Ticker />

      <div style={{
        background:`linear-gradient(135deg, ${catColor}18 0%, #06060a 100%)`,
        borderBottom:`2px solid ${catColor}30`,
      }}>
        <div className="container" style={{ padding:'24px 20px' }}>
          <V2Crumbs navigate={navigate} items={[
            { label:'Главная', page:'home' },
            { label:'Статьи', page:'articles' },
            { label:cat },
          ]} />
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:4, height:30, background:catColor, flexShrink:0 }} />
            <h1 style={{ fontFamily:'Oswald,sans-serif', fontSize:26, fontWeight:700, fontStyle:'italic' }}>{cat}</h1>
            <span style={{
              background:'var(--bg3)', border:'1px solid var(--border)',
              padding:'2px 10px', fontSize:11, color:'#555', fontFamily:'Oswald,sans-serif',
            }}>{items.length} материалов</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'28px 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
              {shown.map(a => <V2ReviewCard key={a.id} art={a} navigate={navigate} />)}
            </div>
            {items.length === 0 && (
              <div style={{ color:'#555', padding:'40px 0', textAlign:'center',
                            fontFamily:'Oswald,sans-serif', fontSize:16 }}>
                В этой категории пока нет материалов
              </div>
            )}
            <V2Pagination page={page} total={total} onChange={setPage} />

            <div style={{ marginTop:36 }}>
              <div className="nc-section-title">Другие категории</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {V2_REVIEW_CATS.filter(c=>c!==cat).map(c => (
                  <button key={c} onClick={() => navigate('articles-cat', { cat:c })} style={{
                    background:`${V2_CAT_COLORS[c]}12`, border:`1px solid ${V2_CAT_COLORS[c]}28`,
                    color:'#888', fontSize:12, padding:'6px 12px',
                    fontFamily:'Oswald,sans-serif', fontWeight:600, letterSpacing:.4, transition:'all .15s',
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

// ── /articles/[slug] — детальная статья ───────────────────────
function ArticleDetailPage({ navigate, article }) {
  const art = article || V2_REVIEWS[0];
  const catColor = V2_CAT_COLORS[art.cat] || 'var(--acc)';
  const related = V2_REVIEWS.filter(a => a.id !== art.id && a.cat === art.cat).slice(0, 3);
  const relatedNews = V2_NEWS.filter(a => a.brand && a.brand === art.brand).slice(0, 4);

  return (
    <div>
      <V2Header navigate={navigate} cur="articles" />
      <V2Ticker />

      <div className="container" style={{ padding:'28px 20px' }}>
        <V2Crumbs navigate={navigate} items={[
          { label:'Главная', page:'home' },
          { label:'Статьи', page:'articles' },
          { label:art.cat, page:'articles-cat', params:{ cat:art.cat } },
          { label:art.title.substring(0,42) + '…' },
        ]} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
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
              {art.readMins && (
                <span style={{ fontSize:12, color:'#555' }}>
                  <V2ClockIcon />{art.readMins} мин чтения
                </span>
              )}
              <span style={{ fontSize:12, color:'#444', marginLeft:'auto' }}>
                <V2EyeIcon />{v2Num(art.views)}
              </span>
            </div>

            <h1 style={{
              fontFamily:'Oswald,sans-serif', fontSize:32, fontWeight:700,
              fontStyle:'italic', lineHeight:1.2, marginBottom:16, letterSpacing:.3,
            }}>{art.title}</h1>

            {/* Lead */}
            <p style={{
              fontSize:16, color:'#999', lineHeight:1.8,
              borderLeft:`3px solid ${catColor}`, paddingLeft:16, marginBottom:24,
            }}>{art.excerpt}</p>

            {/* Main image */}
            <V2Img bg={art.bg} aspect="40%" cat={art.cat} />

            {/* Article body */}
            <div style={{ marginTop:24, fontSize:15, color:'#888', lineHeight:1.9 }}>
              <p style={{ marginBottom:16 }}>
                В этом материале мы детально разбираем тему ноускатов для китайских автомобилей.
                Рынок активно развивается: поставки из Китая в Россию растут, а выбор
                доступных ноускатов расширяется с каждым кварталом.
              </p>

              <h2 style={{
                fontFamily:'Oswald,sans-serif', fontSize:20, fontWeight:700,
                color:'#ccc', margin:'28px 0 12px', letterSpacing:.3,
              }}>Что нужно проверить перед заказом</h2>
              <p style={{ marginBottom:16 }}>
                Прежде всего — VIN-номер и год выпуска автомобиля. У большинства марок
                ноускаты дорестайлинговых и рестайлинговых версий полностью несовместимы
                по креплению бампера, форме фар и конфигурации решётки радиатора.
              </p>

              {/* Info block */}
              <div style={{
                background:'var(--bg3)', borderLeft:`3px solid ${catColor}`,
                padding:'16px', margin:'24px 0',
              }}>
                <div style={{
                  fontFamily:'Oswald,sans-serif', fontSize:12, fontWeight:700,
                  color:catColor, letterSpacing:.8, marginBottom:8, textTransform:'uppercase',
                }}>Совет редакции</div>
                <p style={{ fontSize:14, color:'#777', lineHeight:1.7 }}>
                  При заказе ноуската из Китая обязательно запросите у поставщика
                  фото- и видеоотчёт перед отправкой. Это страховка от скрытых дефектов
                  и несоответствия характеристик.
                </p>
              </div>

              <h2 style={{
                fontFamily:'Oswald,sans-serif', fontSize:20, fontWeight:700,
                color:'#ccc', margin:'28px 0 12px', letterSpacing:.3,
              }}>Цены и сроки доставки в 2026 году</h2>
              <p style={{ marginBottom:16 }}>
                Средняя стоимость ноуската для популярных китайских SUV составляет
                60–90 000 руб. с доставкой до Москвы. Срок — от 18 до 45 дней в
                зависимости от маршрута и загрузки таможни.
              </p>

              {/* Comparison table */}
              <div style={{
                border:'1px solid var(--border)', marginTop:24, marginBottom:24,
                overflow:'hidden',
              }}>
                <div style={{
                  display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
                  background:'var(--bg3)', borderBottom:'1px solid var(--border)',
                }}>
                  {['Марка','Срок доставки','Цена ноуската'].map(h => (
                    <div key={h} style={{
                      padding:'10px 14px', fontFamily:'Oswald,sans-serif',
                      fontSize:12, fontWeight:700, color:'#888',
                      letterSpacing:.6, textTransform:'uppercase',
                    }}>{h}</div>
                  ))}
                </div>
                {[
                  ['Haval F7x','28–35 дн.','55–80 000 ₽'],
                  ['Chery Tiggo 8','30–40 дн.','60–90 000 ₽'],
                  ['Geely Atlas','25–38 дн.','50–75 000 ₽'],
                  ['BYD Han EV','35–45 дн.','90–140 000 ₽'],
                ].map((row, i) => (
                  <div key={i} style={{
                    display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
                    borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                    background: i%2===0 ? 'transparent' : 'var(--bg2)',
                  }}>
                    {row.map((cell, j) => (
                      <div key={j} style={{
                        padding:'10px 14px', fontSize:13, color:'#999',
                        fontFamily: j===0 ? 'Oswald,sans-serif' : 'PT Sans,sans-serif',
                        fontWeight: j===0 ? 600 : 400,
                      }}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>

              <p>
                Подробнее о каждом бренде читайте в разделе «Бренды» — там собраны
                актуальные данные по моделям, годам выпуска и совместимости ноускатов.
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
                  fontFamily:'Oswald,sans-serif', fontWeight:700, letterSpacing:.4, transition:'all .15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--acc)'; e.currentTarget.style.color='var(--acc)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='#555'; }}
                >{s}</button>
              ))}
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div style={{ marginTop:36 }}>
                <div className="nc-section-title">По теме: {art.cat}</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
                  {related.map(a => <V2ReviewCard key={a.id} art={a} navigate={navigate} />)}
                </div>
              </div>
            )}

            {/* Related news */}
            {relatedNews.length > 0 && (
              <div style={{ marginTop:36 }}>
                <div className="nc-section-title">Новости по теме{art.brand ? `: ${art.brand}` : ''}</div>
                {relatedNews.map(a => <V2NewsCard key={a.id} art={a} navigate={navigate} />)}
              </div>
            )}
          </article>

          <V2Sidebar navigate={navigate} />
        </div>
      </div>

      <V2BrandNav navigate={navigate} />
      <V2Footer navigate={navigate} />
    </div>
  );
}

// ── /brands — список брендов ──────────────────────────────────
function BrandsListPage({ navigate }) {
  return (
    <div>
      <V2Header navigate={navigate} cur="brands" />
      <V2Ticker />

      <div className="container" style={{ padding:'28px 20px' }}>
        <V2Crumbs navigate={navigate} items={[
          { label:'Главная', page:'home' },
          { label:'Бренды' },
        ]} />

        <h1 style={{ fontFamily:'Oswald,sans-serif', fontSize:28, fontWeight:700,
                     fontStyle:'italic', marginBottom:8 }}>Бренды</h1>
        <p style={{ fontSize:14, color:'#555', marginBottom:28, lineHeight:1.6 }}>
          Тематические хабы по китайским автомобильным брендам: модели, ноускаты, новости и обзоры.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:2 }}>
          {V2_BRANDS.map(b => (
            <div key={b.slug} className="nc-card"
              onClick={() => navigate('brand', { brand:b })}
              style={{ display:'flex', gap:0, overflow:'hidden' }}>
              {/* Color accent block */}
              <div style={{
                width:6, background:b.color, flexShrink:0,
              }} />
              <div style={{ padding:'20px 20px 20px 18px', flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <div>
                    <div style={{
                      fontFamily:'Oswald,sans-serif', fontSize:22, fontWeight:700,
                      fontStyle:'italic', letterSpacing:.5, color:'#ddd',
                    }}>{b.name}</div>
                    <div style={{ fontSize:12, color:'#555', marginTop:2 }}>{b.ru}</div>
                  </div>
                  <span style={{
                    background:`${b.color}20`, border:`1px solid ${b.color}40`,
                    color:b.color, fontSize:11, padding:'3px 8px',
                    fontFamily:'Oswald,sans-serif', fontWeight:700,
                    flexShrink:0, marginLeft:12,
                  }}>{b.count} материалов</span>
                </div>
                <p style={{ fontSize:13, color:'#5a5a5a', lineHeight:1.55, marginBottom:12 }}>
                  {b.description}
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                  {b.models.slice(0,4).map(m => (
                    <span key={m} style={{
                      background:'var(--bg4)', border:'1px solid var(--border)',
                      fontSize:11, color:'#666', padding:'2px 8px',
                      fontFamily:'Oswald,sans-serif',
                    }}>{m}</span>
                  ))}
                  {b.models.length > 4 && (
                    <span style={{ fontSize:11, color:'#444', padding:'2px 4px' }}>
                      +{b.models.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <V2Footer navigate={navigate} />
    </div>
  );
}

// ── /brands/[slug] — страница бренда (SEO-хаб) ───────────────
function BrandPage({ navigate, brand: brandProp }) {
  const b = brandProp || V2_BRANDS[0];
  const brandNews = V2_NEWS.filter(a => a.brand === b.name).slice(0, 6);
  const brandReviews = V2_REVIEWS.filter(a => a.brand === b.name).slice(0, 3);
  const allBrandArticles = [...brandNews, ...brandReviews];
  const related = V2_BRANDS.filter(x => x.slug !== b.slug).slice(0, 4);

  const brandFaq = [
    { q:`Где купить ноускат ${b.name} в России?`, a:`Ноускаты ${b.name} поставляются из Китая напрямую. Срок доставки — 25–45 дней. Уточняйте наличие у поставщиков, работающих с маркой.` },
    { q:`Какие модели ${b.name} наиболее популярны для ноускатов?`, a:`Наибольший спрос: ${b.models.slice(0,3).join(', ')}. Эти модели имеют хорошую базу ноускатов в Китае и доступные цены.` },
    { q:`Совместимы ли ноускаты ${b.name} разных годов?`, a:`В большинстве случаев — нет. После рестайлинга крепёж и геометрия меняются. Проверяйте совместимость по VIN перед заказом.` },
  ];

  return (
    <div>
      <V2Header navigate={navigate} cur="brands" />
      <V2Ticker />

      {/* Brand hero */}
      <div style={{
        background:`linear-gradient(135deg, ${b.color}20 0%, #060609 60%, #080808 100%)`,
        borderBottom:`2px solid ${b.color}35`, position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', right:-40, top:'50%', transform:'translateY(-50%)',
          width:300, height:300,
          background:`radial-gradient(circle, ${b.color}18 0%, transparent 65%)`,
          pointerEvents:'none',
        }} />
        <div className="container" style={{ padding:'32px 20px', position:'relative', zIndex:2 }}>
          <V2Crumbs navigate={navigate} items={[
            { label:'Главная', page:'home' },
            { label:'Бренды', page:'brands' },
            { label:b.name },
          ]} />
          <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
            <div style={{ width:6, height:50, background:b.color, flexShrink:0, marginTop:4 }} />
            <div>
              <div style={{
                fontFamily:'Oswald,sans-serif', fontSize:38, fontWeight:700,
                fontStyle:'italic', letterSpacing:1, lineHeight:1,
                color:'#ddd',
              }}>{b.name}&nbsp;<span style={{ color:b.color }}>CHINA</span></div>
              <div style={{ fontSize:13, color:'#666', marginTop:6 }}>
                Ноускаты {b.ru} из Китая · {b.count} материалов
              </div>
              <p style={{ fontSize:14, color:'#666', marginTop:10, maxWidth:560, lineHeight:1.65 }}>
                {b.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'32px 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:36 }}>
          <div>

            {/* Models */}
            <div style={{ marginBottom:32 }}>
              <div className="nc-section-title">Популярные модели {b.name}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {b.models.map(m => (
                  <div key={m} style={{
                    background:`${b.color}15`, border:`1px solid ${b.color}30`,
                    padding:'8px 16px', cursor:'pointer', transition:'all .15s',
                    fontFamily:'Oswald,sans-serif', fontSize:14, fontWeight:600, color:'#bbb',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background=`${b.color}28`; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background=`${b.color}15`; e.currentTarget.style.color='#bbb'; }}
                  >{b.name} {m}</div>
                ))}
              </div>
            </div>

            {/* Latest articles */}
            {allBrandArticles.length > 0 ? (
              <div style={{ marginBottom:32 }}>
                <div className="nc-section-title">Материалы по {b.name}</div>
                {brandNews.map(a => <V2NewsCard key={a.id} art={a} navigate={navigate} />)}
                {brandReviews.length > 0 && (
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:2 }}>
                    {brandReviews.map(a => <V2ReviewCard key={a.id} art={a} navigate={navigate} />)}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginBottom:32 }}>
                <div className="nc-section-title">Материалы по {b.name}</div>
                {/* Show general news */}
                {V2_NEWS.slice(0, 4).map(a => <V2NewsCard key={a.id} art={a} navigate={navigate} />)}
              </div>
            )}

            {/* FAQ */}
            <div style={{ marginBottom:32 }}>
              <div className="nc-section-title">Вопросы о ноускатах {b.name}</div>
              <div>
                {brandFaq.map((it, i) => {
                  const FaqItem = () => {
                    const [open, setOpen] = uSA(false);
                    return (
                      <div style={{
                        borderBottom:'1px solid var(--border)',
                        background: open ? 'var(--bg3)' : 'transparent', transition:'background .15s',
                      }}>
                        <button onClick={() => setOpen(!open)} style={{
                          display:'flex', justifyContent:'space-between', alignItems:'center',
                          width:'100%', padding:'14px 16px', textAlign:'left', gap:12,
                        }}>
                          <span style={{ fontFamily:'Oswald,sans-serif', fontSize:15, fontWeight:600, color:'#ddd' }}>{it.q}</span>
                          <span style={{
                            color: open ? 'var(--acc)' : '#555', fontSize:18, flexShrink:0,
                            transition:'transform .2s,color .15s', transform: open ? 'rotate(45deg)' : 'none',
                          }}>+</span>
                        </button>
                        {open && (
                          <div style={{ padding:'0 16px 14px', fontSize:14, color:'#888', lineHeight:1.7 }}>{it.a}</div>
                        )}
                      </div>
                    );
                  };
                  return <FaqItem key={i} />;
                })}
              </div>
            </div>

            {/* Similar brands */}
            <div>
              <div className="nc-section-title">Похожие бренды</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
                {related.map(rb => (
                  <div key={rb.slug} onClick={() => navigate('brand', { brand:rb })}
                    style={{
                      padding:'14px', cursor:'pointer', transition:'all .15s',
                      background:`${rb.color}10`, border:`1px solid ${rb.color}25`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background=`${rb.color}22`; e.currentTarget.style.borderColor=`${rb.color}50`; }}
                    onMouseLeave={e => { e.currentTarget.style.background=`${rb.color}10`; e.currentTarget.style.borderColor=`${rb.color}25`; }}
                  >
                    <div style={{ fontFamily:'Oswald,sans-serif', fontSize:16, fontWeight:700,
                                  fontStyle:'italic', color:'#ccc' }}>{rb.name}</div>
                    <div style={{ fontSize:11, color:'#4a4a4a', marginTop:3 }}>{rb.count} материалов</div>
                  </div>
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

Object.assign(window, {
  ArticlesListPage, ArticlesCatPage, ArticleDetailPage,
  BrandsListPage, BrandPage,
});
