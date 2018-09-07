window.camera = (() => {
	let position;
	let view = {
		start: new Vector(),
		end: new Vector()
	};

	return {
		i: () => {
			position = new Vector();
		},
		n: (p) => {
			position = new Vector(-p.x + 200, p.y - 100);
			view.start = new Vector(-position.x - 200, 0);
			view.end = new Vector(-position.x + gc.res.x + 200, 0);
		},
		getPosition: () => position,
		getView: () => view
	};
})();