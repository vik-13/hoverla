window.scene =(() => {
	let tree;
	// let ball = new Ball();
	let campfire;

	return {
		i: () => {
			campfire = new Campfire();
			tree = new Tree();
		},
		n: () => {
			campfire.n();
		},
		r: () => {
			// let bg = c.createLinearGradient(0, 0, 0, gc.res.y);
			// bg.addColorStop(0, '#B9DCEC');
			// bg.addColorStop(.5, '#E4EBD8');
			// c.fillStyle = bg;
			c.fillStyle = '#000000';
			c.fillRect(0, 0, gc.res.x, gc.res.y);

			// tree.r();
			// ball.r();
			campfire.r();
		}
	};
})();