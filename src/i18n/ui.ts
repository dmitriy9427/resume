/**
 * Подписи интерфейса (заголовки разделов, кнопки) на всех языках.
 * Содержимое резюме (проекты, навыки) — в src/data/resume.ts.
 *
 * Добавить язык: astro.config.mjs → i18n.locales, сюда — словарь с теми же
 * ключами (TypeScript подскажет пропуски), src/pages/<код>/index.astro,
 * и в src/data/resume.ts — поле <код> у каждого текста.
 */
export const LOCALES = ['ru', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'ru'

const ru = {
  'meta.title': 'Frontend-разработчик — резюме',
  'meta.description':
    'Резюме frontend-разработчика: React, TypeScript, Astro, GSAP, Three.js. Проекты в продакшне и пет-проекты.',
  skip: 'Перейти к содержимому',
  'nav.about': 'Обо мне',
  'nav.skills': 'Навыки',
  'nav.projects': 'Проекты',
  'nav.pets': 'Пет-проекты',
  'nav.contact': 'Контакты',
  'hero.cta': 'Написать мне',
  'hero.projects': 'Смотреть проекты',
  'hero.scroll': 'Листайте',
  'about.title': 'Обо мне',
  'skills.title': 'Навыки',
  'skills.lead': 'Чем пользуюсь каждый день',
  'experience.title': 'Опыт',
  'projects.title': 'Проекты в продакшне',
  'projects.lead': 'Код закрыт договором о неразглашении — показываю, что за проект и что делал я.',
  'projects.all': 'Все',
  'projects.open': 'Открыть сайт',
  'projects.nda': 'Ссылка по запросу',
  'pets.title': 'Пет-проекты',
  'pets.lead': 'Здесь можно посмотреть код — то, что делаю для себя и для практики.',
  'pets.demo': 'Демо',
  'pets.repo': 'Код',
  'pets.soon': 'Скоро',
  'contact.title': 'Давайте сделаем что-то крутое',
  'contact.lead': 'Открыт к проектам и предложениям о работе. Отвечаю в течение дня.',
  'contact.copy': 'Скопировать',
  'contact.copied': 'E-mail скопирован',
  'contact.cv': 'Скачать резюме (PDF)',
  'footer.made': 'Сделано на Astro, GSAP и WebGL',
  'cursor.drag': 'Тянуть',
  'cursor.open': 'Открыть',
  'notFound.title': 'Страница не найдена',
  'notFound.back': 'На главную',
}

type Dictionary = Record<keyof typeof ru, string>

const en: Dictionary = {
  'meta.title': 'Frontend Developer — Resume',
  'meta.description':
    'Frontend developer resume: React, TypeScript, Astro, GSAP, Three.js. Production work and side projects.',
  skip: 'Skip to content',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.pets': 'Side projects',
  'nav.contact': 'Contact',
  'hero.cta': 'Get in touch',
  'hero.projects': 'See projects',
  'hero.scroll': 'Scroll',
  'about.title': 'About',
  'skills.title': 'Skills',
  'skills.lead': 'What I use every day',
  'experience.title': 'Experience',
  'projects.title': 'Production work',
  'projects.lead': 'The code is under NDA — here is what each project is and what I did.',
  'projects.all': 'All',
  'projects.open': 'Open site',
  'projects.nda': 'Link on request',
  'pets.title': 'Side projects',
  'pets.lead': 'Code you can actually look at — things I build for myself and for practice.',
  'pets.demo': 'Demo',
  'pets.repo': 'Code',
  'pets.soon': 'Soon',
  'contact.title': 'Let’s build something great',
  'contact.lead': 'Open to projects and job offers. I reply within a day.',
  'contact.copy': 'Copy',
  'contact.copied': 'E-mail copied',
  'contact.cv': 'Download CV (PDF)',
  'footer.made': 'Made with Astro, GSAP and WebGL',
  'cursor.drag': 'Drag',
  'cursor.open': 'Open',
  'notFound.title': 'Page not found',
  'notFound.back': 'Back home',
}

export const ui: Record<Locale, Dictionary> = { ru, en }

export const asLocale = (locale: string | undefined): Locale =>
  (LOCALES as readonly string[]).includes(locale ?? '') ? (locale as Locale) : DEFAULT_LOCALE

/** Переводчик подписей: const t = useTranslations(Astro.currentLocale). */
export function useTranslations(locale: string | undefined) {
  const lang = asLocale(locale)
  return (key: keyof typeof ru): string => ui[lang][key] ?? ui[DEFAULT_LOCALE][key]
}

/** Текст из src/data/resume.ts на нужном языке: pick(project.title, locale). */
export const pick = (text: { ru: string; en: string }, locale: string | undefined) => text[asLocale(locale)]

/** Адрес страницы на нужном языке: localePath('en', '/') → '/en/'. */
export function localePath(locale: Locale, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean === '/' ? '/' : clean}`
}

/** Убрать языковой префикс: '/en/' → '/'. */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split('/')
  return (LOCALES as readonly string[]).includes(first) && first !== DEFAULT_LOCALE ? `/${rest.join('/')}` : pathname
}
