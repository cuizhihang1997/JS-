# AJAX跨域

## 什么是跨域

AJAX技术使开发者能够专注于互联网中**数据**的传输，而不再拘泥于数据传输的**载体**。通过AJAX技术，我们获取数据的方式变得更加灵活，可控和优雅。

但是AJAX技术并不是一把万能钥匙，互联网中的数据隐私和数据安全（例如你的银行账号和密码）也非常重要，为了保护某些用户数据的隐私与安全，浏览器使用“**同源策略**”限制了AJAX技术获取数据的范围和能力。但在一些合理的场景中，我们又不得不想办法绕过同源策略，实现跨域请求资源。因此“跨域技术”一直成为开发者们经久不衰的讨论话题。

<font color="red"><b>同源策略如下：</b></font>

| URL                                                         | 说明                 | 是否允许通信 |
| :---------------------------------------------------------- | :------------------- | :----------- |
| http://www.a.com/a.js<br/>http://www.a.com/b.js             | 同一域名下           | 允许         |
| http://www.a.com/lab/a.js<br />http://www.a.com/script/b.js | 同一域名下不同文件夹 | 允许         |
| http://www.a.com:8000/a.js<br />http://www.a.com/b.js       | 同一域名，不同端口   | 不允许       |
| http://www.a.com/a.js<br />https://www.a.com/b.js           | 同一域名，不同协议   | 不允许       |
| http://www.a.com/a.js<br />http://70.32.92.74/b.js          | 域名和域名对应ip     | 不允许       |
| http://www.a.com/a.js<br />http://script.a.com/b.js         | 主域相同，子域不同   | 不允许       |
| http://www.cnblogs.com/a.js<br />http://www.a.com/b.js      | 不同域名             | 不允许       |



## 前端跨域的主要解决方法

<font color="orange"><b>注意：无论是怎样的跨域资源获取方案，本质上都需要服务器端的支持。跨域获取资源之所以能够成功，本质是服务器默许了你有权限获取相应资源。</b></font>

### 1.  页面通讯跨域

ajax出现之前浏览器每次发出请求得到的都是一个页面，这时候我们需要在异域的两个客户端之间共享数据，例如页面与内嵌iframe窗口通讯，页面与新打开异域页面通讯。 

**方法：document.domain + iframe**

> 只有在主域相同的时候才能使用该方法

```js
// 在www.a.com/a.html中：

document.domain = 'a.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://www.script.a.com/b.html';
ifr.display = "none";
document.body.appendChild(ifr);
ifr.onload = function(){
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    //在这里操作doc，也就是b.html
    ifr.onload = null;
};

// 在www.script.a.com/b.html中：

document.domain = 'a.com';
```

类似的还有：

+ window.name + iframe

+ location.hash + iframe
+ window.postMessage

这都是旧的访问形式衍生的方法，目前被淘汰的差不多了



### 2. jsonp方法

原理：动态创建`<script>`标签，然后利用`<script>`的 src 不受同源策略约束来跨域获取数据。

缺点：只支持get方式请求

```js
// 原生js写法

var script = document.createElement('script');
script.type = 'text/javascript';

// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=jsonPCallback';
document.body.appendChild(script);

// 前端回调执行函数
function jsonPCallback(res) {
    alert(JSON.stringify(res));
}

//服务端返回如下（后端返回执行函数）：
jsonPCallback({"status": true, "user": "admin"})


// jq写法

$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "handleCallback",    // 自定义回调函数名
    data: {}
});
```



#### <font color="blue">封装</font>

```JS
function loadScript(url, func) {
  var head = document.head || document.getElementByTagName('head')[0];
  var script = document.createElement('script');
  script.src = url;

  script.onload = script.onreadystatechange = function(){
    if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
      func();
      script.onload = script.onreadystatechange = null;
    }
  };

  head.appendChild(script);
}
window.baidu = {
  sug: function(data){
    console.log(data);
  }
}
loadScript('http://suggestion.baidu.com/su?wd=w',function(){console.log('loaded')});
```



### 3. CORS

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

#### 使用

```js
router.get("/", function(req,res,next){
    // 设置允许访问的头为：*  即任何地址都可访问
	res.header('Access-Control-Allow-Origin', '*');
	// Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	// res.header('Access-Control-Allow-Headers', 'Content-Type');
	// res.header('Access-Control-Allow-Methods', '*');
	// res.header('Content-Type', 'application/json;charset=utf-8');
	next();
})
```

#### 与JSONP的比较

CORS与JSONP的使用目的相同，但是比JSONP更强大。

JSONP只支持`GET`请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。



### 4. Websocket

