import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, doc, where } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { db } from '../core/firebase.js';
import { store } from '../core/state.js';
export async function createReport(payload){
  if(!store.user) throw new Error('Потрібен вхід');
  return addDoc(collection(db,'appeals'),{...payload,kind:payload.kind||'report',status:'new',authorUid:store.user.uid,authorName:store.profile?.name||store.user.email,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
}
export async function listAppeals({mine=false,status=null}={}){
  const constraints=[]; if(mine) constraints.push(where('authorUid','==',store.user.uid)); if(status) constraints.push(where('status','==',status)); constraints.push(orderBy('createdAt','desc'),limit(80));
  const snaps=await getDocs(query(collection(db,'appeals'),...constraints)); return snaps.docs.map(d=>({id:d.id,...d.data()}));
}
export async function updateAppeal(id,fields){ await updateDoc(doc(db,'appeals',id),{...fields,updatedAt:serverTimestamp()}); }
