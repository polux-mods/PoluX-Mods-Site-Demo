import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';
initializeApp();
const translate = new Translate();
export const translateDynamicText = onCall({region:'us-central1',timeoutSeconds:60}, async (req)=>{
  if(!req.auth) throw new HttpsError('unauthenticated','Auth required');
  const {sourceLang='uk',targets=[],fields={}} = req.data || {};
  const i18n = { [sourceLang]: fields };
  for(const lang of targets){
    i18n[lang] = {};
    for(const [key,value] of Object.entries(fields)){
      if(!value){ i18n[lang][key]=''; continue; }
      const [translation] = await translate.translate(value,{from:sourceLang,to:lang});
      i18n[lang][key] = translation;
    }
  }
  return {i18n};
});
