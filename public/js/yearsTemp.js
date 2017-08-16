Vue.filter('date', function(val) {
	var d = new Date(val);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    return year + '年' + month + '月' + day + '日';
    // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
});


var desktopVue = new Vue({
	el:"#questionResponse",
	data :{
		year:2017,
		tabs:[],
		hoverLine:-1,
		hoverCol:-1,
		checkTime:new Date()
	},
	methods:{
		tableHover:function(index,index2){
			this.hoverLine = index;
			if(index2!=0){
				this.hoverCol = index2;
			}
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
		basePost('/getQuestionTab',{year:this.year},function(data){
			var tabs = data.reportsJson;
			that.tabs = tabs;
			that.checkTime = data.date;
			// console.log(that.tabs);
		});
	}
});