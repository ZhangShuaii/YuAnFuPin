var vm = new Vue({
	el:"#loginForm",
	data:{
		tel:''
	},
	methods:{
		login:function(){
			var that = this;
			this.$http.post('/getRelative',{tel:this.tel}).then(function(data){
				if(data.body.status){
					console.log(data.body);
					if(data.body.results==null){
						alert('号码不正确！');
					}else{
						localStorage.relative = JSON.stringify(data.body.results);
						localStorage.sessionId = data.body.sessionId;
						location.href = '/relativePoors';
					}
				}else{
					alert(data.body.errMsg);
				}
			});
		}
	},
	mounted:function(){
	}
});