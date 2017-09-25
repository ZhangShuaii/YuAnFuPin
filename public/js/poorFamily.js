Vue.filter('isOut', function(value) {
	var map = {
		'0':'未脱贫',
		'1':'已脱贫',
		'3':'返贫',
		'4':'稳定脱贫'
	};
    return map[value];
});

Vue.filter('isDangerHouse', function(value) {
    return value==0?'否':'是';
});

Vue.filter('sex', function(value) {
        	var map = {
			'0':'未知',
			'1':'男',
			'2':'女'
		};
        return map[value];
});

Vue.filter('grade', function(value) {
    	var map = {
			'01':'非在校生',
			'02':'学前教育',
			'03':'小学',
			'04':'七年级',
			'05':'八年级',
			'06':'九年级',
			'07':'高一',
			'08':'高二',
			'09':'高三',
			'10':'中职一年级',
			'11':'中职二年级',
			'12':'中职三年级',
			'13':'高职一年级',
			'14':'高职二年级',
			'15':'高职三年级',
			'16':'大专及以上'
		};
        return map[value];
});

Vue.filter('familyRelation', function(value) {
	var map = {
			'01':'户主',
			'02':'配偶',
			'03':'之子',
			'04':'之女',
			'05':'之儿媳',
			'06':'之女婿',
			'07':'之孙子',
			'08':'之孙女',
			'09':'之外孙子',
			'10':'之外孙女',
			'11':'之父',
			'12':'之母',
			'13':'之岳父',
			'14':'之岳母',
			'15':'之公公',
			'16':'之婆婆',
			'17':'之祖父',
			'18':'之祖母',
			'19':'之外祖父',
			'20':'之外祖母',
			'21':'其他'
		};
    return map[value];
});

Vue.filter('healthInfo', function(value) {
	var map = {
			'01':'健康',
			'02':'长期慢性病',
			'03':'患有大病',
			'04':'残疾'
		};
    return map[value];
});

Vue.filter('workSkills', function(value) {
	var map = {
			'01':'普通劳动力',
			'02':'技能劳动力',
			'03':'丧失劳动力',
			'04':'无劳动力'
		};
    return map[value];
});

Vue.filter('poorAttr', function(value) {
	var map = {
			'01':'一般贫困户',
			'02':'低保户',
			'03':'五保户',
			'04':'低保贫困户',
			'05':'一般农户',
			'06':'五保贫困户'
	};
    return map[value];
});

Vue.filter('mainReason', function(value) {
	var map = {
		'01':'因病',
		'02':'因残',
		'03':'因学',
		'04':'因灾',
		'05':'缺土地',
		'06':'缺水',
		'07':'缺技术',
		'08':'缺劳动力',
		'09':'缺资金',
		'10':'交通条件落后',
		'11':'自身发展动力不足',
		'99':'未知'
	}
    return map[value];
});



var poorFamilyVue = new Vue({
	el:"#poorFamily",
	data:{
		poorFamily:{
			poorFamilyMember:[]
		},
		isLoading:false
	},
	methods:{
		getFamily:function(familyCode){
			var vm = this;
			var familyCode = vm.getCode();
			basePost('/getPoorFamily',{familyCode:familyCode},function(results){
				vm.poorFamily = results[0];
			},vm);
		},
		getCode:function(){
			var href = location.href;
			var startIndex = href.indexOf('=')+1,
			endIndex = href.indexOf('&');
			endIndex = endIndex==-1?href.length:endIndex;
			return href.substring(startIndex,endIndex);
		}
	},
	mounted:function(){
		this.getFamily();
	}
});

