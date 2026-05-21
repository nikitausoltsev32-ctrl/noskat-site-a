// ==============================================================
// NOSECUT CHINA v2 — UI Components
// Requires nc-data-v2.jsx loaded first
// ==============================================================
const { useState: uS, useEffect: uE, useRef: uR } = React;
const {
  V2_NEWS_CATS, V2_REVIEW_CATS, V2_CAT_COLORS,
  V2_NEWS, V2_REVIEWS, V2_ALL, V2_BRANDS, V2_FAQ,
  v2Num, V2Img, V2Badge, V2EyeIcon, V2ClockIcon
} = window;

// ── Logo ──────────────────────────────────────────────────────
function V2Logo({ onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', userSelect: 'none', lineHeight: 1, display: 'flex', alignItems: 'center', gap: 9 }}>
      <img src={window.__resources?.logoCircle || 'brand/logo-circle.png'} alt="" style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, objectFit: 'cover', border: '1px solid rgba(255,255,255,.08)' }} />
      <div>
        <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 22, fontWeight: 700, fontStyle: 'italic', letterSpacing: 1.5, lineHeight: 1 }}>
          NOSECUT&nbsp;<span style={{ color: 'var(--acc)' }}>CHINA</span>
        </div>
        <div style={{ background: 'var(--acc)', display: 'inline-block', padding: '1px 6px', marginTop: 3, fontSize: 8, fontFamily: 'Oswald,sans-serif', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fff' }}>НОСКАТЫ И ПЕРЕД АВТО</div>
      </div>
    </div>);

}

// ── Header ────────────────────────────────────────────────────
function V2Header({ navigate, cur }) {
  const [scrolled, setScrolled] = uS(false);
  const [mob, setMob] = uS(false);
  uE(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = [
  { l: 'Новости', p: 'news' },
  { l: 'Статьи', p: 'articles' },
  { l: 'Бренды', p: 'brands' },
  { l: 'О проекте', p: 'about' },
  { l: 'Контакты', p: 'contacts' }];


  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled ? 'rgba(10,10,11,.98)' : 'rgba(13,13,14,.95)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border)',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.6)' : 'none',
      transition: 'box-shadow .2s'
    }}>
      <div style={{ height: 2, background: 'var(--acc)' }} />
      <div className="container" style={{ height: 60, display: 'flex', alignItems: 'center', gap: 24 }}>
        <V2Logo onClick={() => navigate('home')} />
        <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
          {nav.map(({ l, p }) => {
            const active = cur === p || p === 'news' && cur === 'news-cat' ||
            p === 'articles' && (cur === 'articles-cat' || cur === 'article-detail') ||
            p === 'brands' && cur === 'brand';
            return (
              <button key={p} onClick={() => navigate(p)} style={{
                fontFamily: 'Oswald,sans-serif', fontSize: 13, fontWeight: 500,
                letterSpacing: .6, textTransform: 'uppercase', padding: '8px 10px',
                color: active ? 'var(--acc)' : '#666',
                borderBottom: active ? '2px solid var(--acc)' : '2px solid transparent',
                transition: 'color .15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ddd'}
              onMouseLeave={(e) => e.currentTarget.style.color = active ? 'var(--acc)' : '#666'}>
                {l}</button>);

          })}
        </nav>
        <button style={{ color: '#555', padding: 8 }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ccc'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="nc-burger" onClick={() => setMob(!mob)}
        style={{ color: '#666', padding: 8, display: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      {mob &&
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '8px 0' }}>
          {nav.map(({ l, p }) =>
        <button key={p} onClick={() => {navigate(p);setMob(false);}} style={{
          display: 'block', width: '100%', textAlign: 'left', padding: '11px 20px',
          fontFamily: 'Oswald,sans-serif', fontSize: 15, color: '#aaa', letterSpacing: .4
        }}>{l}</button>
        )}
        </div>
      }
    </header>);

}

