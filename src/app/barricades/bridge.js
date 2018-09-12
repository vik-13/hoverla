function Bridge(block) {
	const size = [243, 65];
	const start = +new Date();
	const anim = new Anim(
		[[[30,59,59,60,60,68,29,67],"","brown2",1],[[62,60,61,68,85,70,85,61],"","brown1",1],[[87,62,87,70,112,72,112,63],"","brown2",1],[[114,72,138,73,138,65,115,64],"","brown1",1],[[140,65,141,73,163,71,162,63],"","brown3",1],[[165,62,167,70,191,66,191,59],"","brown2",1],[[194,59,194,66,220,64,219,57],"","brown1",1],[[37,64,37,0,33,0,34,65],"","brown4",1],[[216,62,213,62,212,2,215,2],"","brown4",1],[[6,56,35,3,109,66],"brown5","",0],[[239,54,214,4,145,68],"brown5","",0],[[0,54,6,50,13,68,12,69],"","brown4",1],[[243,52,238,48,231,65,233,66],"","brown4",1]],
		[]
	);

	let active = true;
	let dead = false;
	const angle = block.angle;
	const length = block.start.distance(block.end);
	const position = new Vector(block.start.x + ((block.end.x - block.start.x) / 2), block.start.y + ((block.end.y - block.start.y) / 2));
	let stage = 0;
	let inactiveTimer = 0;

	function die() {
		particles.dying(position.get().apply(new Vector(position.x, position.y + 20)), ['brown1', 'brown2', 'brown3', 'brown4']);
	}

	this.getBlockId = () => {
		return block.id;
	};

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
			const scale = length / (size[0] * .8);
			c.save();
			c.lineWidth = 2;
			c.translate(position.x - ((scale * size[0] * .2 / 2)), gc.res.y - position.y - ((scale * size[1] / 2)));
			c.rotate(-angle);
			c.scale(scale, scale);
			draw.r(anim.n(), size);
			c.restore();
		}
	};
}