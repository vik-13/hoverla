window.avalanche = (() => {
	let list = [];
	let last;

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
			last = +new Date();
			// list.push(new Stone());
		},
		n: () => {
			const diff = +new Date() - last;

			if (diff >= 3000) {
				list.push(new Stone());
				last = + new Date();
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