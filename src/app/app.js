(() => {
	window.rInt = (from, to) => Math.floor(from + (Math.random() * (to - from)));
	window.rFloat = (from, to) => from + (Math.random() * (to - from));

	window.gc = {
		res: {x: 1280, y: 720},
		interaction: {
			touched: false,
			position: new Vector()
		},
		start: +new Date(),
		last: +new Date()
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
			scene.interaction(new Vector(e.offsetX, e.offsetY).div(gc.originalRatio));
		});
	}

	function resize() {
		gc.size = {x: window.innerWidth, y: window.innerHeight};
		gc.originalRatio = Math.min(gc.size.x / gc.res.x, gc.size.y / gc.res.y);
		gc.canvas.style.width = Math.round(gc.res.x * gc.originalRatio) + 'px';
		gc.canvas.style.height = Math.round(gc.res.y * gc.originalRatio) + 'px';
		gc.ratio = gc.originalRatio * (window.devicePixelRatio || 1);

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
		scene.n();
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