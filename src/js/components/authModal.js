import { EMAIL_RE } from '../core/config.js';
import { t } from '../core/i18n.js';
import { $, scrollFieldIntoView, toast } from '../core/utils.js';
import { openModal, closeModal } from './modal.js';
import { login, register, resetPassword } from '../services/authService.js';
export function openAuthModal(mode='login'){
  const body=()=>`<div class="tabs"><button class="tab ${mode==='login'?'active':''}" data-mode="login">${t('signIn')}</button><button class="tab ${mode==='register'?'active':''}" data-mode="register">${t('signUp')}</button></div><form class="form" id="authForm" novalidate>${mode==='register'?field('name',t('name')):''}${field('email',t('email'),'email')}${passField('password',t('password'))}${mode==='register'?passField('password2',t('password2')):''}<button class="retro-btn primary full" type="submit">${mode==='login'?t('signIn'):t('signUp')}</button>${mode==='login'?`<button class="dropdown-item" type="button" id="forgotBtn">${t('forgot')}</button>`:''}</form>`;
  openModal({title:t('login'),body:body(),size:'small',onMount:(root)=>attach(root,mode)});
}
function field(name,label,type='text'){ return `<div class="field"><label for="${name}">${label}</label><input class="input" id="${name}" name="${name}" type="${type}" autocomplete="${name==='email'?'email':'name'}"><div class="field-error" data-err="${name}"></div></div>`; }
function passField(name,label){ return `<div class="field"><label for="${name}">${label}</label><div class="input-wrap"><input class="input" id="${name}" name="${name}" type="password" autocomplete="${name==='password2'?'new-password':'current-password'}"><button class="eye-btn" type="button" data-eye="${name}">👁</button></div><div class="field-error" data-err="${name}"></div></div>`; }
function attach(root,mode){
  root.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>openAuthModal(b.dataset.mode));
  root.querySelectorAll('input,textarea').forEach(i=>i.addEventListener('focus',()=>scrollFieldIntoView(i)));
  root.querySelectorAll('[data-eye]').forEach(b=>b.onclick=()=>{ const i=root.querySelector(`#${b.dataset.eye}`); i.type=i.type==='password'?'text':'password'; });
  root.querySelector('#forgotBtn')?.addEventListener('click',async()=>{ const email=root.querySelector('#email').value.trim(); if(!EMAIL_RE.test(email)){err(root,'email',t('badEmail'));return;} await resetPassword(email); toast('Лист для скидання пароля надіслано'); });
  root.querySelector('#authForm').onsubmit=async e=>{ e.preventDefault(); clearErr(root); const data=Object.fromEntries(new FormData(e.currentTarget).entries()); if(!validate(root,data,mode)) return; try{ mode==='login'?await login(data):await register(data); closeModal(); toast(mode==='login'?'Вхід виконано':'Реєстрація успішна. Перевірте пошту для підтвердження.'); }catch(ex){ toast(ex.message,'err'); } };
}
function validate(root,d,mode){ let ok=true; ['email','password',...(mode==='register'?['name','password2']:[])].forEach(k=>{ if(!d[k]?.trim()){err(root,k,t('required')); ok=false;} }); if(d.email&&!EMAIL_RE.test(d.email)){err(root,'email',t('badEmail'));ok=false;} if(d.password&&d.password.length<6){err(root,'password',t('passShort'));ok=false;} if(mode==='register'&&d.password!==d.password2){err(root,'password2',t('passMismatch'));ok=false;} return ok; }
function err(root,k,msg){ root.querySelector(`[data-err="${k}"]`).textContent=msg; }
function clearErr(root){ root.querySelectorAll('.field-error').forEach(e=>e.textContent=''); }
