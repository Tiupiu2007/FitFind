const products=[
{name:'Essential Oversize T-Shirt',store:'Demo Store',cat:'maglia',price:19.99,color:'nero',icon:'👕'},
{name:'Heavyweight Basic T-Shirt',store:'Demo Store',cat:'maglia',price:24.90,color:'bianco',icon:'👕'},
{name:'Oversize Hoodie',store:'Demo Store',cat:'felpa',price:39.99,color:'grigio',icon:'🧥'},
{name:'Zip Hoodie Essential',store:'Demo Store',cat:'felpa',price:44.90,color:'nero',icon:'🧥'},
{name:'Relaxed Cargo Pants',store:'Demo Store',cat:'pantaloni',price:49.99,color:'nero',icon:'👖'},
{name:'Wide Leg Trousers',store:'Demo Store',cat:'pantaloni',price:35,color:'grigio',icon:'👖'},
{name:'Daily Runner',store:'Demo Store',cat:'scarpe',price:59.99,color:'bianco',icon:'👟'},
{name:'Minimal Sneakers',store:'Demo Store',cat:'scarpe',price:69.90,color:'nero',icon:'👟'}];
const $=s=>document.querySelector(s);const search=$('#search'),max=$('#max'),sort=$('#sort'),grid=$('#grid'),empty=$('#empty'),title=$('#title');
function render(){const q=search.value.trim().toLowerCase();const m=Number(max.value);let a=products.filter(p=>(!q||[p.name,p.store,p.cat,p.color].join(' ').toLowerCase().includes(q))&&(!m||p.price<=m));if(sort.value==='asc')a.sort((x,y)=>x.price-y.price);if(sort.value==='desc')a.sort((x,y)=>y.price-x.price);title.textContent=q?'"'+q+'"':'Tutto';grid.innerHTML=a.map(p=>'<article class="card"><div class="visual">'+p.icon+'</div><div class="info"><div class="store">'+p.store+'</div><div class="name">'+p.name+'</div><div class="bottom"><span class="price">€'+p.price.toFixed(2)+'</span><a class="view" href="#">Vedi</a></div></div></article>').join('');empty.classList.toggle('hidden',a.length>0);grid.classList.toggle('hidden',a.length===0)}
$('#go').onclick=render;search.oninput=render;max.oninput=render;sort.onchange=render;document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{search.value=b.dataset.q;render();document.querySelector('.results').scrollIntoView({behavior:'smooth'})});render();