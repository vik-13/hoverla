window.objects = (() => {
	let list = [];

	function addStaticObjects() {
		// list.push(new House(new Vector(670, 0), 0));
		list.push(new Campfire(new Vector(450, 0)));

		list.push(new Bench(new Vector(396, 0), false));
		list.push(new Bench(new Vector(504, 0), false));

		list.push(new Tree(new Vector(-50, 0), 0));
		list.push(new Tree(new Vector(-100, 0), 1));
		list.push(new Tree(new Vector(-130, 0), 1));

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
			const trip = mountain.getTrip();
			trip.filter((item) => item.type !== 'hole').forEach((item) => {
				if (item.start.x > 1000 && item.start.x < 36000) {
					const count = item.type === 'camp' ? rInt(15, 20) : Math.floor(rFloat(0, 1 + 2 * (1 - (item.start.x / 36000))));
					for (let i = 0; i < count; i++) {
						const x = rInt(item.start.x, item.end.x);
						const y = (item.start.y + 5) + (((item.end.y + 5) - (item.start.y + 5)) * ((x - item.start.x) / (item.end.x - item.start.x)));
						list.push(new Tree(new Vector(x, y)));
					}
				}
			});
			addStaticObjects();
		},
		n: () => {
			list.forEach((item) => {
				item.n();
			});
		},
		r: (front) => {
			list
				.filter((item) => {
					if (!gc.paused) {
						return item.position.x >= camera.getView().start.x && item.position.x <= camera.getView().end.x &&
							(!front && !item.front || front && item.front);
					} else {
						return item.position.x >= camera.getView().start.x && item.position.x <= camera.getView().end.x &&
							(item instanceof Campfire || item instanceof Bench);
					}
				})
				.forEach((item) => {
				item.r();
			});
		}
	};
})();