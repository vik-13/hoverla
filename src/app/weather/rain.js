function Rain() {
	let list = [],
		last = 0,
		possibility = rFloat(.25, .95);


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
				let newFlake = {
					active: true,
					m: .6,
					acceleration: new Vector(),
					velocity: new Vector(),
					position: new Vector(rFloat(0, 1.1 * gc.res.x), -50),
					r: rFloat(2, 16)
				};
				list.push(newFlake);
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
		c.strokeStyle = color.get('snow');
		c.lineWidth = 2;
		list.forEach((flake) => {
			bp();
			m(flake.position.x, flake.position.y);
			l(flake.position.x - 1, flake.position.y + 20);
			// c.rect(flake.position.x - (flake.r / 2), flake.position.y - (flake.r / 2), flake.r, flake.r);
			c.stroke();
			cp();
		});
	};
}