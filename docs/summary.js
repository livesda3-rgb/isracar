// Calendar-day registration status; tokef_dt is registration expiry, not the last test date.
export function registrationState(value,now=new Date()){
 const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value||''));if(!m)return null;
 const y=Number(m[1]),month=Number(m[2]),day=Number(m[3]);const check=new Date(Date.UTC(y,month-1,day));if(check.getUTCFullYear()!==y||check.getUTCMonth()!==month-1||check.getUTCDate()!==day)return null;
 const days=Math.round((Date.UTC(y,month-1,day)-Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);
 return days<0?'expired':days<=30?'expiring':'valid';
}
export function mileageSummary(history){
 const readings=(history?.snapshots||[]).map(r=>r.kilometer_test_aharon).filter(v=>(typeof v==='number'||typeof v==='string'&&/^\d+(?:\.\d+)?$/.test(v.trim()))&&Number.isFinite(Number(v))&&Number(v)>=0).map(Number);
 const unique=[...new Set(readings)];return {value:unique.length===1?unique[0]:null,conflict:unique.length>1,recordedAt:null};
 // This dataset has no observation date. First registration and fetch time are never used as a mileage date.
}
export function ownershipSummary(history){return {count:null,records:history?.ownership||[]};}
// Ownership-type/month rows do not establish a count of unique owners. No names or IDs are used.
