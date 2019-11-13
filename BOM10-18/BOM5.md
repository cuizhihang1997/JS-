# 新的动画函数

## 传统动画的弊端

编写动画的关键是循环间隔的设置，一方面，循环间隔足够短，动画效果才能显得平滑流畅；另一方面，循环间隔还要足够长，才能确保浏览器有能力渲染产生的变化。

大部分的电脑显示器的刷新频率是60HZ，也就是每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会提升。因此，最平滑动画的最佳循环间隔是 1000ms / 60 ，约为16.7ms。

在实际项目中我们经常会遇到生成动画的需求，传统方法是通过使用`setTimeout`和`setInterval`进行实现，但是定时器动画有两个弊端：

- 时间间隔并不好拿捏，设置太短浏览器重绘频率太快会产生性能问题，太慢的话又显得像PPT不够平滑，业界推荐的时间间隔是16.66...（大部分电脑显示器刷新频率是60Hz，1000ms/60）
- 它们实际上只是把任务添加到了任务队列中，但是如果前面的任务还没有执行完成，它们必须要等待。 所要执行的动画就会被搁置。



为了解决这个问题HTML5加入了`requestAnimationFrame`

特点如下:

+ `requestAnimationFrame` 不需要设置时间，采用系统时间间隔，保持最佳绘制效率，能达到最佳的动画效果。
+ `requestAnimationFrame` 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成。
+ 当 `requestAnimationFrame()` 是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销



## `requestAnimationFrame`

<font color="red">MDN的上的解释：</font>

> `window.requestAnimationFrame()` 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。 

### 语法

 `var requestId = requestAnimationFrame(callback);`

这会让 `callback` 函数在浏览器每次重绘的最近时间运行。

多个 `requestAnimationFrame` 回调只会有一次几何重新计算和重绘，而不是多次。

### 返回值

 一个整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。可以传这个值给 `window.cancelAnimationFrame()` 以取消回调函数。 

```javascript
// 取消回调的周期执行
cancelAnimationFrame(requestId);
```

### 回调函数参数

`callback` 默认得到一个参数 —— 从页面加载开始经过的毫秒数。这个时间也可通过调用 `performance.now()` 得到。

> 注：`performance.now()` 返回一个表示从性能测量时刻开始经过的毫秒数



### 例子

```html
<div id="box"></div>
<script type="text/javascript">
    var n = 0;
    function move(){
        n += 5;
        box.style.left = n + "px";
        if(n < 300) requestAnimationFrame(move);
    }
</script>
```



### 与 `setInterval` 对比

```js
// 让页面加载两秒
window.onload = function (){
    var old = performance.now();
    var end = null;
    // function fn(time){
    // 	console.log(time - old);
    // 	old = time;
    // 	count ++;
    // 	if(count === 20){
    // 		window.cancelAnimationFrame(end);
    // 		return;
    // 	}
    // 	end = requestAnimationFrame(fn);
    // }
    // requestAnimationFrame(fn)

    var timer = setInterval(function (){
    	count ++;
    	var time = performance.now();
    	console.log(time - old);
    	if(count === 20){
    		clearInterval(timer);
    	}
    	old = time;
    },1000/60)
}
```



## 结构化动画

使用 `requestAnimationFrame` 创建一个通用的动画函数

补间动画：在固定的时间点，有固定的的位置。只需要根据运动的已过时间的百分比去计算数值

```js
/**
 * 补间动画方法
 * @param { Number } start 开始数值
 * @param { Number } end   结束数值
 * @param { Number } time  补间时间
 * @param { Function } callback 每帧的回调函数
 **/
function animate(start, end, time, callback){
	var startTime = performance.now(); // 设置开始的时间戳
	var differ = end - start; // 拿到数值差值
	// 创建每帧之前要执行的动画
    function loop(now){
        var passTime = now - startTime; // 获取当前时间和开始的时间差
        var per = passTime / time; // 计算当前已过百分比
        if( per >= 1 ){  // 判读如果已经执行
            per = 1; // 设置为最后的状态
        }
        var pass = differ * per; // 通过已过时间的百分比 * 开始结束数值差得出当前的数值
        callback(pass); // 调用回调函数,把数值传递进去
        if(per < 1) requestAnimationFrame(loop) //下一阵调用每帧之前要执行的函数
    }
    requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
}

```

