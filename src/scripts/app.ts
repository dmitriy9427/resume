/**
 * Запуск модулей на странице (подключён в layouts/Base.astro).
 * Модули кита (data-module="reveal", "swiper"…) + свои модули резюме.
 * Свой модуль: src/modules/<имя>/index.ts + строка в projectModules.
 */
import { createApp } from 'kit/js/core/app.js'
import { lazy } from 'kit/js/core/registry.js'
import { kitModules } from 'kit/js/modules/index.js'

const projectModules = {
  aurora: lazy(() => import('../modules/aurora/index')),
  'copy-text': lazy(() => import('../modules/copy-text/index')),
  spotlight: lazy(() => import('../modules/spotlight/index')),
}

createApp({ modules: { ...kitModules, ...projectModules }, smooth: true })

if (import.meta.env.DEV) {
  import('kit/devtools/index.js').then((m) => m.installDevtools())
}
