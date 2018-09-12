window.mountain = (() => {
	const gHoles = [
		[48,4,15,43,37,90,59,86,73,129,97,109,114,76,166,75,150,33,119,0],
		[48,4,2,67,28,118,54,102,78,109,97,136,117,111,187,98,141,60,118,2],
		[48,4,0,43,58,122,110,137,133,95,198,96,119,1]
	];

	const MIN_LENGTH = 100;
	const MAX_DISTORTION = .08;
	const trip = [];
	const CAMPS = [
		[-200, 0, 1200],
		[8000, 3000, 800],
		[24000, 6500, 800],
		[36000, 10500, 600],
	];
	const FINAL = [44000, 10000];
	const HIGH = 12500;
	const LENGTH = 40000;
	let strokeGradient, fillGradient;
	let decoration;

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
			const next = CAMPS[index + 1] || [LENGTH, HIGH];

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

	function defineFinal() {
		trip.push({
			type: 'empty',
			start: new Vector(LENGTH, HIGH),
			end: new Vector(FINAL[0], FINAL[1])
		});
	}

	function defineHoles() {
		let lastHolePassed = -1;
		trip.map((path) => {
			if (path.type === 'empty' && path.start.x > 3000 && path.start.x < CAMPS[3][0]) {
				if (lastHolePassed > 1 && rFloat(0, 1) <= .1 + (.9 * (lastHolePassed / 100))) {
					const holeType = rInt(0, 3),
						startX = gHoles[holeType][0],
						depth = rFloat(1, 3);

					path.type = 'hole';
					path.g = gHoles[holeType].map((item, index) => {
						if (!index) {
							return path.start.x;
						}
						if (index === 1) {
							return path.start.y;
						}
						if (index === gHoles[holeType].length - 2) {
							return path.end.x;
						}
						if (index === gHoles[holeType].length - 1) {
							return path.end.y;
						}
						if (!(index % 2)) {
							return path.start.x + item - startX;
						}
						if (index % 2) {
							return path.start.y - (item * 2);
						}
						return item;
					});
					lastHolePassed = -1;
				}
				lastHolePassed++;
			}
			return path;
		});
	}

	function generate() {
		defineCamps();

		defineFinal();

		let isPatching = true;

		while (isPatching) {
			isPatching = patch();
		}

		defineHoles();

		trip.map((item, index) => {
			item.id = index;
			return item;
		});

		decoration = new MountainDecoration(trip);
	}

	function search(x) {
		return trip.filter((path) => path.start.x <= x && path.end.x > x);
	}

	return {
		i: () => {
			generate();
		},
		n: () => {
			// decoration.n();
		},
		r: () => {
			c.save();
			c.translate(0, gc.res.y);
			c.lineWidth = 10;
			c.lineJoin = 'round';
			strokeGradient = c.createLinearGradient(LENGTH / 2, 0, LENGTH / 2, -HIGH);
			strokeGradient.addColorStop(0, color.get('g1'));
			strokeGradient.addColorStop(2500 / HIGH, color.get('g2'));
			strokeGradient.addColorStop(3300 / HIGH, color.get('g3'));
			strokeGradient.addColorStop(5000 / HIGH, color.get('g3'));
			strokeGradient.addColorStop(6500 / HIGH, color.get('g4'));
			strokeGradient.addColorStop(10500 / HIGH, color.get('g4'));
			strokeGradient.addColorStop(1, color.get('g5'));
			c.strokeStyle = strokeGradient;

			fillGradient = c.createLinearGradient(LENGTH / 2, 0, LENGTH / 2, -HIGH);
			fillGradient.addColorStop(0, color.get('gf1'));
			fillGradient.addColorStop(2500 / HIGH, color.get('gf2'));
			fillGradient.addColorStop(3300 / HIGH, color.get('gf3'));
			fillGradient.addColorStop(5000 / HIGH, color.get('gf3'));
			fillGradient.addColorStop(6500 / HIGH, color.get('gf4'));
			fillGradient.addColorStop(10500 / HIGH, color.get('gf4'));
			fillGradient.addColorStop(1, color.get('gf5'));
			c.fillStyle = fillGradient;

			bp();
			trip
				.filter((item) => item.end.x >= camera.getView().start.x && item.start.x <= camera.getView().end.x)
				.forEach((item, i, filteredTrips) => {
					if (!i) {
						m(item.start.x, -item.start.y);
					}
					if (item.type === 'hole') {
						for (let j = 0; j < item.g.length; j = j+ 2) {
							l(item.g[j], -item.g[j + 1]);
						}
					} else {
						l(item.end.x, -item.end.y);
					}
					if (i === filteredTrips.length - 1) {
						l(item.end.x, 1400);
						l(trip[0].start.x, 1400);
					}
				});
			c.fill();
			c.stroke();
			cp();

			decoration.r();
			c.restore();
		},
		getBlock: (x) => {
			return search(x)[0];
		},
		isHole: (x) => {
			const filteredMap = search(x);
			return filteredMap[0] ? filteredMap[0].type === 'hole' : false;
		},
		getHeight: (x) => {
			const filteredMap = search(x);
			if (filteredMap[0]) {
				let diffX = (x - filteredMap[0].start.x) / (filteredMap[0].end.x - filteredMap[0].start.x);
				let diffY = (filteredMap[0].start.y + 5) + (((filteredMap[0].end.y + 5) - (filteredMap[0].start.y + 5)) * diffX);
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
		},
		getTrip: () => trip
	};
})();