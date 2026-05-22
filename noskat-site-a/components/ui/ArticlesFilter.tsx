'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function ArticlesFilter() {
  const router = useRouter()
  const params = useSearchParams()
  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'new'

  const push = useCallback((next: URLSearchParams) => {
    router.push(`?${next.toString()}`, { scroll: false })
  }, [router])

  function onSearch(value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set('q', value); else next.delete('q')
    next.delete('page')
    push(next)
  }

  function setSort(value: string) {
    const next = new URLSearchParams(params.toString())
    next.set('sort', value)
    next.delete('page')
    push(next)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="search"
        value={q}
        onChange={e => onSearch(e.target.value)}
        placeholder="Поиск по статьям..."
        className="flex-1 bg-bg-elevated border border-border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-acc outline-none transition-colors"
      />
      <div className="flex shrink-0">
        <button
          onClick={() => setSort('new')}
          className={`px-4 py-2.5 text-xs font-heading tracking-wider uppercase border border-border transition-colors ${sort !== 'old' ? 'bg-acc text-white border-acc' : 'text-text-muted hover:text-text-secondary'}`}
        >
          Новые
        </button>
        <button
          onClick={() => setSort('old')}
          className={`px-4 py-2.5 text-xs font-heading tracking-wider uppercase border border-l-0 border-border transition-colors ${sort === 'old' ? 'bg-acc text-white border-acc' : 'text-text-muted hover:text-text-secondary'}`}
        >
          Старые
        </button>
      </div>
    </div>
  )
}
