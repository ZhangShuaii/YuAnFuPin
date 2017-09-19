var isPublic = true;

if(isPublic){
	var DB_URL = 'mongodb://localhost:27017/',
		BASE_PATH = '/1/html/';
}else{
	var DB_URL = 'mongodb://127.0.0.1:27017/',
		BASE_PATH = '/YuAnFuPin/html/';
}

exports.getDB_URL = function(){
	return DB_URL;
};

var MongoClient = require('mongodb').MongoClient;
exports.connectDB = function(DB_NAME,optionFun){

	MongoClient.connect(DB_URL+DB_NAME,function(err,db){
		if(err){
			console.log('链接到数据库失败!');
			console.log(err);
			return;
		}
		optionFun(db);
		//转换帮扶联系人时注释掉
		db.close();
	});
};

exports.getHTMLPath = function(){
	return BASE_PATH;
}

exports.paramCheck = function(param,attrs){
	attrs = attrs || [];
	var returnData = {
		status:true
	};
	if(param==null || param==undefined){
		returnData.status =  false;
		returnData.errMsg = '参数为空';
		return returnData;
	}

	attrs.forEach(function(key){
		if(param[key] == undefined || param[key] == null){
			returnData.status =  false;
			returnData.errMsg = '参数错误';
		}
	});
	return returnData;
};


exports.resultCheck = function(err,dbOptionResult,callback){
	var returnData = {
		status:true
	}; 
	if(err!=null){
		returnData.status =  false;
		returnData.errMsg = err;
	}else{
		returnData.results = dbOptionResult;
	}
	callback(returnData);
};