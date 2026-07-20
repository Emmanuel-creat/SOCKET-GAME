/** Test pseudos réservés : variantes refusées, pseudos normaux acceptés, rename gardé. */
import { io } from 'socket.io-client';
import { canonique } from './server/users/pseudosReserves.js';
let ok=0, ko=0;
const check=(n,c,d='')=>{ if(c){ok++;console.log('   ✅ '+n);} else {ko++;console.log('   ❌ '+n+(d?' — '+d:''));} };

console.log('── 1. Canonisation ──');
check('accents/casse', canonique('Éxèmple') === 'exemple');
check('l33t', canonique('3x3mpl3') === 'exemple');
check('répétitions', canonique('exxeemple') === 'exemple');
check('séparateurs', canonique('e.x-e m_p!le') === 'exemple');

console.log('── 2. Serveur (PSEUDOS_RESERVES=exemple,autrenom) ──');
const client=()=>new Promise((res,rej)=>{const s=io('http://localhost:3000',{transports:['websocket'],forceNew:true});s.on('connect',()=>res(s));s.on('connect_error',(e)=>rej(e));});
const tente=(s,pseudo)=>new Promise((res)=>{
  const to=setTimeout(()=>res({timeout:true}),3000);
  s.once('user:registered',()=>{clearTimeout(to);res({ok:true});});
  s.once('sys:error',(e)=>{clearTimeout(to);res({refus:e});});
  s.emit('user:register',{pseudo,avatar:'🙂',color:'#123456',cid:'cid-res-'+Math.random()});
});
for (const [pseudo, attendu] of [
  ['Exemple', 'refus'], ['3X3MPL3', 'refus'], ['e.x.e.m.p.l.e', 'refus'], ['Exxemplle', 'refus'],
  ['AutreNom', 'refus'], ['JoueurNormal', 'ok'], ['Manu', 'ok'],
]) {
  const s = await client();
  const r = await tente(s, pseudo);
  if (attendu==='refus') check(`« ${pseudo} » refusé`, !!r.refus && /disponible/.test(r.refus.message??''), JSON.stringify(r));
  else check(`« ${pseudo} » accepté`, !!r.ok, JSON.stringify(r));
  s.close();
}
// rename vers un réservé
const s2 = await client();
const r0 = await tente(s2, 'Temporaire');
check('inscription tremplin', !!r0.ok);
const rename = await new Promise((res)=>{
  const to=setTimeout(()=>res({timeout:true}),3000);
  s2.once('sys:error',(e)=>{clearTimeout(to);res({refus:e});});
  s2.once('user:registered',()=>{clearTimeout(to);res({ok:true});});
  s2.emit('user:updateProfile',{pseudo:'ex3mple'});
});
check('renommage vers un réservé refusé', !!rename.refus, JSON.stringify(rename));
s2.close();
console.log(`\n══════ Bilan : ${ok} ✅ / ${ko} ❌ ══════`);
process.exit(ko?1:0);
