var express = require('express');
var router = express.Router();

/* GET home page. */

var data =[
{
  uname: "明凯",
  password:"123"
}
]

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/doLogin', function(req, res, next) {
  console.log(req.query)
  var uname =req.query.uname;
  var password = req.query.password;
  var ifHas = false

  for(var i = 0;i<data.length;i++){
 
    if(data[i].uname === uname && data[i].password === password){
   
      ifHas = true;

    } }
    if(ifHas){
      // 成功页面
      // redirect  页面重定向
      res.redirect('/success');
    }else{
      res.redirect('/fall')
    }
 



  
  
});



router.get('/success', function(req, res, next) {
  res.render('success');
});

router.get('/fall', function(req, res, next) {
  res.render('fall');
});


router.get('/regist', function(req, res, next) {
  res.render('regist');
});



router.get('/doRegist', function(req, res, next) {
  var uname =req.query.uname;
  var password = req.query.password;
  var ifHas = false
  for(var i=0;i<data.length;i++){
    

    if(data[i].uname==uname){
     

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
    console.log(data)
		res.redirect('/login');
	}else{
		res.render('regist');
	
	}





});


















module.exports = router;
