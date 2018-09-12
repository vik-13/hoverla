// Дим окремим компонентом (для вогнища, для димоходу в будинку, для згорівшого дерева);
// Зробити не такими розмитими переходи між травою, скелею й снігом;
// Система частинок для взривів (зіткнення, додавання мосту, чи барикади);
// Система частинок для ходьби персонажа й котіння кулі;
// Погода (хмари, дощ, сніг, шторм з блискавками);
// Падіння в провалля (куля, персонаж);
// День - Ніч;
// Залишки динозаврів й інші речі в середині гори;

// Графіка - Декілька варіантів куль, ялинок, кущів, трави.
// Підправити розмір мосту;
// Можливо покращити графіку для ретіна екранів


(() => {
	window.rInt = (from, to) => Math.floor(from + (Math.random() * (to - from)));
	window.rFloat = (from, to) => from + (Math.random() * (to - from));

	window.gc = {
		res: {x: 1280, y: 720},
		mousePosition: new Vector(),
		start: +new Date(),
		last: +new Date(),
		paused: true,
		byDeath: false,
		night: 0,
		sunset: 0
	};

	function init() {
		gc.canvas = document.getElementById('app');
		gc.fpsOut = document.getElementById('fps');
		gc.fps = {
			all: 0,
			count: 0
		};

		window.c = gc.canvas.getContext('2d');
		window.l = c.lineTo.bind(c);
		window.m = c.moveTo.bind(c);
		window.bp = c.beginPath.bind(c);
		window.cp = c.closePath.bind(c);
		gc.gravity = new Vector(0, -.8);

		resize();

		scene.i();

		live();

		gc.canvas.addEventListener('click', (e) => {
			if (gc.paused) {
				gc.paused = false;
				gc.byDeath = false;
			} else {
				scene.interaction(new Vector(e.offsetX, e.offsetY).div(gc.originalRatio));
			}
		});

		gc.canvas.addEventListener('mousemove', (e) => {
			gc.mousePosition = new Vector(e.offsetX, e.offsetY);
		});
	}

	function resize() {
		gc.size = {x: window.innerWidth, y: window.innerHeight};
		gc.originalRatio = Math.min(gc.size.x / gc.res.x, gc.size.y / gc.res.y);
		gc.canvas.style.width = Math.round(gc.res.x * gc.originalRatio) + 'px';
		gc.canvas.style.height = Math.round(gc.res.y * gc.originalRatio) + 'px';
		// gc.ratio = gc.originalRatio * (window.devicePixelRatio || 1);
		gc.ratio = gc.originalRatio;

		changeCanvasSize();
	}

	function changeCanvasSize() {
		gc.canvas.width = Math.round(gc.res.x * gc.ratio);
		gc.canvas.height = Math.round(gc.res.y * gc.ratio);
	}

	function live() {
		gc.fps.all += Math.floor(1000 / (+new Date() - gc.last));
		gc.fps.count++;
		gc.fpsOut.innerHTML = '' + Math.floor((gc.fps.all / gc.fps.count));
		gc.last = +new Date();
		n();
		r();
		requestAnimationFrame(live);
	}

	function n() {
		if (!gc.paused) {
			gc.night = !sun.getTime().day && Math.abs(sun.getTime().part) >= .8 ?
				((1 - Math.abs(sun.getTime().part)) / .2) : !sun.getTime().day ? 1 : 0;
			gc.sunset = Math.abs(sun.getTime().part) > .8 ? ((Math.abs(sun.getTime().part) - .8) / .2) : 0;
		}
		scene.n();
		if (character.isDead()) {
			gc.night = 0;
			gc.sunset = 0;
			gc.byDeath = true;
			gc.paused = true;
			character.reset();
			camera.reset();
			particles.reset();
			barricades.reset();
			avalanche.reset();
		}
	}

	function r() {
		c.save();
		c.scale(gc.ratio, gc.ratio);
		scene.r();
		c.restore();
	}

	window.onload = init;
	window.onresize = resize;
})();