function Bridge(block) {
	const size = [243, 73];
	// const anim = new Anim(
	// 	[[[0,25,1,28,8,28,8,25],"#fff","",1],[[10,25,10,28,19,28,18,25],"#fff","",1],[[20,25,21,28,28,28,28,25],"#fff","",1],[[30,25,30,28,38,28,38,25],"#fff","",1],[[40,25,40,29,49,28,49,25],"#fff","",1],[[50,25,51,28,58,28,59,24],"#fff","",1],[[61,25,61,29,68,28,69,24],"#fff","",1],[[70,24,71,28,78,28,78,24],"#fff","",1],[[1,28,0,0,2,0,3,28],"#fff","",1],[[78,28,76,28,76,0,78,0],"#fff","",1],[[0,0,75,22,75,24,0,2],"#fff","",1],[[79,1,3,23,4,24,79,2],"#fff","",1]],
	// 	[],
	// 	200
	// );

	const anim = new Anim(
		[[[30,59,59,60,60,68,29,67],"","#b29066",1],[[62,60,61,68,85,70,85,61],"","#947a3e",1],[[87,62,87,70,112,72,112,63],"","#b29066",1],[[114,72,138,73,138,65,115,64],"","#947a3e",1],[[140,65,141,73,163,71,162,63],"","#836223",1],[[165,62,167,70,191,66,191,59],"","#b29066",1],[[194,59,194,66,220,64,219,57],"","#947a3e",1],[[37,64,37,0,33,0,34,65],"","#68250b",1],[[216,62,213,62,212,2,215,2],"","#68250b",1],[[6,56,35,3,109,66],"#b1a559","",0],[[239,54,214,4,145,68],"#b1a559","",0],[[0,54,6,50,13,68,12,69],"","#68250b",1],[[243,52,238,48,231,65,233,66],"","#68250b",1]],
		[]
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
		}
	};

	this.r = () => {
		const scale = length / size[0];
		c.save();
		c.lineWidth = 2;
		c.translate(position.x - 5, gc.res.y - position.y - (scale * (size[1] / 2)));
		c.rotate(-angle);
		c.scale(scale, scale);
		draw.r(anim.n(), size);
		c.restore();
	};
}