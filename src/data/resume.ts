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
    ru: 'Делаю быстрые и живые интерфейсы: от вёрстки сайтов университетов до WebGL-анимаций и панелей управления на React.',
    en: 'I build fast, living interfaces: from university websites to WebGL animations and React dashboards.',
  } as L,
  /** Бейдж «открыт к предложениям». false — бейдж скрыт. */
  available: true,
  availableText: { ru: 'Открыт к проектам', en: 'Open to projects' } as L,
  /** Абзацы блока «Обо мне». */
  about: [
    {
      ru: 'Frontend-разработчик. Делаю сайты университетов, медицинских центров и спецпроекты: от адаптивной вёрстки и UI-китов до анимаций на GSAP и сцен на Three.js.',
      en: 'Frontend developer. I build websites for universities, medical centers and special projects: from responsive markup and UI kits to GSAP animations and Three.js scenes.',
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
  { value: 11, suffix: '+', label: { ru: 'проектов в продакшне', en: 'projects in production' } as L },
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
    items: ['JavaScript (ES2023)', 'TypeScript', 'DOM API', 'Web Components', 'htmx'],
  },
  {
    title: { ru: 'Фреймворки', en: 'Frameworks' },
    items: [
      'React',
      'Next.js (App Router)',
      'Astro',
      'React Router',
      'TanStack Router / Table / Virtual',
      'Redux Toolkit',
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
      'GLSL-шейдеры',
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
        ru: 'Вёрстка и фронтенд сайтов университетов и медицинских центров: от макета до продакшна.',
        en: 'Markup and frontend for university and medical center websites: from design to production.',
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
        ru: 'Интерфейсы на React: панель управления AI-ассистентом, личные кабинеты, формы и фильтры.',
        en: 'React interfaces: AI assistant admin panel, user dashboards, forms and filters.',
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
    title: { ru: 'Сайт Югорского госуниверситета', en: 'Yugra State University website' },
    description: {
      ru: 'Большая часть фронтенда: UI-кит на Astro + React со Storybook, анимации, адаптив, тесты.',
      en: 'Most of the frontend: Astro + React UI kit with Storybook, animations, responsive layout, tests.',
    },
    category: 'edu',
    year: '2026',
    stack: ['Astro', 'React', 'TypeScript', 'Storybook', 'GSAP', 'Vitest'],
    href: '',
    featured: true,
    cover: { text: 'ЮГУ', note: { ru: 'Скоро в проде', en: 'Coming soon' } },
  },
  {
    title: { ru: 'Панель управления AI-ассистентом', en: 'AI assistant admin panel' },
    description: {
      ru: 'Внутренний сервис компании: интерфейс RAG-ассистента, чаты со стримингом ответов.',
      en: 'Internal company tool: a RAG assistant UI with streaming chat responses.',
    },
    category: 'app',
    year: '2026',
    stack: ['React', 'TypeScript', 'TanStack', 'Redux Toolkit', 'shadcn/ui', 'Tailwind'],
    href: '',
    featured: true,
    cover: { text: 'RAG', note: { ru: 'Под NDA', en: 'Under NDA' } },
  },
  {
    title: { ru: 'Сайт Томского НИМЦ', en: 'Tomsk National Research Medical Center' },
    description: {
      ru: 'Вёрстка разделов, карточки сотрудников и новостей, компоненты на React.',
      en: 'Sections markup, staff and news cards, React components.',
    },
    category: 'med',
    year: '2026',
    stack: ['Pug', 'SCSS', 'JavaScript', 'React', 'GSAP'],
    href: 'https://www.tnimc.ru',
    image: '/projects/work-tnimc.webp',
    featured: true,
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
    featured: true,
  },
  {
    title: { ru: 'Сайт для абитуриентов технического вуза', en: 'Admissions website of a technical university' },
    description: {
      ru: 'Фильтры направлений, анимации текста, WebGL-эффекты на главной.',
      en: 'Program filters, text animations, WebGL effects on the home page.',
    },
    category: 'edu',
    year: '2026',
    stack: ['JavaScript', 'GSAP', 'Three.js', 'GLSL', 'htmx'],
    href: '',
    cover: { text: 'Абитуриенту', note: { ru: 'Скоро в проде', en: 'Coming soon' } },
  },
  {
    title: { ru: 'Сайт Тюменского медицинского университета', en: 'Tyumen Medical University website' },
    description: {
      ru: 'Формы с проверкой и оплатой обучения, расписание, разделы для абитуриентов.',
      en: 'Validated forms and tuition payment, schedule, admissions sections.',
    },
    category: 'med',
    year: '2025',
    stack: ['JavaScript', 'SCSS', 'GSAP', 'Three.js'],
    href: 'https://www.tyumsmu.ru',
    image: '/projects/work-tyumsmu.webp',
  },
  {
    title: { ru: 'Исторический спецпроект университета', en: 'University history special project' },
    description: {
      ru: 'Лента времени, шейдерные эффекты и шум поверх текстур, анимации появления.',
      en: 'Timeline, shader effects and noise over textures, reveal animations.',
    },
    category: 'special',
    year: '2025',
    stack: ['Three.js', 'GLSL', 'GSAP', 'Swiper'],
    href: '',
    featured: true,
    cover: { text: 'История', note: { ru: 'Закрытый проект', en: 'Private project' } },
  },
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
    title: { ru: 'Сайт ПсковГУ', en: 'Pskov State University website' },
    description: {
      ru: 'Первый самостоятельный проект: вёрстка и интерактивное расписание на React.',
      en: 'My first solo project: markup and an interactive React schedule.',
    },
    category: 'edu',
    year: '2024',
    stack: ['JavaScript', 'React', 'SCSS', 'Swiper'],
    href: 'https://pskgu.ru',
    image: '/projects/work-pskgu.webp',
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
    title: { ru: 'Сайт ПГМУ', en: 'Perm State Medical University website' },
    description: {
      ru: 'Разводящие страницы, структура подразделений, оплата обучения, карта, адаптивные таблицы.',
      en: 'Landing pages, departments structure, tuition payment, a map, responsive tables.',
    },
    category: 'med',
    year: '2025',
    stack: ['Pug', 'SCSS', 'JavaScript', 'Vue', 'htmx', 'Swiper'],
    href: 'https://psmu.ru',
    image: '/projects/work-psmu.webp',
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
      ru: '3D-ракета, которая летит по скроллу, все плагины GSAP, шейдерные переходы между страницами, симуляция воды на GPU, бесконечная галерея. 120 fps, 200+ тестов.',
      en: 'A 3D rocket flying on scroll, every GSAP plugin, shader page transitions, GPU water simulation, infinite gallery. 120 fps, 200+ tests.',
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