// ── Ticker ────────────────────────────────────────────────────
function V2Ticker() {
  const items = V2_ALL.slice(0, 10).map((a) => a.title);
  return (
    <div style={{ background: 'var(--acc)', height: 28, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{
        flexShrink: 0, background: '#8b0000', height: '100%',
        display: 'flex', alignItems: 'center', padding: '0 14px',
        fontFamily: 'Oswald,sans-serif', fontSize: 10, fontWeight: 700,
        letterSpacing: 1.5, color: '#fff', textTransform: 'uppercase'
      }}>Главное</div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{
          display: 'inline-block', whiteSpace: 'nowrap',
          animation: 'ncTicker 44s linear infinite',
          fontSize: 12, color: '#fff', fontWeight: 700,
          fontFamily: 'Oswald,sans-serif', letterSpacing: .3
        }}>
          {items.concat(items).map((t, i) =>
          <span key={i} style={{ marginRight: 64 }}>▸ {t}</span>
          )}
        </div>
      </div>
    </div>);

}

// ── Portal Hero (не слайдер) ──────────────────────────────────
function V2HeroPortal({ navigate }) {
  const chips = ['Новости рынка', 'Обзоры авто', 'Поставки', 'Таможня', 'Бренды Китая'];
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
    }}>
      {/* Real brand background — hero-bg (китайская карта с логотипом) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${window.__resources?.heroBg || 'brand/hero-bg.png'})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        filter: 'brightness(.55) saturate(1.2)'
      }} />
      {/* Dark gradient over BG — left heavy, right lighter */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(100deg, rgba(6,6,8,.96) 0%, rgba(6,6,8,.82) 45%, rgba(6,6,8,.4) 72%, transparent 100%)'
      }} />
      {/* Split-car brand image — right side */}
      <div className="nc-hero-car" style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: '58%', zIndex: 2, pointerEvents: 'none',
        backgroundImage: `url(${window.__resources?.bannerImg || 'brand/banner.png'})`,
        backgroundSize: 'contain', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat',
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.4) 20%, rgba(0,0,0,.8) 50%, rgba(0,0,0,.9) 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.4) 20%, rgba(0,0,0,.8) 50%, rgba(0,0,0,.9) 100%)',
        opacity: .8
      }} />
      {/* Red left accent bar */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--acc)', zIndex: 4 }} />
      {/* Subtle red glow bottom-right */}
      <div style={{
        position: 'absolute', right: '20%', bottom: '-10%', zIndex: 2, pointerEvents: 'none',
        width: 400, height: 300,
        background: 'radial-gradient(ellipse, rgba(215,38,31,.18) 0%, transparent 65%)'
      }} />

      {/* Content */}
      <div className="nc-hero-content" style={{ position: 'relative', zIndex: 3, padding: '52px 20px 24px 40px', maxWidth: 580 }} data-comment-anchor="159884d71b-div-173-7">
        <div style={{ maxWidth: 520 }}>
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18,
            background: 'rgba(215,38,31,.15)', border: '1px solid rgba(215,38,31,.35)',
            padding: '4px 14px'
          }}>
            <div style={{ width: 5, height: 5, background: 'var(--acc)', borderRadius: '50%' }} />
            <span style={{
              fontFamily: 'Oswald,sans-serif', fontSize: 10, fontWeight: 700,
              letterSpacing: 2.2, textTransform: 'uppercase', color: 'var(--acc)'
            }}>Информационный портал</span>
          </div>
          {/* H1 */}
          <h1 style={{
            fontFamily: 'Oswald,sans-serif', fontSize: 44, fontWeight: 700,
            fontStyle: 'italic', lineHeight: 1.1, marginBottom: 14, letterSpacing: .5,
            textShadow: '0 2px 16px rgba(0,0,0,.8)'
          }}>
            Ноускаты из Китая:<br />
            новости, обзоры,<br />
            поставки и рынок
          </h1>
          {/* Subtitle */}
          <p style={{ fontSize: 15, color: '#999', lineHeight: 1.75, marginBottom: 26, maxWidth: 500 }}>
            Следим за китайским авторынком, поставками ноускатов, логистикой,
            таможней, брендами и восстановлением автомобилей.
          </p>
          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
            <button onClick={() => navigate('news')} style={{
              background: 'var(--acc)', color: '#fff', padding: '12px 30px',
              fontFamily: 'Oswald,sans-serif', fontSize: 14, fontWeight: 700,
              letterSpacing: .8, textTransform: 'uppercase', transition: 'background .15s',
              boxShadow: '0 4px 20px rgba(215,38,31,.4)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e8302a'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--acc)'}>
              Читать новости</button>
            <button onClick={() => navigate('articles')} style={{
              background: 'rgba(255,255,255,.06)', color: '#ccc', padding: '12px 28px',
              fontFamily: 'Oswald,sans-serif', fontSize: 14, fontWeight: 700,
              letterSpacing: .8, textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,.2)', transition: 'all .15s',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,.12)';e.currentTarget.style.color = '#fff';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,.06)';e.currentTarget.style.color = '#ccc';}}>
              Смотреть обзоры</button>
          </div>
          {/* Topic chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {chips.map((chip) =>
            <button key={chip} onClick={() => navigate('news')} style={{
              background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)',
              color: '#888', fontSize: 11, padding: '5px 11px',
              fontFamily: 'Oswald,sans-serif', letterSpacing: .4, transition: 'all .15s'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.borderColor = 'var(--acc)';e.currentTarget.style.color = 'var(--acc)';}}
            onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)';e.currentTarget.style.color = '#888';}}>
              {chip}</button>
            )}
          </div>
        </div>
      </div>

      {/* Trust bar — из брендбука */}
      <div style={{
        position: 'relative', zIndex: 4, width: '100%',
        background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255,255,255,.06)',
        marginTop: 'auto'
      }}>
        <div style={{ padding: '14px 40px' }}>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
            { icon: '✓', text: 'Проверенные поставки' },
            { icon: '◈', text: 'Широкий выбор носкатов' },
            { icon: '◉', text: 'Честность и опыт' },
            { icon: '◎', text: 'Реальные примеры' }].
            map(({ icon, text }) =>
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--acc)', fontSize: 13, fontWeight: 700 }}>{icon}</span>
                <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: 12, fontWeight: 600,
                letterSpacing: .6, color: '#aaa', textTransform: 'uppercase' }}>{text}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom spacer removed — trust bar handles its own spacing */}
    </div>);

}

