/**
 * «Уход вглубь»: при прокрутке блок отклоняется назад, уменьшается и тает —
 * как лист, который кладут на стол. Следующий блок наезжает поверх.
 *
 *   <div data-module="recede">…</div>
 *
 * Анимация привязана к прокрутке (ScrollTrigger scrub): сколько прокрутили —
 * настолько и отклонился. Начинается, когда верх блока-родителя (секции)
 * дошёл до верха экрана, заканчивается, когда секция ушла целиком.
 * «Меньше движения» — выключено.
 */
import { gsap } from 'kit/js/core/gsap.js'

export default function recede(el: HTMLElement, ctx: { reduced?: boolean } = {}) {
  if (ctx.reduced) return undefined
  // Перспектива и точка вращения — постоянные, их ставим ОДИН раз до анимации.
  // Если положить их в gsap.to, GSAP начнёт анимировать и их тоже: перспектива
  // поедет от 0 до 1100 вместе с углом. Искажение зависит от отношения
  // «глубина / перспектива», а оно при этом не меняется — блок на первом же
  // пикселе прокрутки скачком сжимается на ~11% и дальше в глубину не уходит.
  gsap.set(el, { transformPerspective: 1100, transformOrigin: '50% 100%' })
  const tween = gsap.to(el, {
    rotationX: 14,
    scale: 0.88,
    yPercent: -6,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: el.parentElement ?? el, start: 'top top', end: 'bottom top', scrub: true },
  })
  return {
    destroy() {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(el, { clearProps: 'transform,transformOrigin,opacity' })
    },
  }
}
