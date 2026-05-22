'use client'

export default function CookieSettingsButton() {
  function open() {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'))
  }
  return (
    <button
      onClick={open}
      className="text-sm text-text-muted hover:text-text-secondary transition-colors text-left"
    >
      Настройки cookie
    </button>
  )
}
