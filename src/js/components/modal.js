import { $ } from '../core/utils.js';
export function openModal({title='',body='',size='small',onMount=null}){
  const root=$('#modalRoot'); root.className='modal-root show'; document.body.classList.add('no-scroll');
  root.innerHTML=`<div class="modal-backdrop" data-close></div><section class="modal ${size}" role="dialog" aria-modal="true"><div class="modal-head"><h2>${title}</h2><button class="close-btn" data-close>✕</button></div><div class="modal-body">${body}</div></section>`;
  root.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeModal));
  root.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); },{once:true});
  onMount?.(root.querySelector('.modal-body'),root);
}
export function closeModal(){ const root=$('#modalRoot'); root.className='modal-root'; root.innerHTML=''; document.body.classList.remove('no-scroll'); }
export function confirmModal(title, text, ok='OK'){
  return new Promise(resolve=>openModal({title,body:`<p>${text}</p><div class="row" style="justify-content:flex-end"><button class="retro-btn" data-no>Скасувати</button><button class="retro-btn danger" data-yes>${ok}</button></div>`,onMount:(body)=>{body.querySelector('[data-no]').onclick=()=>{closeModal();resolve(false)};body.querySelector('[data-yes]').onclick=()=>{closeModal();resolve(true)}}}));
}
