function Stone() {
	const size = [53, 51];
	const anim = new Anim(
		[[[0,20,12,3,25,17,16,29],"#635f62","#635f62",1],[[25,17,38,0,54,18,45,23],"#635f62","#635f62",1],[[45,23,26,40,22,51,48,42],"#635f62","#635f62",1],[[25,17,16,28,27,40,46,23],"#a3a2a5","#a3a2a5",1],[[25,17,12,2,38,0],"#697375","#697375",1],[[17,29,0,20,0,36,22,51,27,40],"#697375","#697375",1],[[45,22,54,18,48,42],"#687676","#687676",1]],
		[]
	);
	let alpha = 1;
	let angle = 0;
	let aAcceleration = .01;
	let scale = 1;

	let radius = 25;
	const MASS = .3;
	const SPEED_LIMIT = 10;
	const height = mountain.getHeight(gc.res.x - camera.getPosition().x);
	const position = new Vector(gc.res.x - camera.getPosition().x, height);
	let velocity = new Vector(-2, 2);

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
				const reflection = velocity.get().sub(normal.get().mult(velocity.get().dot(normal)));
				aAcceleration = (velocity.mag() / (2 * radius * Math.PI)) * (2 * Math.PI);
				velocity.apply(reflection);
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
			die(0);
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
			if (!death.type) {
				alpha -= 0.01;
				alpha = alpha < 0 ? 0 : alpha;
			} else {
				scale -= .02;
				scale = scale < 0 ? 0 : scale;

				let acc = new Vector(-.7, -2);

				position.add(acc);
			}
		}
		checkDying();
	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y);
		c.rotate(angle);
		c.scale(scale, scale);
		c.globalAlpha = alpha;
		draw.r(anim.n(), size);
		c.restore();
	};
}