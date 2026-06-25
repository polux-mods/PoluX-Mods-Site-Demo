import { setState, store } from './state.js';
import { $, scrollFieldIntoView } from './utils.js';
import { loader } from '../components/loader.js';
import { renderHeader } from '../components/header.js';
import { homeView } from '../views/home.js';
import { listView } from '../views/list.js';
import { detailView } from '../views/detail.js';
import { profileView } from '../views/profile.js';
import { settingsView } from '../views/settings.js';
import { adminView } from '../views/admin.js';
import { feedbackView } from '../views/feedback.js';
import { aboutView } from '../views/about.js';
import { notificationsView } from '../views/notifications.js';
export function currentPath(){ return location.hash.replace(/^#/,'').split('?')[0] || '/'; }
export function parseHash(){ const raw=location.hash.replace(/^#/,'')||'/'; const [path,qs='']=raw.split('?'); const q=Object.fromEntries(new URLSearchParams(qs)); const parts=path.split('/').filter(Boolean); return {path,parts,query:q}; }
export function navigate(path){ location.hash=path; }
export async function renderRoute(){
  const root=$('#app'); root.innerHTML=loader(); setState({loading:true}); renderHeader();
  try{
    const {path,parts,query}=parseHash(); let html=''; let mount=null;
    if(path==='/') [html,mount]=await homeView(query);
    else if(parts[0]==='mods') [html,mount]=await listView('mods',query);
    else if(parts[0]==='news') [html,mount]=await listView('news',query);
    else if(parts[0]==='mod') [html,mount]=await detailView('mods',parts[1],query);
    else if(parts[0]==='article') [html,mount]=await detailView('news',parts[1],query);
    else if(parts[0]==='profile') [html,mount]=await profileView(parts[1]||store.user?.uid,query);
    else if(parts[0]==='settings') [html,mount]=await settingsView(query);
    else if(parts[0]==='admin') [html,mount]=await adminView(query);
    else if(parts[0]==='feedback') [html,mount]=await feedbackView(query);
    else if(parts[0]==='about') [html,mount]=await aboutView(query);
    else if(parts[0]==='notifications') [html,mount]=await notificationsView(query);
    else html='<section class="section"><h1>404</h1></section>';
    root.innerHTML=html; mount?.(root); root.focus({preventScroll:true});
    if(query.comment){ const el=document.getElementById(`comment-${query.comment}`); if(el) scrollFieldIntoView(el); }
  }catch(err){ console.error(err); root.innerHTML=`<section class="section"><h1>Помилка</h1><p class="mono-muted">${err.message}</p></section>`; }
  finally{ setState({loading:false}); }
}
export function bootRouter(){ window.addEventListener('hashchange',renderRoute); renderRoute(); }
