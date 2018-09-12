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
			c.translate(gc.res.x / 2, 150);
			c.font = '120px Courier New';
			c.textAlign = 'left';
			c.fillStyle = "white";
			c.fillText('[Hoverla]', 0, 0);
			c.translate(0, 200);
			c.font = '40px Courier New';
			c.fillText('Try to reach the peak!', 30, 0);
			c.restore();

			if (gc.byDeath || gc.byWin) {
				c.save();
				c.translate(50, 150);
				c.font = '60px Courier New';
				c.textAlign = 'let';
				c.fillStyle = gc.byDeath ? '#ed6031' : '#61bd62';
				c.fillText(gc.byDeath ? '[Try Again]' : '[You Did It]', 0, 0);
				c.restore();
			}

			c.restore();
		}
	};
})();