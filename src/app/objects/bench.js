function Bench(p, front) {
	const g = [[[5,3,5,9,14,9,14,3],"","benchBottom",1],[[0,3,18,3,17,0,0,0],"","benchTop",1]];
	let anim = new Anim(g, []);

	this.front = typeof front !== 'undefined' ? front : !rInt(0, 2);

	this.n = () => {};

	this.r = () => {
		c.save();
		c.translate(p.x, gc.res.y - p.y - 7);
		draw.r(anim.n(), [18, 9]);
		c.restore();
	}
}