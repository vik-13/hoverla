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
		c.fillStyle = type ? 'hsl(' + ((50 * .8) - (50 * opacity)) + ', 70%, 50%)' : color.get('smoke');
		c.translate(position.x, position.y);
		c.rotate(angle);
		bp();
		c.globalAlpha = opacity;
		c.fillRect(-radius, -radius, radius * 2, radius * 2);
		c.restore();
	};
}

function Campfire(position) {
	let fires = [];
	let stones = new Anim(
		[[[10,4,3,0,0,6,3,9,9,9],"","rock1",1],[[11,2,6,8,10,10,23,9],"","rock2",1],[[33,4,31,8,45,9,43,3],"","rock2",1],[[24,4,29,0,35,3,36,6,33,9,25,9],"","rock3",1],[[27,6,18,5,17,8,19,10,25,10],"","rock4",1]],
		[]
	);
	// let stones = new Anim(
	// 	[[[9,0,5,0,2,2,0,8,6,13,12,11,15,4],"#000","#67756e",1],[[38,1,32,1,28,5,28,12,35,12,40,11,41,6],"#000","#67756e",1],[[18,2,12,6,13,12,19,13,21,9,22,3],"#000","#687676",1],[[29,1,21,2,18,6,21,12,28,12,31,7],"#000000","#697375",1],[[17,10,22,10,24,12,20,14,15,13],"#000000","#687676",1]],
	// 	[]
	// );

	for(let i = 0; i < 100; i++) {
		setTimeout(() => {fires.push(new Fire(true));}, i * 10);
	}

	for(let i = 0; i < 150; i++) {
		setTimeout(() => {fires.push(new Fire(false));}, 500 + (i * 50));
	}

	this.front = false;
	this.position = position;

	this.n = () => {
		fires.forEach((fire) => fire.n());
	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y - 9);
		c.save();
		c.scale(.2, .2);
		fires.forEach((fire) => fire.r());
		c.restore();
		c.translate(-20, -5);
		c.scale(.9, 1);
		draw.r(stones.n());
		c.restore();
	};
}