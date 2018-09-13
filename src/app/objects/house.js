function House(position, t, front) {
	const gList = [
		[[[0,66,17,46,30,29,39,15,48,0,58,15,68,32,80,48,95,67],"","camp1",1],[[48,1,48,66,65,66],"","camp2",1]]
	];
	const gListSizes = [
		[95, 67]
	];
	const type = typeof t === 'undefined' ? rInt(0, gList.length) : t;
	const anim = new Anim(gList[type], []);

	this.front = typeof front !== 'undefined' ? front : !rInt(0, 2);
	this.position = position;

	this.n = () => {

	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y - (gListSizes[type][1] / 2));
		draw.r(anim.n(), gListSizes[type]);
		c.restore();
	};
}