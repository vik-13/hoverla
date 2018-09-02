function Fire(type) {
	let MASS, START, TIME, position, velocity, opacity, angle, rotating, radius, stones;
	this.active = true;

	function reset() {
		MASS = type ? .001 : .001;
		START = +new Date();
		TIME = type ? rInt(1000, 1300) : rInt(4000, 9000);
		position = type ? new Vector(rInt(-50, 50), rInt(-10, 10)) : new Vector( rInt(-10, 10), rInt(-80, -90));
		velocity = type ? new Vector(position.x < 0 ?  rFloat(.1, 1) : rFloat(-1, .1), rFloat(-1, -2)) : new Vector(rFloat(-.3, .3), rFloat(-1.2, -2));
		opacity = type ? 1 : 0;
		angle = 0;
		rotating = rFloat(-.03, .03);
		radius = 10;
	}

	reset();

	this.n = () => {
		const diff = +new Date - START;

		let acc = velocity.get().normalize().mult(0.001);
		acc.add(gc.gravity.get().mult(MASS));

		velocity.add(acc);
		position.add(velocity);
		opacity = .8 - (.8 * (diff / TIME));
		opacity = opacity < 0 ? 0 : opacity;
		if (type) {
			radius = 10;
		} else {
			radius = 20;
			opacity = (.5 * (diff / (TIME / 2)));
			radius = 5 + 40 * opacity;
			opacity = opacity > .5 ? .5 - opacity + .5 : opacity;
		}

		angle += rotating;
		this.active = diff <= TIME;
		!this.active && reset();
	};

	this.r = () => {
		c.save();
		c.fillStyle = type ? 'hsl(' + ((50 * .8) - (50 * opacity)) + ', 70%, 50%)' : '#444444';
		c.translate(position.x, position.y);
		c.rotate(angle);
		bp();
		c.globalAlpha = opacity;
		c.fillRect(-radius, -radius, radius * 2, radius * 2);
		c.restore();
	};
}

function Campfire() {
	let fires = [];
	let stones = new Anim(
		[[[9,0,5,0,2,2,0,8,6,13,12,11,15,4],"#000","#67756e",1],[[38,1,32,1,28,5,28,12,35,12,40,11,41,6],"#000","#67756e",1],[[18,2,12,6,13,12,19,13,21,9,22,3],"#000","\t#687676",1],[[29,1,21,2,18,6,21,12,28,12,31,7],"#000000","#697375",1],[[17,10,22,10,24,12,20,14,15,13],"#000000","\t#687676",1]],
		[]
	);

	for(let i = 0; i < 100; i++) {
		setTimeout(() => {fires.push(new Fire(true));}, i * 10);
	}

	for(let i = 0; i < 300; i++) {
		setTimeout(() => {fires.push(new Fire(false));}, 500 + (i * 50));
	}

	this.n = () => {
		fires.forEach((fire) => fire.n());
	};

	this.r = () => {
		c.save();
		c.translate(380, gc.res.y - 10);
		c.save();
		c.translate(20, 5);
		c.scale(.2, .2);
		fires.forEach((fire) => fire.r());
		c.restore();
		draw.r(stones.n());
		c.restore();
	};
}