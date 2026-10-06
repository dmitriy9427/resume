/**
 * ВРЕМЕННО: вариант B — 3D-курсор «капля жидкого стекла».
 *
 * Сфера с шумовым смещением вершин (колышется), вытягивается по скорости.
 * Цвет — тонкоплёночный перелив по френелю: ночью хром на тёмном,
 * днём жемчуг (тот же шейдер, uLight 0/1). Над ссылками — разбухает.
 * Плюс блик-голограмма на карточках (--mx/--my).
 */
import { cursorAllowed, cursorCanvas, initThemeButton, theme, trackPointer } from './common'

initThemeButton()

// Блик за мышью на карточках.
document.addEventListener(
  'pointermove',
  (e) => {
    const card = (e.target as Element | null)?.closest<HTMLElement>('.lab-card')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  },
  { passive: true },
)

const VERTEX = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
  vec3 p = position;
  float n = sin(p.x * 0.18 + uTime * 2.1) * sin(p.y * 0.21 + uTime * 1.7) * sin(p.z * 0.16 + uTime * 1.3);
  p += normal * n * 3.2;
  vNormal = normalize(normalMatrix * normal);
  vPos = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`

const FRAGMENT = /* glsl */ `
uniform float uTime;
uniform float uLight;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
  float fresnel = pow(1.0 - abs(vNormal.z), 1.6);
  float hue = fresnel * 1.3 + vNormal.y * 0.35 + uTime * 0.12;
  vec3 irid = 0.5 + 0.5 * cos(6.2831 * (hue + vec3(0.0, 0.33, 0.67)));
  // Блик «окна» сверху-слева.
  float spec = pow(max(dot(vNormal, normalize(vec3(-0.5, 0.6, 0.8))), 0.0), 40.0);
  vec3 chrome = mix(vec3(0.06, 0.06, 0.1), irid, 0.25 + fresnel * 0.9) + spec;
  vec3 pearl = mix(vec3(0.98, 0.96, 0.95), irid * 0.55 + 0.45, 0.15 + fresnel * 0.75) + spec * 0.6;
  gl_FragColor = vec4(mix(chrome, pearl, uLight), 1.0);
}`

async function start() {
  if (!cursorAllowed()) return
  const THREE = await import('three')
  const canvas = cursorCanvas()
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -1000, 1000)
  camera.position.z = 500

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

  const uniforms = { uTime: { value: 0 }, uLight: { value: theme() === 'light' ? 1 : 0 } }
  const blob = new THREE.Mesh(
    new THREE.IcosahedronGeometry(20, 24),
    new THREE.ShaderMaterial({ vertexShader: VERTEX, fragmentShader: FRAGMENT, uniforms }),
  )
  scene.add(blob)

  let lightTarget = uniforms.uLight.value
  document.addEventListener('lab:theme', () => {
    lightTarget = theme() === 'light' ? 1 : 0
  })

  const pointer = trackPointer()
  const pos = { x: pointer.x, y: pointer.y }
  let size = 1
  renderer.setAnimationLoop(() => {
    uniforms.uTime.value += 0.016
    uniforms.uLight.value += (lightTarget - uniforms.uLight.value) * 0.08
    pos.x += (pointer.x - pos.x) * 0.16
    pos.y += (pointer.y - pos.y) * 0.16
    size += ((pointer.hover ? 2.3 : 1) - size) * 0.12

    // Вытягивание по скорости: растягиваем по X и поворачиваем по направлению.
    const speed = Math.min(Math.hypot(pointer.vx, pointer.vy), 40)
    const stretch = 1 + speed * 0.02
    blob.rotation.z = Math.atan2(-pointer.vy, pointer.vx)
    blob.scale.set(size * stretch, size / Math.sqrt(stretch), size)
    blob.position.set(pos.x - innerWidth / 2, innerHeight / 2 - pos.y, 0)
    blob.visible = pointer.inside
    renderer.render(scene, camera)
  })
}

start()
