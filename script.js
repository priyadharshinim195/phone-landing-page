const FR=["frames/frame-01.webp", "frames/frame-02.webp", "frames/frame-03.webp", "frames/frame-04.webp", "frames/frame-05.webp", "frames/frame-06.webp", "frames/frame-07.webp", "frames/frame-08.webp", "frames/frame-09.webp", "frames/frame-10.webp", "frames/frame-11.webp", "frames/frame-12.webp", "frames/frame-13.webp", "frames/frame-14.webp", "frames/frame-15.webp", "frames/frame-16.webp", "frames/frame-17.webp", "frames/frame-18.webp", "frames/frame-19.webp", "frames/frame-20.webp", "frames/frame-21.webp", "frames/frame-22.webp", "frames/frame-23.webp", "frames/frame-24.webp", "frames/frame-25.webp", "frames/frame-26.webp", "frames/frame-27.webp", "frames/frame-28.webp", "frames/frame-29.webp", "frames/frame-30.webp", "frames/frame-31.webp", "frames/frame-32.webp", "frames/frame-33.webp", "frames/frame-34.webp", "frames/frame-35.webp", "frames/frame-36.webp", "frames/frame-37.webp", "frames/frame-38.webp", "frames/frame-39.webp", "frames/frame-40.webp", "frames/frame-41.webp", "frames/frame-42.webp", "frames/frame-43.webp", "frames/frame-44.webp", "frames/frame-45.webp", "frames/frame-46.webp", "frames/frame-47.webp", "frames/frame-48.webp", "frames/frame-49.webp", "frames/frame-50.webp"],BG=["#c2bfbb", "#c3bfbb", "#c3bfbb", "#c3bfbb", "#c3c0bb", "#b0aca9", "#908e8a", "#6c6a6a", "#454445", "#242424", "#020202", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#000001", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101", "#010101"],N=FR.length,cv=document.getElementById('cv'),cx=cv.getContext('2d'),hero=document.getElementById('hero');
const imgs=new Array(N),lum=BG.map(h=>{const n=parseInt(h.slice(1),16);return .3*(n>>16)+.59*(n>>8&255)+.11*(n&255)});
let W,H,cur=0,tgt=0,shown=-1;
function size(){const d=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*d;H=cv.height=innerHeight*d;shown=-1}
function draw(i){if(!imgs[i])return;const im=imgs[i],vw=W,vh=H,FW=im.naturalWidth||1600,FH=im.naturalHeight||900,s=Math.max(vw/FW,Math.min(vh/FH,vw/(FW*.6)))*(vw/vh>1.2?.85:1),w=Math.round(FW*s),h=Math.round(FH*s),x=Math.round((vw-w)/2),y=Math.round((vh-h)/2);
cx.fillStyle=BG[i];cx.fillRect(0,0,vw,vh);
if(w<vw*.98||h<vh*.98){const A=draw.a||(draw.a=document.createElement('canvas'));A.width=64;A.height=36;const ac=A.getContext('2d');ac.drawImage(im,0,0,64,36);
cx.imageSmoothingEnabled=true;cx.imageSmoothingQuality='high';cx.globalAlpha=.55;{const k=Math.max(vw/64,vh/36);cx.drawImage(A,(vw-64*k)/2,(vh-36*k)/2,64*k,36*k)}cx.globalAlpha=1;
const g=cx.createRadialGradient(vw/2,vh*.55,0,vw/2,vh*.55,Math.max(vw,vh)*.7);g.addColorStop(0,'rgba(212,175,55,.16)');g.addColorStop(1,'rgba(0,0,0,.8)');cx.fillStyle=g;cx.fillRect(0,0,vw,vh);}
const fx=w<vw*.98?w*.18:0,fy=h<vh*.98?h*.24:0;let src=im;
if(fx||fy){const O=draw.o||(draw.o=document.createElement('canvas'));O.width=w;O.height=h;const oc=O.getContext('2d');oc.globalCompositeOperation='source-over';oc.clearRect(0,0,w,h);oc.drawImage(im,0,0,w,h);
oc.globalCompositeOperation='destination-in';
if(fx){const l=oc.createLinearGradient(0,0,w,0);l.addColorStop(0,'rgba(0,0,0,0)');l.addColorStop(fx/w,'#000');l.addColorStop(1-fx/w,'#000');l.addColorStop(1,'rgba(0,0,0,0)');oc.fillStyle=l;oc.fillRect(0,0,w,h)}
if(fy){const v=oc.createLinearGradient(0,0,0,h);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(fy/h,'#000');v.addColorStop(1-fy/h,'#000');v.addColorStop(1,'rgba(0,0,0,0)');oc.fillStyle=v;oc.fillRect(0,0,w,h)}
src=O}
cx.imageSmoothingEnabled=true;cx.imageSmoothingQuality='high';cx.drawImage(src,x,y,w,h);
const dark=lum[i]>110;document.getElementById('b1').classList.toggle('lt',dark);document.querySelectorAll('.beat,.hint').forEach(e=>e.style.color=dark?'#111':'#f5f5f7')}
function prog(){const r=hero.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/(hero.offsetHeight-innerHeight)))}
function loop(){tgt=prog();cur+=(tgt-cur)*.14;if(Math.abs(tgt-cur)<.0005)cur=tgt;
let i=Math.round(cur*(N-1));while(i>0&&!imgs[i])i--;if(i!==shown){draw(i);shown=i}
document.getElementById('bar').style.width=cur*100+'%';document.getElementById('hint').style.opacity=cur>.03?0:.6;
const b=[cur<.28,cur>=.33&&cur<.62,cur>=.72];['b1','b2','b3'].forEach((id,k)=>document.getElementById(id).classList.toggle('on',b[k]));
requestAnimationFrame(loop)}
let done=0;
FR.forEach((d,i)=>{const im=new Image();im.onload=()=>{imgs[i]=im;done++;document.getElementById('pct').textContent=Math.round(done/N*100)+'%';
if(i===0||done===N){shown=-1}if(done>=8&&!window.go){window.go=1;size();loop();const l=document.getElementById('load');l.style.opacity=0;setTimeout(()=>l.remove(),700);setCards()}};im.src=d});
addEventListener('resize',size);
const items=[[0,'Deep Purple','Front-to-back finish in the signature Pro color.','50% 50%',1],[5,'Camera plateau','A wide camera housing with three 48MP lenses.','50% 40%',1.5],[9,'Midnight studio','How the unibody looks in low light.','50% 50%',1.1],[24,'Inside the build','Layered parts, packed with precision.','50% 55%',1.4],[37,'A19 Pro core','The chip behind every fast moment.','50% 60%',1.8],[49,'Full exploded view','Every layer, all in one frame.','50% 50%',1]];
function setCards(){const c=document.getElementById('cards');if(c.children.length)return;
const SRC=x=>x;const bgs=document.querySelectorAll('.bgimg');bgs.forEach(e=>{e.style.backgroundImage='url('+SRC(FR[+e.dataset.f])+')'});
items.forEach(([f,t,p,pos,z])=>{const a=document.createElement('article');a.className='card';a.innerHTML=`<div class="im"><img alt="${t}" style="object-position:${pos};transform:scale(${z})" loading="lazy"></div><div class="bd"><h3>${t}</h3><p>${p}</p><div class="r"><span>From ₹1,49,900</span><a class="btn s" href="#buy">Buy now</a></div></div>`;
const im=a.querySelector('img');im.src=FR[f];im.dataset.z=z;
a.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=a.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;a.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`});
a.addEventListener('pointerleave',()=>a.style.transform='');c.appendChild(a)});
document.getElementById('dimg').src=FR[37];const ci=document.getElementById('cimg');ci.src=FR[0];
document.querySelectorAll('#sw button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#sw button').forEach(x=>x.setAttribute('aria-pressed',x===b));ci.style.filter=b.dataset.f})}