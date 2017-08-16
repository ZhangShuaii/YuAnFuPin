var dbUtil = require('./dbUtil');
var md5= require('js-md5');
var loginDB = require('./loginDB');

var DB_NAME = 'yuan',
	TAB_NAME = 'user';

exports.getUserList = function(callback){
	dbUtil.connectDB(DB_NAME,function(db){
		var tabUser = db.collection(TAB_NAME);
		tabUser.find({}).toArray(function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
}

var getUser = function(loginId,callback){
	var checkResult = dbUtil.paramCheck(loginId,[]);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};
	dbUtil.connectDB(DB_NAME,function(db){
		var tabUser = db.collection(TAB_NAME);
		tabUser.findOne({loginId:loginId},function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
};
exports.getUser = getUser;

exports.addUser = function(user,callback){
	var checkResult = dbUtil.paramCheck(user,['loginId','userName','org','password']);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};

	dbUtil.connectDB(DB_NAME,function(db){
		var tabUser = db.collection(TAB_NAME);
		tabUser.insertMany([user],function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
};

exports.resetUser = function(loginId,callback){
	var checkResult = dbUtil.paramCheck(loginId,[]);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};
	dbUtil.connectDB(DB_NAME,function(db){
		var tabUser = db.collection(TAB_NAME);
		tabUser.updateOne({loginId:loginId},{$set:{password:md5('000000')}},function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
};

exports.deleteUser = function(param,callback){
	var checkResult = dbUtil.paramCheck(param,['loginId']);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};

	dbUtil.connectDB(DB_NAME,function(db){
		var tabUser = db.collection(TAB_NAME);

		tabUser.findOneAndDelete({loginId:param.loginId},function(err,optResult){
			console.log(param.loginId);
			console.log(optResult);
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
};