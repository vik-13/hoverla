function Snow() {
	let list = [],
		last = 0,
		possibility = rFloat(.05, .45);


	function check(flake) {
		flake.active = flake.position.y <= gc.res.y;
	}

	function checkToRemove() {
		list = list.filter(function(flake) {
			return flake.active;
		});
	}

	this.active = true;
	this.n = (finished) => {
		if (!finished) {
			if (Math.random() < possibility) {
				list.push({
					active: true,
					m: .01,
					acceleration: new Vector(),
					velocity: new Vector(),
					position: new Vector(rFloat(-.5 * gc.res.x, 1.5 * gc.res.x), -50),
					r: rFloat(2, 16)
				});
			}
		} else {
			if (!list.length) {
				this.active = false;
			}
		}
		list.forEach((flake) => {
			flake.acceleration.add(flake.velocity.get().normalize().mult(0.001));
			flake.acceleration.add(gc.gravity.get().mult(-flake.m * flake.r * .1));
			flake.velocity.add(flake.acceleration);
			flake.position.add(flake.velocity);
			flake.position.add(new Vector(-1, 0));
			flake.acceleration.mult(0);
			check(flake);
		});
		checkToRemove();
	};
	this.r = () => {
		c.fillStyle = color.get('snow');
		list.forEach((flake) => {
			bp();
			c.rect(flake.position.x - (flake.r / 2), flake.position.y - (flake.r / 2), flake.r, flake.r);
			c.fill();
			cp();
		});
	};
}