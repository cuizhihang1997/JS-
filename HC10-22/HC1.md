## 多媒体

### html新增元素

在HTML5之前，在网页上播放音频/视频的通用方法是利用Flash来播放，但是大多情况下，并非所有用户的浏览器都安装了Flash插件，由此使得处理音频/视频播放变的非常复杂，并且移动设备的浏览器并不支持Flash插件。

HTML5 新增 audio 标签 和 video 标签来解决音视频的问题;语法:
```html
<audio src="素材/小手拍拍.mp3" controls>不支持</audio>
<!--
	附加属性可以更友好控制音频的播放，如：
	autoplay 自动播放
	controls 是否显不默认播放控件
	loop 循环播放
	preload 预加载 同时设置autoplay时此属性失效
-->

<video src="素材/movie.ogg" width="400" height="300" controls></video>
<!--
	同样，通过附加属性可以更友好的控制视频的播放
	autoplay 自动播放
	controls 是否显示默认播放控件
	loop 循环播放
	preload 预加载，同时设置了autoplay，此属性将失效
	width 设置播放窗口宽度
	height 设置播放窗口的高度
-->
```

### 兼容问题

由于版权等原因，不同的浏览器可支持播放的格式是不一样的:
![image.png](https://upload-images.jianshu.io/upload_images/6784887-63f857d2781f53fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



多浏览器支持方案:

```html
<audio>
	<source src="素材/小手拍拍.mp3">
	<source src="素材/小手拍拍.wav">
	<source src="素材/小手拍拍.ogg">
</audio>


<video controls>
	<source src="素材/movie.ogg" type="">
	<source src="素材/movie.mp4" type="">
	您的浏览器不支持
</video>
```



### 通过 JS 控制(video 与 audio 相同)

+ 属性
	- currentTime 视频播放的当前进度
	- duration 视频的总时间
	- paused 视频播放是否是暂停
+ 方法
	- `load()` 重新加载音频/视频元素
		+ 语法: `audio|video.load()`
		+ 用于在更改来源或其他设置后对音频/视频元素进行更新
	- `play()` 播放
	- `pause()` 暂停
	- 更多精彩请自行查阅 [W3](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)
+ 事件
	- oncanplay: 事件在用户可以开始播放视频/音频（audio/video）时触发。
	- ontimeupdate: 通过该事件来报告当前的播放进度.
	- onended: 播放完时触发
+ 全屏：video.webkitRequestFullScreen()

```html
<div class="vd-box">
	<video class="vd1" src="movie.ogg"></video>
	<div class="tool-bar">
		<div class="process-bg">
			<div class="process-line"></div>
		</div>
	</div>
	<!-- load() 加载、play() 播放、pause() 暂停 -->
	<button class="btn-restart">重新播放</button>
	<button class="btn-load">load</button>
	<button class="btn-play">play</button>
	<button class="btn-pause">pause</button>
	<button class="btn-allTime">获取总时间</button>
	<button class="btn-nowTime">获取当前时间</button>
	<button class="btn-status">判断播放状态</button>
	<button class="btn-full">全屏显示</button>
</div>

<script>
	var restartBtn = document.querySelector('.btn-restart'),
		loadBtn = document.querySelector('.btn-load'),
		playBtn = document.querySelector('.btn-play'),
		pauseBtn = document.querySelector('.btn-pause'),
		allTimeBtn = document.querySelector('.btn-allTime'),
		nowTimeBtn = document.querySelector('.btn-nowTime'),
		statusBtn = document.querySelector('.btn-status'),
		fullBtn = document.querySelector('.btn-full'),
		vd = document.querySelector('.vd1');
		
	loadBtn.onclick = function () {
		vd.load();
	}
	playBtn.onclick = function () {
		vd.play();
	}
	pauseBtn.onclick = function () {
		vd.pause();
	}
	allTimeBtn.onclick = function () {
		console.log('总时间==>'+vd.duration)
	}
	nowTimeBtn.onclick = function () {
		console.log('当前播放到==>'+vd.currentTime)
	}
	statusBtn.onclick = function () {
		console.log('播放状态===>'+vd.paused)
	}
	fullBtn.onclick = function () {
		vd.webkitRequestFullScreen();
	}


	restartBtn.onclick = function () {
		vd.currentTime = 0;
	}

</script>
```



## Web 存储

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出解决方案。

### sessionStorage/localStorage

1. `storage` 存储: `window.sessionStorage` `window.localStorage` (向本地保存数据,有可能在浏览器内存里面，有可能在硬盘上面)

2. 特性
	+ 设置、读取方便
	+ 容量较大，`sessionStorage` 约5M、`localStorage` 约20M 不同的浏览器大小可能有差异
	+ 均只能存储字符串类型的对象（虽然规范中可以存储其他原生类型的对象，但是目前为止没有浏览器对其进行实现），可以将对象 `JSON.stringify()` 编码后存储

3. `window.sessionStorage`
	
	+ 生命周期为当前窗口或标签页，一旦窗口或标签页被关闭了，那么所有通过 `sessionStorage` 存储的数据也就被清空了。
	
	+ 在同一个窗口下数据可以共享
	
4. `window.localStorage`

  + 永久生效，除非手动删除
  + 可以多窗口共享
  + IE8 以上的 IE 版本才支持 `localStorage` 这个属性

  + `localStorage` 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡

5. 两者本质区别：不同浏览器无法共享 `localStorage` 或 `sessionStorage` 中的信息。相同浏览器的不同页面间可以共享相同的 `localStorage`（页面属于相同域名和端口），但是不同页面或标签页间无法共享 `sessionStorage` 的信息。
6. 方法详解
  + `setItem(key, value)` 设置存储内容     同名替换原则
  + `getItem(key)` 读取存储内容
  + `removeItem(key)` 删除键值为key的存储内容
  + `clear()` 清空所有存储内容
  + `key(n)` 以索引值来获取对应的键



## 补充新增全局属性

+ **contentEditable**属性  单独某一个标签的属性 可以使内容能被编辑

+ **designMode**属性（这个在js中进行使用，让页面中所有的元素开启可编辑模式） 让页面所有的标签都可以被编辑 比如div、p、h1等等
	
	```js
	window.onload = function() {
		document.designMode = "on";
	}
	```
	
+ **draggable** 拖拽属性
	拖拽元素: 	页面中设置了draggable="true"属性的元素，不能省略 = "true"
	
	目标元素:  页面中任何一个元素都可以成为目标元素
	
	拖拽元素
	
	+ ondrag 			应用于拖拽元素，整个拖拽过程都会调用
	+ ondragstart	应用于拖拽元素，当拖拽开始时调用
	+ ondragleave	应用于拖拽元素，当鼠标离开拖拽元素时调用
	+ ondragend		应用于拖拽元素，当拖拽结束时调用
	
	目标元素
	+ ondragenter	应用于目标元素，当拖拽元素进入时调用
	+ ondragover	应用于目标元素，当停留在目标元素上时调用
	+ ondrop	应用于目标元素，当在目标元素上松开鼠标时调用，需要在ondragover上阻止浏览器的默认事件，因为浏览器默认是禁止元素堆叠的
	+ ondragleave	应用于目标元素，当拖拽元素离开目标元素时调用
	
+ **fullscreen** 全屏属性

  + 开启全屏

  ```js
  if (E.requestFullscreen) {
  	E.requestFullscreen();
  }else if (E.webkitRequestFullscreen) {
  	E.webkitRequestFullscreen();
  }else if (E.mozRequestFullscreen) {
  	E.mozRequestFullscreen();
  }else{
  	alert("sorry,无法全屏");
  }
  ```

  + 退出全屏必须使用 document的api

  ```js
  if (document.exitFullscreen) {
  	document.exitFullscreen();
  }else if (document.webkitCancelFullScreen) {
  	document.webkitCancelFullScreen();
  }else if (document.mozCancelFullScreen) {
  	document.mozCancelFullScreen();
  }
  ```

  + 判断是否是全屏

  ```js
  function ifFullscreen(){
  	return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || false;
  }
  ```


**注意：给全屏状态下的元素添加全屏样式不起作用，给全屏状态下的元素的子类添加样式可用**

```css
.全屏状态下的元素:fullscreen 子类{
    width: 500px;
    height: 100%;	
}
```