基于[维基百科](https://zh.wikipedia.org/wiki/WebSocket)的定义，WebSocket是一种**在单个TCP连接上进行全双工通讯的协议**。在这里我并不打算解释“TCP连接”和“全双工通讯”这两个专业术语（这个说来话长，而且颇具学术性，也偏离了我们的主题），让我们聚焦这段定义的最后两个字**协议**。 

#### 简单介绍

说到协议，你是否联想到“HTTP协议”？没错，HTML5标准之所以提出了一种新的互联网通信协议 - WebSocket，就是为了弥补在**某些情景**下使用HTTP协议通信的一些不足。

我们知道，当我们使用HTTP协议时，客户端与服务端的通信模式始终是由客户端向服务端发送请求，服务端只负责验证请求并返回响应。有时候客户端想要请求的资源，服务器需要一定时间后才能返回（比如该资源依赖于其他服务器的计算返回结果），由于在HTTP协议下，网络通信是单向的，因此服务器并不具备当资源准备就绪时，通知浏览器的功能（因为我们要保障服务器的工作效率）。因此，基于HTTP协议通常的做法是，设置一个定时器，每隔一定时间由浏览器向服务器发送一次请求以探测资源是否到位。 这种做法显然浪费了很多请求，换句话说，浪费了很多带宽（我们每个请求都要携带Cookie和报头，这些都会占用带宽传输），不仅低效率，而且也不够优雅。 

我们希望当服务器资源到位时，能够主动通知浏览器并返回相应资源。而为了实现这一点，HTML5标准推出了WebSocket协议，使浏览器和服务器实现了双向通信，更妙的是，除了IE9及以下的IE浏览器，所有的浏览器都支持WebSocket协议。 

像发起AJAX请求一样，发起WebSocket请求需要借助浏览器提供的`WebSocket`对象，该对象提供了用于创建和管理WebSocket连接，以及通过该连接收发数据的API。所有的浏览器都默认提供了WebSocket对象。让我们看看该对象的用法： 

```js
// 判断浏览器是否支持websocket 
if ("WebSocket" in window){
 	alert("您的浏览器支持 WebSocket!");
}
```

#### 属性和方法

和使用`XHRHttpRequest`对象一样，我们首先要实例化一个`WebSocket`对象：

```js
var ws = new WebSocket(url)
```

url 为响应WebSocket请求的地址，根据后台开启的服务来写。

同样类似AJAX的是，`WebSocket`对象也有一个`readyState`属性，用来表示对象实例当前所处的链接状态，有四个值：

- **0**：表示正在连接中（CONNECTING）；
- **1**：表示连接成功，可以通信（OPEN）；
- **2**：表示连接正在关闭（CLOSING）；
- **3**：表示连接已经关闭或打开连接失败（CLOSED）；

我们可以通过判断这个值来执行我们相应的代码。

除此之外，`WebSocket`对象还提供给我们一系列事件属性，使我们控制连接过程中的通信行为：

- `onopen`：用于指定连接成功后的回调函数；
- `onclose`：用于指定连接关闭后的回调函数；
- `onmessage`：用于指定收到服务器数据后的回调函数，通过`形参.data`获取到返回的数据 ；
- `onerror`：用于指定报错时的回调函数；

通过`.send()`方法，我们拥有了向服务器发送数据的能力。



#### 举个完整的例子

<font color="blue">前台</font>

```js
// 实例化WebSocket对象
var ws = new WebSocket(ws/wss地址--后台指定);
let ws = new WebSocket("ws://localhost:8080");
ws.onopen = function() {
  console.log("client：打开连接");
  ws.send("client：hello，服务端");
};
ws.onmessage = function(res) {
  console.log("client：接收到服务端的消息 " + res.data);
  setTimeout(() => {
    ws.close();
  }, 5000);
};
ws.onclose = function(params) {
  console.log("client：关闭连接");
};
```

<font color="blue">服务端</font>

```js
// 安装websocket依赖  npm install ws --save
var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8080 }); // 开启一个服务，并指定端口

// on('connection', function(ws) {})  监听连接，并开启回调，接受从前台发送来的数据
wss.on('connection', function(ws) {
  console.log('server: 收到连接');
  ws.on('message', function(message) {
    console.log('server: 收到消息', message);
  });
  ws.send('server: hi，客户端');
});
```



> 思考：WebSocket是如何帮助我们绕过浏览器的“同源策略”让我们实现“跨域资源共享”的？
>
> 答： 当客户端与服务端创建WebSocket连接后，本身就可以天然的实现跨域资源共享，WebSocket协议本身就不受浏览器“同源策略”的限制（同源策略只是限制了跨域的AJAX请求），所以问题本身就不成立 。





## 扩展：关于CORS

### 两种请求

浏览器将CORS请求分成两类：<font color="blue">简单请求（simple request）和非简单请求（not-so-simple request）。</font>

只要同时满足以下两大条件，就属于简单请求。

> （1) 请求方法是以下三种方法之一：
>
> - HEAD
> - GET
> - POST
>
> （2）HTTP的头信息不超出以下几种字段：
>
> - Accept
> - Accept-Language
> - Content-Language
> - Last-Event-ID
> - Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

