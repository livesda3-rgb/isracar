export async function copyText(value,{navigator:nav=globalThis.navigator,document:doc=globalThis.document}={}) {
 const text=String(value);
 try {if(nav?.clipboard?.writeText){await nav.clipboard.writeText(text);return;}}catch{}
 // Legacy fallback for iOS/older embedded browsers; runs only in the user-triggered copy action.
 if(!doc?.body||typeof doc.execCommand!=='function')throw new Error('Clipboard unavailable');
 const active=doc.activeElement,area=doc.createElement('textarea');area.value=text;area.readOnly=true;area.style.cssText='position:fixed;inset:0 auto auto 0;opacity:0;font-size:16px';doc.body.append(area);
 try{area.focus();area.select();area.setSelectionRange(0,text.length);if(!doc.execCommand('copy'))throw new Error('Copy failed');}finally{area.remove();active?.focus?.({preventScroll:true});}
}
