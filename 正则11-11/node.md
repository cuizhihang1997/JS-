# nodejs

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

*   之前js只能在x.html中通过浏览器打开运行,运行环境是window对象.

*   通过安装nodejs本地客户端,可以把js运行环境安装到本地.

## express web开发框架

> 基于 Node.js 平台，快速、开放、极简的 Web 开发框架 site: [http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)

*   安装 $ npm install express-generator -g

*   验证安装成功: cmd => express --version 版本号

## 创建express项目

*   文件夹 输入 express --view=ejs 自定义项目名

* npm install

*   进入myapp 通过npm 安装依赖

*   在当前文件夹 执行 npm start

*   访问 [http://localhost:3000](http://localhost:3000)

## express 目录结构

*   bin 启动目录

*   node_modules 依赖库

*   public 公共库 静态资源库 css js img...

*   routes 后台路由/拦截器/后台逻辑等

*   views 前台模板(页面)

*   app.js 启动执行文件

*   package.json 项目描述依赖说明

## 关于本地服务

*   [http://localhost](http://localhost) == [http://localhost:80](http://localhost:80) 最常用的测试地址

    *   80 端口 可以省略不写

    *   一个端口只能被一个应用使用

    *   端口不能冲突

*   [http://127.0.0.1](http://127.0.0.1) 也只指的本地测试地址

*   [http://192.160.0.100](http://192.160.0.100) 内网地址 局域网可访问

    *   cmd => ipconfig

    *   以太网 有线网

    *   无线网

*   [http://192.168.0.150](http://192.168.0.150) 外网地址 可以通过wifi访问

## express 改造

### 错误编码

<pre spellcheck="false" class="md-fences md-end-block ty-contain-cm modeLoaded" lang="" cid="n94" mdtype="fences" style="box-sizing: border-box; overflow: visible; font-family: var(--monospace); font-size: 0.9em; display: block; break-inside: avoid; text-align: left; white-space: normal; background-image: inherit; background-position: inherit; background-size: inherit; background-repeat: inherit; background-attachment: inherit; background-origin: inherit; background-clip: inherit; background-color: rgb(248, 248, 248); position: relative !important; border: 1px solid rgb(231, 234, 237); border-radius: 3px; padding: 8px 4px 6px; margin-bottom: 15px; margin-top: 15px; width: inherit; color: rgb(51, 51, 51); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">+ 404  文件没找到,一般是路径错误
+ 500  一般服务器错误
+ 200 请求成功
+ 302 转发...</pre>

### cookie 安装

> [https://www.npmjs.com/package/cookie](https://www.npmjs.com/package/cookie)

*   npm install cookie

## 模板引擎

*   .ejs/.pug nodejs

*   .jsp/.action/.do/.html... java

*   .php

*   .py ...

*   .asp .net

*   .bufan...