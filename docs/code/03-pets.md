# 3. Стопка пет-проектов

[src/components/Pets.astro](../../src/components/Pets.astro), модуль `stack-cards` кита
([kit/js/modules/stack-cards](../../kit/js/modules/stack-cards/index.js)),
стили — `src/styles/sections/_pets.scss`.

## Где на экране

Раздел «Пет-проекты»: при прокрутке карточки ложатся друг на друга стопкой, нижняя слегка
затемняется. В каждой — номер, описание, стек, кнопки «Демо» и «Код» и галерея скриншотов. На
планшете и телефоне карточка стоит **по центру** экрана, и её можно нажать целиком.

## Разметка

```astro
<div class="stack-cards" data-module="stack-cards">
  {pets.map((pet, i) => (
    <article class="stack-cards__item pet" data-stack-card>
      <div class="pet__info">
        <h3 class="pet__title">
          <a class="pet__link" href={pet.demo ?? pet.repo} target="_blank" rel="noopener">{pick(pet.title, locale)}</a>
        </h3>
        …
        <div class="pet__links">
          {pet.demo ? <a class="btn" href={pet.demo}>Демо ↗</a>
                    : <span class="btn btn--secondary is-disabled" aria-disabled="true">Демо · Скоро</span>}
          {pet.repo && <a class="btn btn--ghost" href={pet.repo}>Код ↗</a>}
        </div>
      </div>
      <div class="pet__gallery swiper" data-module="swiper" data-swiper-preset="fade">…</div>
    </article>
  ))}
</div>
```

Данные — массив `pets` в `resume.ts`; разметка повторяется циклом при сборке.

## Растянутая ссылка: вся карточка нажимается

```scss
.pet__link::after {
  position: absolute;
  inset: 0;          // на всю карточку (у карточки position: relative)
  z-index: 1;
  content: '';
  border-radius: inherit;
}

.pet__links,
.pet__gallery {
  position: relative;
  z-index: 2;        // поверх растянутой ссылки
}
```

Почему так, а не `<a>` вокруг всей карточки:

- Внутри карточки есть **свои** ссылки и кнопки — ссылку в ссылку вкладывать нельзя.
- Скринридер слышит короткое имя ссылки (название проекта), а не весь текст карточки подряд.

Решение: ссылка — только заголовок, а её псевдоэлемент `::after` растянут на всю карточку. Кнопки
и галерея подняты **выше** по слою — их клики и листание работают отдельно. Фокус с клавиатуры
рисуется на `::after` — обводка всей карточки.

## Стопка: модуль `stack-cards`

Карточки — `position: sticky`: доехав до верха, «прилипают», а следующая наезжает сверху. Модуль
кита добавляет две вещи.

### 1. Где прилипнуть: по центру экрана

```js
export function stackTop(height, viewport, header, offset, gap) {
  const slack = viewport - header - height - gap * 2
  if (slack < 0) return null
  return Math.round(header + gap + slack / 2 + Math.min(offset, slack / 2))
}
```

- `slack` — свободное место по вертикали: экран минус шапка, карточка и отступы.
- Карточка прилипает **посередине свободного места** (`slack / 2`) — на телефоне её нижний край не
  уходит под жесты системы и шторку браузера.
- `offset` — небольшой сдвиг каждой следующей карточки (видно стопку), **но не больше** половины
  запаса: иначе сдвиги накапливались бы, и пятая карточка уезжала бы за низ экрана.
- Не помещается (`slack < 0`) — `null`: карточка получает класс `is-tall` и становится обычной,
  неприлипающей. Высокую карточку нельзя прочитать, если она прилипла.

Результат записывается в CSS-переменную `--stack-top` каждой карточки; пересчёт — при изменении
размеров (`ResizeObserver`).

### 2. Затемнение нижней — дёшево

На нижние карточки модуль кладёт слой `.stack-cards__shade` и при прокрутке анимирует его
`opacity`. Почему не CSS-переменная яркости у самой карточки: изменение переменной, которую
наследуют все потомки, заставляет браузер пересчитывать стили всего содержимого на каждом кадре —
на телефоне прокрутка «фризилась». `opacity` отдельного слоя видеокарта меняет без пересчёта.

## Рядом: прожектор на карточках проектов и навыков (`spotlight`)

В разделах «Навыки» и «Проекты» у карточек класс `spot` — светлое пятно следует за курсором.
[src/modules/spotlight/index.ts](../../src/modules/spotlight/index.ts):

```ts
export default function spotlight(root: HTMLElement) {
  if (!canHover()) return undefined
  const d = createDisposer()
  d.listen(root, 'pointermove', (event: PointerEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.spot')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  })
  return { destroy: d.dispose }
}
```

- Только там, где есть наведение (мышь) — на тач-экране модуль не запускается.
- Один обработчик на весь блок (делегирование), а не по одному на карточку.
- Модуль пишет **только координаты** в CSS-переменные; светлое пятно рисует CSS
  (`radial-gradient(… at var(--spot-x) var(--spot-y))`).

## Что будет, если…

| Сделать | Что сломается |
| --- | --- |
| `<a>` вокруг всей карточки | кнопки «Демо» и «Код» внутри ссылки — недопустимый HTML |
| без `z-index: 2` у кнопок | клик по «Код» открывает демо |
| прилипать к верху на телефоне | ссылку внизу карточки не нажать — мешают жесты системы |
| без ограничения `offset` | нижние карточки стопки уезжают за экран |
| затемнение переменной у карточки | рывки прокрутки на телефоне |

## Проверьте себя

1. Экран 800 px, шапка 64, карточка 560, отступ 16, сдвиг 40. Где прилипнет карточка?
2. Почему у «Демо · Скоро» `aria-disabled`, а не `disabled`?

<details>
<summary>Ответы</summary>

1. `slack = 800 − 64 − 560 − 32 = 144`; `top = 64 + 16 + 72 + min(40, 72) = 192` px.
2. Это `<span>`, а не кнопка: `disabled` у него нет. `aria-disabled` сообщает скринридеру
   «недоступно», а вид задаёт класс `is-disabled`.
</details>
