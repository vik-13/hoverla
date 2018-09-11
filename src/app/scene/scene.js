window.scene =(() => {

	return {
		interaction: (mousePosition) => {
			if (!character.isResting()) {
				barricades.add(mousePosition);
			}
			character.interaction(mousePosition);
		},
		i: () => {
			sun.i();
			camera.i();
			mountain.i();
			character.i();
			avalanche.i();

			objects.i();

			bushes.i();
			barricades.i();
		},
		n: () => {
			sun.n();

			if (!character.isDead()) {
				character.n();
				particles.n();
				mountain.n();

				objects.n();

				avalanche.n();
				barricades.n();

				camera.n(character.getPosition());
			}
		},
		r: () => {
			let bg = c.createLinearGradient(0, 0, 0, gc.res.y);
			bg.addColorStop(0, color.get('st'));
			bg.addColorStop(.75, color.get('sb'));
			c.fillStyle = bg;
			// c.fillStyle = '#000000';
			c.fillRect(0, 0, gc.res.x, gc.res.y);

			sun.r();

			c.save();
			c.translate(camera.getPosition().x, camera.getPosition().y);

			objects.r(false);

			mountain.r();

			character.r();
			particles.r();

			avalanche.r();

			barricades.r();

			// bushes.r();

			objects.r(true);

			c.restore();

			c.save();
			c.globalAlpha = .2 * gc.sunset;
			c.fillStyle = 'rgb(253, 111, 34)';
			c.fillRect(0, 0, gc.res.x, gc.res.y);
			c.restore();
		}
	};
})();