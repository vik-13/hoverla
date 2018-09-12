window.splashScreen = (() => {
	return {
		n: () => {

		},
		r: () => {
			c.save();
			c.fillStyle = 'rgba(0, 0, 0, .2)';
			c.rect(0, 0, gc.res.x, gc.res.y);
			c.fill();

			c.save();
			c.translate(gc.res.x - 50, 150);
			c.font = '120px Courier New';
			c.textAlign = 'right';
			c.fillStyle = "white";
			c.fillText('[Hoverla]', 0, 0);
			c.restore();

			if (gc.byDeath) {
				c.save();
				c.translate(50, 150);
				c.font = '60px Courier New';
				c.textAlign = 'let';
				c.fillStyle = '#ed6031';
				c.fillText('[The End]', 0, 0);
				c.restore();
			}

			c.restore();
		}
	};
})();