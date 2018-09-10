window.sun = (() => {
	let position,
		// angle = Math.PI,
		angle = Math.PI / 2,
		speed = .001,
		time = {
			day: true,
			part: Math.cos(angle)
		},
		moonPosition;

	function get() {
		return position;
	}

	return {
		getTime: () => time,
		getPosition: () => position,
		i: () => {
			position = new Vector();
			moonPosition = new Vector()
		},
		n: () => {
			angle += speed;
			if (angle > 2 * Math.PI) {
				angle -= (2 * Math.PI);
			}
			time.part = Math.cos(angle);
			time.day = (angle >= Math.PI) && angle <= 2 * Math.PI;
			position.apply(new Vector(gc.res.x / 2 + (gc.res.x / 2) * Math.cos(angle),
				650 + 400 * Math.sin(angle)));
			moonPosition = new Vector(gc.res.x / 2 + (gc.res.x / 2) * Math.cos(angle + Math.PI),
				650 + 400 * Math.sin(angle + Math.PI));
		},
		r: () => {
			c.save();
			c.translate(position.x, position.y);
			c.scale(1, 1);
			c.fillStyle = "rgb(253, 214, 49)";
			bp();
			c.arc(30, 30, 30, 0, Math.PI * 2);
			c.fill();
			cp();
			c.restore();

			c.save();
			c.translate(moonPosition.x, moonPosition.y);
			c.scale(1, 1);
			c.miterLimit=4;
			c.fillStyle="#FCFC65";
			bp();
			m(68,55);
			c.bezierCurveTo(45,58,25,42,23,19);
			c.bezierCurveTo(22,12,23,6,26,0);
			c.bezierCurveTo(9,5,-1,22,0,41);
			c.bezierCurveTo(2,62,22,78,43,76);
			c.bezierCurveTo(57,74,68,66,74,54);
			c.bezierCurveTo(72,55,70,55,68,55);
			cp();
			c.fill();
			c.restore();
		}
	};
})();
