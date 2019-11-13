# BOM

## window.open

使用 `window.open()` 方法既可以导航到一个特定的 URL，也可以打开一个新的浏览器窗口。

### 参数

这个方法可以接收4个参数：

1. 要加载的URL
2. 窗口目标，相当于a标签的target属性
3. 一个特性字符串
4. 一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。

通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。

```js
// <iframe src="./2-location对象.html" width="800" height="400" name="ifr"></iframe>
window.open('https://www.baidu.com');
window.open("https://www.baidu.com",'_self');
// window.open("https://www.baidu.com",'ifr');
```

如果给 `window.open()` 传递的第二个参数并不是一个已经存在的窗口或框架，那么该方法就会根据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口（或者打开一个新标签页）。在不打开新窗口的情况下，会忽略第三个参数。

第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性。下表列出了可以出现在这个字符串中的设置选项。

| 设置       | 值      | 说明                                                         |
| ---------- | ------- | ------------------------------------------------------------ |
| fullscreen | yes或no | 表示浏览器窗口是否最大化。仅限IE                             |
| height     | 数值    | 表示新窗口的高度。不能小于100                                |
| left       | 数值    | 表示新窗口的左坐标。不能是负值                               |
| location   | yes或no | 表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。如果设置为no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器） |
| menubar    | yes或no | 表示是否在浏览器窗口中显示菜单栏。默认值为no                 |
| resizable  | yes或no | 表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为no   |
| scrollbars | yes或no | 表示如果内容在视口中显示不下，是否允许滚动。默认值为no       |
| status     | yes或no | 表示是否在浏览器窗口中显示状态栏。默认值为no                 |
| toolbar    | yes或no | 表示是否在浏览器窗口中显示工具栏。默认值为no                 |
| top        | 数值    | 表示新窗口的上坐标。不能是负值                               |
| width      | 数值    | 表示新窗口的宽度。不能小于100                                |

这行代码会打开一个新的可以调整大小的窗口，窗口初始大小为400×400像素，并且距屏幕上沿和左边各10像素。

```js
window.open("http://www.baidu.com/","_blank",
    "height=400,width=400,top=10,left=10,resizable=yes"); // 会打开新页面
window.open("http://www.baidu.com/","_self",
    "height=400,width=400,top=10,left=10,resizable=yes");
// 忽略第三个参数,不会打开新页面
```

### 返回值

此方法会返回一个指向新窗口的引用。引用的对象与其他 `window` 对象大致相似。调用它的close方法可以关闭新打开的弹窗。

**注意：返回的对象遵守同源策略，只有同源的情况下才能控制新打开的窗口的各种信息，否则只能执行close方法**

```js
var win = window.open("./2-location对象.html","_blank",
    "height=400,width=400,top=10,left=10,resizable=yes");

// 调整大小
win.resizeTo(500,500);

// 移动位置
win.moveTo(100,100);

// 关闭新打开的窗口
win.close();

// 网站名解析:
// https://www.baidu.com  https 协议 www服务器(可有可无) baidu.com域名
```



返回的对象还有一个 `opener` 属性，其中保存着打开它的原始窗口对象。这个属性只在弹出窗口中的最外层 `window` 对象（top）中有定义，而且指向调用 `window.open()` 的窗口或框架。例如：

```js
var win = window.open("http://shijiajie.com/","_blank",
    "height=400,width=400,top=10,left=10,resizable=yes");

console.log(win.opener === window);   // true
```



## history对象

保存从窗口打开后，成功访问过的url的历史记录栈。出于安全方面的考虑，开发人员无法得知用户浏览过的 URL。不过，借由用户访问过的页面列表，同样可以在不知道实际 URL 的情况下实现后退和前进。

### 属性

`length` ：保存着历史记录的数量。这个数量包括所有历史记录，即所有向后和向前的记录。对于加载到窗口、标签页或框架中的第一个页面而言，`history.length` 等于1。

### 方法

语法：`history.go(n)`

参数：n 表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转（类似于单击浏览器的“后退”按钮），正数表示向前跳转（类似于单击浏览器的“前进”按钮）。

```js
history.go(2)    // 前进两页
history.go(-1)   // 后退一页
history.go(0)	 // 刷新
```

简写方法：

+ history.back()   后退一页
+ history.forward()    前进一页



## location对象

保存当前窗口正在打开的url的对象，它既是 `window` 对象的属性，也是 `document` 对象的属性（`window.location` === `document.location`）

### 属性

| 属性名   | 例子                         | 说明                                                         |
| -------- | ---------------------------- | ------------------------------------------------------------ |
| hash     | "#contents"                  | 返回 URL 中的 hash（#号后跟零或多个字符），如果 URL 中不包含散列，则返回空字符串 |
| host     | "www.zhihu.com:80"           | 返回服务器名称和端口号（如果有）                             |
| hostname | "www.zhihu.com"              | 返回不带端口号的服务器名称                                   |
| href     | "http://www.ceshi.com/index" | 返回当前加载页面的完整URL。而 `location` 对象的 `toString()` 方法也返回这个值 |
| pathname | "/search"                    | 返回URL中的目录和（或）文件名                                |
| port     | "8080"                       | 返回 URL 中指定的端口号。如果 URL 中不包含端口号，则这个属性返回空字符串 |
| protocol | "http:"                      | 返回页面使用的协议。通常是 http: 或 https:                   |
| search   | "?q=javascript"              | 返回URL的查询字符串。这个字符串以问号开头                    |
| origin   | "http://www.ceshi.com/index" | 返回页面使用协议+网站名                                      |



