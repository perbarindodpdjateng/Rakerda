const S='https://script.google.com/macros/s/AKfycbzlkt7qCe0bqzez5_ThJ2OpKJ2GJwdcv0V7_sUtrZ0ntx4j0VOH9MAw8UibCO5GQNaE/exec',v=document.getElementById('vw'),p=document.getElementById('pg');
let r=[],i=0,l='';

function h(o){return btoa(JSON.stringify(o))}

async function pull(){
  p.style.display='block';
  try{
    const d=await fetch(S,{cache:'no-store'}),j=await d.json();
    if(!Array.isArray(j)||j.length<2)return;
    const n=h(j);
    if(n===l){p.style.display='none';return}
    l=n;
    r=j.slice(1).map(x=>[x[0],x[1],x[2]].filter(Boolean));
    if(r.length)show();
  }catch(e){
    console.error('Error:',e);
    v.innerHTML='<div class="l" style="color:#d32f2f">⚠️ Gagal memuat data</div>';
  }
  setTimeout(()=>p.style.display='none',300);
}

function show(){
  if(!r||!r.length)return;
  v.innerHTML=`<div class="l">${r[i].join(' • ')||'Data tidak tersedia'}</div>`;
  i=(i+1)%r.length;
}

addEventListener('DOMContentLoaded',()=>{pull();setInterval(pull,15000);setInterval(show,3000)});
