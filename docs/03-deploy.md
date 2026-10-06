# 03. Деплой и подпапка

Сайт на GitHub Pages: `https://dmitriy9427.github.io/resume/`.

- `astro.config.mjs`: `site: 'https://dmitriy9427.github.io'`, `base` — из
  переменной `BASE_URL` при сборке (в Actions — `/resume/`).
- Astro добавляет base к своим CSS, JS и шрифтам, а ссылки в разметке — наша
  забота. Все пути идут через `withBase()` из `src/i18n/ui.ts`: картинки
  проектов, ссылки на языковые версии, Open Graph.
- `localePath(locale, path)` строит адрес языковой версии с учётом base, а
  `stripLocale(pathname)` наоборот срезает base и язык — так переключатель
  языка понимает, на какой странице мы находимся.
- Абсолютные ссылки (hreflang, `og:image`) строятся через
  `new URL(path, Astro.site)` — соцсети и поисковики требуют полный адрес.
