### 在移动端浏览写的页面

1. 使用 win + r 打开快速开启服务窗口，输入 cmd ，回车，打开命令窗口
2. 在命令窗口输入 npm install http-server -g，回车
3. 安装完成后输入 ipconfig ，查看本地服务的 ipv4 地址，记下来 192.168.0.173
4. 安装完成后打开要开启的本地服务的文件夹
5. 在文件夹下使用 shift + 鼠标右键 打开本地命令窗口
6.  在命令窗口中输入 http-server -o ，会默认打开当前文件夹中的 index 页面，在地址栏更改相应的文件的名字会打开相应的文件
7. 将地址栏的 127.0.0.1 更改为第三步记录的 ipv4 地址，刷新页面，复制页面的地址
8. 打开草料二维码生成器，点击网址，将上一步复制的页面地址粘贴上去，生成二维码，然后使用手机扫一扫即可在移动端预览页面
9. 如果使用外联css样式，更改文件后刷新没有反应。这是因为浏览器会保存一些数据，方便下次加载的时候速度更快，但当我们对html/js做了一些改动时，浏览器不能即时生效，仍加载之前的网页。这时需要对浏览器清除缓存。解决办法：在终端开启http-server时输入下列命令行 http-server -o -c-1。



### 适配问题

手机端web的开发分为两种：

1、 响应式 （根据客户端的类型 pc pad phone phonemin）网页自动做适配以适应客户端的浏览

2、 针对移动端专门实现相应的页面，比如   m.jd.com    m.taobao.com  m.toutiao.com   bufan.com/m/index.html

两者区别： 专门针对移动端开发的页面 UI 效果更好，自由度更高

实现的两种方式：
1、宽度按百分比设置，但是字体固定大小

2、整体全部按照百分比适配，包括布局和字体。需要动态的计算字体大小,借助辅助工具，gulp的工作流工具，执行了一个自动换算px ===> rem的函数

### 视口 viewport
1、 什么是Viewport
手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。移动版的 Safari 浏览器最先引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

2、 一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：

`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no">`

