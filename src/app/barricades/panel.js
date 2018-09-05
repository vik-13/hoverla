function Panel(position, block) {
	const size = [64, 44];
	const anim = new Anim(
		[[[52,0,52,12,64,12,64,0],"#fff","",1],[[52,16,64,16,64,28,52,28],"#fff","",1],[[52,32,64,32,64,44,52,44],"#fff","",1],[[50,43,0,43,0,36,50,35],"#fff","",1],[[51,1,0,35,10,35,50,8],"#fff","",1]],
		[],
		200
	);

	let active = true;
	let dead = false;
	let angle = block.angle;

	this.position = position;

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
		if (avalanche.collision(position, 30)) {
			active = false;
			dead = true;
		}
	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y - (size[1] / 2) + 5);
		c.rotate(-angle);
		draw.r(anim.n(), size);
		c.restore();
	};
}