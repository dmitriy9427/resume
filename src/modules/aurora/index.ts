/**
 * «Северное сияние» на первом экране — WebGL-шейдер без библиотек (~3 КБ).
 *
 *   <canvas class="aurora" data-module="aurora"></canvas>
 *
 * Цветные пятна плавно перетекают (шум fbm в фрагментном шейдере) и
 * тянутся за курсором с инерцией. Цвета — CSS-переменные --aurora-1/2/3
 * (меняйте в src/styles/sections/_hero.scss).
 *
 * Поверх сияния — 3D-объект: капля «жидкого металла». Это не модель, а
 * формула: шейдер для каждого пикселя пускает луч и шагами ищет поверхность
 * (ray marching по функции расстояния). Капля медленно вращается,
 * поворачивается и ловит блик за курсором, а при прокрутке уплывает вверх.
 * Вокруг — мерцающие звёзды.
 *
 * Сцена живая: чем резвее двигают курсор, тем быстрее и выше волны на капле;
 * клик или тап — всплеск (капля вздувается, по фону расходится кольцо).
 * data-aurora-shape="ring" — вместо капли кольцо (так сделан блок контактов).
 *
 * Бережём батарею и видеокарту:
 *   - кадры рисуются, только пока canvas на экране;
 *   - плотность пикселей не больше 1.5 (на телефонах — 1.25);
 *   - лучи считаются только в круге вокруг капли, остальной экран — дешёвый фон;
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
uniform vec3 uBlob;   // центр капли (доли экрана) и радиус (доля высоты)
uniform float uScroll; // −1 — блок только въезжает снизу, 0 — стоит на экране, 1 — уехал вверх
uniform float uDark;   // 1 — тёмная тема
uniform float uShape;  // 0 — капля, 1 — кольцо
uniform float uWave;   // фаза волн на поверхности (бежит быстрее, когда курсор двигают)
uniform float uEnergy; // 0…1 — насколько резво двигают курсор
uniform float uPulse;  // 1 → 0 после клика: всплеск
uniform vec2 uClick;   // где кликнули (доли экрана)
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

// ─── Капля ───
// Повороты считаем один раз на пиксель (в main), а не на каждом шаге луча.
mat2 gRotY, gRotX;
float gT, gAmp;
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// Функция расстояния: шар (или кольцо), поверхность которого «дышит» волнами синусов.
// Множитель 0.5 — запас: из-за волн честное расстояние меньше, луч не должен проскочить.
float map(vec3 q) {
  q.xz *= gRotY;
  q.yz *= gRotX;
  float d = uShape > 0.5 ? length(vec2(length(q.xy) - 0.78, q.z)) - 0.3 : length(q) - 1.0;
  d += gAmp * sin(q.x * 2.1 + gT * 1.3) * sin(q.y * 2.4 + gT) * sin(q.z * 2.2 - gT * 1.1);
  d += 0.05 * sin(q.x * 5.3 - gT * 1.7) * sin(q.y * 4.7 + gT * 1.4) * sin(q.z * 5.1 + gT);
  // Клик: фигура вздувается, и от центра по ней бежит рябь.
  d -= uPulse * uPulse * 0.07;
  d += uPulse * 0.04 * sin(length(q) * 7.0 - (1.0 - uPulse) * 14.0);
  return d * 0.5;
}
// Нормаль — куда «смотрит» поверхность: по разнице расстояний в четырёх точках рядом.
vec3 normalAt(vec3 q) {
  const vec2 e = vec2(1.0, -1.0) * 0.01;
  return normalize(e.xyy * map(q + e.xyy) + e.yyx * map(q + e.yyx) + e.yxy * map(q + e.yxy) + e.xxx * map(q + e.xxx));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv * vec2(aspect, 1.0);
  float t = uTime * 0.06;
  // Искажаем координаты шумом самого шума — ленты «текут».
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.7));
  float n = fbm(p * 1.2 + q * 1.6 + vec2(t * 0.6, -t * 0.4));
  // Пятно у курсора.
  vec2 m = uMouse * vec2(aspect, 1.0);
  float glow = smoothstep(0.75, 0.0, distance(p, m));
  vec3 c = mix(uColor1, uColor2, smoothstep(0.25, 0.75, n));
  c = mix(c, uColor3, smoothstep(0.55, 0.9, q.y) * 0.8);
  c += uColor2 * glow * 0.35;
  // Затухание к краям и вниз — текст поверх читается.
  float vignette = smoothstep(1.25, 0.2, distance(uv, vec2(0.65, 0.6)));
  float strength = (0.18 + 0.55 * n) * vignette;
  c *= strength;

  // Звёзды: в редких клетках сетки — точка, каждая мерцает в своём ритме.
  vec2 sg = p * 34.0;
  vec2 id = floor(sg);
  float sh = hash(id);
  vec2 sp = fract(sg) - 0.5 - (vec2(hash(id + 1.3), hash(id + 7.1)) - 0.5) * 0.7;
  float star = step(0.9, sh) * smoothstep(0.1, 0.0, length(sp)) * (0.45 + 0.55 * sin(uTime * (0.6 + sh * 2.0) + sh * 40.0));
  c += star * 0.55 * uDark * smoothstep(0.1, 0.5, uv.y);

  // Клик: по фону от точки клика расходится светящееся кольцо.
  float age = 1.0 - uPulse;
  float ring = smoothstep(0.06, 0.0, abs(distance(p, uClick * vec2(aspect, 1.0)) - age * 0.9)) * uPulse;
  c += mix(uColor2, uColor3, age) * ring * 0.45;

  // Капля: центр чуть тянется за курсором и уплывает вверх при прокрутке.
  vec2 center = vec2(uBlob.x * aspect, uBlob.y) + (uMouse - 0.5) * 0.05 + vec2(0.0, uScroll * 0.3);
  float radius = uBlob.z * (1.0 + uScroll * 0.25);
  vec2 bp = (p - center) / radius;
  float bl = length(bp);
  // Ореол позади капли.
  c += mix(uColor1, uColor2, 0.4) * exp(-bl * bl * 1.4) * 0.22;
  if (bl < 1.5) {
    gT = uWave;
    gAmp = (0.17 + 0.09 * uEnergy) * (1.0 - 0.45 * uShape);
    gRotY = rot(uTime * 0.12 + (uMouse.x - 0.5) * 1.6 + uScroll * 2.5);
    gRotX = rot(0.35 - (uMouse.y - 0.5) * 1.2 + uScroll * 1.2);
    // Лучи параллельные (как у чертежа): из каждого пикселя — прямо вглубь экрана.
    vec3 ro = vec3(bp, 1.6), rd = vec3(0.0, 0.0, -1.0);
    float dist = 0.0, nearest = 1e3, nearestAt = 0.0;
    for (int i = 0; i < 52; i++) {
      float d = map(ro + rd * dist);
      if (d < nearest) { nearest = d; nearestAt = dist; }
      if (d < 0.0004 || dist > 3.2) break;
      dist += d;
    }
    // Сглаживание края: луч, прошедший в пикселе от поверхности, красим частично.
    float px = 1.2 / (radius * uResolution.y);
    float alpha = smoothstep(px, 0.0, nearest);
    if (alpha > 0.0) {
      vec3 pos = ro + rd * nearestAt;
      vec3 nrm = normalAt(pos);
      vec3 view = vec3(0.0, 0.0, 1.0);
      float facing = max(dot(nrm, view), 0.0);
      float fresnel = pow(1.0 - facing, 2.5); // края ярче — как у стекла и металла
      // Свет идёт от курсора.
      vec3 light = normalize(vec3((m - center) * 1.6, 0.9));
      float diffuse = max(dot(nrm, light), 0.0);
      float spec = pow(max(dot(reflect(-light, nrm), view), 0.0), 60.0);
      // «Отражение» сияния: тот же облачный шум, но по направлению отражённого луча.
      vec3 r = reflect(-view, nrm);
      float e = fbm(r.xy * 1.7 + vec2(uTime * 0.05, nrm.z));
      vec3 env = mix(uColor1, uColor2, smoothstep(0.3, 0.7, e));
      env = mix(env, uColor3, smoothstep(0.3, 1.0, r.x * 0.5 + fresnel * 0.9));
      vec3 blob = vec3(0.01, 0.01, 0.028);
      blob += env * (0.05 + 0.3 * diffuse + 0.45 * e * e * facing);
      blob += env * fresnel * (1.6 + uPulse * 1.5);
      blob += vec3(1.0) * spec * 0.85;
      c = mix(c, blob, alpha * (1.0 - max(uScroll, 0.0) * 0.6));
    }
  }
  color = vec4(c, 1.0);
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

/**
 * Где стоит фигура: [x, y — центр в долях экрана (y снизу вверх), радиус в долях высоты].
 * Радиус ограничен шириной: на узком окне фигура не вылезает на текст.
 * Капля на узком экране — в правом верхнем углу (над именем), кольцо — в правом
 * нижнем: верх блока контактов скрыт маской, там его не было бы видно.
 */
