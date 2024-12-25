define(['./moduleb'],function (moduleb) {
	return {
		add:function(a,b){
			return moduleb.add(a,b)
		},
		moduleb:moduleb
	}
})