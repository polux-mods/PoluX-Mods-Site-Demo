import { addDoc, collection, doc, getDocs, increment, orderBy, query, runTransaction, serverTimestamp, updateDoc, where } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { db } from '../core/firebase.js';
import { store } from '../core/state.js';
import { createNotification } from './notificationService.js';
export async function listComments(targetType,targetId){
  const q=query(collection(db,'comments'),where('targetType','==',targetType),where('targetId','==',targetId),orderBy('createdAt','asc'));
  const snaps=await getDocs(q); return snaps.docs.map(d=>({id:d.id,...d.data()}));
}
export async function addComment({targetType,targetId,targetAuthorUid,parentId=null,parentAuthorUid=null,text='',imageUrl=''}){
  const c={targetType,targetId,parentId,text,imageUrl,deleted:false,score:0,authorUid:store.user.uid,authorName:store.profile?.name||store.user.email,authorId:store.profile?.publicId||'',authorAvatar:store.profile?.avatarUrl||'',authorRole:(store.profile?.roles||['User']).at(-1),createdAt:serverTimestamp(),updatedAt:serverTimestamp()};
  const ref=await addDoc(collection(db,'comments'),c);
  const targetUid=parentAuthorUid || targetAuthorUid;
  if(targetUid && targetUid!==store.user.uid) await createNotification(targetUid,{type:'comment',title:'Новий коментар',text:`${c.authorName} залишив коментар`,link:`#/${targetType==='mods'?'mod':'article'}/${targetId}?comment=${ref.id}`});
  return ref;
}
export async function deleteComment(id){ await updateDoc(doc(db,'comments',id),{deleted:true,text:'[Коментар було видалено]',imageUrl:'',updatedAt:serverTimestamp()}); }
export async function voteComment(commentId,value){
  const uid=store.user.uid; const commentRef=doc(db,'comments',commentId); const voteRef=doc(db,'comments',commentId,'votes',uid);
  await runTransaction(db,async tx=>{ const old=await tx.get(voteRef); const prev=old.exists()?old.data().value:0; tx.set(voteRef,{uid,value,updatedAt:serverTimestamp()}); tx.update(commentRef,{score:increment(value-prev)}); });
}