带有时序函数的动画封装：

```js
function animate(timing, draw, duration){
    var start = performance.now();
    requestAnimationFrame(function animate(time){
        // timeFraction 从 0 增加到 1
        var timeFraction = (time - start) / duration;
        if(timeFraction > 1) timeFraction = 1;
        
        // 计算当前动画状态
        var process = timing(timeFraction);
        
        draw(progress); // 绘制
        
        if(timeFraction < 1){
            requestAnimationFrame(animate);
        }
    })
}
```

<font color="green">解析：</font>

这里 animate 函数接受3个描述动画的基本参数：

+ `duration`  动画运行的总毫秒数。 比如 1000

+ `timing(timeFraction)`  计算动画进度的函数（ 时序函数）。获取从 0 到 1 的小数时间，返回动画进度，通常也是从 0 到 1。类似 CSS 属性 transition-timing-function ，传入一个已过去的时间与总时间之比的小数（0 代表开始，1 代表结束），返回动画完成度（类似 Bezier 曲线中的 y）。

+ `draw(process)`  获取动画完成状态并绘制的函数。值 `progress = 0` 表示开始动画状态，`process = 1` 表示结束状态。这是实际绘制动画的函数。例如：

  ```js
  function draw(process){
      box.style.left = process + "px";
  }
  ```

  

与 CSS 动画不同，我们可以在这里设计任何时序函数和任何绘图函数。时序函数不受 Bezier 曲线的限制。并且 `draw` 不局限于操作 CSS 属性，还可以为类似烟花动画或其他动画创建新元素。 



## 时序函数

简单的线性时序函数

```js
function linear(timefractoin){
	return timeFraction;
}
```



如果我们想加速动画，我们可以让 `progress` 为 `n` 次幂。

 例如，抛物线： 

```js
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
```



### 圆弧

```js
function circle(timeFraction){
	return 1 - Math.sin(Math.acos(timeFraction));
}
```



### 反弹：弓箭射击

```js
function back(x, timeFraction){
	return Math.pow(timeFraction, 2) * ((x+1) * timeFraction - x);
}
```



### 弹跳

bounce 函数的效果类似于我们抛球后，球落下然后弹跳几次停下来，但是顺序是相反的。

```js
function bounce(timeFraction){
    for(var a = 0,b = 1, result; 1; a += b, b/= 2){
        if(timeFraction >= (7 - 4 * a) / 11){
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}
```



### 伸缩动画

另一个“伸缩函数”接受附加参数 x 作为“初始范围”。

```js
function elastic(x, timeFraction){
	return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction); 
}
```



### 逆转：ease*

有一组时序函数。它们的直接应用称为“easeIn”。有时我们需要以相反的顺序显示动画。这是通过“easeOut”变换完成的。

#### easeOut变换

在“easeOut”模式中，我们将 `timing` 函数封装到 `timingEaseOut`中：

```js
timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction);
```

换句话说，我们有一个“变换”函数 `makeEaseOut`，它接受一个“常规”时序函数 `timing` 并返回一个封装器，里面封装了 `timing` 函数： 

```js
// 接受时序函数，返回变换后的变体
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
```

 例如，我们可以使用上面描述的 `bounce` 函数： 

```javascript
var bounceEaseOut = makeEaseOut(bounce);
```

 这样，弹跳不会在动画开始时执行，而是在动画结束时。这样看起来更好： 

- 常规弹跳 —— 物体在底部弹跳，然后突然跳到顶部。
- `easeOut` 变换之后 —— 物体跳到顶部之后，在那里弹跳。

```js
function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

let bounceEaseOut = makeEaseOut(bounce);

brick.onclick = function() {
    animate({
        duration: 3000,
        timing: bounceEaseOut,
        draw: function(progress) {
            box.style.left = progress * 600 + 'px';
        }
    });
};
```

#### easeInOut变换

我们还可以在动画的开头和结尾都显示效果。该变换称为“easeInOut”。

给定时序函数，我们按下面的方式计算动画状态：

```js
if (timeFraction <= 0.5) { // 动画前半部分
  return timing(2 * timeFraction) / 2;
} else { // 动画后半部分
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
```

封装后：

```js
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(bounce);
```

