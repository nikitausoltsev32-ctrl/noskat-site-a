'use client'

export default function CookieSettingsButton({ context = 'footer' }: { context?: 'header' | 'footer' }) {
  function open() {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'))
  }
  return (
    <button
      onClick={open}
      aria-label={`Настройки cookie (${context})`}
      className="text-sm text-text-muted hover:text-text-secondary transition-colors text-left"
    >
      Настройки cookie
    </button>
  )
}
