function House(position, t, front) {
	const gList = [
		[[[14,22,13,58,56,58,55,22],"#fff","",1],[[0,21,70,23,35,0],"#fff","",1],[[54,42,45,42,45,57,53,57],"#fff","",1],[[22,30,22,49,39,49,39,31],"#fff","",1],[[24,32,24,39,30,39,30,33],"#fff","",1],[[32,33,32,39,37,38,37,33],"#fff","",1],[[24,41,24,47,29,47,29,41],"#fff","",1],[[32,41,32,46,38,46,37,40],"#fff","",1]]
	];
	const gListSizes = [
		[70, 58]
	];
	const type = typeof t === 'undefined' ? rInt(0, gList.length) : t;
	const anim = new Anim(gList[type], []);

	this.front = typeof front !== 'undefined' ? front : !rInt(0, 2);

	this.n = () => {

	};

	this.r = () => {
		c.save();
		c.translate(position.x, gc.res.y - position.y - (gListSizes[type][1] / 2));
		// c.scale(3, 3);
		// c.lineWidth = 3;
		// c.lineJoin = "round";
		draw.r(anim.n(), gListSizes[type]);
		c.restore();
	};
}