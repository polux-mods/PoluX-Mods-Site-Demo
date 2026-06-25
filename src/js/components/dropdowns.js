import { THEMES, SUPPORTED_LANGS } from '../core/config.js';
import { setLang, setTheme, setCrt, store } from '../core/state.js';
import { t } from '../core/i18n.js';
import { $, $$ } from '../core/utils.js';
import { logout } from '../services/authService.js';
export function closeDropdowns(){ $$('.dropdown').forEach(d=>d.remove()); }
export function attachHeaderDropdowns(){
  document.addEventListener('click',e=>{ if(!e.target.closest('.dropdown-wrap')) closeDropdowns(); });
  $('#langBtn')?.addEventListener('click',e=>{ e.stopPropagation(); toggleLang(e.currentTarget); });
  $('#themeBtn')?.addEventListener('click',e=>{ e.stopPropagation(); toggleTheme(e.currentTarget); });
  $('#crtBtn')?.addEventListener('click',()=>setCrt(!store.crt));
  $('#profileBtn')?.addEventListener('click',e=>{ e.stopPropagation(); toggleProfile(e.currentTarget); });
}
function menu(anchor,html,left=false){ closeDropdowns(); const wrap=anchor.closest('.dropdown-wrap'); const div=document.createElement('div'); div.className=`dropdown ${left?'left':''}`; div.innerHTML=html; wrap.appendChild(div); return div; }
function toggleLang(btn){ const d=menu(btn,SUPPORTED_LANGS.map(l=>`<button class="dropdown-item ${store.lang===l.code?'active':''}" data-lang="${l.code}"><span>${l.flag} ${l.label}</span><small>${l.name}</small></button>`).join('')); d.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{setLang(b.dataset.lang); location.reload();}); }
function toggleTheme(btn){ const d=menu(btn,THEMES.map(th=>`<button class="dropdown-item ${store.theme===th.id?'active':''}" data-theme="${th.id}"><span class="row"><i class="theme-dot ${th.id}"></i>${th.name}</span></button>`).join('')); d.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>{setTheme(b.dataset.theme); closeDropdowns();}); }
function toggleProfile(btn){
  const p=store.profile; const admin=(p?.roles||[]).some(r=>['Administrator','Moderator'].includes(r));
  const html=`<a class="dropdown-item" href="#/profile/${store.user.uid}">${t('profile')}</a><a class="dropdown-item" href="#/notifications">${t('notifications')} ${store.unread?`<span class="badge">${store.unread}</span>`:''}</a><a class="dropdown-item" href="#/mods?author=${store.user.uid}">${t('myMods')}</a><a class="dropdown-item" href="#/settings">${t('settings')}</a>${admin?`<a class="dropdown-item" href="#/admin">${t('admin')}</a>`:''}<button class="dropdown-item" data-logout>${t('logout')}</button>`;
  const d=menu(btn,html); d.querySelector('[data-logout]')?.addEventListener('click',logout);
}
