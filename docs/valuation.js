// Only documented, authorized providers belong here. Links are NOT automated data integrations.
export const PRICE_GUIDES=[{id:'government',label:'govPrice',url:'https://carlistprice.mot.gov.il/',note:'govPriceNote'},{id:'yad2',label:'yadPrice',url:'https://www.yad2.co.il/price-list',note:'guideAccess'},{id:'levi',label:'leviPrice',url:'https://levi-itzhak.co.il/Home',note:'guideAccess'}];
export const VALUATION_PROVIDERS=[];
export function aggregateValuations(estimates,{identityKey,now=Date.now(),maxAge=30*86400000}={}){
 const groups=new Map(),rejected=[];
 for(const e of estimates){const date=Date.parse(e.asOf),amount=e.amount,low=e.low??amount,high=e.high??amount;
  const valid=e.verified===true&&e.currency==='ILS'&&e.identityKey===identityKey&&identityKey&&e.sourceId&&/^https:\/\//.test(e.url||'')&&['reference','calculated','transactions','listings'].includes(e.basis)&&typeof e.adjustmentKey==='string'&&e.adjustmentKey&&e.methodologyKey&&Number.isFinite(date)&&date<=now&&now-date<=maxAge&&typeof low==='number'&&Number.isFinite(low)&&low>0&&typeof high==='number'&&Number.isFinite(high)&&high>=low;
  if(!valid){rejected.push(e);continue;}
  // Exact edition, condition/mileage basis and methodology must explicitly agree.
  const key=JSON.stringify([identityKey,e.basis,e.adjustmentKey,e.methodologyKey,e.asOf]);if(!groups.has(key))groups.set(key,[]);const rows=groups.get(key),prev=rows.findIndex(r=>r.sourceId===e.sourceId);if(prev!==-1){rejected.push(e);continue;}rows.push({...e,low,high});
 }
 return {groups:[...groups.values()].map(rows=>({basis:rows[0].basis,adjustmentKey:rows[0].adjustmentKey,asOf:rows[0].asOf,low:Math.min(...rows.map(r=>r.low)),high:Math.max(...rows.map(r=>r.high)),count:rows.length,rows})),rejected};
}
export async function loadValuations(vehicle){
 // No price endpoints are enabled: a provider contract and reliable trim mapping are still required.
 return aggregateValuations([],{identityKey:String(vehicle.mispar_rechev)});
}

// Levi Yitzhak is the only eligible price source for the primary card. A website listing is not a licensed quote.
export function leviEstimates(prices,vehicle,options={}){
 const rows=prices?.estimates??(prices?.groups||[]).flatMap(g=>g.rows||[]);
 const eligible=rows.filter(e=>e.sourceId==='levi-yitzhak'&&e.authorized===true);
 return aggregateValuations(eligible,{...options,identityKey:String(vehicle.mispar_rechev)}).groups.flatMap(g=>g.rows);
}
