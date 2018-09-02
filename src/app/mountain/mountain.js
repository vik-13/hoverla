window.mountain = (() => {
	const MIN_LENGTH = 50;
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
							end: point.get(),
							angle: path.start.get().angle(point.get()),
							direction: point.get().sub(path.start.get()).normalize()
						}, {
							type: 'empty',
							start: point.get(),
							end: path.end.get(),
							angle: point.get().angle(path.end.get()),
							direction: path.end.get().sub(path.start.get()).normalize()
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
				end: new Vector(camp[0] + camp[2], camp[1]),
				angle: 0,
				direction: new Vector(1, 0)
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
		console.log(trip);
	}

	function search(x) {
		return trip.filter((path) => path.start.x <= x && path.end.x > x);
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
			// c.scale(0.025, 0.025);
			// const filteredMap = trip.filter((path) => path.end.x >= (-cameraPosition.x - 200) && path.start.x <= -cameraPosition.x + gc.res.x + 200);
			const gradient = c.createLinearGradient(20000, 0, 20000, -20000);
			gradient.addColorStop(0, 'hsl(87, 39%, 36%)');
			gradient.addColorStop(4000 / 20000, 'hsl(40, 39%, 36%)');
			gradient.addColorStop(10000 / 20000, 'hsl(181, 39%, 87%)');
			gradient.addColorStop(18000 / 20000, 'hsl(181, 79%, 85%)');
			gradient.addColorStop(1, 'hsl(181, 79%, 100%)');
			// c.fillStyle = 'hsl(87, 39%, 36%)';
			c.fillStyle = gradient;
			bp();
			trip.forEach((path, index) => {
				if (!index) {
					m(path.start.x, -path.start.y);
					l(path.end.x, -path.end.y);
				} else if (index === trip.length - 1) {
					l(path.start.x, -trip[0].start.y + 200);
					l(trip[0].start.x, -trip[0].start.y + 200);
					l(trip[0].start.x, -trip[0].start.y);
				} else {
					l(path.end.x, -path.end.y);
				}
			});
			c.fill();
			cp();
			c.restore();
		},
		getBlock: (p) => {
			return search(p.x)[0];
		},
		getHeight: (x) => {
			const filteredMap = search(x);
			if (filteredMap[0]) {
				let diffX = (x - filteredMap[0].start.x) / (filteredMap[0].end.x - filteredMap[0].start.x);
				let diffY = filteredMap[0].start.y + ((filteredMap[0].end.y - filteredMap[0].start.y) * diffX);
				return diffY;
			} else {
				return -1;
			}
		},
		getAngle: (x) => {
			const filteredMap = search(x);
			return filteredMap[0] ? filteredMap[0].angle : 0;
		},
		getDirection: (x) => {
			const filteredMap = search(x);
			return filteredMap[0] ? filteredMap[0].direction.get() : new Vector();
		}
	};
})();


// Trip = {type: 'regular|hole|rocks|stable|unstable|camp', x1, y1, x2, y2};