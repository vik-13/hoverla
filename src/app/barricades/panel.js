function Panel(position, block) {
	const size = [81, 68];
	const anim = new Anim(
		[[[76,3,79,11,75,18,66,19,61,12,61,5,69,0],"#000","#b29066",1],[[67,18,74,18,80,24,79,32,71,34,64,32,62,24],"#000","#b29066",1],[[67,34,77,33,80,40,78,48,72,50,65,49,63,41],"#000","#b29066",1],[[70,50,77,50,81,58,77,65,69,66,63,61,64,54],"#000","#b29066",1],[[74,53,1,58,1,66,74,65],"#000000","#836223",1],[[69,3,0,60,5,68,75,13],"#000000","#836223",1],[[6,60,4,62,5,63,7,62],"#000","#5a4c42",1],[[39,32,47,28,47,64,38,64],"#000","#6a3909",1],[[41,33,41,35,44,34,43,31],"#000","#5a4c42",1],[[41,60,41,62,43,62,43,60],"#000","#5a4c42",1],[[68,9,66,12,68,12,70,10],"#000000","#5a4c42",1],[[69,57,69,60,71,61,72,58],"#000000","#5a4c42",1]],
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
		if (avalanche.collision(position, 40)) {
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