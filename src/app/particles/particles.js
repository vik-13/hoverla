window.particles = (function() {
	let list = [];
	let runningLast = +new Date();

	return {
		reset: () => {
			list = [];
		},
		addRunning: (position) => {
			if (+new Date() - runningLast < 400) {
				return false;
			}
			const amount = 5;
			const r = 5;
			let i, distance, angle;
			for (i = 0; i < amount; i++) {
				distance = r * Math.random();
				angle = 2 * Math.PI * Math.random();
				list.push(
					new Particle(
						rFloat(.1, .15),
						1,
						position.get(),
						new Vector(rFloat(0, 2), rFloat(1.5, 1.8)),
						500,
						'walking'
					)
				);
			}
			runningLast = +new Date();
		},
		n: () => {
			list = list.filter(function(particle) {
				particle.n();
				return particle.isActive;
			});
		},
		r: () => {
			list.forEach(function(particle) {
				particle.r();
			});
		}
	};
})();
