window.mountain = (() => {
	const MIN_LENGTH = 100;
	const MAX_DISTORTION = .1;
	const trip = [];
	const CAMPS = [
		[0, 0, 1000],
		[8000, 4000, 800],
		[24000, 10000, 800],
		[36000, 18000, 600],
	];

	function patch() {
		const toBeAdded = [];

		trip.forEach((path) => {
			if (path.type === 'empty') {
				const length = path.start.distance(path.end);

				if (length > 2 * MIN_LENGTH) {
					const angle = path.start.angle(path.end);
					const center = path.start.center(path.end);
					const dist = -MAX_DISTORTION + (rFloat(0, 2 * MAX_DISTORTION));

					const point = new Vector(
						-Math.sin(angle) * (length * dist) + center.x,
						(Math.cos(angle) * (length * dist) + center.y)
					);

					toBeAdded.push({
						o: path,
						n: [{
							type: 'empty',
							start: path.start.get(),
							end: point.get()
						}, {
							type: 'empty',
							start: point.get(),
							end: path.end.get()
						}]
					});
				}
			}
		});

		toBeAdded.forEach((item) => {
			trip.splice(trip.indexOf(item.o), 1, item.n[0], item.n[1]);
		});

		return !!toBeAdded.length;
	}

	function defineCamps() {
		CAMPS.forEach((camp, index) => {
			const next = CAMPS[index + 1] || [40000, 20000];

			trip.push({
				type: 'camp',
				start: new Vector(camp[0], camp[1]),
				end: new Vector(camp[0] + camp[2], camp[1])
			});

			trip.push({
				type: 'empty',
				start: new Vector(camp[0] + camp[2], camp[1]),
				end: new Vector(next[0], next[1])
			});
		});
	}

	function generate() {
		defineCamps();

		let isPatching = true;

		while (isPatching) {
			isPatching = patch();
		}
	}

	return {
		i: () => {
			generate();
		},
		n: () => {

		},
		r: () => {
			const cameraPosition = camera.getPosition();
			c.save();
			c.translate(0, gc.res.y);
			const filteredMap = trip.filter((path) => path.end.x >= (-cameraPosition.x - 200) && path.start.x <= -cameraPosition.x + gc.res.x + 200);
			bp();
			c.fillStyle = 'darkgreen';
			filteredMap.forEach((path, index) => {
				if (!index) {
					m(path.start.x, -path.start.y);
					l(path.end.x, -path.end.y);
				} else if (index === filteredMap.length - 1) {
					l(path.start.x, -filteredMap[0].start.y + 200);
					l(filteredMap[0].start.x, -filteredMap[0].start.y + 200);
					l(filteredMap[0].start.x, -filteredMap[0].start.y);
				} else {
					l(path.end.x, -path.end.y);
				}
			});
			c.fill();
			cp();

			// filteredMap.forEach((path) => {
			// 	if (path.type === 'empty') {
			// 		bp();
			// 		c.strokeStyle = 'brown';
			// 		m(path.start.x, -path.start.y);
			// 		l(path.end.x, -path.end.y);
			// 		c.stroke();
			// 	} else if (path.type === 'camp') {
			// 		bp();
			// 		c.strokeStyle = 'brown';
			// 		m(path.start.x, -path.start.y);
			// 		l(path.end.x, -path.end.y);
			// 		c.stroke();
			// 		cp();
			// 	}
			// });
			c.restore();
		},
		getBlock: (p) => {
			const filteredMap = trip.filter((path) => path.start.x <= p.x && path.end.x > p.x);
			return filteredMap[0] || false;
		}
	};
})();


// Trip = {type: 'regular|hole|rocks|stable|unstable|camp', x1, y1, x2, y2};