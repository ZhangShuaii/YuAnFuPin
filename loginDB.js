var dbUtil = require('./dbUtil');
var DB_NAME = '2017',
	TAB_NAME = 'login';


exports.setLogin = function(params,callback){
	var checkResult = dbUtil.paramCheck(params,['loginId','sessionId']);
	if(!checkResult.status){
		callback(checkResult);
		return;
	}
	dbUtil.connectDB(DB_NAME,function(db){
		var tabLogin = db.collection(TAB_NAME);
		tabLogin.insertMany([{
			loginId:params.loginId,
			sessionId:params.sessionId,
			timestamp:new Date()
		}],function(err,dbOptionResult){
			dbUtil.resultCheck(err,dbOptionResult,callback);
		})
	});
};


exports.getLogin = function(params,callback){
	var checkResult = dbUtil.paramCheck(params,['sessionId']);
	if(!checkResult.status){
		checkResult.errMsg = "请先登录";
		checkResult.isReload = true;
		callback(checkResult);
		return;
	}

	dbUtil.connectDB(DB_NAME,function(db){
		var tabLogin = db.collection(TAB_NAME);
		tabLogin.findOne({sessionId:params.sessionId},function(err,dbOptionResult){
			dbUtil.resultCheck(err,dbOptionResult,callback);
		});
	});
};