'use client'
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'nc_cookie_consent'

interface Consent { necessary: true; analytics: boolean }

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [settings, setSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) setVisible(true)
    else {
      const consent: Consent = JSON.parse(saved)
      if (consent.analytics) loadMetrika()
    }
  }, [])

  function loadMetrika() {
    if (typeof window !== 'undefined' && !(window as any).yaCounter) {
      // ym(XXXXXXXX, 'init', { ... })
    }
  }

  function acceptAll() {
    const consent: Consent = { necessary: true, analytics: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    loadMetrika()
    setVisible(false)
  }

  function acceptNecessary() {
    const consent: Consent = { necessary: true, analytics: false }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    setVisible(false)
  }

  function saveSettings() {
    const consent: Consent = { necessary: true, analytics }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    if (analytics) loadMetrika()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-bg-elevated border border-border p-4 shadow-2xl">
      <p className="text-sm text-text-secondary mb-3">
        Мы используем cookie для улучшения работы сайта. Аналитические cookie подключаются только с вашего согласия.
      </p>
      {settings ? (
        <div className="mb-3">
          <div className="flex items-center justify-between py-2 border-t border-border">
            <span className="text-xs text-text-secondary">Необходимые</span>
            <span className="text-xs text-text-muted">Всегда включены</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border">
            <span className="text-xs text-text-secondary">Аналитические (Яндекс.Метрика)</span>
            <button
              onClick={() => setAnalytics(!analytics)}
              className={`w-10 h-5 rounded-full transition-colors ${analytics ? 'bg-acc' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform mx-0.5 ${analytics ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <button onClick={saveSettings} className="w-full mt-3 py-2 text-xs font-heading tracking-wider uppercase bg-acc text-white hover:bg-acc-hover transition-colors">
            Сохранить настройки
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button onClick={acceptAll} className="py-2 text-xs font-heading tracking-wider uppercase bg-acc text-white hover:bg-acc-hover transition-colors">
            Принять всё
          </button>
          <div className="flex gap-2">
            <button onClick={acceptNecessary} className="flex-1 py-2 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:text-text-secondary hover:border-text-muted transition-colors">
              Только необходимые
            </button>
            <button onClick={() => setSettings(true)} className="flex-1 py-2 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:text-text-secondary hover:border-text-muted transition-colors">
              Настройки
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
