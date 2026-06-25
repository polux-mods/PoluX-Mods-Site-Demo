import { pickText, localeDate, t } from '../core/i18n.js';
import { esc } from '../core/utils.js';
export function contentCard(item){
 const title=esc(pickText(item,'title')); const desc=esc(pickText(item,'description')); const img=item.coverUrl||item.images?.[0]||'src/assets/default-cover.svg'; const url=item.type==='news'?`#/article/${item.id}`:`#/mod/${item.id}`;
 return `<article class="card"><img class="card-img" src="${esc(img)}" alt="${title}"><div class="card-menu dropdown-wrap"><button class="icon-btn" data-card-menu="${item.type}_${item.id}">⋯</button></div><div class="card-body"><h3>${title||'Untitled'}</h3><p class="limit-2 mono-muted">${desc}</p><div class="card-meta"><span>${localeDate(item.createdAt)}</span><span>·</span><span>${t('author')}: ${esc(item.authorName||'Polux')}</span></div><div class="row" style="justify-content:space-between;margin-top:10px"><span class="badge">★ ${(item.ratingAvg||0).toFixed(1)}</span><a class="retro-btn" href="${url}">${t('go')}</a></div></div></article>`;
}
