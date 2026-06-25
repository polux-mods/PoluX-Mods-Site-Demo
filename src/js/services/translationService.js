import { httpsCallable } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-functions.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { functions, db } from '../core/firebase.js';
import { SUPPORTED_LANGS } from '../core/config.js';
async function sha(text){ const data=new TextEncoder().encode(text); const hash=await crypto.subtle.digest('SHA-256',data); return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join(''); }
export async function translateMapFromUk(fields){
  const result={uk:{...fields}};
  const langs=SUPPORTED_LANGS.map(l=>l.code).filter(c=>c!=='uk');
  try{
    const key=await sha(JSON.stringify(fields)); const ref=doc(db,'translations',key); const snap=await getDoc(ref);
    if(snap.exists()) return snap.data().i18n || result;
    const callable=httpsCallable(functions,'translateDynamicText');
    const res=await callable({sourceLang:'uk',targets:langs,fields});
    Object.assign(result,res.data?.i18n || {});
    await setDoc(ref,{i18n:result,createdAt:serverTimestamp()},{merge:true});
  }catch(err){ console.warn('Translation fallback:',err); }
  return result;
}
