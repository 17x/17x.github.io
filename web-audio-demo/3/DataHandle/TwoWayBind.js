class TwoWayBind{
	static Chains = {};

	static Init(){
		let elements = [...document.querySelectorAll('[z-bind]')]
			 .map(ele => {
				 let attr = ele.getAttribute('z-bind');
				 let keys = attr.split('.');

				 TwoWayBind.CreateMap({
					 keys,
					 ele
				 });
			 });

		// console.log(TwoWayBind.Chains);
	}

	static startWatch(){
		Object.defineProperty('window', 'Timeline', {
			set(a, b){
				console.log(a, b);
			}
		});
	}

	static CreateMap({
		keys,
		ele
	}){
		let {Chains} = this;
		let i = 1;
		let parent = Chains[keys[0]];

		if(!parent){
			parent = {};
			Chains[keys[0]] = parent;
		}

		while(i < keys.length){
			let key = keys[i];

			if(!parent[key]){
				parent[key] = {};
			}

			parent = parent[key];

			i++;
		}

		parent.watchArray = [ele];
	}
}