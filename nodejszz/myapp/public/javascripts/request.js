function ajax(params){
   if(!params.url){
       alert("请输入url");
       return;
   }
 var obj={


    method:"GET",
    data: null,
    success(){
console.log("sunccess");
},

  fail(){
      console.log("fail");
  },
 }

params = Object.assign(obj,params);

var xhr = new XMLHttpRequest();

xhr.onload = function(){

    var data =  JSON.parse(xhr.responseText);
    params.success(data);
}
xhr.onerror =function(){
    params.fail();
}
xhr.open(params.method,params.url);

if(params.method.toLowerCase()=="post"){
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
}
xhr.send(params.data);

}
