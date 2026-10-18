export const RESOURCE='053cea08-09bc-40ec-8f7a-156f0677aff3';
export function plateNumber(input){const s=String(input).trim();if(!/^[0-9\s-]+$/.test(s))return null;const n=s.replace(/[\s-]/g,'');return /^[0-9]{7,8}$/.test(n)&&Number(n)>0?String(Number(n)):null;}
export function vinInfo(raw){const original=String(raw??'').trim();const candidate=original.toUpperCase().replace(/[\s*]/g,'');const valid=/^[A-HJ-NPR-Z0-9]{17}$/.test(candidate);return {raw:original,vin:valid?candidate:null,normalized:valid&&candidate!==original};}
export function registryURL(plate,mode='filters',offset=0){const u=new URL('https://data.gov.il/api/3/action/datastore_search');u.searchParams.set('resource_id',RESOURCE);u.searchParams.set('limit','100');u.searchParams.set('offset',String(offset));u.searchParams.set(mode,mode==='filters'?JSON.stringify({mispar_rechev:Number(plate)}):plate);return u.href;}
export async function lookup(plate,{fetcher=fetch,signal}={}){
 async function read(mode,offset=0){const response=await fetcher(registryURL(plate,mode,offset),{credentials:'omit',headers:{Accept:'application/json'},signal,cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();if(data.success!==true||!Array.isArray(data.result?.records))throw new Error('Invalid registry response');return data.result;}
 let result,mode='filters';try{result=await read(mode);}catch(e){if(signal?.aborted)throw e;mode='q';result=await read(mode);}
 if(mode==='filters'&&result.records.length===0){mode='q';result=await read(mode);}
 let records=result.records.filter(r=>String(Number(r.mispar_rechev))===plate);
 // Text search is never accepted without an exact plate match. Follow pages to avoid false negatives.
 if(mode==='q'){let offset=100;while(!records.length&&result.records.length===100&&offset<Number(result.total??Infinity)){if(offset>=1000)throw new Error('Search is too broad');result=await read(mode,offset);records.push(...result.records.filter(r=>String(Number(r.mispar_rechev))===plate));offset+=100;}}
 if(records.length>1)throw new Error('Multiple exact records');return {record:records[0]??null,mode,url:registryURL(plate,mode)};
}
