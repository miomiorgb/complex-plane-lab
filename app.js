(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const L=window.LESSONS, TAU=2*Math.PI, C={green:'#126c64',orange:'#b74e2f',blue:'#416aa0',gold:'#9c761b',red:'#ae3b3b',grid:'#e2e6db',ink:'#163331'};
let saved={};try{saved=JSON.parse(localStorage.getItem('complex-lab-v1')||'{}')}catch{}
let index=Number.isInteger(saved.index)?Math.max(0,Math.min(11,saved.index)):0, s={}, view='map', drag=null, anim=null;
const done=new Set((saved.done||[]).filter(x=>Number.isInteger(x)&&x>=0&&x<L.length)), answers=saved.answers||{};
function persist(){try{localStorage.setItem('complex-lab-v1',JSON.stringify({index,done:[...done],answers}))}catch{}updateProgress()}
function updateProgress(){$('#progress').textContent=`${done.size} / 12 已探索`}
const fmt=(x,d=2)=>Math.abs(x)<Math.pow(10,-d)/2?'0':Number(x.toFixed(d)).toString();
const zstr=z=>`${fmt(z.x)} ${Number(fmt(z.y))<0?'−':'+'} ${fmt(Math.abs(z.y))}i`;
const add=(a,b)=>({x:a.x+b.x,y:a.y+b.y}), sub=(a,b)=>({x:a.x-b.x,y:a.y-b.y});
const mul=(a,b)=>({x:a.x*b.x-a.y*b.y,y:a.x*b.y+a.y*b.x});
const scale=(a,r)=>({x:a.x*r,y:a.y*r});
const div=(a,b)=>{const d=b.x*b.x+b.y*b.y;return d<1e-12?null:{x:(a.x*b.x+a.y*b.y)/d,y:(a.y*b.x-a.x*b.y)/d}};
const polar=(r,a)=>({x:r*Math.cos(a),y:r*Math.sin(a)});
function pow(z,n){if(n===0)return{x:1,y:0};if(n<0)return div({x:1,y:0},pow(z,-n));let a={x:1,y:0};for(let i=0;i<n;i++)a=mul(a,z);return a}
function func(z,name){switch(name){case'square':return mul(z,z);case'exp':return polar(Math.exp(z.x),z.y);case'inverse':return div({x:1,y:0},z);case'conj':return{x:z.x,y:-z.y};case'sin':return{x:Math.sin(z.x)*Math.cosh(z.y),y:Math.cos(z.x)*Math.sinh(z.y)};case'norm':return{x:z.x*z.x+z.y*z.y,y:0};default:return z}}
const text=(x,y,t,cls='',anchor='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${t}</text>`;
function line(x1,y1,x2,y2,color=C.grid,width=1,extra=''){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${extra}/>`}
function setup(){return '<svg viewBox="0 0 840 400" role="img" aria-label="当前复平面交互实验"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10" fill="context-stroke"/></marker></defs>'}
function plot(cx,cy,unit,range,title,axisX='Re',axisY='Im'){
  const p={cx,cy,unit,range,x:z=>cx+z.x*unit,y:z=>cy-z.y*unit};let a='';
  for(let k=-Math.floor(range);k<=Math.floor(range);k++){a+=line(cx-range*unit,cy-k*unit,cx+range*unit,cy-k*unit);a+=line(cx+k*unit,cy-range*unit,cx+k*unit,cy+range*unit);if(k&&range<=5){a+=text(cx+k*unit,cy+17,k,'','middle');a+=text(cx-9,cy-k*unit+4,k,'','end')}}
  a+=line(cx-range*unit,cy,cx+range*unit,cy,'#98aaa1',1.2)+line(cx,cy-range*unit,cx,cy+range*unit,'#98aaa1',1.2);
  a+=text(cx,27,title,'plot-title','middle')+text(cx+range*unit+5,cy-8,axisX,'axis-title','end')+text(cx+8,cy-range*unit-10,axisY,'axis-title');
  return {p,a};
}
function circle(p,z,r,color=C.green,fill='none',extra=''){return `<circle cx="${p.x(z)}" cy="${p.y(z)}" r="${r*p.unit}" fill="${fill}" stroke="${color}" stroke-width="1.8" ${extra}/>`}
function dot(p,z,color=C.green,label='',draggable=false){return `<circle cx="${p.x(z)}" cy="${p.y(z)}" r="${draggable?9:5}" fill="${color}" stroke="#fffef8" stroke-width="2" ${draggable?'data-drag="point" tabindex="0" role="img" aria-label="可拖动复数点，也可使用上方滑块"':''}/>${label?text(p.x(z)+12,p.y(z)-12,label,'axis-title'):''}`}
function vector(p,a,b,color=C.green,width=2){return line(p.x(a),p.y(a),p.x(b),p.y(b),color,width,'marker-end="url(#arrow)"')}
function path(p,points,color=C.green,width=2,extra=''){
  let d='',active=false;for(const z of points){if(!z||!Number.isFinite(z.x)||!Number.isFinite(z.y)||Math.abs(z.x)>p.range*1.3||Math.abs(z.y)>p.range*1.3){active=false;continue}d+=`${active?'L':'M'}${p.x(z).toFixed(2)},${p.y(z).toFixed(2)} `;active=true}
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;
}
const sample=(fn,a,b,n=160)=>Array.from({length:n+1},(_,i)=>fn(a+(b-a)*i/n));
function slider(key,label,min,max,step,unit=''){return `<div class="control"><label for="${key}">${label}<output id="out-${key}">${fmt(s[key])}${unit}</output></label><input id="${key}" data-key="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${s[key]}" aria-label="${label}"></div>`}
function select(key,label,opts){return `<div class="control"><label for="${key}">${label}</label><select id="${key}" data-key="${key}">${opts.map(([v,t])=>`<option value="${v}" ${String(s[key])===String(v)?'selected':''}>${t}</option>`).join('')}</select></div>`}
function controls(){let h='';switch(L[index].id){
case'point':h=slider('x','实部 x',-3,3,.05)+slider('y','虚部 y',-3,3,.05);break;
case'multiply':h=slider('angle','乘数的角度 φ',-180,180,1,'°')+slider('scale','乘数的模 ρ',.25,2,.05);break;
case'mapping':h=select('fn','映射规则',[['square','平方 z²'],['exp','指数 eᶻ'],['inverse','倒数 1/z'],['conj','共轭 z̄'],['sin','正弦 sin z']])+slider('x','输入实部 x',-1.8,1.8,.05)+slider('y','输入虚部 y',-2.8,2.8,.05);break;
case'domain':h=select('domain','区域',[['disk','开圆盘 |z|<2.4'],['annulus','圆环 0.8<|z|<2.4']])+slider('radius','绳圈半径',0,2.2,.02);break;
case'derivative':h=select('fn','函数',[['square','z²：处处解析'],['conj','z̄：处处不可复导'],['norm','|z|²：仅 0 可导']])+select('base','考察点 z₀',[[1,'z₀ = 1'],[0,'z₀ = 0']])+slider('theta','接近方向',0,360,1,'°')+slider('h','步长 |h|',.02,.8,.01);break;
case'branch':h=select('fn','反函数',[['sqrt','平方根 √z'],['log','对数 log z'],['root','n 次方根']])+slider('turn','连续累积角 θ',0,1080,1,'°')+(s.fn==='root'?slider('n','根的次数 n',2,6,1):'')+'<button class="action-button" id="animate">自动绕圈 ▶</button>';break;
case'integral':h=select('fn','被积函数',[['inverse','1/z'],['identity','z'],['conj','z̄']])+slider('radius','路径圆半径 r',.4,2,.05)+select('turns','绕数',[[-2,'顺时针两圈 −2'],[-1,'顺时针一圈 −1'],[1,'逆时针一圈 +1'],[2,'逆时针两圈 +2']])+slider('t','已走比例',0,1,.01);break;
case'cauchy':h=slider('x','探针 Re a',-2.8,2.8,.05)+slider('y','探针 Im a',-2.8,2.8,.05)+select('order','核的次方',[[0,'1/(z−a)：取函数值'],[1,'1/(z−a)²：取一阶导数'],[2,'1/(z−a)³：取二阶导数']]);break;
case'taylor':h=slider('center','展开中心 a',-.8,.6,.1)+slider('n','保留项数 N',1,30,1)+slider('x','测试点 Re z',-1.8,2,.05)+slider('y','测试点 Im z',-1.8,1.8,.05);break;
case'laurent':h=select('region','展开的圆环',[['inner','0<|z|<1'],['outer','|z|>1']])+slider('radius','积分圆半径',.2,2.3,.02)+slider('n','图中保留项数',1,12,1);break;
case'residue':h=select('power','左图的幂次 n',[[-3,'n=−3'],[-2,'n=−2'],[-1,'n=−1：留数项'],[0,'n=0'],[1,'n=1'],[2,'n=2']])+slider('center','右图圆心 c（实轴）',0,1,.05)+slider('radius','右图半径 r',.15,1.7,.02);break;
case'real':h=slider('radius','半圆半径 R',1.2,10,.1);break;
}$('#controls').innerHTML=h;
$('#controls').oninput=e=>{const k=e.target.dataset.key;if(!k)return;const v=e.target.value;s[k]=['fn','domain','region'].includes(k)?v:Number(v);const o=$(`#out-${k}`);if(o)o.textContent=fmt(s[k])+(['angle','theta','turn'].includes(k)?'°':'');if(k==='fn'&&L[index].id==='branch')controls();renderStage()};
const play=$('#animate');if(play)play.onclick=()=>{if(anim){stopAnimation();return}play.textContent='暂停绕圈 Ⅱ';let last=0;function frame(t){if(!last)last=t;const dt=Math.min(t-last,60);last=t;s.turn=(s.turn+dt*.055)%1080;$('#turn').value=s.turn;$('#out-turn').textContent=fmt(s.turn,0)+'°';renderStage();anim=requestAnimationFrame(frame)}anim=requestAnimationFrame(frame)};
}
function stopAnimation(){if(anim)cancelAnimationFrame(anim);anim=null;const p=$('#animate');if(p)p.textContent='自动绕圈 ▶'}
let dragPlot=null;
function renderStage(){let svg=setup(),read='',p,q,a,b;dragPlot=null;
switch(L[index].id){
case'point':{
 const g=plot(420,207,45,3.4,'z 平面');p=g.p;svg+=g.a;const z={x:s.x,y:s.y},co={x:s.x,y:-s.y},r=Math.hypot(s.x,s.y);let ang=Math.atan2(s.y,s.x);if(ang<=-Math.PI)ang=Math.PI;
 svg+=circle(p,{x:0,y:0},r,C.grid)+line(p.x(z),p.y(z),p.x({x:s.x,y:0}),p.cy,C.orange,1,'stroke-dasharray="4 4"')+vector(p,{x:0,y:0},z)+dot(p,co,C.blue)+text(p.x(co)+12,p.y(co)+22,'z̄','axis-title')+dot(p,z,C.green,'z',true);
 if(r>.01)svg+=path(p,sample(t=>polar(.6,t),0,ang,50),C.orange,2);
 svg+=text(50,345,'绿色：复数 z','note')+text(50,370,'蓝色：共轭 z̄','note');dragPlot=p;
 read=`z = <strong>${zstr(z)}</strong>　|z| = ${fmt(r)}　Arg z = ${r<.001?'未定义':fmt(ang*180/Math.PI,1)+'°'}　z 与 z̄ 的距离 = ${fmt(2*Math.abs(s.y))}`;break;}
case'multiply':{
 const g=plot(420,207,42,3.5,'同一乘数，作用于整张平面');p=g.p;svg+=g.a;const z={x:s.x,y:s.y},v=polar(s.scale,s.angle*Math.PI/180),w=mul(z,v),square=[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:0}];
 svg+=path(p,square,'#a7b8af',1.5,'stroke-dasharray="4 4"')+path(p,square.map(z=>mul(z,v)),C.orange,2)+vector(p,{x:0,y:0},z)+vector(p,{x:0,y:0},w,C.orange)+dot(p,z,C.green,'z')+dot(p,w,C.orange,'az');
 read=`a = ${zstr(v)}　z = ${zstr(z)}　az = <strong>${zstr(w)}</strong>　长度 ×${fmt(s.scale)}，方向转 ${fmt(s.angle)}°`;break;}
case'mapping':{
 const g=plot(210,210,49,3,'输入 z'),h=plot(630,210,49,3,'输出 w=f(z)');p=g.p;q=h.p;svg+=g.a+h.a;
 for(let k=-2;k<=2;k+=.5){for(const vertical of [true,false]){const points=sample(t=>vertical?{x:k,y:t}:{x:t,y:k},-2,2,100),color=vertical?C.green:C.blue;svg+=path(p,points,color,.85,'opacity=".4"')+path(q,points.map(z=>func(z,s.fn)),color,1.1,'opacity=".65"')}}
 const z={x:s.x,y:s.y},w=func(z,s.fn);svg+=dot(p,z,C.orange,'z',true);if(w&&Math.abs(w.x)<3.7&&Math.abs(w.y)<3.7)svg+=dot(q,w,C.orange,'w');else svg+=text(630,370,w?'w 超出当前视窗':'z=0，1/z 无定义','axis-title','middle');dragPlot=p;
 svg+=text(420,210,'→','plot-title','middle');read=`z = ${zstr(z)}　w = <strong>${w?zstr(w):'无定义'}</strong>${w?'　|w| = '+fmt(Math.hypot(w.x,w.y)):''}　（曲线超出范围的部分未显示）`;break;}
case'domain':{
 const g=plot(260,210,56,2.6,'区域内收缩闭路');p=g.p;svg+=g.a+circle(p,{x:0,y:0},2.4,'#a4b9a7','#e1eadb');if(s.domain==='annulus')svg+=circle(p,{x:0,y:0},.8,'#9eaa9b','#fffef8','stroke-dasharray="5 4"');
 const bad=s.domain==='annulus'&&s.radius<=.8;svg+=circle(p,{x:0,y:0},Math.max(s.radius,.025),bad?C.red:C.orange);svg+=dot(p,{x:s.radius,y:0},bad?C.red:C.orange);
 svg+=text(660,85,'边界正向：区域在左手边','plot-title','middle');const h=plot(660,220,35,2.6,'','','');q=h.p;svg+=circle(q,{x:0,y:0},2,'#a4b9a7','#e1eadb')+circle(q,{x:0,y:0},.8,'#9eaa9b','#fffef8');svg+=path(q,sample(t=>polar(2,t),.2,1.5),C.green,2,'marker-end="url(#arrow)"')+path(q,sample(t=>polar(.8,t),1.5,.1),C.orange,2,'marker-end="url(#arrow)"');svg+=text(660,325,'外边界 ↶　内边界 ↷','note','middle');
 read=`${s.domain==='disk'?'开圆盘：可以继续缩成一点。':bad?'<strong>碰到洞了：这个收缩已经离开允许的区域。</strong>':'圆环：同心圈缩到 r=0.8 就会触到内边界。'}　当前绳圈半径 ${fmt(s.radius)}`;break;}
case'derivative':{
 const g=plot(210,210,60,2.5,'输入点附近'),h=plot(630,210,51,2.9,'差商平面 q(h)');p=g.p;q=h.p;svg+=g.a+h.a;const base={x:s.base,y:0},hf=polar(s.h,s.theta*Math.PI/180),z=add(base,hf),f0=func(base,s.fn),qf=div(sub(func(z,s.fn),f0),hf);
 const qs=sample(t=>{const dh=polar(s.h,t);return div(sub(func(add(base,dh),s.fn),f0),dh)},0,TAU);svg+=circle(p,base,s.h,C.grid)+dot(p,base,C.ink,'z₀')+vector(p,base,z,C.orange)+dot(p,z,C.orange,'z₀+h')+path(q,qs,C.blue,2)+dot(q,qf,C.orange,'q(h)');
 const expected=s.fn==='square'?{x:2*s.base,y:0}:s.fn==='norm'&&s.base===0?{x:0,y:0}:null;if(expected)svg+=dot(q,expected,C.green)+text(q.x(expected)+12,q.y(expected)+24,'极限','axis-title');
 read=`q(h) = <strong>${zstr(qf)}</strong>　${s.fn==='square'?`复导数 f′(z₀)=${2*s.base}`:s.fn==='conj'?'各方向的差商始终不同，不存在复导数。':s.base===0?'在 0 可导，导数为 0；但任何邻域内都不解析。':'非零点的方向差异不会随 h 缩小而消失。'}`;break;}
case'branch':{
 const th=s.turn*Math.PI/180,n=s.fn==='sqrt'?2:s.n,log=s.fn==='log';const g=plot(210,210,64,2.3,'输入：连续累积的角');p=g.p;svg+=g.a+circle(p,{x:0,y:0},1,C.grid)+line(p.cx-145,p.cy,p.cx,p.cy,C.red,1.5,'stroke-dasharray="6 4"')+path(p,sample(t=>polar(1,t),0,th,240),C.green,2)+dot(p,polar(1,th),C.orange,'z');
 const h=log?plot(630,225,15,10,'输出：对数的虚部记住绕圈','Re w','Im w'):plot(630,210,64,2.3,'输出：根的连续分支');q=h.p;svg+=h.a;
 if(log){const scaled=th>9.5;svg+=path(q,sample(t=>({x:0,y:t}),0,th,160),C.green,3);if(!scaled)svg+=dot(q,{x:0,y:th},C.orange,'w');else svg+=text(630,62,'w 已高于视窗：Im w = '+fmt(th),'axis-title','middle');}
 else{svg+=circle(q,{x:0,y:0},1,C.grid)+path(q,sample(t=>polar(1,t/n),0,th),C.green,2);for(let k=0;k<n;k++)svg+=dot(q,polar(1,(th+k*TAU)/n),k?C.blue:C.orange,k===0?'跟踪值':'');}
 const principal=((th+Math.PI)%TAU+TAU)%TAU-Math.PI;
 read=`已绕 ${fmt(s.turn/360)} 圈　${log?'连续 log z = <strong>'+fmt(th)+'i</strong>；主值虚部 = '+fmt(principal):`连续根 w = <strong>${zstr(polar(1,th/n))}</strong>；共有 ${n} 个根`}　割线仅用于说明主支。`;break;}
case'integral':{
 const angle=TAU*s.turns*s.t,r=s.radius,g=plot(210,210,62,2.4,'沿圆路径走'),h=plot(630,210,12,12,'积分的累积值','Re I','Im I');p=g.p;q=h.p;svg+=g.a+h.a+circle(p,{x:0,y:0},r,C.grid);
 const integral=t=>s.fn==='inverse'?{x:0,y:t}:s.fn==='conj'?{x:0,y:r*r*t}:scale(sub(polar(r*r,2*t),{x:r*r,y:0}),.5);
 const pts=sample(t=>polar(r,t),0,angle,200),ivals=sample(integral,0,angle,220),last=integral(angle);svg+=path(p,pts,C.green,3)+dot(p,pts.at(-1),C.orange,'当前位置')+path(q,ivals,C.blue,2.5)+dot(q,last,C.orange,'I');
 if(Math.abs(last.y)>12)svg+=text(630,375,'累积终点超出视窗，数值见下方','note','middle');
 const tangent=polar(.4,angle+Math.sign(s.turns)*Math.PI/2);svg+=vector(p,pts.at(-1),add(pts.at(-1),tangent),C.orange);
 read=`走过角度 ${fmt(angle/Math.PI)}π　积分 I = <strong>${zstr(last)}</strong>　${s.fn==='inverse'?'走完整圈时只由有向绕数决定。':s.fn==='conj'?'非解析的共轭函数：整圈结果与 r² 成正比。':'z 有原函数 z²/2：闭路回到 0。'}`;break;}
case'cauchy':{
 const g=plot(260,210,47,3.3,'探针 a 与围道 |z|=2');p=g.p;svg+=g.a+circle(p,{x:0,y:0},2,C.green,'#edf1e7')+path(p,sample(t=>polar(2,t),.2,1.1),C.green,2,'marker-end="url(#arrow)"');const z={x:s.x,y:s.y},dist=Math.hypot(s.x,s.y),border=Math.abs(dist-2)<.035;
 svg+=dot(p,z,border?C.red:C.orange,'a',true);dragPlot=p;
 const f=s.order===0?add(mul(z,z),{x:1,y:0}):s.order===1?scale(z,2):{x:2,y:0},fact=s.order===2?2:1,iv=dist<2?mul({x:0,y:TAU/fact},f):{x:0,y:0};
 svg+=text(645,125,border?'a 在围道上':dist<2?'a 在围道内':'a 在围道外','plot-title','middle')+text(645,180,`f(z) = z² + 1`,'axis-title','middle')+text(645,220,`核的幂次：${s.order+1}`,'axis-title','middle')+text(645,265,border?'普通积分无定义':dist<2?'提取内部值 / 导数':'圆内没有核的极点','note','middle');
 read=`a = ${zstr(z)}　${border?'<strong>位于边界附近：普通围道积分无定义（图像判定容差 0.035）。</strong>':`积分 = <strong>${zstr(iv)}</strong>`}`;break;}
case'taylor':{
 const g=plot(250,210,53,3,'收敛圆与测试点');p=g.p;svg+=g.a;const a={x:s.center,y:0},z={x:s.x,y:s.y},R=Math.abs(1-s.center),ratio=div(sub(z,a),{x:1-s.center,y:0});svg+=circle(p,a,R,C.green,'#edf1e7','stroke-dasharray="5 4"')+dot(p,a,C.green,'中心 a')+dot(p,{x:1,y:0},C.red,'奇点 1')+dot(p,z,C.orange,'z',true);dragPlot=p;
 const truth=div({x:1,y:0},sub({x:1,y:0},z)),terms=[],sums=[];let total={x:0,y:0},term={x:1/(1-s.center),y:0};for(let k=0;k<s.n;k++){terms.push(term);total=add(total,term);sums.push(total);term=mul(term,ratio)}
 const errors=sums.map(w=>truth?Math.hypot(w.x-truth.x,w.y-truth.y):NaN),max=Math.max(1,...errors.filter(Number.isFinite));
 svg+=text(650,60,'部分和的误差（相对当前测试点）','plot-title','middle');const px={cx:520,cy:310,unit:1,range:1,x:v=>520+v.x*250/Math.max(1,s.n-1),y:v=>310-v.y*190};svg+=line(520,310,790,310)+line(520,100,520,310);svg+=path({...px,range:1e12},errors.map((v,k)=>({x:k,y:v/max})),C.orange,2);svg+=text(520,333,'1 项','note')+text(790,333,`${s.n} 项`,'note','end')+text(520,90,'纵轴上限 '+(max<1e5?fmt(max):max.toExponential(1)),'note');
 const er=errors.at(-1),rat=Math.hypot(ratio.x,ratio.y);read=`|z−a|/R = ${fmt(rat)}（${rat<1?'圆内收敛':Math.abs(rat-1)<1e-8?'圆周：本例发散':'圆外发散'}）　${truth?`N=${s.n}，误差 <strong>${er<1e5?fmt(er,6):er.toExponential(3)}</strong>`:'z=1，原函数本身无定义'}　R = ${fmt(R)}`;break;}
case'laurent':{
 const g=plot(260,210,63,2.5,'展开圆环与积分圆');p=g.p;svg+=g.a+circle(p,{x:0,y:0},s.region==='inner'?1:2.4,'#b8c6b3','#edf1e7');if(s.region==='outer')svg+=circle(p,{x:0,y:0},1,'#b8c6b3','#fffef8');
 svg+=circle(p,{x:0,y:0},1,'#b8c6b3','none','stroke-dasharray="5 4"')+circle(p,{x:0,y:0},s.radius,C.orange)+dot(p,{x:0,y:0},C.red,'0')+dot(p,{x:1,y:0},C.red,'1');
 svg+=text(650,65,'幂次结构：横轴是 n','plot-title','middle');const exps=s.region==='inner'?Array.from({length:s.n},(_,i)=>i-1):Array.from({length:s.n},(_,i)=>-i-2),start=-13,end=11,by=235;
 svg+=line(490,by,810,by,'#a1b2a6');for(let k=-12;k<=10;k++){let x=490+(k-start)/(end-start)*320;if(k%2===0||k===-1)svg+=text(x,by+24,k,'note','middle')}
 for(const n of exps){const x=490+(n-start)/(end-start)*320;svg+=`<rect x="${x-4}" y="${s.region==='inner'?by:by-68}" width="8" height="68" rx="2" fill="${n===-1?C.orange:C.green}"/>`}
 svg+=text(650,350,s.region==='inner'?'负一次项系数 = −1':'负一次项系数 = 0','axis-title','middle');
 const ok=s.region==='inner'?s.radius<1:s.radius>1,bound=Math.abs(s.radius-1)<.02;read=`选定展开：${s.region==='inner'?'−1/z −1 −z −z² −⋯':'z⁻² +z⁻³ +z⁻⁴ +⋯'}　${bound?'<strong>积分圆碰到极点 1，不可计算普通围道积分。</strong>':!ok?'<strong>当前积分圆不在所选展开圆环中，不能用这份级数逐项积分。</strong>':`∮f dz = <strong>${s.region==='inner'?'−2πi':'0'}</strong>`}`;break;}
case'residue':{
 const g=plot(210,210,60,2.4,'zⁿ dz 的贡献在累积平面相加'),h=plot(630,210,65,2.4,'右：f=1/[z(z−1)]');p=g.p;q=h.p;svg+=g.a+h.a;const n=s.power;
 const accumulation=t=>n===-1?{x:0,y:t}:scale(sub(polar(1,(n+1)*t),{x:1,y:0}),1/(n+1));
 const pts=sample(accumulation,0,TAU),displayScale=n===-1?.3:1;svg+=path(p,pts.map(z=>scale(z,displayScale)),C.orange,2.5)+dot(p,scale(pts.at(-1),displayScale),C.orange,'终点');svg+=text(210,375,n===-1?'竖直线按 0.3 倍显示，真实终点 2πi':'真实比例：整圈回到 0','note','middle');
 const cen={x:s.center,y:0};svg+=circle(q,cen,s.radius,C.green,'#edf1e7')+dot(q,{x:0,y:0},C.red,'Res=−1')+dot(q,{x:1,y:0},C.red,'Res=+1');const hit=Math.abs(s.radius-s.center)<.025||Math.abs(s.radius-(1-s.center))<.025,v=(s.radius>s.center?-1:0)+(s.radius>1-s.center?1:0);
 read=`左边 ∮z<sup>${n}</sup>dz = <strong>${n===-1?'2πi':'0'}</strong>　右边：${hit?'围道贴近极点，普通积分无定义（判定容差 0.025）。':`留数和 = ${v}，积分 = <strong>${v===0?'0':v<0?'−2πi':'2πi'}</strong>`}`;break;}
case'real':{
 const R=s.radius,g=plot(250,240,145/(R+.6),R+.3,'上半圆围道，极点 i 在内部');p=g.p;svg+=g.a+path(p,sample(t=>polar(R,t),0,Math.PI),C.green,2.5,'marker-end="url(#arrow)"')+vector(p,{x:-R,y:0},{x:R,y:0},C.orange,2.5)+dot(p,{x:0,y:1},C.red,'i');
 svg+=text(650,60,'目标与补路的贡献','plot-title','middle');const real=2*Math.atan(R),arc=Math.PI-real,upper=Math.PI*R/(R*R-1),unit=220/Math.PI;
 svg+=`<rect x="530" y="100" width="${real*unit}" height="32" rx="3" fill="${C.green}"/><rect x="${530+real*unit}" y="100" width="${arc*unit}" height="32" rx="3" fill="${C.orange}"/>`+text(530,90,'闭路总和 π','axis-title')+text(530,165,`实轴：${fmt(real,4)}`,'axis-title')+text(530,195,`圆弧：${fmt(arc,4)}`,'axis-title')+text(530,245,`圆弧绝对值上界：${fmt(upper,4)}`,'note')+text(530,285,'绿色 + 橙色 = π','note');
 read=`R = ${fmt(R)}　实轴积分 = <strong>${fmt(real,5)}</strong>　新增圆弧 = ${fmt(arc,5)}　上界 = ${fmt(upper,5)}　完整实轴极限 = π ≈ ${fmt(Math.PI,5)}`;break;}
}
svg+='</svg>';
if(window.matchMedia('(max-width:650px)').matches){
 const single=['point','multiply'].includes(L[index].id);
 if(single)svg=svg.replace('viewBox="0 0 840 400"','viewBox="210 0 420 400"');
 else{const cut=svg.indexOf('</defs>')+7,body=svg.slice(cut,-6),defs=svg.slice(svg.indexOf('<defs>')+6,cut-7);svg=`<svg viewBox="0 0 450 800" role="img" aria-label="上下排列的复平面对照实验"><defs>${defs}<clipPath id="left-panel"><rect width="450" height="400"/></clipPath><clipPath id="right-panel"><rect x="450" width="390" height="400"/></clipPath></defs><g clip-path="url(#left-panel)">${body}</g><g transform="translate(-450 400)" clip-path="url(#right-panel)">${body}</g></svg>`;}
}
$('#stage').innerHTML=svg;$('#readout').innerHTML=read;
}
function showLesson(i,scroll=true){stopAnimation();index=Math.max(0,Math.min(L.length-1,i));s={...L[index].defaults};const l=L[index];showView('learn',false);$('#chapter-label').textContent=`第 ${l.chapter} 章 / ${l.section}`;$('#lesson-title').textContent=l.title;$('#lesson-question').textContent=l.question;$('#experiment-label').textContent=l.label;$('#lesson-count').textContent=`实验 ${index+1} / 12`;
$('#explanation').innerHTML=`<div><h3>先看见什么</h3><p>${l.see}</p></div><div><h3>为什么会这样</h3><p>${l.why}</p></div><div class="pitfall"><strong>容易混淆的地方</strong>　${l.pitfall}</div>`;
$('#details').innerHTML=l.details;$('#task').innerHTML=`<div><strong>动手小任务</strong>${l.task}<span class="result" id="task-feedback" role="status"></span></div><button class="action-button" id="check-task">检查我的实验</button>`;$('#check-task').onclick=()=>{$('#task-feedback').textContent=l.check(s)?l.success:'还差一点。按任务调整参数，再观察图像与下方数值。'};
$('#quiz-question').textContent=l.quiz;$('#quiz-options').innerHTML=l.options.map((o,k)=>`<button data-option="${k}" class="${answers[index]===k?'selected':''}">${String.fromCharCode(65+k)}. ${o}</button>`).join('');$('#quiz-feedback').textContent=answers[index]===undefined?'':(answers[index]===l.answer?'答对了。':'再想一想。')+l.feedback;
$('#quiz-options').onclick=e=>{const b=e.target.closest('[data-option]');if(!b)return;answers[index]=Number(b.dataset.option);$$('#quiz-options button').forEach((x,k)=>x.classList.toggle('selected',k===answers[index]));$('#quiz-feedback').textContent=(answers[index]===l.answer?'答对了。':'再想一想。')+l.feedback;persist()};
$('#connections').innerHTML=l.links.map(k=>`<button data-lesson="${k}">${L[k].title} ↗</button>`).join('');$('#previous').disabled=index===0;$('#complete').textContent=index===11?'完成这次探索，回看全篇 →':'我理解了，继续 →';controls();renderStage();renderNav();persist();if(scroll)window.scrollTo({top:0,behavior:'instant'});location.hash=`lab-${l.id}`;
}
function renderNav(){let old=-1;$('#lesson-nav').innerHTML=L.map((l,i)=>{const head=old!==l.chapter?`<p class="nav-group-label">第 ${l.chapter} 章</p>`:'';old=l.chapter;return head+`<button data-lesson="${i}" class="${i===index?'active':''}"><span>${done.has(i)?'✓':String(i+1).padStart(2,'0')}</span>${l.title.split('，')[0]}</button>`}).join('')}
function showView(v,scroll=true){if(v!=='learn')stopAnimation();view=v;['map','learn','review'].forEach(k=>$(`#${k}-view`).hidden=k!==v);$$('nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='review')renderReview();if(v==='map')renderNetwork();if(scroll)window.scrollTo({top:0,behavior:'instant'})}
function renderNetwork(){
const nodes=[
 [0,30,75,'复数 · 模与幅角','平面上的一个点'],[1,30,145,'复数运算','平移、旋转、缩放'],[2,30,215,'复函数与初等函数','把整张平面变形'],[4,30,285,'极限 · 导数 · 解析','所有方向的局部规则'],[5,30,355,'多值性与分支','绕圈的历史藏在哪'],[3,30,425,'区域与连通性','允许在哪一片平面活动'],
 [6,335,120,'复积分','沿路径累积 f(z)dz'],[6,335,235,'柯西定理 · 原函数','条件下的闭路归零'],[7,335,350,'柯西积分公式','边界决定内部与导数'],
 [8,640,150,'幂级数 · 泰勒展开','局部函数的非负幂编码'],[8,640,265,'收敛圆','最近复奇点限制范围'],[9,640,380,'洛朗级数 · 孤立奇点','在圆环里加入负幂'],
 [10,930,185,'留数','只取负一次项系数'],[10,930,300,'留数定理','局部量汇成整体积分'],[11,930,415,'实积分与物理积分','选围道、算留数、估补路']];
const edges=[[0,1],[1,2],[1,3],[2,3],[2,4],[0,4],[5,4],[2,6],[3,7],[5,7],[6,7],[7,8],[3,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[6,13],[4,14],[5,13]];
let h='<defs><marker id="netarrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#b6c8ba"/></marker></defs>';
[[30,'01','解析函数'],[335,'02','解析函数积分'],[640,'03','复变函数级数'],[930,'05','留数理论']].forEach(([x,n,t])=>{h+=text(x,35,n,'subtitle')+text(x+30,35,t,'plot-title')});
edges.forEach(([a,b],i)=>{const A=nodes[a],B=nodes[b],same=A[1]===B[1],cross=i>=19;let d;if(same)d=`M${A[1]+110},${A[2]+54}L${B[1]+110},${B[2]}`;else{let sx=A[1]+220,sy=A[2]+27,tx=B[1],ty=B[2]+27;d=`M${sx},${sy}C${sx+45},${sy} ${tx-45},${ty} ${tx},${ty}`}h+=`<path d="${d}" class="net-edge ${cross?'cross':''}" marker-end="url(#netarrow)"/>`});
nodes.forEach(([i,x,y,title,sub])=>{h+=`<g class="net-node ${done.has(i)?'done':''}" data-lesson="${i}" role="button" tabindex="0" aria-label="探索${title}"><rect x="${x}" y="${y}" width="220" height="54" rx="8"/><text x="${x+14}" y="${y+23}" font-size="14">${title}${done.has(i)?' ✓':''}</text><text class="subtitle" x="${x+14}" y="${y+42}">${sub}</text></g>`});
$('#network').innerHTML=h;$('#chapter-paths').innerHTML=[['第 1 章','解析函数','6 个实验，把点、映射、解析性与分支连起来。',0],['第 2 章','解析函数积分','先沿路径累积，再用解析性与边界解释积分。',6],['第 3 章','复变函数级数','从收敛圆进入圆环，理解负幂与奇点。',8],['第 5 章','留数理论','负一次项为什么特殊？怎样用它求实积分？',10]].map(([n,t,d,i])=>`<div class="chapter-path"><span>${n}</span><h3>${t}</h3><p>${d}</p><button class="text-button" data-lesson="${i}">进入这一章 ↗</button></div>`).join('');
}
function renderReview(){const correct=L.filter((l,i)=>answers[i]===l.answer).length;$('#review-body').innerHTML=`<div class="review-summary">已探索 ${done.size} / 12 个实验，概念自测答对 ${correct} / 12。<div class="progress-bar"><i style="width:${done.size/12*100}%"></i></div>建议顺序：第一章打底，再用“积分 → 级数 → 留数”走通整条链。可按需要跳着回看。</div>`+L.map((l,i)=>`<div class="review-row"><span class="num">${done.has(i)?'✓':String(i+1).padStart(2,'0')}</span><div><h3>${l.title}</h3><p>第 ${l.chapter} 章 · ${answers[i]===undefined?'尚未自测':answers[i]===l.answer?'自测答对':'建议重看解释，再试一次'}</p></div><button data-lesson="${i}">回到实验 ↗</button></div>`).join('')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-lesson]');if(b)showLesson(Number(b.dataset.lesson));const v=e.target.closest('[data-view]');if(v){v.dataset.view==='learn'?showLesson(index):showView(v.dataset.view);if(v.dataset.view!=='learn')location.hash=v.dataset.view}});
document.addEventListener('keydown',e=>{const b=e.target.closest('.net-node');if(b&&(e.key==='Enter'||e.key===' ')){e.preventDefault();showLesson(Number(b.dataset.lesson))}});
$('#start').onclick=()=>showLesson(0);$('#continue').onclick=()=>showLesson(index);$('.back-map').onclick=()=>{showView('map');location.hash='map'};$('.brand').onclick=e=>{e.preventDefault();showView('map');location.hash='map'};
$('#previous').onclick=()=>showLesson(index-1);$('#complete').onclick=()=>{done.add(index);persist();if(index===11){showView('review');location.hash='review'}else showLesson(index+1)};
$('#reset').onclick=()=>{stopAnimation();s={...L[index].defaults};controls();renderStage();$('#task-feedback').textContent=''};
$('#sources-toggle').onclick=()=>{$('#sources').hidden=!$('#sources').hidden};
$('#stage').addEventListener('pointerdown',e=>{if(!e.target.closest('[data-drag]')||!dragPlot)return;const svg=$('#stage svg'),matrix=svg.getScreenCTM();if(!matrix)return;drag={p:dragPlot,svg,inverse:matrix.inverse()};$('#stage').setPointerCapture(e.pointerId);e.preventDefault()});
$('#stage').addEventListener('pointermove',e=>{if(!drag)return;const pt=drag.svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const loc=pt.matrixTransform(drag.inverse);const cap=L[index].id==='point'?3:L[index].id==='mapping'?2.8:L[index].id==='cauchy'?2.8:2;const clamp=v=>Math.max(-cap,Math.min(cap,Math.round(v*20)/20));s.x=clamp((loc.x-drag.p.cx)/drag.p.unit);s.y=clamp((drag.p.cy-loc.y)/drag.p.unit);if(L[index].id==='mapping')s.x=Math.max(-1.8,Math.min(1.8,s.x));for(const k of ['x','y']){const input=$('#'+k),out=$('#out-'+k);if(input)input.value=s[k];if(out)out.textContent=fmt(s[k])}renderStage();e.preventDefault()});
document.addEventListener('pointerup',()=>drag=null);document.addEventListener('pointercancel',()=>drag=null);
window.addEventListener('resize',()=>{if(view==='learn')renderStage()});
const hash=location.hash.slice(1);const hi=L.findIndex(l=>'lab-'+l.id===hash);updateProgress();renderNetwork();if(hi>=0)showLesson(hi,false);else if(hash==='review')showView('review',false);
// Expose pure arithmetic only, for deterministic checks of the teaching examples.
window.ComplexLabMath={add,sub,mul,div,pow,func,polar};
})();
