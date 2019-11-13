## 动画

动画是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果

### 必要元素

a、通过@keyframes指定动画序列；

b、通过百分比将动画序列分割成多个节点；亦可以使用 from/to 不推荐

c、在各节点中分别定义各属性

d、通过animation将动画应用于相应元素

### 关键属性

+ Animation-name	 动画名称(必填)
+ Animation-duration	 动画持续时间(必填)
+ animation-timing-function
	+ linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier(n,n,n,n)：	特定的贝塞尔曲线类型
+ animation-delay	动画延迟（只是第一次）
+ animation-iteration-count	 重复次数	infinite 无限次
+ animation-direction		动画是否重置后再开始播放
	+ alternate 动画直接从上一次停止的位置开始执行，倒着来
	+ normal	动画第二次直接跳到0%的状态开始执行
+ animation-fill-mode		动画执行完毕后状态
	- forwards	当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
	- backwards	在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
	- both	设置对象状态为动画结束或开始的状态，结束时状态优先



语法:	`animation: name duration timing-function delay iteration-count direction fill-mode;`

**name duration 必须写,其余可以都不写**



### 动画状态

**animation-play-state**	动画状态（running 执行 和 paused 暂停）



### 帧动画

在应用 CSS3 动画时，有个控制时间的属性 timing-function 。它的取值中除了常用到的 贝塞尔曲线 以外，还可以是 **steps()** 函数

**steps(n,start/end)** 

​	第一个参数 number 为指定的间隔数，即把动画分为 n 步阶段性展示

​	第二个参数默认为 end，设置最后一步的状态，start 为结束时的状态，end 为开始时的状态(不用记,第二个参数不写就行)

**注意: n 必须是正整数**



### 动画监听
`ele.addEventListener("animationend", myStartFunction);`

动画的事件：
+ animationstart - CSS 动画开始后触发
+ animationiteration - CSS 动画重复播放时触发
+ animationend - CSS 动画完成后触发

**注意： 动画只能通过监听方法添加事件，on方式无法绑定事件**

过渡监听
```
// 过渡只有监听结束的方法,  start 和 run 的监听方法在开发状态
d2.addEventListener('transitionstart',function () {
	console.log('过渡开始...');
})
d2.addEventListener('transitionrun', function() {
	console.log("过渡执行中");
});
d2.addEventListener('transitionend',function () {
	console.log('过渡结束...');
```

## 滚轮监听

```js
// 火狐监听的滚轮事件
window.addEventListener("DOMMouseScroll",function(event){
	// 火狐
	// 方向: 3 往下; -3 往上 
	console.log(event.detail)
});
window.onmousewheel = function (event) {
	// wheelDelta可以测试滚动
	// 可以判断滚动方向 但是无法判断滚动幅度.
	// 方向: -120 往下滚动  ; 120 往上滚动
	// 有兼容问题,也可能是 -150 150
	console.log(event.wheelDelta);	
}    //IE  除了火狐之外 ，这种方式都能处理
```

## 基础动画展示

+ 表  （加指针 加刻度 作业）
+ 炫纹进度条
+ 宇宙
+ 酷炫的鼠标跟随
+ 鲨鱼帧动画 （从网上任意找一个实现）
+ 自封装滚屏 （小点添加）
+ 自封装页面滚动特效  （元素距离body的上边距 - 当前屏幕高 < 滚动条卷入高度 ，添加特效）
+ 3D 轮播 （自学习）
+ 创意动画 1-2 个

