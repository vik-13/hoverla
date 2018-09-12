function MountainDecoration(trip) {
	const color1 = 'rgba(0, 0, 0, .05)';

	let gList = [
		[[[17,6,15,26,0,38,15,55,40,46,63,54,76,28,56,27,49,0],"",color1,1]],
		[[[13,16,0,38,14,59,41,43,46,57,71,57,70,13,76,5,37,0,16,1],"",color1,1]],
		[[[13,1,25,36,0,43,4,57,31,38,51,56,52,28,44,11,33,0],"",color1,1]],
		[[[0,4,21,29,1,62,25,67,43,68,56,45,51,21,66,10,28,0],"",color1,1]],
		[[[18,12,18,0,8,4,13,15,0,19,2,27,14,20,76,51,72,57,80,63,86,56,81,49,92,42,88,34,77,44],"","rock1",1]],
		[[[101,42,112,62,93,67,90,44,95,59],"","rock1",1],[[104,55,107,60,98,61,99,55],"","rock1",1],[[91,63,91,66,84,67,84,64],"","rock1",1],[[82,66,77,68,75,41],"","rock1",1],[[72,67,68,68,68,36],"","rock1",1],[[64,67,58,67,63,40],"","rock1",1],[[56,67,46,65,46,62,54,64],"","rock1",1],[[42,63,35,58,37,57,42,61],"","rock1",1],[[32,58,38,48,31,47,25,52],"","rock1",1],[[22,51,23,48,17,46,15,47],"","rock1",1],[[12,44,14,41,7,36,3,34],"","rock1",1],[[2,33,6,33,0,22],"","rock1",1],[[41,46,53,24,48,27,39,44],"","rock1",1],[[52,22,49,19,34,17,32,19],"","rock1",1],[[29,20,32,2,29,11,22,0,27,15,20,13],"","rock1",1]]
	];
	let gListSizes = [
		[76, 55],
		[76, 59],
		[52, 57],
		[66, 68],
		[92, 63],
		[112, 68]
	];
	let list = [];

	generate();

	function generate() {
		trip
			.filter((item, index) => {
				return !index ||
					item.type !== 'hole' &&
					trip[index - 1] && trip[index - 1].type !== 'hole' &&
					trip[index + 1] && trip[index + 1].type !== 'hole'
			})
			.forEach((item) => {
				let count = rInt(1, 5);
				for (let i = 0; i < count; i++) {
					let g = rInt(0, gList.length);
					list.push({
						g: g,
						scale: rFloat(.4, 2),
						rotate: rFloat(0, Math.PI * 2),
						position: new Vector(
							rInt(item.start.x, item.end.x),
							rInt(Math.min(item.start.y, item.end.y) - 100, Math.min(item.start.y, item.end.y) - 600)
						),
						anim: new Anim(gList[g], [])
					});
				}
			});
	}

	this.n = () => {

	};

	this.r = () => {
		list
			.filter((item) => item.position.x >= camera.getView().start.x && item.position.x < camera.getView().end.x)
			.forEach((item) => {
			c.save();
			c.translate(item.position.x, -item.position.y);
			c.rotate(item.rotate);
			c.scale(item.scale, item.scale);
			draw.r(item.anim.n(), gListSizes[item.g]);
			c.restore();
		});
	};
}