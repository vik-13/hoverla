function Stone() {
	let active = true;
	let radius = 10;
	const MASS = 1;
	const SPEED_LIMIT = 10;
	const height = mountain.getHeight(gc.res.x - camera.getPosition().x);
	const position = new Vector(gc.res.x - camera.getPosition().x, height);
	let velocity = new Vector(-2, 2);

	const death = {
		DYING_TIME: 2000,
		type: 0,
		dead: false,
		dying: false,
		startDying: 0
	};

	function collision() {
		const block = mountain.getBlock(position.x);
		const height = mountain.getHeight(position.x);
		const hillAngle = block.start.get().angle(block.end);
		const hillDirection = block.end.get().sub(block.start).normalize().mult(.3);
		const normal = block.end.get().normal(block.start);
		const angle = normal.angle(velocity.get().normalize());

		if (position.y <= height) {
			if (block.type === 'hole') {
				die(1);
			} else {
				position.y = height;
				const reflection = velocity.get().sub(normal.get().mult(velocity.get().dot(normal)));
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
			let acc = velocity.get().normalize().mult(-0.001);
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
		} else {

		}
		checkDying();
	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y);
		c.fillStyle = 'white';
		bp();
		c.arc(0, 0, 10, 0, Math.PI * 2);
		cp();
		c.fill();
		c.restore();
	};
}