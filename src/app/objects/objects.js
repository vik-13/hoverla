window.objects = (() => {
	let list = [];

	function addHouses() {
		list.push(new House(new Vector(600, 0), 0));
	}

	return {
		i: () => {
			addHouses();
		},
		n: () => {
			list.forEach((item) => {
				item.n();
			});
		},
		r: () => {
			list.forEach((item) => {
				item.r();
			});
		}
	};
})();