var dbUtil = require('./dbUtil');
var md5= require('js-md5');

var DB_NAME = '2017',
	TAB_NAME = 'relative';

exports.getRelative = function(tel,callback){
	var checkResult = dbUtil.paramCheck(tel);
	if(tel == null || isNaN(tel)){
		callback(checkResult);
		return;
	};
	dbUtil.connectDB(DB_NAME,function(db){
		var tabUser = db.collection(TAB_NAME);
		console.log(tel);
		tabUser.findOne({tel:tel},function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
}

