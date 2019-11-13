### 媒体查询

响应式布局的含义是：一个页面就跟 变形金刚 一样，针对不同屏幕的尺寸，可以得出不同的显示效果。当你缩放的时候，页面会自动伸缩，无论是在手机端，Pad，电脑端的屏幕，都能很好的展现。

使用 `@media` 查询，你可以针对不同的媒体类型定义不同的样式。

`@media` 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，`@media` 是非常有用的。

当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

语法：
```css
@media mediatype and (media feature) {
  CSS-Code;
}
```

解释：

`mediatype` 表示媒体查询类型：可选参数 screen 用于电脑屏幕，平板电脑，智能手机等，其它的不是废弃就是少见

`media feature`  媒体功能，常用的有：

+ `max-width`	定义输出设备中的页面最大可见区域宽度
+ `min-width`	定义输出设备中的页面最小可见区域宽度
+ `max-height/min-height`
+ `orientation`	检测设备目前处于横向(landscape)还是纵向(portrait)状态
+ `aspect-ratio` 检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)

更多类型请查询: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)

```css
<!-- 例如：有的 screen 前面有 only -->
@media screen and (max-width: 1200px) {
	.box {
		background-color: yellow;
	}
}
<!-- screen 可以省略，填上screen 是告知设备在打印页面时使用衬线字体，在屏幕上显示时用无衬线字体。但是目前很多网站都会直接省略screen,因为你的网站可能不需要考虑用户去打印，可以写成这种形式 -->
@media (min-width: 960px){
  .box {
  	background-color: yellow;
  }
}
<!-- 也可以连写：表示当页面宽度大于960 或者 小于1200的时候执行内部代码 -->
@media screen and (min-width:960px) and (max-width:1200px){
	.box {
		background-color: yellow;
	}
}
```

**只写min-width的时候,需要注意书写顺序,最小屏在最上面,同理,max-width相反**

也可以针对不同的媒体使用不同 `stylesheets` :
```html
<link rel="stylesheet" media="mediatype and (media feature)" href="mystylesheet.css">

<!-- 例如：当设备宽度小于 1200px 使用外部样式 -->
<link rel="stylesheet" media="(max-width: 1200px)" href="style.css">
```

### 兼容IE
因为IE8既不支持HTML5也不支持CSS3 Media，所以我们需要加载两个JS文件，来保证我们的代码实现兼容效果：
```css
<!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
```

### 设置IE渲染方式默认为最高(这部分可以选择添加也可以不添加)
针对的情况是：使用IE9的浏览器，但是浏览器的文档模式却是IE8，所以写上下面的代码，保证IE的文档模式始终是最最新的

`<meta http-equiv="X-UA-Compatible" content="IE=edge">`

也可以写成：

`<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">`

这段代码后面加了一个chrome=1，这个Google Chrome Frame（谷歌内嵌浏览器框架GCF），如果有的用户电脑里面装了这个chrome的插件，就可以让电脑里面的IE不管是哪个版本的都可以使用Webkit引擎及V8引擎进行排版及运算，无比给力，不过如果用户没装这个插件，那这段代码就会让IE以最高的文档模式展现效果。建议用上，不用也可以。


### 屏幕尺寸区分
```
/*一般按照768px作为区分 小于768则认为是移动端*/
@media (max-width: 768px){
	.banner{
		display: none;
	}
	.banner-m{
		display: block;
	}
}
/*
	响应式的临界值分为 
	1  xs(超小屏幕)   <768px
	2  sm(小屏幕)     768   992
	3  md             992   1200
	4  lg             >1200
*/
```

