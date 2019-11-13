## `Scroll` 家族

> 家族成员: `scrollWidth` , `scrollHeight` , `scrollTop` , `scrollLeft`

### `scrollWidth` 和 `scrollHeight`

> 检测盒子的宽高  内容高度 + padding。（调用者：节点元素。属性。）
> 盒子内容的宽高。（如果有内容超出了，显示内容的宽/高度）

### `scrollTop` , `scrollLeft`	可读写的

前提: 目标元素有滚动条

> 被浏览器或父类遮挡的头部和左边部分。
> 可以获取或设置一个元素的内容垂直滚动的像素数。element.scrollTop/Left = XXX

**获取页面卷入高度的浏览器兼容问题： **
各浏览器下 `scrollTop` 的差异 

+ IE6/7/8： 
  对于没有 `doctype` 声明的页面里可以使用  `document.body.scrollTop` 来获取 `scrollTop` 高度 ； 
  对于有 `doctype` 声明的页面则可以使用 `document.documentElement.scrollTop` ；
+ Safari: 
  safari 比较特别，有自己获取`scrollTop`的函数 ： `window.pageYOffset` ； 
+ Firefox: 
  火狐等等相对标准些的浏览器就省心多了，直接用 `document.documentElement.scrollTop` ；

兼容写法：
`var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop`
`var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft`



---------------------------


### `onscroll` 事件

解释：当元素的滚动条滚动时触发的事件。

`onscroll`事件貌似任何实体元素都可以绑定，这里的实体元素包括DOM元素、window元素、document元素。

用法即：`element.onscroll=function(){};`

**需要注意的是,设置此事件的元素一定要有滚动条**

----------------------------------

### window滚动的方法

`window.scroll(x,y)`是让window滚动条滚动到那个x,y坐标。//x是水平坐标，y是垂直坐标。

`window.scrollBy(-x,-y)`是让window滚动条相对滚动到某个坐标，- 10即相对向左/向上滚动10像素。

`window.scrollTo(x,y)`效果和`window.scroll(x,y)`一样， 不兼容IE。

`element.scrollIntoView(boolean)` 让元素贴顶或者贴底，相对于可视区域



## 函数防抖和节流



### 函数防抖 debounce 

**指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。**即一段时间内多次触发同一事件，只执行最后一次，或者只是在开始时执行一次，中间不执行。

非立即执行版： 

```js
function debounce(func, wait){
    return function (){
        if(func.timer) clearTimeout(func.timer);
        func.timer = setTimeout(function(){
            func();
        },wait)
    }
}
```



立即执行版：

```js
function debounce(func, wait){
    var timeout;
    return function (){
        if(timeout) clearInterval(timeout);
        var callNow = !timeout;
        
        timeout = setTimeout(function (){
            timeout = null;
        },wait)
        
        if(callNow) func();
    }
}
```



区别：

非立即执行的意思是触发事件后函数不会立即执行，而是在 n 秒之后执行，如果在 n 秒内又触发了事件，则会重新计算函数的执行时间。

立即执行的意思是触发时间后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。



> 函数防抖可以理解为法师放技能的时候要读条，技能条没读完再按技能就会重新读条



### 函数节流 throttle 

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

节流会稀释函数的执行频率。一般有两种方式实现，分别是时间戳版和定时器版

时间戳版：

```js
function throttle(func, wait){
    var previous = 0;
    return function (){
        var now = Date.now();
        if(now - previous > wait){
            func();
            previous = now;
        }
    }
}
```



定时器版：

```js
function throttle(func, wait){
    var timeout;
    return function (){
        if(!timeout){
            timeout = setTimeout(function (){
                timeout = null;
                func();
            },wait)
        }
    }
}
```



区别：

时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。



> 函数节流可以理解为fps游戏的射速，就算一直按着鼠标，也只会在规定射速内射出子弹。



### 应用场景

+ debounce
  + search 搜索联想，用户不断输入值时，用防抖来节约请求资源
  + window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
+ throttle
  + onmousemove事件
  + 监听页面滚动事件，比如跟随页面滚动或划到底部加载更多