// ── Featured Slider ("Главное сегодня") ───────────────────────
function V2FeaturedSlider({ navigate }) {
  const slides = V2_ALL.slice(0, 3);
  const [idx, setIdx] = uS(0);
  const tmr = uR(null);
  const start = () => {clearInterval(tmr.current);tmr.current = setInterval(() => setIdx((i) => (i + 1) % 3), 5500);};
  uE(() => {start();return () => clearInterval(tmr.current);}, []);
  const go = (n) => {setIdx(n);start();};
  const s = slides[idx];
  return (
    <div style={{ position: 'relative', height: 320, overflow: 'hidden', background: '#06060a' }}>
      {slides.map((sl, i) =>
      <div key={sl.id} style={{
        position: 'absolute', inset: 0, opacity: i === idx ? 1 : 0, transition: 'opacity .5s',
        background: `linear-gradient(135deg, ${sl.bg} 0%, #040406 100%)`,
        pointerEvents: i === idx ? 'auto' : 'none'
      }}>
          <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.3) 60%,transparent 100%)'
        }} />
        </div>
      )}
      <div className="container" style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, paddingBottom: 30
      }}>
        <V2Badge cat={s.cat} />
        <h2 style={{
          fontFamily: 'Oswald,sans-serif', fontSize: 28, fontWeight: 700,
          fontStyle: 'italic', lineHeight: 1.2, maxWidth: 580
        }}>{s.title}</h2>
        <p style={{ color: '#888', maxWidth: 480, fontSize: 13 }}>{s.excerpt}</p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4 }}>
          <button onClick={() => navigate(s.type === 'news' ? 'news-detail' : 'article-detail', { article: s })} style={{
            background: 'var(--acc)', color: '#fff', padding: '8px 22px',
            fontFamily: 'Oswald,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: .6
          }}>Читать далее</button>
          <span style={{ fontSize: 12, color: '#555' }}>{s.date}</span>
          {'readMins' in s && <span style={{ fontSize: 12, color: '#444' }}><V2ClockIcon />{s.readMins} мин</span>}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5, zIndex: 3 }}>
        {slides.map((_, i) =>
        <button key={i} onClick={() => go(i)} style={{
          width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
          background: i === idx ? 'var(--acc)' : 'rgba(255,255,255,.25)',
          transition: 'all .25s'
        }} />
        )}
      </div>
    </div>);

}

