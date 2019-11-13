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
		res.redirect('/success');
	}else{
		res.redirect('/fail')
	}
});

router.get('/success', function(req, res, next) {
  res.render('success');
});

router.get('/fail', function(req, res, next) {
  res.render('fail');
});

// 注册路由拦截
router.get('/regist', function(req, res, next) {
  res.render('regist');
});

// 拦截注册请求
router.get('/doRegist', function(req, res, next) {
	// 拦截登陆请求,判断用户发送参数是否在数据库中,如果在:返回成功页面,不在,返回失败页面
	console.log(req.query); // 页面发送过的参数对象
	
	var uname = req.query.uname;
	var password = req.query.password;
	
	var ifHas = false;
	// 注册是 判断用户不存在于数据库
	for(var i = 0; i < data.length; i ++){
		if(data[i].uname === uname){
			ifHas = true;
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
		res.redirect('/login');
	}else{
		res.render('regist');
	}
});

module.exports = router;
