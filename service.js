var userDB = require('./userDB');
/*
*查询所有用户列表
*/
exports.getUserList = function(req,res){
	userDB.getUserList(function(results){
		res.send(results);
	});
};

/*
*添加用户
*/
exports.addUser = function(params,res){
	userDB.addUser(params,function(results){
		res.send(results);
	});
};

/*
*重置密码
*/
exports.resetUser = function(params,res){
	var loginId = params.loginId;
	userDB.resetUser(loginId,function(results){
		res.send(results);
	});
};

exports.deleteUser = function(params,res){
	userDB.deleteUser(params,function(results){
		res.send(results);
	});
};

var poorDB = require('./poorDB');
exports.selectPoorByFamilyCode = function(params,res){
	poorDB.getPoorByFamilyCode(params,function(results){
		res.send(results);
	});
};

/*贫困人口表增加数据*/
var poorTransDB = require('./poorTransDB');
exports.addPoor = function(){
	var bufferArr = [];
	poorDB.getAllPoors(function(poorList){
		poorList.forEach(function(poorFamily,item){
			poorFamily.poorFamilyMember.forEach(function(poor,item){
				bufferArr.push({
					familyCode:poorFamily.familyCode,
					townName:poorFamily.townName,
					townCode:poorFamily.townCode,
					name:poor.name,
					idNumber:poor.idNumber
				});
			});
		});
		poorTransDB.add(bufferArr);
	});
};

/*查询贫困户列表*/
exports.selectPoor = function(params,res){
	var name = params.name,
		townCode = params.townCode,
		idNumber = params.idNumber;
	if(!townCode && (!name || !idNumber)){
		res.send({
			status:false,
			errMsg:'请求参数错误'
		});
		return;
	}
	poorTransDB.getPoorsByQuery(params,function(results){
		res.send(results);
	});
}
/*
*登录
* 
*/
var loginDB = require('./loginDB');
var md5= require('js-md5');
exports.login = function(user,res){
	var loginId = user.loginId;

	userDB.getUser(loginId,function(results){
		if(results.status){
			var dbUser = results.results;
			if(dbUser.password == user.password){
				var sessionId = md5(user.loginId + new Date());
				var params = {};
				params.loginId = loginId;
				params.sessionId = sessionId;
				loginDB.setLogin(params,function(){
					res.send({
						status:true,
						results:{
							sessionId:sessionId,
							org:dbUser.org
						}
					});
				});
			}else{
				res.send({
					status:false,
					errMsg:'账号或密码错误'
				});
			}
		}else{
			res.send({
				status:false,
				errMsg:'用户不存在'
			});
		}
	});
};

exports.checkLogin =function(params,res,callBack){
	loginDB.getLogin(params,function(results){
		if(results.status){
			//6小时
			var overtime = 1000*60*60*6;
			if(results.results.length==0 || ((new Date() - results.results.timestamp) > overtime)){
				results.status = false;
				results.errMsg = '身份验证过期，请重新登录';
				results.isReload = true;
			}
		}
		if(callBack){
			callBack(results);
		}else{
			res.send(results);
		}
	});
};

var questionTabDB = require('./questionTabDB');
exports.getQuestionTabs = function(postData,res){
	year = postData.year;
	questionTabDB.getTabs(year,function(results){
		res.send(results);
	});
};


exports.getQuestionTab = function(postData,res){
	year = postData.year;
	questionTabDB.getTabs(year,function(results){
		res.send({
			status:results.status,
			results:results.results.pop()
		});
	});
};