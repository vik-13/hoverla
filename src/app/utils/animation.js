function Anim(g, a, s) {
	const SPEED = s || 200;
	const TOTAL = a.length + 1;
	const SLIDES = [];

  let index = 0;
  let t = 0;
	let tt = 0;
  let last = +new Date();
  let diff = last;

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

  this.n = () => {
    diff = +new Date() - last;
		t += diff;
		index = Math.floor((t % (TOTAL * SPEED)) / SPEED);
		const nextIndex = index + 1 === TOTAL ? 0 : index + 1;
		tt = (t % (TOTAL * SPEED)) % SPEED;

		last = +new Date();
		return SLIDES[index].map((slide, i) => {
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
  }
}