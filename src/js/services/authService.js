import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail, onAuthStateChanged, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, addDoc } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
import { auth, db } from '../core/firebase.js';
import { setState } from '../core/state.js';
import { publicId } from '../core/utils.js';
import { subscribeNotifications } from './notificationService.js';
let unsubNotifs=null;
export function watchAuth(){
  onAuthStateChanged(auth, async user=>{
    if(unsubNotifs){unsubNotifs();unsubNotifs=null}
    if(!user){ setState({user:null,profile:null,unread:0}); return; }
    const ref=doc(db,'users',user.uid); let snap=await getDoc(ref);
    if(!snap.exists()){
      await setDoc(ref,{uid:user.uid,publicId:publicId(user.uid),email:user.email,name:user.displayName||user.email.split('@')[0],roles:['User'],rating:0,modsCount:0,commentsCount:0,thanksReceived:0,bio:'',avatarUrl:'',coverUrl:'',createdAt:serverTimestamp(),lastOnline:serverTimestamp(),deletedAt:null,nameChanges:[]},{merge:true});
      snap=await getDoc(ref);
    }else{ await updateDoc(ref,{lastOnline:serverTimestamp()}); }
    await addDoc(collection(db,'users',user.uid,'sessions'),{ua:navigator.userAgent,platform:navigator.platform||'',createdAt:serverTimestamp(),lastSeen:serverTimestamp(),active:true});
    setState({user,profile:{id:snap.id,...snap.data()}});
    unsubNotifs=subscribeNotifications(user.uid);
  });
}
export async function register({email,password,name}){
  const cred=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(cred.user,{displayName:name});
  await sendEmailVerification(cred.user);
  await setDoc(doc(db,'users',cred.user.uid),{uid:cred.user.uid,publicId:publicId(cred.user.uid),email,name,roles:['User'],rating:0,modsCount:0,commentsCount:0,thanksReceived:0,bio:'',avatarUrl:'',coverUrl:'',createdAt:serverTimestamp(),lastOnline:serverTimestamp(),deletedAt:null,nameChanges:[]},{merge:true});
  return cred.user;
}
export const login = ({email,password}) => signInWithEmailAndPassword(auth,email,password);
export const logout = () => signOut(auth);
export const resetPassword = email => sendPasswordResetEmail(auth,email);
export async function reauth(password){ const user=auth.currentUser; const credential=EmailAuthProvider.credential(user.email,password); return reauthenticateWithCredential(user,credential); }
