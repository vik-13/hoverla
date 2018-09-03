(() => {
	window.rInt = (from, to) => Math.floor(from + (Math.random() * (to - from)));
	window.rFloat = (from, to) => from + (Math.random() * (to - from));

	window.gc = {
		res: {x: 1280, y: 720},
		interaction: {
			touched: false,
			position: new Vector()
		}
	};

	function init() {
		gc.canvas = document.getElementById('app');

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
			scene.interaction(e.offsetX, e.offsetY);
		});
	}

	function resize() {
		gc.size = {x: window.innerWidth, y: window.innerHeight};
		gc.ratio = Math.min(gc.size.x / gc.res.x, gc.size.y / gc.res.y);
		gc.canvas.style.width = Math.round(gc.res.x * gc.ratio) + 'px';
		gc.canvas.style.height = Math.round(gc.res.y * gc.ratio) + 'px';
		gc.ratio = gc.ratio * (window.devicePixelRatio || 1);

		changeCanvasSize();
	}

	function changeCanvasSize() {
		gc.canvas.width = Math.round(gc.res.x * gc.ratio);
		gc.canvas.height = Math.round(gc.res.y * gc.ratio);
	}

	function live() {
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