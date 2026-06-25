import { SUPPORTED_LANGS } from './config.js';
const detectLang = () => {
  const saved = localStorage.getItem('pm_lang');
  if (saved && SUPPORTED_LANGS.some(l=>l.code===saved)) return saved;
  const browser = (navigator.language || 'uk').slice(0,2).toLowerCase();
  return SUPPORTED_LANGS.some(l=>l.code===browser) ? browser : 'uk';
};
export const store = {
  lang: detectLang(),
  theme: localStorage.getItem('pm_theme') || 'amber',
  crt: localStorage.getItem('pm_crt') !== 'off',
  user: null,
  profile: null,
  unread: 0,
  route: { name:'home', params:{}, query:{} },
  loading: false,
  listeners: new Set()
};
export function setState(patch){ Object.assign(store, patch); store.listeners.forEach(fn=>fn(store)); }
export function subscribe(fn){ store.listeners.add(fn); return ()=>store.listeners.delete(fn); }
export function setLang(lang){ store.lang=lang; localStorage.setItem('pm_lang',lang); setState({lang}); }
export function setTheme(theme){ store.theme=theme; localStorage.setItem('pm_theme',theme); document.body.dataset.theme=theme; setState({theme}); }
export function setCrt(enabled){ store.crt=enabled; localStorage.setItem('pm_crt',enabled?'on':'off'); document.body.classList.toggle('crt-enabled',enabled); setState({crt:enabled}); }
export function isAdmin(){ return !!store.profile?.roles?.includes('Administrator'); }
export function isModerator(){ return !!(store.profile?.roles||[]).some(r=>['Administrator','Moderator'].includes(r)); }
