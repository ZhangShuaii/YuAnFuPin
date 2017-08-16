var dbUtil = require('./dbUtil');
var DB_NAME = '2017',
	TAB_NAME = 'POOR_FAMILY';

exports.getPoorByFamilyCode = function(params,callback){
	var checkResult = dbUtil.paramCheck(params,['familyCode']);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};

	dbUtil.connectDB(DB_NAME,function(db){
		var tabPoor = db.collection(TAB_NAME);
		tabPoor.find({familyCode:Number(params.familyCode)}).toArray(function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
};

/*mongo驱动查询大批量数据报错 改用mongoskin*/
exports.getAllPoors = function(callback){
	var mongo = require('mongoskin'),
		DB_URL = dbUtil.getDB_URL();
	var db = mongo.db(DB_URL + DB_NAME, {native_parser:true});
	db.bind(TAB_NAME);
	db[TAB_NAME].find().toArray(function(err, results) {
		if(err){
			console.log(err);
		}
		callback(results);
		db.close();
	});
};
