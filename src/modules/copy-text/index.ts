/**
 * Кнопка «Скопировать»: копирует текст в буфер и показывает уведомление.
 *
 *   <button data-module="copy-text" data-copy="hello@example.com" data-copied="E-mail скопирован">…</button>
 *
 * Буфер обмена доступен только на https и localhost. Если браузер не дал
 * скопировать — открываем почтовую программу (mailto), чтобы кнопка всё равно работала.
 */
import { createDisposer } from 'kit/js/core/lifecycle.js'
import { toast } from 'kit/js/modules/toast/index.js'

export default function copyText(button: HTMLElement) {
  const d = createDisposer()
  d.listen(button, 'click', async () => {
    const text = button.dataset.copy ?? ''
    try {
      await navigator.clipboard.writeText(text)
      toast(button.dataset.copied ?? text, { type: 'success', duration: 2500 })
      button.classList.add('is-copied')
      setTimeout(() => button.classList.remove('is-copied'), 1500)
    } catch {
      if (text.includes('@')) location.href = `mailto:${text}`
    }
  })
  return { destroy: d.dispose }
}
