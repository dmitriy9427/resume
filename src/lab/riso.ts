/**
 * ВРЕМЕННО: вариант C — курсор на canvas 2D (3D тут не к стилю).
 *
 * День: капли краски — розовая и синяя со «сдвигом печати»; хвост из капель
 * сливается в одну форму SVG-фильтром #lab-goo (размытие + порог альфы).
 * Ночь: светящийся след неоновой трубки, яркая «голова».
 * Над ссылками — капля/голова крупнее.
 */
import { cursorAllowed, cursorCanvas, initThemeButton, theme, trackPointer } from './common'

initThemeButton()

function start() {
  if (!cursorAllowed()) return
  const canvas = cursorCanvas()
  const g = canvas.getContext('2d')!
  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2)
    canvas.width = innerWidth * dpr
    canvas.height = innerHeight * dpr
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  addEventListener('resize', resize)

  const pointer = trackPointer()
  const TRAIL = 18
  const points = Array.from({ length: TRAIL }, () => ({ x: pointer.x, y: pointer.y }))
  let size = 1

  const ink = () => {
    // Хвост: каждая точка догоняет предыдущую — получается «тягучая» капля.
    points[0].x += (pointer.x - points[0].x) * 0.5
    points[0].y += (pointer.y - points[0].y) * 0.5
    for (let i = 1; i < TRAIL; i++) {
      points[i].x += (points[i - 1].x - points[i].x) * 0.45
      points[i].y += (points[i - 1].y - points[i].y) * 0.45
    }
    for (const [color, dx, dy] of [
      ['#ff48b0', 0, 0],
      ['#0078bf', 4, -3],
    ] as const) {
      g.fillStyle = color
      g.globalCompositeOperation = 'multiply'
      points.forEach((p, i) => {
        const r = (14 - i * 0.65) * size
        if (r <= 0) return
        g.beginPath()
        g.arc(p.x + dx, p.y + dy, r, 0, Math.PI * 2)
        g.fill()
      })
    }
    g.globalCompositeOperation = 'source-over'
  }

  const neon = () => {
    points[0].x += (pointer.x - points[0].x) * 0.6
    points[0].y += (pointer.y - points[0].y) * 0.6
    for (let i = 1; i < TRAIL; i++) {
      points[i].x += (points[i - 1].x - points[i].x) * 0.38
      points[i].y += (points[i - 1].y - points[i].y) * 0.38
    }
    g.lineCap = 'round'
    g.lineJoin = 'round'
    g.shadowColor = '#ff5a36'
    g.shadowBlur = 18
    for (let i = 1; i < TRAIL; i++) {
      const k = 1 - i / TRAIL
      g.strokeStyle = `rgba(255, ${Math.round(120 + 100 * k)}, ${Math.round(80 + 120 * k)}, ${k})`
      g.lineWidth = 5 * k * size
      g.beginPath()
      g.moveTo(points[i - 1].x, points[i - 1].y)
      g.lineTo(points[i].x, points[i].y)
      g.stroke()
    }
    g.fillStyle = '#fff4e8'
    g.beginPath()
    g.arc(points[0].x, points[0].y, 4.5 * size, 0, Math.PI * 2)
    g.fill()
    g.shadowBlur = 0
  }

  const loop = () => {
    size += ((pointer.hover ? 1.8 : 1) - size) * 0.15
    g.clearRect(0, 0, innerWidth, innerHeight)
    if (pointer.inside) (theme() === 'dark' ? neon : ink)()
    requestAnimationFrame(loop)
  }
  loop()
}

start()
