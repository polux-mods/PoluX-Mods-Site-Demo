import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where, setDoc, deleteDoc, increment } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js';
import { db, storage } from '../core/firebase.js';
import { store } from '../core/state.js';
import { translateMapFromUk } from './translationService.js';
export async function listContent(type,{sort='new',take=24,authorUid=null}={}){
  const col=collection(db,type); let constraints=[where('status','==','published')];
  if(authorUid) constraints.push(where('authorUid','==',authorUid));
  constraints.push(orderBy(sort==='popular'?'ratingAvg':'createdAt','desc'),limit(take));
  const snaps=await getDocs(query(col,...constraints));
  return snaps.docs.map(d=>({id:d.id,type,...d.data()}));
}
export async function getContent(type,id){ const s=await getDoc(doc(db,type,id)); return s.exists()?{id:s.id,type,...s.data()}:null; }
export async function uploadContentImage(file,pathPrefix='content'){ const r=ref(storage,`${pathPrefix}/${Date.now()}-${file.name}`); await uploadBytes(r,file); return getDownloadURL(r); }
export async function publishContent(type,data){
  const i18n=await translateMapFromUk({title:data.title,description:data.description||'',body:data.body||''});
  const payload={...data,i18n,type,status:data.status||'published',authorUid:store.user.uid,authorName:store.profile?.name||store.user.email,ratingAvg:0,ratingCount:0,downloads:0,createdAt:serverTimestamp(),updatedAt:serverTimestamp()};
  return addDoc(collection(db,type),payload);
}
export async function updateContent(type,id,data){ const fields={...data,updatedAt:serverTimestamp()}; if(data.title||data.description||data.body){fields.i18n=await translateMapFromUk({title:data.title||'',description:data.description||'',body:data.body||''});} await updateDoc(doc(db,type,id),fields); }
export async function voteContent(type,id,value){
  const uid=store.user.uid; const voteRef=doc(db,type,id,'ratings',uid); const old=await getDoc(voteRef); if(old.exists()) throw new Error('Голосувати можна лише один раз');
  await setDoc(voteRef,{uid,value,createdAt:serverTimestamp()});
  const item=await getContent(type,id); const count=(item.ratingCount||0)+1; const avg=(((item.ratingAvg||0)*(item.ratingCount||0))+value)/count;
  await updateDoc(doc(db,type,id),{ratingAvg:avg,ratingCount:count});
}
export async function addFavorite(type,id){ await setDoc(doc(db,'users',store.user.uid,'favorites',`${type}_${id}`),{type,id,createdAt:serverTimestamp()}); }
export async function incrementDownloads(type,id){ await updateDoc(doc(db,type,id),{downloads:increment(1)}); }
export async function getHomeConfig(){ const s=await getDoc(doc(db,'site','home')); return s.exists()?s.data():{}; }
export async function getSiteSettings(){ const s=await getDoc(doc(db,'site','settings')); return s.exists()?s.data():{}; }
export async function updateSiteSettings(fields){ await setDoc(doc(db,'site','settings'),{...fields,updatedAt:serverTimestamp()},{merge:true}); }
export async function deleteContent(type,id){ await updateDoc(doc(db,type,id),{status:'deleted',deletedAt:serverTimestamp()}); }
