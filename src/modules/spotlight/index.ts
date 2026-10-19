/**
 * «Прожектор»: подсветка карточки следует за курсором.
 *
 *   <div data-module="spotlight"> <article class="spot">…</article> … </div>
 *
 * Пишет координаты курсора в --spot-x / --spot-y каждой карточки .spot
 * внутри блока; свечение рисует CSS (radial-gradient). Один обработчик на
 * весь блок (делегирование), только при мыши.
 */
import { createDisposer } from 'kit/js/core/lifecycle.js'
import { canHover } from 'kit/js/core/env.js'

export default function spotlight(root: HTMLElement) {
  if (!canHover()) return undefined
  const d = createDisposer()
  d.listen(root, 'pointermove', (event: PointerEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.spot')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  })
  return { destroy: d.dispose }
}
