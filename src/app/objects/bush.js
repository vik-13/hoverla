function Bush(position, t, front) {
	const gList = [
		[
			[[[4,26,0,20,2,12,8,9,15,15,23,2,31,0,38,7,42,17,38,26],"","#7e916b",1]],
			[[[4,26,-1,20,0,12,7,10,13,15,21,2,30,1,36,7,41,17,38,26]],[[4,26,1,19,3,12,9,9,16,15,24,2,33,0,40,7,43,17,38,26]]]
		],
		[
			[[[6,42,0,32,3,19,15,14,25,21,26,10,33,3,49,0,61,13,72,5,80,9,83,21,83,34,76,42],"","#7e9b61",1]],
			[[[6,42,-1,32,1,18,13,13,22,21,25,9,32,1,48,-1,58,13,70,5,78,9,82,21,82,33,76,42]],[[6,42,2,32,4,19,16,13,26,21,28,10,35,1,51,-1,64,13,73,3,81,8,85,21,85,35,76,42]]]
		]
	];
	const gListSizes = [
		[42, 26],
		[83, 42]
	];
	const type = typeof t === 'undefined' ? rInt(0, gList.length) : t;
	const anim = new Anim(gList[type][0], gList[type][1], rInt(1200, 2500));
	const angle = mountain.getAngle(position.x);

	this.front = typeof front !== 'undefined' ? front : !rInt(0, 2);
	this.position = position;

	this.n = () => {

	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y - (gListSizes[type][1] / 2));
		c.rotate(-angle);
		draw.r(anim.n(), gListSizes[type]);
		c.restore();
	};
}