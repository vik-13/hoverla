window.camera = (() => {
	let position;

	return {
		i: () => {
			position = new Vector();
		},
		n: (p) => {
			position = new Vector(-p.x + 200, p.y - 100);
		},
		getPosition: () => position
	};
})();