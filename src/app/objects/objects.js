window.objects = (() => {
	let list = [];

	function addStaticObjects() {
		// list.push(new House(new Vector(670, 0), 0));
		list.push(new Campfire(new Vector(450, 0)));
		list.push(new Campfire(new Vector(8350, 3000)));
		list.push(new Campfire(new Vector(24350, 6500)));
		list.push(new Campfire(new Vector(36300, 10500)));

		[396, 504, 8296, 8404, 24296, 24404, 36246, 36354].forEach((item) => {
			list.push(new Bench(new Vector(item, mountain.getHeight(item) - 5), false));
		});

		[100, 140, 200, 580, 850, 940, 8100, 8180, 8450, 8600, 24050, 24200, 24480, 24640].forEach((item) => {
			list.push(new Tree(new Vector(item, mountain.getHeight(item) - 5), rInt(0, 2)));
		});
	}

	return {
		i: () => {
			const trip = mountain.getTrip();
			trip.filter((item) => item.type !== 'hole' && item.type !== 'camp').forEach((item) => {
				if (item.start.x > 1000 && item.start.x < 36000) {
					const countTree = Math.floor(rFloat(0, 1 + 2 * (1 - (item.start.x / 36000))));
					for (let i = 0; i < countTree; i++) {
						const x = rInt(item.start.x, item.end.x);
						const y = (item.start.y + 5) + (((item.end.y + 5) - (item.start.y + 5)) * ((x - item.start.x) / (item.end.x - item.start.x)));
						list.push(new Tree(new Vector(x, y)));
					}
				}
				if (item.start.x > 1000 && item.start.x < 10000) {
					if (!rInt(0, 5)) {
						const x = rInt(item.start.x, item.end.x);
						const y = (item.start.y + 5) + (((item.end.y + 5) - (item.start.y + 5)) * ((x - item.start.x) / (item.end.x - item.start.x)));
						list.push(new Bush(new Vector(x, y)));
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