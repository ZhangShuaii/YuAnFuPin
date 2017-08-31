var vm = new Vue({
	el:"#relativePoor",
	data:{
		relative:JSON.parse(localStorage.relative )
	},
	methods:{
		linkPoor:function(familyCode){
			location.href = '/poorFamily?familyCode='+ familyCode;
		}
	},
	mounted:function(){
		
	}
});