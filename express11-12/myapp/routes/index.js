var express = require('express');
var router = express.Router();

// 创建用户数据库
var data = [
	{
		uname: "张三",
		password: "123456"
	}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

var loginUname = null;

// 拦截登陆请求
router.get('/doLogin', function(req, res, next) {
	// reqest 请求,在请求中会包含页面发送的参数
	// response  响应,给前台发送响应数据
	// 拦截登陆请求,判断用户发送参数是否在数据库中,如果在:返回成功页面,不在,返回失败页面
	console.log(req.query); // 页面发送过的参数对象
	
	var uname = req.query.uname;
	var password = req.query.password;
	
	var ifHas = false;
	for(var i = 0; i < data.length; i ++){
		if(data[i].uname === uname && data[i].password === password){
			ifHas = true;
		}
	}
	
	if(ifHas){
		// 成功页面
		// redirect  页面重定向
		loginUname = uname;
		res.redirect('/success');
	}else{
		res.redirect('/fail')
	}
});

router.get('/success', function(req, res, next) {
  res.render('success',{ name: loginUname });
});

router.get('/fail', function(req, res, next) {
  res.render('fail');
	// next();
});
// router.get('/fail', function(req, res, next) {
//   res.render('fail');
// 	next();
// });
// router.get('/fail', function(req, res, next) {
//   res.render('fail');
// 	res.end();
// });



/* =================  用户名校验start  ======================== */

router.post('/checkUsername',function(req,res,next){
	// var uname = req.query.uname;
	// get请求的参数使用req.query接受
	// post请求的参数使用req.body接受
	var uname = req.body.uname;
	console.log(uname);
	var isExit = false;
	for(var i = 0; i < data.length; i ++){
		if(data[i].uname === uname){
			isExit = true;
			break;
		}
	}
	// 假设网络环境不好,3000后请求才完成
	setTimeout(function (){
		if(isExit){
			// {code: 'success'}
			// res.send(xx) 向前端页面发送文本信息  可以是二进制文件/对象/json/字符串/数组
			res.send({
				code: "fail",
				msg: '用户名已存在'
			});
		}else{
			res.send({
				code: 'success',
				msg: "此用户名可用"
			});
		}
	},3000)
	
})


/* ===============  用户名校验end  ======================== */


// 注册路由拦截
router.get('/regist', function(req, res, next) {
  res.render('regist');
});

// 拦截注册请求
router.post('doRegist/', function(req, res, next) {
	// 拦截登陆请求,判断用户发送参数是否在数据库中,如果在:返回成功页面,不在,返回失败页面
	// console.log(req.body); // 页面发送过的参数对象
	
	var uname = req.body.uname;
	var password = req.body.password;
	
	var ifHas = false;
	// 注册是 判断用户不存在于数据库
	for(var i = 0; i < data.length; i ++){
		if(data[i].uname === uname){
			ifHas = true;
			break;
		}
	}
	
	if(!ifHas){
		// 成功页面
		// redirect  页面重定向
		// 将用户添加到数据库
		data.push({
			uname: uname,
			password: password
		})
		// res.redirect('/login');
		// res.json()  发送json数据
		res.json({
			code: "success",
			msg: "注册成功"
		})
	}else{
		res.json({
			code: "fail",
			msg: "网络请求失败,请重新尝试"
		})
		// res.render('regist');
	}
});

module.exports = router;
