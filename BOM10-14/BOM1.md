提前声明：

1. 从这周开始，第二天早上随机抽查一名学生讲前一天的知识点；
2. 每周末要上传一份个人学习总结，包括：心得体会，个人建议，学习不足的地方；
3. 早上9：05未到视为迟到，第一次罚站10分钟，第二次打扫当天卫生，三次以上者，办公室谈话；有事情找我请假，微信号 farway-togo；



## BOM

`ECMAScript` 是 `javascript` 的核心，但是如果要在 `web` 中使用 `javascript`，那么 `BOM` (浏览器对象模型)才是真正的核心。BOM提供了很多对象，用于访问浏览器的功能，这些功能与任何网页内容无关。

`BOM` 的核心对象是 `window` ，它表示浏览器的一个实例。在浏览器中， `window` 对象有双重角色，它既是通过 `javascript` 访问浏览器窗口的一个接口，又是 `ECMAScript` 规定的 `Global` 对象。所有全局作用域中声明的变量、函数都会变成 `window` 对象的属性和方法。

### 三大家族其一 `Offset` 家族

> 家族成员： `offsetWidth` `offsetHeight` `offsetLeft` `offsetTop` `offsetParent`

#### `offsetWidth`  `offsetHeight`  （检测盒子自身宽高）

> 这两个属性，他们绑定在了所有的节点元素上。获取之后，只要调用这两个属性，我们就能够获取元素节点的宽和高。

>` offset宽/高  =  盒子自身的宽/高(width/height) + padding +border`

#### `offsetLeft`  和  `offsetTop`  （检测距离有定位的父盒子的左/上面的距离）

> 如果父级都没有定位则以 `body` 为准, `offsetLeft` 从父亲的 `padding` 开始算,父亲的 `border` 不算。
> 在父盒子有定位的情况下，`offsetLeft == style.left`(去掉 px)

#### `offsetTop/Left` 和 `style.top/left` 的区别：

1. 最大区别在于 `offsetTop/Left` 可以返回没有定位盒子的距离左侧的位置。而 `style.top/left` 不可以

2. `offsetTop/Left` 返回的是整数，而 `style.top/left` 返回的是字符串，除了数字外还带有单位：`px`

```js
<div class="d1" style="position:relative;width: 300px;height: 200px;background-color: green;"></div>
<script>
	var d1= document.getElementsByClassName('d1')[0];
	d1.onclick = function(){
		d1.style.width = '400.499999999999999px';
		console.log(d1.offsetWidth);	// 401
		console.log(d1.style.width);	// "400.5px"
		d1.style.top = "50.49999999999999px";
		console.log(d1.style.top)	// "50.5px"
		console.log(d1.offsetTop)	// 51
	}
</script>
```

3. `offsetTop/Left` 只读，而 `style.top/left` 可读写。（只读是获取值，可写是赋值）

4. `obj.style.xxx` 只能获取行内样式

#### `offsetParent`   （检测父系盒子中带有定位的父盒子节点）

返回该对象的父级 （带有定位）

> 1、如果当前元素的父级元素没有进行 CSS 定位(absolute,relative,fixed) `offsetParent` 为 `body`
> 	
>2、如果当前元素的父级元素中有 CSS 定位 `offsetParent` 取最近的那个父级元素。

### 动画和封装1

1. 动画的种类
	+ 闪现动画（被淘汰）
	+ ```js
		<div class="box" style="position:relative;width:200px;height:200px;background-color: red;"></div>
		<button>跳到400</button>
		<button>跳到800</button>
		<script type="text/javascript">
			var box = document.getElementsByClassName("box")[0];
			var btn = document.getElementsByTagName("button")[0];
			var btn1 = document.getElementsByTagName("button")[1];
			btn.onclick = function (){
				box.style.left = "400px";
			}
			btn1.onclick = function (){
				box.style.left = "800px";
			}
		</script>
		```
	+ 匀速动画
	+ 缓动动画



2. 动画原理
	+ 物体运动： 起点，终点，速度（距离/时间）
	+ 盒子的位置 = 盒子本身所在的位置 + 步长

> 缓动动画计算方式：
> leader = leader + (target - leader) / 10;
> 
> 起点 = 起点 + (终点 - 起点) / 10;

```js
// 匀速动画的封装
function averageMove(ele,target){
	// 先清除上一个元素上绑定的定时器   防止定时器冲突
	clearInterval(ele.timer);
	// 先写定时器
	ele.timer = setInterval(function (){
		// 起点 style.left 只能获取行内样式 , 获取到的值是 "56px"
		var start = ele.offsetLeft;
		// 步长  需要判断方向
		var step = target > start ? 10 : -10;
		// 运动 运动距离 = 起点 + 步长
		ele.style.left = start + step + "px";
		// 需要停止定时器的条件  终点与起点的距离 <= 步长
		if(Math.abs(target - start) <= Math.abs(step)){
			clearInterval(ele.timer);
			// 直接到终点
			ele.style.left = target + "px";
		}
	},17)
}
```