```js
meta 是给浏览器识别的
width：控制 viewport 的大小，可以指定的一个值，如600，或者其它特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
height：和 width 相对应，指定高度。
initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
maximum-scale：允许用户缩放到的最大比例。
minimum-scale：允许用户缩放到的最小比例。
user-scalable：用户是否可以手动缩放
```
H5页面要适配的终端设备数据
![image.png](https://upload-images.jianshu.io/upload_images/6784887-f6d7fce5a3046132.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

苹果的适配图
![image.png](https://upload-images.jianshu.io/upload_images/6784887-2287fb2d323e3b5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### 布局单位
rem 是基于html节点的font-size大小的比例

em 基于当前元素字体大小

### 适配原理
通常情况下,ui设计师在设计移动端的时候 一般会按照750px的宽度去做适配.
在实现的时候 假设屏幕宽度是750px
通常在移动端实现的时候,font-size基本会按照设计稿的1/10宽度

在不同的设备下,再通过js动态的修改 html-font-size 即可适配
		
如果按照设计稿100%呈现,而且代码中使用rem处理,那么适配的问题的关键即：需要动态根据移动端手机的屏幕宽度来修改 html 的 font-size 大小

```js
//当窗口大小重新发生变化的时候触发
window.onresize = function(){
	resizeFont();
}
resizeFont();
//重置当前rem的基本参照字体大小
function resizeFont(){
	//当前设备宽度
	var _w = window.screen.width;
	document.documentElement.style.fontSize = _w/10 + 'px';
}
```



vscode 编辑器可以添加 cssrem 插件，然后在设置中搜索 cssrem.rootFontSize，更改基础字体大小，即可在页面使用，如果不能使用，重启编辑器即可

sublime 编辑器需要 lib 文件夹下的 cssrem-master 压缩包解压，或者从[官网](https://github.com/flashlizi/cssrem)下载，然后执行：

- 进入packages目录：Sublime Text -> Preferences -> Browse Packages...
- 复制下载的 cssrem 目录到刚才的packges目录里
- 重启Sublime Text

+ 配置参数

  参数配置文件：Sublime Text -> Preferences -> Package Settings -> cssrem

  + `px_to_rem` - px转rem的单位比例，默认为40。
  + `max_rem_fraction_length` - px转rem的小数部分的最大长度。默认为6。
  + `available_file_types` - 启用此插件的文件类型。默认为：[".css", ".less", ".sass"]



### 移动端的精灵图

正常来讲 设计稿按照750(2x图)设计的,px=>rem的基数设计也是设置为75的
但是在某些情况下,假如设计稿按照375(1x图)设计了,需要动态修改px=>rem的基数为37.5

设置图片宽度 因为里面的元素都是rem单位,是倍数单位,所以希望背景图片也是倍数单位
针对图片的处理 由于设计稿的缘故,所以需要具体查看切出来的图片的实际大小是2X还是1X


什么是Retina 显示屏，带来了什么问题
retina：一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个

在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍

那么，前端的应对方案是：

设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2

//例如图片宽高为：200px*200px，那么写法如下
`.css{width:100px;height:100px;background-size:100px 100px;}`


### 扩充知识：

**物理像素(physical pixel)：**
物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

**设备独立像素(density-independent pixel)：**
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

**CSS像素：**
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

**屏幕密度：**
屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

**设备像素比(device pixel ratio)：**
设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

```
设备像素比 ＝ 物理像素 / 设备独立像素
```

在JavaScript中，可以通过`window.devicePixelRatio`获取到当前设备的dpr。而在CSS中，可以通过`-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和 `-webkit-max-device-pixel-ratio`进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

**dip或dp,（device independent pixels，设备独立像素）与屏幕密度有关**
dip可以用来辅助区分视网膜设备还是非视网膜设备。缩合上述的几个概念，用一张图来解释：

![image.png](https://upload-images.jianshu.io/upload_images/6784887-3ec0f6dcdc72f6c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

众所周知，iPhone6的设备宽度和高度为375pt * 667pt,可以理解为设备的独立像素；而其dpr为2，根据上面公式，我们可以很轻松得知其物理像素为750pt * 1334pt。



**http-server的命令**

`-p`或`--port`要使用的端口（默认为8080）

`-a` 要使用的地址（默认为0.0.0.0）

`-d`显示目录列表（默认为`true`）

`-i`显示autoIndex（默认为`true`）

`-g`或者`--gzip`当启用（默认为`false`）时，它将`./public/some-file.js.gz`代替`./public/some-file.js`当文件的gzip压缩版本存在且请求接受gzip编码时。如果brotli也启用，它将尝试首先服务brotli。

`-b`或者`--brotli`当启用（默认为`false`）时，它将`./public/some-file.js.br`代替`./public/some-file.js`当文件的brotli压缩版本存在且请求接受`br`编码时。如果gzip也被启用，它将首先尝试提供brotli。

`-e`或者`--ext`如果没有提供默认文件扩展名（默认为`html`）

`-s`或者`--silent`从输出中抑制日志消息

`--cors`通过`Access-Control-Allow-Origin`标头启用CORS

`-o [path]`启动服务器后打开浏览器窗口。（可选）提供要打开的URL路径。例如：-o / other / dir /

`-c`设置缓存控制max-age标头的缓存时间（以秒为单位），例如`-c10`10秒（默认为`3600`）。要禁用缓存，请使用`-c-1`。

`-U`或`--utc`在日志消息中使用UTC时间格式。

`--log-ip`启用客户端IP地址的记录（默认值:) `false`。

`-P`或者将`--proxy`所有无法在本地解析的请求代理到给定的URL。例如：-P [http://someurl.com](http://someurl.com/)

`--username` 基本身份验证的用户名[无]

`--password` 基本身份验证密码[无]

`-S`或`--ssl`启用https。

`-C`或`--cert`ssl cert文件的路径（默认值:) `cert.pem`。

`-K`或`--key`ssl密钥文件的路径（默认值:) `key.pem`。

`-r`或`--robots`提供/robots.txt（其内容默认为`User-agent: *\nDisallow: /`）

`-h`或`--help`打印此列表并退出。



**可以监听本地文件变更的方式：**

npm install -g live-server [详情请看](https://github.com/tapio/live-server)

打开服务窗口执行命令： live-server

这将自动启动默认浏览器。当您对任何文件进行更改时，浏览器将重新加载页面 - 除非它是一个CSS文件，在这种情况下应用更改而不重新加载。

命令行参数：

- `--port=NUMBER` - 选择要使用的端口，默认值：PORT env var或8080
- `--host=ADDRESS` - 选择要绑定的主机地址，默认值：IP env var或0.0.0.0（“任何地址”）
- `--no-browser` - 禁止自动Web浏览器启动
- `--browser=BROWSER` - 指定要使用的浏览器而不是系统默认值
- `--quiet | -q` - 抑制记录
- `--verbose | -V` - 更多日志记录（记录所有请求，显示所有侦听IPv4接口等）
- `--open=PATH` - 启动浏览器到PATH而不是服务器根目录
- `--watch=PATH` - 以逗号分隔的路径串，专门监视更改（默认：监视所有内容）
- `--ignore=PATH`- 要忽略的逗号分隔的路径字符串（[任意匹配的](https://github.com/es128/anymatch)定义）
- `--ignorePattern=RGXP`- 正则表达要忽略的文件（即`.*\.jade`）（**弃用**赞成`--ignore`）
- `--no-css-inject` - 重新加载CSS更改页面，而不是注入更改的CSS
- `--middleware=PATH` - 导出要添加的中间件函数的.js文件的路径; 可以是没有路径的名称，也不是扩展名来引用`middleware`文件夹中的捆绑中间件
- `--entry-file=PATH` - 提供此文件（服务器根相对）代替丢失的文件（对单页应用程序很有用）
- `--mount=ROUTE:PATH` - 在定义的路径下提供路径内容（可能有多个定义）
- `--spa` - 将来自/ abc的请求转换为/＃/ abc（方便单页应用）
- `--wait=MILLISECONDS` - （默认为100毫秒）在重新加载之前等待所有更改
- `--htpasswd=PATH` - 启用http-auth期望位于PATH的htpasswd文件
- `--cors` - 为任何来源启用CORS（反映请求来源，支持带凭证的请求）
- `--https=PATH` - PATH到HTTPS配置模块
- `--https-module=MODULE_NAME`- 自定义HTTPS模块（例如`spdy`）
- `--proxy=ROUTE:URL` - 将所有ROUTE请求代理到URL
- `--help | -h` - 显示简洁用法提示并退出
- `--version | -v` - 显示版本并退出



默认选项：

如果文件`~/.live-server.json`存在，它将被加载并在命令行中用作live-server的默认选项。有关选项名称，请参阅“节点用法”。

```js
var params = {
	port: 8181, //设置服务器端口。默认为8080. 
	host: "0.0.0.0", //设置要绑定的地址。默认为0.0.0.0或process.env.IP。
	root: "/public",//设置正在服务的根目录。默认为cwd。
	open: false, //如果为false，则默认情况下不会加载浏览器。
	ignore: 'scss,my/templates', //逗号分隔的字符串，用于忽略 
	file: "index.html", //设置后，为每个404（对单页应用程序有用）提供此文件（服务器根目录）
	wait: 1000, //在重新加载之前等待所有更改。默认为0秒。
	mount: [['/components', './node_modules']], //将目录挂载到路由。
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
	middleware: [function(req, res, next) { next(); }] //采用一系列与Connect兼容的中间件注入服务器中间件堆栈
};
liveServer.start(params);
```

