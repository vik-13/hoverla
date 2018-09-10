function Anim(g, a, s, f) {
	const SPEED = s || 200;
	const TOTAL = a.length + 1;
	const SLIDES = [];

	let breakState = {
		active: false,
		time: 1000,
		direction: new Vector(),
		start: +new Date(),
		velocities: []
	};

  let index = 0;
  let t = 0;
	let tt = 0;
  let last = +new Date();
  let diff = last;
  let isFinished = false;
  let latestSlide;

	SLIDES.push(g);

	a.forEach((aa) => {
		SLIDES.push(g.map((item, i) => {
			let value = item;
			if (aa[i]) {
				value = item.map((item2, ii) => (!ii ? aa[i] : item2));
			}
			return value;
		}));
  });

	this.break = (direction, time) => {
		breakState.active = true;
		breakState.time = time || 1000;
		breakState.direction = direction;
		breakState.start = +new Date;
		latestSlide.forEach((item) => {
			const angle = rFloat(0, Math.PI * 2);
			breakState.velocities.push((new Vector(Math.sin(angle), Math.cos(angle))).add(direction.get().normalize()));
		});
	};

  this.n = () => {
    if (!breakState.active) {
			diff = +new Date() - last;
			t += diff;
			index = Math.floor((t % (TOTAL * SPEED)) / SPEED);
			if (index + 1 === TOTAL) {
				isFinished = true;
			}
			const nextIndex = index + 1 === TOTAL ? f ? index : 0 : index + 1;
			tt = (t % (TOTAL * SPEED)) % SPEED;

			last = +new Date();
			latestSlide = (f && isFinished) ? SLIDES[TOTAL - 1] : SLIDES[index].map((slide, i) => {
				return slide.map((item, ii) => {
					if (!ii) {
						return item.map((item2, iii) => {
							return item2 + ((SLIDES[nextIndex][i][ii][iii] - item2) * tt / SPEED);
						});
					} else {
						return item;
					}
				});
			});
			return latestSlide;
		} else {
			latestSlide = latestSlide.map((item, index) => {
				let acc = breakState.velocities[index].get().normalize().mult(-0.1);
				acc.add(gc.gravity.get().mult(.1));
				breakState.velocities[index].add(acc);

				item[0] = item[0].map((dot, index2) => {
					return !(index2 % 2) ? dot + breakState.velocities[index].x : dot + breakState.velocities[index].y;
				});
				return item;
			});
    	return latestSlide;
		}
  };
}