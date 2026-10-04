(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function toast(t){let e=$('.toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2200)}
function theme(){const d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';const go=()=>{d.dataset.theme=n;try{localStorage.theme=n}catch(e){}};document.startViewTransition&&!RM?document.startViewTransition(go):go();toast('Theme: '+n)}
$('#th').onclick=theme;
const m=$('#menu'),ul=$('.nav ul');m.onclick=()=>m.setAttribute('aria-expanded',ul.classList.toggle('open'));
addEventListener('keydown',e=>{if(e.key==='Escape'){ul.classList.remove('open');m.setAttribute('aria-expanded',false);pal.classList.remove('open')}if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openPal()}});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*70+'ms';io.observe(e)});
// progress + packet + timeline fill
const bar=$('#bar'),pk=$('#pk i'),fill=$('.tl .fill');
function sc(){const h=document.documentElement,p=scrollY/(h.scrollHeight-innerHeight||1);bar.style.width=p*100+'%';if(pk)pk.style.top=`calc(${p*100}% - ${p*12}px)`;
if(fill){const t=fill.parentNode.getBoundingClientRect();fill.style.height=Math.max(0,Math.min(t.height,innerHeight*.6-t.top))+'px'}}
addEventListener('scroll',sc,{passive:true});sc();
// floating code tokens
if(!RM){['SELECT','FROM','JOIN','GROUP BY','df.head()','import pandas','def etl():','INSERT','WHERE'].forEach((t,i)=>{const s=document.createElement('span');s.className='tok';s.textContent=t;s.style.cssText=`left:${6+i*10.5}%;animation-duration:${26+i*3}s;animation-delay:${-i*4}s`;s.setAttribute('aria-hidden',true);document.body.append(s)})}
// canvas network
const cv=$('#bg'),cx=cv.getContext('2d');let W,H,P=[],mx=-999,my=-999;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(70,W/18|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
rs();addEventListener('resize',rs);addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
function draw(){if(document.hidden||RM)return requestAnimationFrame(draw);const c=getComputedStyle(document.documentElement).getPropertyValue('--b2')||'#5BA8FF';cx.clearRect(0,0,W,H);cx.fillStyle=cx.strokeStyle=c.trim();
P.forEach((a,i)=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;const dx=a.x-mx,dy=a.y-my;if(dx*dx+dy*dy<9000){a.x+=dx*.01;a.y+=dy*.01}
cx.globalAlpha=.5;cx.beginPath();cx.arc(a.x,a.y,2,0,7);cx.fill();for(let j=i+1;j<P.length;j++){const b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130){cx.globalAlpha=(1-d/130)*.25;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}});requestAnimationFrame(draw)}
draw();
// parallax
const st=$('.stage');if(st&&!RM&&matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;$$('.layer',st).forEach(l=>l.style.transform=`translate(${x*l.dataset.d}px,${y*l.dataset.d}px)`)});
// typing
const ty=$('.type');if(ty){const w=['Python','SQL','Databases','Data Processing','Power BI'];let i=0,j=0,del=0;(function t(){const s=w[i];if(RM){ty.textContent=w.join(' · ');return}ty.textContent=s.slice(0,j);if(!del&&j++==s.length){del=1;return setTimeout(t,1300)}if(del&&--j<0){del=0;j=0;i=(i+1)%w.length}setTimeout(t,del?45:90)})()}
// image fallback
$$('img[data-fb]').forEach(i=>i.onerror=()=>{i.parentNode.innerHTML='<svg width="45%" viewBox="0 0 48 48"><path d="M8 40 24 6l16 34M15 28h18" stroke="#5BA8FF" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'});
// filters
$$('.filters').forEach(f=>f.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',f).forEach(x=>x.classList.toggle('on',x===b));$$('[data-cat]').forEach(c=>c.hidden=!(b.dataset.f==='all'||c.dataset.cat.includes(b.dataset.f)))});
// journey
const sg=$$('.stg');let cur=0,pl;function show(i){cur=i;sg.forEach((s,k)=>s.classList.toggle('on',k===i))}
sg.forEach((s,i)=>s.onclick=()=>show(i));
const pp=$('#play');if(sg.length){show(0);$('#next').onclick=()=>show((cur+1)%sg.length);pp.onclick=()=>{if(pl){clearInterval(pl);pl=0;pp.textContent='Play'}else{pl=setInterval(()=>show((cur+1)%sg.length),2200);pp.textContent='Pause'}}}
// copy, print
$$('[data-copy]').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText('ayakhaledhamed2006@gmail.com');toast('Email copied ✓')});
function pdf(){toast("Choose 'Save as PDF' in the print dialog");setTimeout(()=>print(),900)}
$$('[data-pdf]').forEach(b=>b.onclick=pdf);
// query widget
const Q={'SELECT skills FROM aya;':'Python, SQL, R, Pandas, C++, C#, Power BI, SQL Server, Firebase, Figma ...','SELECT * FROM projects;':'Restaurant Data Analysis | PetCare | Hospital Management System | Whisper','SELECT focus FROM aya;':'Data Engineering  (Python, SQL, databases, data processing, analytics)'};
const out=$('#qo');if(out)$$('.qs button').forEach(b=>b.onclick=()=>{const q=b.textContent,r=Q[q];let k=0;out.textContent='> '+q+'\n';clearInterval(out._t);out._t=setInterval(()=>{out.textContent='> '+q+'\n'+r.slice(0,++k);if(k>=r.length)clearInterval(out._t)},RM?0:22)});
// palette
const pal=$('#pal');function openPal(){pal.classList.add('open');$('button',pal).focus()}
$('#ps').onclick=openPal;pal.onclick=e=>{if(e.target===pal)pal.classList.remove('open')};
$$('#pal button').forEach(b=>b.onclick=()=>{pal.classList.remove('open');const a=b.dataset.a;a==='th'?theme():a==='pdf'?pdf():a==='cp'?($('[data-copy]')||{onclick(){navigator.clipboard.writeText('ayakhaledhamed2006@gmail.com');toast('Email copied ✓')}}).onclick():location.href=a});
// confetti
let lc=0;$('.logo').addEventListener('click',()=>{if(++lc===5&&!RM){lc=0;for(let i=0;i<40;i++){const d=document.createElement('i');d.style.cssText=`position:fixed;left:${innerWidth/2}px;top:70px;width:8px;height:8px;border-radius:50%;z-index:99;background:${['#2F8CFF','#6C63FF','#4DD7AE'][i%3]}`;document.body.append(d);d.animate([{transform:'none',opacity:1},{transform:`translate(${(Math.random()-.5)*600}px,${300+Math.random()*400}px)`,opacity:0}],{duration:1400,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>d.remove()}}});
})();

