const S='https://script.google.com/macros/s/AKfycbzlkt7qCe0bqzez5_ThJ2OpKJ2GJwdcv0V7_sUtrZ0ntx4j0VOH9MAw8UibCO5GQNaE/exec',v=document.getElementById('vw');
let r=[],i=0,l='';

function h(o){try{return btoa(JSON.stringify(o))}catch{return''}}

async function pull(){
  try{
    const d=await fetch(S,{cache:'no-store'}),j=await d.json();
    if(!Array.isArray(j)||j.length<2)return;
    const n=h(j);if(n===l)return;l=n;
    r=j.slice(1).map(x=>[x[0],x[1],x[2]].filter(c=>c&&String(c).trim())).filter(x=>x.length);
    if(r.length)show();else v.innerHTML='<div class="l" style="color:#d32f2f">⚠️ Tidak ada data</div>';
  }catch(e){
    console.error('Error:',e);
    v.innerHTML='<div class="l" style="color:#d32f2f">⚠️ Gagal memuat data</div>';
  }
}

function show(){
  if(!r||!r.length)return;
  v.innerHTML=`<div class="l">${r[i].join(' • ')||'Data tidak tersedia'}</div>`;
  i=(i+1)%r.length;
}

document.addEventListener('DOMContentLoaded',()=>{pull();setInterval(pull,15000);setInterval(show,3000)});
