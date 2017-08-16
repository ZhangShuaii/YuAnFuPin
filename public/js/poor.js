var poorSelectVue = new Vue({
	el:"#poorSelect",
	data:{
		poorList:[],
		townMap:CONST.townMap,
		newUser:{},
		poor:{
			townCode:localStorage.org,
			limitTownCode:localStorage.org
		},
		isLoading:false
	},
	methods:{
		selectPoor:function(){
			var vm = this;
			if(!vm.poor.name && !vm.poor.idNumber){
				alert('请输入姓名或证件号码');
				return;
			}
			basePost('/selectPoor',vm.poor,function(results){
				vm.poorList = results;
			},vm);
		},
		linkPoor:function(familyCode){
			location.href = '/poorFamily?familyCode='+ familyCode;
		}
	},
	mounted:function(){
	}
});