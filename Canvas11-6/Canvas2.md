# Canvas



## 绘制环境保存和还原

- ctx.save() 保存当前环境的状态

  可以把当前绘制环境进行保存到缓存中

- ctx.restore() 返回之前保存过的路径状态和属性

  获取最近缓存的环境状态



## 设置阴影

+ shadowColor ： 设置或返回用于阴影的颜色
+ shadowBlur： 设置或返回用于阴影的模糊级别,大于1的正整数，数值越高，模糊程度越大

+ shadowOffsetX： 设置或返回阴影距形状的水平距离

+ shadowOffsetY： 设置或返回阴影距形状的垂直距离

```js
ctx.fillStyle = "red"
ctx.shadowColor = "rgba(0,0,0,.5)";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.fillRect(100, 100, 100, 100);
```

**设置png图片的阴影，图片透明部分不会被投影。**



##  颜色渐变和背景图

### 线性渐变

+ 线性渐变可以用于 矩形、圆形、文字等颜色样式
+ 语法：ctx.createLinearGradient(x0,y0,x1,y1); //参数：x0,y0起始坐标，x1,y1结束坐标
+ 解释：创建一个线性渐变的对象，可以赋给图形的 fillStyle 或 strokeStyle 属性



### 径向渐变

+ context.createRadialGradient(x0,y0,r0,x1,y1,r1);  创建一个径向渐变的对象

+ 参数详解：

  + x0: 渐变的开始圆的 x 坐标
+ y0: 渐变的开始圆的 y 坐标
  + r0: 开始圆的半径
  + x1: 渐变的结束圆的 x 坐标
  + y1: 渐变的结束圆的 y 坐标
  + r1: 结束圆的半径
  
  

### 添加颜色

创建出 `canvasGradient` 对象后，需要用 `addColorStop` 方法给它上色。

- gradient.addColorStop(position, color)

  addColorStop 方法接受 2 个参数，`position` 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。`color` 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。

```js
var clg = ctx.createLinearGradient(50, 50, 300, 50)
clg.addColorStop(0, '#ff0');
clg.addColorStop(1, '#f00');
ctx.fillStyle = clg;
ctx.fillRect(50, 50, 300, 50)

var clg2 = ctx.createRadialGradient(100,200,50,200,200,150)
clg2.addColorStop(0,'red')
clg2.addColorStop(1,'green')
ctx.fillStyle = clg2;
ctx.fillRect(0, 0, 400, 400)
```



### 绘制背景图

+ ctx.createPattern(img,repeat) 方法在指定的方向内重复指定的元素（了解）

+ 第一参数：设置平铺背景的图片，第二个背景平铺的方式。
  + image ： 规定要使用的图片、画布或视频元素。
  +  repeat ： 默认。该模式在水平和垂直方向重复。
  + repeat-x ： 该模式只在水平方向重复。
  + repeat-y ： 该模式只在垂直方向重复。
  + no-repeat： 该模式只显示一次（不重复）。

```js
var imgEle = new Image();
imgEle.src = "../lib/image/HC/full.png";
imgEle.onload = () => {
    var cp = ctx.createPattern(imgEle,'repeat-x');
    ctx.fillStyle = cp;
    ctx.fillRect(100,0,300,100);
}
```



## 变换



### 缩放

+ scale() 方法缩放当前绘图，更大或更小
+ 语法：context.scale(scalewidth,scaleheight)
  + scalewidth : 缩放当前绘图的宽度 (1=100%, 0.5=50%, 2=200%)
  + scaleheight : 缩放当前绘图的高度 (1=100%, 0.5=50%, 2=200%) 



### 位移画布

+ ctx.translate(x,y) 方法重新映射画布上的 (0,0) 位置

+ 参数说明：
  + x： 添加到水平坐标（x）上的值
  + y： 添加到垂直坐标（y）上的值

**发生位移后，相当于把画布的 0,0 坐标 更换到新的 x,y 的位置，所有绘制的新元素都被影响。**



### 旋转

+ context.rotate(angle); 方法旋转当前的绘图，参数是弧度（PI）
+ 注意旋转是以画布的左上角为起点的,所以一般旋转之前要使用translate将画布的原点设置在画布的中间位置

```js
ctx.translate(100,100);
ctx.rotate(Math.PI/2);
ctx.fillRect(0,0,100,60);
```



