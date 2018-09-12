window.weather = (function() {
	let list = [false];
	let start = +new Date();
	let duration = 5000;

	function calcNext() {
		let next = rInt(0, 3);
		start = +new Date();
		list = list.filter(function(item) {
			return item;
		});
		if (!next) {
			list.push(false);
			duration = rInt(20000, 40000);
		} else if (next === 1) {
			list.push(new Snow());
			duration = rInt(20000, 70000);
		} else {
			list.push(new Rain());
			duration = rInt(20000, 70000);
		}
	}

	return {
		n: () => {
			list = list.filter((item, index) => {
				item && item.n(index < list.length - 1);
				return item === false || item.active;
			});
			if (start + duration <= +new Date()) {
				calcNext();
			}
		},
		r: () => {
			list.forEach((item) => {
				c.save();
				item && item.r();
				c.restore();
			});
		}
	};
})();
