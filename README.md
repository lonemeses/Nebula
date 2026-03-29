# 🌌 Nebula Engine

**High-Performance Collaborative Canvas Engine**
_Next.js 15+ | Effector | Yjs (CRDT) | Turborepo | FSD Architecture_

## 🚀 Обзор

**Nebula Engine** — это масштабируемая платформа для совместной работы в реальном времени. Проект спроектирован как Engine-first решение: вся бизнес-логика полностью отделена от рендеринга, что позволяет расширять систему новыми типами блоков (плагинами) без изменения основного кода.

### Основные фичи:

- **Multiplayer Collaboration:** Синхронизация состояния через WebRTC с использованием CRDT (Yjs). Конфликты данных исключены на уровне математической модели.
- **Plugin System:** Архитектура "Open-Closed". Новые инструменты (текст, фигуры, изображения) регистрируются в реестре и автоматически появляются в UI.
- **Advanced State Management:** Сложная логика Undo/Redo на основе снимков состояния (Snapshots) реализована на Effector.
- **60 FPS Performance:** GPU-ускорение (translate3d), мемоизация компонентов и троттлинг событий мыши для плавной работы при сотнях объектов.

---

## 🛠 Технологический стек

### Core

- **Framework:** Next.js 15 (App Router)
- **State:** Effector + Effector React (Atomic State)
- **Real-time:** Yjs (CRDT) + y-webrtc
- **Styling:** Tailwind CSS v4 (Lightning CSS)

### Architecture & Infrastructure

- **Monorepo:** Turborepo (Shared configs, Core logic, UI Kit)
- **Methodology:** Feature-Sliced Design (FSD)
- **Testing:** Vitest (Unit) + Playwright (E2E)
- **CI/CD:** GitHub Actions (Linting, Testing)

---

## 🏗 Архитектурные решения (Senior Insights)

### 1. Декомпозиция в Monorepo

Проект разделен на пакеты для обеспечения **High Cohesion** и **Low Coupling:**

- `apps/web`: Тонкий клиент на Next.js (только View-слой).
- `packages/core`: Headless-логика движка (Effector-сторы, Yjs-синхронизация, бизнес-правила).
- `packages/tsconfig / eslint-config`: Единые стандарты качества кода.

### 2. Синхронизация через CRDT

Вместо традиционных WebSockets с централизованным сервером используется **P2P через WebRTC**. Использование Yjs позволяет избежать Race Conditions при одновременном редактировании одного и того же блока разными пользователями.

### 3. Оптимизация рендеринга

Для достижения высокой производительности при перетаскивании:

- Вычисления координат вынесены в поток композитора через CSS `transform`.
- Применена строгая мемоизация `BlockWrapper` через `React.memo`, что исключает перерендеринг всего холста при движении одного объекта.
- Частота обновлений сети ограничена (throttled) до 60Hz.

  ***

## 🚦 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск локального сигнального сервера (WebRTC)

Для работы мультиплеера локально необходимо запустить матчмейкер:

```bash
npx y-webrtc-signaling --port 4444
```

### 3. Запуск приложения

```bash
npm run dev
```

Откройте `http://localhost:3000` в двух разных окнах (одно в инкогнито), чтобы протестировать синхронизацию.

---

## 🧪 Тестирование

- **Unit (Logic):** `npm run test --workspace=@nebula/core`
- **E2E (User Flow):** `npx playwright test`

---

## 📈 Roadmap

- [] Перенос рендеринга на Canvas API / Konva для поддержки 10,000+ объектов.
- [] Добавление Shared Workers для синхронизации вкладок без сетевого оверхеда.
- [] Интеграция с Supabase для персистентного хранения документов.
