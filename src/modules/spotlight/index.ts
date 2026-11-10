/**
 * «Прожектор»: подсветка карточки следует за курсором, а сама карточка
 * наклоняется к нему в 3D.
 *
 *   <div data-module="spotlight"> <article class="spot">…</article> … </div>
 *
 * Подсветка: координаты курсора пишутся в --spot-x / --spot-y карточки .spot,
 * свечение рисует CSS (radial-gradient).
 *
 * Наклон: курсор слева — левый край «уходит» вглубь, справа — правый; так же
 * по вертикали. Поворот делает GSAP (rotationX / rotationY с перспективой):
 * он же двигает карточки при появлении и в фильтре проектов, поэтому
 * анимации складываются, а не затирают друг друга. Курсор ушёл — карточка
 * плавно возвращается. Выключить наклон: data-spotlight-tilt="0" на блоке.
 *
 * Один обработчик на весь блок (делегирование), только при мыши.
 */
import { gsap } from 'kit/js/core/gsap.js'
import { createDisposer } from 'kit/js/core/lifecycle.js'
import { canHover } from 'kit/js/core/env.js'

/** Наклон небольшой карточки, градусы. Широкие наклоняются слабее (см. tiltAngles). */
const MAX_TILT = 7

/**
 * Углы наклона по положению курсора в карточке.
 * Край широкой карточки при том же угле уходит вглубь сильнее, поэтому угол
 * уменьшается пропорционально размеру (эталон — 360px).
 * @returns rotationX / rotationY в градусах
 */
export function tiltAngles(
  rect: { left: number; top: number; width: number; height: number },
  pointer: { x: number; y: number },
  max = MAX_TILT,
) {
  const nx = ((pointer.x - rect.left) / rect.width) * 2 - 1 // −1 слева … 1 справа
  const ny = ((pointer.y - rect.top) / rect.height) * 2 - 1
  const clamp = (v: number) => Math.min(Math.max(v, -1), 1)
  return {
    rotationX: -clamp(ny) * max * Math.min(1, 360 / rect.height),
    rotationY: clamp(nx) * max * Math.min(1, 360 / rect.width),
  }
}

export default function spotlight(root: HTMLElement, ctx: { reduced?: boolean } = {}) {
  if (!canHover()) return undefined
  const d = createDisposer()
  const tilt = !ctx.reduced && root.dataset.spotlightTilt !== '0'
  let active: HTMLElement | null = null

  const release = (card: HTMLElement) => {
    gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.9, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' })
  }

  d.listen(root, 'pointermove', (event: PointerEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.spot')
    if (card !== active) {
      if (active && tilt) release(active)
      active = card
    }
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    if (!tilt) return
    gsap.to(card, {
      ...tiltAngles(rect, { x: event.clientX, y: event.clientY }),
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  })
  d.listen(root, 'pointerleave', () => {
    if (active && tilt) release(active)
    active = null
  })
  d.add(() => {
    if (tilt) gsap.set(root.querySelectorAll('.spot'), { clearProps: 'rotationX,rotationY,transformPerspective' })
  })
  return { destroy: d.dispose }
}
