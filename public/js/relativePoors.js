var vm = new Vue({
	el:"#relativePoor",
	data:{
		relative:JSON.parse(localStorage.relative ),
		nowRelative:[],
		historyRelative:[]
	},
	methods:{
		linkPoor:function(familyCode){
			location.href = '/poorFamily?familyCode='+ familyCode;
		}
	},
	mounted:function(){
		var nowTime = new Date(),
			nowMounth = ''+(nowTime.getMonth() + 1);
		nowMounth = (nowMounth.length == 1) ? ('0' + nowMounth):nowMounth;
		nowTimeStr = "" + nowTime.getFullYear() + nowMounth + nowTime.getDate();

		var nowRelative = this.nowRelative,
			historyRelative = this.historyRelative,
			relative = this.relative;
		this.relative.familys.forEach(function(val,key){
			var endTime = relative.endTime[key];
			if(endTime >= nowTimeStr){
				nowRelative.push(val);
			}else{
				historyRelative.push(val);
			}
		});
	}
});