/* Independent, dependency-free derivation lessons. Each step separates an identity
   from its justification and from the geometric interpretation. */
window.PROOFS = [
{id:'euler',chapter:1,title:'欧拉公式 → 乘法的旋转缩放',lab:1,needs:[],condition:'采用幂级数定义复指数；实正弦、余弦采用各自的幂级数。相关级数对任意复数绝对收敛。',result:'eⁱθ = cos θ + i sin θ；(ρeⁱφ)(reⁱθ) = ρr eⁱ⁽φ⁺θ⁾',steps:[
['从定义开始','eᶻ = Σₙ₌₀∞ zⁿ/n!','先规定复指数是什么，不能先假定“指数就是旋转”。这个级数的相邻项模之比为 |z|/(n+1)，趋于 0，故处处绝对收敛。','一串向量相加，定义一个输出点。'],
['代入纯虚数，拆成奇偶项','eⁱθ = (1 − θ²/2! + θ⁴/4! − ⋯) + i(θ − θ³/3! + θ⁵/5! − ⋯)','使用 i²=−1，i³=−i，i⁴=1。绝对收敛允许将偶数项和奇数项分别收集。','偶数项沿实轴，奇数项沿虚轴。'],
['识别两条实级数','eⁱθ = cos θ + i sin θ，|eⁱθ| = 1','两组括号分别是余弦与正弦。模长来自 cos²θ+sin²θ=1。','输出沿单位圆转动，θ 就是转过的角。'],
['乘法为什么角度相加','eᶻeʷ = Σₙ₌₀∞ Σₖ₌₀ⁿ zᵏwⁿ⁻ᵏ/[k!(n−k)!] = eᶻ⁺ʷ','绝对收敛允许柯西乘积；用二项式定理合并内层和。于是模相乘，方向相加，乘 i 就转 π/2。','长度刻度相乘，两个旋转首尾相接。']],pitfall:'这条路线先定义指数，再证明欧拉公式和指数加法律，避免用旋转结论反过来证明自身。',check:['乘上 −2i 会怎样？','模长乘 2，顺时针转 π/2；零向量仍为零。']},
{id:'roots',chapter:1,title:'n 次根与复对数为什么多值',lab:5,needs:['euler'],condition:'z≠0，写 z=reⁱθ，r>0；n 是正整数。谈解析对数时须先在适当开域上选择连续幅角。',result:'wₖ=r¹⁄ⁿeⁱ⁽θ⁺²ᵏπ⁾⁄ⁿ；log z=ln r+i(θ+2kπ)',steps:[
['把未知根也改成极坐标','w=seⁱφ ⇒ wⁿ=sⁿeⁱⁿφ','复数相等要求模相等、角度相差整数倍 2π。','根的位置同时受半径和方向限制。'],
['分别解半径与角度','sⁿ=r，nφ=θ+2kπ ⇒ s=r¹⁄ⁿ，φ=(θ+2kπ)/n','k=0,…,n−1 给出不同根；k 加 n 后角度加 2π，重复原点。','n 个根等距排在同一圆周上。'],
['对数是反解指数','eᵘ⁺ⁱᵛ=eᵘ(cos v+i sin v)=reⁱθ','比较模得到 u=ln r，比较方向得到 v=θ+2kπ，故有无限个对数值。','输入点只记住方向，忘记绕圈次数。'],
['为什么需要割线','Log z=ln r+i Arg z，−π<Arg z<π','在去掉非正实轴的开域选此分支。若假定去心平面有全局解析对数 L，则由 eᴸ=z 有 L′=1/z；但闭路上 ∮L′dz=0，而 ∮dz/z=2πi，矛盾。','切掉一条射线，阻止路径围零点绕完整一圈。']],pitfall:'主值不是所有值；主支域不含零点和割线。根的支点不能直接当作普通孤立极点。',check:['平方根连续跟踪一圈为什么变号？','输入角增加 2π，根的角只增 π，所以乘上 −1；绕两圈才返回。']},
{id:'cr',chapter:1,title:'从复导数定义推出 C–R 条件',lab:4,needs:[],condition:'必要性：f 在 z₀ 复可导。充分性：u、v 在该点实可微且满足 C–R；常用的一阶偏导邻域连续是更强的充分条件。',result:'uₓ=vᵧ，uᵧ=−vₓ；f′=uₓ+ivₓ',steps:[
['沿实轴取差商','h=Δx ⇒ f′(z₀)=uₓ+ivₓ','复极限存在，则沿实轴的极限必须等于它。此处偏导均在 z₀ 计算。','先用水平小箭头探测局部规则。'],
['沿虚轴再算一次','h=iΔy ⇒ f′(z₀)=(uᵧ+ivᵧ)/i=vᵧ−iuᵧ','除以 i 等于乘 −i。两个结果实部相等、虚部相等，就得到 C–R。','竖直探针必须报告同一个复乘数。'],
['两方向相同，为什么还不够','Δf=(uₓΔx+uᵧΔy)+i(vₓΔx+vᵧΔy)+o(|h|)','这是实可微所保证的二维线性近似，不是仅有两个偏导就能保证的。','必须控制所有方向和弯曲路径上的误差。'],
['用 C–R 合并所有方向','Δf=(uₓ+ivₓ)(Δx+iΔy)+o(|h|) ⇒ Δf/h→uₓ+ivₓ','余项除以 h 的模趋于零，所以任意路径都同意这个极限。','任意小箭头都经历同一次旋转缩放。']],pitfall:'在一点可导不等于在该点解析。|z|² 在 0 的差商是 h̄→0，但在任何零点邻域都不处处可导。',check:['沿两条路径结果相同，足以证明复可导吗？','不足以。必要性只排除反例；充分性还要控制任意趋近路径，例如利用实可微余项。']},
{id:'harmonic',chapter:1,title:'解析函数 → 调和函数与正交曲线',lab:4,needs:['cr'],condition:'f=u+iv 解析；本段计算使用二阶偏导连续。解析函数具有此光滑性，可在后面的柯西公式后证明。',result:'Δu=Δv=0；∇u·∇v=0',steps:[
['对 C–R 再求偏导','uₓ=vᵧ ⇒ uₓₓ=vᵧₓ；uᵧ=−vₓ ⇒ uᵧᵧ=−vₓᵧ','二阶混合偏导连续时可以交换次序。','横向和纵向的曲率准备相消。'],
['两式相加','uₓₓ+uᵧᵧ=vᵧₓ−vₓᵧ=0','同理由 vₓ=−uᵧ、vᵧ=uₓ 得 vₓₓ+vᵧᵧ=0。','实部、虚部都没有局部“源项”。'],
['计算两组等值线的法向','∇v=(−uᵧ,uₓ) ⇒ ∇u·∇v=−uₓuᵧ+uᵧuₓ=0','非零梯度是等值线的法向量；法向正交，则相应切线也正交。','把同一箭头转 90°，得到另一组法向。']],pitfall:'梯度为零的临界点不能直接用正则等值曲线的正交说法。两个任意调和函数也未必互为共轭调和函数。',check:['u=x²−y² 的共轭调和函数是什么？','由 vᵧ=2x、vₓ=2y 得 v=2xy+C，对应 f=z²+iC。']},
{id:'conformal',chapter:1,title:'复导数为什么意味着局部保角',lab:4,needs:['cr','euler'],condition:'f 在 z₀ 解析且 A=f′(z₀)≠0；比较经过该点的两条正则光滑曲线的有向夹角。',result:'局部长度倍率 |f′(z₀)|，方向转角 arg f′(z₀)',steps:[
['把可导改写成线性近似','f(z₀+h)−f(z₀)=Ah+o(|h|)','这是差商趋于 A 的等价写法。','把镜头放大，弯曲映射趋近线性映射。'],
['代入两条曲线的切向量','w₁′=Az₁′，w₂′=Az₂′','链式法则使两条非零切向量都乘上同一个 A。','两根小箭头一起旋转、一起伸缩。'],
['比较角差与长度','arg w₂′−arg w₁′=arg z₂′−arg z₁′；|wⱼ′|=|A||zⱼ′|','每个方向都增加 arg A，做差后共同转角消失。','共同旋转不改变夹角。']],pitfall:'A=0 时不能对切向量取此角度。例如 z² 在 0 使射线夹角加倍。共轭会反转有向角，不满足这里的解析保角结论。',check:['z² 在 z₀=1+i 附近怎样变化？','f′=2+2i，局部长度乘 2√2，方向逆时针转 π/4。']},
{id:'integral',chapter:2,title:'复积分参数化与 ML 估计',lab:6,needs:['euler'],condition:'C 是分段光滑曲线 z(t)，f 在 C 上连续；M 是曲线上 |f| 的上界，L 是路径长度。',result:'∫C f dz=∫αβ f(z(t))z′(t)dt；|∫C f dz|≤ML',steps:[
['从小段求和出发','Σ f(zⱼ*)Δzⱼ；Δzⱼ≈z′(tⱼ)Δtⱼ','把曲线划成小段；网格趋零时，复黎曼和变成参数积分。','每步的方向包含在 Δz 中。'],
['拆成两条实积分','(u+iv)(dx+i dy)=(u dx−v dy)+i(v dx+u dy)','展开复乘法即可，不是分别把 u、v 当作弧长密度。','每个局部箭头先旋转缩放，再相加。'],
['先取模，再估计','|∫ f(z(t))z′(t)dt|≤∫ |f(z(t))||z′(t)|dt≤M∫|z′(t)|dt=ML','先用积分三角不等式，再用上界 M。','总位移不超过所有小箭头长度之和。'],
['绕圆检验 1/z','z=a+reⁱᵗ ⇒ dz=ireⁱᵗdt ⇒ ∮ dz/(z−a)=∫₀²π i dt=2πi','分母抵消圆的半径与方向因子。顺时针改变参数方向，结果变号。','半径消失，只剩转过的总角。']],pitfall:'dz 不是 ds：前者带方向，后者是非负弧长。ML 是上界，不是积分值。',check:['沿 |z|=r 正向积分 z̄ dz 等于多少？','z̄=re⁻ⁱᵗ，所以 z̄ dz=ir²dt，积分为 2πir²。']},
{id:'goursat',chapter:2,title:'柯西定理：从三角形到闭路',lab:6,needs:['cr','integral'],condition:'三角形及内部包含在 f 的解析开域内。推广版：f 在单连通开域 D 解析，C 是 D 内分段光滑闭路。',result:'∮C f(z)dz=0',steps:[
['四分三角形，公共边抵消','I(T)=I(T₁)+I(T₂)+I(T₃)+I(T₄)','每条内部边被两个小三角形沿相反方向走过，积分相消；至少一个子三角形满足 |I(Tⱼ)|≥|I(T)|/4。','大边界换成四条小边界。'],
['反复选取积分最大的子块','|I(T₀)|≤4ⁿ|I(Tₙ)|，直径 dₙ=d₀/2ⁿ，周长 Lₙ=L₀/2ⁿ','嵌套闭三角形有共同极限点 z*，且仍在解析域内。','镜头不断放大同一个点。'],
['只在这个点使用复可导','f(z)=f(z*)+f′(z*)(z−z*)+ε(z)(z−z*)，ε(z)→0','常数项和一次项都有显式原函数，其闭路积分为零；不需要先假定 f′ 连续。','局部线性部分不产生闭路积累。'],
['余项小到不能留下积分','|I(Tₙ)|≤supTₙ|ε| d₀L₀/4ⁿ ⇒ |I(T₀)|≤supTₙ|ε| d₀L₀→0','用 ML 估计余项，4ⁿ 恰好被长度和直径的缩小抵消。这就严格证明了三角形版。','缩小后的非线性余量全部消失。'],
['拼接与推广','域内可用三角片铺出的多边形闭路：内部边抵消 ⇒ 总积分为 0','对一般单连通域闭路，利用紧路径在域内的有限局部覆盖与路径变形推广；这里说明推广思路，不把示意图当成拓扑细节的完整证明。','没有洞时，闭路能在解析域内逐步缩掉。']],pitfall:'f 仅在曲线上解析不够；1/z 的零点使围零点的闭路不能在其解析域内缩成点。',check:['有洞的域上，所有解析函数闭路积分都非零吗？','不是。例如 f=z 有原函数 z²/2，在任何域内的闭路积分都为零。']},
{id:'primitive',chapter:2,title:'闭路归零 → 原函数与路径无关',lab:6,needs:['goursat'],condition:'D 是区域，f 连续，且 D 内所有分段光滑闭路积分为零；单连通域内解析是保证这些条件的一种情形。',result:'F(z)=∫z₀→z f(ζ)dζ，F′=f；∫A→B f dz=F(B)−F(A)',steps:[
['比较两条端点相同的路径','∫C₁ f dz−∫C₂ f dz=∮C₁−C₂ f dz=0','第二条反向走，与第一条拼成闭路。','两条路围出的额外边界没有贡献。'],
['因此可定义一个函数','F(z)=∫z₀→z f(ζ)dζ','路径无关保证一个终点对应一个数，而不是依赖走法。','用从固定起点累积的值给每个点编号。'],
['在小邻域走直线算导数','[F(z+h)−F(z)]/h=∫₀¹ f(z+th)dt→f(z)','选局部小圆盘内的直线 ζ=z+th；f 连续保证局部一致趋近。','足够短的路线只读取附近的函数值。'],
['反过来使用链式法则','∫αβ F′(z(t))z′(t)dt=F(z(β))−F(z(α))','这是沿曲线的实参数微积分基本定理，闭路端点相同则为零。','积分只看两端的编号差。']],pitfall:'Log 的一个分支可作为 1/z 的局部原函数，但去心平面上不存在全局单值解析原函数。',check:['为什么 ∫C z dz 与走法无关？','因为 z²/2 是全局原函数，所以结果始终为 (B²−A²)/2。']},
{id:'cauchy',chapter:2,title:'柯西积分公式为什么能读取内部值',lab:7,needs:['goursat','integral'],condition:'C 是正向分段光滑简单闭曲线，f 在 C 及内部的某开邻域解析，a 严格位于内部。',result:'f(a)=(1/2πi)∮C f(z)/(z−a) dz',steps:[
['挖去探针附近的小圆盘','∮C f(z)/(z−a) dz=∮|z−a|=ε f(z)/(z−a) dz','在挖孔后的区域，被积函数解析。外边界正向、孔的边界负向，总积分为零；移项后两条逆时针曲线积分相同。','大边界可以收缩成围 a 的小圆。'],
['拆出真正想读取的数','f(z)=f(a)+[f(z)−f(a)]','常数 f(a) 可以移到积分号外，其余只衡量小圆上的变化。','中心值加上很小的波动。'],
['常数项给出 2πi','f(a)∮ dz/(z−a)=2πi f(a)','用 z=a+εeⁱᵗ 参数化，积分核成为 i dt。','探针绕一圈，把中心值复制 2πi 倍。'],
['变化项确实趋零','|∮ [f(z)−f(a)]/(z−a) dz|≤2π max|z−a|=ε |f(z)−f(a)|→0','分母 ε 与圆周长 2πε 抵消；连续性让剩余的最大波动趋零。','小圆越小，中心周围的值越难区分。']],pitfall:'a 在曲线上时普通公式不能使用；a 在外部时，核在内部解析，闭路积分为零。证明不借用留数定理，避免循环论证。',check:['f(z)=z²+1，a=0，则正向 |z|=2 上积分 f(z)/z 是多少？','f(0)=1，故积分为 2πi。']},
{id:'higher',chapter:2,title:'高阶导数公式与柯西估计',lab:7,needs:['cauchy'],condition:'f 在 |ζ−a|≤R 及某开邻域解析，积分圆正向，M=max|ζ−a|=R |f(ζ)|。',result:'f⁽ⁿ⁾(a)=n!/(2πi)∮ f(ζ)/(ζ−a)ⁿ⁺¹ dζ；|f⁽ⁿ⁾(a)|≤n!M/Rⁿ',steps:[
['让内部探针 z 移动','f(z)=(1/2πi)∮ f(ζ)/(ζ−z) dζ','固定外圈，z 留在严格较小的内圆盘，与围道保持正距离。','边界不动，只移动内部探针。'],
['为什么可以在积分号内求导','∂ⁿ/∂zⁿ (ζ−z)⁻¹=n!(ζ−z)⁻ⁿ⁻¹','内圆盘与边界有正距离，核及其各阶导数在紧集上一致有界，差商一致收敛，允许交换微分与积分。','每次求导都加强探针核的权重。'],
['在 z=a 读取导数','f⁽ⁿ⁾(a)=n!/(2πi)∮ f(ζ)/(ζ−a)ⁿ⁺¹ dζ','这也逐阶证明解析函数有任意阶连续导数。','一个边界编码了中心所有阶变化率。'],
['再用一次 ML','|f⁽ⁿ⁾(a)|≤[n!/(2π)]·[M/Rⁿ⁺¹]·2πR=n!M/Rⁿ','边界长度是 2πR；不要漏掉分母的幂或 n!。','边界越远，对中心高阶变化的限制越强。']],pitfall:'积分等于 2πi f⁽ⁿ⁾(a)/n!，不是再乘 n!。估计用的是整条圆周的最大模。',check:['若整个复平面 |f|≤M，为什么 f 必为常数？','任意 R 都可取，|f′(a)|≤M/R；令 R→∞ 得每点 f′=0，即刘维尔定理。']},
{id:'taylor',chapter:3,title:'柯西核 → 泰勒级数与收敛圆',lab:8,needs:['cauchy','higher'],condition:'f 在圆盘 |z−a|<R 内解析；固定 |z−a|<r<R，在 |ζ−a|=r 上使用柯西公式。',result:'f(z)=Σₙ₌₀∞ f⁽ⁿ⁾(a)(z−a)ⁿ/n!',steps:[
['把核改成几何级数的样子','1/(ζ−z)=[1/(ζ−a)]·1/[1−(z−a)/(ζ−a)]','令 q=(z−a)/(ζ−a)，围道上 |q|=|z−a|/r<1。','内点到中心的距离比外圈半径短。'],
['有限和先精确拆分','1/(1−q)=Σₙ₌₀ᴺ qⁿ+qᴺ⁺¹/(1−q)','乘以 1−q 即可检查恒等式。余项模不超过 Qᴺ⁺¹/(1−Q)，Q=|z−a|/r<1。','每一项是上一个的缩小复制。'],
['代回柯西积分，余项归零','f(z)=Σₙ₌₀∞ (z−a)ⁿ·[(1/2πi)∮ f(ζ)/(ζ−a)ⁿ⁺¹ dζ]','围道上几何级数一致收敛，因而可逐项积分；余项由 ML 和 Qᴺ⁺¹→0 控制。','把边界编码按幂次逐层展开。'],
['识别系数与真实边界','系数=f⁽ⁿ⁾(a)/n!；1/(1−z)=Σₙ₌₀∞ (z−a)ⁿ/(1−a)ⁿ⁺¹','由高阶柯西公式认出系数。例中要求 |z−a|<|1−a|；奇点 1 把圆挡住。一般泰勒收敛半径由所代表解析函数延拓的最近障碍决定，不只是原先随意画的域边界。','以 a 为圆心的圆，一直长到遇见奇点。']],pitfall:'圆周需另判；本例在整个收敛圆周上项的模不趋零，所以发散。其他幂级数的圆周行为可能不同。',check:['中心 a=0 时，为何 1/(1−z) 在 z=2 不能用 Σzⁿ？','|q|=2>1，各项不趋零；虽原函数在 2 有值，这一中心的级数仍发散。']},
{id:'laurent',chapter:3,title:'圆环上的两条边界 → 洛朗级数',lab:9,needs:['taylor','cauchy'],condition:'f 在圆环 r<|z−a|<R 解析；选 r<ρ₁<|z−a|<ρ₂<R，内外两圆均按逆时针记号。',result:'f(z)=Σₙ₌₋∞∞ cₙ(z−a)ⁿ；cₙ=(1/2πi)∮|ζ−a|=ρ f(ζ)/(ζ−a)ⁿ⁺¹ dζ',steps:[
['圆环版柯西公式有一个减号','f(z)=(1/2πi)[∮外 f(ζ)/(ζ−z)dζ − ∮内 f(ζ)/(ζ−z)dζ]','区域的正向边界是外圈逆时针、内圈顺时针，因此用两个逆时针积分表示时要相减。','外壁和洞壁共同决定圆环内的值。'],
['外圈给出非负幂','1/(ζ−z)=Σₙ₌₀∞ (z−a)ⁿ/(ζ−a)ⁿ⁺¹','外圈有 |z−a|/ρ₂<1，与泰勒推导相同。','从外向内看，展开成 1、z−a、(z−a)²…'],
['内圈给出负幂','1/(ζ−z)=−Σₖ₌₀∞ (ζ−a)ᵏ/(z−a)ᵏ⁺¹','这里用 ρ₁/|z−a|<1；前面的负号与圆环公式中内圈的减号相消。','从洞向外看，出现倒数幂。'],
['两个方向拼成同一编码','外圈 n≥0，内圈 n=−k−1<0；合并为所有整数 n','各自级数在所选圆上均匀收敛，可逐项积分。系数积分沿圆环内不同半径的圆相同，因为它们之间的被积函数解析。','正幂描述外圈，负幂记住洞里的障碍。'],
['同一函数，不同圆环不同展开','1/[z(z−1)]=−1/z+1/(z−1)','0<|z|<1：−1/z−Σₙ₌₀∞zⁿ；|z|>1：Σₖ₌₀∞z⁻ᵏ⁻²。两种几何级数使用不同的比值。','跨过奇点 1 就必须换一种编码。']],pitfall:'外圆环的 c₋₁ 不一定是中心点的局部留数。例中外圆环 c₋₁=0，表示包住 0、1 两极点的总贡献相消；0 的局部留数仍为 −1。',check:['为什么不能把外圆环展开直接拿到 |z|=1/2 用？','用于展开的 1/z 的模必须小于 1；此处为 2，不满足几何级数条件。']},
{id:'residue',chapter:5,title:'为什么闭路积分只留下负一次项',lab:10,needs:['laurent','integral','goursat'],condition:'C 为正向简单闭曲线，f 在 C 及内部除有限个孤立奇点 aⱼ 外解析，且奇点均不在路径上。',result:'∮C f dz=2πi Σⱼ Res(f,aⱼ)，Res(f,a)=c₋₁',steps:[
['先看一个幂绕小圆','ζ=z−a=ρeⁱᵗ ⇒ ∮ ζⁿdζ=iρⁿ⁺¹∫₀²πeⁱ⁽ⁿ⁺¹⁾ᵗdt','n 为整数。n≠−1 时，指数在整圈内完整振荡，积分为 0。','每个非零频率都正负相消。'],
['唯一不振荡的幂','n=−1 ⇒ eⁱ⁽ⁿ⁺¹⁾ᵗ=1 ⇒ ∮ dζ/ζ=2πi','积分中的 dζ 自带一个 eⁱᵗ，恰好与 ζ⁻¹ 的旋转抵消。','负一次项像一束始终同向的小箭头。'],
['给洛朗级数逐项积分','∮ f dz=Σ cₙ∮(z−a)ⁿdz=2πi c₋₁','小圆必须完整落在该孤立奇点的洛朗收敛圆环内；在此紧圆周上一致收敛，允许换序。','闭路像筛子，只保留一个系数。'],
['多个奇点，各挖一个小圆','∮C f dz=Σⱼ ∮小圆ⱼ f dz=2πi Σⱼ c₋₁,ⱼ','挖孔区域里 f 解析，由柯西定理，外圈等于各逆时针小圈之和。','整体积分拆成各个局部的贡献。']],pitfall:'可去奇点留数为 0；本性奇点也可能有留数。一般闭路需加入绕数，当前公式先采用每个内点绕数 +1 的简单正向闭路。',check:['f=1/[z(z−1)]，围住两个极点的积分是多少？','0 处留数 −1，1 处留数 +1，和为 0，故积分为 0。']},
{id:'poles',chapter:5,title:'一阶与高阶极点的留数公式从哪来',lab:10,needs:['laurent','taylor','residue'],condition:'a 为 m 阶极点，g(z)=(z−a)ᵐf(z) 在 a 附近可解析延拓且 g(a)≠0。',result:'Res(f,a)=g⁽ᵐ⁻¹⁾(a)/(m−1)!；简单零点商式 Res(p/q,a)=p(a)/q′(a)',steps:[
['先消掉极点','f(z)=g(z)/(z−a)ᵐ','g 已经解析，可以做普通泰勒展开。','把负幂的外壳剥掉。'],
['展开后再移回幂次','g(z)=Σₖ₌₀∞ g⁽ᵏ⁾(a)(z−a)ᵏ/k! ⇒ f(z)=Σₖ₌₀∞ g⁽ᵏ⁾(a)(z−a)ᵏ⁻ᵐ/k!','寻找幂次 −1，即解 k−m=−1，得到 k=m−1。','整排幂次向左平移 m 格。'],
['于是得到高阶公式','Res(f,a)=[dᵐ⁻¹/dzᵐ⁻¹ ((z−a)ᵐf(z))]z=a /(m−1)!','m=1 时无需求导，退化为 limz→a (z−a)f(z)。','筛子只问平移后哪一项落在 −1。'],
['商式的快捷结果','q(a)=0，q′(a)≠0 ⇒ q(z)/(z−a)→q′(a) ⇒ Res(p/q,a)=p(a)/q′(a)','p、q 需在 a 附近解析；若 p(a)=0 可能抵消奇点，此时留数仍为 0，但不一定还有一阶极点。','分母在零点附近像一条非平坦直线。']],pitfall:'高阶极点不能只算 lim(z−a)f；留数不是最高负幂的系数。',check:['eᶻ/z³ 在 0 的留数是多少？','m=3，g=eᶻ，所以 Res=g″(0)/2!=1/2；也可直接看 eᶻ/z³ 中的 z⁻¹ 项。']},
{id:'real',chapter:5,title:'留数怎样算出 ∫ dx/(1+x²)=π',lab:11,needs:['residue','poles','integral'],condition:'取上半圆正向围道，R>1；实轴段从 −R 到 R，圆弧从 R 回到 −R。',result:'∫₋∞∞ dx/(1+x²)=π',steps:[
['把实积分补成闭路','∫₋ᴿᴿ dx/(1+x²)+∫圆弧 dz/(1+z²)=∮ dz/(1+z²)','补路是新增的积分，不能直接忽略；复化后极点为 i、−i。','实轴一条直路，加上天空中的半圆。'],
['只取上半平面内的极点','Res(1/(1+z²),i)=1/(2i) ⇒ ∮ dz/(1+z²)=2πi·1/(2i)=π','由 q′(i)=2i；下半平面的 −i 不在这个围道内部。','整体只读取上方那个极点。'],
['证明补上的圆弧消失','|1+z²|≥R²−1 ⇒ |∫圆弧 dz/(1+z²)|≤πR/(R²−1)→0','反三角不等式给分母下界，弧长为 πR，再套 ML。','路径长约 R，函数衰减约 1/R²，总贡献约 1/R。'],
['最后才取无穷远极限','∫₋ᴿᴿ dx/(1+x²)=π−∫圆弧 dz/(1+z²) → π','且实轴两端 |1/(1+x²)|≤1/x²，故两侧广义积分分别绝对收敛，结果不只是对称主值。','补路的贡献归零，留下所求实积分。']],pitfall:'并非任何函数的大圆弧积分都趋零，必须估计。实轴有极点时还须说明凹进路径或主值，不能照搬本例。',check:['如果没有证明圆弧趋零，会缺哪一步？','闭路积分 π 仍包含圆弧贡献，无法直接断言实积分也等于 π。']},
{id:'singularity',chapter:3,title:'负幂结构 → 孤立奇点的分类',lab:9,needs:['laurent'],condition:'f 在 0<|z−a|<R 解析，即 a 是孤立奇点；分类来自此去心邻域的洛朗展开。',result:'无负幂：可去；有限个负幂：极点；无限个负幂：本性',steps:[
['没有负幂，就能补中心','f(z)=c₀+c₁(z−a)+⋯ ⇒ 定义 f(a)=c₀','此时幂级数在包含中心的圆盘内解析，得到解析延拓。','洞里没有障碍，只是漏画一个点。'],
['有限个负幂，看最左一项','f(z)=c₋ₘ(z−a)⁻ᵐ+⋯，c₋ₘ≠0 ⇒ (z−a)ᵐf(z)→c₋ₘ','把 m 个负次幂移回原点，得到非零解析函数；因而 |f(z)|→∞。','乘一个合适的幂，可以填平这个洞。'],
['无限个负幂，没有有限幂能消掉','e¹⁄⁽ᶻ⁻ᵃ⁾=Σₖ₌₀∞ (z−a)⁻ᵏ/k!','无论乘 (z−a) 的几次幂，仍留有无限负幂。这就是本性奇点的洛朗判据。','不断向左延伸的幂次，没有最左端。']],pitfall:'log z 的支点不满足去心邻域内单值解析的前提，不能直接归入这三个孤立奇点类别。',check:['sin z/z 在 0 属于什么奇点？','展开为 1−z²/3!+⋯，无负幂，所以可去，补值为 1。']}
];
window.PROOFS.push({id:'elementary',chapter:1,title:'求导规则 → 幂、指数、对数与三角函数',lab:2,needs:['euler','cr','roots'],condition:'各函数在考察点复可导；商的分母非零。Log 指已在开域上选好的解析分支，不能跨割线直接使用。',result:'(zⁿ)′=nzⁿ⁻¹；(eᶻ)′=eᶻ；(Log z)′=1/z；(sin z)′=cos z',steps:[
['规则从局部线性展开而来','f(z+h)=f(z)+f′(z)h+o(|h|)，g(z+h)=g(z)+g′(z)h+o(|h|)','相乘并减去 f(z)g(z)，只保留一次项；h² 与小余项除以 h 后趋零。因此 (fg)′=f′g+fg′。和的规则同理。','两种局部变化各贡献一次，二次小量消失。'],
['倒数、商与复合','(1/g)′=−g′/g²；(f/g)′=(f′g−fg′)/g²；(f∘g)′=f′(g)g′','倒数规则可由差商 [1/g(z+h)−1/g(z)]/h 直接通分得到；链式法则将两个局部线性近似依次代入，g 的增量是 O(|h|)，余项仍为 o(|h|)。','两次局部旋转缩放的乘数相乘。'],
['幂函数先用有限二项式','[(z+h)ⁿ−zⁿ]/h=nzⁿ⁻¹+Σₖ₌₂ⁿ C(n,k)zⁿ⁻ᵏhᵏ⁻¹ → nzⁿ⁻¹','先对正整数 n 证明；n=0 为常数；负整数在 z≠0 时由倒数规则推出。','差商中只有 h 的一次项能留下。'],
['指数的导数仍为自身','(eᶻ)′=Σₙ₌₁∞ nzⁿ⁻¹/n!=Σₖ₌₀∞ zᵏ/k!=eᶻ','逐项微分需理由：原级数与导数级数都在每个紧圆盘上一致收敛，可用可微函数级数定理；两级数的收敛由阶乘比值控制。','移走一阶，阶乘恰好抵消出现的 n。'],
['反解指数得到对数导数','eᴸ⁽ᶻ⁾=z ⇒ eᴸ⁽ᶻ⁾L′(z)=1 ⇒ L′(z)=1/z','在已经选定的解析对数分支上用链式法则；不同分支相差常数 2kπi，导数相同。','指数与对数局部互相还原。'],
['三角、双曲函数不必另背一套','sin z=(eⁱᶻ−e⁻ⁱᶻ)/(2i) ⇒ (sin z)′=(eⁱᶻ+e⁻ⁱᶻ)/2=cos z','同理由指数表示推出 (cos z)′=−sin z、(sinh z)′=cosh z、(cosh z)′=sinh z。每次代入都要带上内层 ±i 或 ±1。','复合变换的方向因子不能漏掉。']],pitfall:'对数的形式相同不代表能忽略分支；负整数幂在零点无定义。仅写下逐项求导结果，不能代替一致收敛等交换条件。',check:['(eᶻ²)′ 与 (eᶻ)² 的导数一样吗？','不一样：前者为 2zeᶻ²，后者为 2e²ᶻ。前者内层是 z²，后者是指数函数值的平方。']});
window.PROOFS.sort((a,b)=>a.chapter-b.chapter);

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
 $('#proof-nav').innerHTML=P.map((x,i)=>`<button data-proof="${i}" class="${i===current?'active':''}"><small>第 ${x.chapter} 章</small>${escape(x.title)}</button>`).join('');
 $('#proof-article').innerHTML=`<p class="eyebrow">公式推导 · 第 ${p.chapter} 章</p><h1>${escape(p.title)}</h1><p>先看条件，再逐步展开。每个箭头都有理由；图解用于理解，证明以文字中的等式和估计为准。</p><div class="proof-condition"><strong>什么时候可以用</strong><p>${escape(p.condition)}</p></div><p class="formula">${escape(p.result)}</p><div class="proof-dependencies"><span>用到的前置结论：</span>${p.needs.length?p.needs.map(id=>{const n=P.findIndex(x=>x.id===id);return `<button data-proof="${n}">${escape(P[n].title)} ↗</button>`}).join(''):'复数定义与实微积分基础'}</div><div class="proof-track" aria-label="推导步骤">${p.steps.map((x,i)=>`<button data-proof-step="${i}" aria-pressed="${all||i<=step}" title="${escape(x[0])}">${i+1}<span>${escape(x[0])}</span></button>`).join('')}</div><div class="proof-step-list">${active.map((x,i)=>`<section class="proof-step"><div class="proof-step-number">${i+1}</div><div><h2>${escape(x[0])}</h2><p class="formula">${escape(x[1])}</p><p><strong>为什么成立：</strong>${escape(x[2])}</p><p class="proof-picture"><span aria-hidden="true">↳</span> ${escape(x[3])}</p></div></section>`).join('')}</div><div class="proof-actions"><button class="action-button" id="proof-prev" ${step===0?'disabled':''}>← 上一步</button><span role="status">${all?'全部步骤':`${step+1} / ${p.steps.length} 步`}</span><button class="primary" id="proof-next" ${step===p.steps.length-1||all?'disabled':''}>推到下一步 →</button><button class="text-button" id="proof-all">${all?'恢复逐步阅读':'一次展开全部'}</button></div><div class="pitfall proof-condition"><strong>别跳过这个条件</strong><p>${escape(p.pitfall)}</p></div><details class="proof-check"><summary>${escape(p.check[0])} · 点击核对</summary><p>${escape(p.check[1])}</p></details><button class="action-button" data-lesson="${p.lab}">回到对应交互实验 ↗</button><p class="proof-next-topics">继续推导：${P.map((x,i)=>x.needs.includes(p.id)?`<button class="text-button" data-proof="${i}">${escape(x.title)} →</button>`:'').join('')||'可以回到知识网络，检查这条结论的用途。'}</p>`;
 const returnButton=$('#proof-article [data-lesson]');if(originLesson!==null){returnButton.dataset.lesson=originLesson;returnButton.textContent=`回到正在学习的第 ${originLesson+1} 课 ↗`;}
 const visual=document.createElement('section');visual.className='proof-visual';visual.innerHTML='<h2>把推导中的一步画出来</h2><div id="proof-diagram"></div>';$('#proof-article').insertBefore(visual,$('.proof-track'));$('#proof-diagram').innerHTML=diagram();
 visual.addEventListener('input',e=>{if(e.target.id!=='proof-dial')return;const value=Number(e.target.value);const temp=document.createElement('div');temp.innerHTML=diagram(value);visual.querySelector('svg').replaceWith(temp.querySelector('svg'));visual.querySelector('[aria-live]').replaceWith(temp.querySelector('[aria-live]'))});
 $('#proof-prev').onclick=()=>{all=false;step=Math.max(0,step-1);draw()};
 $('#proof-next').onclick=()=>{step=Math.min(p.steps.length-1,step+1);draw()};
 $('#proof-all').onclick=()=>{all=!all;draw()};
}
function open(n,scroll=true){current=n;step=0;all=false;window.ComplexLabShowView('proof',scroll);draw();if(location.hash!=='#proof-'+P[n].id)location.hash='proof-'+P[n].id;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-proof]');if(b){if(b.closest('#lesson-proof-links')){const n=window.LESSONS.findIndex(l=>location.hash==='#lab-'+l.id);originLesson=n>=0?n:null;}open(Number(b.dataset.proof));}const s=e.target.closest('[data-proof-step]');if(s){step=Number(s.dataset.proofStep);all=false;draw()}});
window.ComplexLabOpenProof=()=>{originLesson=null;open(current)};
window.ComplexLabProofLinks=lab=>P.map((p,i)=>p.lab===lab?`<button class="action-button" data-proof="${i}">${escape(p.title)} ↗</button>`:'').join('');
window.addEventListener('hashchange',route);route();
if(location.hash==='#proof')open(0,false);
const labIndex=window.LESSONS.findIndex(l=>location.hash==='#lab-'+l.id);if(labIndex>=0)$('#lesson-proof-links').innerHTML=window.ComplexLabProofLinks(({0:1,3:6})[labIndex]??labIndex);
})();
