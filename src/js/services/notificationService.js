import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { db } from '../core/firebase.js';
import { setState } from '../core/state.js';
export async function createNotification(uid,{type='system',title='',text='',link=''}){ return addDoc(collection(db,'users',uid,'notifications'),{type,title,text,link,read:false,createdAt:serverTimestamp()}); }
export function subscribeNotifications(uid){
  const q=query(collection(db,'users',uid,'notifications'),orderBy('createdAt','desc'),limit(60));
  return onSnapshot(q,snap=>{ const items=snap.docs.map(d=>({id:d.id,...d.data()})); setState({notifications:items,unread:items.filter(n=>!n.read).length}); });
}
export async function markNotification(uid,id,read=true){ await updateDoc(doc(db,'users',uid,'notifications',id),{read}); }
