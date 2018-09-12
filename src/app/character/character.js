window.character = (() => {
	const WALKING_SPEED = .5;
	const RUNNING_SPEED = 2;
	const START = 200;
	let gList = {
		walking: [
			[[[15,16,10,20,8,28],"chTopL","",0],[[14,33,17,40,21,48],"chBottomL","",0],[[16,8,16,25,14,33],"chTopC","",0],[[13,12,12,31,4,31,0,17,3,7],"","back",1],[[14,33,10,41,5,47],"chBottomR","",0],[[23,10,18,9,15,4,17,0],"","skin",1],[[11,2,17,16,23,15,22,10,18,9,15,3,17,0],"","hair",1],[[18,3,17,4,19,4],"","#000",1],[[16,16,19,23,24,28],"chTopR","",0]],
			[[[15,16,10,20,6,27],[14,34,19,39,18,48],[15,9,15,26,13,34],[13,13,12,32,4,32,0,18,2,8],[14,34,12,42,4,44],[23,10,18,10,15,4,17,1],[11,3,17,17,23,15,22,10,18,10,15,4,17,1],[18,4,17,5,19,5],[15,17,19,24,27,27]],[[15,16,12,23,16,32],[13,34,12,41,9,48],[15,9,15,25,14,34],0,[14,34,19,40,12,46],0,0,0,[15,16,11,23,16,32]],[[16,15,17,24,26,27],[14,31,10,40,5,47],[16,7,16,24,14,32],[13,10,12,29,4,30,0,16,3,5],[14,32,19,39,14,47],[23,8,18,8,15,2,17,-1],[11,1,17,15,23,13,22,8,18,8,15,2,17,-1],[18,2,17,4,19,4],[15,15,9,21,12,30]],[[16,16,20,23,28,27],[13,34,9,41,0,42],[16,8,16,25,13,34],0,[14,34,19,40,24,47],0,0,0,[15,16,8,22,7,30]],[[15,19,20,24,28,26],[14,33,13,42,5,44],[16,9,16,25,14,34],[13,13,12,32,4,32,0,18,2,8],[14,33,21,39,19,47],[23,11,18,11,15,5,17,2],[11,3,17,18,23,16,22,11,18,11,15,5,17,2],[17,4,17,6,19,6],[15,19,8,23,3,30]],[[15,16,13,24,15,32],[14,33,17,41,10,46],[15,8,16,25,14,32],0,[13,32,13,39,9,47],0,0,0,[16,16,17,24,19,33]],[[15,14,10,19,11,27],[14,32,19,39,16,46],[16,7,16,24,14,32],[13,10,12,29,4,30,0,16,3,5],[14,31,11,40,6,47],[23,8,18,8,15,2,17,-1],[11,0,17,15,23,13,22,8,18,8,15,2,17,-1],[18,2,17,3,19,3],[16,15,18,23,25,26]]]
		],
		running: [
			[[[15,15,9,19,8,27],"chTopL","",0],[[14,32,20,39,22,47],"chBottomL","",0],[[16,8,16,24,14,33],"chTopC","",0],[[13,11,12,30,4,30,0,17,3,6],"","back",1],[[16,15,21,23,28,19],"chTopR","",0],[[14,32,8,40,0,44],"chBottomR","",0],[[24,7,19,8,13,4,14,0],"","skin",1],[[9,4,20,15,26,11,22,7,19,8,13,4,14,0],"","hair",1],[[16,2,16,4,17,4],"","#000",1]],
			[[[15,17,8,20,6,29],[13,34,20,40,18,49],[15,10,15,27,13,35],[13,14,12,33,4,34,0,20,2,9],[16,18,22,25,29,20],[14,34,12,43,3,42],[23,9,19,11,13,7,14,3],[9,7,20,18,25,14,22,10,19,11,13,7,14,3],[16,5,16,7,17,7]],[[15,15,12,22,16,31],[13,33,12,41,8,49],[15,8,15,24,14,33],0,[15,15,11,22,16,31],[14,33,19,40,10,41],[24,7,19,8,13,4,14,0],[9,4,20,15,26,11,22,7,19,8,13,4,14,0],0],[[16,12,17,21,26,23],[13,29,9,38,3,46],[16,5,16,21,13,29],[13,9,12,28,4,28,0,14,3,4],[16,13,8,17,8,26],[13,30,21,35,14,41],[24,5,19,6,14,2,15,-2],[10,2,21,13,26,9,23,5,19,6,14,2,15,-2],[16,0,16,2,18,2]],[[16,15,23,23,30,18],[13,33,9,40,1,44],[16,8,16,24,13,33],0,[15,15,7,19,4,27],[14,33,19,40,22,48],[24,7,19,8,13,4,14,0],[9,4,20,15,26,11,22,7,19,8,13,4,14,0],0],[[15,18,23,25,30,19],[13,34,12,43,2,42],[15,11,15,28,13,35],[12,15,11,34,3,34,0,21,2,10],[15,18,7,22,3,29],[13,34,20,40,17,48],[23,11,19,12,13,8,14,4],[9,8,20,19,25,15,22,11,19,12,13,8,14,4],[16,6,16,8,17,8]],[[15,15,13,23,15,31],[14,32,18,41,8,39],[15,8,16,24,14,31],0,[16,15,17,24,19,32],[13,31,12,41,10,49],[24,7,19,8,13,4,14,0],[9,4,20,15,26,11,22,7,19,8,13,4,14,0],0],[[15,13,11,18,12,27],[13,29,22,35,16,41],[16,4,16,21,13,29],[13,8,12,27,4,27,0,14,3,3],[16,13,18,21,25,24],[13,29,9,38,4,46],[24,3,19,4,14,1,15,-4],[10,1,21,11,26,7,23,3,19,4,14,1,15,-4],[16,-1,16,1,17,1]]]
		],
		sitting: [
			[[[14,14,8,18,7,27],"chTopL","",0],[[15,33,19,41,23,48],"chBottomL","",0],[[16,8,16,24,14,33],"chTopC","",0],[[13,11,12,30,4,30,0,17,3,6],"","back",1],[[16,15,21,23,28,19],"chTopR","",0],[[14,33,8,41,1,44],"chBottomR","",0],[[24,7,19,8,13,4,14,0],"","skin",1],[[9,4,20,15,26,11,22,7,19,8,13,4,14,0],"","hair",1],[[16,2,16,4,17,4],"","#000",1]],
			[[[15,18,14,25,21,31],[8,37,17,40,16,49],[18,13,12,30,7,36],[16,15,7,32,0,29,1,15,8,6],[17,18,16,25,23,31],[7,38,16,40,13,49],[25,16,21,14,19,8,22,5],[16,5,18,20,24,21,24,16,21,14,19,8,23,5],[22,9,21,9,22,11]],[[9,20,9,27,16,33],[7,39,17,40,15,49],[10,14,10,31,8,39],[7,17,6,36,-2,37,-6,23,-3,12],[9,20,12,27,19,32],[7,41,16,41,13,49],[18,17,13,16,9,10,12,7],[6,8,11,23,17,21,16,16,13,16,9,10,12,7],[13,10,12,11,13,12]]],
			400,
			true
		],
		falling: [
			[[[15,16,16,24,22,30],"chTopL","",0],[[15,33,19,41,23,48],"chBottomL","",0],[[16,8,16,25,14,33],"chTopC","",0],[[13,12,12,31,4,31,0,17,3,7],"","back",1],[[14,33,8,41,0,44],"chBottomR","",0],[[23,10,18,9,15,3,18,0],"","skin",1],[[12,1,16,16,23,15,22,10,18,9,15,3,18,0],"","hair",1],[[19,3,17,4,19,5],"","#000",1],[[16,16,17,23,23,29],"chTopR","",0]],
			[[[15,16,18,24,27,25],[15,33,24,34,31,39],0,0,[14,33,16,41,5,41],0,0,0,[16,16,24,16,32,12]],[[15,16,23,17,32,16],[15,33,24,34,18,43],0,0,[14,33,24,34,20,43],0,0,0,[16,16,25,12,32,6]],[[15,16,19,10,19,2],[15,34,14,43,12,50],0,0,[14,33,15,43,11,51],0,0,0,[16,16,21,10,22,2]]],
			500,
			true
		],
		hiding: [
			[[[14,16,14,23,21,29],"chTopL","",0],[[15,33,17,42,17,49],"chBottomL","",0],[[16,8,16,25,14,33],"chTopC","",0],[[13,11,12,30,4,31,0,17,3,6],"","back",1],[[13,33,13,42,11,50],"chBottomR","",0],[[24,10,19,9,16,3,19,0],"","skin",1],[[13,1,17,16,23,15,22,10,19,9,16,3,19,0],"","hair",1],[[20,3,18,4,20,5],"","#000",1],[[16,16,17,24,24,27],"chTopR","",0]],
			[[[20,23,19,30,23,40],[18,40,15,50,5,50],[20,15,20,32,18,40],[17,20,16,39,8,39,4,25,7,15],[19,40,27,42,23,50],[28,16,23,15,19,10,21,6],[15,9,22,22,28,20,27,16,23,15,19,10,21,6],[22,9,21,10,22,11],[20,22,21,30,25,37]]],
			300,
			true
		],
		drinking: [
			[[[15,20,15,28,21,34],"chTopL","",0],[[14,39,23,41,20,49],"chBottomL","",0],[[15,15,15,31,14,40],"chTopC","",0],[[13,17,12,36,4,36,0,23,3,12],"","back",1],[[14,41,22,42,19,49],"chBottomR","",0],[[23,16,19,16,15,10,18,7],"","skin",1],[[11,8,17,23,24,21,22,16,19,16,15,10,18,7],"","hair",1],[[19,9,17,11,19,11],"","#000",1],[[15,20,18,27,25,33],"chTopR","",0],[[25,27,26,35,30,35,31,27],"","cup",1]],
			[[0,0,0,0,0,0,0,0,[16,21,21,25,29,21],[27,17,31,24,35,22,32,14]],[0,0,0,0,0,[24,14,19,15,14,11,15,7],[10,11,20,22,25,19,22,15,19,15,14,11,15,7],[17,10,16,11,18,11],[15,20,22,22,28,16],[24,15,31,19,33,16,28,10]],[0,0,0,0,0,0,0,0,[16,20,21,25,29,23],[28,19,30,26,34,25,33,17]],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
			1500
		]
	};

	const restState = {
		finish: false,
		canRun: true,
		walkingIn: false,
		walkingOut: false,
		resting: false,
		restPoints: [
			[0, 400, 450],
			[8100, 200, 250],
			[24100, 200, 250],
			[36100, 150, 200],
		]
	};

	let sprite;
	let speed;
	let velocity = new Vector();
	let acceleration = .1;
	let angle = 0;
	let scale = 1.5;

	let position;
	const b = [28, 48];
	const death = {
		DYING_TIME: 2000,
		type: 0, // 0 - by rock; 1 - fallingDawn; 2? - By cold on the top of the mountain;
		dead: false,
		dying: false,
		startDying: 0
	};
	let covered = false;

	function checkForRest() {
		if (!restState.resting && !restState.walkingIn && !restState.walkingOut) {
			const isCamp = restState.restPoints.filter((item) => position.x > item[0] && position.x < item[0] + item[1]);
			if (isCamp.length) {
				restState.walkingIn = true;
				walk();
			}
		} else if (restState.walkingIn) {
			const isCamp = restState.restPoints.filter((item) => position.x >= item[0] + item[1] && position.x < item[0] + item[2]);
			if (isCamp.length) {
				restState.resting = true;
				restState.walkingIn = false;
				sitDown();
				setTimeout(() => {
					if (restState.resting) {
						drink();
					}
				}, 1500)
			}
		} else if (restState.walkingOut) {
			const isCamp = restState.restPoints.filter((item) => position.x >= item[0] + item[2] && position.x < item[0] + item[2] + 200);
			if (isCamp.length) {
				restState.walkingOut = false;
				run();
			}
		}
	}

	function die(type) {
		death.type = type;
		death.startDying = +new Date();
		death.dead = false;
		death.dying = true;
		fall();

		if (!type) {
			velocity.apply(new Vector(-3, 3));
		}
	}

	function checkDying() {
		if (death.dying && +new Date() - death.startDying >= death.DYING_TIME) {
			death.dead = true;
			death.dying = false;
		}
	}

	function run() {
		sprite = new Anim(...gList.running, 100);
		speed = RUNNING_SPEED;
	}

	function walk() {
		sprite = new Anim(...gList.walking, 200);
		speed = WALKING_SPEED;
	}

	function sitDown() {
		sprite = new Anim(...gList.sitting);
		speed = 0;
		velocity.apply(new Vector());
	}

	function hiding() {
		sprite = new Anim(...gList.hiding);
		speed = 0;
		velocity.apply(new Vector());
	}

	function stop() {
		sprite = new Anim(...gList.hiding);
		speed = 0;
		velocity.apply(new Vector());
	}

	function fall() {
		sprite = new Anim(...gList.falling);
		speed = 0;
		velocity.apply(new Vector());
	}

	function drink() {
		sprite = new Anim(...gList.drinking);
		speed = 0;
		velocity.apply(new Vector());
		position.add(new Vector(-6, 0));
	}

	function collision() {
		const block = mountain.getBlock(position.x);
		if (block.type === 'hole' && !barricades.checkBridges(block.id)) {
			die(1);
		}

		if (barricades.checkPanels(position)) {
			if (!covered) {
				covered = true;
				hiding();
			}
		} else {
			if (covered) {
				covered = false;
				run();
			}
		}

		if (avalanche.collision(position, 30)) {
			die(0);
		}
	}

	return {
		isResting: () => restState.resting,
		isDead: () => death.dead,
		interaction: () => {
			if (restState.resting) {
				restState.resting = false;
				restState.walkingOut = true;
				walk();
			}
		},
		i: () => {
			position = new Vector(START, 0);
			speed = RUNNING_SPEED;
			run();
		},
		reset: () => {
			death.dead = false;
			death.dying = false;
			velocity = new Vector();
			acceleration = .1;
			angle = 0;
			scale = 1.5;
			position = new Vector(START, 0);
			speed = RUNNING_SPEED;
			run();
		},
		n: () => {
			if (death.dead) {
				return false;
			}
			if (!death.dying && !restState.finish) {
				const direction = mountain.getDirection(position.x);

				if (velocity.x <= speed) {
					velocity.x += acceleration;
					velocity.x = velocity.x > speed ? speed : velocity.x;
				} else {
					velocity.x -= acceleration;
					velocity.x = velocity.x < speed ? speed : velocity.x;
				}

				if (speed > WALKING_SPEED) {
					particles.addRunning(position);
				}

				position.add(new Vector(direction.x * velocity.x, 0));
				position.y = mountain.getHeight(position.x);

				if (position.x > 40000) {
					restState.finish = true;
					stop();
				}
				checkForRest();

				collision();
			} else if (death.dying) {
				if (death.type) {
					position.add(new Vector(.3, -1));
					angle += .02;
					scale = scale - .013 < 0 ? 0 : scale - .013;
				} else {
					let acc = velocity.get().normalize().mult(-0.017);
					acc.add(gc.gravity.get().mult(.1));

					velocity.add(acc);
					position.add(velocity);

					if (position.y < mountain.getHeight(position.x) - 20) {
						position.y = mountain.getHeight(position.x) - 20;
					}
					angle -= .02;
				}
			} else {
				// TODO: FINISHING
			}

			checkDying();
		},
		r: () => {
			c.save();
			c.translate(position.x, gc.res.y - position.y - (b[1] / 2));
			c.rotate(angle);
			c.scale(scale > 1 ? 1 : scale, scale > 1 ? 1 : scale);
			draw.r(sprite.n(), b, 6);
			c.restore();
		},
		getPosition: () => position
	};
})();