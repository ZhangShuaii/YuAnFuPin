var dbUtil = require('./dbUtil');
var md5= require('js-md5');

var DB_NAME = '2017',
	TAB_NAME = 'relative';

var count = 0 ;
exports.getRelative = function(tel,callback){
	var checkResult = dbUtil.paramCheck(tel);
	if(tel == null || isNaN(tel)){
		callback(checkResult);
		return;
	};
	dbUtil.connectDB(DB_NAME,function(db){
		count++;
		var tabUser = db.collection(TAB_NAME);
		tabUser.find({tel:tel}).toArray(function(err,optResult){
			if(optResult.length == 0 ){
				console.log("[" +  count + "] " + " 未录入：" + tel);
			}else{
				console.log("[" +  count + "] " + new Date() + " " + optResult[0].org + " - " + optResult[0].name);
			}
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
}