// ── News Card (compact horizontal) ───────────────────────────
function V2NewsCard({ art, navigate }) {
  const [h, setH] = uS(false);
  return (
    <div onClick={() => navigate('news-detail', { article: art })}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{
      display: 'flex', gap: 12, cursor: 'pointer', padding: '11px 0',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ flexShrink: 0, width: 86, height: 62, overflow: 'hidden' }}>
        <V2Img bg={art.bg} height="62px" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <V2Badge cat={art.cat} />
        <p style={{
          fontFamily: 'Oswald,sans-serif', fontSize: 14, fontWeight: 600,
          lineHeight: 1.3, marginTop: 4, color: h ? 'var(--acc)' : '#d8d8d8',
          transition: 'color .15s',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{art.title}</p>
        <div style={{ fontSize: 11, color: '#444', marginTop: 3 }}>
          {art.date}&nbsp;·&nbsp;<V2EyeIcon />{v2Num(art.views)}
        </div>
      </div>
    </div>);

}

// ── Review Card (visual with reading time) ────────────────────
function V2ReviewCard({ art, navigate }) {
  const [h, setH] = uS(false);
  return (
    <div className="nc-card" onClick={() => navigate('article-detail', { article: art })}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ borderColor: h ? 'var(--acc)' : 'var(--border)' }}>
      <V2Img bg={art.bg} cat={art.cat} aspect="54%" />
      <div style={{ padding: '13px 15px 15px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 7, flexWrap: 'wrap' }}>
          <V2Badge cat={art.cat} />
          <span style={{ fontSize: 11, color: '#444' }}>{art.date}</span>
          {art.readMins &&
          <span style={{ fontSize: 11, color: '#444', marginLeft: 'auto' }}>
              <V2ClockIcon />{art.readMins} мин
            </span>
          }
        </div>
        <h3 style={{
          fontFamily: 'Oswald,sans-serif', fontSize: 16, fontWeight: 600,
          lineHeight: 1.3, color: h ? 'var(--acc)' : '#ddd', transition: 'color .15s',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{art.title}</h3>
        <p style={{
          fontSize: 12, color: '#5a5a5a', lineHeight: 1.5, marginTop: 6,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{art.excerpt}</p>
        <div style={{ fontSize: 11, color: '#3a3a3a', marginTop: 8 }}>
          <V2EyeIcon />{v2Num(art.views)}{art.brand && <span style={{ marginLeft: 8, color: '#444' }}>{art.brand}</span>}
        </div>
      </div>
    </div>);

}

// ── Large card (featured) ─────────────────────────────────────
function V2LargeCard({ art, navigate }) {
  const isReview = art.type === 'review';
  const [h, setH] = uS(false);
  return (
    <div className="nc-card" onClick={() => navigate(isReview ? 'article-detail' : 'news-detail', { article: art })}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ borderColor: h ? 'var(--acc)' : 'var(--border)' }}>
      <V2Img bg={art.bg} cat={art.cat} aspect="50%" />
      <div style={{ padding: '16px 18px 18px' }}>
        <V2Badge cat={art.cat} />
        <h3 style={{
          fontFamily: 'Oswald,sans-serif', fontSize: 20, fontWeight: 700,
          fontStyle: 'italic', lineHeight: 1.2, margin: '9px 0 8px',
          color: h ? 'var(--acc)' : 'var(--text)', transition: 'color .15s'
        }}>{art.title}</h3>
        <p style={{ fontSize: 13, color: '#5a5a5a', lineHeight: 1.55, marginBottom: 10 }}>{art.excerpt}</p>
        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#444' }}>
          <span>{art.date}</span>
          {art.readMins && <span><V2ClockIcon />{art.readMins} мин</span>}
          <span style={{ marginLeft: 'auto' }}><V2EyeIcon />{v2Num(art.views)}</span>
        </div>
      </div>
    </div>);

}

// ── Sidebar ───────────────────────────────────────────────────
function V2Sidebar({ navigate }) {
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Hot topics */}
      <div>
        <div className="nc-section-title">Горячие темы</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Ноускаты Haval', 'BYD 2026', 'Таможня 2026', 'Chery ноускат', 'Omoda C5', 'Поставки Китай'].map((t) =>
          <button key={t} onClick={() => navigate('news')} style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            color: '#777', fontSize: 12, padding: '5px 10px',
            fontFamily: 'Oswald,sans-serif', letterSpacing: .3, transition: 'all .15s'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.borderColor = 'var(--acc)';e.currentTarget.style.color = 'var(--acc)';}}
          onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'var(--border)';e.currentTarget.style.color = '#777';}}>
            {t}</button>
          )}
        </div>
      </div>
      {/* Popular */}
      <div>
        <div className="nc-section-title">Популярное</div>
        {[...V2_ALL].sort((a, b) => b.views - a.views).slice(0, 5).map((art, i) =>
        <div key={art.id} onClick={() => navigate(art.type === 'news' ? 'news-detail' : 'article-detail', { article: art })}
        style={{ display: 'flex', gap: 10, cursor: 'pointer', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{
            flexShrink: 0, width: 22, height: 22, background: 'var(--bg3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: i === 0 ? 'var(--acc)' : '#555',
            fontFamily: 'Oswald,sans-serif'
          }}>{i + 1}</span>
            <div>
              <p style={{
              fontSize: 13, fontFamily: 'Oswald,sans-serif', fontWeight: 500,
              lineHeight: 1.3, color: '#bbb',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}>{art.title}</p>
              <span style={{ fontSize: 11, color: '#444', marginTop: 2, display: 'block' }}>
                <V2EyeIcon />{v2Num(art.views)}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Бренды */}
      <div>
        <div className="nc-section-title">Бренды</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {V2_BRANDS.map((b) =>
          <button key={b.slug} onClick={() => navigate('brand', { brand: b })} style={{
            background: `${b.color}15`, border: `1px solid ${b.color}30`,
            color: '#888', fontSize: 11, padding: '4px 10px',
            fontFamily: 'Oswald,sans-serif', fontWeight: 700, letterSpacing: .5,
            transition: 'all .15s'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.borderColor = b.color;e.currentTarget.style.color = '#eee';}}
          onMouseLeave={(e) => {e.currentTarget.style.borderColor = `${b.color}30`;e.currentTarget.style.color = '#888';}}>
            {b.name}</button>
          )}
        </div>
      </div>
    </aside>);

}

// ── Brand Nav ─────────────────────────────────────────────────
function V2BrandNav({ navigate }) {
  return (
    <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', minWidth: 'max-content' }}>
          <div style={{
            flexShrink: 0, padding: '0 16px', borderRight: '1px solid var(--border)',
            display: 'flex', alignItems: 'center',
            fontFamily: 'Oswald,sans-serif', fontSize: 10, color: '#444',
            letterSpacing: 1.2, textTransform: 'uppercase'
          }}>Бренды</div>
          {V2_BRANDS.map((b) =>
          <button key={b.slug} onClick={() => navigate('brand', { brand: b })} style={{
            padding: '9px 15px', fontFamily: 'Oswald,sans-serif', fontSize: 13,
            fontWeight: 700, color: '#555', borderRight: '1px solid var(--border)',
            letterSpacing: .4, flexShrink: 0, transition: 'all .15s'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.color = 'var(--acc)';e.currentTarget.style.background = 'var(--bg3)';}}
          onMouseLeave={(e) => {e.currentTarget.style.color = '#555';e.currentTarget.style.background = 'transparent';}}>
            {b.name}</button>
          )}
        </div>
      </div>
    </div>);

}

// ── Cat Tabs ──────────────────────────────────────────────────
function V2CatTabs({ cats, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 20, overflowX: 'auto' }}>
      {['all', ...cats].map((c) =>
      <button key={c} onClick={() => onChange(c)} style={{
        padding: '9px 14px', fontFamily: 'Oswald,sans-serif', fontSize: 13, fontWeight: 600,
        letterSpacing: .4, flexShrink: 0,
        color: active === c ? 'var(--acc)' : '#555',
        borderBottom: active === c ? '2px solid var(--acc)' : '2px solid transparent',
        transition: 'color .15s'
      }}>{c === 'all' ? 'Все' : c}</button>
      )}
    </div>);

}

