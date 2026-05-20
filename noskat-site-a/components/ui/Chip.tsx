import { clsx } from 'clsx'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export default function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-1.5 text-xs font-heading tracking-wider uppercase rounded-full border transition-colors',
        active
          ? 'border-acc bg-acc/10 text-acc'
          : 'border-border text-text-muted hover:border-text-muted hover:text-text-secondary',
      )}
    >
      {label}
    </button>
  )
}
