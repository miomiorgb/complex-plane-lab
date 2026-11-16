/* Mathematical explanations and TeX sources. Rendered by proofs.js. */
(() => {
'use strict';
const t=String.raw;
window.PROOFS=[
{
 id:'euler',chapter:1,title:'欧拉公式 → 乘法的旋转缩放',lab:1,needs:[],
 introduction:t`实数乘法可以改变长度，复数乘法还能改变方向。关键是把复数写成“长度乘单位方向”的形式；欧拉公式把这个方向与熟悉的正弦、余弦连接起来。`,
 condition:t`这里用幂级数定义复指数、正弦和余弦。它们在整个复平面绝对收敛，因此可以拆分奇偶项、相乘并重新分组。欧拉公式中的角度 \(\theta\) 为实数，单位是弧度。`,
 symbols:[
  {symbol:t`i`,meaning:t`虚数单位，满足 \(i^2=-1\)。`},
  {symbol:t`\theta,\varphi\in\mathbb R`,meaning:'分别表示两个方向角，逆时针为正。'},
  {symbol:t`r,\rho\ge0`,meaning:'两个复数的模，即到原点的距离；非零复数才有确定的方向。'},
  {symbol:t`n!,\quad n=0,1,2,\ldots`,meaning:t`阶乘，\(n!=1\cdot2\cdots n\)，并约定 \(0!=1\)。`}
 ],
 result:t`\begin{aligned}e^{i\theta}&=\cos\theta+i\sin\theta,\\(\rho e^{i\varphi})(r e^{i\theta})&=\rho r e^{i(\varphi+\theta)}.\end{aligned}`,
 steps:[
  ['指数从一个收敛的和定义',t`e^z=\sum_{n=0}^{\infty}\frac{z^n}{n!}`,t`对任意固定的复数 \(z\)，相邻项模之比为 \(|z|/(n+1)\)，趋于零。所以这个无限和确实给出一个复数。`,'部分和是一串复数向量的首尾相加。'],
  ['纯虚指数的实部和虚部分开',t`\begin{aligned}e^{i\theta}={}&\left(1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots\right)\\&+i\left(\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots\right).\end{aligned}`,t`\(i\) 的幂按 \(1,i,-1,-i\) 循环。偶数幂留下实数，奇数幂带有因子 \(i\)；绝对收敛保证这样分组不改变和。`,'两组和分别落在实轴与虚轴上。'],
  ['两组和就是余弦与正弦',t`e^{i\theta}=\cos\theta+i\sin\theta,\qquad |e^{i\theta}|=1`,t`两个括号正是余弦、正弦的幂级数。再由 \(\cos^2\theta+\sin^2\theta=1\)，得到模为一。`,t`\(e^{i\theta}\) 是单位圆上与正实轴成角 \(\theta\) 的点。`],
  ['两个方向相乘，角度相加',t`e^ze^w=\sum_{n=0}^{\infty}\frac{1}{n!}\sum_{k=0}^{n}\binom nk z^kw^{n-k}=e^{z+w}`,t`两个绝对收敛级数可以按总次数相乘。内层和由二项式定理成为 \((z+w)^n\)。把 \(z,w\) 换成纯虚数，再乘上长度，便得到模相乘、幅角相加。`,'两次旋转接在一起，总转角是两角之和。']
 ],
 example:{question:t`把 \(1+i\) 乘以 \(-2i\)，位置怎样变？`,formula:t`(-2i)(1+i)=2-2i`,explanation:t`\(-2i\) 的模为二、幅角可取 \(-\pi/2\)。原箭头顺时针转九十度、长度变为两倍，正好到达 \(2-2i\)。`},
 pitfall:t`幅角相差 \(2k\pi\) 表示同一方向，不能把幅角增加一圈误当作复数改变。零复数仍会被乘到零，不能给它指定唯一幅角。`,
 check:['乘一个模为一的复数，会改变原箭头的长度吗？',t`不会。新长度等于原长度乘一，只改变方向；乘 \(i\) 就逆时针转 \(\pi/2\)。`]
},
{
 id:'roots',chapter:1,title:'n 次根与复对数为什么多值',lab:5,needs:['euler'],
 introduction:t`平方把角度加倍，因此反过来开平方时，一个方向会对应两个可能的方向。复对数也有同样的问题：指数只记录最终方向，无法区分绕过几圈。`,
 condition:t`令 \(z\ne0\)，写为 \(z=re^{i\theta}\)，其中 \(r>0\)。根的次数 \(n\) 为正整数。下面的主支对数定义在去掉非正实轴的开域 \(\mathbb C\setminus(-\infty,0]\) 上。`,
 symbols:[
  {symbol:t`z=re^{i\theta}`,meaning:t`已知非零复数；\(r\) 为模，\(\theta\) 是任选的一个幅角。`},
  {symbol:t`w_k`,meaning:t`方程 \(w^n=z\) 的第 \(k\) 个根，\(k=0,\ldots,n-1\)。`},
  {symbol:t`\log z,\ \operatorname{Log}z`,meaning:'前者表示全部对数值；后者表示选定的单值主支。'},
  {symbol:t`\operatorname{Arg}z`,meaning:t`主支使用的连续角度，满足 \(-\pi<\operatorname{Arg}z<\pi\)。对数公式中的 \(k\) 可取任意整数。`}
 ],
 result:t`\begin{aligned}w_k&=r^{1/n}e^{i(\theta+2k\pi)/n},\\\log z&=\ln r+i(\theta+2k\pi).\end{aligned}`,
 steps:[
  ['根的长度与角度分别受限制',t`w=se^{i\varphi},\quad w^n=z\ \Longrightarrow\ s^n=r,\quad n\varphi=\theta+2k\pi`,t`非零复数相等时，模必须相等，幅角只需相差整圈。这里 \(s>0\)，所以长度方程有唯一正解。`,'方向相同的箭头，角度可以相差任意整圈。'],
  ['把转角除以根的次数',t`s=r^{1/n},\qquad \varphi=\frac{\theta+2k\pi}{n},\quad k=0,\ldots,n-1`,t`相邻根的角度差为 \(2\pi/n\)。当 \(k\) 增加 \(n\) 时，根的角度多一整圈，便重复原来的根，因此只有 \(n\) 个不同根。`,'这些根是同一圆周上的等分点。'],
  ['对数也是在反解角度',t`e^{u+iv}=re^{i\theta}\ \Longrightarrow\ u=\ln r,\quad v=\theta+2k\pi`,t`欧拉公式给出 \(e^{u+iv}\) 的模为 \(e^u\)、方向为 \(v\)。比较模和方向，就得到所有对数值；这里 \(k\) 没有上限。`,'同一终点对应许多绕圈历史。'],
  ['选定分支，才能得到连续的单值函数',t`\operatorname{Log}z=\ln|z|+i\operatorname{Arg}z,\qquad -\pi<\operatorname{Arg}z<\pi`,t`去掉非正实轴后，角度可以在这个区间内连续变化。若连续绕原点一圈，角度必增加 \(2\pi\)，所以同一连续对数值会增加 \(2\pi i\)，不可能在整个去心平面上既连续又单值。`,'割线阻止路径在定义域内完整绕原点。']
 ],
 example:{question:'负一的两个平方根是什么？',formula:t`w_0=e^{i\pi/2}=i,\qquad w_1=e^{3i\pi/2}=-i`,explanation:t`取 \(r=1,\theta=\pi,n=2\)。两个根的方向相差 \(\pi\)，平方后方向都变成 \(\pi\) 模 \(2\pi\)。`},
 pitfall:t`主支只选出全部值中的一个。跨过割线时，不能把主值的跳变当作函数在该处连续；原点也不属于对数的定义域。`,
 check:['连续跟踪平方根，输入绕原点一圈后为何变号？',t`输入角增加 \(2\pi\)，根的角增加 \(\pi\)，即乘以 \(-1\)。再绕一圈，根才回到原值。`]
},
{
 id:'cr',chapter:1,title:'从复导数定义推出 C–R 条件',lab:4,needs:[],
 introduction:t`复导数比较输出变化与输入变化的比值。输入可以沿任何方向靠近，因此水平和竖直方向算出的比值必须一致；这项要求正是 C–R 方程的来源。`,
 condition:t`必要性只假设 \(f\) 在 \(z_0\) 复可导。反过来，若实部、虚部在 \((x_0,y_0)\) 实可微并满足 C–R 方程，就能推出该点复可导；仅有两个偏导存在还不够。`,
 symbols:[
  {symbol:t`z=x+iy,\quad z_0=x_0+iy_0`,meaning:'复自变量与考察点；两个坐标均为实数。'},
  {symbol:t`f(z)=u(x,y)+iv(x,y)`,meaning:'实值函数 u、v 分别是 f 的实部与虚部。'},
  {symbol:t`u_x,u_y,v_x,v_y`,meaning:'分别对实坐标 x、y 求偏导；本节没有注明时均在考察点计算。'},
  {symbol:t`h=\Delta x+i\Delta y`,meaning:t`输入的复增量。\(o(|h|)\) 表示其模除以 \(|h|\) 后趋于零的误差。`}
 ],
 result:t`u_x=v_y,\qquad u_y=-v_x,\qquad f'(z_0)=u_x+iv_x`,
 steps:[
  ['沿水平方向计算',t`\lim_{\Delta x\to0}\frac{f(z_0+\Delta x)-f(z_0)}{\Delta x}=u_x+iv_x`,t`这里 \(y\) 不变，两个分量的差商分别成为对 \(x\) 的偏导。若复导数存在，这个方向的极限必须等于它。`,'水平小位移测出一个局部复乘数。'],
  ['沿竖直方向应得到同一结果',t`\lim_{\Delta y\to0}\frac{f(z_0+i\Delta y)-f(z_0)}{i\Delta y}=v_y-iu_y`,t`先得到 \((u_y+iv_y)/i\)，再用 \(1/i=-i\)。与水平方向的结果比较实部、虚部，就得到两条 C–R 方程。`,'换一个接近方向，局部乘数不能改变。'],
  ['实可微控制所有方向的误差',t`\Delta f=(u_x\Delta x+u_y\Delta y)+i(v_x\Delta x+v_y\Delta y)+o(|h|)`,t`实可微的含义是：二维函数具有这样的线性近似，而且余项对任意趋近路径都足够小。这个保证比偏导存在更强。`,'不只是两根探针，整个小邻域都由同一线性近似描述。'],
  ['代入 C–R，合并成复数乘法',t`\Delta f=(u_x+iv_x)h+o(|h|)\quad\Longrightarrow\quad \frac{\Delta f}{h}\longrightarrow u_x+iv_x`,t`用 \(u_y=-v_x\)、\(v_y=u_x\) 代换后，一次项恰好可提出 \(h\)。误差除以 \(h\) 后趋于零，因此极限与方向无关。`,'局部规则变成“每个小箭头都乘同一个复数”。']
 ],
 example:{question:t`对 \(f(z)=z^2\)，两条方程是否成立？`,formula:t`u=x^2-y^2,\quad v=2xy,\qquad u_x=v_y=2x,\quad u_y=-v_x=-2y`,explanation:t`这些偏导在整个平面连续，故实可微。C–R 在每一点成立，得到 \(f'(z)=2x+2iy=2z\)。`},
 pitfall:t`一点复可导不等于在该点解析；解析要求某个邻域内处处可导。例如 \(|z|^2\) 仅在零点复可导。只比较两条路径可以否定可导性，通常不能证明可导性。`,
 check:[t`\(f(z)=\overline z\) 为什么不可复导？`,t`此时 \(u=x,v=-y\)，所以 \(u_x=1\)、\(v_y=-1\)，必要的 C–R 条件不成立。`]
},
{
 id:'harmonic',chapter:1,title:'解析函数 → 调和函数与正交曲线',lab:4,needs:['cr'],
 introduction:t`解析函数的实部和虚部不是两个随意拼接的函数。C–R 方程将它们的变化联系起来，进一步迫使各自的二阶偏导相消，并让两组正则等值线垂直相交。`,
 condition:t`设 \(f=u+iv\) 在开域内解析。以下偏导计算使用 \(u,v\) 的连续二阶偏导；解析函数确有这种光滑性，可在柯西积分公式之后证明。等值线的正交结论还要求交点处梯度非零。`,
 symbols:[
  {symbol:t`u,v`,meaning:'解析函数的实部和虚部，均是两个实坐标 x、y 的函数。'},
  {symbol:t`\Delta u=u_{xx}+u_{yy}`,meaning:'二维拉普拉斯算子；结果为零的二阶连续可微函数称为调和函数。'},
  {symbol:t`\nabla u=(u_x,u_y)`,meaning:'梯度，指向 u 增长最快的方向；非零时垂直于 u 的等值线。'},
  {symbol:t`\nabla u\cdot\nabla v`,meaning:'两个实向量的点积；非零向量点积为零表示正交。'}
 ],
 result:t`\Delta u=\Delta v=0,\qquad \nabla u\cdot\nabla v=0`,
 steps:[
  ['对两条 C–R 方程再求一次偏导',t`u_x=v_y\ \Longrightarrow\ u_{xx}=v_{yx},\qquad u_y=-v_x\ \Longrightarrow\ u_{yy}=-v_{xy}`,t`第一式对 \(x\) 求导，第二式对 \(y\) 求导。二阶偏导连续保证两个混合偏导 \(v_{yx}\)、\(v_{xy}\) 相等。`,'横向和纵向的二阶变化将相互抵消。'],
  ['相加得到调和方程',t`u_{xx}+u_{yy}=0,\qquad v_{xx}+v_{yy}=0`,t`实部的两个混合偏导一正一负。虚部也可由 \(v_x=-u_y\)、\(v_y=u_x\) 进行同样计算。`,'两种坐标方向的曲率之和为零。'],
  ['梯度之间是四分之一圈的旋转',t`\nabla v=(-u_y,u_x),\qquad \nabla u\cdot\nabla v=0`,t`把 C–R 代入梯度就得到这个关系。在梯度非零的点，两组等值线的法向量正交，因此切向量也正交。`,'同一个非零向量旋转九十度，得到另一个法向量。']
 ],
 example:{question:t`已知 \(u=x^2-y^2\)，求一个使 \(u+iv\) 解析的虚部。`,formula:t`v_y=2x,\quad v_x=2y\quad\Longrightarrow\quad v=2xy+C`,explanation:t`先由第一式积分得 \(v=2xy+A(x)\)，再代入第二式得到 \(A'(x)=0\)。实常数 \(C\) 不改变偏导。`},
 pitfall:t`梯度为零时，等值集合未必是一条有确定切线的光滑曲线。两个任意调和函数也未必满足 C–R，不能直接组成解析函数。`,
 check:[t`\(u=x^2-y^2\) 与 \(v=2xy\) 在原点能直接用梯度证明等值线正交吗？`,t`不能。两个梯度在原点都为零；正则等值线的论证不适用于这个临界点。`]
},
{
 id:'conformal',chapter:1,title:'复导数为什么意味着局部保角',lab:4,needs:['cr','euler'],
 introduction:t`两条曲线经过同一点时，夹角由各自的切向量决定。如果函数在这个点附近把所有微小方向都乘以同一个非零复数，两根切向量一起转动，夹角就不会改变。`,
 condition:t`设 \(f\) 在 \(z_0\) 的邻域解析，且 \(A=f'(z_0)\ne0\)。比较经过 \(z_0\) 的两条光滑曲线，其切向量均非零。保留的是局部的有向夹角，不是任意有限线段的夹角或长度。`,
 symbols:[
  {symbol:t`z_0`,meaning:t`映射前的考察点；对应的像点为 \(f(z_0)\)。`},
  {symbol:t`A=f'(z_0)`,meaning:'局部线性变化的复乘数；非零是本结论的关键条件。'},
  {symbol:t`z_j'(t_0),\ w_j'(t_0)`,meaning:t`第 \(j\) 条曲线映射前后的切向量，\(j=1,2\)。`},
  {symbol:t`|A|,\ \arg A`,meaning:'分别是局部长度倍率和共同转角；角度等式按整圈理解。'}
 ],
 result:t`|w_j'|=|f'(z_0)|\,|z_j'|,\qquad \arg\frac{w_2'}{w_1'}=\arg\frac{z_2'}{z_1'}`,
 steps:[
  ['差商极限等价于局部线性近似',t`f(z_0+h)-f(z_0)=Ah+o(|h|)`,t`复导数存在，意味着把输入增量 \(h\) 乘以 \(A\)，就已经给出输出的一阶变化；其余误差相对 \(|h|\) 趋于零。`,'放大考察点附近，映射越来越像一次复数乘法。'],
  ['两条切向量都乘同一个数',t`w_j(t)=f(z_j(t))\quad\Longrightarrow\quad w_j'(t_0)=A z_j'(t_0)`,t`沿实参数 \(t\) 用链式法则。两条曲线通过同一个点，所以使用的是同一个导数 \(A\)，并且像切向量仍非零。`,'两根小箭头一起旋转、一起伸缩。'],
  ['共同倍率与共同转角相消',t`\frac{w_2'}{w_1'}=\frac{Az_2'}{Az_1'}=\frac{z_2'}{z_1'}`,t`切向量之比的幅角就是两者的有向夹角。约去非零的 \(A\) 后，角差保持不变；分别取模则得到共同的长度倍率。`,'旋转可以改变朝向，但不能改变两根箭头之间的夹角。']
 ],
 example:{question:t`平方映射在 \(z_0=1+i\) 附近怎样改变小图形？`,formula:t`f'(1+i)=2+2i=2\sqrt2\,e^{i\pi/4}`,explanation:t`局部长度约放大 \(2\sqrt2\) 倍，方向约逆时针转 \(\pi/4\)。两条正则曲线的交角保持不变。`},
 pitfall:t`若 \(f'(z_0)=0\)，约去导数和比较像切向量的步骤就失效。例如 \(z^2\) 在原点使射线夹角加倍。共轭映射会反转有向角，也不属于这里的解析保角。`,
 check:[t`\(f'(z_0)=0\) 时，还能称所有微小方向都经历一个非零的旋转缩放吗？`,'不能。此时一阶线性部分退化为零，需要检查更高阶项，不能套用上述保角结论。']
},
{
 id:'elementary',chapter:1,title:'求导规则 → 幂、指数、对数与三角函数',lab:2,needs:['euler','cr','roots'],
 introduction:t`复导数要求的极限更强，但极限一旦存在，乘积、复合和倒数仍按熟悉的规则求导。初等函数的公式可以由这些规则逐一得到；对数需要额外记住分支。`,
 condition:t`所用函数在考察点复可导；取商时分母非零。整数幂的负指数只在 \(z\ne0\) 使用。\(\operatorname{Log}\) 表示已在开域上选好的解析对数分支；级数逐项求导使用紧圆盘上的一致收敛。`,
 symbols:[
  {symbol:t`f',g'`,meaning:'分别为两个复函数的导数；复合函数还要求 g(z) 落在 f 的定义域内。'},
  {symbol:t`n\in\mathbb Z`,meaning:'整数幂的指数；零次幂是常数一。'},
  {symbol:t`\operatorname{Log}z`,meaning:'单值解析对数分支，满足其指数等于 z，所在开域不含零。'},
  {symbol:t`\sin z,\cos z`,meaning:'用复指数定义的正弦、余弦，定义在整个复平面。'}
 ],
 result:t`\begin{aligned}(z^n)'&=nz^{n-1}\quad(n\ne0),&(e^z)'&=e^z,\\(\operatorname{Log}z)'&=\frac1z,&(\sin z)'&=\cos z.\end{aligned}`,
 steps:[
  ['一次变化给出乘积与复合规则',t`(fg)'=f'g+fg',\qquad (f\circ g)'=f'(g)g'`,t`把 \(f(z+h)\)、\(g(z+h)\) 各写成常数项加一次项与小余项。相乘时只有两个一次变化留下；复合时则把内层增量代入外层的线性近似。`,'两次局部变化相接时，局部复乘数相乘。'],
  ['倒数由通分得到',t`\left(\frac1g\right)'=-\frac{g'}{g^2},\qquad \left(\frac fg\right)'=\frac{f'g-fg'}{g^2}`,t`倒数差商通分后，分子是 \(-[g(z+h)-g(z)]\)，分母趋向 \(g(z)^2\ne0\)。再结合乘积规则，便得到商的规则。`,'分母非零保证倒数的局部变化有意义。'],
  ['正整数幂只留下一次项',t`\frac{(z+h)^n-z^n}{h}=nz^{n-1}+\sum_{k=2}^{n}\binom nk z^{n-k}h^{k-1}`,t`二项式展开中，余下每项都含正次幂的 \(h\)，所以趋于零。零次幂单独作为常数处理，负整数幂再用倒数规则。`,'差商只提取增量的一次系数。'],
  ['指数级数求导后仍是自身',t`(e^z)'=\sum_{n=1}^{\infty}\frac{nz^{n-1}}{n!}=\sum_{k=0}^{\infty}\frac{z^k}{k!}=e^z`,t`原级数及导数级数在任意紧圆盘上一致收敛，允许逐项微分。求导出现的 \(n\) 恰好消掉阶乘中的一项。`,'各项下移一阶后，无限和恢复原来的形式。'],
  ['对数的导数来自反函数关系',t`e^{L(z)}=z\quad\Longrightarrow\quad e^{L(z)}L'(z)=1\quad\Longrightarrow\quad L'(z)=\frac1z`,t`在选定的解析分支上应用链式法则。不同分支相差常数 \(2k\pi i\)，所以导数相同，但定义域仍要分别说明。`,'局部互逆的两种变化，变化率互为倒数。'],
  ['三角函数由复指数求导',t`\sin z=\frac{e^{iz}-e^{-iz}}{2i}\quad\Longrightarrow\quad (\sin z)'=\frac{e^{iz}+e^{-iz}}2=\cos z`,t`对两个指数使用链式法则，内层导数分别为 \(i\)、\(-i\)。同样可得到余弦、双曲正弦和双曲余弦的导数。`,'内部的方向因子也是链式法则的一部分。']
 ],
 example:{question:t`\(e^{z^2}\) 与 \((e^z)^2\) 的导数是否相同？`,formula:t`\frac{d}{dz}e^{z^2}=2ze^{z^2},\qquad \frac{d}{dz}(e^z)^2=2e^{2z}`,explanation:t`第一个函数的内层是 \(z^2\)；第二个可先化成 \(e^{2z}\)。把指数与函数值的平方分清，才能选对内层导数。`},
 pitfall:t`导数公式相同不表示对数的分支可以忽略。表达式 \(e^{z^2}\) 与 \((e^z)^2\) 也不能用含糊的同一行上标代替。`,
 check:[t`\(e^{3z}\) 的导数为什么要多一个三？`,t`链式法则给出外层导数 \(e^{3z}\) 乘以内层 \(3z\) 的导数三，即 \(3e^{3z}\)。`]
},
{
 id:'integral',chapter:2,title:'复积分参数化与 ML 估计',lab:6,needs:['euler'],
 introduction:t`沿曲线积累函数值时，每一小步都有长度和方向。复积分把这一小步记为 \(dz\)，先乘上当地的函数值，再把所有贡献相加。把路线改用一个实参数描述，就能用实积分计算。`,
 condition:t`曲线 \(C\) 由 \(z=z(t)\)、\(\alpha\le t\le\beta\) 分段光滑地给出，\(f\) 在曲线上连续。估计中取有限常数 \(M\ge\sup_{z\in C}|f(z)|\)，\(L\) 是曲线弧长。函数不必在曲线内部解析。`,
 symbols:[
  {symbol:t`C,\ z(t)`,meaning:'有指定行进方向的曲线及其参数化；参数增加的方向就是积分方向。'},
  {symbol:t`\alpha,\beta,t\in\mathbb R`,meaning:'实参数的起点、终点和中间值，α 小于 β。'},
  {symbol:t`dz=z'(t)\,dt`,meaning:t`带方向的复位移；弧长微元则为非负实数 \(ds=|z'(t)|\,dt\)。`},
  {symbol:t`M,L`,meaning:t`曲线上函数模的上界和总弧长；\(ML\) 只给积分模的上界。`}
 ],
 result:t`\begin{aligned}\int_Cf(z)\,dz&=\int_\alpha^\beta f(z(t))z'(t)\,dt,\\\left|\int_Cf(z)\,dz\right|&\le ML.\end{aligned}`,
 steps:[
  ['小位移改写成参数增量',t`\sum_j f(z_j^*)\,\Delta z_j\ \longrightarrow\ \int_\alpha^\beta f(z(t))z'(t)\,dt`,t`在每个光滑小段上，\(\Delta z_j\) 近似于 \(z'(t_j)\Delta t_j\)。把分段取细，复数黎曼和就变成右边的实参数积分；分段光滑的接点分开相加即可。`,'路线每一段的方向都包含在复位移里。'],
  ['复积分也可拆成两个实积分',t`(u+iv)(dx+i\,dy)=(u\,dx-v\,dy)+i(v\,dx+u\,dy)`,t`将 \(f=u+iv\) 与 \(dz=dx+i\,dy\) 相乘并用 \(i^2=-1\)。因此两个实分量都同时受函数值和路线方向影响。`,'同一个函数值沿不同方向走，会产生不同的复贡献。'],
  ['取模后用函数上界与弧长估计',t`\begin{aligned}\left|\int_C f\,dz\right|&\le\int_\alpha^\beta |f(z(t))|\,|z'(t)|\,dt\\&\le M\int_\alpha^\beta|z'(t)|\,dt=ML.\end{aligned}`,t`第一步使用积分的三角不等式，第二步用 \(|f|\le M\)。最后一个积分正是曲线长度；方向相消会使真实积分更小。`,'首尾位移的长度，不超过所有小箭头长度之和。'],
  ['沿圆计算一个基本积分',t`\begin{aligned}z&=a+re^{it},\quad dz=ire^{it}\,dt,\\\oint_{|z-a|=r}\frac{dz}{z-a}&=\int_0^{2\pi}i\,dt=2\pi i.\end{aligned}`,t`圆按逆时针走一圈，\(r>0\)。分母中的 \(re^{it}\) 与位移中的同一因子抵消，结果不依赖半径；反向行进时结果变号。`,'被积函数的反向旋转，恰好抵消圆周位移的旋转。']
 ],
 example:{question:t`沿 \(|z|=r\) 逆时针一圈，\(\overline z\,dz\) 的积分是多少？`,formula:t`\oint_{|z|=r}\overline z\,dz=\int_0^{2\pi}(re^{-it})(ire^{it})\,dt=2\pi i r^2`,explanation:t`这里 \(\overline z=re^{-it}\)。两种方向因子抵消，但还留下 \(r^2\)，所以该积分会随圆的大小改变。`},
 pitfall:t`\(dz\) 带方向，\(ds\) 只有长度。不能把两者互换，也不能把 \(ML\) 当成积分的精确值。`,
 check:[t`把同一条曲线的方向倒过来，复积分会怎样？`,'结果乘以负一。每个小位移都反向，而函数在相应位置的值不变。']
},
{
 id:'goursat',chapter:2,title:'柯西定理：从三角形到闭路',lab:6,needs:['cr','integral'],
 introduction:t`解析函数的局部变化是一种统一的复数乘法。柯西定理说明：只要函数在闭路围住的区域内一直解析，沿闭路积累的贡献就会相消。三角形版本能把这种局部规律严格传到整条边界。`,
 condition:t`先设闭三角形 \(T\) 及内部包含在 \(f\) 的解析开域内。单连通推广版要求 \(f\) 在单连通开域 \(D\) 内解析，\(C\) 是 \(D\) 中任意分段光滑闭路。这里解析指每一点的某邻域内处处复可导，不另假定导数连续。`,
 symbols:[
  {symbol:t`I(T)=\oint_{\partial T}f(z)\,dz`,meaning:'沿三角形正向边界的积分；正向是逆时针。'},
  {symbol:t`T_n,d_n,L_n`,meaning:'第 n 次选中的子三角形、其直径和周长；n 为非负整数。'},
  {symbol:t`z_*,\ \varepsilon(z)`,meaning:t`嵌套三角形的共同极限点与可导展开的误差系数，\(\varepsilon(z)\to0\)。`},
  {symbol:t`D,C`,meaning:'推广版的单连通解析域，以及完全位于该域内的闭路。'}
 ],
 result:t`\oint_C f(z)\,dz=0`,
 steps:[
  ['边界积分可以分给四个小三角形',t`I(T)=\sum_{j=1}^4 I(T_j),\qquad \max_j|I(T_j)|\ge\frac{|I(T)|}{4}`,t`连接三边中点后，内部公共边被沿相反方向走过，积分相消。若四个小积分的模都小于右侧，三角不等式就与总积分相矛盾。`,'内部边消失，只留下原三角形的外边界。'],
  ['反复保留其中积分最大的子块',t`|I(T_0)|\le4^n|I(T_n)|,\qquad d_n=\frac{d_0}{2^n},\quad L_n=\frac{L_0}{2^n}`,t`不断四分并选择最大者，得到嵌套闭三角形。直径趋于零，所以它们收缩到共同点 \(z_*\)，这个点仍在原来的解析域内。`,'总积分的信息被压缩到越来越小的邻域。'],
  ['在共同点作可导展开',t`f(z)=f(z_*)+f'(z_*)(z-z_*)+\varepsilon(z)(z-z_*)`,t`复可导保证 \(\varepsilon(z)\to0\)，并可补定义 \(\varepsilon(z_*)=0\)。常数项和一次项的原函数可直接写成一次、二次多项式，沿闭边界积分都为零，因而只剩误差项。`,'严格线性的局部变化不会留下闭路贡献。'],
  ['余项估计迫使原积分为零',t`\begin{aligned}|I(T_n)|&\le\sup_{T_n}|\varepsilon|\,\frac{d_0L_0}{4^n},\\|I(T_0)|&\le\sup_{T_n}|\varepsilon|\,d_0L_0\longrightarrow0.\end{aligned}`,t`小三角形上的 \(|z-z_*|\) 不超过其直径，用 ML 估计得到第一式。放大系数 \(4^n\) 恰好被直径和周长的缩小抵消，最后由可导余项趋零得证。`,'非线性余量缩小得足够快，无法留下非零积分。'],
  ['从三角形传到单连通域的闭路',t`f\text{ 在单连通域 }D\text{ 解析}\quad\Longrightarrow\quad\oint_Cf(z)\,dz=0`,t`有限三角片拼成的区域仍靠公共边相消。一般闭路的推广还使用域内路径变形与局部覆盖：闭路能在解析域内收缩。此处给出推广思路，完整的路径变形论证并未由一张三角形图代替。`,'没有解析障碍时，边界可以逐步缩去。']
 ],
 example:{question:t`为什么 \(1/z\) 沿单位圆的积分不适用闭路归零？`,formula:t`\oint_{|z|=1}\frac{dz}{z}=2\pi i\ne0`,explanation:t`函数在圆周上连续并解析，却在圆内的零点没有定义。它在去心平面解析，但去心平面不是单连通域，因此定理的前提没有满足。`},
 pitfall:t`只在路径附近解析不够。域有洞也不意味着每个解析函数的闭路积分都非零；例如 \(f(z)=z\) 始终有原函数 \(z^2/2\)。`,
 check:[t`\(f(z)=z^2\) 在任意分段光滑闭路上的积分是多少？`,t`为零。它在整个复平面解析，也可以直接使用原函数 \(z^3/3\)。`]
},
{
 id:'primitive',chapter:2,title:'闭路归零 → 原函数与路径无关',lab:6,needs:['goursat'],
 introduction:t`如果从同一起点走到同一终点的累积值总相同，就能用这个累积值定义一个新函数。它的导数恢复原来的被积函数，这就是原函数与路径无关的联系。`,
 condition:t`设 \(D\) 是开且连通的区域，\(f\) 在 \(D\) 连续，且域内所有分段光滑闭路的积分为零。在单连通域内解析，是保证这些条件的一种情形。所有路径必须完全留在 \(D\) 内。`,
 symbols:[
  {symbol:t`z_0\in D`,meaning:'定义累积函数时固定的起点。'},
  {symbol:t`F(z)=\int_{z_0}^{z}f(\zeta)\,d\zeta`,meaning:'从固定起点到终点的累积值；ζ 是积分用的变量，z 是终点。'},
  {symbol:t`A,B,C_1,C_2`,meaning:'两个端点，以及从 A 到 B 的两条域内路径。'},
  {symbol:t`F'=f`,meaning:'F 是 f 的原函数；任意常数加到 F 上，不改变这个关系。'}
 ],
 result:t`F'(z)=f(z),\qquad \int_A^B f(z)\,dz=F(B)-F(A)`,
 steps:[
  ['两条走法之差是一条闭路',t`\int_{C_1}f\,dz-\int_{C_2}f\,dz=\oint_{C_1-C_2}f\,dz=0`,t`沿第一条路从 \(A\) 到 \(B\)，再沿第二条反向返回，就拼成闭路。闭路归零，因此两次积分相同。`,'多走出来的一圈没有额外贡献。'],
  ['终点可以对应唯一的累积值',t`F(z)=\int_{z_0}^{z}f(\zeta)\,d\zeta`,t`区域开且连通，保证可用分段光滑路径连接起点与终点。路径无关使定义不必附带走法。`,'每个点获得一个由终点决定的数值。'],
  ['短距离差商读取当地函数值',t`\frac{F(z+h)-F(z)}{h}=\int_0^1 f(z+th)\,dt\longrightarrow f(z)`,t`在 \(z\) 附近取包含在域内的小圆盘，再从 \(z\) 沿直线走到 \(z+h\)。参数化 \(\zeta=z+th\) 后约去 \(h\)；连续性保证整个短线段上的函数值都趋近 \(f(z)\)。`,'越来越短的累积，只反映起点附近的变化率。'],
  ['有原函数时，只需比较两端',t`\int_\alpha^\beta F'(z(t))z'(t)\,dt=F(z(\beta))-F(z(\alpha))`,t`链式法则把被积函数变成 \(dF(z(t))/dt\)，再用实参数的微积分基本定理。闭路两端相同，差自然为零。`,'原函数给积分一个只依赖端点的刻度。']
 ],
 example:{question:t`沿任意路线从零到 \(1+i\)，计算 \(\int z\,dz\)。`,formula:t`\int_0^{1+i}z\,dz=\frac{(1+i)^2}{2}=i`,explanation:t`\(F(z)=z^2/2\) 是整个平面上的原函数。即使路线弯曲，端点之差仍给出同一个结果。`},
 pitfall:t`某个小域里能选对数分支，不表示去心平面上有全局单值对数。\(1/z\) 在去心平面没有全局原函数，因为绕零点的积分不为零。`,
 check:['只验证一条闭路积分为零，能否推出全域路径无关？','不能。这里的假设是域内所有适当闭路的积分都为零，而不是只选一个例子。']
},
{
 id:'cauchy',chapter:2,title:'柯西积分公式为什么能读取内部值',lab:7,needs:['goursat','integral'],
 introduction:t`一般函数的边界值无法决定内部每一点。解析性却把内外变化紧密联系起来：沿边界给函数值乘上一个随位置变化的权重，竟能准确恢复内部指定点的值。`,
 condition:t`\(C\) 是逆时针方向的分段光滑简单闭曲线；\(f\) 在曲线及其内部的一个开邻域解析；\(a\) 严格位于内部。这个条件保证只有人为加入的核 \(1/(z-a)\) 在内部的 \(a\) 处有奇点。`,
 symbols:[
  {symbol:t`C,\ \oint_C`,meaning:'指定的闭曲线，以及沿它逆时针一圈的积分。'},
  {symbol:t`a,\ f(a)`,meaning:'要读取的内部点及其函数值；a 在本次积分中固定。'},
  {symbol:t`z,\ dz`,meaning:'沿边界变化的积分变量及带方向的微位移。'},
  {symbol:t`\varepsilon>0`,meaning:t`围住 \(a\) 的辅助小圆半径；取得足够小，让整个小圆盘位于内部。`}
 ],
 result:t`f(a)=\frac{1}{2\pi i}\oint_C\frac{f(z)}{z-a}\,dz`,
 steps:[
  ['把大边界换成围住目标点的小圆',t`\oint_C\frac{f(z)}{z-a}\,dz=\oint_{|z-a|=\varepsilon}\frac{f(z)}{z-a}\,dz`,t`挖去小圆盘后，被积函数在剩余区域解析。柯西定理使整个正向边界积分为零；孔边界原本顺时针，移到等式另一侧后成为逆时针小圆。`,'大圈与小圈之间没有奇点，边界可以向内变形。'],
  ['把中心值从波动中分离',t`f(z)=f(a)+[f(z)-f(a)]`,t`第一项在积分中是常数；第二项只表示小圆上的值偏离中心多少。小圆越小，连续性越能控制这部分波动。`,'同一小圆上的函数值越来越接近中心值。'],
  ['常数部分的核积分已知',t`f(a)\oint_{|z-a|=\varepsilon}\frac{dz}{z-a}=2\pi i\,f(a)`,t`代入 \(z=a+\varepsilon e^{it}\) 后，\(dz/(z-a)=i\,dt\)。参数从零走到 \(2\pi\)，所以恰好得到这一倍数。`,'核沿一整圈累积的总量固定，不依赖小圆半径。'],
  ['波动部分确实消失',t`\left|\oint_{|z-a|=\varepsilon}\frac{f(z)-f(a)}{z-a}\,dz\right|\le2\pi\max_{|z-a|=\varepsilon}|f(z)-f(a)|\longrightarrow0`,t`小圆上的分母模为 \(\varepsilon\)，弧长为 \(2\pi\varepsilon\)，两者抵消。连续性使剩余的最大波动趋于零，因而原积分只能等于常数部分。`,'留下来的不是近似值，而是由极限得到的精确中心值。']
 ],
 example:{question:t`令 \(f(z)=z^2+1\)，沿 \(|z|=2\) 正向积分 \(f(z)/z\)。`,formula:t`\oint_{|z|=2}\frac{z^2+1}{z}\,dz=2\pi i\,f(0)=2\pi i`,explanation:t`分子在闭圆盘附近解析，目标点零严格位于圆内，故可直接读取 \(f(0)=1\)。`},
 pitfall:t`目标点在路径上时，普通积分公式不能使用；若目标点在外部，核在整个内部也解析，积分为零。函数自身若在内部另有奇点，同样不能套用这条公式。`,
 check:[t`在上例中把分母改为 \(z-3\)，积分是多少？`,t`为零。点三在半径二的圆外，整个被积函数在圆盘附近解析。`]
},
{
 id:'higher',chapter:2,title:'高阶导数公式与柯西估计',lab:7,needs:['cauchy'],
 introduction:t`柯西公式能从边界读取一个函数值。让内部点微微移动并求导，同一条边界就能读取各阶导数。把这条等式取模，又能用边界上的大小限制内部变化得有多快。`,
 condition:t`\(f\) 在闭圆盘 \(|\zeta-a|\le R\) 的某开邻域解析，\(R>0\)，圆周按逆时针方向。\(n\) 为非负整数，约定 \(f^{(0)}=f\)。\(M\) 是该圆周上 \(|f|\) 的最大值。`,
 symbols:[
  {symbol:t`a,R`,meaning:'考察点和积分圆半径；考察点就是圆心。'},
  {symbol:t`\zeta`,meaning:'沿固定圆周行进的积分变量，与内部变化点 z 区分。'},
  {symbol:t`f^{(n)}(a),\ n!`,meaning:'f 在 a 处的 n 阶复导数，以及非负整数 n 的阶乘。'},
  {symbol:t`M=\max_{|\zeta-a|=R}|f(\zeta)|`,meaning:'整条圆周上的最大模；连续性保证最大值存在。'}
 ],
 result:t`\begin{aligned}f^{(n)}(a)&=\frac{n!}{2\pi i}\oint_{|\zeta-a|=R}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta,\\|f^{(n)}(a)|&\le\frac{n!M}{R^n}.\end{aligned}`,
 steps:[
  ['外圈固定，内部点移动',t`f(z)=\frac{1}{2\pi i}\oint_{|\zeta-a|=R}\frac{f(\zeta)}{\zeta-z}\,d\zeta`,t`柯西公式对圆内每个 \(z\) 都成立。把 \(z\) 限制在一个更小的闭圆盘内，就能使它与积分圆周始终保持正距离。`,'被读取的位置改变，提供信息的边界不动。'],
  ['对核求导',t`\frac{\partial^n}{\partial z^n}\frac{1}{\zeta-z}=\frac{n!}{(\zeta-z)^{n+1}}`,t`对 \(z\) 求导时，分母内层的负号与负次幂求导的负号相消。与边界的正距离使核及其导数一致有界，差商一致收敛，故微分可以移入积分号。`,'每增加一阶导数，核的分母也增加一阶。'],
  ['令内部点回到圆心',t`f^{(n)}(a)=\frac{n!}{2\pi i}\oint_{|\zeta-a|=R}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta`,t`逐阶微分得到各阶导数，再取 \(z=a\)。这个过程也说明解析函数具有任意阶连续导数。`,'同一个边界包含中心的各阶局部变化信息。'],
  ['用 ML 把等式变成估计',t`|f^{(n)}(a)|\le\frac{n!}{2\pi}\frac{M}{R^{n+1}}\,2\pi R=\frac{n!M}{R^n}`,t`圆周上分母模恒为 \(R^{n+1}\)，圆周长度为 \(2\pi R\)。这两个几何量与系数相乘，就是柯西估计。`,'边界上的函数受限，中心的导数也不能任意大。']
 ],
 example:{question:t`在正向圆 \(|z|=2\) 上计算 \(\oint e^z/z^3\,dz\)。`,formula:t`\oint_{|z|=2}\frac{e^z}{z^3}\,dz=\frac{2\pi i}{2!}\,(e^z)''\big|_{z=0}=\pi i`,explanation:t`分母三次幂对应 \(n+1=3\)，所以读取二阶导数。\((e^z)''(0)=1\)，但结果还要除以 \(2!\)。`},
 pitfall:t`积分是 \(2\pi i\,f^{(n)}(a)/n!\)，不要把阶乘放反。估计中的 \(M\) 取自整条圆周，不能用一个任意点的模代替。`,
 check:[t`若 \(f\) 在整个复平面解析且处处 \(|f|\le M\)，为何只能是常数？`,t`对任意半径都有 \(|f'(a)|\le M/R\)。令 \(R\to\infty\) 得每点导数为零，所以函数为常数，这就是刘维尔定理。`]
},
{
 id:'taylor',chapter:3,title:'柯西核 → 泰勒级数与收敛圆',lab:8,needs:['cauchy','higher'],
 introduction:t`一个解析函数在中心附近的形状，可以由这个中心的全部导数编码。泰勒公式说明这种幂次展开为什么不只是近似：在允许的圆盘内，加到无限项就准确还原原函数。`,
 condition:t`设 \(f\) 在圆盘 \(|z-a|<R\) 内解析。对固定内点 \(z\)，选辅助半径 \(|z-a|<r<R\)，在逆时针圆 \(|\zeta-a|=r\) 上使用柯西公式。结论保证该圆盘内成立，圆周上的收敛需另行判断。`,
 symbols:[
  {symbol:t`a,z,\zeta`,meaning:'a 是展开中心，z 是待求函数值的位置，ζ 是辅助圆周上的积分变量。'},
  {symbol:t`f^{(n)}(a),\quad n=0,1,2,\ldots`,meaning:'函数在中心 a 的 n 阶导数；第零阶导数就是函数本身。n 同时也是对应项的幂次。'},
  {symbol:t`R,r`,meaning:'已知解析圆盘的半径与推导时使用的较小圆半径，不一定就是实际收敛半径。'},
  {symbol:t`q=\frac{z-a}{\zeta-a}`,meaning:t`展开积分核时的几何级数比值，圆周上其模为 \(Q=|z-a|/r<1\)。`}
 ],
 result:t`f(z)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(z-a)^n,\qquad |z-a|<R`,
 steps:[
  ['把积分核写成几何级数的形式',t`\frac{1}{\zeta-z}=\frac{1}{\zeta-a}\frac{1}{1-q},\qquad q=\frac{z-a}{\zeta-a}`,t`内点到中心的距离比积分圆半径短，所以 \(|q|<1\)。这是几何级数可以展开的关键条件。`,'中心到内点的箭头，短于中心到边界的箭头。'],
  ['先用含余项的精确恒等式',t`\frac{1}{1-q}=\sum_{n=0}^{N}q^n+\frac{q^{N+1}}{1-q}`,t`两边乘以 \(1-q\) 即可验证。圆周上余项模不超过 \(Q^{N+1}/(1-Q)\)，其中固定的 \(Q<1\)，所以余项一致趋于零。`,'每次增加一项，遗漏部分再乘一次小于一的比值。'],
  ['代回柯西公式并逐项积分',t`f(z)=\sum_{n=0}^{\infty}(z-a)^n\left[\frac{1}{2\pi i}\oint\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta\right]`,t`先代入有限和恒等式，再对余项用 ML 估计。它被一个常数乘 \(Q^{N+1}\) 控制，趋于零，所以可以得到这个无限和。`,'边界提供的信息被按幂次分开。'],
  ['括号内就是高阶导数系数',t`c_n=\frac{1}{2\pi i}\oint\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta=\frac{f^{(n)}(a)}{n!}`,t`高阶柯西公式给出最后一个等号。辅助半径 \(r\) 可以选在任意内点之外，因此展开对已知解析圆盘内每一点都成立。`,'导数决定每个幂次的权重。']
 ],
 example:{question:t`把 \(1/(1-z)\) 改在 \(a=-1\) 展开，半径为何变成二？`,formula:t`\frac{1}{1-z}=\frac12\sum_{n=0}^{\infty}\left(\frac{z+1}{2}\right)^n,\qquad |z+1|<2`,explanation:t`写成 \(1/[2-(z+1)]\)，比值就是 \((z+1)/2\)。从新中心负一到唯一有限奇点一的距离为二。`},
 pitfall:t`任意给出的解析域边界不一定是真正的收敛边界；能继续解析延拓时，收敛圆可能更大。即使函数在某个圆外点有定义，也不能在那里强行使用这一中心的级数。`,
 check:[t`为什么 \(1/(1-z)=\sum_{n=0}^{\infty}z^n\) 不能用于 \(z=2\)？`,t`代入后各项为一、二、四等，连单项都不趋于零。原函数在二处有值，并不能改变这份级数的收敛范围。`]
},
{
 id:'laurent',chapter:3,title:'圆环上的两条边界 → 洛朗级数',lab:9,needs:['taylor','cauchy'],
 introduction:t`当中心有一个不允许取值的洞，泰勒级数的完整圆盘就不适用了。圆环同时有内外两条边界：外圈给出非负幂，内圈给出负幂，两部分合起来就是洛朗展开。`,
 condition:t`\(f\) 在圆环 \(r<|z-a|<R\) 内单值解析，其中 \(0\le r<R\le\infty\)。对固定点选 \(r<\rho_1<|z-a|<\rho_2<R\)。系数积分半径 \(\rho\) 可为圆环内任意有限正半径，所写圆积分都按逆时针方向。`,
 symbols:[
  {symbol:t`a,r,R`,meaning:'展开中心及圆环的内外半径；函数不必在中心有定义。'},
  {symbol:t`c_n,\quad n\in\mathbb Z`,meaning:'第 n 个洛朗系数，幂次可以是正整数、零或负整数。'},
  {symbol:t`\rho_1,\rho_2,\rho`,meaning:'辅助内圆、外圆的半径，以及计算系数时选用的圆半径。'},
  {symbol:t`z,\zeta`,meaning:'z 是圆环内的待求点，ζ 是沿积分圆变化的变量。'}
 ],
 result:t`\begin{aligned}f(z)&=\sum_{n=-\infty}^{\infty}c_n(z-a)^n,\\c_n&=\frac{1}{2\pi i}\oint_{|\zeta-a|=\rho}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta.\end{aligned}`,
 steps:[
  ['圆环的内边界带一个减号',t`f(z)=\frac{1}{2\pi i}\left[\oint_{|\zeta-a|=\rho_2}\frac{f(\zeta)}{\zeta-z}\,d\zeta-\oint_{|\zeta-a|=\rho_1}\frac{f(\zeta)}{\zeta-z}\,d\zeta\right]`,t`在待求点 \(z\) 周围再挖去一个小圆，余域中的 \(f(\zeta)/(\zeta-z)\) 解析，总边界积分为零。小圆积分趋于 \(2\pi i f(z)\)，便得到此式。区域正向是外圈逆时针、内圈顺时针；把两个圆都记为逆时针积分时，内圈因此带减号。`,'内壁与外壁共同围住圆环里的点。'],
  ['外圈的比值产生非负幂',t`\frac{1}{\zeta-z}=\sum_{n=0}^{\infty}\frac{(z-a)^n}{(\zeta-a)^{n+1}}`,t`外圈上 \(|z-a|/\rho_2<1\)，因此与泰勒推导一样，可以按 \(z-a\) 的非负幂展开积分核。`,'从外边界向内看，得到普通幂次。'],
  ['内圈要把比值反过来',t`\frac{1}{\zeta-z}=-\sum_{k=0}^{\infty}\frac{(\zeta-a)^k}{(z-a)^{k+1}}`,t`内圈上较小的是 \(|\zeta-a|/|z-a|\)。按这个比值展开，就得到负幂；这里的负号与圆环公式的内圈负号抵消。`,'从洞的边界向外看，得到倒数幂。'],
  ['积分后合成所有整数幂',t`n\ge0\quad\text{与}\quad n=-k-1<0\quad\Longrightarrow\quad f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a)^n`,t`两个几何级数在各自积分圆上一致收敛，可以逐项积分。同一系数可改用圆环内其他半径的圆，因为两圆之间的被积函数解析，边界积分之差为零。`,'两组幂次分别编码圆环内外侧的信息。']
 ],
 example:{question:t`同一函数 \(1/[z(z-1)]\)，为什么有两种以零为中心的展开？`,formula:t`\frac1{z(z-1)}=\begin{cases}-\dfrac1z-\displaystyle\sum_{n=0}^{\infty}z^n,&0<|z|<1,\\\displaystyle\sum_{k=0}^{\infty}z^{-k-2},&|z|>1.\end{cases}`,explanation:t`内圆环用 \(z\) 作小量，外圆环用 \(1/z\) 作小量。两者被奇点一隔开，不能混用；外圆环没有负一次项，不表示零点的局部留数为零。`},
 pitfall:t`展开必须附带有效圆环。某个外圆环的 \(c_{-1}\) 不能直接认作中心的局部留数，除非这个展开确实适用于紧邻中心的去心圆盘。`,
 check:[t`能否把上例外圆环的展开用于 \(z=1/2\)？`,t`不能。外展开要求 \(|1/z|<1\)，而此时比值的模为二。`]
},
{
 id:'singularity',chapter:3,title:'负幂结构 → 孤立奇点的分类',lab:9,needs:['laurent'],
 introduction:t`奇点附近的函数可能只是缺一个值，也可能无限增大，或者出现更复杂的行为。洛朗展开把这些差别转成一个清楚的判据：查看负幂部分是没有、有限项，还是无限项。`,
 condition:t`\(f\) 在去心圆盘 \(0<|z-a|<R\) 内单值解析，而在中心不能解析，即 \(a\) 是孤立奇点。以下分类使用这份局部洛朗展开，不适用于没有单值解析去心邻域的支点。`,
 symbols:[
  {symbol:t`a,R`,meaning:'孤立奇点和一个足够小的去心圆盘半径。'},
  {symbol:t`c_n`,meaning:'这份局部洛朗展开的系数，n 为整数。'},
  {symbol:t`\sum_{n<0}c_n(z-a)^n`,meaning:'全部负幂项构成的主部，奇点类型取决于它。'},
  {symbol:t`m\ge1`,meaning:t`极点阶数，表示最强的负幂为 \((z-a)^{-m}\)，对应系数非零。`}
 ],
 result:t`\begin{array}{c|c}\text{主部}&\text{奇点类型}\\\hline\text{无非零项}&\text{可去奇点}\\\text{有限个非零项}&\text{极点}\\\text{无限个非零项}&\text{本性奇点}\end{array}`,
 steps:[
  ['没有负幂，就能补上中心',t`f(z)=c_0+c_1(z-a)+\cdots\quad\Longrightarrow\quad \widetilde f(a)=c_0`,t`右侧是普通幂级数，在包含中心的圆盘解析。用它给缺失点赋值，就得到原函数的解析延拓，这叫可去奇点。`,'图形只是漏掉一个可以补回的点。'],
  ['有限个负幂，存在最强的一项',t`f(z)=\frac{c_{-m}}{(z-a)^m}+\cdots,\qquad (z-a)^m f(z)\longrightarrow c_{-m}\ne0`,t`乘上 \((z-a)^m\) 后，所有负幂都消失，并得到中心值非零的解析函数。因而 \(|f(z)|\) 随 \(z\to a\) 趋于无穷，称为 \(m\) 阶极点。`,'有限次幂就能消掉极点的发散。'],
  ['无限个负幂，没有有限幂能消掉主部',t`e^{1/(z-a)}=\sum_{k=0}^{\infty}\frac{(z-a)^{-k}}{k!}`,t`这份展开含无限多个非零负幂。无论乘上 \((z-a)\) 的哪一个有限次幂，仍然存在负幂尾部，因此既不可去，也不是有限阶极点。`,'幂次不断向负方向延伸，没有最左一项。']
 ],
 example:{question:t`\(\sin z/z\) 在零点属于哪一类？`,formula:t`\frac{\sin z}{z}=1-\frac{z^2}{3!}+\frac{z^4}{5!}-\cdots`,explanation:t`约去正弦展开中的一个 \(z\) 后，没有留下负幂，所以是可去奇点。原式在零仍未定义；补上值一后才得到解析函数。`},
 pitfall:t`不能只看原表达式的分母判断极点，分子可能抵消它。\(\log z\) 的零点支点不满足单值解析去心邻域的前提，不能直接放入这三个类别。`,
 check:[t`\(2/z^3+5/z-1\) 在零是几阶极点？`,t`三阶。最高负幂为 \(z^{-3}\) 且系数非零；\(z^{-1}\) 的系数五是留数，不是极点阶数。`]
},
{
 id:'residue',chapter:5,title:'为什么闭路积分只留下负一次项',lab:10,needs:['laurent','integral','goursat'],
 introduction:t`洛朗展开可能有许多正负幂，但沿小圆完整走一圈时，绝大多数贡献会因方向变化而相消。只有负一次幂抵消了位移自身的旋转，因此它的系数独自决定这圈积分。`,
 condition:t`\(C\) 为逆时针分段光滑简单闭曲线，\(f\) 在曲线及内部的开邻域中，除有限个内部孤立奇点 \(a_1,\ldots,a_N\) 外解析。奇点不能落在路径上。局部系数必须取自各奇点附近有效的洛朗展开。`,
 symbols:[
  {symbol:t`\operatorname{Res}(f,a)=c_{-1}`,meaning:t`f 在孤立奇点 a 的留数，即局部展开中 \((z-a)^{-1}\) 的系数。`},
  {symbol:t`a_j,\ j=1,\ldots,N`,meaning:'闭曲线内部的有限个孤立奇点；简单正向闭路对每个内部点恰好绕一圈。'},
  {symbol:t`\rho>0,\ t\in[0,2\pi]`,meaning:'围绕一个奇点的小圆半径及其逆时针角度参数。'},
  {symbol:t`n\in\mathbb Z`,meaning:'洛朗项的整数幂次，与奇点编号 j 不同。'}
 ],
 result:t`\oint_C f(z)\,dz=2\pi i\sum_{j=1}^{N}\operatorname{Res}(f,a_j)`,
 steps:[
  ['一个幂沿圆周怎样积累',t`\oint_{|z-a|=\rho}(z-a)^n\,dz=i\rho^{n+1}\int_0^{2\pi}e^{i(n+1)t}\,dt`,t`令 \(z-a=\rho e^{it}\)，于是位移再带来一个 \(i\rho e^{it}\)。两部分的幂相加，得到角频率 \(n+1\)。`,'位移的转动与函数项的转动共同决定贡献方向。'],
  ['只有负一次项不发生整圈相消',t`\oint(z-a)^n\,dz=\begin{cases}0,&n\ne-1,\\2\pi i,&n=-1.\end{cases}`,t`非零整数频率的复指数走完完整振荡周期，积分为零；当 \(n=-1\) 时指数因子恒为一，留下 \(\int_0^{2\pi}i\,dt\)。`,'负一次项使每一小步的贡献朝向相同。'],
  ['洛朗展开只留下一个系数',t`\oint_{|z-a|=\rho}f(z)\,dz=\sum_{n=-\infty}^{\infty}c_n\oint(z-a)^n\,dz=2\pi i\,c_{-1}`,t`小圆须完全落在该奇点的洛朗收敛圆环内。级数在这条紧圆周上一致收敛，因此可以逐项积分；其他幂次的积分都消失。`,'一整圈积分把所有系数筛到只剩留数。'],
  ['各个奇点的贡献相加',t`\oint_C f(z)\,dz=\sum_{j=1}^{N}\oint_{C_j}f(z)\,dz=2\pi i\sum_{j=1}^{N}\operatorname{Res}(f,a_j)`,t`在每个孤立奇点周围挖去互不相交的小圆盘。剩余区域内函数解析，柯西定理把外圈积分化成所有逆时针小圆积分之和。`,'整体问题拆成有限个局部问题。']
 ],
 example:{question:t`\(1/[z(z-1)]\) 沿 \(|z|=2\) 正向积分是多少？`,formula:t`\operatorname{Res}(f,0)=-1,\quad\operatorname{Res}(f,1)=1,\qquad\oint_{|z|=2}f(z)\,dz=0`,explanation:t`两个极点均在圆内，留数一负一正，相加为零。积分为零并不表示内部没有奇点。`},
 pitfall:t`一般闭路的公式还要乘各点的绕数；顺时针或多圈不能直接照抄简单正向公式。本性奇点也可能有留数，留数并非只属于极点。`,
 check:[t`若一个闭路只顺时针绕留数为二的奇点两圈，且没有别的贡献，积分是多少？`,t`绕数为负二，所以积分为 \(2\pi i\times(-2)\times2=-8\pi i\)。`]
},
{
 id:'poles',chapter:5,title:'一阶与高阶极点的留数公式从哪来',lab:10,needs:['laurent','taylor','residue'],
 introduction:t`留数只要一个负一次项，未必需要展开整个函数。对有限阶极点，先乘上足够次数的 \(z-a\) 消掉发散，再从普通泰勒展开中找到会被移到负一次的位置，就能得到快捷公式。`,
 condition:t`高阶公式中，\(a\) 是 \(m\ge1\) 阶极点，\(g(z)=(z-a)^mf(z)\) 可解析延拓到 \(a\)，且 \(g(a)\ne0\)。商式中 \(p,q\) 在 \(a\) 附近解析，\(q(a)=0,q'(a)\ne0\)；若 \(p(a)=0\)，奇点可抵消，但商式留数仍为零。`,
 symbols:[
  {symbol:t`m,a`,meaning:'正整数 m 是极点阶数，a 是极点位置。'},
  {symbol:t`g(z)=(z-a)^mf(z)`,meaning:'消去极点后在 a 附近解析的函数；公式使用延拓后的导数值。'},
  {symbol:t`g^{(m-1)}(a),\ (m-1)!`,meaning:'g 的 m−1 阶导数与该阶数的阶乘；m=1 时第零阶导数就是 g 自身。'},
  {symbol:t`p,q,q'(a)`,meaning:'商函数的分子、分母和分母在 a 处的导数；q 的零点必须是一阶。'}
 ],
 result:t`\begin{aligned}\operatorname{Res}(f,a)&=\frac{g^{(m-1)}(a)}{(m-1)!},\\\operatorname{Res}\left(\frac pq,a\right)&=\frac{p(a)}{q'(a)}\quad\bigl(q(a)=0,\ q'(a)\ne0\bigr).\end{aligned}`,
 steps:[
  ['把极点藏进一个有限次幂',t`f(z)=\frac{g(z)}{(z-a)^m}`,t`选用极点阶数 \(m\) 后，分子在中心可解析延拓。这样未知的洛朗展开就变成一个普通泰勒展开再整体移动幂次。`,'乘以合适的幂，就能把有限阶发散填平。'],
  ['找出平移后成为负一次的项',t`f(z)=\sum_{k=0}^{\infty}\frac{g^{(k)}(a)}{k!}(z-a)^{k-m}`,t`负一次幂要求 \(k-m=-1\)，所以必须取 \(k=m-1\)。对应的泰勒系数就是留数，无需求出其他系数。`,'所有幂次向左移动 m 格，只读落在负一的那一格。'],
  ['一阶极点不需要求导',t`\operatorname{Res}(f,a)=\lim_{z\to a}(z-a)f(z)\qquad(m=1)`,t`当 \(m=1\)，一般公式只读取 \(g(a)\)，也就是延拓前表达式的极限。高阶极点则不能省去 \(m-1\) 次求导。`,'只缺一个负幂因子时，乘回去便直接读到系数。'],
  ['分母是一阶零点时进一步化简',t`\frac{q(z)}{z-a}\longrightarrow q'(a)\ne0\quad\Longrightarrow\quad\operatorname{Res}\left(\frac pq,a\right)=\frac{p(a)}{q'(a)}`,t`由 \(q(a)=0\) 和导数定义得到前一个极限，再代入一阶留数的极限式。如果分子同时为零，约去后可去，留数为零。`,'分母在简单零点附近像一个非零斜率的一次函数。']
 ],
 example:{question:t`\(e^z/z^3\) 在零点的留数是多少？`,formula:t`m=3,\quad g(z)=e^z,\qquad\operatorname{Res}\left(\frac{e^z}{z^3},0\right)=\frac{g''(0)}{2!}=\frac12`,explanation:t`极点阶数是三，所以读取的是分子的二阶泰勒系数。留数并不是最高负幂 \(z^{-3}\) 的系数。`},
 pitfall:t`高阶极点直接算 \(\lim(z-a)f(z)\) 通常会发散。商式快捷公式仅在分母为一阶零点时适用；分母有多重零点时，应先确定实际极点阶数。`,
 check:[t`\(1/(z^2+1)\) 在 \(i\) 处的留数为何是 \(1/(2i)\)？`,t`分母 \(q(z)=z^2+1\) 在 \(i\) 处为零，而 \(q'(i)=2i\ne0\)。分子为一，因此留数是 \(1/(2i)\)。`]
},
{
 id:'real',chapter:5,title:'留数怎样算出 ∫ dx/(1+x²)=π',lab:11,needs:['residue','poles','integral'],
 introduction:t`留数定理计算的是闭路积分，目标却是一条无限长的实轴。把实轴的一段补成上半圆闭路后，留数给出总量；再证明新增圆弧的贡献趋于零，才能恢复原来的实积分。`,
 condition:t`取 \(R>1\)，实轴段从 \(-R\) 到 \(R\)，上半圆弧从 \(R\) 返回 \(-R\)，合成逆时针闭路。函数 \(1/(1+z^2)\) 的极点不在路径上。实积分两侧各自绝对收敛，不能只把对称极限当作普通反常积分。`,
 symbols:[
  {symbol:t`x\in\mathbb R,\ z\in\mathbb C`,meaning:'x 是原实积分的变量，z 是为使用围道而引入的复变量。'},
  {symbol:t`R>1,\ \Gamma_R`,meaning:'辅助半圆的半径，以及从 R 逆时针走到 −R 的上半圆弧。'},
  {symbol:t`C_R=[-R,R]+\Gamma_R`,meaning:'实轴段与圆弧接成的完整正向闭路。'},
  {symbol:t`i,-i`,meaning:'复函数的两个简单极点；该围道内部只包含上方的 i。'}
 ],
 result:t`\int_{-\infty}^{\infty}\frac{dx}{1+x^2}=\pi`,
 steps:[
  ['目标积分是闭路总量的一部分',t`\int_{-R}^{R}\frac{dx}{1+x^2}+\int_{\Gamma_R}\frac{dz}{1+z^2}=\oint_{C_R}\frac{dz}{1+z^2}`,t`在实轴上复变量 \(z\) 就等于实变量 \(x\)。闭路分成实轴与圆弧两段，积分也必须分成相应两项。`,'新增的圆弧让直线路线闭合，同时也引入新的贡献。'],
  ['闭路只围住上方的极点',t`\operatorname{Res}\left(\frac1{1+z^2},i\right)=\frac1{2i},\qquad\oint_{C_R}\frac{dz}{1+z^2}=2\pi i\frac1{2i}=\pi`,t`分母导数在 \(i\) 处为 \(2i\)。另一个极点 \(-i\) 在闭路外，不参加留数求和。`,'半圆闭路选择了上半平面的局部贡献。'],
  ['新增圆弧的贡献有一个趋零上界',t`\left|\int_{\Gamma_R}\frac{dz}{1+z^2}\right|\le\frac{\pi R}{R^2-1}\longrightarrow0`,t`圆弧上 \(|z|=R\)，反三角不等式给出 \(|1+z^2|\ge R^2-1\)。函数模的上界乘弧长 \(\pi R\)，得到右侧；它约按 \(1/R\) 衰减。`,'路线长度增长一阶，函数大小衰减两阶，乘积仍趋于零。'],
  ['减去圆弧，再取无穷远极限',t`\int_{-R}^{R}\frac{dx}{1+x^2}=\pi-\int_{\Gamma_R}\frac{dz}{1+z^2}\longrightarrow\pi`,t`实轴两端的被积函数由 \(1/x^2\) 控制，左右两侧反常积分都绝对收敛。因此这里的对称极限确实等于整条实轴上的普通反常积分。`,'补路的贡献消失后，总量才全部属于原目标。']
 ],
 example:{question:t`把分母换成 \(x^2+4\)，沿同样的上半圆思路计算。`,formula:t`\operatorname{Res}\left(\frac1{z^2+4},2i\right)=\frac1{4i},\qquad\int_{-\infty}^{\infty}\frac{dx}{x^2+4}=\frac\pi2`,explanation:t`取 \(R>2\)，只围住 \(2i\)。圆弧模的上界为 \(\pi R/(R^2-4)\)，仍趋于零，所以实积分等于 \(2\pi i/(4i)\)。`},
 pitfall:t`大圆弧的积分不会自动消失，必须估计。实轴上若有极点，还需重新规定积分意义与绕行方式，不能直接照搬这条路线。`,
 check:['若只求出闭路积分，却没有处理补出的圆弧，为什么还没完成？','因为闭路总量同时包含实轴和圆弧两部分。圆弧贡献未确定，就还不能单独得到目标实积分。']
}
];
window.PROOFS.sort((a,b)=>a.chapter-b.chapter);
})();
