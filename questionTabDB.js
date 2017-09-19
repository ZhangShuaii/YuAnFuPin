var dbUtil = require('./dbUtil');
var DB_NAME = '2017',
	TAB_NAME = 'questionTab';

exports.getTabs = function(year,callBack){
	var checkResult = dbUtil.paramCheck(year,[]);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};
	dbUtil.connectDB(DB_NAME,function(db){
		var tabPoor = db.collection(TAB_NAME);
		tabPoor.findOne({},{limit:1,sort:{date:-1}},function(err,optResult){
			dbUtil.resultCheck(err,optResult,callBack);
		});
	});
};