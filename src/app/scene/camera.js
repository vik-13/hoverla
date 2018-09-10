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
			outPosition = new Vector(-position.x + 200, position.y - 100);
			view.start = new Vector(position.x, 0);
			view.end = new Vector(position.x + gc.res.x, 0);
		},
		getPosition: () => outPosition,
		getView: () => view
	};
})();