// ── Pagination ────────────────────────────────────────────────
function V2Pagination({ page, total, onChange }) {
  if (total <= 1) return null;
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 28 }}>
      {['←', ...Array.from({ length: total }, (_, i) => i + 1), '→'].map((p, i) => {
        const isArrow = p === '←' || p === '→';
        const pg = isArrow ? p === '←' ? page - 1 : page + 1 : p;
        const disabled = p === '←' && page === 1 || p === '→' && page === total;
        return (
          <button key={i} onClick={() => !disabled && onChange(pg)} style={{
            minWidth: 34, height: 32, padding: '0 8px',
            background: p === page ? 'var(--acc)' : 'var(--bg3)',
            border: '1px solid', borderColor: p === page ? 'var(--acc)' : 'var(--border)',
            color: disabled ? '#333' : p === page ? '#fff' : '#666',
            fontFamily: 'Oswald,sans-serif', fontSize: 13, fontWeight: 700,
            cursor: disabled ? 'default' : 'pointer', transition: 'all .15s'
          }}>{p}</button>);

      })}
    </div>);

}

// ── Breadcrumbs ───────────────────────────────────────────────
function V2Crumbs({ items, navigate }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#444', marginBottom: 20, flexWrap: 'wrap' }}>
      {items.map((item, i) =>
      <React.Fragment key={i}>
          {i > 0 && <span style={{ color: '#2a2a2a' }}>›</span>}
          {item.page ?
        <button onClick={() => navigate(item.page, item.params || {})} style={{
          color: '#555', fontSize: 12, transition: 'color .15s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--acc)'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
          {item.label}</button> :
        <span style={{ color: '#666' }}>{item.label}</span>}
        </React.Fragment>
      )}
    </div>);

}

// ── FAQ Accordion ─────────────────────────────────────────────
function V2Faq({ items }) {
  const [open, setOpen] = uS(null);
  const list = items || V2_FAQ;
  return (
    <div>
      {list.map((it, i) =>
      <div key={i} style={{
        borderBottom: '1px solid var(--border)',
        background: open === i ? 'var(--bg3)' : 'transparent', transition: 'background .15s'
      }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', padding: '15px 16px', textAlign: 'left', gap: 12
        }}>
            <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: 16, fontWeight: 600, color: '#ddd' }}>{it.q}</span>
            <span style={{
            color: open === i ? 'var(--acc)' : '#555', fontSize: 18, flexShrink: 0,
            transition: 'transform .2s,color .15s', transform: open === i ? 'rotate(45deg)' : 'none'
          }}>+</span>
          </button>
          {open === i &&
        <div style={{ padding: '0 16px 15px', fontSize: 14, color: '#888', lineHeight: 1.75 }}>{it.a}</div>
        }
        </div>
      )}
    </div>);

}

