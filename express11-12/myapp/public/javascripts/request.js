function ajax(params){
	if(!params.url){
		alert("url必须输入");
		return;
	}
	var obj = {
		method: "GET",
		data: null,
		success(){
			console.log("success");
		},
		fail(){
			console.log("fail");
		}
	}
	// 合并默认参
	params = Object.assign(obj,params);
	var xhr = new XMLHttpRequest();
	// success
	xhr.onload = function (){
		// 将响应的数据变成对象
		var data = JSON.parse(xhr.responseText);
		// var data = xhr.responseText;
		params.success(data);
	}
	xhr.onerror = function (){
		params.fail();
	}
	// open(method,url,是否异步)
	xhr.open(params.method,params.url);
	// 在发送参数前,设置请求头
	if(params.method.toLowerCase() == "post"){
		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
		// xhr.setRequestHeader("content-type","application/json");
	}
	xhr.send(params.data);
}