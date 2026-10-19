/**
 * ВСЁ СОДЕРЖИМОЕ РЕЗЮМЕ — В ЭТОМ ФАЙЛЕ.
 *
 * Меняете текст здесь — он меняется на сайте на обоих языках. Вёрстку
 * трогать не нужно. TypeScript подсветит, если забыли перевод (у каждого
 * текста есть ru и en) или поле.
 *
 * Пометка TODO — заглушка, которую нужно заменить своими данными.
 * Как добавить проект, навык, контакт — README.md, раздел «Что где менять».
 */

/** Текст на двух языках. */
export type L = { ru: string; en: string }

// ─── Профиль ────────────────────────────────────────────────────────────────
export const profile = {
  name: { ru: 'Дмитрий', en: 'Dmitry' } as L,
  surname: { ru: 'Рябов', en: 'Ryabov' } as L,
  role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' } as L,
  // TODO: город
  location: { ru: 'Россия · удалённо', en: 'Russia · remote' } as L,
  /** Короткая подпись под именем на первом экране. */
  pitch: {
    ru: 'Делаю быстрые и живые интерфейсы: от вёрстки сайтов до WebGL-анимаций и панелей управления на React.',
    en: 'I build fast, living interfaces: from website markup to WebGL animations and React dashboards.',
  } as L,
  /** Бейдж «открыт к предложениям». false — бейдж скрыт. */
  available: true,
  availableText: { ru: 'Открыт к проектам', en: 'Open to projects' } as L,
  /** Абзацы блока «Обо мне». */
  about: [
    {
      ru: 'Frontend-разработчик. Делаю сайты и спецпроекты: от адаптивной вёрстки и UI-китов до анимаций на GSAP и сцен на Three.js.',
      en: 'Frontend developer. I build websites and special projects: from responsive markup and UI kits to GSAP animations and Three.js scenes.',
    },
    {
      ru: 'Люблю, когда интерфейс не только красивый, но и надёжный: доступность, производительность, тесты и документация — часть работы, а не «если останется время».',
      en: 'I like interfaces that are not only beautiful but reliable: accessibility, performance, tests and documentation are part of the job, not “if there is time left”.',
    },
  ] as L[],
}

// ─── Цифры (счётчики в блоке «Обо мне») ─────────────────────────────────────
// TODO: проверьте цифры
export const stats = [
  {
    value: 2,
    suffix: '+',
    label: { ru: 'года в коммерческой разработке', en: 'years in commercial development' } as L,
  },
  { value: 25, suffix: '+', label: { ru: 'проектов в коммерческой разработке', en: 'commercial projects' } as L },
  { value: 1500, suffix: '+', label: { ru: 'коммитов за последний год', en: 'commits over the last year' } as L },
]

// ─── Контакты ───────────────────────────────────────────────────────────────
// TODO: свои ссылки. Пустой href — контакт не показывается.
export const contacts = {
  /** E-mail: показывается крупно, кнопка копирует его в буфер. */
  email: 'dimich.94@yandex.ru',
  links: [
    { label: 'Telegram', href: 'https://t.me/ryabov_29' },
    { label: 'GitHub', href: 'https://github.com/dmitriy9427' },
    // TODO: ссылка на резюме hh.ru (пусто — не показывается)
    { label: 'hh.ru', href: '' },
  ],
  /** PDF-версия резюме в public/ (например, '/cv.pdf'). Пусто — кнопка скрыта. */
  cv: '',
}