(()=>{const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,hv=matchMedia('(hover:hover)').matches,$$=s=>[...document.querySelectorAll(s)];
if(!RM){const I=['<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5"><ellipse cx="24" cy="12" rx="14" ry="6"/><path d="M10 12v24c0 3 6 6 14 6s14-3 14-6V12M10 24c0 3 6 6 14 6s14-3 14-6"/></svg>','<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="8" width="36" height="32" rx="4"/><path d="M6 18h36M6 28h36M18 8v32"/></svg>','<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 40V24M20 40V10M32 40V28M44 40H4"/></svg>'];
for(let i=0;i<7;i++){const d=document.createElement('div');d.className='fi';d.setAttribute('aria-hidden',true);d.innerHTML=I[i%3];d.style.cssText=`left:${8+i*13}%;width:${30+i%3*14}px;animation-duration:${34+i*5}s;animation-delay:${-i*6}s`;document.body.append(d)}}
if(hv&&!RM){const g=document.createElement('div');g.id='cg';g.setAttribute('aria-hidden',true);document.body.append(g);let x=0,y=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});(function l(){x+=(tx-x)*.12;y+=(ty-y)*.12;g.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(l)})();
$$('.card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transition='transform .1s';c.style.transform=`perspective(800px) rotateX(${-py*5}deg) rotateY(${px*6}deg) translateY(-6px)`});c.addEventListener('pointerleave',()=>{c.style.transition='.3s';c.style.transform=''})});
$$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.25}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}
// scramble titles
const h=document.querySelector('section h1');if(h&&!RM&&!h.querySelector('span')&&!document.querySelector('.hero')){const t=h.textContent;let k=0;const ch='01<>/{}[]#SQL';const iv=setInterval(()=>{h.textContent=t.split('').map((c,i)=>i<k||c===' '?c:ch[Math.random()*ch.length|0]).join('');k+=.8;if(k>=t.length){h.textContent=t;clearInterval(iv)}},30)}
// page sweep
const sw=document.createElement('div');sw.id='sw';document.body.append(sw);
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||RM||a.target||e.ctrlKey||e.metaKey||a.origin!==location.origin||a.getAttribute('href').startsWith('#')||!a.pathname.endsWith('.html'))return;e.preventDefault();sw.classList.add('go');setTimeout(()=>location.href=a.href,400)});
addEventListener('pageshow',()=>sw.classList.remove('go'));
})();
