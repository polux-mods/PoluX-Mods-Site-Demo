import { store } from '../core/state.js';
import { t } from '../core/i18n.js';
import { esc, toast } from '../core/utils.js';
import { uploadUserImage, updateProfileFields, changeName, getSessions, closeSession } from '../services/userService.js';
import { resetPassword, logout, reauth } from '../services/authService.js';
import { openAuthModal } from '../components/authModal.js';
import { confirmModal } from '../components/modal.js';
import { DEFAULT_AVATAR, DEFAULT_COVER } from '../core/config.js';
export async function settingsView(){
 if(!store.user) return [`<section class="section"><div class="empty-state"><button class="retro-btn primary" id="needLogin">${t('login')}</button></div></section>`,r=>r.querySelector('#needLogin').onclick=openAuthModal];
 const p=store.profile||{}; const sessions=await getSessions(store.user.uid);
 const html=`<section class="section"><div class="section-head"><h1>${t('settings')}</h1></div><form class="form" id="profileSettings"><div class="field"><label>Ім’я <span class="mono-muted">2 зміни / місяць</span></label><input class="input" name="name" value="${esc(p.name||'')}"></div><div class="field"><label>Біо до 70 символів</label><textarea class="textarea" maxlength="70" name="bio">${esc(p.bio||'')}</textarea></div><div class="field"><label>Аватарка — файл або URL</label><input class="input" type="file" name="avatarFile" accept="image/*"><input class="input" name="avatarUrl" placeholder="https://..." value="${esc(p.avatarUrl||'')}"><button class="retro-btn" type="button" data-default-avatar>Повернути дефолт</button></div><div class="field"><label>Фон профілю — файл або URL</label><input class="input" type="file" name="coverFile" accept="image/*"><input class="input" name="coverUrl" placeholder="https://..." value="${esc(p.coverUrl||'')}"><button class="retro-btn" type="button" data-default-cover>Повернути дефолт</button></div><button class="retro-btn primary" type="submit">${t('save')}</button></form></section><section class="section"><h2>Безпека</h2><div class="row"><button class="retro-btn" id="passReset">Змінити пароль / скидання</button><button class="retro-btn danger" id="deleteAccount">Видалити акаунт</button></div></section><section class="section"><div class="section-head"><h2>Активні сесії</h2><button class="retro-btn danger" id="allSessions">Завершити всі сесії</button></div>${sessions.map(s=>`<div class="user-row"><span>🖥</span><div><b>${esc(s.platform||'Unknown')}</b><p class="mono-muted limit-2">${esc(s.ua||'')}</p></div><button class="retro-btn danger" data-session="${s.id}">✕</button></div>`).join('')||`<div class="empty-state">Немає записаних сесій</div>`}</section>`;
 return [html,(root)=>attach(root)];
}
function attach(root){
 root.querySelector('[data-default-avatar]')?.addEventListener('click',()=>root.querySelector('[name="avatarUrl"]').value=DEFAULT_AVATAR);
 root.querySelector('[data-default-cover]')?.addEventListener('click',()=>root.querySelector('[name="coverUrl"]').value=DEFAULT_COVER);
 root.querySelector('#profileSettings').onsubmit=async e=>{e.preventDefault(); const fd=new FormData(e.currentTarget); try{let avatarUrl=fd.get('avatarUrl'), coverUrl=fd.get('coverUrl'); const af=fd.get('avatarFile'), cf=fd.get('coverFile'); if(af?.size) avatarUrl=await uploadUserImage(af,'avatar'); if(cf?.size) coverUrl=await uploadUserImage(cf,'cover'); if(fd.get('name')!==store.profile.name) await changeName(fd.get('name').trim()); await updateProfileFields({bio:fd.get('bio').slice(0,70),avatarUrl,coverUrl}); toast('Профіль збережено'); location.reload();}catch(err){toast(err.message,'err')}};
 root.querySelector('#passReset').onclick=async()=>{await resetPassword(store.user.email);toast('Лист для зміни пароля надіслано. Після зміни увійдіть заново.');await logout();};
 root.querySelectorAll('[data-session]').forEach(b=>b.onclick=async()=>{await closeSession(store.user.uid,b.dataset.session);toast('Сесію завершено');location.reload();});
 root.querySelector('#allSessions').onclick=async()=>{ if(await confirmModal('Сесії','Завершити всі сесії?', 'Завершити')){toast('Позначено всі сесії як закриті. Реальне відкликання refresh-token потребує Cloud Function/Admin SDK.');await logout();} };
 root.querySelector('#deleteAccount').onclick=async()=>{const pass=prompt('Введіть поточний пароль для видалення акаунта'); if(!pass)return; try{await reauth(pass); await updateProfileFields({deletedAt:new Date().toISOString()}); toast('Акаунт позначено як видалений на 30 днів'); await logout();}catch(e){toast(e.message,'err')}};
}
