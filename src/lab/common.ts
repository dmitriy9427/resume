/**
 * ВРЕМЕННО: общее для прототипов — кнопка темы и состояние мыши для курсоров.
 */

export type Theme = 'dark' | 'light'

export const theme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

/** Кнопка «Ночь/День»: тема на <html>, запоминаем, шлём lab:theme. */
export function initThemeButton() {
  const button = document.querySelector<HTMLButtonElement>('[data-lab-theme]')
  button?.addEventListener('click', () => {
    const next: Theme = theme() === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    // Класс на время смены — варианты играют свою анимацию (мигание неона…).
    root.classList.add('is-switching')
    window.setTimeout(() => root.classList.remove('is-switching'), 900)
    root.dataset.theme = next
    try {
      localStorage.setItem('lab-theme', JSON.stringify(next))
    } catch {
      /* приватный режим */
    }
    document.dispatchEvent(new CustomEvent('lab:theme', { detail: next }))
  })
}

/** Свой курсор — только мышь и без «меньше движения». */
export const cursorAllowed = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export interface Pointer {
  /** Позиция в px окна. */
  x: number
  y: number
  /** Сглаженная скорость (px за кадр). */
  vx: number
  vy: number
  /** Курсор над ссылкой/кнопкой/карточкой. */
  hover: boolean
  /** Мышь в окне. */
  inside: boolean
}

export function trackPointer(): Pointer {
  const p: Pointer = { x: innerWidth / 2, y: innerHeight / 2, vx: 0, vy: 0, hover: false, inside: false }
  let lastX = p.x
  let lastY = p.y
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return
      p.x = e.clientX
      p.y = e.clientY
      p.inside = true
      p.hover = Boolean((e.target as Element | null)?.closest('a, button, [data-cursor-hover]'))
    },
    { passive: true },
  )
  document.addEventListener('pointerleave', () => {
    p.inside = false
  })
  const decay = () => {
    p.vx += (p.x - lastX - p.vx) * 0.25
    p.vy += (p.y - lastY - p.vy) * 0.25
    lastX = p.x
    lastY = p.y
    requestAnimationFrame(decay)
  }
  decay()
  return p
}

/** Холст курсора на весь экран (стили — .lab-cursor). */
export function cursorCanvas() {
  const canvas = document.createElement('canvas')
  canvas.className = 'lab-cursor'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.append(canvas)
  document.documentElement.classList.add('has-cursor')
  return canvas
}
