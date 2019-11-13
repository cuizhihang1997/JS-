// 网络请求功能性封装


// 获取学员列表
function getList(callback){
	ajax({
		url: api.get,
		success: function(res){
			callback(res)
		}
	})
}

// 删除学员
function del(id){
	ajax({
		url: api.del,
		data: {id: id},
		success: function (){
			console.log("删除了...")
		}
	})
}