### 方法

1. 在当前窗口打开，可后退
   location.assign(url) => location.href=url => location=url
2. 在当前窗口打开，不会生成历史记录，即替换当前页面的地址
   location.replace(url)
3. 重新加载页面
   1. 普通刷新
      优先从浏览器本地缓冲获取资源
      F5
      history.go(0)
      location.reload(/*false*/)
   2. 强制刷新
      无论本地是否有缓存，总是强制从服务器获取资源
      location.reload(true)





## navigator对象

包含有关访问者浏览器的信息。

`navigator.language`：浏览器设置的语言；

`navigator.appCodeName`（不准确）：属性是一个只读字符串，声明了浏览器的代码名。

在所有以 Netscape 代码为基础的浏览器中，它的值是 "Mozilla"。为了兼容起见，在 Microsoft 的浏览器中，它的值也是 "Mozilla"，同时在safari在浏览器的console里运行navigator.appCodeName得出的结果还是"Mozilla"，所以这个看起来并不实用，因为IE、chrome、safari返回的都是“Mozilla”。

`navigator.appName`（不准确）：返回所使用浏览器的名称。由于兼容性问题，HTML5 规范允许该属性返回 "Netscape"。该属性并不一定能返回正确的浏览器名称。在基于 Gecko 的浏览器 （例如 Firefox）和基于 WebKit 的浏览器（例如 Chrome 和 Safari）中，返回的浏览器名称都是 "Netscape"。

`navigator.appVersion`（已废弃）：属性可返回浏览器的平台和版本信息。该属性是一个只读的字符串。该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

`navigator.platform`：是一个只读的字符串，声明了运行浏览器的操作系统和（或）硬件平台。可能的值有: "Win32", "Linux i686", "MacPPC", "MacIntel"等。

`navigator.userAgent`（用的最多，也可以说相对更准确）：是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。主要是各家浏览器厂商都想要自己的浏览器被其他的兼容，所以都会或多或少的加上一些其他的信息在里面。
代码：

```js
var browserName = navigator.userAgent.toLowerCase(); 
//区分手机端还是PC端
isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(browserName));
//判断浏览器
isIE = /msie/i.test(browserName) && !/opera/.test(browserName);
isIE6 = /msie 6.0/i.test(browserName);
isIE7 = /msie 7.0/i.test(browserName);
isIE8 = /msie 8.0/i.test(browserName);
isFirefox = /firefox/i.test(browserName);
isChrome = /chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName);
isOpera = /opera/i.test(browserName);
isSafari = /webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName));
//判断微信
isWeixin = /micromessenger/i.test(browserName);
```

 `navigator.onLine`：属性是一个只读的布尔值，声明了系统是否处于脱机模式。 

```js
window.addEventListener("offline", function(e) {alert("offline");})
window.addEventListener("online", function(e) {alert("online");})
```

`navigator.cookieEnabled`：属性可返回一个布尔值，如果浏览器启用了 cookie，该属性值为 true。如果禁用了 cookie，则值为 false。 



## window的其它方法

- **resizeBy(w, h)：根据指定的像素来调整窗口的大小。**

  该方法定义指定窗口的右下角移动的像素，左上角将不会被移动(它停留在其原来的坐标)。有两个参数，第一个参数是必需的，指定窗口宽度增加的像素数。第二个参数可选，指定窗口高度增加的像素数。两个参数可为正数，也可为负数。

- **resizeTo(w, h)：用于把窗口大小调整为指定的宽度和高度。**

　　该方法两个参数都是必需的，用来指定设置窗口的宽度和高度，以像素计。

- **moveBy(xnum, ynum)：可相对窗口的当前坐标把它移动指定的像素。**

　　该方法有两个参数，第一个参数指定要把窗口右移的像素数，第二个参数指定要把窗口下移的像素数。

- **moveTo(x, y)：可把窗口的左上角移动到一个指定的坐标。**

　　该方法有两个参数，第一个参数指定窗口新位置的 x 坐标，第二个参数指定窗口新位置的 y 坐标。

- **scrollBy(xnum, ynum)：可把内容滚动指定的像素数。**

　　该方法有两个必需参数，第一个参数指定把文档向右滚动的像素数。第二个参数指定把文档向下滚动的像素数。

- **scrollTo(x, y)：可把内容滚动到指定的坐标。**

　　该方法有两个必需参数，第一个指定要在窗口文档显示区左上角显示的文档的 x 坐标。第二个参数指定要在窗口文档显示区左上角显示的文档的 y 坐标。