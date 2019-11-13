var express = require('express');
var router = express.Router();
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

// router.post('/doLogin',function(req,res,next){
//   // console.log(req.query);
//   var uname =req.body.uname;
//   var password =req.body.password;
  
//   var ifHas =false;
//   for(var i = 0; i<data.length; i++){

//     if(data[i].uname===uname&&data[i].password===password){
//       ifHas=true;
//     }
//   }
//   if(ifHas){
//     loginUname = uname
//     res.send({
//       code:"fail",
//       msg:'登陆成功'})
//   }else{
//     res.send({
//       code:"fail",
//       msg:'登陆失败'})
//   }

// });
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
      break;
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
});

router.post('/checkUsername', function(req, res, next) {
  var uname = req.body.uname;
  console.log(uname);
  var isExit = false;

  for(var i = 0; i<data.length;i++){
   if(data[i].uname==uname){
     isExit=true;
     break;
   }
  }

setTimeout(function() {
  if(isExit){
    res.send({
      code:"fail",
      msg:'用户名已注册,请换一个试试吧'
    })}else{
      res.send({
        code:"success",
        msg:"用户名可用"
      })

    }
}, 3000);
 

    
});



router.get('/regist', function(req, res, next) {
  res.render('regist');
});



// router.get('index')


router.post('/doRegist', function(req, res, next) {
  var uname=req.body.uname;
  var password = req.body.password;

  var ifHas = false;
  for(var i =0; i<data.length;i++){
    if(data[i].uname==uname){
      ifHas=true;
      break;
    }
  }
  if(!ifHas){
      data.push({
        uname:uname,
        password:password,
      })
      res.json({
        code:"success",
        msg:"可用注册",})
  } else{
    res.json({
      code:"fail",
      msg:"不可注册",
  })}
});

module.exports = router;
