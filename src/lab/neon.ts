/**
 * ВРЕМЕННО: вариант A — 3D-курсор «неоновое кольцо».
 *
 * Ночь: светящееся кольцо-трубка (additive) + ореол + шлейф из светящихся
 * точек. День: то же кольцо из стекла (MeshPhysicalMaterial: clearcoat,
 * iridescence, отражения комнаты) + мягкий сиреневый шлейф.
 * Кольцо наклоняется по скорости, над ссылками/карточками — увеличивается.
 *
 * Сцена в пикселях окна (ортокамера), three.js грузится лениво.
 */
import type { Material } from 'three'
import { cursorAllowed, cursorCanvas, initThemeButton, theme, trackPointer } from './common'

initThemeButton()

async function start() {
  if (!cursorAllowed()) return
  const THREE = await import('three')
  const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
  const canvas = cursorCanvas()
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -1000, 1000)
  camera.position.z = 500
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture

  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false)
    camera.left = -innerWidth / 2
    camera.right = innerWidth / 2
    camera.top = innerHeight / 2
    camera.bottom = -innerHeight / 2
    camera.updateProjectionMatrix()
  }
  resize()
  addEventListener('resize', resize)

  // Мягкое круглое пятно — для ореола и шлейфа.
  const glowTexture = (() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const g = c.getContext('2d')!
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.45)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  })()

  const geometry = new THREE.TorusGeometry(16, 2.6, 24, 96)
  const neonMaterial = new THREE.MeshBasicMaterial({ color: 0xff7ae8 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.12,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    iridescence: 1,
    iridescenceIOR: 1.6,
    transparent: true,
    opacity: 0.92,
  })
  const ring = new THREE.Mesh<typeof geometry, Material>(geometry, neonMaterial)
  scene.add(ring)

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture, color: 0xff2bd6, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  halo.scale.set(110, 110, 1)
  scene.add(halo)

  // Шлейф: точки повторяют путь кольца с задержкой.
  const TRAIL = 26
  const trail = Array.from({ length: TRAIL }, (_, i) => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: i % 2 ? 0x22e6ff : 0xff2bd6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      }),
    )
    scene.add(s)
    return s
  })
  const history: { x: number; y: number }[] = Array.from({ length: TRAIL * 2 }, () => ({ x: 0, y: 0 }))

  const applyTheme = () => {
    const dark = theme() === 'dark'
    ring.material = dark ? neonMaterial : glassMaterial
    halo.visible = dark
    trail.forEach((s, i) => {
      s.material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending
      s.material.color.set(dark ? (i % 2 ? 0x22e6ff : 0xff2bd6) : i % 2 ? 0xc9b6ff : 0xffc6f0)
      s.material.needsUpdate = true
    })
  }
  applyTheme()
  document.addEventListener('lab:theme', applyTheme)

  const pointer = trackPointer()
  const pos = { x: pointer.x, y: pointer.y }
  let scale = 1
  let time = 0
  renderer.setAnimationLoop(() => {
    time += 0.016
    pos.x += (pointer.x - pos.x) * 0.22
    pos.y += (pointer.y - pos.y) * 0.22
    const x = pos.x - innerWidth / 2
    const y = innerHeight / 2 - pos.y
    scale += ((pointer.hover ? 1.9 : 1) - scale) * 0.15

    ring.position.set(x, y, 0)
    ring.scale.setScalar(scale)
    // Наклон по скорости + медленное вращение — видно, что кольцо объёмное.
    ring.rotation.x = 0.9 + Math.max(-1, Math.min(1, pointer.vy * 0.05)) + Math.sin(time) * 0.15
    ring.rotation.y = Math.max(-1, Math.min(1, pointer.vx * 0.05)) + Math.cos(time * 0.8) * 0.2
    ring.rotation.z += 0.01
    halo.position.set(x, y, -1)
    halo.scale.setScalar(110 * scale)

    history.unshift({ x, y })
    history.length = TRAIL * 2
    trail.forEach((s, i) => {
      const h = history[i * 2]
      const k = 1 - i / TRAIL
      s.position.set(h.x, h.y, -2)
      s.scale.setScalar(26 * k * (0.6 + scale * 0.4))
      s.material.opacity = pointer.inside ? k * (theme() === 'dark' ? 0.55 : 0.4) : 0
    })
    ring.visible = halo.visible = pointer.inside
    if (theme() !== 'dark') halo.visible = false
    renderer.render(scene, camera)
  })
}

start()
