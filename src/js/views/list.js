import { listContent, addFavorite } from '../services/contentService.js';
import { createReport } from '../services/reportService.js';
import { contentCard } from '../components/card.js';
import { t } from '../core/i18n.js';
import { $, $$, toast } from '../core/utils.js';
import { openReportModal } from './shared.js';
export async function listView(type,query){
 const sort=query.sort||'new'; const items=await listContent(type,{sort,take:60,authorUid:query.author||null});
 const title=type==='mods'?t('mods'):t('news');
 const html=`<section class="section"><div class="section-head"><h1>${title}</h1><div class="tabs"><a class="tab ${sort==='new'?'active':''}" href="#/${type}?sort=new">Нові</a><a class="tab ${sort==='popular'?'active':''}" href="#/${type}?sort=popular">Популярні</a></div></div>${items.length?`<div class="grid">${items.map(contentCard).join('')}</div>`:`<div class="empty-state">${t('empty')}</div>`}</section>`;
 return [html,(root)=>{ root.querySelectorAll('[data-card-menu]').forEach(btn=>btn.onclick=()=>openCardMenu(btn)); }];
}
function openCardMenu(btn){
 const [type,id]=btn.dataset.cardMenu.split('_'); const wrap=btn.closest('.dropdown-wrap'); wrap.querySelector('.dropdown')?.remove();
 const d=document.createElement('div'); d.className='dropdown'; d.innerHTML=`<button class="dropdown-item" data-fav>★ Додати до обраного</button><button class="dropdown-item" data-report>⚠ ${t('report')}</button>`; wrap.appendChild(d);
 d.querySelector('[data-fav]').onclick=async()=>{ try{await addFavorite(type,id);toast('Додано до обраного')}catch(e){toast(e.message,'err')} };
 d.querySelector('[data-report]').onclick=()=>openReportModal({targetType:type,targetId:id});
}
