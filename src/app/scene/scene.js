window.scene =(() => {
	let tree;
	// let ball = new Ball();
	let campfire;

	return {
		i: () => {
			campfire = new Campfire();
			tree = new Tree();
			mountain.i();
			character.i();
			bushes.i();
		},
		n: () => {
			campfire.n();
			character.n();
			mountain.n();

			camera.n(character.getPosition());
		},
		r: () => {
			// let bg = c.createLinearGradient(0, 0, 0, gc.res.y);
			// bg.addColorStop(0, '#B9DCEC');
			// bg.addColorStop(.5, '#E4EBD8');
			// c.fillStyle = bg;
			c.fillStyle = '#000000';
			c.fillRect(0, 0, gc.res.x, gc.res.y);

			c.save();
			c.translate(camera.getPosition().x, camera.getPosition().y);

			mountain.r();

			campfire.r();

			character.r();

			bushes.r();
			tree.r();

			c.restore();
		}
	};
})();