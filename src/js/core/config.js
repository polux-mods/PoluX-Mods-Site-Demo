export const firebaseConfig = {
  apiKey: "AIzaSyD9X8v0tGA1n7TzCMzsbzb8ffe4_uwCcDQ",
  authDomain: "polux-mods.firebaseapp.com",
  projectId: "polux-mods",
  storageBucket: "polux-mods.firebasestorage.app",
  messagingSenderId: "573526654147",
  appId: "1:573526654147:web:83d92e93381a0233def676"
};
export const SUPPORTED_LANGS = [
  {code:'uk',label:'UA',flag:'🇺🇦',name:'Українська'},
  {code:'ru',label:'RU',flag:'🇷🇺',name:'Русский'},
  {code:'en',label:'EN',flag:'🇬🇧',name:'English'},
  {code:'pl',label:'PL',flag:'🇵🇱',name:'Polski'},
  {code:'de',label:'DE',flag:'🇩🇪',name:'Deutsch'},
  {code:'es',label:'ES',flag:'🇪🇸',name:'Español'},
  {code:'fr',label:'FR',flag:'🇫🇷',name:'Français'}
];
export const THEMES = [
  {id:'amber',name:'Амбер / Бурштин'},
  {id:'matrix',name:'Матриця / Зелений піксель'},
  {id:'cyber80',name:'Кіберпанк 80-х'},
  {id:'ice',name:'Крижаний термінал'},
  {id:'mono',name:'Монохром CRT'}
];
export const DEFAULT_AVATAR = 'src/assets/default-avatar.svg';
export const DEFAULT_COVER = 'src/assets/default-cover.svg';
export const ROLES = ['User','Author','Moderator','Administrator'];
export const REPORT_REASONS = ['spam','abuse','copyright','danger','other'];
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const routes = [
  ['home','/'],['mods','/mods'],['news','/news'],['feedback','/feedback'],['about','/about']
];
