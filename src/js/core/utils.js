import { DEFAULT_AVATAR, DEFAULT_COVER } from './config.js';
export const $ = (sel, root=document) => root.querySelector(sel);
export const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
export const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
export const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
export const sleep = ms => new Promise(r=>setTimeout(r,ms));
export const avatarOf = u => u?.avatarUrl || DEFAULT_AVATAR;
export const coverOf = u => u?.coverUrl || DEFAULT_COVER;
export const publicId = uid => `PLX-${uid.slice(0,4).toUpperCase()}-${uid.slice(-4).toUpperCase()}`;
export function toast(message,type='ok'){
  const root=$('#toastRoot'); const el=document.createElement('div');
  el.className=`toast ${type}`; el.textContent=message; root.appendChild(el); setTimeout(()=>el.remove(),4200);
}
export function htmlLinks(text=''){
  const safe=esc(text);
  return safe.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/@([\p{L}\d_\-.]+)/gu,'<a href="#/search?user=$1">@$1</a>');
}
export function scrollFieldIntoView(el){
  if(!el) return;
  setTimeout(()=>el.scrollIntoView({block:'center',inline:'nearest',behavior:'smooth'}),220);
}
export function uid(){ return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`; }
export function monthKey(date=new Date()){ return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`; }
export function monthWindowStart(){ const d=new Date(); d.setDate(1); d.setHours(0,0,0,0); return d; }
export function nextMonthDate(){ const d=monthWindowStart(); d.setMonth(d.getMonth()+1); return d; }
