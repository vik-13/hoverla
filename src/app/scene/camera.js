window.camera = (() => {
	let position, outPosition;
	let view = {
		start: new Vector(),
		end: new Vector()
	};

	return {
		i: () => {
			position = new Vector();
			outPosition = new Vector();
		},
		n: (p) => {
			const direction = p.get().sub(position);
			direction.x *= .05;
			direction.y *= .05;

			position.add(direction);
			if (position.x > 40000 - (gc.res.x / 2) + 200) {
				position.x = 40000 - (gc.res.x / 2) + 200;
			}

			const shift = new Vector(
				5 - 10 * (gc.mousePosition.x / (gc.res.x * gc.ratio)),
				5 - 10 * (gc.mousePosition.y / (gc.res.y * gc.ratio))
			);
			outPosition = new Vector(-position.x + 200 + shift.x, position.y - 100 + shift.y);
			view.start = new Vector(position.x - 400, 0);
			view.end = new Vector(position.x + gc.res.x, 0);
		},
		getPosition: () => outPosition,
		getView: () => view
	};
})();