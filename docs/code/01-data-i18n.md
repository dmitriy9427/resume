# 1. Данные и два языка

[src/data/resume.ts](../../src/data/resume.ts), [src/i18n/ui.ts](../../src/i18n/ui.ts),
[src/pages/index.astro](../../src/pages/index.astro) и `src/pages/en/index.astro`.

## Где на экране

Всё: имя, «Обо мне», навыки, опыт, проекты, пет-проекты, контакты — на русском по `/` и на
английском по `/en/`. Переключатель RU/EN в шапке.

## Два вида текстов

| Что | Где | Пример |
| --- | --- | --- |
| **содержимое** — о вас и проектах | `src/data/resume.ts` | описание пет-проекта |
| **подписи интерфейса** — одинаковые у всех | `src/i18n/ui.ts` | «Пет-проекты», «Демо», «Код» |

## Содержимое: текст на двух языках одним объектом

```ts
export type L = { ru: string; en: string }

export const profile = {
  name: { ru: 'Дмитрий', en: 'Dmitry' } as L,
  role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' } as L,
  available: true,
  …
}
```

Каждый текст — объект с **обоими** языками рядом. Забыть перевод невозможно: у типа `L` оба поля
обязательные, TypeScript подсветит.

```ts
export const pick = (text: { ru: string; en: string }, locale: string | undefined) => text[asLocale(locale)]
```

```astro
<h3>{pick(pet.title, locale)}</h3>
```

`asLocale` превращает что угодно в допустимый язык: неизвестный — в русский по умолчанию.

## Подписи: словарь с проверкой ключей

```ts
export const LOCALES = ['ru', 'en'] as const
export type Locale = (typeof LOCALES)[number]       // 'ru' | 'en'

const ru = {
  'nav.about': 'Обо мне',
  'pets.title': 'Пет-проекты',
  …
}

type Dictionary = Record<keyof typeof ru, string>   // ровно те же ключи, что у русского

const en: Dictionary = {
  'nav.about': 'About',
  …
}
```

- `as const` — массив становится типом из двух строк, а не просто `string[]`.
- `keyof typeof ru` — все ключи русского словаря. Английский обязан иметь **те же** — пропущенный
  ключ — ошибка компиляции, а не пустая кнопка на сайте.

```ts
export function useTranslations(locale: string | undefined) {
  const lang = asLocale(locale)
  return (key: keyof typeof ru): string => ui[lang][key] ?? ui[DEFAULT_LOCALE][key]
}
```

```astro
---
const t = useTranslations(Astro.currentLocale)
---
<h2>{t('pets.title')}</h2>
```

`key: keyof typeof ru` — опечатка в ключе (`'pets.titel'`) — тоже ошибка компиляции.

## Две страницы, один компонент

```astro
---
// src/pages/index.astro и src/pages/en/index.astro — почти одинаковые
import ResumePage from '../components/ResumePage.astro'
---
<ResumePage />
```

Astro знает язык страницы по папке (`en/`) — `Astro.currentLocale`. Компоненты берут язык оттуда.

**Почему две страницы, а не переключение скриптом.** Поисковик индексирует то, что лежит **по
адресу**. Язык, переключённый на лету, он не увидит — английская версия не попала бы в поиск.

```html
<link rel="alternate" hreflang="ru" href="https://…/resume/" />
<link rel="alternate" hreflang="en" href="https://…/resume/en/" />
<link rel="alternate" hreflang="x-default" href="https://…/resume/" />
```

`hreflang` говорит поисковику «это одна страница на двух языках» — он покажет нужную и не сочтёт
их дублями.

## Пути с учётом подпапки

```ts
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
export const withBase = (path: string) => `${BASE}${path.startsWith('/') ? path : `/${path}`}`

export function localePath(locale: Locale, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`
  return withBase(locale === DEFAULT_LOCALE ? clean : `/${locale}${clean === '/' ? '/' : clean}`)
}
```

На GitHub Pages сайт живёт в `/resume/`: `localePath('en')` → `/resume/en/`. Язык по умолчанию —
без префикса.

## Что будет, если…

| Сделать | Что сломается |
| --- | --- |
| тексты в компонентах | перевод легко забыть, правка — поиск по разметке |
| `Record<string, string>` для словаря | пропущенный ключ — пустая кнопка на сайте вместо ошибки сборки |
| язык переключать скриптом | английской версии нет в поиске |
| ссылки без `withBase` | на Pages — 404 |

## Проверьте себя

1. Как добавить третий язык?
2. Почему проект под NDA можно оставить в данных?

<details>
<summary>Ответы</summary>

1. Добавить код в `LOCALES` и `astro.config.mjs`, словарь `Dictionary` в `ui.ts` (TypeScript
   подскажет все ключи), страницу `src/pages/<код>/index.astro` и поле с этим кодом у каждого
   текста `L` в `resume.ts` (тип `L` тоже расширить).
2. Он не показывается на сайте (фильтр по наличию ссылки), но остаётся под рукой для рассказа на
   собеседовании.
</details>
