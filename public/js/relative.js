var vm = new Vue({
	el:"#loginForm",
	data:{
		tel:'',
		isMany : false
	},
	methods:{
		saveSession : function(relative){
			localStorage.relative = JSON.stringify(relative);
			localStorage.sessionId = this.requestData.sessionId;
			location.href = '/relativePoors';
		},
		linkRelativePoors:function(index){
			this.saveSession(this.relatives[index]);
		},
		login:function(){
			var that = this;
			this.$http.post('/getRelative',{tel:this.tel}).then(function(data){
				that.requestData = data.body;
				var relatives = data.body.results;
				if(data.body.status){
					if(data.body.results==null){
						alert('未录入该帮扶联系人！');
					}else{
						if(relatives.length == 0){
							alert('未录入该帮扶联系人');
						}
						if(relatives.length == 1){
							that.saveSession(data.body.results[0])
						}
						if(relatives.length > 1){
							that.isMany = true;
							that.relatives = relatives;
						}
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