// ─── Навыки ─────────────────────────────────────────────────────────────────
export const skills: { title: L; items: string[]; note?: L }[] = [
  {
    title: { ru: 'Вёрстка', en: 'Markup' },
    items: ['HTML5', 'SCSS / Sass', 'БЭМ', 'Адаптив', 'Доступность (a11y)', 'Pug', 'Tailwind'],
  },
  {
    title: { ru: 'JavaScript', en: 'JavaScript' },
    items: ['JavaScript (ES2023)', 'TypeScript', 'DOM API', 'Web Components', 'htmx', 'Telegram Mini Apps', 'WebSocket', 'Авторизация: JWT, OAuth 2.0 + PKCE, WebAuthn'],
  },
  {
    title: { ru: 'Фреймворки', en: 'Frameworks' },
    items: [
      'React',
      'React Native, Expo',
      'Next.js (App Router)',
      'Vue 3, Nuxt, Pinia',
      'Astro',
      'React Router',
      'TanStack Router / Table / Virtual',
      'Redux Toolkit, RTK Query',
      'Feature-Sliced Design',
      'Zustand',
      'TanStack Query',
      'React Hook Form',
      'shadcn/ui',
    ],
  },
  {
    title: { ru: 'Анимации и графика', en: 'Motion & graphics' },
    items: [
      'GSAP + ScrollTrigger',
      'SplitText, Flip, Draggable',
      'Three.js',
      'React Three Fiber',
      'GLSL-шейдеры',
      'Web Audio API',
      'Lenis',
      'Swiper',
      'Canvas',
      'MapLibre GL',
    ],
  },
  {
    title: { ru: 'Сборка и качество', en: 'Tooling & quality' },
    items: ['Vite', 'Webpack', 'Gulp', 'Vitest', 'Jest', 'Playwright', 'Storybook', 'ESLint / Stylelint', 'Git'],
  },
  {
    title: { ru: 'AI', en: 'AI' },
    items: ['Интерфейсы AI-ассистентов', 'Чаты со стримингом ответов', 'RAG', 'AI-инструменты в разработке'],
  },
]

/** Бегущая строка технологий на первом экране. */
export const marquee = [
  'React',
  'Next.js',
  'TypeScript',
  'Astro',
  'GSAP',
  'Three.js',
  'GLSL',
  'SCSS',
  'Vite',
  'Storybook',
  'Vitest',
  'Swiper',
  'Lenis',
]

// ─── Опыт ───────────────────────────────────────────────────────────────────
export const experience = [
  {
    company: 'Paraweb',
    href: '', // TODO: сайт компании
    // TODO: даты
    period: { ru: '2024 — сейчас', en: '2024 — present' } as L,
    role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' } as L,
    points: [
      {
        ru: 'Вёрстка и фронтенд коммерческих сайтов: от макета до продакшна.',
        en: 'Markup and frontend for commercial websites: from design to production.',
      },
      {
        ru: 'UI-киты и библиотеки компонентов на Astro + React + Storybook, документация и тесты.',
        en: 'UI kits and component libraries with Astro + React + Storybook, docs and tests.',
      },
      {
        ru: 'Анимации и WebGL: шейдеры, 3D-слайдеры, эффекты на скролле.',
        en: 'Animations and WebGL: shaders, 3D sliders, scroll effects.',
      },
      {
        ru: 'Интерфейсы на React: личные кабинеты, формы и фильтры.',
        en: 'React interfaces: user dashboards, forms and filters.',
      },
    ] as L[],
  },
]

// ─── Проекты в продакшне ─────────────────────────────────────────────────────
/**
 * Категории для фильтра. Ключ — в поле category проекта.
 * Порядок здесь = порядок кнопок.
 */
export const categories: Record<string, L> = {
  edu: { ru: 'Образование', en: 'Education' },
  med: { ru: 'Медицина', en: 'Healthcare' },
  app: { ru: 'Сервисы и кабинеты', en: 'Apps & dashboards' },
  special: { ru: 'Спецпроекты', en: 'Special projects' },
}

export type Project = {
  title: L
  /** Описание без внутренних деталей (NDA): что за сайт и что делал я. */
  description: L
  category: keyof typeof categories
  year: string
  stack: string[]
  /** Ссылка на живой сайт. Пусто — «ссылка по запросу» (закрытый проект). */
  href: string
  /** Отметить как ключевой — карточка крупнее. */
  featured?: boolean
  /** Превью — скриншот сайта в public/projects (960×600, webp). */
  image?: string
  /** Без скриншота (NDA, ещё не в проде) — крупная подпись на обложке. */
  cover?: { text: string; note: L }
}

