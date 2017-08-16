(function(){
	var sessionId = localStorage.sessionId;
	if(!sessionId){
		alert('请先登录');
		localStorage.targetHref = location.href;
		location.href = '/';
	}

	new Vue().$http.post('/checkLogin',{sessionId:sessionId}).then(function(data){
		if(data.body.status){
			if(localStorage.targetHref){
				if(localStorage.targetHref != location.href){
					var targetHref = localStorage.targetHref;
					localStorage.targetHref = '';
					location.href = targetHref;
				}else{
					localStorage.targetHref = '';
				}
			};
		}else{
			alert(data.body.errMsg);
			localStorage.targetHref = location.href;
			location.href = '/';
		}
	});
})();

//公用的post方法
var basePost = function(url,data,success,vm){
	data.sessionId = localStorage.sessionId;
	vm && (vm.isLoading = true);
	new Vue().$http.post(url,data).then(function(data){
		vm && (vm.isLoading = false);
		if(data.body.status){
			success(data.body.results);
		}else{
			alert(data.body.errMsg.message || data.body.errMsg);
			if(data.body.isReload){
				localStorage.targetHref = location.href;
				location.href = '/';
			}
		}
	});
}