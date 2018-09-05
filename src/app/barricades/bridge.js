function Bridge(block) {
	const size = [79, 29];
	const anim = new Anim(
		[[[0,25,1,28,8,28,8,25],"#fff","",1],[[10,25,10,28,19,28,18,25],"#fff","",1],[[20,25,21,28,28,28,28,25],"#fff","",1],[[30,25,30,28,38,28,38,25],"#fff","",1],[[40,25,40,29,49,28,49,25],"#fff","",1],[[50,25,51,28,58,28,59,24],"#fff","",1],[[61,25,61,29,68,28,69,24],"#fff","",1],[[70,24,71,28,78,28,78,24],"#fff","",1],[[1,28,0,0,2,0,3,28],"#fff","",1],[[78,28,76,28,76,0,78,0],"#fff","",1],[[0,0,75,22,75,24,0,2],"#fff","",1],[[79,1,3,23,4,24,79,2],"#fff","",1]],
		[],
		200
	);

	let active = true;
	let dead = false;
	const angle = block.angle;
	const length = block.start.distance(block.end) + 10;
	const position = new Vector(block.start.x + ((block.end.x - block.start.x) / 2), block.start.y + ((block.end.y - block.start.y) / 2));

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
		if (avalanche.collision(position, 40)) {
			active = false;
			dead = true;
			console.log('bridge');
		}
	};

	this.r = () => {
		c.save();
		c.translate(position.x - 5, gc.res.y - position.y - (size[1] / 2));
		c.rotate(-angle);
		c.scale(length / size[0], length / size[0]);
		draw.r(anim.n(), size);
		c.restore();
	};
}