// TODO: проверьте годы и ссылки (там, где href пустой, — заглушка «по запросу»)
export const projects: Project[] = [
  {
    title: { ru: 'Сайт МИЭТ', en: 'MIET university website' },
    description: {
      ru: 'Разделы и блоки сайта, таблицы, баннеры, адаптив.',
      en: 'Site sections and blocks, tables, banners, responsive layout.',
    },
    category: 'edu',
    year: '2025',
    stack: ['Pug', 'SCSS', 'JavaScript', 'GSAP'],
    href: 'https://miet.ru',
    image: '/projects/work-miet.webp',
  },
  {
    title: { ru: 'Сайт Бурятской ГСХА', en: 'Buryat State Agricultural Academy website' },
    description: {
      ru: 'Поиск по сайту, баннеры, статьи, уведомление о cookies.',
      en: 'Site search, banners, articles, cookie notice.',
    },
    category: 'edu',
    year: '2025',
    stack: ['Pug', 'SCSS', 'JavaScript', 'GSAP'],
    href: 'https://bgsha.ru',
    image: '/projects/work-bgsha.webp',
  },
  {
    title: { ru: 'Молодёжный портал ВолгГМУ', en: 'Volgograd Medical University youth portal' },
    description: {
      ru: '«Искусство быть врачом»: плавные переходы между страницами, видео-слайдеры, календарь событий, формы.',
      en: '“The art of being a doctor”: smooth page transitions, video sliders, an events calendar, forms.',
    },
    category: 'med',
    year: '2026',
    stack: ['Pug', 'SCSS', 'JavaScript', 'GSAP', 'Barba.js', 'Lenis'],
    href: 'https://medmol.volgmed.ru',
    image: '/projects/work-medmol.webp',
  },
]