export function blobPlacement(width: number, height: number, ring = false): [number, number, number] {
  const aspect = width / Math.max(height, 1)
  if (aspect >= 1) return [0.76, ring ? 0.48 : 0.56, Math.min(0.3, 0.2 * aspect)]
  return ring ? [0.76, 0.26, Math.min(0.17, 0.34 * aspect)] : [0.8, 0.77, Math.min(0.15, 0.3 * aspect)]
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
  const uBlob = u('uBlob')
  const uScroll = u('uScroll')
  const uDark = u('uDark')
  const uWave = u('uWave')
  const uEnergy = u('uEnergy')
  const uPulse = u('uPulse')
  const uClick = u('uClick')
  // Фигура: data-aurora-shape="ring" — кольцо (блок контактов), иначе капля.
  const ring = canvas.dataset.auroraShape === 'ring'
  gl.uniform1f(u('uShape'), ring ? 1 : 0)
  // Телефон (основной указатель — палец): плотность ниже — видеокарта слабее.
  const maxDpr = window.matchMedia?.('(pointer: coarse)').matches ? 1.25 : 1.5

  const applyColors = () => {
    const style = getComputedStyle(canvas)
    gl.uniform3fv(u('uColor1'), parseColor(style.getPropertyValue('--aurora-1') || '#5b3df5'))
    gl.uniform3fv(u('uColor2'), parseColor(style.getPropertyValue('--aurora-2') || '#22d3ee'))
    gl.uniform3fv(u('uColor3'), parseColor(style.getPropertyValue('--aurora-3') || '#f0479a'))
    gl.uniform1f(uDark, document.documentElement.dataset.theme === 'light' ? 0 : 1)
  }
  applyColors()
  // Сменили тему — цвета могли поменяться.
  d.listen(document, 'theme:change', () => {
    applyColors()
    draw()
  })

  let height = 1
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    height = canvas.clientHeight || 1
    canvas.width = Math.round(canvas.clientWidth * dpr)
    canvas.height = Math.round(height * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResolution, canvas.width, canvas.height)
    // Капля: на широком экране — справа от текста, на узком — меньше и в правом верхнем углу.
    const [bx, by, br] = blobPlacement(canvas.clientWidth, height, ring)
    gl.uniform3f(uBlob, bx, by, br)
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
  // «Живость»: энергия растёт, когда курсор двигают, и сама затухает; всплеск — после клика.
  const live = { energy: 0, boost: 0, wave: 3, pulse: 0, clickX: 0.5, clickY: 0.5 }
  const toCanvas = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    return { x: (event.clientX - rect.left) / rect.width, y: 1 - (event.clientY - rect.top) / rect.height }
  }
  d.listen(window, 'pointermove', (event: PointerEvent) => {
    const { x, y } = toCanvas(event)
    live.boost = Math.min(1, live.boost + Math.hypot(x - mouse.tx, y - mouse.ty) * 2.5)
    mouse.tx = x
    mouse.ty = y
  })
  // Клик или тап в блоке — всплеск: фигура вздувается, по фону бежит кольцо.
  if (!ctx.reduced && canvas.parentElement) {
    d.listen(canvas.parentElement, 'pointerdown', (event: PointerEvent) => {
      const { x, y } = toCanvas(event)
      live.clickX = x
      live.clickY = y
      live.pulse = 1
    })
  }

  let time = 8 // не с нуля — первый кадр уже «красивый»
  function draw() {
    gl!.uniform1f(uTime, time)
    gl!.uniform2f(uMouse, mouse.x, mouse.y)
    // Прокрутка относительно самого блока: модуль работает и на первом экране, и в контактах.
    gl!.uniform1f(uScroll, Math.min(Math.max(-canvas.getBoundingClientRect().top / height, -1), 1))
    gl!.uniform1f(uWave, live.wave)
    gl!.uniform1f(uEnergy, live.energy)
    gl!.uniform1f(uPulse, live.pulse)
    gl!.uniform2f(uClick, live.clickX, live.clickY)
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
    live.energy += (live.boost - live.energy) * k
    live.boost *= Math.exp(-dt * 2.5)
    live.wave += dt * (0.4 + live.energy * 1.4)
    live.pulse = Math.max(0, live.pulse - dt / 1.2)
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
