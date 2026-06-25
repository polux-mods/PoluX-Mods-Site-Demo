import { t } from '../core/i18n.js';
import { listContent, getSiteSettings } from '../services/contentService.js';
import { contentCard } from '../components/card.js';
import { store, isModerator } from '../core/state.js';
export async function homeView(){
 const settings=await getSiteSettings();
 if(settings.maintenance && !isModerator()) return [`<section class="hero"><div><h1>${t('maintenance')}</h1><p class="mono-muted">POLUX MODS // SERVICE MODE</p></div></section>`,null];
 const [newMods,popMods,news]=await Promise.all([listContent('mods',{sort:'new',take:6}),listContent('mods',{sort:'popular',take:6}),listContent('news',{sort:'new',take:5})]);
 const block=(title,href,items)=>`<section class="section"><div class="section-head"><h2>${title}</h2><a class="retro-btn" href="${href}">${t('viewAll')}</a></div>${items.length?`<div class="grid">${items.map(contentCard).join('')}</div>`:`<div class="empty-state">${t('empty')}</div>`}</section>`;
 return [`<section class="hero"><div><h1>Polux Mods</h1><p>Ретро-піксельний каталог мобільних модів Farming Simulator: техніка, карти, новини, профілі авторів і живі коментарі.</p><div class="hero-actions"><a class="retro-btn primary" href="#/mods">${t('mods')}</a><a class="retro-btn" href="#/feedback">${t('feedback')}</a></div></div></section>${settings.announcementEnabled?`<a class="section" style="display:block" href="${settings.announcementUrl||'#/'}"><b>📢</b> ${settings.announcementText||''}</a>`:''}${block(t('newMods'),'#/mods?sort=new',newMods)}${block(t('popularMods'),'#/mods?sort=popular',popMods)}${block(t('latestNews'),'#/news?sort=new',news)}`,null];
}
