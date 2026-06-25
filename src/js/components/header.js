import { routes, SUPPORTED_LANGS, DEFAULT_AVATAR } from '../core/config.js';
import { store, subscribe } from '../core/state.js';
import { t } from '../core/i18n.js';
import { $, esc, avatarOf } from '../core/utils.js';
import { attachHeaderDropdowns } from './dropdowns.js';
import { openAuthModal } from './authModal.js';
import { navigate, currentPath } from '../core/router.js';
export function renderHeader(){
  const lang=SUPPORTED_LANGS.find(l=>l.code===store.lang)||SUPPORTED_LANGS[0];
  $('#siteHeader').innerHTML=`<div class="header-inner"><a class="brand" href="#/"><span class="brand-logo">PX</span><span class="brand-name">Polux Mods<span class="brand-sub">FS Mobile</span></span></a><button class="icon-btn hamb" id="hambBtn">☰</button><nav class="main-nav" id="mainNav">${routes.map(([k,path])=>`<a class="nav-link ${currentPath()===path?'active':''}" href="#${path}">${t(k)}</a>`).join('')}</nav><div class="header-actions"><div class="dropdown-wrap"><button id="langBtn" class="icon-btn">${lang.flag} <span class="hide-sm">${lang.label}</span></button></div><div class="dropdown-wrap"><button id="themeBtn" class="icon-btn">◈</button></div><button id="crtBtn" class="icon-btn" title="CRT">${store.crt?'▣':'□'}</button>${store.user?`<div class="dropdown-wrap"><button id="profileBtn" class="profile-trigger icon-btn"><img class="avatar" src="${esc(avatarOf(store.profile))}" alt="avatar">${store.unread?'<span class="notif-dot"></span>':''}</button></div>`:`<button id="loginBtn" class="retro-btn primary">${t('login')}</button>`}</div></div>`;
  $('#hambBtn')?.addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
  $('#loginBtn')?.addEventListener('click',openAuthModal);
  attachHeaderDropdowns();
}
export function renderFooter(){ $('#siteFooter').innerHTML=`<div class="pixel-title">POLUX MODS</div><div>© ${new Date().getFullYear()} Polux Mods · Farming Simulator Mobile Mods</div>`; }
export function bootHeader(){ renderHeader(); renderFooter(); subscribe(renderHeader); }
