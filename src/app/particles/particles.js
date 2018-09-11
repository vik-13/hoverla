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
			const amount = 10;
			for (let i = 0; i < amount; i++) {
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
		addRockRolling: (position, magnitude) => {
			const amount = 3 * magnitude;
			const r = 5;
			for (let i = 0; i < amount; i++) {
				list.push(
					new Particle(
						rFloat(.1, .15),
						rInt(3, 10),
						position.get(),
						new Vector(rFloat(0, 2), rFloat(1.5, 1.8)),
						500,
						'walking'
					)
				);
			}
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
