window.character = (() => {
	const WALKING_SPEED = 1;
	const RUNNING_SPEED = 2.5;
	const START = 0;
	let gList = {
		running: [
			[[[14,14,8,18,7,27],"chTopL","",0],[[15,33,19,41,23,48],"chBottomL","",0],[[16,8,16,24,14,33],"chTopC","",0],[[13,11,12,30,4,30,0,17,3,6],"","back",1],[[16,15,21,23,28,19],"chTopR","",0],[[14,33,8,41,1,44],"chBottomR","",0],[[24,7,19,8,13,4,14,0],"","skin",1],[[9,4,20,15,26,11,22,7,19,8,13,4,14,0],"","hair",1],[[16,2,16,4,17,4],"","#000",1]],
			[[[14,17,7,20,5,29],[14,34,20,42,18,48],[15,10,15,27,13,35],[13,14,12,33,4,34,0,20,2,9],[16,18,22,26,30,20],[13,34,12,43,3,42],[23,9,19,11,13,7,14,3],[9,7,20,18,25,14,22,10,19,11,13,7,14,3],[16,5,16,7,17,7]],[[15,15,12,22,16,31],[13,33,12,41,8,49],[15,8,15,24,14,33],0,[15,15,11,22,16,31],[15,33,20,40,11,41],[24,7,19,8,13,4,14,0],[9,4,20,15,26,11,22,7,19,8,13,4,14,0],0],[[16,12,17,21,26,23],[12,30,8,39,2,48],[16,5,16,21,13,29],[13,9,12,28,4,28,0,14,3,4],[15,13,7,17,7,26],[14,30,22,35,15,42],[24,5,19,6,14,2,15,-2],[10,2,21,13,26,9,23,5,19,6,14,2,15,-2],[16,0,16,2,18,2]],[[16,15,23,23,30,18],[13,34,9,41,1,45],[16,8,16,24,13,33],0,[14,14,6,18,3,26],[14,34,19,41,22,49],[24,7,19,8,13,4,14,0],[9,4,20,15,26,11,22,7,19,8,13,4,14,0],0],[[16,18,24,25,30,20],[13,36,12,44,2,43],[15,11,15,28,13,35],[12,15,11,34,3,34,0,21,2,10],[14,18,6,22,2,29],[13,35,19,43,17,51],[23,11,19,12,13,8,14,4],[9,8,20,19,25,15,22,11,19,12,13,8,14,4],[16,6,16,8,17,8]],[[15,15,12,25,16,35],[14,32,19,42,11,40],[15,8,16,24,14,31],0,[16,15,17,25,17,32],[13,33,12,42,10,50],[24,7,19,8,13,4,14,0],[9,4,20,15,26,11,22,7,19,8,13,4,14,0],0],[[14,13,10,18,11,28],[14,30,23,36,17,42],[16,4,16,21,13,29],[13,8,12,27,4,27,0,14,3,3],[16,13,18,21,26,24],[12,30,8,40,3,49],[24,3,19,4,14,1,15,-4],[10,1,21,11,26,7,23,3,19,4,14,1,15,-4],[16,-1,16,1,17,1]]]
		],
		sitting: [
			[[[14,14,8,18,7,27],"chTopL","",0],[[15,33,19,41,23,48],"chBottomL","",0],[[16,8,16,24,14,33],"chTopC","",0],[[13,11,12,30,4,30,0,17,3,6],"","back",1],[[16,15,21,23,28,19],"chTopR","",0],[[14,33,8,41,1,44],"chBottomR","",0],[[24,7,19,8,13,4,14,0],"","skin",1],[[9,4,20,15,26,11,22,7,19,8,13,4,14,0],"","hair",1],[[16,2,16,4,17,4],"","#000",1]],
			[[[15,18,14,25,21,31],[8,37,17,40,16,49],[18,13,12,30,7,36],[16,15,7,32,0,29,1,15,8,6],[17,18,16,25,23,31],[7,38,16,40,13,49],[25,16,21,14,19,8,22,5],[16,5,18,20,24,21,24,16,21,14,19,8,23,5],[22,9,21,9,22,11]],[[9,20,9,27,16,33],[7,39,17,40,15,49],[10,14,10,31,8,39],[7,17,6,36,-2,37,-6,23,-3,12],[9,20,12,27,19,32],[7,41,16,41,13,49],[18,17,13,16,9,10,12,7],[6,8,11,23,17,21,16,16,13,16,9,10,12,7],[13,10,12,11,13,12]]],
			500,
			true
		]
	};

	const restState = {
		canRun: true,
		walkingIn: false,
		walkingOut: false,
		resting: false,
		restPoints: [
			[0, 400, 600],
			[8100, 200, 400],
			[24100, 200, 400],
			[36100, 150, 300],
		]
	};

	let sprite;
	let speed;
	let velocity = 0;
	let acceleration = .1;

	let position;
	const b = [28, 53];
	const death = {
		DYING_TIME: 3000,
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
		stop();
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
		sprite = new Anim(...gList.running, 200);
		speed = WALKING_SPEED;
	}

	function sitDown() {
		sprite = new Anim(...gList.sitting);
		speed = 0;
		velocity = 0;
	}

	function stop() {
		sprite = new Anim(...gList.running);
		speed = 0;
		velocity = 0;
	}

	function collision() {
		const block = mountain.getBlock(position.x);
		if (block.type === 'hole' && !barricades.checkBridges(block.id)) {
			die(1);
		}

		if (barricades.checkPanels(position)) {
			if (!covered) {
				covered = true;
				sitDown();
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
		interaction: (mousePosition) => {
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
		n: () => {
			if (!death.dying) {
				const direction = mountain.getDirection(position.x);

				if (velocity <= speed) {
					velocity += acceleration;
					velocity = velocity > speed ? speed : velocity;
				} else {
					velocity -= acceleration;
					velocity = velocity < speed ? speed : velocity;
				}

				if (speed > WALKING_SPEED) {
					particles.addRunning(position);
				}

				position.add(new Vector(direction.x * velocity, 0));
				position.y = mountain.getHeight(position.x);
				checkForRest();

				collision();
			} else {
				if (death.type) {
					position.add(new Vector(.2, -4));
				} else {
					position.add(new Vector(.1, -.1));
				}
			}

			checkDying();
		},
		r: () => {
			c.save();
			c.translate(position.x, gc.res.y - position.y - (b[1] / 2));
			draw.r(sprite.n(), b, 6);
			c.restore();
		},
		getPosition: () => position
	};
})();