window.color = (() => {
	const DIFF = 55;
	const colors = {
		st: ['hsl(214, 100%, ll%)', 75], // Sky top;
		sb: ['hsl(214, 100%, ll%)', 90], // Sky bottom
		g1: ['hsl(87, 39%, ll%)', 66], // green
		g2: ['hsl(87, 39%, ll%)', 75], // light green
		g3: ['hsl(206, 3%, ll%)', 58], // grey
		g4: ['hsl(181, 5%, ll%)', 100], // white
		g5: ['hsl(181, 79%, ll%)', 85] // light blue
	};

	return {
		i: () => {

		},
		n: () => {

		},
		get: (ident) => {
			let c = colors[ident][1] - (DIFF * gc.night);
			c = c >= 0 ? c : 0;
			return colors[ident][0].replace('ll', c);
		}
	};
})();