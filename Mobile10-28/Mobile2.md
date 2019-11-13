## 移动端事件
1. `touch`  只有移动端才有`touch`事件
+ `touchstart：`当手指触碰屏幕时候发生。不管当前有多少只手指
+ `touchmove：`当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用 `event.preventDefault()` 阻止默认情况的发生：阻止页面滚动
+ `touchend：`当手指离开屏幕时触发
+ `touchcancel：`系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用


触摸事件的响应顺序:
`ontouchstart > ontouchmove > ontouchend > onclick  300ms延时`


`Click` 事件在手机端会出现大概 300ms 的延迟，实际的执行延迟要比这个大，因为浏览器的内核运行也需要消耗时间。延迟执行的原因是苹果最早在手机上做了一个事件，当双击页面的时候，页面放大。也就是说，在点击之后的 300ms 之内，如果没有再次出发点击，则认为是单击事件，如果再次触发则认为 是双击事件。

但目前，一般在手机 web 中，不允许缩放，也就没有双击事件，但是 click 延迟执行会影响用户体验

*谷歌判断点击的条件是: 长按压`long press`的时间阈值为 700ms, 超过700ms就不再触发`click`事件*

去除延迟: 有文档里面提到在2014年的Chrome 32版本已经把这个延迟去掉了，如果有一个meta标签：

`<meta name="viewport" content="width=device-width">`

即把viewport设置成设备的实际像素，那么就不会有这300ms的延迟，并且这个举动受到了IE/Firefox/Safari(IOS 9.3)的支持，也就是说现在的移动端开发可以不用顾虑click会比较迟钝的问题

如果设置initial-scale=1.0，在chrome上是可以生效，但是Safari不会：

`<meta name="viewport" content="initial-scale=1.0">`

还有第三种办法就是设置CSS:

`html{touch-action: manipulation;}`


## `touch`事件对象

每个 `touch` 事件对象包含的属性如下:
+ `clientX：`	触摸目标在视口中的x坐标
+ `clientY：`	触摸目标在视口中的y坐标
+ `identifier：`	标识触摸的唯一ID
+ `pageX：`	触摸目标在页面中的x坐标
+ `pageY：`	触摸目标在页面中的y坐标
+ `screenX：`	触摸目标在屏幕中的x坐标
+ `screenY：`	触摸目标在屏幕中的y坐标
+ `target：` 触摸的DOM节点目标
+ `touches：` 当前位于屏幕上的所有手指的信息列表
+ `targetTouches：`	位于当前DOM元素上手指的信息列表
+ `changedTouches：`	 涉及当前事件手指的列表


## 常见的移动端问题
+ 有时因为服务器或者别的原因导致页面上的图片没有找到

	```js
	用一个本地图片来替代
	<img src="images/logo.png" onerror="nofind();" />

	<script type="text/javascript"> 
	function nofind(){ 
		var img=event.srcElement; 
		img.src="images/logoError.png"; 
		img.onerror=null; //控制不要一直跳动 
	} 
	</script> 
	 
	```
+ 移动端手机号码识别（IOS）
在 iOS Safari （其他浏览器和Android均不会）上会对那些看起来像是电话号码的数字处理为电话链接，比如：
•	7位数字，形如：1234567
•	带括号及加号的数字，形如：(+86)123456789
•	双连接线的数字，形如：00-00-00111
•	11位数字，形如：13800138000
可能还有其他类型的数字也会被识别。我们可以通过如下的meta来关闭电话号码的自动识别：
`<meta name="format-detection" content="telephone=no" />`
开启电话功能
`<a href="tel:123456">123456</a>`
开启短信功能：
`<a href="sms:123456">123456</a>`

+ 移动端邮箱识别（Android）
与电话号码的识别一样，在安卓上会对符合邮箱格式的字符串进行识别，我们可以通过如下的meta来管别邮箱的自动识别：
`<meta content="email=no" name="format-detection" /> `
同样地，我们也可以通过标签属性来开启长按邮箱地址弹出邮件发送的功能：
`<a mailto:dooyoe@gmail.com">dooyoe@gmail.com</a>`

+ ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉
ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置 `-webkit-tap-highlight-color` 的 `alpha` 值为 0，也就是属性值的最后一位设置为0就可以去除半透明灰色遮罩。
`{-webkit-tap-highlight-color: rgba(0,0,0,0;)}`

+ webkit表单元素的默认外观怎么重置
`.css{-webkit-appearance:none;}`

+ 移动端禁止选中内容
如果你不想用户可以选中页面中的内容，那么你可以在css中禁掉：
```
.user-select-none {
  -webkit-user-select: none;/text
｝
```

+ 如何禁止保存或拷贝图像（IOS）
通常当你在手机或者pad上长按图像 img ，会弹出选项存储图像 或者拷贝图像，如果你不想让用户这么操作，那么你可以通过以下方法来禁止：
`img { -webkit-touch-callout: none; }`



