var desktopVue = new Vue({
	el:"#questionResponse",
	data :{
		year:2017,
		tabs:[],
		hoverItem:0
	},
	methods:{

		tableHover:function(item){
			this.hoverItem = item;
			console.log(item);
		}
	},
	mounted:function(){
		if(/2016/.test(location.href)){
			this.year = 2016;
		};
		if(/2015/.test(location.href)){
			this.year = 2015;
		};
		var that = this;
		basePost('/getQuestionTab',{year:this.year},function(results){
			var tabs = results.reportsJson;
			that.tabs = tabs;
			console.log(that.tabs);
		});
	}
});