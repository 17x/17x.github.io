define(['./modulec'],function (modulec) {
	return {
		add:function(a,b){
			return modulec.add(a,b)
		},
		modulec:modulec
	}
})
