window.draw = (() => {
	return {
		r: (g) => {
			g.forEach((p) => {
				bp();
				c.fillStyle = p[2];
				c.strokeStyle = p[1];
				m(p[0][0], p[0][1]);
				for(let i = 2; i < p[0].length; i = i + 2) {
					l(p[0][i], p[0][i + 1]);
				}
				cp();
				c.stroke();
				p[3] && c.fill();
			});
		}
	};
})();