// ── Cookie Banner v2 (с настройками) ─────────────────────────
function V2Cookie({ onAccept }) {
  const [vis, setVis] = uS(true);
  const [settings, setSettings] = uS(false);
  const [analytics, setAnalytics] = uS(false);
  if (!vis) return null;
  const accept = (all) => {setVis(false);onAccept(all || analytics);};
  return (
    <>
      {/* Banner */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
        background: 'var(--bg3)', borderTop: '2px solid var(--border)',
        padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center',
        flexWrap: 'wrap', boxShadow: '0 -4px 24px rgba(0,0,0,.5)'
      }}>
        <p style={{ flex: 1, minWidth: 240, fontSize: 13, color: '#888', lineHeight: 1.5 }}>
          Используем cookie для улучшения работы портала.
          Аналитика (Яндекс.Метрика) загружается только после вашего согласия.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
          <button onClick={() => accept(true)} style={{
            background: 'var(--acc)', color: '#fff', padding: '8px 20px',
            fontFamily: 'Oswald,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: .5
          }}>Принять всё</button>
          <button onClick={() => accept(false)} style={{
            background: 'var(--bg4)', color: '#888', padding: '8px 16px',
            fontFamily: 'Oswald,sans-serif', fontSize: 13, border: '1px solid var(--border)'
          }}>Только необходимые</button>
          <button onClick={() => setSettings(true)} style={{
            background: 'transparent', color: '#666', padding: '8px 14px',
            fontFamily: 'Oswald,sans-serif', fontSize: 13, border: '1px solid var(--border)',
            transition: 'all .15s'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#888';e.currentTarget.style.color = '#ccc';}}
          onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'var(--border)';e.currentTarget.style.color = '#666';}}>
            Настройки ⚙</button>
        </div>
      </div>
      {/* Settings modal */}
      {settings &&
      <div style={{
        position: 'fixed', inset: 0, zIndex: 950,
        background: 'rgba(0,0,0,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }} onClick={() => setSettings(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
          background: 'var(--bg3)', border: '1px solid var(--border)',
          width: 'min(480px,calc(100vw-32px))', maxHeight: '90vh', overflow: 'auto',
          boxShadow: '0 12px 60px rgba(0,0,0,.8)'
        }}>
            <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 20px', borderBottom: '1px solid var(--border)'
          }}>
              <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: 16, fontWeight: 700, letterSpacing: .5 }}>
                Настройки cookie
              </span>
              <button onClick={() => setSettings(false)} style={{ color: '#666', fontSize: 22, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '20px' }}>
              {/* Necessary */}
              <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              padding: '14px 0', borderBottom: '1px solid var(--border)'
            }}>
                <div>
                  <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 15, fontWeight: 600, color: '#ddd' }}>
                    Необходимые cookie
                  </div>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4, lineHeight: 1.5 }}>
                    Обеспечивают базовую работу сайта. Отключить невозможно.
                  </p>
                </div>
                <div style={{
                flexShrink: 0, marginLeft: 16,
                background: '#374151', borderRadius: 12, padding: '3px 8px',
                fontSize: 11, color: '#888', fontFamily: 'Oswald,sans-serif'
              }}>Всегда вкл.</div>
              </div>
              {/* Analytics */}
              <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              padding: '14px 0', borderBottom: '1px solid var(--border)'
            }}>
                <div>
                  <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 15, fontWeight: 600, color: '#ddd' }}>
                    Аналитические cookie
                  </div>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4, lineHeight: 1.5 }}>
                    Яндекс.Метрика: статистика посещений и поведения пользователей на сайте.
                  </p>
                </div>
                {/* Toggle */}
                <button onClick={() => setAnalytics(!analytics)} style={{
                flexShrink: 0, marginLeft: 16, width: 44, height: 24,
                borderRadius: 12, padding: '2px',
                background: analytics ? 'var(--acc)' : '#2a2a2a',
                border: `2px solid ${analytics ? 'var(--acc)' : '#444'}`,
                cursor: 'pointer', transition: 'all .2s', position: 'relative'
              }}>
                  <div style={{
                  width: 16, height: 16, borderRadius: '50%', background: '#fff',
                  transform: analytics ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'transform .2s'
                }} />
                </button>
              </div>
              <button onClick={() => {setSettings(false);accept(analytics);}} style={{
              display: 'block', width: '100%', marginTop: 20,
              background: 'var(--acc)', color: '#fff', padding: '11px',
              fontFamily: 'Oswald,sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: .6
            }}>Сохранить настройки</button>
            </div>
          </div>
        </div>
      }
    </>);

}

