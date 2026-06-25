import { REPORT_REASONS } from '../core/config.js';
import { t } from '../core/i18n.js';
import { openModal, closeModal } from '../components/modal.js';
import { createReport } from '../services/reportService.js';
import { toast } from '../core/utils.js';
export function openReportModal({targetType,targetId,targetUid=''}){
 openModal({title:t('report'),body:`<form id="reportForm" class="form"><div class="field"><label>Причина</label><select name="reason" class="select">${REPORT_REASONS.map(r=>`<option value="${r}">${r}</option>`).join('')}</select></div><div class="field"><label>Деталі</label><textarea name="text" class="textarea" maxlength="300"></textarea><span class="counter">0/300</span></div><button class="retro-btn danger" type="submit">${t('send')}</button></form>`,onMount:(body)=>{const ta=body.querySelector('textarea');ta.oninput=()=>body.querySelector('.counter').textContent=`${ta.value.length}/300`;body.querySelector('form').onsubmit=async e=>{e.preventDefault();try{await createReport({targetType,targetId,targetUid,reason:e.target.reason.value,text:e.target.text.value,kind:'report'});closeModal();toast('Скаргу надіслано')}catch(err){toast(err.message,'err')}}}});
}
