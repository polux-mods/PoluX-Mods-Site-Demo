import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where, increment, setDoc, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js';
import { db, storage } from '../core/firebase.js';
import { store, setState } from '../core/state.js';
import { monthKey, nextMonthDate } from '../core/utils.js';
import { createNotification } from './notificationService.js';
export async function getUser(uid){ const s=await getDoc(doc(db,'users',uid)); return s.exists()?{id:s.id,...s.data()}:null; }
export async function searchUsers(term=''){
  const q=query(collection(db,'users'),orderBy('lastOnline','desc'),limit(80));
  const snaps=await getDocs(q); const t=term.toLowerCase().trim();
  return snaps.docs.map(d=>({id:d.id,...d.data()})).filter(u=>!t || [u.publicId,u.email,u.name].some(v=>String(v||'').toLowerCase().includes(t)));
}
export async function uploadUserImage(file,type){
  const uid=store.user.uid; const path=`users/${uid}/${type}-${Date.now()}-${file.name}`; const r=ref(storage,path); await uploadBytes(r,file); return getDownloadURL(r);
}
export async function updateProfileFields(fields){ await updateDoc(doc(db,'users',store.user.uid),{...fields,updatedAt:serverTimestamp()}); setState({profile:{...store.profile,...fields}}); }
export async function changeName(newName){
  const p=store.profile; const now=new Date(); const recent=(p.nameChanges||[]).filter(x=>x?.toDate?x.toDate()>new Date(now.getFullYear(),now.getMonth(),1):false);
  if(recent.length>=2){ const e=new Error(`Ліміт зміни імені вичерпано. Доступно з ${nextMonthDate().toLocaleDateString()}`); e.code='name-limit'; throw e; }
  await updateProfileFields({name:newName,nameChanges:[...(p.nameChanges||[]),Timestamp.now()]});
}
export async function sendThanks(targetUid){
  if(!store.user) throw new Error('Потрібен вхід');
  if(targetUid===store.user.uid) throw new Error('Самому собі дякувати не можна');
  const key=monthKey(); const ownRef=doc(db,'users',store.user.uid,'thanksQuota',key); const sentRef=doc(db,'users',store.user.uid,'sentThanks',targetUid);
  const [quota,sent]=await Promise.all([getDoc(ownRef),getDoc(sentRef)]);
  if(sent.exists()) throw new Error('Цьому користувачу вже надсилали подяку');
  if((quota.data()?.count||0)>=3) throw new Error('Місячний ліміт 3 подяки вже вичерпано');
  await setDoc(ownRef,{count:increment(1),updatedAt:serverTimestamp()},{merge:true});
  await setDoc(sentRef,{targetUid,createdAt:serverTimestamp()});
  await updateDoc(doc(db,'users',targetUid),{rating:increment(10),thanksReceived:increment(1)});
  await createNotification(targetUid,{type:'thanks',title:'Нова подяка',text:`${store.profile?.name||'Користувач'} надіслав подяку. +10 рейтингу`,link:`#/profile/${store.user.uid}`});
}
export async function moderateUser(uid,fields){ await updateDoc(doc(db,'users',uid),{...fields,moderatedAt:serverTimestamp(),moderatedBy:store.user.uid}); }
export async function softDeleteUser(uid){ const restoreUntil=new Date(); restoreUntil.setDate(restoreUntil.getDate()+30); await moderateUser(uid,{deletedAt:serverTimestamp(),restoreUntil:Timestamp.fromDate(restoreUntil)}); }
export async function getSessions(uid){ const snaps=await getDocs(query(collection(db,'users',uid,'sessions'),orderBy('lastSeen','desc'),limit(20))); return snaps.docs.map(d=>({id:d.id,...d.data()})); }
export async function closeSession(uid,sessionId){ await updateDoc(doc(db,'users',uid,'sessions',sessionId),{active:false,closedAt:serverTimestamp()}); }