// ── Tweaks Panel ──────────────────────────────────────────────
function V2Tweaks({ tweaks, setTweak, onClose }) {
  return (
    <div style={{
      position: 'fixed', bottom: 80, right: 20, zIndex: 500,
      background: 'var(--bg3)', border: '1px solid var(--border)',
      width: 230, boxShadow: '0 8px 40px rgba(0,0,0,.7)'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 14px', borderBottom: '1px solid var(--border)',
        fontFamily: 'Oswald,sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: .8
      }}>
        <span>Tweaks</span>
        <button onClick={onClose} style={{ color: '#666', fontSize: 18 }}>×</button>
      </div>
      <div style={{ padding: '14px' }}>
        <div style={{ fontSize: 11, color: '#555', letterSpacing: .8, marginBottom: 8,
          fontFamily: 'Oswald,sans-serif', textTransform: 'uppercase' }}>Акцентный цвет</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['#D7261F', '#1A4FA3', '#e07b18'].map((c) =>
          <div key={c} onClick={() => setTweak('accentColor', c)} style={{
            width: 30, height: 30, background: c, cursor: 'pointer',
            border: tweaks.accentColor === c ? '2px solid #fff' : '2px solid transparent',
            transition: 'transform .15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'} />

          )}
        </div>
        <div style={{ fontSize: 11, color: '#555', letterSpacing: .8, marginBottom: 8,
          fontFamily: 'Oswald,sans-serif', textTransform: 'uppercase' }}>Карточки обзоров</div>
        {[{ v: 'grid', l: 'Сетка' }, { v: 'list', l: 'Список' }].map((o) =>
        <button key={o.v} onClick={() => setTweak('reviewLayout', o.v)} style={{
          display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', marginBottom: 4,
          background: tweaks.reviewLayout === o.v ? 'rgba(215,38,31,.12)' : 'var(--bg4)',
          border: `1px solid ${tweaks.reviewLayout === o.v ? 'var(--acc)' : 'var(--border)'}`,
          color: tweaks.reviewLayout === o.v ? 'var(--acc)' : '#666',
          fontFamily: 'Oswald,sans-serif', fontSize: 13, letterSpacing: .4, transition: 'all .15s'
        }}>{o.l}</button>
        )}
      </div>
    </div>);

}

