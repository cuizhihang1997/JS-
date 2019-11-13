## `Client` 家族

> 家族成员 `clientWidth` `clientHeight` `clientTop` `clientLeft`

#### `clientWidth` `clientHeight`

> 检测盒子的宽高 clientHeight/W 盒子 自身宽高 + padding 内容溢出不算,滚动条(默认宽度17)不算
> 
> document.documentElement.clientWidth/clientHeight  获取浏览器可视区域的宽高		没有兼容问题
> 
> window.innerWidth/innerHeight		IE <= 8 不支持			表示获取 window 可视区域的内部大小(带滚动条)
> 
> window.outerWidth/outerHeight		IE <= 8 不支持			表示整个浏览器窗体的大小

> 当有滚动条的时候 clientWidth/clientHeight 不算滚动条的宽度



#### `clientTop` `clientLeft`		只读

> 表示内容区域的左上角相对于整个元素左上角的位置   实际上就是 border 的宽度
> 
> 内容区域 内容+padding		padding 之外就剩 border
> 
> 一个元素顶部和左侧边框(border)的宽度



## 获取元素的样式

> 行内样式 可以通过 `ele.style.styleName` 获取
> 
> 内联样式和外联样式可以通过以下两种方式获取

1. `window.getComputedStyle(element, [pseudoElt]).styleName`	返回的是一个带单位的字符串
	+ 仅用于谷歌和火狐等标准浏览器
	+ `element` 用于获取计算样式的元素。
	+ `pseudoElt` 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）,一般都写成 `null`.  如果要获取伪元素的样式,则写上要获取的伪元素的名字
2. `element.currentStyle.styleName` 仅用于 IE 

3. 兼容写法:

```js
/**
* 获取任意元素的css样式
**/
function getStyle(ele,styleName){
	if(ele.currentStyle){
		return ele.currentStyle[styleName];
	}else{
		return window.getComputedStyle(ele,null)[styleName];
	}
}

```


