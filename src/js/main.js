import { bootHeader } from './components/header.js';
import { bootRouter } from './core/router.js';
import { setTheme, setCrt, store, setLang } from './core/state.js';
import { watchAuth } from './services/authService.js';
import { SUPPORTED_LANGS } from './core/config.js';
import { t } from './core/i18n.js';
import { $, scrollFieldIntoView } from './core/utils.js';
setTheme(store.theme); setCrt(store.crt); bootHeader(); watchAuth(); bootRouter();
document.addEventListener('focusin',e=>{ if(e.target.matches('input,textarea,select')) scrollFieldIntoView(e.target); });
if(!localStorage.getItem('pm_lang_confirmed')) showLangWidget();
function showLangWidget(){ const lang=SUPPORTED_LANGS.find(l=>l.code===store.lang)||SUPPORTED_LANGS[0]; const div=document.createElement('div'); div.className='lang-widget'; div.innerHTML=`<div class="row"><div><b>${lang.flag} ${lang.name}</b><br><span class="mono-muted">Мова визначена автоматично</span></div><div class="row"><button class="retro-btn" data-keep>${t('keep')}</button><button class="retro-btn primary" data-change>${t('changeLang')}</button></div></div>`; document.body.appendChild(div); div.querySelector('[data-keep]').onclick=()=>{localStorage.setItem('pm_lang_confirmed','1');div.remove();}; div.querySelector('[data-change]').onclick=()=>{ const next=prompt('uk, ru, en, pl, de, es, fr',store.lang); if(SUPPORTED_LANGS.some(l=>l.code===next)){setLang(next);localStorage.setItem('pm_lang_confirmed','1');location.reload();} }; }