// ── Footer v2 (полный) ────────────────────────────────────────
function V2Footer({ navigate }) {
  const col = (title, links) =>
  <div>
      <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 12, fontWeight: 700,
      letterSpacing: 1.2, textTransform: 'uppercase', color: '#444', marginBottom: 14 }}>
        {title}
      </div>
      {links.map(({ l, p, params }) =>
    <button key={l} onClick={() => p && navigate(p, params || {})} style={{
      display: 'block', fontSize: 13, color: '#4a4a4a', marginBottom: 8,
      textAlign: 'left', transition: 'color .15s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--acc)'}
    onMouseLeave={(e) => e.currentTarget.style.color = '#4a4a4a'}>
      {l}</button>
    )}
    </div>;

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '2px solid var(--border)', marginTop: 60 }}>
      <div style={{ height: 2, background: `linear-gradient(90deg,var(--acc) 0%,transparent 50%)` }} />
      <div className="container" style={{ padding: '40px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <V2Logo onClick={() => navigate('home')} />
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, marginTop: 14, maxWidth: 260 }}>
              Информационный портал о ноускатах и передних частях автомобилей из Китая.
              Новости, обзоры, кейсы и аналитика рынка.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {['VK', 'TG', 'YT'].map((s) =>
              <div key={s} style={{
                width: 30, height: 30, background: 'var(--bg3)',
                border: '1px solid var(--border)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#444', cursor: 'pointer',
                fontFamily: 'Oswald,sans-serif', transition: 'all .15s'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.borderColor = 'var(--acc)';e.currentTarget.style.color = 'var(--acc)';}}
              onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'var(--border)';e.currentTarget.style.color = '#444';}}>
                {s}</div>
              )}
            </div>
          </div>
          {col('Материалы', [
          { l: 'Новости', p: 'news' },
          { l: 'Статьи', p: 'articles' },
          { l: 'Бренды', p: 'brands' },
          { l: 'Обзоры', p: 'articles' },
          { l: 'Аналитика', p: 'articles' }]
          )}
          {col('О проекте', [
          { l: 'О нас', p: 'about' },
          { l: 'Контакты', p: 'contacts' },
          { l: 'Реклама', p: 'advertising' }]
          )}
          {col('Правовое', [
          { l: 'Политика конфиденциальности', p: 'legal-privacy' },
          { l: 'Cookie-политика', p: 'legal-cookies' },
          { l: 'Пользовательское соглашение', p: 'legal-terms' }]
          )}
        </div>
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 16,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
          gap: 8, fontSize: 12, color: '#333'
        }}>
          <span>© 2026 NOSECUT CHINA. Все права защищены.</span>
          <span>Информационный портал · Не является публичной офертой</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, {
  V2Logo, V2Header, V2Ticker, V2HeroPortal, V2FeaturedSlider,
  V2NewsCard, V2ReviewCard, V2LargeCard,
  V2Sidebar, V2BrandNav, V2CatTabs,
  V2Pagination, V2Crumbs, V2Faq,
  V2Cookie, V2Tweaks, V2Footer
});