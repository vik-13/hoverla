window.avalanche = (() => {
	let list = [];
	let lastAdded, lastCalled;
	const interval = 500;

	return {
		collision: (pos, r) => {
			let isCollided = false;
			list.forEach((item) => {
				if (item.collision(pos, r)) {
					isCollided = true;
				}
			});
			return isCollided;
		},
		i: () => {
			lastCalled = +new Date();
			lastAdded = +new Date();
		},
		n: () => {
			if (+new Date() - lastCalled >= interval) {
				const diff = +new Date() - lastAdded;
				if (diff >= 4000 || rFloat(0, 1) < (.1 + .4 * (diff / 4000))) {
					list.push(new Stone());
					lastAdded = + new Date();
				}
				lastCalled = +new Date();
			}

			list = list.filter((item) => item.isActive());

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