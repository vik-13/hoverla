window.scene =(() => {
	let tree;
	// let ball = new Ball();
	let campfire;

	// function trampoline() {
	// 	var shiftX = 0, shiftY = -45;
	//
	// 	c.save();
	// 	c.translate(100, 400);
	// 	c.scale(5, 5);
	// 	c.miterLimit = 4;
	// 	c.fillStyle = '#72514E';
	// 	bp();
	// 	m(26 + shiftX, 41 + shiftY);
	// 	l(45 + shiftX, 52 + shiftY);
	// 	l(45 + shiftX, 55 + shiftY);
	// 	l(26 + shiftX, 43 + shiftY);
	// 	l(26 + shiftX, 41 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#72514E';
	// 	bp();
	// 	m(54 + shiftX, 32 + shiftY);
	// 	l(54 + shiftX, 37 + shiftY);
	// 	l(71 + shiftX, 53 + shiftY);
	// 	l(71 + shiftX, 48 + shiftY);
	// 	l(54 + shiftX, 32 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#684745';
	// 	bp();
	// 	m(72 + shiftX, 22 + shiftY);
	// 	l(54 + shiftX, 49 + shiftY);
	// 	l(54 + shiftX, 54 + shiftY);
	// 	l(72 + shiftX, 28 + shiftY);
	// 	l(72 + shiftX, 22 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#684745';
	// 	bp();
	// 	m(44 + shiftX, 36 + shiftY);
	// 	l(26 + shiftX, 51 + shiftY);
	// 	l(26 + shiftX, 53 + shiftY);
	// 	l(44 + shiftX, 40 + shiftY);
	// 	l(44 + shiftX, 36 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#684745';
	// 	bp();
	// 	m(84 + shiftX, 53 + shiftY);
	// 	l(26 + shiftX, 55 + shiftY);
	// 	l(26 + shiftX, 49 + shiftY);
	// 	l(86 + shiftX, 47 + shiftY);
	// 	l(85 + shiftX, 49 + shiftY);
	// 	c.fill();
	//
	// 	c.fillStyle = '#72514E';
	// 	bp();
	// 	m(71 + shiftX, 55 + shiftY);
	// 	l(71 + shiftX, 16 + shiftY);
	// 	l(82 + shiftX, 11 + shiftY);
	// 	l(82 + shiftX, 55 + shiftY);
	// 	l(78 + shiftX, 57 + shiftY);
	// 	l(71 + shiftX, 55 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#72514E';
	// 	bp();
	// 	m(43 + shiftX, 34 + shiftY);
	// 	l(54 + shiftX, 28 + shiftY);
	// 	l(54 + shiftX, 56 + shiftY);
	// 	l(51 + shiftX, 56 + shiftY);
	// 	l(49 + shiftX, 58 + shiftY);
	// 	l(43 + shiftX, 57 + shiftY);
	// 	l(43 + shiftX, 56 + shiftY);
	// 	l(43 + shiftX, 34 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#72514E';
	// 	bp();
	// 	m(15 + shiftX, 52 + shiftY);
	// 	l(26 + shiftX, 45 + shiftY);
	// 	l(26 + shiftX, 56 + shiftY);
	// 	l(24 + shiftX, 57 + shiftY);
	// 	l(20 + shiftX, 56 + shiftY);
	// 	l(15 + shiftX, 56 + shiftY);
	// 	l(15 + shiftX, 52 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#684745';
	// 	bp();
	// 	m(26 + shiftX, 45 + shiftY);
	// 	l(15 + shiftX, 56 + shiftY);
	// 	l(15 + shiftX, 52 + shiftY);
	// 	l(26 + shiftX, 45 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#72514E';
	// 	bp();
	// 	m(85 + shiftX, 49 + shiftY);
	// 	l(26 + shiftX, 55 + shiftY);
	// 	l(84 + shiftX, 53 + shiftY);
	// 	l(85 + shiftX, 49 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#684745';
	// 	bp();
	// 	m(71 + shiftX, 17 + shiftY);
	// 	l(76 + shiftX, 14 + shiftY);
	// 	l(82 + shiftX, 10 + shiftY);
	// 	l(71 + shiftX, 55 + shiftY);
	// 	c.fill();
	//
	// 	c.fillStyle = '#684B4A';
	// 	bp();
	// 	m(2 + shiftX, 51 + shiftY);
	// 	l(5 + shiftX, 58 + shiftY);
	// 	l(86 + shiftX, 8 + shiftY);
	// 	l(86 + shiftX, 1 + shiftY);
	// 	l(2 + shiftX, 51 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#684745';
	// 	bp();
	// 	m(43 + shiftX, 57 + shiftY);
	// 	l(54 + shiftX, 28 + shiftY);
	// 	l(43 + shiftX, 34 + shiftY);
	// 	l(43 + shiftX, 57 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#DCEAE7';
	// 	bp();
	// 	m(shiftX, 59 + shiftY);
	// 	l(1 + shiftX, 48 + shiftY);
	// 	l(8 + shiftX, 40 + shiftY);
	// 	l(19 + shiftX, 34 + shiftY);
	// 	l(29 + shiftX, 31 + shiftY);
	// 	l(40 + shiftX, 22 + shiftY);
	// 	l(44 + shiftX, 22 + shiftY);
	// 	l(65 + shiftX, 8 + shiftY);
	// 	l(71 + shiftX, 7 + shiftY);
	// 	l(77 + shiftX, 1 + shiftY);
	// 	l(82 + shiftX, shiftY);
	// 	l(86 + shiftX, shiftY);
	// 	l(87 + shiftX, 1 + shiftY);
	// 	l(88 + shiftX, 7 + shiftY);
	// 	l(81 + shiftX, 3 + shiftY);
	// 	l(75 + shiftX, 8 + shiftY);
	// 	l(68 + shiftX, 12 + shiftY);
	// 	l(63 + shiftX, 15 + shiftY);
	// 	l(58 + shiftX, 19 + shiftY);
	// 	l(50 + shiftX, 22 + shiftY);
	// 	l(42 + shiftX, 29 + shiftY);
	// 	l(38 + shiftX, 32 + shiftY);
	// 	l(32 + shiftX, 33 + shiftY);
	// 	l(27 + shiftX, 36 + shiftY);
	// 	l(23 + shiftX, 38 + shiftY);
	// 	l(20 + shiftX, 40 + shiftY);
	// 	l(15 + shiftX, 44 + shiftY);
	// 	l(9 + shiftX, 48 + shiftY);
	// 	l(4 + shiftX, 55 + shiftY);
	// 	l(shiftX, 59 + shiftY);
	// 	cp();
	// 	c.fill();
	//
	// 	c.fillStyle = '#A6D1D5';
	// 	bp();
	// 	m(81 + shiftX, 3 + shiftY);
	// 	l(77 + shiftX, 5 + shiftY);
	// 	l(73 + shiftX, 9 + shiftY);
	// 	l(68 + shiftX, 10 + shiftY);
	// 	l(59 + shiftX, 17 + shiftY);
	// 	l(50 + shiftX, 21 + shiftY);
	// 	l(44 + shiftX, 24 + shiftY);
	// 	l(42 + shiftX, 26 + shiftY);
	// 	l(39 + shiftX, 27 + shiftY);
	// 	l(30 + shiftX, 32 + shiftY);
	// 	l(22 + shiftX, 38 + shiftY);
	// 	l(15 + shiftX, 41 + shiftY);
	// 	l(9 + shiftX, 44 + shiftY);
	// 	l(3 + shiftX, 51 + shiftY);
	// 	l(shiftX, 59 + shiftY);
	// 	l(5 + shiftX, 58 + shiftY);
	// 	l(9 + shiftX, 48 + shiftY);
	// 	l(14 + shiftX, 48 + shiftY);
	// 	l(18 + shiftX, 43 + shiftY);
	// 	l(19 + shiftX, 46 + shiftY);
	// 	l(20 + shiftX, 42 + shiftY);
	// 	l(24 + shiftX, 39 + shiftY);
	// 	l(26 + shiftX, 38 + shiftY);
	// 	l(31 + shiftX, 40 + shiftY);
	// 	l(32 + shiftX, 34 + shiftY);
	// 	l(34 + shiftX, 34 + shiftY);
	// 	l(41 + shiftX, 33 + shiftY);
	// 	l(45 + shiftX, 28 + shiftY);
	// 	l(49 + shiftX, 24 + shiftY);
	// 	l(56 + shiftX, 21 + shiftY);
	// 	l(62 + shiftX, 20 + shiftY);
	// 	l(66 + shiftX, 14 + shiftY);
	// 	l(67 + shiftX, 14 + shiftY);
	// 	l(72 + shiftX, 12 + shiftY);
	// 	l(73 + shiftX, 13 + shiftY);
	// 	l(77 + shiftX, 7 + shiftY);
	// 	l(81 + shiftX, 6 + shiftY);
	// 	l(84 + shiftX, 7 + shiftY);
	// 	l(85 + shiftX, 15 + shiftY);
	// 	l(87 + shiftX, 7 + shiftY);
	// 	l(89 + shiftX, 7 + shiftY);
	// 	l(86 + shiftX, 4 + shiftY);
	// 	l(84 + shiftX, 3 + shiftY);
	// 	l(81 + shiftX, 3 + shiftY);
	// 	cp();
	// 	c.fill();
	// 	c.restore();
	// }

	return {
		interaction: (mousePosition) => {
			if (!character.isResting()) {
				barricades.add(mousePosition);
			}
			character.interaction(mousePosition);
		},
		i: () => {
			camera.i();
			campfire = new Campfire();
			tree = new Tree();
			mountain.i();
			character.i();
			avalanche.i();

			bushes.i();
			barricades.i();
		},
		n: () => {
			if (!character.isDead()) {
				// campfire.n();
				character.n();
				mountain.n();

				// avalanche.n();
				//
				barricades.n();

				camera.n(character.getPosition());
			}
		},
		r: () => {
			// let bg = c.createLinearGradient(0, 0, 0, gc.res.y);
			// bg.addColorStop(0, '#B9DCEC');
			// bg.addColorStop(.5, '#E4EBD8');
			// c.fillStyle = bg;
			c.fillStyle = '#000000';
			c.fillRect(0, 0, gc.res.x, gc.res.y);

			c.save();
			c.translate(camera.getPosition().x, camera.getPosition().y);

			mountain.r();

			// campfire.r();

			character.r();

			// avalanche.r();

			barricades.r();

			// bushes.r();
			// tree.r();

			c.restore();

			// trampoline();
		}
	};
})();