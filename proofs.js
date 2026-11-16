(() => {
const P=window.PROOFS, $=s=>document.querySelector(s);
let current=0, step=0, all=false, originLesson=null;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function diagram(value=50){
 const id=P[current].id, q=value/100, num=x=>Number(x.toFixed(3));let body='',label='',read='';
 const circle=(x,y,r,color='#126c64')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="2"/>`;
 const line=(x,y,a,b,color='#126c64')=>`<path d="M${x},${y}L${a},${b}" fill="none" stroke="${color}" stroke-width="3"/>`;
 if(['euler','roots','cr','harmonic','conformal','elementary'].includes(id)){
  const t=q*2*Math.PI, a=id==='roots'?t/2:t+Math.PI/4, scale=id==='roots'?1:1.3;
  body=circle(130,115,65)+circle(400,115,65*scale)+line(130,115,130+65*Math.cos(t),115-65*Math.sin(t))+line(400,115,400+65*scale*Math.cos(a),115-65*scale*Math.sin(a),'#b74e2f');
  if(id==='roots'){label='输入连续幅角 θ';read=`θ=${num(q*360)}°，连续平方根的角=${num(q*180)}°；一圈末端到达 −1。`}
  else{body+=line(130,115,130-45*Math.sin(t),115-45*Math.cos(t),'#416aa0')+line(400,115,400-45*scale*Math.sin(a),115-45*scale*Math.cos(a),'#416aa0');label='输入箭头的方向 θ';read=`乘数 A=1.3eⁱπ⁄⁴：两方向都转 45°、长度都乘 1.3；两箭头夹角仍为 90°。${id==='harmonic'?'梯度对 (∇u,∇v) 也具有相差 90° 的结构。':''}`}
  body+='<text x="130" y="225">输入</text><text x="400" y="225">输出</text><text x="260" y="115">→</text>';
 }else if(['taylor','laurent','singularity'].includes(id)){
  const r=.1+.85*q;label='几何级数比值模 |q|（小于 1）';
  for(let k=0;k<12;k++){const h=130*r**k;body+=`<rect x="${40+40*k}" y="${180-h}" width="24" height="${h}" fill="#126c64"/><text x="${52+40*k}" y="205">${k}</text>`}
  body+=line(30,180,535,180,'#9eaa9b');read=`|q|=${num(r)}，前 12 项后的余项上界 |q|¹²/(1−|q|)=${num(r**12/(1-r))}。越接近 1，余项越难缩小。${id==='laurent'?'外圈用 (z−a)/(ζ−a)，内圈反过来；两者都需要模小于 1。':''}${id==='singularity'?'这里显示几何级数的幅度；奇点分类须另外检查洛朗负幂是否终止。':''}`;
 }else if(['residue','poles'].includes(id)){
  const n=Math.round(-3+6*q), pts=[];label='被筛选的幂次 n（−3 到 3）';
  for(let k=0;k<=120;k++){const t=2*Math.PI*k/120;const x=n===-1?0:Math.sin((n+1)*t)/(n+1),y=n===-1?t:(1-Math.cos((n+1)*t))/(n+1);pts.push(`${k?'L':'M'}${270+x*65},${190-y*22}`)}
  body=line(50,190,510,190,'#9eaa9b')+`<path d="${pts.join(' ')}" fill="none" stroke="#b74e2f" stroke-width="3"/>`;
  read=`∫₀ᵗ i eⁱ⁽ⁿ⁺¹⁾ˢ ds，当前 n=${n}。t=2π 时积分 ${n===-1?'为 2πi，留下一个非零终点':'为 0，轨迹返回起点'}。纵横轴为不同缩放比例，便于观察。`;
 }else if(id==='goursat'){
  const n=Math.floor(q*5);label='嵌套四分次数 n';
  for(let k=0;k<=n;k++){const r=190/2**k;body+=`<path d="M${280-r},${200}L280,${200-r}L${280+r},200Z" fill="none" stroke="${k===n?'#b74e2f':'#9eaa9b'}" stroke-width="2"/>`}
  read=`n=${n}：周长与直径分别缩为 2⁻ⁿ，ML 中乘积缩为 4⁻ⁿ，抵消选取子块时的 4ⁿ。图仅示意一条嵌套链，不代表每个函数都选中此子块。`;
 }else if(id==='real'){
  const R=1.2+8.8*q, arc=Math.PI-2*Math.atan(R), w=450/Math.PI;label='补路半圆半径 R';
  body=`<rect x="50" y="80" width="${2*Math.atan(R)*w}" height="55" fill="#126c64"/><rect x="${50+2*Math.atan(R)*w}" y="80" width="${arc*w}" height="55" fill="#b74e2f"/><text x="275" y="175">绿色实轴 + 橙色圆弧 = π</text>`;
  read=`R=${num(R)}，圆弧实际值=${num(arc)}；ML 上界 πR/(R²−1)=${num(Math.PI*R/(R*R-1))}。半径增大，上界趋零。`;
 }else{
  const eps=.08+.82*q;label='小圆半径 ε（模型 f(z)=z²+1，a=0）';
  body=circle(280,115,95,'#9eaa9b')+circle(280,115,95*eps)+line(280,115,280+95*eps,115,'#b74e2f')+'<text x="280" y="120">a</text><text x="280" y="230">外圈变成小圈，中心值不变</text>';
  read=`ε=${num(eps)}，f(z)−f(0)=z²，小圆上最大波动 ε²=${num(eps*eps)}，变化项积分模的上界 2πε²=${num(2*Math.PI*eps*eps)}。本例变化项的整圈积分恰为 0；上界本身不必取等号。`;
 }
 return `<label for="proof-dial">${escape(label)}</label><input id="proof-dial" type="range" min="0" max="100" value="${value}" aria-label="${escape(label)}"><svg viewBox="0 0 560 250" role="img" aria-label="${escape(label)}的推导辅助图">${body}</svg><p aria-live="polite">${escape(read)}</p>`;
}
function route(){
 const h=location.hash.slice(1);if(!h.startsWith('proof-'))return;
 const n=P.findIndex(p=>'proof-'+p.id===h);if(n>=0)open(n,false);
}
function draw(){
 const p=P[current], active=all?p.steps:p.steps.slice(0,step+1);
 const math=tex=>window.ComplexLabMathHTML(tex,true);
 $('#proof-nav').innerHTML=P.map((x,i)=>`<button data-proof="${i}" class="${i===current?'active':''}"><small>第 ${x.chapter} 章</small>${escape(x.title)}</button>`).join('');
 $('#proof-article').innerHTML=`
 <p class="eyebrow">第 ${p.chapter} 章 · 公式推导</p><h1>${escape(p.title)}</h1>
 <p class="proof-introduction">${escape(p.introduction)}</p>
 <section class="proof-condition"><h2>适用条件</h2><p>${escape(p.condition)}</p></section>
 <section class="proof-symbols"><h2>符号说明</h2><dl>${p.symbols.map(x=>`<div><dt>${window.ComplexLabMathHTML(x.symbol,false)}</dt><dd>${escape(x.meaning)}</dd></div>`).join('')}</dl></section>
 <div class="proof-result math-block">${math(p.result)}</div>
 <div class="proof-dependencies"><span>用到：</span>${p.needs.length?p.needs.map(id=>{const n=P.findIndex(x=>x.id===id);return `<button data-proof="${n}">${escape(P[n].title)} ↗</button>`}).join(''):'复数与实微积分基础'}</div>
 <div class="proof-track" aria-label="推导步骤">${p.steps.map((x,i)=>`<button data-proof-step="${i}" aria-pressed="${all||i<=step}">${i+1}<span>${escape(x[0])}</span></button>`).join('')}</div>
 <div class="proof-step-list">${active.map((x,i)=>`<section class="proof-step"><span class="proof-step-number">${i+1}</span><div><h2>${escape(x[0])}</h2><div class="math-block">${math(x[1])}</div><p>${escape(x[2])}</p>${x[3]?`<p class="proof-picture">${escape(x[3])}</p>`:''}</div></section>`).join('')}</div>
 <div class="proof-actions"><button class="action-button" id="proof-prev" ${step===0?'disabled':''}>← 上一步</button><span role="status">${all?'全部步骤':`${step+1} / ${p.steps.length}`}</span><button class="primary" id="proof-next" ${step===p.steps.length-1||all?'disabled':''}>下一步 →</button><button class="text-button" id="proof-all">${all?'逐步阅读':'展开全部'}</button></div>
 <section class="proof-example"><h2>算一个具体例子</h2><p>${escape(p.example.question)}</p><div class="math-block">${math(p.example.formula)}</div><p>${escape(p.example.explanation)}</p></section>
 <aside class="proof-caution"><strong>边界与易错处</strong><p>${escape(p.pitfall)}</p></aside>
 <details class="proof-check"><summary>${escape(p.check[0])}</summary><p>${escape(p.check[1])}</p></details>
 <button class="action-button" data-lesson="${originLesson??p.lab}">${originLesson!==null?'回到正在学习的第 '+(originLesson+1)+' 课':'回到对应实验'} ↗</button>
 <p class="proof-next-topics">相关推导：${P.map((x,i)=>x.needs.includes(p.id)?`<button class="text-button" data-proof="${i}">${escape(x.title)} →</button>`:'').join('')||'<button class="text-button" data-view="map">知识网络 →</button>'}</p>`;
 const visual=document.createElement('details');visual.className='proof-visual';visual.innerHTML='<summary>几何辅助图</summary><div id="proof-diagram"></div>';$('#proof-article').append(visual);$('#proof-diagram').innerHTML=diagram();
 visual.addEventListener('input',e=>{if(e.target.id!=='proof-dial')return;const temp=document.createElement('div');temp.innerHTML=diagram(Number(e.target.value));visual.querySelector('svg').replaceWith(temp.querySelector('svg'));visual.querySelector('[aria-live]').replaceWith(temp.querySelector('[aria-live]'));window.ComplexLabTypeset(visual)});
 $('#proof-prev').onclick=()=>{all=false;step=Math.max(0,step-1);draw()};
 $('#proof-next').onclick=()=>{step=Math.min(p.steps.length-1,step+1);draw()};
 $('#proof-all').onclick=()=>{all=!all;draw()};
 window.ComplexLabTypeset($('#proof-article'));
}
function open(n,scroll=true){current=n;step=0;all=false;window.ComplexLabShowView('proof',scroll);draw();if(location.hash!=='#proof-'+P[n].id)location.hash='proof-'+P[n].id;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-proof]');if(b){if(b.closest('#lesson-proof-links')){const n=window.LESSONS.findIndex(l=>location.hash==='#lab-'+l.id);originLesson=n>=0?n:null;}open(Number(b.dataset.proof));}const s=e.target.closest('[data-proof-step]');if(s){step=Number(s.dataset.proofStep);all=false;draw()}});
window.ComplexLabOpenProof=()=>{originLesson=null;open(current)};
window.ComplexLabProofLinks=lab=>P.map((p,i)=>p.lab===lab?`<button class="action-button" data-proof="${i}">${escape(p.title)} ↗</button>`:'').join('');
window.addEventListener('hashchange',route);route();
if(location.hash==='#proof')open(0,false);
const labIndex=window.LESSONS.findIndex(l=>location.hash==='#lab-'+l.id);if(labIndex>=0)$('#lesson-proof-links').innerHTML=window.ComplexLabProofLinks(({0:1,3:6})[labIndex]??labIndex);
})();
