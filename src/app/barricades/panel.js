function Panel(position, block) {
	const size = [104, 83];
	const start = +new Date();

	const anim = new Anim(
		[[[63,2,70,0,79,25,74,27],"","brown1",1],[[74,27,80,26,88,44,82,45],"","brown2",1],[[82,47,88,44,96,60,90,62],"","brown1",1],[[91,64,98,82,104,80,96,61],"","brown3",1],[[66,11,65,11,94,78,96,77],"","brown4",1],[[87,50,49,82,51,83,89,52],"","brown4",1],[[72,15,0,81,2,83,74,16],"","brown4",1]],
		[]
	);

	let active = true;
	let dead = false;
	let angle = block.angle;
	let stage = 0;
	let inactiveTimer = 0;

	this.position = position;

	function die() {
		particles.dying(position.get().apply(new Vector(position.x, position.y + 40)), ['brown1', 'brown2', 'brown3', 'brown4']);
	}

	this.destroy = () => {
		active = false;
		dead = true;
	};

	this.isActive = () => {
		return active;
	};

	this.isDead = () => {
		return dead;
	};

	this.n = () => {
		const diff = +new Date() - start;
		if (avalanche.collision(position, 40)) {
			active = false;
			dead = true;
			die();
		}
		if (diff >= 3000) {
			active = false;
			dead = true;
			die();
		} else if (diff >= 2000 && stage <= 0) {
			stage = 1;
			inactiveTimer = 10;
		} else if (diff >= 2500 && stage <= 1) {
			stage = 2;
			inactiveTimer = 10;
		}
		if (inactiveTimer > 0) {
			inactiveTimer--;
		}
	};

	this.r = () => {
		if (!inactiveTimer) {
			c.save();
			c.translate(position.x, gc.res.y - position.y - (size[1] / 2) + 5);
			c.rotate(-angle);
			draw.r(anim.n(), size);
			c.restore();
		}
	};
}