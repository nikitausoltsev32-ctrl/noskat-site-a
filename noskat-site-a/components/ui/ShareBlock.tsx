'use client'

export default function ShareBlock({ title }: { title: string }) {
  function copy() {
    navigator.clipboard.writeText(window.location.href)
  }

  function share(via: 'vk' | 'tg') {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    const href = via === 'vk'
      ? `https://vk.com/share.php?url=${url}`
      : `https://t.me/share/url?url=${url}&text=${text}`
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border">
      <span className="font-heading text-xs tracking-widest uppercase text-text-muted">Поделиться:</span>
      <button onClick={() => share('vk')}
        className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:border-acc hover:text-acc transition-colors">
        ВКонтакте
      </button>
      <button onClick={() => share('tg')}
        className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:border-acc hover:text-acc transition-colors">
        Telegram
      </button>
      <button onClick={copy}
        className="px-3 py-1.5 text-xs font-heading tracking-wider uppercase border border-border text-text-muted hover:border-acc hover:text-acc transition-colors">
        Скопировать ссылку
      </button>
    </div>
  )
}
