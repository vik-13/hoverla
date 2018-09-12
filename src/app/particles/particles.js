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
			for (let i = 0; i < magnitude; i++) {
				list.push(
					new Particle(
						rFloat(.1, .15),
						rInt(1, 4),
						position.get(),
						new Vector(rFloat(-2, 2), rFloat(-1, 3)),
						500,
						['rock1', 'rock2', 'rock3', 'rock4'][rInt(0, 4)]
					)
				);
			}
		},
		dying: (position, colors) => {
			const amount = 30;
			for (let i = 0; i < amount; i++) {
				list.push(
					new Particle(
						rFloat(.1, .3),
						rInt(3, 10),
						position.get(),
						new Vector(rFloat(.5, 2) * Math.sin(rFloat(0, Math.PI * 2)), rFloat(.5, 2) * Math.cos(rFloat(0, Math.PI * 2))),
						500,
						colors[rInt(0, colors.length)]
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
