import { store, isModerator } from '../core/state.js';
import { getUser, sendThanks } from '../services/userService.js';
import { listContent } from '../services/contentService.js';
import { listComments } from '../services/commentService.js';
import { t, localeDate } from '../core/i18n.js';
import { esc, avatarOf, coverOf, toast } from '../core/utils.js';
import { openAuthModal } from '../components/authModal.js';
import { openReportModal } from './shared.js';
import { contentCard } from '../components/card.js';
export async function profileView(uid){
 if(!uid) return [`<section class="section"><div class="empty-state"><button class="retro-btn primary" id="needLogin">${t('login')}</button></div></section>`,r=>r.querySelector('#needLogin').onclick=openAuthModal];
 const u=await getUser(uid); if(!u) return [`<section class="section"><h1>404</h1></section>`,null];
 const own=store.user?.uid===uid; const mods=await listContent('mods',{authorUid:uid,take:12});
 const age=u.createdAt?.toDate?Math.floor((Date.now()-u.createdAt.toDate())/86400000):0;
 const adminButton=(own&&(u.roles||[]).some(r=>['Administrator','Moderator'].includes(r)))?`<a class="retro-btn primary full" href="#/admin">${t('admin')}</a>`:'';
 const html=`<section class="profile-card"><div class="profile-cover"><img src="${esc(coverOf(u))}" alt="cover"></div><div class="profile-info"><img class="profile-main-avatar" src="${esc(avatarOf(u))}" alt="avatar"><h1 class="pixel-title">${esc(u.name||'User')}</h1><div class="row"><span class="badge">#${esc(u.publicId||u.uid)}</span>${(u.roles||['User']).map(r=>`<span class="badge role-badge">${esc(r)}</span>`).join('')}</div>${u.bio?`<p>${esc(u.bio)}</p>`:''}<p class="mono-muted">Останній онлайн: ${localeDate(u.lastOnline)} · Реєстрація: ${localeDate(u.createdAt)} · ${age} днів на сайті</p><div class="profile-stats"><a class="stat" href="#/mods?author=${uid}"><b>${mods.length}</b><br>Моди користувача</a><button class="stat" id="commentsBtn"><b>${u.commentsCount||0}</b><br>Коментарі</button><div class="stat"><b>${u.rating||0}</b><br>${t('rating')}</div><div class="stat"><b>${u.thanksReceived||0}</b><br>Подяки</div></div><div class="row actions-mobile" style="margin-top:14px">${adminButton}${own?`<a class="retro-btn" href="#/settings">${t('settings')}</a><button class="retro-btn danger" id="logoutProfile">${t('logout')}</button>`:`<button class="retro-btn danger" id="reportProfile">${t('report')}</button><button class="retro-btn primary" id="thanksBtn">${t('thanks')}</button>${isModerator()?`<a class="retro-btn" href="#/admin?user=${uid}">Модерувати</a>`:''}`}</div></div></section><section class="section"><div class="section-head"><h2>Моди користувача</h2><a class="retro-btn" href="#/mods?author=${uid}">${t('viewAll')}</a></div>${mods.length?`<div class="grid">${mods.map(contentCard).join('')}</div>`:`<div class="empty-state">${t('empty')}</div>`}</section>`;
 return [html,(root)=>{ root.querySelector('#reportProfile')?.addEventListener('click',()=>openReportModal({targetType:'profile',targetId:uid,targetUid:uid})); root.querySelector('#thanksBtn')?.addEventListener('click',async()=>{try{await sendThanks(uid);toast('+10 рейтингу надіслано')}catch(e){toast(e.message,'err')}}); root.querySelector('#logoutProfile')?.addEventListener('click',async()=>{const {logout}=await import('../services/authService.js'); await logout();}); root.querySelector('#commentsBtn')?.addEventListener('click',()=>alert('Вікно коментарів підтягується через індекс commentsByAuthor; див. README і firestore.indexes.json.')); }];
}
