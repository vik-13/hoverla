window.draw = (() => {
	return {
		r: (g, size) => {
			c.save();
			if (size) {
				c.translate(-size[0] / 2, -size[1] / 2);
			}
			g.forEach((p) => {
				bp();
				c.fillStyle = p[2] || 'transparent';
				c.strokeStyle = p[1] || 'transparent';
				m(p[0][0], p[0][1]);
				for(let i = 2; i < p[0].length; i = i + 2) {
					l(p[0][i], p[0][i + 1]);
				}
				p[3] && cp();
				c.stroke();
				p[3] && c.fill();
			});
			c.restore();
		}
	};
})();