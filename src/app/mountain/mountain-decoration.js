function MountainDecoration(trip) {
	const color1 = 'rgba(0, 0, 0, .05)';

	let gList = [
		[[[17,6,15,26,0,38,15,55,40,46,63,54,76,28,56,27,49,0],"",color1,1]],
		[[[13,16,0,38,14,59,41,43,46,57,71,57,70,13,76,5,37,0,16,1],"",color1,1]],
		[[[13,1,25,36,0,43,4,57,31,38,51,56,52,28,44,11,33,0],"",color1,1]],
		[[[0,4,21,29,1,62,25,67,43,68,56,45,51,21,66,10,28,0],"",color1,1]]
	];
	let gListSizes = [
		[76,55],
		[76,59],
		[52, 57],
		[66, 68]
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
							rInt(Math.min(item.start.y, item.end.y), Math.min(item.start.y, item.end.y) + 600)
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
			c.translate(item.position.x, gc.res.y - item.position.y);
			c.rotate(item.rotate);
			c.scale(item.scale, item.scale);
			draw.r(item.anim.n(), gListSizes[item.g]);
			c.restore();
		});
	};
}