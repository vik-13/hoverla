window.sky = (() => {
	const list = [];

	return {
		i: () => {
			for (let i = 0; i < 200; i++) {
				list.push([rInt(0, gc.res.x), rInt(0, gc.res.y), rFloat(.3, 3)]);
			}
		},
		n: () => {

		},
		r: () => {
			c.save();
			c.globalAlpha = gc.night;
			list.forEach((item) => {
				bp();
				c.fillStyle = 'white';
				c.rect(item[0], item[1], item[2], item[2]);
				c.fill();
				cp();
			});
			c.restore();
		}
	};
})();