凡是不同时满足上面两个条件，就属于非简单请求。

浏览器对这两种请求的处理，是不一样的。

### 一、简单请求

#### 基本流程

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个`Origin`字段。

下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

> ```http
> GET /cors HTTP/1.1
> Origin: http://api.bob.com
> Host: api.alice.com
> Accept-Language: en-US
> Connection: keep-alive
> User-Agent: Mozilla/5.0...
> ```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

> ```http
> Access-Control-Allow-Origin: http://api.bob.com
> Access-Control-Allow-Credentials: true
> Access-Control-Expose-Headers: FooBar
> Content-Type: text/html; charset=utf-8
> ```

上面的头信息之中，有三个与CORS请求相关的字段，都以`Access-Control-`开头。

**（1）Access-Control-Allow-Origin**

该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。

**（2）Access-Control-Allow-Credentials**

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为`true`，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送Cookie，删除该字段即可。

**（3）Access-Control-Expose-Headers**

该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。



#### withCredentials 属性

上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

> ```http
> Access-Control-Allow-Credentials: true
> ```

另一方面，开发者必须在AJAX请求中打开`withCredentials`属性。

> ```javascript
> var xhr = new XMLHttpRequest();
> xhr.withCredentials = true;
> ```

否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。

但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭`withCredentials`。

> ```javascript
> xhr.withCredentials = false;
> ```

需要注意的是，如果要发送Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。

### 二、非简单请求

#### 预检请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

下面是一段浏览器的JavaScript脚本。

> ```javascript
> var url = 'http://api.alice.com/cors';
> var xhr = new XMLHttpRequest();
> xhr.open('PUT', url, true);
> xhr.setRequestHeader('X-Custom-Header', 'value');
> xhr.send();
> ```

上面代码中，HTTP请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。

浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。

> ```http
> OPTIONS /cors HTTP/1.1
> Origin: http://api.bob.com
> Access-Control-Request-Method: PUT
> Access-Control-Request-Headers: X-Custom-Header
> Host: api.alice.com
> Accept-Language: en-US
> Connection: keep-alive
> User-Agent: Mozilla/5.0...
> ```

"预检"请求用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。

除了`Origin`字段，"预检"请求的头信息包括两个特殊字段。

**（1）Access-Control-Request-Method**

该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是`PUT`。

**（2）Access-Control-Request-Headers**

该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是`X-Custom-Header`。



#### 预检请求的回应

服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

> ```http
> HTTP/1.1 200 OK
> Date: Mon, 01 Dec 2008 01:15:39 GMT
> Server: Apache/2.0.61 (Unix)
> Access-Control-Allow-Origin: http://api.bob.com
> Access-Control-Allow-Methods: GET, POST, PUT
> Access-Control-Allow-Headers: X-Custom-Header
> Content-Type: text/html; charset=utf-8
> Content-Encoding: gzip
> Content-Length: 0
> Keep-Alive: timeout=2, max=100
> Connection: Keep-Alive
> Content-Type: text/plain
> ```

上面的HTTP回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

> ```http
> Access-Control-Allow-Origin: *
> ```

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

> ```bash
> XMLHttpRequest cannot load http://api.alice.com.
> Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
> ```

服务器回应的其他CORS相关字段如下。

> ```http
> Access-Control-Allow-Methods: GET, POST, PUT
> Access-Control-Allow-Headers: X-Custom-Header
> Access-Control-Allow-Credentials: true
> Access-Control-Max-Age: 1728000
> ```

**（1）Access-Control-Allow-Methods**

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

**（2）Access-Control-Allow-Headers**

如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

**（3）Access-Control-Allow-Credentials**

该字段与简单请求时的含义相同。

**（4）Access-Control-Max-Age**

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

#### 浏览器的正常请求和回应

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

下面是"预检"请求之后，浏览器的正常CORS请求。

> ```http
> PUT /cors HTTP/1.1
> Origin: http://api.bob.com
> Host: api.alice.com
> X-Custom-Header: value
> Accept-Language: en-US
> Connection: keep-alive
> User-Agent: Mozilla/5.0...
> ```

上面头信息的`Origin`字段是浏览器自动添加的。

下面是服务器正常的回应。

> ```http
> Access-Control-Allow-Origin: http://api.bob.com
> Content-Type: text/html; charset=utf-8
> ```

上面头信息中，`Access-Control-Allow-Origin`字段是每次回应都必定包含的。