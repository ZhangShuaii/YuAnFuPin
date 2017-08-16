var vm = new Vue({
	el:"#loginForm",
	data:{
		userId:localStorage.userId,
		password:localStorage.password,
		isSave : (localStorage.isSave == 'true'),
		isChangePwd : false,
		newPassword:'',
		newPassword2:''
	},
	methods:{
		saveUser:function(){
			localStorage.userId = this.userId;
			localStorage.password = this.password;
			localStorage.isSave = true;
		},
		clearUser:function(){
			localStorage.userId = '';
			localStorage.password = '';
			localStorage.isSave = false;	
		},
		getClient:function(){
			var client = '';
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { 
			    client = 'ios';
			} else if (/(Android)/i.test(navigator.userAgent)) { 
			    client = 'android'
			} else { 
				client = 'pc';    		
			};
			return client;
		},
		login:function(){
			var user = {};
			user.loginId = this.userId;
			user.password = md5(this.password);

			if(this.isSave){
				this.saveUser();
			}else{
				this.clearUser();
			}

			var that = this;
			this.$http.post('/login',user).then(function(data){
				if(data.body.status){
					localStorage.sessionId = data.body.results.sessionId;
					localStorage.org = data.body.results.org;
					if(localStorage.targetHref && (localStorage.targetHref != location.href)){
						var targetHref = localStorage.targetHref;
						localStorage.targetHref = '';
						location.href = targetHref;
					}else{
						localStorage.targetHref = '';
						if(that.getClient()== 'pc'){
							location.href = '/desktop';
						}else{
							location.href = '/poorSelect';
						}
					}
				}else{
					alert(data.body.message.errmsg);
				}
			});
		},
		toChangePwd:function(){
			this.isChangePwd = !this.isChangePwd;
		},
		changePwd:function(){
			alert('功能开发中。。。');
		}
	},
	mounted:function(){
		console.log('ready');
	}
});