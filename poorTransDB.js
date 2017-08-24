var MongoClient = require('mongodb').MongoClient;
var dbUtil = require('./dbUtil'),
	dbName = 'poor';

exports.getPoorsByQuery = function(param,callback){
	var query = {};
	if(param.townCode && param.townCode!=341503000000){
		query.townCode = param.townCode;
	}
	if(param.name && param.name){
		query.name = {$regex:param.name};
	}
	if(param.idNumber && param.idNumber){
		query.idNumber = {$regex:param.idNumber};
	}
	dbUtil.connectDB(2017,function(db){
		var collection_POOR = db.collection(dbName);
		console.log(query);
		collection_POOR.find(query).limit(30).toArray(function(err,optResult){
			dbUtil.resultCheck(err,optResult,callback);
		});
	});
};

exports.add = function(dataArr){
	var checkResult = dbUtil.paramCheck(dataArr,[]);
	if(!checkResult.status){
		callback(checkResult);
		return;
	};
	dbUtil.connectDB(2017,function(db){
		var collection_POOR = db.collection(dbName);
		collection_POOR.insertMany(dataArr,function(err,result){
			if(err){
				console.log(err);
			}
			console.log(result);
		});
	});
};