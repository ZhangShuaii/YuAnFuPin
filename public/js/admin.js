var adminVue = new Vue({
	el:"#adminPage",
	data:{
		userList:[],
		townMap:CONST.townMap,
		newUser:{}
	},
	methods:{
		getUserList:function(){
			var vm = this;
			basePost('/getUserList',{},function(results){
				vm.userList = results;
			});
		},
		resetPwd:function(loginId){
			basePost('/resetUser',{'loginId':loginId},function(results){
				alert('重置成功！密码为000000');
			});
		},
		destroyUser:function(loginId,item){
			var vm = this;
			basePost('/destroyUser',{'loginId':loginId},function(results){
				alert('删除成功');
				vm.userList.splice(item,1);
			});
		},
		addUser:function(){
			if(this.newUser.password!=this.newUser.password2){
				alert('两次输入的密码不一致！请重新输入');
				return;
			}

			this.newUser.password = md5(this.newUser.password);
			delete this.newUser.password2;
			var that = this;
			basePost('/addUser',this.newUser,function(results){
				alert('添加成功！');
				that.userList.push(that.newUser);
				that.newUser = {};
			});
		}
	},
	mounted:function(){
		if(localStorage.userId!='000001'){
			location.href = '/';
		}
		this.getUserList();
	}
});