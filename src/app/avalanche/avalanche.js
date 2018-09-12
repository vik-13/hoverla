window.avalanche = (() => {
	let list = [];
	let lastAdded, lastCalled;
	const interval = 500;

	function check() {
		const x = character.getPosition().x;

		return (x > 1100 && x < (8000 - gc.res.x)) ||
			(x > 8900 && x < (24000 - gc.res.x)) ||
			(x > 24900 && x < (36000 - gc.res.x)) ||
			(x > 36700 && x < (40000 - gc.res.x));
	}

	function getType() {
		const x = character.getPosition().x;
		return x < 24900 ? 0 : x < 36700 ? 1 : 2;
	}

	function add() {
		if (check()) {
			if (+new Date() - lastCalled >= interval) {
				const diff = +new Date() - lastAdded;
				if (diff >= 4000 || rFloat(0, 1) < (.1 + .6 * (diff / 4000))) {
					list.push(new Stone());
					lastAdded = + new Date();
				}
				lastCalled = +new Date();
			}
		}
	}

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
		reset: () => {
			list = [];
			lastCalled = +new Date();
			lastAdded = +new Date();
		},
		n: () => {
			add();

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