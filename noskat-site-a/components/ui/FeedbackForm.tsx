'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

const SUBJECTS = [
  'Запрос по 152-ФЗ',
  'Вопрос по заявке',
  'Ошибка на сайте',
  'Предложение',
  'Жалоба',
  'Другое',
]

const inputCls = 'w-full bg-bg-elevated border border-border px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-acc outline-none transition-colors'

export default function FeedbackForm() {
  const [agreed, setAgreed] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="border border-border bg-bg-card p-8 text-center">
        <div className="h-0.5 w-10 bg-acc mx-auto mb-6" />
        <p className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary mb-3">Обращение отправлено</p>
        <p className="text-sm text-text-secondary">Мы постараемся ответить в течение нескольких рабочих дней.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        required
        placeholder="Ваше имя"
        className={inputCls}
      />
      <input
        type="email"
        placeholder="Email (необязательно — для ответа)"
        className={inputCls}
      />
      <select required defaultValue="" className={`${inputCls} appearance-none`}>
        <option value="" disabled>Тема обращения</option>
        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea
        required
        minLength={10}
        rows={5}
        placeholder="Опишите ваш вопрос, проблему или запрос (минимум 10 символов)"
        className={`${inputCls} resize-none`}
      />
      <label className="flex gap-3 items-start cursor-pointer text-xs text-text-muted leading-relaxed">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="mt-0.5 shrink-0 accent-acc"
        />
        <span>
          Отправляя обращение, я даю согласие на обработку моих персональных данных в целях рассмотрения обращения и связи со мной в соответствии с 152-ФЗ.
          Подтверждаю, что ознакомлен(а) с{' '}
          <Link href={ROUTES.privacy} className="underline hover:text-text-secondary transition-colors">
            Политикой обработки персональных данных
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        disabled={!agreed}
        className="py-3 px-8 text-sm font-heading tracking-wider uppercase bg-acc text-white hover:bg-acc-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Отправить обращение
      </button>
    </form>
  )
}
