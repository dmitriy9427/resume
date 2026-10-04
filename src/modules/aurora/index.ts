/**
 * «Северное сияние» на первом экране — WebGL-шейдер без библиотек (~3 КБ).
 *
 *   <canvas class="aurora" data-module="aurora"></canvas>
 *
 * Цветные пятна плавно перетекают (шум fbm в фрагментном шейдере) и
 * тянутся за курсором с инерцией. Цвета — CSS-переменные --aurora-1/2/3
 * (меняйте в src/styles/sections/_hero.scss).
 *
 * Бережём батарею и видеокарту:
 *   - кадры рисуются, только пока canvas на экране;
 *   - плотность пикселей не больше 1.5 (фон размытый — Retina не нужна);
 *   - «меньше движения» — один неподвижный кадр;
 *   - нет WebGL — остаётся CSS-градиент под canvas.
 */
import { gsap } from 'kit/js/core/gsap.js'
import { createDisposer, onViewport } from 'kit/js/core/lifecycle.js'

const VERTEX = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 color;

// Шум: значения в узлах сетки, плавно смешанные между ними.
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
// fbm: несколько слоёв шума разного масштаба — «облачная» текстура.
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = uv * vec2(uResolution.x / uResolution.y, 1.0);
  float t = uTime * 0.06;
  // Искажаем координаты шумом самого шума — ленты «текут».
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.7));
  float n = fbm(p * 1.2 + q * 1.6 + vec2(t * 0.6, -t * 0.4));
  // Пятно у курсора.
  vec2 m = uMouse * vec2(uResolution.x / uResolution.y, 1.0);
  float glow = smoothstep(0.75, 0.0, distance(p, m));
  vec3 c = mix(uColor1, uColor2, smoothstep(0.25, 0.75, n));
  c = mix(c, uColor3, smoothstep(0.55, 0.9, q.y) * 0.8);
  c += uColor2 * glow * 0.35;
  // Затухание к краям и вниз — текст поверх читается.
  float vignette = smoothstep(1.25, 0.2, distance(uv, vec2(0.65, 0.6)));
  float strength = (0.18 + 0.55 * n) * vignette;
  color = vec4(c * strength, 1.0);
}`

/** CSS-цвет (#rgb, #rrggbb, rgb()) → [0..1, 0..1, 0..1]. */
export function parseColor(value: string): [number, number, number] {
  const v = value.trim()
  const hex = v.match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1]
  if (hex) {
    const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as [number, number, number]
  }
  const rgb = v.match(/\d+(\.\d+)?/g)?.map(Number)
  return rgb && rgb.length >= 3 ? [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255] : [0.5, 0.4, 1]
}

export default function aurora(canvas: HTMLCanvasElement, ctx: { reduced?: boolean } = {}) {
  const gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: false })
  if (!gl) return undefined // нет WebGL — виден CSS-градиент
  const d = createDisposer()

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader')
    return shader
  }
  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  gl.useProgram(program)

  // Один треугольник на весь экран (быстрее, чем два для прямоугольника).
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const u = (name: string) => gl.getUniformLocation(program, name)
  const uResolution = u('uResolution')
  const uTime = u('uTime')
  const uMouse = u('uMouse')

  const applyColors = () => {
    const style = getComputedStyle(canvas)
    gl.uniform3fv(u('uColor1'), parseColor(style.getPropertyValue('--aurora-1') || '#5b3df5'))
    gl.uniform3fv(u('uColor2'), parseColor(style.getPropertyValue('--aurora-2') || '#22d3ee'))
    gl.uniform3fv(u('uColor3'), parseColor(style.getPropertyValue('--aurora-3') || '#f0479a'))
  }
  applyColors()
  // Сменили тему — цвета могли поменяться.
  d.listen(document, 'theme:change', () => {
    applyColors()
    draw()
  })

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(canvas.clientWidth * dpr)
    canvas.height = Math.round(canvas.clientHeight * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResolution, canvas.width, canvas.height)
  }
  const ro = new ResizeObserver(() => {
    resize()
    draw()
  })
  ro.observe(canvas)
  d.add(() => ro.disconnect())
  resize()

  // Курсор: цель и текущее положение (инерция).
  const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 }
  d.listen(window, 'pointermove', (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    mouse.tx = (event.clientX - rect.left) / rect.width
    mouse.ty = 1 - (event.clientY - rect.top) / rect.height
  })

  let time = 8 // не с нуля — первый кадр уже «красивый»
  function draw() {
    gl!.uniform1f(uTime, time)
    gl!.uniform2f(uMouse, mouse.x, mouse.y)
    gl!.drawArrays(gl!.TRIANGLES, 0, 3)
  }

  if (ctx.reduced) {
    draw()
    return { destroy: d.dispose }
  }

  const tick = (_t: number, deltaMs: number) => {
    const dt = Math.min(deltaMs / 1000, 0.05)
    time += dt
    const k = 1 - Math.exp(-dt * 2.5)
    mouse.x += (mouse.tx - mouse.x) * k
    mouse.y += (mouse.ty - mouse.y) * k
    draw()
  }
  let running = false
  d.add(
    onViewport(canvas, {
      enter: () => {
        if (!running) gsap.ticker.add(tick)
        running = true
      },
      leave: () => {
        gsap.ticker.remove(tick)
        running = false
      },
    }),
  )
  d.add(() => {
    gsap.ticker.remove(tick)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  })
  canvas.classList.add('is-ready')
  return { destroy: d.dispose }
}
