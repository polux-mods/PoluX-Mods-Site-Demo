# Polux Mods — Firebase SPA

Повністю статичний SPA-сайт без збірника. Його можна відкрити локально через простий сервер, залити на GitHub Pages або Firebase Hosting.

## Що реалізовано

- SPA-роутинг без перезавантаження браузера: головна, моди, новини, сторінка моду/новини, профіль, налаштування, адмін-панель, звернення, сповіщення, про нас.
- Ретро-піксельний UI з CRT scanlines/glitch і перемикачем ефекту.
- Теми: Amber, Matrix, Cyberpunk 80s, Ice Terminal, Mono CRT.
- Адаптивний дизайн для ПК і мобільних, включно з підняттям полів над мобільною клавіатурою.
- Firebase Auth: реєстрація, вхід, email verification, скидання пароля, сувора валідація форм, око для пароля, підтвердження пароля.
- Firestore: користувачі, профілі, ролі, моди, новини, коментарі, реакції, звернення/скарги, налаштування сайту, сповіщення, обране.
- Storage: аватарки, банери, майбутні картинки контенту.
- Адмін/модератор-панель із вкладками: публікація, користувачі, скарги/пропозиції, черга модів, налаштування сайту.
- Каскадні коментарі, лайки/дизлайки, soft-delete коментарів.
- Система подяк із лімітом 3 на місяць та 1 раз одному користувачу.
- Модуль автоперекладу: клієнтська логіка + Cloud Function `translateDynamicText`.

## Важливо про автопереклад

Справжній автоматичний переклад не можна безпечно робити напряму з браузера, бо API-ключ перекладача буде видно всім. Тому в проєкт додано Firebase Cloud Function. Вона використовує Google Cloud Translate на сервері та повертає `i18n`-мапу для Firestore.

Клієнт уже викликає callable-функцію `translateDynamicText`. Якщо Cloud Function не розгорнута, сайт зберігає український текст і працює без падіння.

## Запуск локально

```bash
cd polux-mods-site
python -m http.server 8080
```

Відкрий: `http://localhost:8080`

Не відкривай `index.html` напряму через `file://`, бо ES modules і Firebase CDN повинні працювати через HTTP/HTTPS.

## Firebase Hosting

```bash
npm i -g firebase-tools
firebase login
firebase use polux-mods
firebase deploy --only hosting,firestore:rules,firestore:indexes,storage
```

## Cloud Functions для перекладу

```bash
cd firebase/functions
npm install
cd ../..
firebase deploy --only functions
```

У Google Cloud для проєкту треба увімкнути Cloud Translation API та білінг, якщо він потрібний для API.

## Колекції Firestore

### `users/{uid}`
```js
{
  uid, publicId, email, name,
  roles: ['User'],
  rating: 0,
  modsCount: 0,
  commentsCount: 0,
  thanksReceived: 0,
  bio: '', avatarUrl: '', coverUrl: '',
  createdAt, lastOnline,
  deletedAt: null,
  nameChanges: []
}
```

### `mods/{id}` і `news/{id}`
```js
{
  type: 'mods' | 'news',
  status: 'published' | 'draft' | 'deleted',
  title, description, body,
  i18n: { uk: { title, description, body }, en: {...} },
  coverUrl, images: [],
  authorUid, authorName,
  category, modVersion, gameVersions: [], downloadUrl,
  ratingAvg: 0, ratingCount: 0, downloads: 0,
  createdAt, updatedAt
}
```

### `comments/{id}`
```js
{
  targetType: 'mods' | 'news',
  targetId,
  parentId: null,
  text, imageUrl,
  deleted: false,
  score: 0,
  authorUid, authorName, authorId, authorAvatar, authorRole,
  createdAt, updatedAt
}
```

### `appeals/{id}`
```js
{
  kind: 'report' | 'feedback',
  status: 'new' | 'working' | 'closed',
  targetType, targetId, targetUid,
  reason, topic, text, imageUrl,
  authorUid, authorName,
  createdAt, updatedAt
}
```

### `site/settings`
```js
{
  seasonal: false,
  maintenance: false,
  announcementEnabled: false,
  announcementText: '',
  announcementUrl: ''
}
```

## Що потребує серверної частини для 100% production-рівня

Firebase client SDK не може безпечно робити деякі адміністративні дії самостійно. Для повного production треба винести в Cloud Functions:

- реальне завершення чужих сесій / revoke refresh tokens;
- фізичне видалення акаунта після 30 днів;
- гарантоване обмеження подяк транзакцією на сервері;
- повний пошук користувачів за email/name/id для великих баз;
- модераційні дії з аудит-логом;
- генерацію thumbnails для Storage.

У поточній кодовій базі ці місця підготовлені як чисті точки розширення, а не демо-сміття.
