# Polux Mods — FS Mobile Mods

Повноцінний статичний SPA-сайт у pixel/CRT стилі для каталогу модів Farming Simulator Mobile.

## Підключено

- Firebase Web config у `scripts/firebase-config.js`.
- Firebase Authentication у `scripts/firebase-auth-service.js`.
- Email/Password реєстрація та вхід.
- Підтвердження пошти після реєстрації.
- Google Login.
- Відновлення пароля через Firebase.
- Власне вікно введення нового пароля для посилання з Firebase.
- Профіль користувача з ім'ям, email, статусом підтвердження пошти та Google-аватаркою.
- Локалізація незмінних елементів сайту.
- Автоматична система перекладу для змінного контенту з винятками для службових полів.

## Firebase

У Firebase Authentication потрібно увімкнути:

- Email/Password
- Google

Для Google обов'язково вибрати `Support email for project`.

Для GitHub Pages додай домен у Firebase:

`Authentication → Settings → Authorized domains`

Наприклад:

`vitaliysh0705.github.io`

Для власного вікна введення нового пароля на сайті налаштуй email template:

`Authentication → Templates → Password reset → Customize action URL`

і вкажи URL сайту, наприклад:

`https://vitaliysh0705.github.io/polux-mods-site/`

Тоді посилання з листа відкриє сайт з параметрами `mode=resetPassword&oobCode=...`, і сайт покаже власне вікно нового пароля.

## Структура скриптів

- `scripts/firebase-config.js` — конфіг Firebase.
- `scripts/firebase-auth-service.js` — сервіс авторизації Firebase/Google.
- `app.js` — основна логіка інтерфейсу, маршрути, каталог, локалізація.

## Що підключити для ролей, профілів і фото

Сайт уже підготовлений під Firebase Auth + Firestore без Firebase Storage. Аватар і фон профілю стискаються у браузері та зберігаються прямо в документі користувача `users/{uid}`. Це безкоштовніший варіант, але не завантажуй дуже великі фото: Firestore має ліміт розміру документа.

1. У Firebase Console відкрий Project Settings → General → Web app і перевір дані у `scripts/firebase-config.js`.
2. У Build → Authentication → Sign-in method увімкни Email/Password і Google, якщо потрібен Google-вхід.
3. У Build → Firestore Database створи базу даних.
4. Для тесту можна почати з правил нижче, але для продакшну краще посилити перевірки ролей через custom claims або серверні Cloud Functions.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow create, update: if request.auth != null && request.auth.uid == userId;
    }
    match /reports/{docId} {
      allow create: if request.auth != null;
      allow read, update, delete: if false;
    }
    match /adminActions/{docId} {
      allow create: if request.auth != null;
      allow read: if false;
    }
    match /site/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Адміном автоматично стає акаунт з email `vitaliysh0705@gmail.com`. Додаткові ролі можна видати в адмін-панелі: `Адміністратор`, `Модератор`, `Користувач`.

## Оновлення спільноти та адмін-панелі

Додано модуль `scripts/polux-community.js`, який не видаляє існуючу авторизацію, профілі, ролі та Firebase-логіку, а розширює їх:

- головна сторінка тепер показує блоки **Нові**, **Найбільш популярні** та **Новини**;
- тестові/демо моди з локального JS-масиву прибрані, каталог наповнюється через публікацію або Firestore;
- адмінка стала блочною з горизонтальним гортанням розділів: Публікація, Модерація користувачів, Скарги/пропозиції, Запропоновані моди, Налаштування сайту;
- додано публікацію модів, конструктор новин до 10 блоків, редагування головної сторінки;
- додано модерацію користувачів зі списком, пошуком, меню дій, ролями, мутом, баном, рейтингом і м’яким видаленням акаунта на 30 днів;
- додано сторінку новин, сторінку зворотного зв’язку, систему звернень, скарг і статусів;
- додано систему сповіщень із червоною точкою біля аватарки;
- додано шаблон сторінки моду з галереєю, рейтингом, завантаженням і каскадними коментарями;
- додано адаптивні стилі для ПК і мобільних екранів, щоб блоки не накладалися й не виходили за межі.

## Чиста структура даних Firestore / localStorage

Модуль використовує тільки поля, які потрібні сайту. Рекомендовані колекції:

### `mods/{id}`
`id, title, shortDesc, description, category, version, gameVersions, modAuthor, authorUid, authorName, images, downloadUrl, status, source, createdAt, updatedAt, ratingSum, ratingCount`

### `news/{id}`
`id, title, summary, authorUid, authorName, blocks, createdAt, updatedAt`

### `comments/{kind_id}`
`kind, targetId, items, updatedAt`, де `items` містить:
`id, parentId, authorUid, authorName, authorId, authorRole, avatar, text, createdAt, score, deletedAt`

### `reports/{id}`
`id, type, targetKind, targetId, targetTitle, fromUid, fromName, message, status, reply, createdAt, updatedAt`

### `suggestedMods/{id}`
ті самі поля, що й у `mods`, але зі `status: pending / approved / rejected`.

### `site/settings`
`maintenance, holidayTheme, bannerEnabled, bannerText, bannerUrl, home, updatedAt`

### `notifications` у localStorage
Сповіщення зберігаються окремо для користувача: `id, type, text, url, read, createdAt`.

> Для повністю серверної синхронізації сповіщень можна винести їх у Firestore `users/{uid}/notifications`, але поточний варіант залишено легким і без Firebase Storage.
