// 专门用来管理api地址的

// 后台人员
// 192.168.0.176:8080  // 调试地址/测试环境
// http://www.bufan.com		// 网络地址/线上地址/部署地址/上线环境

var host = '192.168.0.176:8080'; // 方便切换网络基地址环境

// 集中管理api
var api = {
	add: host + 'save',
	del: host + 'del',
	edit: host + 'updateUserInfo',
	get: host + 'list',
	checkName: host + 'checkUserName',
}
