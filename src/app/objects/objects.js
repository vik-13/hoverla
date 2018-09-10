window.objects = (() => {
	let list = [];

	function addStaticObjects() {
		// list.push(new House(new Vector(670, 0), 0));
		list.push(new Campfire(new Vector(450, 0)));

		list.push(new Bench(new Vector(396, 0), false));
		list.push(new Bench(new Vector(504, 0), false));

		list.push(new Tree(new Vector(100, 0), 0));
		list.push(new Tree(new Vector(140, 0), 1));
		list.push(new Tree(new Vector(200, 0), 1));
		list.push(new Tree(new Vector(257, 0), 0));
		list.push(new Tree(new Vector(320, 0), 1));

		list.push(new Tree(new Vector(540, 0), 1));
		list.push(new Tree(new Vector(850, 0), 1));
		list.push(new Tree(new Vector(940, 0), 1));
	}

	return {
		i: () => {
			addStaticObjects();
		},
		n: () => {
			list.forEach((item) => {
				item.n();
			});
		},
		r: (front) => {
			list.filter((item) => !front && !item.front || front && item.front).forEach((item) => {
				item.r();
			});
		}
	};
})();