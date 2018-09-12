function Stone(t) {
	const gList = [
		[[[28,0,34,20,27,30,24,27,10,35,0,21,12,6],"","rock1",1],[[28,0,49,8,45,41,34,20],"","rock2",1],[[49,8,54,22,45,40],"","rock3",1],[[0,21,7,44,14,48,11,35],"","rock2",1],[[11,35,14,47,36,47,27,30,24,27],"","rock4",1],[[27,30,34,20,45,40,36,47],"","rock2",1]],
		[[[0,20,12,3,25,17,16,29],"","rock4",1],[[25,17,38,0,54,18,45,23],"","rock2",1],[[45,23,26,40,22,51,48,42],"","rock3",1],[[25,17,16,28,27,40,46,23],"","rock1",1],[[25,17,12,2,38,0],"","rock4",1],[[17,29,0,20,0,36,22,51,27,40],"","rock2",1],[[45,22,54,18,48,42],"","rock3",1]]
	];
	const gListSize = [
		[54, 48],
		[53, 51]
	];

	const type = typeof t !== 'undefined' ? t : rInt(0, gList.length);
	const MASS = rFloat(.2, .4);
	let scale = 1;

	const radius = (gListSize[type][0] + gListSize[type][1]) / 4;
	const anim = new Anim(gList[type], []);

	let alpha = 1;
	let angle = 0;
	let aAcceleration = .01;

	const SPEED_LIMIT = 10;
	const x = gc.res.x - camera.getPosition().x + 100;
	const height = mountain.getHeight(x);
	const mAngle = mountain.getAngle(x);
	const position = new Vector(x, height);
	let velocity = new Vector(rFloat(-7, -13), rFloat(7, 13));

	const death = {
		DYING_TIME: 1000,
		type: 0,
		dead: false,
		dying: false,
		startDying: 0
	};

	function collision() {
		const block = mountain.getBlock(position.x);
		const height = mountain.getHeight(position.x);
		const normal = block.end.get().normal(block.start);

		if (position.y - 10 <= height) {
			if (block.type === 'hole') {
				die(1);
			} else {
				position.y = height + 10;
				const reflection = velocity.get().sub(normal.get().mult(1.5 * velocity.get().dot(normal)));
				aAcceleration = (velocity.mag() / (2 * radius * Math.PI)) * (2 * Math.PI);
				velocity.apply(reflection);
				particles.addRockRolling(position.get().apply(new Vector(position.x, position.y - (gListSize[type][1] / 2))), velocity.mag());
			}
		}
	}

	function die(type) {
		death.type = type; // 0 - by collision; 1 - by falling down; 2? - by stopping;
		death.startDying = +new Date();
		death.dead = false;
		death.dying = true;
	}

	function checkDying() {
		if (death.dying && +new Date() - death.startDying >= death.DYING_TIME) {
			death.dead = true;
			death.dying = false;
			if (death.type === 2) {
				particles.dying(position.get().apply(new Vector(position.x, position.y + 40)), ['rock1', 'rock2', 'rock3', 'rock4']);
			}
		}
	}

	this.isActive = () => {
		return !death.dead;
	};

	this.collision = (pos, r) => {
		if (death.dying || death.dead) {
			return false;
		}
		const isCollided = position.distance(pos) <= radius + r;
		if (isCollided) {
			death.dead = true;
			particles.dying(position.get().apply(new Vector(position.x, position.y + 40)), ['rock1', 'rock2', 'rock3', 'rock4']);
		}
		return isCollided;
	};

	this.n = () => {
		if (!death.dying) {
			let acc = velocity.get().normalize().mult(-0.017);
			acc.add(gc.gravity.get().mult(MASS));

			velocity.add(acc);

			if (velocity.mag() > SPEED_LIMIT) {
				velocity.div(velocity.mag()).mult(SPEED_LIMIT);
			} else if (velocity.mag() < 1) {
				die(2);
			}

			position.add(velocity);

			if (position.x < -camera.getPosition().x - 300) {
				death.dead = true;
			}

			collision(velocity);

			aAcceleration = aAcceleration <= 0 ? 0 : aAcceleration - .001;
			angle -= aAcceleration;
		} else {
			if (!death.type) { // collision
				alpha -= 0.01;
			} else if (death.type === 1) { // falling
				alpha -= 0.01;
				scale -= .02;
				scale = scale < 0 ? 0 : scale;

				let acc = new Vector(-.7, -2);

				position.add(acc);
			}
			alpha = alpha < 0 ? 0 : alpha;
		}
		checkDying();
	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y);
		c.rotate(angle);
		c.scale(scale, scale);
		c.globalAlpha = alpha;
		draw.r(anim.n(), gListSize[type]);
		c.restore();
	};
}