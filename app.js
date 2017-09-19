var express = require('express');
var service = require('./service');
var querystring = require('querystring');
var dbUtil = require('./dbUtil');

var app = express();
app.use(express.static('public'));
var HTML_PATH = dbUtil.getHTMLPath();

app.get('/',function(req,res){
	res.sendFile(HTML_PATH + 'index.html');
});

app.get('/admin',function(req,res){
	res.sendFile(HTML_PATH + 'admin.html');
});

app.get('/poorSelect',function(req,res){
	res.sendFile(HTML_PATH + 'poorSelect.html');
});

app.get('/poorFamily',function(req,res){
	res.sendFile(HTML_PATH + 'poorFamily.html');
});

app.get('/desktop',function(req,res){
	res.sendFile(HTML_PATH + 'desktop.html');
});

app.get('/201[567]',function(req,res){
	res.sendFile(HTML_PATH + 'yearsTemp.html');
});

app.get('/transPoor',function(req,res){
	service.addPoor();
	res.send('转换中');
});


app.get('/relative',function(req,res){
	res.sendFile(HTML_PATH + 'relativeLogin.html');
});

app.get('/relativePoors',function(req,res){
	res.sendFile(HTML_PATH + 'relativePoors.html');
});

app.get('*',function(req,res){
	res.send('404 not found');
});


/*
* 每个post之前验证登录情况
* login 和 loginCheck 不能用此接口
*/
var basePost = function(req,res,callBack,isRelative){
	var post = '';
	req.on('data', function(chunk){    
	       post += chunk;
	});
	req.on('end', function(){   
	    post = JSON.parse(post||'{}');
	    if(isRelative){
	    	callBack(post);
	    }else{
	    	service.checkLogin(post,res,function(results){
	    		if(results.status){
	    			callBack(post);
	    		}else{
	    			res.send(results);
	    		}
	    	});
	    }
	});
}

app.post('/getUserList',function(req,res){
	service.getUserList(req,res);
});

app.post('/addUser',function(req,res){
	basePost(req,res,function(postData){
		service.addUser(postData,res);
	});
});

app.post('/selectPoor',function(req,res){
	basePost(req,res,function(postData){
		service.selectPoor(postData,res);
	});
});

app.post('/getPoorFamily',function(req,res){
	basePost(req,res,function(postData){
		service.selectPoorByFamilyCode(postData,res);
	});
});

app.post('/resetUser',function(req,res){
	basePost(req,res,function(postData){
		service.resetUser(postData,res);
	});
});

app.post('/destroyUser',function(req,res){
	basePost(req,res,function(postData){
		service.deleteUser(postData,res);
	});
});

app.post('/getQuestionTabs',function(req,res){
	basePost(req,res,function(postData){
		service.getQuestionTabs(postData,res);
	});
});

app.post('/getQuestionTab',function(req,res){
	basePost(req,res,function(postData){
		service.getQuestionTab(postData,res);
	});
});

app.post('/getRelative',function(req,res){
	basePost(req,res,function(postData){
		service.getRelative(postData,res);
	},true);
});

app.post('/login',function(req,res){
	var post = '';
	req.on('data', function(chunk){    
	       post += chunk;
	});
	req.on('end', function(){   
	    post = JSON.parse(post ||'{}');
		service.login(post,res);
	});
});

app.post('/checkLogin',function(req,res){
	var post = '';
	req.on('data', function(chunk){    
	       post += chunk;
	});
	req.on('end', function(){   
	    post = JSON.parse(post||'{}');
		service.checkLogin(post,res);
	});
});

var server = app.listen(8888,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});