// ─── Пет-проекты ─────────────────────────────────────────────────────────────
export const pets = [
  {
    title: { ru: 'Лепесток', en: 'Lepestok' } as L,
    subtitle: { ru: 'Цветочный магазин', en: 'Flower shop' } as L,
    description: {
      ru: 'Первый экран — видео сквозь буквы, раскрывается прокруткой. Прелоадер и шейдерные переходы между страницами «распускающийся цветок». Конструктор букета с ценой и бюджетом, каталог с фильтрами в адресе и Flip, 3D-галерея, подписка, оформление заказа. Тёмная тема, плавающие цветы на canvas, 220+ тестов.',
      en: 'Video-through-letters hero revealed on scroll. A preloader and a “blooming flower” shader transition between pages. Bouquet builder with live price and budget, a catalog with URL filters and Flip, a 3D gallery, subscription, checkout. Dark theme, floating canvas flowers, 220+ tests.',
    } as L,
    images: [
      '/projects/lepestok-home.webp',
      '/projects/lepestok-hero.webp',
      '/projects/lepestok-catalog.webp',
      '/projects/lepestok-preloader.webp',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'WebGL', 'Vitest'],
    demo: 'https://dmitriy9427.github.io/lepestok/',
    repo: 'https://github.com/dmitriy9427/lepestok',
  },
  {
    title: { ru: 'Тропа', en: 'Tropa' } as L,
    subtitle: { ru: 'Планировщик путешествий', en: 'Trip planner' } as L,
    description: {
      ru: 'Места по дням: перетаскивание мышью, пальцем и с клавиатуры, карта маршрута на MapLibre — камера перелетает к выбранному дню, линия прорисовывается. Подборка популярных мест из Wikidata с фото, прогноз погоды, ссылка «поделиться» без сервера, экспорт в календарь. Статический экспорт Next.js, тесты на логику.',
      en: 'Places by day: drag and drop with mouse, touch and keyboard, a MapLibre route map — the camera flies to the selected day and the route draws itself. Popular sights from Wikidata with photos, weather forecast, a serverless share link, calendar export. Next.js static export, logic covered by tests.',
    } as L,
    images: ['/projects/tropa-day.webp', '/projects/tropa-discover.webp', '/projects/tropa-dark.webp'],
    stack: ['Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'MapLibre'],
    demo: 'https://dmitriy9427.github.io/tropa/',
    repo: 'https://github.com/dmitriy9427/tropa',
  },
  {
    title: { ru: 'Резонанс', en: 'Resonance' } as L,
    subtitle: { ru: 'Музыкальный визуализатор', en: 'Music visualizer' } as L,
    description: {
      ru: 'Три 3D-сцены на шейдерах слушают музыку: сфера на шуме, галактика из 60 000 частиц, синтвейв-ландшафт из истории спектра. Анализ звука — полосы частот и детектор долей, демо-трек синтезируется в браузере на Web Audio, свой файл или микрофон. 60 fps, обучающая документация.',
      en: 'Three shader-driven 3D scenes that listen to music: a noise sphere, a 60,000-particle galaxy, a synthwave landscape built from spectrum history. Audio analysis with frequency bands and beat detection, a demo track synthesized in the browser with Web Audio, your own file or microphone. 60 fps, tutorial-style docs.',
    } as L,
    images: ['/projects/resonance-terrain.webp', '/projects/resonance-galaxy.webp', '/projects/resonance-sphere.webp'],
    stack: ['React Three Fiber', 'TypeScript', 'GLSL', 'Web Audio', 'Vitest'],
    demo: 'https://dmitriy9427.github.io/resonance/',
    repo: 'https://github.com/dmitriy9427/resonance',
  },
  {
    title: { ru: '3D-конструктор', en: '3D Constructor' } as L,
    subtitle: { ru: 'Конструктор WebGL-анимаций с экспортом кода', en: 'WebGL animation builder with code export' } as L,
    description: {
      ru: '40 эффектов настраиваются ползунками, готовый код забирается как JS-модуль, React-компонент или веб-компонент — тот же рантайм, что рисует превью, около 8 КБ в gzip. Фоны на GLSL (море со сменой суток и штормом, облака на шуме Перлина — Ворли, космос, огонь, жидкий металл), симуляции жидкости на GPU, переходы, прожигающие настоящую HTML-секцию, курсоры, жидкая кнопка, прелоадер, 3D на three.js. Свой шейдер прямо в редакторе, траектории, адаптивное качество. Главная — скролл-сцена на GSAP из этих же эффектов. 131 тест, учебник из 17 глав.',
      en: '40 effects tuned with sliders; the code is exported as a JS module, a React component or a web component — the same runtime that renders the preview, about 8 KB gzipped. GLSL backgrounds (a sea with a day cycle and storms, Perlin-Worley clouds, space, fire, liquid metal), GPU fluid simulations, transitions that burn through a real HTML section, cursors, a liquid button, a preloader, three.js 3D. Write your own shader in the editor, motion paths, adaptive quality. The home page is a GSAP scroll scene built from the same effects. 131 tests, a 17-chapter tutorial.',
    } as L,
    images: ['/projects/konstruktor-home.webp', '/projects/konstruktor-waves.webp', '/projects/konstruktor-burn.webp'],
    stack: ['WebGL2 / GLSL', 'Three.js', 'GSAP', 'React', 'TypeScript'],
    demo: 'https://dmitriy9427.github.io/konstruktor-3d/',
    repo: 'https://github.com/dmitriy9427/konstruktor-3d',
  },
  {
    title: { ru: 'Летучка', en: 'Letuchka' } as L,
    subtitle: { ru: 'Онлайн-ретро для команды', en: 'Team retrospective board' } as L,
    description: {
      ru: 'Комната по ссылке без регистрации: карточки, голосование, таймер, курсоры коллег и реакции в реальном времени. Три этапа: пишем вслепую, голосуем, обсуждаем. Бэкенд — Supabase: анонимный вход, Postgres, права на уровне строк (RLS), realtime; демо-режим между вкладками без сервера.',
      en: 'A room by link, no sign-up: cards, voting, a timer, teammates’ cursors and reactions in real time. Three phases: write blind, vote, discuss. Supabase backend: anonymous auth, Postgres, row level security, realtime; a serverless demo mode across browser tabs.',
    } as L,
    images: ['/projects/letuchka-discuss.webp', '/projects/letuchka-write.webp', '/projects/letuchka-vote.webp'],
    stack: ['Nuxt', 'Vue 3', 'Pinia', 'Supabase', 'TypeScript'],
    demo: 'https://dmitriy9427.github.io/letuchka/',
    repo: 'https://github.com/dmitriy9427/letuchka',
  },
  {
    title: { ru: 'Мята', en: 'Myata' } as L,
    subtitle: { ru: 'Telegram Mini App для записи в студию', en: 'Telegram Mini App for salon booking' } as L,
    description: {
      ru: 'Запись к мастеру прямо в Telegram: услуга, мастер, свободное время, подтверждение. Цвета темы пользователя, родные кнопки Telegram (MainButton, BackButton), вибрация, записи в CloudStorage — видны на всех устройствах. Расписание с учётом длительности услуги и режимом «любой мастер», демо-режим вне Telegram.',
      en: 'Book a master right inside Telegram: service, master, free slot, confirmation. Uses the user’s theme colors, native Telegram buttons (MainButton, BackButton), haptics, bookings in CloudStorage synced across devices. Scheduling respects service duration with an “any master” mode; a demo mode outside Telegram.',
    } as L,
    images: ['/projects/myata-book.webp', '/projects/myata-dark.webp', '/projects/myata-done.webp'],
    stack: ['React', 'TypeScript', 'Telegram Mini Apps', 'Zustand', 'Vite'],
    demo: 'https://dmitriy9427.github.io/myata/',
    repo: 'https://github.com/dmitriy9427/myata',
  },
  {
    title: { ru: 'Ритм', en: 'Ritm' } as L,
    subtitle: { ru: 'Мобильное приложение: трекер привычек', en: 'Mobile app: habit tracker' } as L,
    description: {
      ru: 'Приложение на React Native и Expo: один код для iOS, Android и браузера. Привычки по дням недели, счётчики, серии, статистика с «тепловой картой». Отметка свайпом — жест и анимация в UI-потоке (Gesture Handler, Reanimated), кольцо прогресса на SVG. Данные на устройстве с версией и миграцией, локальные напоминания, вибрация, тёмная тема, доступность.',
      en: 'A React Native + Expo app: one codebase for iOS, Android and the web. Habits by weekday, counters, streaks, stats with a heatmap. Swipe to check off — the gesture and animation run on the UI thread (Gesture Handler, Reanimated), with an SVG progress ring. On-device data with versioning and migration, local reminders, haptics, dark theme, accessibility.',
    } as L,
    images: ['/projects/ritm-light.webp', '/projects/ritm-dark.webp'],
    stack: ['React Native', 'Expo', 'TypeScript', 'Reanimated', 'Zustand'],
    demo: 'https://dmitriy9427.github.io/ritm/',
    repo: 'https://github.com/dmitriy9427/ritm',
  },
  {
    title: { ru: 'Пропуск', en: 'Propusk' } as L,
    subtitle: { ru: 'Авторизация, сделанная как в продукте', en: 'Production-grade authentication' } as L,
    description: {
      ru: 'Access-токен (JWT) в памяти и refresh-токен в HttpOnly-cookie с ротацией и обнаружением кражи; пароли на PBKDF2 с защитой от перебора и одинаковыми ошибками. Двухфакторная защита (TOTP, коды восстановления), ключи доступа (WebAuthn), вход через провайдера по OAuth 2.0 + PKCE + OpenID Connect, ссылки из писем, устройства, режим судо, роли. Клиент обновляет токен один раз на все запросы и вкладки (Web Locks), выходит во всех вкладках (BroadcastChannel). Сервер на Hono работает и на Node, и в браузере. 62 теста, включая passkeys в Playwright.',
      en: 'A JWT access token in memory and a refresh token in an HttpOnly cookie with rotation and theft detection; PBKDF2 passwords with brute-force protection and uniform errors. Two-factor auth (TOTP, recovery codes), passkeys (WebAuthn), sign-in via a provider with OAuth 2.0 + PKCE + OpenID Connect, email links, devices, sudo mode, roles. The client refreshes once for all requests and tabs (Web Locks) and logs out everywhere (BroadcastChannel). The Hono server runs both on Node and in the browser. 62 tests, including passkeys in Playwright.',
    } as L,
    images: ['/projects/propusk-hood.webp', '/projects/propusk-security.webp', '/projects/propusk-oauth.webp'],
    stack: ['React', 'TypeScript', 'OAuth 2.0 / OIDC', 'WebAuthn', 'Hono'],
    demo: 'https://dmitriy9427.github.io/propusk/',
    repo: 'https://github.com/dmitriy9427/propusk',
  },
  {
    title: { ru: 'Сальдо', en: 'Saldo' } as L,
    subtitle: { ru: 'Учёт личных финансов на Redux Toolkit и FSD', en: 'Personal finance app on Redux Toolkit and FSD' } as L,
    description: {
      ru: 'RTK Query: один createApi, эндпоинты в сущностях, теги — после любой операции сами обновляются список, остатки, графики и бюджеты; оптимистичная правка с откатом. Удаление с отменой на listener middleware, мастер импорта CSV на createSlice и createSelector (кодировка, колонки и категории угадываются, дубликаты пропускаются). Архитектура Feature-Sliced Design с проверкой Steiger. Формы на react-hook-form + zod, деньги в копейках, графики Recharts. 75 тестов: Vitest с MSW и Playwright.',
      en: 'RTK Query: a single createApi with endpoints injected per entity and tags — after any change the list, balances, charts and budgets refresh themselves; optimistic edits with rollback. Undoable delete via listener middleware, a CSV import wizard on createSlice and createSelector (encoding, columns and categories are detected, duplicates skipped). Feature-Sliced Design architecture enforced by Steiger. Forms with react-hook-form + zod, money in minor units, Recharts charts. 75 tests: Vitest with MSW and Playwright.',
    } as L,
    images: ['/projects/saldo-dashboard.webp', '/projects/saldo-import.webp', '/projects/saldo-budgets.webp'],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Feature-Sliced Design'],
    demo: 'https://dmitriy9427.github.io/saldo/',
    repo: 'https://github.com/dmitriy9427/saldo',
  },
  {
    title: { ru: 'Прилавок', en: 'Prilavok' } as L,
    subtitle: { ru: 'Админка интернет-магазина с реальным временем', en: 'Real-time e-commerce admin panel' } as L,
    description: {
      ru: 'Свой WebSocket-клиент без библиотек: переподключение с нарастающей паузой и jitter, heartbeat, каналы, запросы с подтверждением, очередь и докачка пропущенных событий по номеру и эпохе сервера. События попадают в кэш TanStack Query, версии записей защищают от гонок. Серверная таблица с состоянием в адресе, 10 000 строк с виртуализацией, оптимистичные обновления, роли. Сервер работает в браузере через MSW и на Node. 138 тестов.',
      en: 'A hand-written WebSocket client: reconnection with exponential backoff and jitter, heartbeat, channels, acknowledged requests, an offline queue and resuming missed events by sequence number and server epoch. Events flow into the TanStack Query cache; record versions guard against races. A server-side table with URL state, 10,000 virtualized rows, optimistic updates, roles. The server runs in the browser via MSW and on Node. 138 tests.',
    } as L,
    images: ['/projects/prilavok-dashboard.webp', '/projects/prilavok-realtime.webp', '/projects/prilavok-orders.webp'],
    stack: ['React', 'TypeScript', 'WebSocket', 'TanStack Router / Query / Table', 'shadcn/ui'],
    demo: 'https://dmitriy9427.github.io/prilavok/',
    repo: 'https://github.com/dmitriy9427/prilavok',
  },
  {
    title: { ru: 'Опора', en: 'Opora' } as L,
    subtitle: { ru: 'Библиотека React-компонентов', en: 'React component library' } as L,
    description: {
      ru: '16 доступных компонентов, написанных без Radix и других готовых основ: диалог с ловушкой фокуса и inert, меню и вкладки с навигацией стрелками, селект на aria-activedescendant, тосты с живыми областями, своё позиционирование с flip и shift. Стили в каскадных слоях и на токенах — переопределяются без !important. Пакет: ESM, типы, карта exports, проверки publint и attw, установка упакованного архива с серверным рендерингом. 133 теста с axe, Storybook.',
      en: '16 accessible components built without Radix or other headless foundations: a dialog with a focus trap and inert, arrow-key navigation in menus and tabs, a select using aria-activedescendant, toasts as live regions, custom positioning with flip and shift. Styles in cascade layers and tokens — overridable without !important. Package: ESM, types, an exports map, publint and attw checks, installing the packed tarball with SSR. 133 tests with axe, Storybook.',
    } as L,
    images: ['/projects/opora-example.webp', '/projects/opora-dialog.webp', '/projects/opora-form.webp'],
    stack: ['React', 'TypeScript', 'Accessibility (WAI-ARIA)', 'Storybook', 'Vitest'],
    demo: 'https://dmitriy9427.github.io/opora/',
    repo: 'https://github.com/dmitriy9427/opora',
  },
  {
    title: { ru: 'Квартал «Сосны»', en: 'Sosny Residence' } as L,
    subtitle: { ru: 'Сайт жилого комплекса', en: 'Residential complex website' } as L,
    description: {
      ru: '3D-квартал на three.js: при наведении на башню — свободные квартиры. Каталог из 270 квартир: фильтры, шахматка, состояние в адресе. Статические страницы квартир с SVG-планировками, избранное, ипотечный калькулятор.',
      en: 'A three.js 3D block: hover a tower to see available flats. A catalog of 270 flats with filters, a floor grid and URL state. Static flat pages with SVG floor plans, favorites, a mortgage calculator.',
    } as L,
    images: ['/projects/sosny-home.webp', '/projects/sosny-chess.webp', '/projects/sosny-flat.webp'],
    stack: ['Astro', 'TypeScript', 'Three.js', 'GSAP', 'SCSS'],
    demo: 'https://dmitriy9427.github.io/zhk-sosny/',
    repo: 'https://github.com/dmitriy9427/zhk-sosny',
  },
  {
    title: { ru: 'ОРБИТА', en: 'ORBITA' } as L,
    subtitle: { ru: 'Сайт космического агентства', en: 'Space agency website' } as L,
    description: {
      ru: '3D-ракета летит по своей траектории, пока листаешь страницу, а по кнопке «Пуск» проходит её обратно и садится на стартовую площадку. Все 16 плагинов GSAP, шесть слайдеров без библиотек, шейдерные переходы, симуляция воды на GPU, бесконечная галерея. Три страницы, 120 fps, 218 тестов.',
      en: 'A 3D rocket follows its trajectory as you scroll, and on “Launch” flies it back and lands on the pad. All 16 GSAP plugins, six library-free sliders, shader transitions, GPU water simulation, an infinite gallery. Three pages, 120 fps, 218 tests.',
    } as L,
    images: ['/projects/orbita-home.webp', '/projects/orbita-sliders.webp', '/projects/orbita-destinations.webp'],
    stack: ['GSAP', 'Three.js', 'GLSL', 'Vite', 'Vitest'],
    demo: 'https://dmitriy9427.github.io/space-agency/',
    repo: 'https://github.com/dmitriy9427/space-agency',
  },
  {
    title: { ru: 'frontend-kit', en: 'frontend-kit' } as L,
    subtitle: { ru: 'Шаблон для старта проектов', en: 'Project starter kit' } as L,
    description: {
      ru: '36 модулей, формы со схемами в стиле zod и масками, Swiper, 3D-слайдер, i18n, dev-панель, 4 стартера: vanilla, React, React + TS, Astro. На нём собран этот сайт.',
      en: '36 modules, zod-style form schemas and masks, Swiper, 3D slider, i18n, dev panel, 4 starters: vanilla, React, React + TS, Astro. This site is built with it.',
    } as L,
    images: ['/projects/kit-drum.webp', '/projects/kit-form.webp'],
    stack: ['TypeScript', 'Astro', 'React', 'SCSS', 'GSAP'],
    demo: 'https://dmitriy9427.github.io/frontend-kit/',
    repo: 'https://github.com/dmitriy9427/frontend-kit',
  },
]