## 设置绘制环境的透明度

+ context.globalAlpha=number;

+ number:透明值。必须介于 0.0（完全透明） 与 1.0（不透明） 之间。

+ 设置透明度是全局的透明度的样式。注意是全局的。



## 画布限定区域绘制

+ ctx.clip();  方法从原始画布中剪切任意形状和尺寸

+ 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）

+ 一般配合绘制环境的保存和还原。

```js
ctx.rect(0,0,200,200);
ctx.clip();

ctx.moveTo(100,70);
ctx.arc(100,70,20,0,2*Math.PI,true);
ctx.arc(100,70,50,0,2*Math.PI,true);
ctx.fillStyle = 'orange';
ctx.fill();
```

 

## 画布保存base64编码内容

+ 把canvas绘制的内容输出成base64内容。

+ 语法：canvas.toDataURL(type, encoderOptions);

+ 例如：canvas.toDataURL("image/jpg",1);

+ 参数说明：
  + type，设置输出的类型，比如 image/png image/jpeg等
  + encoderOptions： 0-1之间的数字，用于标识输出图片的质量，1表示无损压缩，类型为： image/jpeg 或者image/webp才起作用。

**作用：document按行加载内容，把图片转换成base64写到css中，能使css加载完毕的时候，图片内容已经加载，避免dom元素加载完了，图片还没出来的情况。而且能提高访问速度。**



## 画布重叠渲染

 `context.globalCompositeOperation` 属性设置在已有图形上面再画新图形时采用的遮盖策略，其中type是用于标识要使用的合成或混合模式操作的字符串。 

+ 语法：ctx.globalCompositeOperation = type;
+ 参数说明参见：<https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing>

+ 常用参数： destination-out （ 在与源不重叠的区域上保留目标。其他部分都变成透明的 ）
## 画布渲染画布

- context.drawImage(img,x,y);
- img参数也可以是画布，也就是把一个画布整体的渲染到另外一个画布上。

   ```js
var cvs =   document.querySelectorAll('canvas') 
var cvs1 = cvs[0]
var cvs2 = cvs[1]
var ctx1 =   cvs1.getContext("2d") 
var ctx2 =   cvs2.getContext("2d") 
cvs1.width = 300
cvs1.height = 300 
cvs2.width = 600
cvs2.height = 600
ctx1.fillRect(0, 0, 100,100)
ctx2.drawImage(cvs1, 100,100) 
   ```



   

## 贝塞尔曲线

### 绘制一条二次方曲线。

- 语法：context.quadraticCurveTo(cpx,cpy,x,y);

  + cpx： 贝塞尔控制点的 x 坐标

  - cpy： 贝塞尔控制点的 y 坐标
  - x ： 结束点的 x 坐标
  - y ： 结束点的 y 坐标 
                          


​    

### 绘制一条三次贝塞尔曲线

+ 语法：context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

+ 提示：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。

+ 参数说明：
  + cp1x： 第一个贝塞尔控制点的 x 坐标
  + cp1y： 第一个贝塞尔控制点的 y 坐标
  + cp2x： 第二个贝塞尔控制点的 x 坐标
  + cp2y： 第二个贝塞尔控制点的 y 坐标
  + x: 结束点的 x 坐标
  + y: 结束点的 y 坐标

​            

### 创建两条切线的弧（知道有）

+ 在画布上创建介于当前起点和两个点形成的夹角的切线之间的弧

+ 语法： context.arcTo(x1,y1,x2,y2,r); //类比：css3中的圆角。

+ 例如： ctx.arcTo(240, 100, 240, 110, 40);

+ 参数：
  + x1: 弧的端点1的 x 坐标
  + y1: 弧的端点1的 y 坐标
  + x2: 弧的端点2(终点)的 x 坐标
  + y2: 弧的端点2(终点)的 y 坐标
  + r : 弧的半径

  ```js
ctx.moveTo(100,100);
ctx.lineTo(200,100); 
//context.arcTo(x1,y1,x2,y2,r);   //类比：css3中的圆角。
ctx.arcTo(240, 100, 240,   104, 40);  
ctx.lineTo(240, 300)
ctx.stroke(); 
  ```



## 了解判断点是否在路径中

`ctx.strokeRect(50, 50, 200, 200)   alert(ctx.isPointInPath(110,100)) //ctx.stroke();     `     


