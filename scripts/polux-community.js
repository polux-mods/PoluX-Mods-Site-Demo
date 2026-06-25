(function(){
  const LS = {
    mods:'polux.content.mods',
    news:'polux.content.news',
    reports:'polux.content.reports',
    suggestions:'polux.content.suggestions',
    settings:'polux.site.settings',
    commentsPrefix:'polux.comments.',
    ratingsPrefix:'polux.ratings.',
    reactionsPrefix:'polux.reactions.',
    favoritesPrefix:'polux.favorites.',
    notificationsPrefix:'polux.notifications.'
  };

  const SCHEMA = {
    mods:['id','title','shortDesc','description','category','version','gameVersions','modAuthor','authorUid','authorName','images','downloadUrl','status','source','createdAt','updatedAt','ratingSum','ratingCount'],
    news:['id','title','summary','authorUid','authorName','blocks','createdAt','updatedAt'],
    comments:['id','parentId','authorUid','authorName','authorId','authorRole','avatar','text','createdAt','score','deletedAt'],
    reports:['id','type','targetKind','targetId','targetTitle','fromUid','fromName','message','status','reply','createdAt','updatedAt'],
    notifications:['id','type','text','url','read','createdAt']
  };

  const COMMUNITY_UI = {
    navNews:'Новини', navFeedback:'Зворотній зв’язок', navAbout:'Про нас', viewAll:'Усі', newestMods:'Нові моди', popularMods:'Найпопулярніші моди', latestNews:'Новини', emptyMods:'Поки немає опублікованих модів.', emptyNews:'Поки немає опублікованих новин.', publishedBy:'Опублікував', addedAt:'Дата додавання', modAuthor:'Автор моду', gameVersions:'Версія гри', rateMod:'Оцінити мод', download:'Завантажити', commentsTitle:'Коментарі', loginToComment:'Коментувати можуть тільки зареєстровані користувачі.', commentPlaceholder:'Напишіть коментар...', reply:'Відповісти', complain:'Поскаржитись', deleteComment:'Видалити коментар', commentDeleted:'Коментар було видалено', addToFavorite:'Додати до обраного', removeFavorite:'Прибрати з обраного', sortNewest:'Новіші спочатку', sortPopular:'За рейтингом', goToMods:'Переглянути всі моди', goToNews:'Переглянути всі новини', noImage:'Зображення не додано', galleryHint:'Натисніть на велике фото, щоб відкрити його окремо.',
    menuNotifications:'Сповіщення', menuNews:'Новини', menuFeedback:'Зворотній зв’язок', notificationsTitle:'Сповіщення', noNotifications:'Нових сповіщень немає.', markAllRead:'Позначити все прочитаним', notificationThanks:'Користувач поставив вам подяку.', notificationRole:'Вам змінено роль.', notificationReply:'На ваше звернення надійшла відповідь.', notificationComment:'Вашу публікацію прокоментували.', notificationRating:'Ваш рейтинг досяг нового звання.',
    feedbackTitle:'Зворотній зв’язок', sendAppeal:'Подати звернення', myAppeals:'Мої звернення', topic:'Тема', topicQuestion:'Запитання', topicWish:'Побажання', topicBug:'Проблема сайту', topicOther:'Інше', appealText:'Текст звернення', appealLimit:'До 300 символів. Посилання розпізнаються автоматично.', attachImages:'Посилання на картинки', sendAppealBtn:'Надіслати звернення', appealSent:'Звернення надіслано.', onlyRegistered:'Ця дія доступна тільки зареєстрованим користувачам.',
    statusNew:'Нове', statusWorking:'В роботі', statusClosed:'Закрите', reportTypeComplaint:'Скарга', reportTypeFeedback:'Зворотній зв’язок', targetPost:'Пост', targetProfile:'Профіль', targetComment:'Коментар', openFull:'Відкрити повністю', goToTarget:'Перейти до поста/профіля', replyToUser:'Відповісти користувачеві', goToReporter:'Профіль автора звернення', deleteAppeal:'Видалити звернення', markWorking:'Позначити як в роботі', markClosed:'Позначити як закрите', closedLocked:'Закрите звернення не можна змінювати.', adminReplyPlaceholder:'Відповідь адміністрації...', 
    adminPublication:'Публікація', adminPublicationDesc:'Публікуй моди, новини або редагуй контент головної сторінки без перезавантаження сайту.', adminUsers:'Модерація користувачів', adminUsersDesc:'Пошук за ID, email або іменем і швидкі дії з акаунтами.', adminAppeals:'Модерація скарг і пропозицій', adminAppealsDesc:'Усі скарги, звернення й зворотній зв’язок з мітками стану.', adminSuggested:'Модерація запропонованих модів', adminSuggestedDesc:'Перегляд, редагування, схвалення або відхилення модів від користувачів.', adminSite:'Налаштування сайту', adminSiteDesc:'Сервісний режим, святкове оформлення та інформаційний банер.', publishArea:'Область публікування', areaMod:'Мод', areaNews:'Новина', areaHome:'Головна сторінка', clear:'Стерти', publish:'Опублікувати', saveHome:'Зберегти головну', title:'Назва', shortDescription:'Короткий опис', fullDescription:'Повний опис', category:'Категорія', version:'Версія', downloadLink:'Посилання на завантаження', imagesList:'Картинки, по одному посиланню в рядок', newsBuilder:'Конструктор новини', addBlock:'Додати блок', blockText:'Текст', blockImage:'Фото', blockFact:'Цікавина', blockPoll:'Опитування', blockLimit:'До 10 блоків.', homeHeroTitle:'Заголовок головної', homeHeroText:'Текст головної', homeMainNews:'Головна новина', homeSeasonOffer:'Сезонна пропозиція', published:'Опубліковано.', saved:'Збережено.', userSearch:'Пошук по ID, email або імені', highestRole:'Роль', lastOnline:'Останній онлайн', viewProfile:'Переглянути профіль', mute:'Замутити', unmute:'Розмутити', ban:'Заблокувати', unban:'Розблокувати', editRating:'Редагування рейтингу', editRoles:'Редагування ролей', deleteAccount:'Видалити акаунт', ratingDelta:'Додати або відняти рейтинг', selectRole:'Вибір ролі', confirmDeleteAccount:'Акаунт буде позначено як видалений. Користувач зможе повернутися протягом 30 днів.', noAppeals:'Звернень поки немає.', noSuggestions:'Запропонованих модів поки немає.', suggestedBy:'Запропонував', preview:'Продивитись', approve:'Схвалити', edit:'Редагувати', reject:'Відхилити', maintenanceMode:'Сервісне обслуговування сайту', maintenanceText:'Сайт знаходиться на сервісному обслуговуванні. Вибачте за незручності.', holidayTheme:'Новорічне оформлення', headerBanner:'Банер у шапці сайту', bannerText:'Текст банера', bannerUrl:'Посилання банера', bannerPlaceholder:'Наприклад: Нове оновлення вже доступне', settingsSaved:'Налаштування збережено.',
    aboutProjectTitle:'Про Polux Mods', aboutProjectText:'Polux Mods — спільнота та каталог модів для Farming Simulator Mobile з профілями, рейтингами, коментарями, новинами й модерацією.', newsTitle:'Новини', feedbackLoginHint:'Увійдіть, щоб подати звернення або переглянути свої звернення.', reportReason:'Причина скарги', sendReport:'Надіслати скаргу', reportSent:'Скаргу надіслано.', suggestMod:'Запропонувати мод', suggestModDesc:'Заповніть дані моду, і він потрапить на модерацію.', suggestionSent:'Мод відправлено на модерацію.', link:'Посилання', insertLink:'Вставити посилання', insertImage:'Вставити картинку', mention:'@користувач', up:'Вгору', down:'Вниз'
  };

  const COMMUNITY_TRANSLATIONS = {
    ru:{navNews:'Новости',navFeedback:'Обратная связь',navAbout:'О нас',viewAll:'Все',newestMods:'Новые моды',popularMods:'Самые популярные моды',latestNews:'Новости',emptyMods:'Пока нет опубликованных модов.',emptyNews:'Пока нет опубликованных новостей.',publishedBy:'Опубликовал',addedAt:'Дата добавления',modAuthor:'Автор мода',gameVersions:'Версия игры',rateMod:'Оценить мод',commentsTitle:'Комментарии',loginToComment:'Комментировать могут только зарегистрированные пользователи.',commentPlaceholder:'Напишите комментарий...',reply:'Ответить',complain:'Пожаловаться',deleteComment:'Удалить комментарий',commentDeleted:'Комментарий был удалён',addToFavorite:'Добавить в избранное',removeFavorite:'Убрать из избранного',sortNewest:'Сначала новые',sortPopular:'По рейтингу',goToMods:'Смотреть все моды',goToNews:'Смотреть все новости',noImage:'Изображение не добавлено',galleryHint:'Нажмите на большое фото, чтобы открыть его отдельно.',menuNotifications:'Уведомления',menuNews:'Новости',menuFeedback:'Обратная связь',notificationsTitle:'Уведомления',noNotifications:'Новых уведомлений нет.',markAllRead:'Отметить всё прочитанным',feedbackTitle:'Обратная связь',sendAppeal:'Подать обращение',myAppeals:'Мои обращения',topic:'Тема',topicQuestion:'Вопрос',topicWish:'Пожелание',topicBug:'Проблема сайта',topicOther:'Другое',appealText:'Текст обращения',appealLimit:'До 300 символов. Ссылки распознаются автоматически.',attachImages:'Ссылки на картинки',sendAppealBtn:'Отправить обращение',appealSent:'Обращение отправлено.',onlyRegistered:'Это действие доступно только зарегистрированным пользователям.',statusNew:'Новое',statusWorking:'В работе',statusClosed:'Закрыто',reportTypeComplaint:'Жалоба',reportTypeFeedback:'Обратная связь',targetPost:'Пост',targetProfile:'Профиль',targetComment:'Комментарий',openFull:'Открыть полностью',goToTarget:'Перейти к посту/профилю',replyToUser:'Ответить пользователю',goToReporter:'Профиль автора обращения',deleteAppeal:'Удалить обращение',markWorking:'Отметить в работе',markClosed:'Отметить закрытым',closedLocked:'Закрытое обращение нельзя менять.',adminReplyPlaceholder:'Ответ администрации...',adminPublication:'Публикация',adminPublicationDesc:'Публикуй моды, новости или редактируй главную страницу.',adminUsers:'Модерация пользователей',adminUsersDesc:'Поиск по ID, email или имени и быстрые действия.',adminAppeals:'Модерация жалоб и предложений',adminAppealsDesc:'Все жалобы, обращения и обратная связь со статусами.',adminSuggested:'Модерация предложенных модов',adminSuggestedDesc:'Просмотр, редактирование, одобрение или отклонение модов пользователей.',adminSite:'Настройки сайта',adminSiteDesc:'Сервисный режим, праздничное оформление и баннер.',publishArea:'Область публикации',areaMod:'Мод',areaNews:'Новость',areaHome:'Главная страница',clear:'Очистить',publish:'Опубликовать',saveHome:'Сохранить главную',title:'Название',shortDescription:'Краткое описание',fullDescription:'Полное описание',category:'Категория',version:'Версия',downloadLink:'Ссылка на скачивание',imagesList:'Картинки, по одной ссылке в строке',newsBuilder:'Конструктор новости',addBlock:'Добавить блок',blockText:'Текст',blockImage:'Фото',blockFact:'Интересный факт',blockPoll:'Опрос',blockLimit:'До 10 блоков.',homeHeroTitle:'Заголовок главной',homeHeroText:'Текст главной',homeMainNews:'Главная новость',homeSeasonOffer:'Сезонное предложение',published:'Опубликовано.',saved:'Сохранено.',userSearch:'Поиск по ID, email или имени',highestRole:'Роль',lastOnline:'Последний онлайн',viewProfile:'Посмотреть профиль',mute:'Замутить',unmute:'Размутить',ban:'Заблокировать',unban:'Разблокировать',editRating:'Редактирование рейтинга',editRoles:'Редактирование ролей',deleteAccount:'Удалить аккаунт',ratingDelta:'Добавить или вычесть рейтинг',selectRole:'Выбор роли',confirmDeleteAccount:'Аккаунт будет отмечен как удалённый. Пользователь сможет вернуться в течение 30 дней.',noAppeals:'Обращений пока нет.',noSuggestions:'Предложенных модов пока нет.',suggestedBy:'Предложил',preview:'Просмотреть',approve:'Одобрить',edit:'Редактировать',reject:'Отклонить',maintenanceMode:'Сервисное обслуживание сайта',maintenanceText:'Сайт находится на сервисном обслуживании. Извините за неудобства.',holidayTheme:'Новогоднее оформление',headerBanner:'Баннер в шапке сайта',bannerText:'Текст баннера',bannerUrl:'Ссылка баннера',bannerPlaceholder:'Например: Новое обновление уже доступно',settingsSaved:'Настройки сохранены.',aboutProjectTitle:'О Polux Mods',aboutProjectText:'Polux Mods — сообщество и каталог модов для Farming Simulator Mobile с профилями, рейтингами, комментариями, новостями и модерацией.',newsTitle:'Новости',feedbackLoginHint:'Войдите, чтобы подать обращение или посмотреть свои обращения.',reportReason:'Причина жалобы',sendReport:'Отправить жалобу',reportSent:'Жалоба отправлена.',link:'Ссылка',insertLink:'Вставить ссылку',insertImage:'Вставить картинку',mention:'@пользователь',up:'Вверх',down:'Вниз'},
    en:{navNews:'News',navFeedback:'Feedback',navAbout:'About us',viewAll:'All',newestMods:'New mods',popularMods:'Most popular mods',latestNews:'News',emptyMods:'No published mods yet.',emptyNews:'No published news yet.',publishedBy:'Published by',addedAt:'Added',modAuthor:'Mod author',gameVersions:'Game version',rateMod:'Rate mod',commentsTitle:'Comments',loginToComment:'Only registered users can comment.',commentPlaceholder:'Write a comment...',reply:'Reply',complain:'Report',deleteComment:'Delete comment',commentDeleted:'Comment was deleted',addToFavorite:'Add to favorites',removeFavorite:'Remove from favorites',sortNewest:'Newest first',sortPopular:'By rating',goToMods:'View all mods',goToNews:'View all news',noImage:'No image added',galleryHint:'Tap the large image to open it separately.',menuNotifications:'Notifications',menuNews:'News',menuFeedback:'Feedback',notificationsTitle:'Notifications',noNotifications:'No new notifications.',markAllRead:'Mark all as read',feedbackTitle:'Feedback',sendAppeal:'Submit appeal',myAppeals:'My appeals',topic:'Topic',topicQuestion:'Question',topicWish:'Suggestion',topicBug:'Site issue',topicOther:'Other',appealText:'Appeal text',appealLimit:'Up to 300 characters. Links are detected automatically.',attachImages:'Image links',sendAppealBtn:'Send appeal',appealSent:'Appeal sent.',onlyRegistered:'This action is available only to registered users.',statusNew:'New',statusWorking:'In progress',statusClosed:'Closed',reportTypeComplaint:'Complaint',reportTypeFeedback:'Feedback',targetPost:'Post',targetProfile:'Profile',targetComment:'Comment',openFull:'Open fully',goToTarget:'Go to post/profile',replyToUser:'Reply to user',goToReporter:'Reporter profile',deleteAppeal:'Delete appeal',markWorking:'Mark in progress',markClosed:'Mark closed',closedLocked:'A closed appeal cannot be changed.',adminReplyPlaceholder:'Admin reply...',adminPublication:'Publication',adminPublicationDesc:'Publish mods/news or edit the home page without reloads.',adminUsers:'User moderation',adminUsersDesc:'Search by ID, email or name and use quick account actions.',adminAppeals:'Complaint and suggestion moderation',adminAppealsDesc:'All complaints, appeals and feedback with status labels.',adminSuggested:'Suggested mods moderation',adminSuggestedDesc:'Review, edit, approve or reject user-submitted mods.',adminSite:'Site settings',adminSiteDesc:'Maintenance mode, holiday design and header banner.',publishArea:'Publishing area',areaMod:'Mod',areaNews:'News',areaHome:'Home page',clear:'Clear',publish:'Publish',saveHome:'Save home',title:'Title',shortDescription:'Short description',fullDescription:'Full description',category:'Category',version:'Version',downloadLink:'Download link',imagesList:'Images, one link per line',newsBuilder:'News builder',addBlock:'Add block',blockText:'Text',blockImage:'Image',blockFact:'Interesting fact',blockPoll:'Poll',blockLimit:'Up to 10 blocks.',homeHeroTitle:'Home title',homeHeroText:'Home text',homeMainNews:'Main news',homeSeasonOffer:'Seasonal offer',published:'Published.',saved:'Saved.',userSearch:'Search by ID, email or name',highestRole:'Role',lastOnline:'Last online',viewProfile:'View profile',mute:'Mute',unmute:'Unmute',ban:'Block',unban:'Unblock',editRating:'Edit rating',editRoles:'Edit roles',deleteAccount:'Delete account',ratingDelta:'Add or subtract rating',selectRole:'Select role',confirmDeleteAccount:'The account will be marked as deleted. The user can return within 30 days.',noAppeals:'No appeals yet.',noSuggestions:'No suggested mods yet.',suggestedBy:'Suggested by',preview:'Preview',approve:'Approve',edit:'Edit',reject:'Reject',maintenanceMode:'Site maintenance',maintenanceText:'The site is under maintenance. Sorry for the inconvenience.',holidayTheme:'New Year design',headerBanner:'Header banner',bannerText:'Banner text',bannerUrl:'Banner link',bannerPlaceholder:'Example: New update is available',settingsSaved:'Settings saved.',aboutProjectTitle:'About Polux Mods',aboutProjectText:'Polux Mods is a community and catalog for Farming Simulator Mobile mods with profiles, ratings, comments, news and moderation.',newsTitle:'News',feedbackLoginHint:'Sign in to submit an appeal or view your appeals.',reportReason:'Report reason',sendReport:'Send report',reportSent:'Report sent.',suggestMod:'Suggest mod',suggestModDesc:'Fill in the mod data and it will go to moderation.',suggestionSent:'Mod sent to moderation.',link:'Link',insertLink:'Insert link',insertImage:'Insert image',mention:'@user',up:'Up',down:'Down'},
    pl:{navNews:'Aktualności',navFeedback:'Kontakt',navAbout:'O nas',viewAll:'Wszystkie',newestMods:'Nowe mody',popularMods:'Najpopularniejsze mody',latestNews:'Aktualności',emptyMods:'Nie ma jeszcze opublikowanych modów.',emptyNews:'Nie ma jeszcze aktualności.',publishedBy:'Opublikował',addedAt:'Data dodania',modAuthor:'Autor moda',gameVersions:'Wersja gry',rateMod:'Oceń mod',commentsTitle:'Komentarze',loginToComment:'Komentować mogą tylko zarejestrowani użytkownicy.',commentPlaceholder:'Napisz komentarz...',reply:'Odpowiedz',complain:'Zgłoś',deleteComment:'Usuń komentarz',commentDeleted:'Komentarz został usunięty',addToFavorite:'Dodaj do ulubionych',removeFavorite:'Usuń z ulubionych',sortNewest:'Najpierw nowe',sortPopular:'Według oceny',goToMods:'Zobacz wszystkie mody',goToNews:'Zobacz wszystkie aktualności',noImage:'Nie dodano obrazu',menuNotifications:'Powiadomienia',feedbackTitle:'Kontakt',sendAppeal:'Wyślij zgłoszenie',myAppeals:'Moje zgłoszenia',topic:'Temat',topicQuestion:'Pytanie',topicWish:'Sugestia',topicBug:'Problem strony',topicOther:'Inne',sendAppealBtn:'Wyślij',statusNew:'Nowe',statusWorking:'W toku',statusClosed:'Zamknięte',adminPublication:'Publikacja',adminUsers:'Moderacja użytkowników',adminAppeals:'Moderacja zgłoszeń',adminSuggested:'Moderacja proponowanych modów',adminSite:'Ustawienia strony',publish:'Opublikuj',clear:'Wyczyść',saved:'Zapisano.',published:'Opublikowano.',aboutProjectTitle:'O Polux Mods',newsTitle:'Aktualności'},
    de:{navNews:'News',navFeedback:'Feedback',navAbout:'Über uns',viewAll:'Alle',newestMods:'Neue Mods',popularMods:'Beliebteste Mods',latestNews:'News',emptyMods:'Noch keine Mods veröffentlicht.',emptyNews:'Noch keine News veröffentlicht.',publishedBy:'Veröffentlicht von',addedAt:'Hinzugefügt',modAuthor:'Mod-Autor',gameVersions:'Spielversion',rateMod:'Mod bewerten',commentsTitle:'Kommentare',loginToComment:'Nur registrierte Nutzer können kommentieren.',commentPlaceholder:'Kommentar schreiben...',reply:'Antworten',complain:'Melden',deleteComment:'Kommentar löschen',commentDeleted:'Kommentar wurde gelöscht',addToFavorite:'Zu Favoriten',removeFavorite:'Aus Favoriten entfernen',sortNewest:'Neueste zuerst',sortPopular:'Nach Bewertung',goToMods:'Alle Mods ansehen',goToNews:'Alle News ansehen',noImage:'Kein Bild hinzugefügt',menuNotifications:'Benachrichtigungen',feedbackTitle:'Feedback',sendAppeal:'Anfrage senden',myAppeals:'Meine Anfragen',topic:'Thema',topicQuestion:'Frage',topicWish:'Wunsch',topicBug:'Seitenproblem',topicOther:'Andere',sendAppealBtn:'Senden',statusNew:'Neu',statusWorking:'In Arbeit',statusClosed:'Geschlossen',adminPublication:'Publikation',adminUsers:'Nutzermoderation',adminAppeals:'Beschwerden moderieren',adminSuggested:'Vorgeschlagene Mods moderieren',adminSite:'Seiteneinstellungen',publish:'Veröffentlichen',clear:'Leeren',saved:'Gespeichert.',published:'Veröffentlicht.',aboutProjectTitle:'Über Polux Mods',newsTitle:'News'},
    es:{navNews:'Noticias',navFeedback:'Comentarios',navAbout:'Sobre nosotros',viewAll:'Todo',newestMods:'Mods nuevos',popularMods:'Mods populares',latestNews:'Noticias',emptyMods:'Aún no hay mods publicados.',emptyNews:'Aún no hay noticias.',publishedBy:'Publicado por',addedAt:'Fecha',modAuthor:'Autor del mod',gameVersions:'Versión del juego',rateMod:'Valorar mod',commentsTitle:'Comentarios',loginToComment:'Solo usuarios registrados pueden comentar.',commentPlaceholder:'Escribe un comentario...',reply:'Responder',complain:'Denunciar',deleteComment:'Eliminar comentario',commentDeleted:'El comentario fue eliminado',addToFavorite:'Añadir a favoritos',removeFavorite:'Quitar de favoritos',sortNewest:'Más recientes',sortPopular:'Por valoración',goToMods:'Ver todos los mods',goToNews:'Ver todas las noticias',noImage:'Sin imagen',menuNotifications:'Notificaciones',feedbackTitle:'Comentarios',sendAppeal:'Enviar solicitud',myAppeals:'Mis solicitudes',topic:'Tema',topicQuestion:'Pregunta',topicWish:'Sugerencia',topicBug:'Problema del sitio',topicOther:'Otro',sendAppealBtn:'Enviar',statusNew:'Nuevo',statusWorking:'En proceso',statusClosed:'Cerrado',adminPublication:'Publicación',adminUsers:'Moderación de usuarios',adminAppeals:'Moderación de solicitudes',adminSuggested:'Moderación de mods sugeridos',adminSite:'Ajustes del sitio',publish:'Publicar',clear:'Borrar',saved:'Guardado.',published:'Publicado.',aboutProjectTitle:'Sobre Polux Mods',newsTitle:'Noticias'},
    fr:{navNews:'Actualités',navFeedback:'Retour',navAbout:'À propos',viewAll:'Tout',newestMods:'Nouveaux mods',popularMods:'Mods populaires',latestNews:'Actualités',emptyMods:'Aucun mod publié pour le moment.',emptyNews:'Aucune actualité publiée pour le moment.',publishedBy:'Publié par',addedAt:'Date',modAuthor:'Auteur du mod',gameVersions:'Version du jeu',rateMod:'Noter le mod',commentsTitle:'Commentaires',loginToComment:'Seuls les utilisateurs inscrits peuvent commenter.',commentPlaceholder:'Écrire un commentaire...',reply:'Répondre',complain:'Signaler',deleteComment:'Supprimer le commentaire',commentDeleted:'Le commentaire a été supprimé',addToFavorite:'Ajouter aux favoris',removeFavorite:'Retirer des favoris',sortNewest:'Plus récents',sortPopular:'Par note',goToMods:'Voir tous les mods',goToNews:'Voir toutes les actualités',noImage:'Aucune image ajoutée',menuNotifications:'Notifications',feedbackTitle:'Retour',sendAppeal:'Envoyer une demande',myAppeals:'Mes demandes',topic:'Sujet',topicQuestion:'Question',topicWish:'Suggestion',topicBug:'Problème du site',topicOther:'Autre',sendAppealBtn:'Envoyer',statusNew:'Nouveau',statusWorking:'En cours',statusClosed:'Fermé',adminPublication:'Publication',adminUsers:'Modération des utilisateurs',adminAppeals:'Modération des demandes',adminSuggested:'Modération des mods proposés',adminSite:'Paramètres du site',publish:'Publier',clear:'Effacer',saved:'Enregistré.',published:'Publié.',aboutProjectTitle:'À propos de Polux Mods',newsTitle:'Actualités'}
  };

  function installTranslations(){
    if(typeof UI_UK === 'object') Object.assign(UI_UK, COMMUNITY_UI);
    if(typeof TRANSLATION_MEMORY === 'object'){
      Object.entries(COMMUNITY_TRANSLATIONS).forEach(([lang, pack]) => {
        TRANSLATION_MEMORY[lang] = Object.assign({}, TRANSLATION_MEMORY[lang] || {}, pack);
      });
    }
  }
  function ct(key){
    try{ return typeof t === 'function' ? t(key) : (COMMUNITY_UI[key] || key); }
    catch(_){ return COMMUNITY_UI[key] || key; }
  }
  function lang(){ return (typeof currentLang !== 'undefined' ? currentLang : 'uk') || 'uk'; }
  function esc(v){ try{return escapeHtml(v)}catch(_){return String(v ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));} }
  function id(prefix){ return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`; }
  function now(){ return new Date().toISOString(); }
  function fmtDate(v){ try{return formatDateShort(v)}catch(_){return v ? new Date(v).toLocaleDateString(lang()) : '—';} }
  function readJson(key, fallback){ try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}catch(_){return fallback;} }
  function writeJson(key, value){ localStorage.setItem(key, JSON.stringify(value)); return value; }
  function profile(){ try{return currentUser ? ensureCurrentProfile() : null;}catch(_){return null;} }
  function isAdmin(){ try{return !!(currentUser && isAdminProfile(profile()));}catch(_){return false;} }
  function uid(){ return (typeof currentUser !== 'undefined' && currentUser) ? (currentUser.uid || currentUser.email) : 'guest'; }
  function userName(){ return (typeof currentUser !== 'undefined' && currentUser) ? (currentUser.name || currentUser.email?.split('@')[0] || 'User') : 'Guest'; }
  function publicIdFor(p){ try{return p.publicId || publicUserId(p.uid)}catch(_){return p.uid || '';} }
  function highestRole(profileLike){
    const roles = profileLike?.roles || [];
    const order = ['roleAdministrator','roleModerator','roleUser','titleLegend','titleMaster','titleFarmer','titleDriver','titleMechanic','titleRookie'];
    return order.find(r => roles.includes(r)) || roles[0] || 'roleUser';
  }

  async function saveDoc(collection, docId, data){
    try{
      const db = window.PoluxDbService?.getDb?.();
      if(!db) return null;
      await db.collection(collection).doc(docId).set(JSON.parse(JSON.stringify(data)), {merge:false});
      return data;
    }catch(err){ console.warn('[PoluxDb]', collection, err); return null; }
  }
  async function deleteDoc(collection, docId){
    try{ const db = window.PoluxDbService?.getDb?.(); if(db) await db.collection(collection).doc(docId).delete(); }catch(err){ console.warn('[PoluxDb delete]', err); }
  }
  async function fetchCollection(collection, localKey){
    try{
      const db = window.PoluxDbService?.getDb?.();
      if(!db) return [];
      const snap = await db.collection(collection).orderBy('createdAt','desc').limit(100).get();
      const rows = snap.docs.map(d => ({id:d.id, ...d.data()}));
      if(rows.length) writeJson(localKey, rows);
      return rows;
    }catch(_){ return []; }
  }

  function getSiteSettings(){ return readJson(LS.settings, {maintenance:false, holidayTheme:false, bannerEnabled:false, bannerText:'', bannerUrl:'', home:{}}); }
  function saveSiteSettings(s){ writeJson(LS.settings, s); saveDoc('site','settings', {...s, updatedAt:now()}); renderSiteBanner(); }
  function getMods(){ return readJson(LS.mods, []).filter(m => m.status === 'published').sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))); }
  function getAllMods(){ return readJson(LS.mods, []); }
  function saveModRecord(mod){ const all = getAllMods().filter(m => m.id !== mod.id); all.unshift(mod); writeJson(LS.mods, all); saveDoc('mods', mod.id, mod); return mod; }
  function getNews(){ return readJson(LS.news, []).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))); }
  function saveNewsRecord(news){ const all = getNews().filter(n => n.id !== news.id); all.unshift(news); writeJson(LS.news, all); saveDoc('news', news.id, news); return news; }
  function getReports(){ return readJson(LS.reports, []).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))); }
  function saveReport(r){ const all = getReports().filter(x => x.id !== r.id); all.unshift(r); writeJson(LS.reports, all); saveDoc('reports', r.id, r); return r; }
  function getSuggestions(){ return readJson(LS.suggestions, []).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))); }
  function saveSuggestion(s){ const all = getSuggestions().filter(x=>x.id!==s.id); all.unshift(s); writeJson(LS.suggestions, all); saveDoc('suggestedMods', s.id, s); return s; }
  function commentsKey(kind, id){ return LS.commentsPrefix + kind + '.' + id; }
  function getComments(kind, id){ return readJson(commentsKey(kind,id), []).sort((a,b)=>String(a.createdAt||'').localeCompare(String(b.createdAt||''))); }
  function saveComments(kind, id, rows){ writeJson(commentsKey(kind,id), rows); saveDoc('comments', `${kind}_${id}`, {kind,targetId:id,items:rows,updatedAt:now()}); }
  function notificationKey(targetUid=uid()){ return LS.notificationsPrefix + targetUid; }
  function getNotifications(targetUid=uid()){ return readJson(notificationKey(targetUid), []).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))); }
  function saveNotifications(targetUid, rows){ writeJson(notificationKey(targetUid), rows); }
  function notify(targetUid, type, text, url){
    if(!targetUid || targetUid === 'guest') return;
    const rows = getNotifications(targetUid);
    rows.unshift({id:id('ntf'), type, text, url:url||'', read:false, createdAt:now()});
    saveNotifications(targetUid, rows.slice(0,80));
    updateNotificationDot();
  }
  function getFavorites(){ return readJson(LS.favoritesPrefix + uid(), []); }
  function toggleFavorite(modId){
    if(!currentUser){ openAuthModal('login'); return; }
    const fav = new Set(getFavorites());
    fav.has(modId) ? fav.delete(modId) : fav.add(modId);
    writeJson(LS.favoritesPrefix + uid(), [...fav]);
    route();
  }
  function ratingKey(modId){ return LS.ratingsPrefix + modId; }
  function getRatingMap(modId){ return readJson(ratingKey(modId), {}); }
  function setRating(modId, stars){
    if(!currentUser){ openAuthModal('login'); return; }
    const mods = getAllMods();
    const m = mods.find(x=>x.id===modId); if(!m) return;
    const map = getRatingMap(modId);
    if(map[uid()]){ alert(ct('rateMod') + ': 1'); return; }
    map[uid()] = Number(stars);
    writeJson(ratingKey(modId), map);
    m.ratingSum = Number(m.ratingSum || 0) + Number(stars);
    m.ratingCount = Number(m.ratingCount || 0) + 1;
    saveModRecord(m);
    renderMod(modId);
  }
  function ratingValue(m){ return Number(m.ratingCount || 0) ? Number(m.ratingSum || 0) / Number(m.ratingCount || 1) : 0; }
  function starsHtml(value=0, modId=''){
    const v = Math.round(value);
    return `<div class="stars" data-rate-mod="${esc(modId)}">${[1,2,3,4,5].map(n=>`<button type="button" data-star="${n}" class="${n<=v?'active':''}">★</button>`).join('')}<small>${value?value.toFixed(1):'0.0'}</small></div>`;
  }

  function linkify(text){
    let safe = esc(text || '');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    safe = safe.replace(/@([\p{L}0-9_.-]{2,32})/gu, '<a href="#" class="mention">@$1</a>');
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
    safe = safe.replace(/!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g, '<img class="inline-comment-img" src="$2" alt="$1">');
    return safe.replace(/\n/g, '<br>');
  }

  function renderSiteBanner(){
    const settings = getSiteSettings();
    let banner = document.getElementById('siteBanner');
    if(!banner){
      document.body.insertAdjacentHTML('afterbegin', '<div id="siteBanner" class="site-banner" hidden></div>');
      banner = document.getElementById('siteBanner');
    }
    document.body.classList.toggle('holiday-theme', !!settings.holidayTheme);
    if(settings.bannerEnabled && settings.bannerText){
      banner.hidden = false;
      banner.innerHTML = settings.bannerUrl ? `<a href="${esc(settings.bannerUrl)}" target="_blank" rel="noopener">${esc(settings.bannerText)}</a>` : esc(settings.bannerText);
    }else banner.hidden = true;
  }
  function renderMaintenance(){
    const settings = getSiteSettings();
    if(settings.maintenance && !isAdmin()){
      document.getElementById('app').innerHTML = `<section class="maintenance-page page-panel narrow reveal"><p class="eyebrow">/service</p><h1>${ct('maintenanceMode')}</h1><p>${ct('maintenanceText')}</p><div class="runner">▟</div></section>`;
      return true;
    }
    return false;
  }

  function sectionHeader(title, href, label){ return `<div class="section-title"><h2>${title}</h2><a class="btn" data-link href="${href}">${label || ct('viewAll')}</a></div>`; }
  function modCard(m, compact=false){
    const fav = getFavorites().includes(m.id);
    const img = (m.images || [])[0];
    return `<article class="mod-list-card" data-mod-card="${esc(m.id)}">
      <button class="card-dots" type="button" data-card-menu="${esc(m.id)}">⋯</button>
      <div class="card-menu"><button type="button" data-favorite="${esc(m.id)}">${fav?ct('removeFavorite'):ct('addToFavorite')}</button><button type="button" data-report-target="mod" data-target-id="${esc(m.id)}" data-target-title="${esc(m.title)}">${ct('complain')}</button></div>
      <a class="mod-thumb" href="#mods/${esc(m.id)}" data-link>${img?`<img src="${esc(img)}" alt="">`:'<span>PX</span>'}</a>
      <div class="mod-list-body"><h3>${esc(m.title)}</h3><p>${esc(m.shortDesc || m.description || '').slice(0,220)}</p>
        <div class="mod-meta"><span>${ct('addedAt')}: ${fmtDate(m.createdAt)}</span><span>${ct('publishedBy')}: <b>${esc(m.authorName || m.modAuthor || 'Polux Mods')}</b></span></div>
        <footer><span>${starsHtml(ratingValue(m), m.id)}</span><a class="btn primary" href="#mods/${esc(m.id)}" data-link>${ct('open')}</a></footer>
      </div>
    </article>`;
  }
  function newsCard(n){
    const firstImg = (n.blocks || []).find(b=>b.type === 'image')?.url;
    return `<article class="news-card"><a class="news-thumb" href="#news/${esc(n.id)}" data-link>${firstImg?`<img src="${esc(firstImg)}" alt="">`:'▤'}</a><div><h3>${esc(n.title)}</h3><p>${esc(n.summary || '')}</p><small>${fmtDate(n.createdAt)} · ${ct('publishedBy')} ${esc(n.authorName || 'Polux Mods')}</small><a class="btn" href="#news/${esc(n.id)}" data-link>${ct('open')}</a></div></article>`;
  }

  function renderHome(){
    if(renderMaintenance()) return;
    const settings = getSiteSettings();
    const home = settings.home || {};
    const mods = getMods();
    const newest = mods.slice(0,6);
    const popular = [...mods].sort((a,b)=>ratingValue(b)-ratingValue(a)).slice(0,6);
    const news = getNews().slice(0,5);
    document.getElementById('app').innerHTML = `
      <section class="hero page-panel">
        <div class="hero-copy"><p class="eyebrow">Farming Simulator Mobile 20</p><h1>${esc(home.title || ct('heroTitle'))}</h1><p>${esc(home.text || ct('heroText'))}</p>${home.mainNews?`<div class="home-note"><strong>${ct('homeMainNews')}</strong><span>${esc(home.mainNews)}</span></div>`:''}${home.seasonOffer?`<div class="home-note"><strong>${ct('homeSeasonOffer')}</strong><span>${esc(home.seasonOffer)}</span></div>`:''}<div class="hero-actions"><a class="btn primary" href="#mods?sort=new" data-link>${ct('viewMods')}</a><a class="btn" href="#news" data-link>${ct('navNews')}</a></div></div>
        <div class="pixel-device" aria-hidden="true"><div class="screen"><span class="blink">POLUX/READY</span><div class="tiny-tractor">▁▂▃▅🚜▅▃▂▁</div></div></div>
      </section>
      <section class="content-section reveal">${sectionHeader(ct('newestMods'), '#mods?sort=new', ct('goToMods'))}<div class="home-cards">${newest.length?newest.map(modCard).join(''):`<div class="empty-state">${ct('emptyMods')}</div>`}</div></section>
      <section class="content-section reveal">${sectionHeader(ct('popularMods'), '#mods?sort=popular', ct('goToMods'))}<div class="home-cards">${popular.length?popular.map(modCard).join(''):`<div class="empty-state">${ct('emptyMods')}</div>`}</div></section>
      <section class="content-section reveal">${sectionHeader(ct('latestNews'), '#news', ct('goToNews'))}<div class="news-list">${news.length?news.map(newsCard).join(''):`<div class="empty-state">${ct('emptyNews')}</div>`}</div></section>
      ${footerHtml()}`;
    bindCardMenus();
  }

  function renderMods(){
    if(renderMaintenance()) return;
    const params = new URLSearchParams((location.hash.split('?')[1] || ''));
    const sort = params.get('sort') || 'new';
    const mods = getMods();
    const cats = ['all', ...new Set(mods.map(m=>m.category).filter(Boolean))];
    document.getElementById('app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/mods</p><h1>${ct('modsTitle')}</h1><p>${ct('modsText')}</p><div class="hero-actions"><button class="btn" id="suggestModBtn" type="button">${ct('suggestMod')}</button></div></section><section class="filters reveal"><input id="searchInput" type="search" placeholder="${ct('searchPlaceholder')}"><select id="categoryFilter">${cats.map(c=>`<option value="${esc(c)}">${c==='all'?ct('allCategories'):esc(c)}</option>`).join('')}</select><select id="sortFilter"><option value="new" ${sort==='new'?'selected':''}>${ct('sortNewest')}</option><option value="popular" ${sort==='popular'?'selected':''}>${ct('sortPopular')}</option></select></section><section class="mods-list reveal" id="modsGrid"></section>${footerHtml()}`;
    document.getElementById('suggestModBtn')?.addEventListener('click', openSuggestModModal);
    try{ enhanceCustomSelects(document.getElementById('app')); }catch(_){}
    const paint = () => {
      const q = (document.getElementById('searchInput').value || '').toLowerCase();
      const cat = document.getElementById('categoryFilter').value;
      const srt = document.getElementById('sortFilter').value;
      let rows = mods.filter(m => (cat==='all' || m.category === cat) && `${m.title} ${m.shortDesc} ${m.description} ${m.modAuthor}`.toLowerCase().includes(q));
      rows = srt === 'popular' ? rows.sort((a,b)=>ratingValue(b)-ratingValue(a)) : rows.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
      document.getElementById('modsGrid').innerHTML = rows.length ? rows.map(modCard).join('') : `<div class="empty-state">${ct('emptyMods')}</div>`;
      bindCardMenus();
    };
    ['searchInput','categoryFilter','sortFilter'].forEach(id=>document.getElementById(id)?.addEventListener('input', paint));
    document.getElementById('sortFilter')?.addEventListener('change', paint);
    document.getElementById('categoryFilter')?.addEventListener('change', paint);
    paint();
  }


  function openSuggestModModal(){
    if(!currentUser){ openAuthModal('login'); return; }
    const p = profile();
    modalShell('suggestModModal', ct('suggestMod'), `<form class="auth-form" id="suggestModForm"><p class="auth-hint">${ct('suggestModDesc')}</p><label class="field"><span>${ct('title')}</span><input id="suggestTitle"></label><label class="field"><span>${ct('shortDescription')}</span><textarea id="suggestShort" maxlength="160"></textarea></label><label class="field"><span>${ct('fullDescription')}</span><textarea id="suggestDesc"></textarea></label><div class="admin-form-grid"><label class="field"><span>${ct('category')}</span><input id="suggestCategory" value="Трактори"></label><label class="field"><span>${ct('version')}</span><input id="suggestVersion" value="1.0"></label><label class="field"><span>${ct('gameVersions')}</span><input id="suggestGames" value="FS Mobile 20"></label><label class="field"><span>${ct('modAuthor')}</span><input id="suggestAuthor" value="${esc(userName())}"></label></div><label class="field"><span>${ct('downloadLink')}</span><input id="suggestDownload"></label><label class="field"><span>${ct('imagesList')}</span><textarea id="suggestImages"></textarea></label><button class="btn primary">${ct('sendAppealBtn')}</button></form>`);
    document.getElementById('suggestModForm').onsubmit=e=>{ e.preventDefault(); const rec={id:slugify(document.getElementById('suggestTitle').value)||id('suggest'), title:document.getElementById('suggestTitle').value.trim(), shortDesc:document.getElementById('suggestShort').value.trim(), description:document.getElementById('suggestDesc').value.trim(), category:document.getElementById('suggestCategory').value.trim(), version:document.getElementById('suggestVersion').value.trim(), gameVersions:document.getElementById('suggestGames').value.split(',').map(x=>x.trim()).filter(Boolean), modAuthor:document.getElementById('suggestAuthor').value.trim(), authorUid:p.uid, authorName:p.name, images:document.getElementById('suggestImages').value.split('\n').map(x=>x.trim()).filter(Boolean), downloadUrl:document.getElementById('suggestDownload').value.trim(), status:'pending', source:'user', createdAt:now(), updatedAt:now(), ratingSum:0, ratingCount:0}; saveSuggestion(rec); alert(ct('suggestionSent')); document.getElementById('suggestModModal').remove(); };
  }

  function renderGallery(images, title){
    const list = (images || []).filter(Boolean);
    const main = list[0];
    return `<div class="gallery"><button class="gallery-main" type="button" data-open-image="${esc(main || '')}">${main?`<img id="galleryMainImg" src="${esc(main)}" alt="${esc(title)}">`:`<span>${ct('noImage')}</span>`}</button>${list.length?`<div class="gallery-strip">${list.map((img,i)=>`<button type="button" class="${i===0?'active':''}" data-gallery-img="${esc(img)}"><img src="${esc(img)}" alt=""></button>`).join('')}</div><small>${ct('galleryHint')}</small>`:''}</div>`;
  }

  function renderMod(idValue){
    if(renderMaintenance()) return;
    const m = getAllMods().find(x=>x.id === idValue && x.status === 'published');
    if(!m){ document.getElementById('app').innerHTML = `<section class="page-panel narrow"><a class="btn" href="#mods" data-link>← ${ct('back')}</a><p>${ct('emptyMods')}</p></section>`; return; }
    document.getElementById('app').innerHTML = `<section class="mod-detail page-panel reveal"><a class="btn" href="#mods" data-link>← ${ct('back')}</a><div class="mod-detail-layout"><div>${renderGallery(m.images, m.title)}</div><div><p class="eyebrow">${esc(m.category || '')} / ${(m.gameVersions||[]).map(esc).join(', ')}</p><h1>${esc(m.title)}</h1><p>${esc(m.description || m.shortDesc || '')}</p><div class="specs specs-wide"><div><strong>${ct('category')}</strong><br>${esc(m.category || '—')}</div><div><strong>${ct('version')}</strong><br>${esc(m.version || '—')}</div><div><strong>${ct('gameVersions')}</strong><br>${(m.gameVersions||[]).map(esc).join(', ') || '—'}</div><div><strong>${ct('modAuthor')}</strong><br>${esc(m.modAuthor || '—')}</div><div><strong>${ct('publishedBy')}</strong><br>${esc(m.authorName || 'Polux Mods')}</div><div><strong>${ct('addedAt')}</strong><br>${fmtDate(m.createdAt)}</div></div><div class="rating-box"><strong>${ct('rateMod')}</strong>${starsHtml(ratingValue(m), m.id)}</div><div class="hero-actions"><a class="btn primary" href="${esc(m.downloadUrl || '#')}" ${m.downloadUrl?'target="_blank" rel="noopener"':''}>${ct('download')}</a><button class="btn" type="button" data-report-target="mod" data-target-id="${esc(m.id)}" data-target-title="${esc(m.title)}">${ct('complain')}</button></div></div></div></section>${commentsBlock('mod', m.id, m.authorUid)}${footerHtml()}`;
    bindGallery(); bindRating(); bindComments('mod', m.id, m.authorUid); bindReportButtons();
  }

  function renderNews(idValue){
    if(renderMaintenance()) return;
    if(idValue){ return renderNewsDetail(idValue); }
    const rows = getNews();
    document.getElementById('app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/news</p><h1>${ct('newsTitle')}</h1><p>${ct('latestNews')}</p></section><section class="news-list reveal">${rows.length?rows.map(newsCard).join(''):`<div class="empty-state">${ct('emptyNews')}</div>`}</section>${footerHtml()}`;
  }
  function renderNewsDetail(idValue){
    const n = getNews().find(x=>x.id === idValue);
    if(!n){ document.getElementById('app').innerHTML = `<section class="page-panel narrow"><a class="btn" href="#news" data-link>← ${ct('back')}</a><p>${ct('emptyNews')}</p></section>`; return; }
    const blocks = (n.blocks || []).map((b,i)=>{
      if(b.type === 'image') return `<figure class="news-image"><img src="${esc(b.url)}" alt=""><figcaption>${esc(b.caption || '')}</figcaption></figure>`;
      if(b.type === 'fact') return `<div class="news-fact"><strong>▣</strong><p>${linkify(b.text || '')}</p></div>`;
      if(b.type === 'poll') return `<div class="news-poll"><strong>${esc(b.question || '')}</strong>${(b.options||[]).map(o=>`<button type="button">${esc(o)}</button>`).join('')}</div>`;
      return `<p>${linkify(b.text || '')}</p>`;
    }).join('');
    document.getElementById('app').innerHTML = `<article class="page-panel narrow news-detail"><a class="btn" href="#news" data-link>← ${ct('back')}</a><p class="eyebrow">${fmtDate(n.createdAt)} · ${ct('publishedBy')} ${esc(n.authorName || 'Polux Mods')}</p><h1>${esc(n.title)}</h1>${blocks}</article>${commentsBlock('news', n.id, n.authorUid)}${footerHtml()}`;
    bindComments('news', n.id, n.authorUid);
  }

  function commentsBlock(kind, targetId, ownerUid){ return `<section class="comments-panel page-panel reveal"><div class="section-title"><h2>${ct('commentsTitle')}</h2></div><div id="commentsList"></div>${currentUser?commentFormHtml(kind,targetId):`<div class="empty-state"><p>${ct('loginToComment')}</p><button class="btn primary" id="loginCommentBtn">${ct('openLogin')}</button></div>`}</section>`; }
  function commentFormHtml(kind,targetId,parentId=''){ return `<form class="comment-form" data-comment-form="${esc(parentId)}"><div class="format-row"><button type="button" data-format="bold">B</button><button type="button" data-format="italic">I</button><button type="button" data-format="mention">@</button><button type="button" data-format="link">${ct('link')}</button><button type="button" data-format="image">IMG</button></div><textarea maxlength="1000" placeholder="${ct('commentPlaceholder')}"></textarea><button class="btn primary" type="submit">${ct('sendMessage')}</button></form>`; }
  function roleLabelForCurrent(){ const p = profile(); try{return ct(highestRole(p));}catch(_){return 'User';} }
  function renderCommentItem(c, all, level=0){
    const children = all.filter(x=>x.parentId === c.id);
    const canDelete = currentUser && (c.authorUid === uid() || isAdmin());
    const deleted = !!c.deletedAt;
    return `<div class="comment-item ${deleted?'deleted':''}" style="--level:${Math.min(level,4)}" data-comment-id="${esc(c.id)}"><div class="comment-avatar">${c.avatar?`<img src="${esc(c.avatar)}" alt="">`:defaultAvatarSvg()}</div><div class="comment-body"><div class="comment-head"><a href="#user/${esc(c.authorUid)}" data-link>${esc(c.authorName)} <small>#${esc(c.authorId || c.authorUid)}</small></a><span>${esc(c.authorRole || '')}</span><button class="card-dots" type="button" data-comment-menu="${esc(c.id)}">⋯</button><div class="card-menu"><button type="button" data-report-comment="${esc(c.id)}">${ct('complain')}</button>${canDelete?`<button type="button" data-delete-comment="${esc(c.id)}">${ct('deleteComment')}</button>`:''}</div></div><p>${deleted?ct('commentDeleted'):linkify(c.text || '')}</p>${!deleted?`<div class="comment-actions"><button type="button" data-reply-comment="${esc(c.id)}">${ct('reply')}</button><button type="button" data-comment-react="up" data-id="${esc(c.id)}">▲</button><button type="button" data-comment-react="down" data-id="${esc(c.id)}">▼</button><b class="${Number(c.score||0)>=0?'positive':'negative'}">${Number(c.score||0)}</b></div><div class="reply-slot" id="reply-${esc(c.id)}"></div>`:''}${children.map(ch=>renderCommentItem(ch,all,level+1)).join('')}</div></div>`;
  }
  function bindComments(kind, targetId, ownerUid){
    const list = document.getElementById('commentsList');
    const paint = () => { const rows=getComments(kind,targetId); list.innerHTML = rows.filter(c=>!c.parentId).map(c=>renderCommentItem(c, rows)).join('') || `<div class="empty-state">${ct('commentsTitle')}: 0</div>`; };
    paint();
    document.getElementById('loginCommentBtn')?.addEventListener('click', () => openAuthModal('login'));
    document.querySelectorAll('[data-comment-form]').forEach(form => bindSingleCommentForm(form));
    document.addEventListener('click', commentClickHandler);
    function bindSingleCommentForm(form){
      form.addEventListener('submit', e => {
        e.preventDefault();
        const text = form.querySelector('textarea').value.trim(); if(!text) return;
        const p = profile();
        const rows = getComments(kind,targetId);
        const parentId = form.dataset.commentForm || '';
        rows.push({id:id('c'), parentId, authorUid:uid(), authorName:userName(), authorId:publicIdFor(p || {uid:uid()}), authorRole:roleLabelForCurrent(), avatar:p?.avatar || '', text, createdAt:now(), score:0, deletedAt:null});
        saveComments(kind,targetId,rows); form.reset(); paint();
        if(ownerUid && ownerUid !== uid()) notify(ownerUid, 'comment', ct('notificationComment'), location.hash);
      });
      form.querySelectorAll('[data-format]').forEach(btn=>btn.addEventListener('click',()=>formatTextarea(form.querySelector('textarea'), btn.dataset.format)));
    }
    function commentClickHandler(e){
      if(!document.body.contains(list)){ document.removeEventListener('click', commentClickHandler); return; }
      const menu = e.target.closest('[data-comment-menu]');
      if(menu){ e.stopPropagation(); menu.closest('.comment-head').classList.toggle('menu-open'); return; }
      const replyBtn = e.target.closest('[data-reply-comment]');
      if(replyBtn){ if(!currentUser){openAuthModal('login');return;} const slot=document.getElementById('reply-'+replyBtn.dataset.replyComment); slot.innerHTML = commentFormHtml(kind,targetId,replyBtn.dataset.replyComment); bindSingleCommentForm(slot.querySelector('form')); slot.querySelector('textarea').focus(); return; }
      const del = e.target.closest('[data-delete-comment]');
      if(del){ const rows=getComments(kind,targetId); const c=rows.find(x=>x.id===del.dataset.deleteComment); if(c){ c.deletedAt=now(); c.text=''; saveComments(kind,targetId,rows); paint(); } return; }
      const react = e.target.closest('[data-comment-react]');
      if(react){ if(!currentUser){openAuthModal('login');return;} const rkey=LS.reactionsPrefix+kind+'.'+targetId; const map=readJson(rkey,{}); const key=react.dataset.id+'_'+uid(); if(map[key]) return; map[key]=react.dataset.commentReact; writeJson(rkey,map); const rows=getComments(kind,targetId); const c=rows.find(x=>x.id===react.dataset.id); if(c){ c.score=Number(c.score||0)+(react.dataset.commentReact==='up'?1:-1); saveComments(kind,targetId,rows); paint(); } return; }
      const report = e.target.closest('[data-report-comment]');
      if(report){ openReportModal('comment', report.dataset.reportComment, ct('targetComment')); return; }
      if(!e.target.closest('.comment-head')) document.querySelectorAll('.comment-head.menu-open').forEach(x=>x.classList.remove('menu-open'));
    }
  }
  function formatTextarea(textarea, type){
    const start = textarea.selectionStart, end = textarea.selectionEnd, selected = textarea.value.slice(start,end) || (type==='mention'?ct('mention'):'');
    let insert = selected;
    if(type==='bold') insert = `**${selected || 'text'}**`;
    if(type==='italic') insert = `*${selected || 'text'}*`;
    if(type==='mention') insert = '@' + prompt(ct('mention'), selected.replace('@','') || '') || selected;
    if(type==='link') insert = prompt(ct('insertLink'), 'https://') || selected;
    if(type==='image') insert = `![image](${prompt(ct('insertImage'), 'https://') || ''})`;
    textarea.setRangeText(insert, start, end, 'end'); textarea.focus();
  }

  function bindGallery(){
    document.querySelectorAll('[data-gallery-img]').forEach(btn=>btn.addEventListener('click',()=>{ document.getElementById('galleryMainImg').src=btn.dataset.galleryImg; document.querySelector('[data-open-image]').dataset.openImage=btn.dataset.galleryImg; document.querySelectorAll('[data-gallery-img]').forEach(b=>b.classList.toggle('active', b===btn)); }));
    document.querySelector('[data-open-image]')?.addEventListener('click', e=>{ const src=e.currentTarget.dataset.openImage; if(src) openImageViewer(src); });
  }
  function openImageViewer(src){ modalShell('imageViewerModal','',`<div class="image-viewer"><img src="${esc(src)}" alt=""></div>`); }
  function bindRating(){ document.querySelectorAll('[data-rate-mod] [data-star]').forEach(b=>b.addEventListener('click',()=>setRating(b.closest('[data-rate-mod]').dataset.rateMod, b.dataset.star))); }
  function bindCardMenus(){
    document.querySelectorAll('[data-card-menu]').forEach(btn=>btn.addEventListener('click', e=>{ e.stopPropagation(); btn.closest('[data-mod-card]').classList.toggle('menu-open'); }));
    document.querySelectorAll('[data-favorite]').forEach(btn=>btn.addEventListener('click',()=>toggleFavorite(btn.dataset.favorite)));
    bindRating(); bindReportButtons();
  }
  function bindReportButtons(){ document.querySelectorAll('[data-report-target]').forEach(btn=>btn.addEventListener('click',()=>openReportModal(btn.dataset.reportTarget, btn.dataset.targetId, btn.dataset.targetTitle))); }

  function openReportModal(kind,targetId,targetTitle){
    if(!currentUser){ openAuthModal('login'); return; }
    modalShell('reportModalCommunity', ct('complain'), `<form class="auth-form" id="communityReportForm"><label class="field"><span>${ct('reportReason')}</span><textarea id="reportMessage" maxlength="300"></textarea></label><button class="btn primary">${ct('sendReport')}</button></form>`);
    document.getElementById('communityReportForm').onsubmit = e => { e.preventDefault(); const msg=document.getElementById('reportMessage').value.trim(); saveReport({id:id('r'), type:'complaint', targetKind:kind, targetId, targetTitle, fromUid:uid(), fromName:userName(), message:msg, status:'new', reply:'', createdAt:now(), updatedAt:now()}); alert(ct('reportSent')); document.getElementById('reportModalCommunity').remove(); };
  }

  function renderFeedback(){
    if(renderMaintenance()) return;
    const mine = getReports().filter(r => r.fromUid === uid());
    document.getElementById('app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/feedback</p><h1>${ct('feedbackTitle')}</h1><p>${currentUser?ct('appealLimit'):ct('feedbackLoginHint')}</p></section><section class="feedback-tabs page-panel reveal"><div class="admin-tabs"><button class="active" data-feedback-tab="send">${ct('sendAppeal')}</button><button data-feedback-tab="mine">${ct('myAppeals')}</button></div><div id="feedbackPane"></div></section>${footerHtml()}`;
    const pane=document.getElementById('feedbackPane');
    function sendPane(){ pane.innerHTML = currentUser ? `<form class="auth-form" id="feedbackForm"><label class="field"><span>${ct('topic')}</span><select id="feedbackTopic"><option>${ct('topicQuestion')}</option><option>${ct('topicWish')}</option><option>${ct('topicBug')}</option><option value="other">${ct('topicOther')}</option></select></label><label class="field hidden" id="feedbackOtherWrap"><span>${ct('topicOther')}</span><input id="feedbackOther"></label><label class="field"><span>${ct('appealText')}</span><textarea id="feedbackText" maxlength="300"></textarea><small>${ct('appealLimit')}</small></label><label class="field"><span>${ct('attachImages')}</span><textarea id="feedbackImages" placeholder="https://..."></textarea></label><button class="btn primary">${ct('sendAppealBtn')}</button></form>` : `<div class="empty-state"><p>${ct('feedbackLoginHint')}</p><button class="btn primary" id="feedbackLogin">${ct('openLogin')}</button></div>`; document.getElementById('feedbackLogin')?.addEventListener('click',()=>openAuthModal('login')); document.getElementById('feedbackTopic')?.addEventListener('change',e=>document.getElementById('feedbackOtherWrap').classList.toggle('hidden',e.target.value!=='other')); document.getElementById('feedbackForm') && (document.getElementById('feedbackForm').onsubmit=e=>{ e.preventDefault(); const topic=document.getElementById('feedbackTopic').value==='other'?document.getElementById('feedbackOther').value.trim():document.getElementById('feedbackTopic').value; const text=document.getElementById('feedbackText').value.trim(); if(!text) return; saveReport({id:id('fb'), type:'feedback', targetKind:'site', targetId:'feedback', targetTitle:topic, fromUid:uid(), fromName:userName(), message:text + (document.getElementById('feedbackImages').value.trim()?`\n${document.getElementById('feedbackImages').value.trim()}`:''), status:'new', reply:'', createdAt:now(), updatedAt:now()}); alert(ct('appealSent')); renderFeedback(); }); }
    function myPane(){ pane.innerHTML = mine.length ? mine.map(reportRow).join('') : `<div class="empty-state">${ct('noAppeals')}</div>`; }
    document.querySelectorAll('[data-feedback-tab]').forEach(btn=>btn.addEventListener('click',()=>{ document.querySelectorAll('[data-feedback-tab]').forEach(b=>b.classList.toggle('active',b===btn)); btn.dataset.feedbackTab==='send'?sendPane():myPane(); }));
    sendPane(); try{ enhanceCustomSelects(document.getElementById('app')); }catch(_){}
  }
  function reportStatusLabel(status){ return status === 'closed' ? ct('statusClosed') : status === 'working' ? ct('statusWorking') : ct('statusNew'); }
  function reportRow(r){ return `<article class="appeal-row status-${esc(r.status)}"><div><span class="appeal-badge">${reportStatusLabel(r.status)}</span><strong>${r.type==='feedback'?ct('reportTypeFeedback'):ct('reportTypeComplaint')} · ${esc(r.targetTitle || '')}</strong><p>${linkify(r.message || '')}</p>${r.reply?`<div class="admin-reply"><b>${ct('replyToUser')}</b><p>${linkify(r.reply)}</p></div>`:''}<small>${fmtDate(r.createdAt)}</small></div><button class="btn" type="button" data-open-appeal="${esc(r.id)}">${ct('openFull')}</button></article>`; }

  function renderNotifications(){
    if(renderMaintenance()) return;
    if(!currentUser){ openAuthModal('login'); location.hash='#home'; return; }
    const rows = getNotifications();
    document.getElementById('app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/notifications</p><h1>${ct('notificationsTitle')}</h1><button class="btn" id="markAllRead">${ct('markAllRead')}</button></section><section class="notifications-list reveal">${rows.length?rows.map(n=>`<a class="notification-row ${n.read?'read':'unread'}" href="${esc(n.url || '#notifications')}" data-link data-notification-id="${esc(n.id)}"><strong>${esc(n.text)}</strong><small>${fmtDate(n.createdAt)}</small></a>`).join(''):`<div class="empty-state">${ct('noNotifications')}</div>`}</section>${footerHtml()}`;
    document.getElementById('markAllRead')?.addEventListener('click',()=>{ rows.forEach(n=>n.read=true); saveNotifications(uid(), rows); updateNotificationDot(); renderNotifications(); });
    document.querySelectorAll('[data-notification-id]').forEach(a=>a.addEventListener('click',()=>{ const rows=getNotifications(); const n=rows.find(x=>x.id===a.dataset.notificationId); if(n)n.read=true; saveNotifications(uid(), rows); updateNotificationDot(); }));
  }

  function renderAbout(){
    document.getElementById('app').innerHTML = `<section class="page-panel narrow reveal"><p class="eyebrow">/about</p><h1>${ct('aboutProjectTitle')}</h1><p>${ct('aboutProjectText')}</p><div class="terminal-box"><p>&gt; firebase_auth: ready</p><p>&gt; firestore_schema: clean</p><p>&gt; community_modules: online</p><p>&gt; responsive_layout: optimized</p></div></section>${footerHtml()}`;
  }
  function footerHtml(){ return `<footer class="site-footer"><strong>Polux Mods</strong><span>FS Mobile / Pixel Garage</span><a href="#feedback" data-link>${ct('navFeedback')}</a></footer>`; }

  function buildAdminTabs(active='publish'){
    const tabs = [
      ['publish',ct('adminPublication'),ct('adminPublicationDesc')],['users',ct('adminUsers'),ct('adminUsersDesc')],['appeals',ct('adminAppeals'),ct('adminAppealsDesc')],['suggested',ct('adminSuggested'),ct('adminSuggestedDesc')],['site',ct('adminSite'),ct('adminSiteDesc')]
    ];
    return `<div class="admin-block-tabs">${tabs.map(([key,title,desc])=>`<button class="${key===active?'active':''}" data-admin-tab="${key}"><strong>${title}</strong><small>${desc}</small></button>`).join('')}</div><div id="adminPane"></div>`;
  }
  function renderAdminPanelPage(){
    if(!currentUser){ openAuthModal('login'); location.hash='#home'; return; }
    const me = profile();
    if(!isAdmin()) { document.getElementById('app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/admin</p><h1>${ct('adminPanelTitle') || 'Admin'}</h1><p>${ct('adminOnly')}</p></section>`; return; }
    document.getElementById('app').innerHTML = `<section class="page-head page-panel admin-page"><p class="eyebrow">/admin</p><h1>${ct('adminPanelTitle')}</h1><p>${ct('adminPanelText')}</p></section><section class="admin-workspace reveal">${buildAdminTabs()}</section>${footerHtml()}`;
    const pane = document.getElementById('adminPane');
    const renders = {publish:renderAdminPublish, users:renderAdminUsers, appeals:renderAdminAppeals, suggested:renderAdminSuggested, site:renderAdminSite};
    document.querySelectorAll('[data-admin-tab]').forEach(btn=>btn.addEventListener('click',()=>{ document.querySelectorAll('[data-admin-tab]').forEach(b=>b.classList.toggle('active',b===btn)); renders[btn.dataset.adminTab](pane, me); }));
    renderAdminPublish(pane, me);
  }

  function renderAdminPublish(pane, me, editMod=null){
    pane.innerHTML = `<div class="admin-card admin-card-wide"><h3>${ct('adminPublication')}</h3><label class="field"><span>${ct('publishArea')}</span><select id="publishArea"><option value="mod">${ct('areaMod')}</option><option value="news">${ct('areaNews')}</option><option value="home">${ct('areaHome')}</option></select></label><div id="publishFormBox"></div></div>`;
    try{ enhanceCustomSelects(pane); }catch(_){}
    const box=document.getElementById('publishFormBox');
    function paint(){ const area=document.getElementById('publishArea').value; area==='news'?publishNewsForm(box,me):area==='home'?publishHomeForm(box,me):publishModForm(box,me,editMod); }
    document.getElementById('publishArea').addEventListener('change', paint); paint();
  }
  function publishModForm(box, me, editMod){
    const m = editMod || {};
    box.innerHTML = `<form class="auth-form" id="modPublishForm"><label class="field"><span>${ct('title')}</span><input id="modTitle" value="${esc(m.title||'')}"></label><label class="field"><span>${ct('shortDescription')}</span><textarea id="modShort" maxlength="160">${esc(m.shortDesc||'')}</textarea></label><label class="field"><span>${ct('fullDescription')}</span><textarea id="modDesc">${esc(m.description||'')}</textarea></label><div class="admin-form-grid"><label class="field"><span>${ct('category')}</span><input id="modCategory" value="${esc(m.category||'Трактори')}"></label><label class="field"><span>${ct('version')}</span><input id="modVersion" value="${esc(m.version||'1.0')}"></label><label class="field"><span>${ct('gameVersions')}</span><input id="modGames" value="${esc((m.gameVersions||['FS Mobile 20']).join(', '))}"></label><label class="field"><span>${ct('modAuthor')}</span><input id="modAuthor" value="${esc(m.modAuthor||'Polux Mods')}"></label></div><label class="field"><span>${ct('downloadLink')}</span><input id="modDownload" value="${esc(m.downloadUrl||'')}"></label><label class="field"><span>${ct('imagesList')}</span><textarea id="modImages">${esc((m.images||[]).join('\n'))}</textarea></label><div class="hero-actions"><button class="btn danger-soft" type="reset">${ct('clear')}</button><button class="btn primary" type="submit">${ct('publish')}</button></div><div class="auth-status" id="publishStatus"></div></form>`;
    document.getElementById('modPublishForm').onsubmit=e=>{ e.preventDefault(); const rec={id:m.id||slugify(document.getElementById('modTitle').value)||id('mod'), title:document.getElementById('modTitle').value.trim(), shortDesc:document.getElementById('modShort').value.trim(), description:document.getElementById('modDesc').value.trim(), category:document.getElementById('modCategory').value.trim(), version:document.getElementById('modVersion').value.trim(), gameVersions:document.getElementById('modGames').value.split(',').map(x=>x.trim()).filter(Boolean), modAuthor:document.getElementById('modAuthor').value.trim(), authorUid:me.uid, authorName:me.name, images:document.getElementById('modImages').value.split('\n').map(x=>x.trim()).filter(Boolean), downloadUrl:document.getElementById('modDownload').value.trim(), status:'published', source:m.source||'admin', createdAt:m.createdAt||now(), updatedAt:now(), ratingSum:Number(m.ratingSum||0), ratingCount:Number(m.ratingCount||0)}; saveModRecord(rec); document.getElementById('publishStatus').textContent=ct('published'); document.getElementById('publishStatus').className='auth-status show ok'; };
  }
  function publishNewsForm(box, me){
    box.innerHTML = `<form class="auth-form" id="newsPublishForm"><label class="field"><span>${ct('title')}</span><input id="newsTitle"></label><label class="field"><span>${ct('shortDescription')}</span><textarea id="newsSummary" maxlength="180"></textarea></label><h4>${ct('newsBuilder')}</h4><small>${ct('blockLimit')}</small><div id="newsBlocks" class="news-builder"></div><button class="btn" type="button" id="addNewsBlock">${ct('addBlock')}</button><div class="hero-actions"><button class="btn danger-soft" type="reset">${ct('clear')}</button><button class="btn primary" type="submit">${ct('publish')}</button></div><div class="auth-status" id="newsStatus"></div></form>`;
    const blocks=document.getElementById('newsBlocks');
    function addBlock(type='text'){
      if(blocks.children.length>=10) return;
      blocks.insertAdjacentHTML('beforeend', `<div class="news-builder-block"><select class="blockType"><option value="text">${ct('blockText')}</option><option value="image">${ct('blockImage')}</option><option value="fact">${ct('blockFact')}</option><option value="poll">${ct('blockPoll')}</option></select><textarea class="blockValue" placeholder="${ct('blockText')}"></textarea><button type="button" class="icon-btn" data-remove-block>×</button></div>`);
      blocks.lastElementChild.querySelector('.blockType').value=type; try{ enhanceCustomSelects(blocks.lastElementChild); }catch(_){}
    }
    addBlock('text'); document.getElementById('addNewsBlock').onclick=()=>addBlock('text');
    blocks.addEventListener('click',e=>{ if(e.target.closest('[data-remove-block]')) e.target.closest('.news-builder-block').remove(); });
    document.getElementById('newsPublishForm').onsubmit=e=>{ e.preventDefault(); const rows=[...blocks.querySelectorAll('.news-builder-block')].map(b=>{ const type=b.querySelector('.blockType').value; const val=b.querySelector('.blockValue').value.trim(); if(type==='image') return {type,url:val,caption:''}; if(type==='poll') return {type,question:val.split('\n')[0]||'',options:val.split('\n').slice(1).filter(Boolean)}; return {type,text:val}; }).filter(b=>b.text||b.url||b.question); const rec={id:slugify(document.getElementById('newsTitle').value)||id('news'), title:document.getElementById('newsTitle').value.trim(), summary:document.getElementById('newsSummary').value.trim(), authorUid:me.uid, authorName:me.name, blocks:rows.slice(0,10), createdAt:now(), updatedAt:now()}; saveNewsRecord(rec); document.getElementById('newsStatus').textContent=ct('published'); document.getElementById('newsStatus').className='auth-status show ok'; };
  }
  function publishHomeForm(box, me){
    const settings=getSiteSettings(); const h=settings.home||{};
    box.innerHTML = `<form class="auth-form" id="homeForm"><label class="field"><span>${ct('homeHeroTitle')}</span><input id="homeTitle" value="${esc(h.title||ct('heroTitle'))}"></label><label class="field"><span>${ct('homeHeroText')}</span><textarea id="homeText">${esc(h.text||ct('heroText'))}</textarea></label><label class="field"><span>${ct('homeMainNews')}</span><input id="homeMain" value="${esc(h.mainNews||'')}"></label><label class="field"><span>${ct('homeSeasonOffer')}</span><input id="homeSeason" value="${esc(h.seasonOffer||'')}"></label><div class="hero-actions"><button class="btn danger-soft" type="reset">${ct('clear')}</button><button class="btn primary" type="submit">${ct('saveHome')}</button></div><div class="auth-status" id="homeStatus"></div></form>`;
    document.getElementById('homeForm').onsubmit=e=>{e.preventDefault(); settings.home={title:document.getElementById('homeTitle').value.trim(), text:document.getElementById('homeText').value.trim(), mainNews:document.getElementById('homeMain').value.trim(), seasonOffer:document.getElementById('homeSeason').value.trim()}; saveSiteSettings(settings); document.getElementById('homeStatus').textContent=ct('saved'); document.getElementById('homeStatus').className='auth-status show ok';};
  }
  function slugify(text){ return String(text||'').toLowerCase().trim().replace(/[ґ]/g,'g').replace(/[є]/g,'ye').replace(/[і]/g,'i').replace(/[ї]/g,'yi').replace(/[а-яё]/gi,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48); }

  function getProfilesIndex(){ try{return JSON.parse(localStorage.getItem(allProfilesKey()) || '{}');}catch(_){return {};} }
  function renderAdminUsers(pane, me){
    pane.innerHTML = `<div class="admin-card admin-card-wide"><h3>${ct('adminUsers')}</h3><input id="adminUserSearch2" class="site-input" type="search" placeholder="${ct('userSearch')}"><div id="adminUsersRows" class="admin-users-table"></div></div>`;
    const paint=()=>{ const q=document.getElementById('adminUserSearch2').value.toLowerCase(); const rows=Object.values(getProfilesIndex()).filter(u=>!q||`${u.uid} ${u.publicId} ${u.email} ${u.name}`.toLowerCase().includes(q)); document.getElementById('adminUsersRows').innerHTML=rows.length?rows.map(u=>adminUserRow(u)).join(''):`<div class="empty-state">${ct('adminNoUsers')}</div>`; bindAdminUserActions(me); };
    document.getElementById('adminUserSearch2').addEventListener('input',paint); paint(); syncUsersIndexFromCloud?.().then(paint);
  }
  function adminUserRow(u){ const role=highestRole(u); return `<div class="admin-user-line"><a class="admin-user-avatar" href="#user/${esc(u.uid)}" data-link>${u.avatar?`<img src="${esc(u.avatar)}" alt="">`:defaultAvatarSvg()}</a><div><strong>${esc(u.name||u.email||u.uid)}</strong><small>ID: ${esc(u.publicId||publicIdFor(u))}</small></div><div class="admin-email">${esc(u.email||'—')}</div><div>${ct(role)}</div><div>${fmtDate(u.lastOnline||u.updatedAt)}</div><div class="admin-user-menu-wrap"><button class="icon-btn admin-dots" data-admin-row-menu="${esc(u.uid)}">⋯</button><div class="admin-user-menu"><a href="#user/${esc(u.uid)}" data-link>${ct('viewProfile')}</a><button data-user-act="mute" data-uid="${esc(u.uid)}">${u.mutedUntil?ct('unmute'):ct('mute')}</button><button data-user-act="ban" data-uid="${esc(u.uid)}">${u.bannedUntil?ct('unban'):ct('ban')}</button><button data-user-act="rating" data-uid="${esc(u.uid)}">${ct('editRating')}</button><button data-user-act="role" data-uid="${esc(u.uid)}">${ct('editRoles')}</button><button data-user-act="delete" data-uid="${esc(u.uid)}">${ct('deleteAccount')}</button></div></div></div>`; }
  function bindAdminUserActions(me){
    document.querySelectorAll('[data-admin-row-menu]').forEach(btn=>btn.onclick=e=>{e.stopPropagation(); btn.closest('.admin-user-line').classList.toggle('menu-open');});
    document.querySelectorAll('[data-user-act]').forEach(btn=>btn.onclick=async()=>{ const target=readProfile(btn.dataset.uid); if(!target) return; const act=btn.dataset.userAct; if(act==='mute') target.mutedUntil=target.mutedUntil?null:'permanent'; if(act==='ban') target.bannedUntil=target.bannedUntil?null:'permanent'; if(act==='delete'){ if(!confirm(ct('confirmDeleteAccount'))) return; target.deletedAt=now(); } if(act==='rating'){ const delta=Number(await promptModal(ct('editRating'), ct('ratingDelta'), '0') || 0); target.rating=Number(target.rating||0)+delta; } if(act==='role'){ const role=await selectModal(ct('editRoles'), ct('selectRole'), [['roleAdministrator',ct('roleAdministrator')],['roleModerator',ct('roleModerator')],['roleUser',ct('roleUser')]]); if(role) target.roles=[role,...(ratingRoleKeys?.(target.rating)||[])]; notify(target.uid,'role',ct('notificationRole'),'#profile'); } writeProfile(target); await window.PoluxDbService?.updateUserProfile?.(target.uid,target); renderAdminUsers(document.getElementById('adminPane'),me); });
  }

  function renderAdminAppeals(pane, me){
    const rows=getReports();
    pane.innerHTML = `<div class="admin-card admin-card-wide"><h3>${ct('adminAppeals')}</h3><div class="appeals-admin-list">${rows.length?rows.map(reportRow).join(''):`<div class="empty-state">${ct('noAppeals')}</div>`}</div></div>`;
    document.querySelectorAll('[data-open-appeal]').forEach(btn=>btn.onclick=()=>openAppealAdmin(btn.dataset.openAppeal, me));
  }
  function openAppealAdmin(reportId, me){
    const r=getReports().find(x=>x.id===reportId); if(!r) return;
    const locked=r.status==='closed';
    modalShell('appealAdminModal', `${r.type==='feedback'?ct('reportTypeFeedback'):ct('reportTypeComplaint')} · ${reportStatusLabel(r.status)}`, `<div class="auth-form"><p>${linkify(r.message)}</p><small>${ct('publishedBy')}: ${esc(r.fromName)} · ${fmtDate(r.createdAt)}</small><div class="hero-actions"><a class="btn" href="#${r.targetKind==='profile'?'user':'mods'}/${esc(r.targetId)}" data-link>${ct('goToTarget')}</a><a class="btn" href="#user/${esc(r.fromUid)}" data-link>${ct('goToReporter')}</a></div><label class="field"><span>${ct('replyToUser')}</span><textarea id="appealReply" ${locked?'disabled':''} placeholder="${ct('adminReplyPlaceholder')}">${esc(r.reply||'')}</textarea></label>${locked?`<div class="auth-status show warn">${ct('closedLocked')}</div>`:`<div class="hero-actions"><button class="btn" id="appealWorking">${ct('markWorking')}</button><button class="btn primary" id="appealClosed">${ct('markClosed')}</button><button class="btn danger-soft" id="appealDelete">${ct('deleteAppeal')}</button><button class="btn" id="appealSaveReply">${ct('replyToUser')}</button></div>`}</div>`);
    document.getElementById('appealSaveReply')?.addEventListener('click',()=>{ r.reply=document.getElementById('appealReply').value.trim(); r.updatedAt=now(); saveReport(r); notify(r.fromUid,'reply',ct('notificationReply'),'#feedback'); document.getElementById('appealAdminModal').remove(); renderAdminAppeals(document.getElementById('adminPane'),me); });
    document.getElementById('appealWorking')?.addEventListener('click',()=>{ r.status='working'; r.updatedAt=now(); saveReport(r); document.getElementById('appealAdminModal').remove(); renderAdminAppeals(document.getElementById('adminPane'),me); });
    document.getElementById('appealClosed')?.addEventListener('click',()=>{ r.status='closed'; r.reply=document.getElementById('appealReply').value.trim(); r.updatedAt=now(); saveReport(r); notify(r.fromUid,'reply',ct('notificationReply'),'#feedback'); document.getElementById('appealAdminModal').remove(); renderAdminAppeals(document.getElementById('adminPane'),me); });
    document.getElementById('appealDelete')?.addEventListener('click',()=>{ writeJson(LS.reports, getReports().filter(x=>x.id!==r.id)); deleteDoc('reports',r.id); document.getElementById('appealAdminModal').remove(); renderAdminAppeals(document.getElementById('adminPane'),me); });
  }
  function renderAdminSuggested(pane, me){ const rows=getSuggestions().filter(s=>s.status==='pending'); pane.innerHTML=`<div class="admin-card admin-card-wide"><h3>${ct('adminSuggested')}</h3><div class="suggested-list">${rows.length?rows.map(s=>`<article class="suggested-row"><div><strong>${esc(s.title)}</strong><small>${ct('suggestedBy')}: ${esc(s.authorName||s.authorUid)} · ${fmtDate(s.createdAt)}</small></div><div class="hero-actions"><button class="btn" data-suggest-preview="${esc(s.id)}">${ct('preview')}</button><button class="btn" data-suggest-edit="${esc(s.id)}">${ct('edit')}</button><button class="btn primary" data-suggest-approve="${esc(s.id)}">${ct('approve')}</button><button class="btn danger-soft" data-suggest-reject="${esc(s.id)}">${ct('reject')}</button></div></article>`).join(''):`<div class="empty-state">${ct('noSuggestions')}</div>`}</div></div>`; document.querySelectorAll('[data-suggest-approve]').forEach(b=>b.onclick=()=>{ const s=getSuggestions().find(x=>x.id===b.dataset.suggestApprove); if(s){ saveModRecord({...s,status:'published',updatedAt:now()}); s.status='approved'; saveSuggestion(s); renderAdminSuggested(pane,me);} }); document.querySelectorAll('[data-suggest-reject]').forEach(b=>b.onclick=()=>{ const s=getSuggestions().find(x=>x.id===b.dataset.suggestReject); if(s){s.status='rejected';saveSuggestion(s);renderAdminSuggested(pane,me);} }); document.querySelectorAll('[data-suggest-edit]').forEach(b=>b.onclick=()=>{ const s=getSuggestions().find(x=>x.id===b.dataset.suggestEdit); renderAdminPublish(pane,me,s); }); document.querySelectorAll('[data-suggest-preview]').forEach(b=>b.onclick=()=>{ const s=getSuggestions().find(x=>x.id===b.dataset.suggestPreview); if(s) modalShell('suggestPreviewModal', s.title, `<div>${renderGallery(s.images,s.title)}<p>${esc(s.description||s.shortDesc||'')}</p></div>`); }); }
  function renderAdminSite(pane, me){ const s=getSiteSettings(); pane.innerHTML=`<div class="admin-card admin-card-wide"><h3>${ct('adminSite')}</h3><form class="auth-form" id="siteSettingsForm"><label class="switch-row"><input type="checkbox" id="maintenanceToggle" ${s.maintenance?'checked':''}> <span>${ct('maintenanceMode')}</span></label><label class="switch-row"><input type="checkbox" id="holidayToggle" ${s.holidayTheme?'checked':''}> <span>${ct('holidayTheme')}</span></label><label class="switch-row"><input type="checkbox" id="bannerEnabled" ${s.bannerEnabled?'checked':''}> <span>${ct('headerBanner')}</span></label><label class="field"><span>${ct('bannerText')}</span><input id="bannerText" placeholder="${ct('bannerPlaceholder')}" value="${esc(s.bannerText||'')}"></label><label class="field"><span>${ct('bannerUrl')}</span><input id="bannerUrl" value="${esc(s.bannerUrl||'')}"></label><button class="btn primary">${ct('save')}</button><div class="auth-status" id="settingsStatus"></div></form></div>`; document.getElementById('siteSettingsForm').onsubmit=e=>{e.preventDefault(); s.maintenance=document.getElementById('maintenanceToggle').checked; s.holidayTheme=document.getElementById('holidayToggle').checked; s.bannerEnabled=document.getElementById('bannerEnabled').checked; s.bannerText=document.getElementById('bannerText').value.trim(); s.bannerUrl=document.getElementById('bannerUrl').value.trim(); saveSiteSettings(s); document.getElementById('settingsStatus').textContent=ct('settingsSaved'); document.getElementById('settingsStatus').className='auth-status show ok';}; }

  function promptModal(title,label,value=''){ return new Promise(resolve=>{ modalShell('promptModalCommunity',title,`<form class="auth-form" id="promptForm"><label class="field"><span>${label}</span><input id="promptInput" value="${esc(value)}"></label><button class="btn primary">OK</button></form>`); document.getElementById('promptForm').onsubmit=e=>{e.preventDefault(); const v=document.getElementById('promptInput').value; document.getElementById('promptModalCommunity').remove(); resolve(v);}; }); }
  function selectModal(title,label,opts){ return new Promise(resolve=>{ modalShell('selectModalCommunity',title,`<form class="auth-form" id="selectForm"><label class="field"><span>${label}</span><select id="selectInput">${opts.map(([v,l])=>`<option value="${esc(v)}">${esc(l)}</option>`).join('')}</select></label><button class="btn primary">OK</button></form>`); try{ enhanceCustomSelects(document.getElementById('selectModalCommunity')); }catch(_){} document.getElementById('selectForm').onsubmit=e=>{e.preventDefault(); const v=document.getElementById('selectInput').value; document.getElementById('selectModalCommunity').remove(); resolve(v);}; }); }

  function renderProfileMenuItems(){
    const menu=document.getElementById('profileMenu'); if(!menu) return;
    if(currentUser){ menu.innerHTML=`<button type="button" role="menuitem" data-profile-action="profile">${ct('menuProfile')}</button><button type="button" role="menuitem" data-profile-action="mods">${ct('menuMyMods')}</button><button type="button" role="menuitem" data-profile-action="notifications">${ct('menuNotifications')}</button><button type="button" role="menuitem" data-profile-action="news">${ct('menuNews')}</button><button type="button" role="menuitem" data-profile-action="feedback">${ct('menuFeedback')}</button><button type="button" role="menuitem" data-profile-action="about">${ct('navAbout')}</button><button type="button" role="menuitem" data-profile-action="settings">${ct('menuSettings')}</button><button type="button" role="menuitem" data-profile-action="logout">${ct('menuLogout')}</button>`; }
    else menu.innerHTML=`<button type="button" role="menuitem" data-profile-action="login">${ct('loginOrRegister')}</button>`;
    updateNotificationDot();
  }
  function updateNotificationDot(){ const btn=document.getElementById('profileBtn'); if(!btn) return; const unread=currentUser?getNotifications().filter(n=>!n.read).length:0; btn.classList.toggle('has-notifications', unread>0); btn.dataset.unread=String(unread); }

  function renderMyModsPage(){
    if(!currentUser){ openAuthModal('login'); location.hash='#home'; return; }
    const p=profile(); const list=getMods().filter(m=>m.authorUid===p.uid || (m.authorName||'').toLowerCase()===(p.name||'').toLowerCase());
    document.getElementById('app').innerHTML=`<section class="page-head page-panel"><p class="eyebrow">/my-mods</p><h1>${ct('myModsTitle')}</h1><p>${ct('filteredByAuthor')} <strong>${esc(p.name)}</strong></p></section><section class="mods-list reveal">${list.length?list.map(modCard).join(''):`<div class="empty-state">${ct('noUserMods') || ct('emptyMods')}</div>`}</section>${footerHtml()}`; bindCardMenus();
  }

  function route(){
    const raw=(location.hash||'#home').replace('#','') || 'home';
    const [path] = raw.split('?');
    const [page,idValue] = path.split('/');
    try{ showBoot?.(); }catch(_){}
    setTimeout(()=>{
      if(page==='mods' && idValue) renderMod(idValue);
      else if(page==='mods') renderMods();
      else if(page==='news') renderNews(idValue);
      else if(page==='feedback' || page==='contact') renderFeedback();
      else if(page==='notifications') renderNotifications();
      else if(page==='my-mods') renderMyModsPage();
      else if(page==='profile-settings') renderProfileSettingsPage();
      else if(page==='admin' || page?.startsWith('admin')) renderAdminPanelPage();
      else if(page==='user' && idValue) renderTemplate('profileTemplate', () => renderProfile(idValue));
      else if(page==='about') renderAbout();
      else if(page==='profile') renderTemplate('profileTemplate', renderProfile);
      else renderHome();
      try{ applyI18n?.(); }catch(_){}
      updateNotificationDot();
      document.getElementById('app')?.focus?.({preventScroll:true});
      document.getElementById('nav')?.classList.remove('open');
    }, 120);
  }

  function installNav(){
    const nav=document.getElementById('nav'); if(nav){ nav.innerHTML=`<a href="#home" data-link>${ct('navHome')}</a><a href="#mods" data-link>${ct('navMods')}</a><a href="#news" data-link>${ct('navNews')}</a><a href="#feedback" data-link>${ct('navFeedback')}</a><a href="#about" data-link>${ct('navAbout')}</a>`; }
    document.getElementById('profileMenu')?.addEventListener('click', e=>{ const action=e.target.closest('[data-profile-action]')?.dataset.profileAction; if(action==='notifications') location.hash='#notifications'; if(action==='news') location.hash='#news'; if(action==='feedback') location.hash='#feedback'; if(action==='about') location.hash='#about'; });
  }

  function init(){
    installTranslations(); installNav(); renderSiteBanner(); try{ renderProfileMenuItems(); }catch(_){}
    try{ window.renderProfileMenuItems = renderProfileMenuItems; }catch(_){}
    try{ document.getElementById('profileBtn')?.addEventListener('click', renderProfileMenuItems, true); }catch(_){}
    try{ document.getElementById('langSelect')?.addEventListener('change', () => setTimeout(() => { installTranslations(); installNav(); renderProfileMenuItems(); route(); }, 0)); }catch(_){}
    window.addEventListener('hashchange', route);
    document.addEventListener('click', e=>{ if(!e.target.closest('[data-mod-card]') && !e.target.closest('.comment-head')) document.querySelectorAll('.menu-open').forEach(x=>x.classList.remove('menu-open')); });
    fetchCollection('mods', LS.mods).then(()=>{ if((location.hash||'#home').includes('mods') || (location.hash||'#home')==='#home') route(); });
    fetchCollection('news', LS.news).then(()=>{ if((location.hash||'#home').includes('news') || (location.hash||'#home')==='#home') route(); });
    route();
  }

  window.PoluxCommunity = {SCHEMA, getMods, getNews, getReports, getSiteSettings, saveSiteSettings, notify, route};
  init();
})();
