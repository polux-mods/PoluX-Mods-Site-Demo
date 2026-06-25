import { store } from '../core/state.js';
import { t, localeDate } from '../core/i18n.js';
import { esc } from '../core/utils.js';
import { openAuthModal } from '../components/authModal.js';
import { markNotification } from '../services/notificationService.js';
export async function notificationsView(){
 if(!store.user) return [`<section class="section"><button class="retro-btn primary" id="needLogin">${t('login')}</button></section>`,r=>r.querySelector('#needLogin').onclick=openAuthModal];
 const items=store.notifications||[]; return [`<section class="section"><div class="section-head"><h1>${t('notifications')}</h1></div>${items.map(n=>`<a class="notif-row ${n.read?'':'status-new'}" href="${esc(n.link||'#/notifications')}" data-nid="${n.id}"><span>${n.read?'▹':'●'}</span><div><b>${esc(n.title||'Notification')}</b><p>${esc(n.text||'')}</p><small class="mono-muted">${localeDate(n.createdAt)}</small></div></a>`).join('')||`<div class="empty-state">${t('empty')}</div>`}</section>`,root=>root.querySelectorAll('[data-nid]').forEach(a=>a.onclick=()=>markNotification(store.user.uid,a.dataset.nid,true))];
}
