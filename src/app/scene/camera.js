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
			const shift = new Vector(
				10 - 20 * (gc.mousePosition.x / (gc.res.x * gc.ratio)),
				10 - 20 * (gc.mousePosition.y / (gc.res.y * gc.ratio))
			);
			outPosition = new Vector(-position.x + 200 + shift.x, position.y - 100 + shift.y);
			view.start = new Vector(position.x - 400, 0);
			view.end = new Vector(position.x + gc.res.x, 0);
		},
		getPosition: () => outPosition,
		getView: () => view
	};
})();