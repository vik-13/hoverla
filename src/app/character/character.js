window.character = (() => {
	const WALKING_SPEED = 1;
	const RUNNING_SPEED = 5;
	const g = {
		stand: [
			[[[0,1,0,11,12,13,12,0],"#ffffff","",1],[[5,18,4,26,6,34],"#ffffff","",0],[[5,37,7,43,7,51],"#ffffff","",0],[[6,15,6,26,5,35],"#ffffff","",0],[[6,17,5,25,7,35],"#ffffff","",0],[[4,37,4,44,3,51],"#ffffff","",0]],
			[]
		],
		running: [
			[[[8,0,7,10,19,12,22,1],"#ffffff","",1],[[11,18,5,22,4,30],"#ffffff","",0],[[15,38,18,43,21,50],"#ffffff","",0],[[14,14,14,26,13,35],"#ffffff","",0],[[15,18,21,25,25,22],"#ffffff","",0],[[10,37,6,43,0,46],"#ffffff","",0]],
			[[[8,3,7,13,18,15,21,4],[11,20,4,23,2,31],[15,38,19,44,17,50],[14,18,14,29,12,37],[15,21,21,28,27,23],[11,38,11,45,4,44]],[[8,0,7,10,19,12,22,1],[14,18,10,25,14,34],[12,36,11,43,7,51],[14,14,14,26,12,35],[14,18,10,25,15,34],[14,35,17,41,10,42]],[[8,-3,7,7,19,9,22,-2],[13,15,6,20,7,30],[11,33,7,41,1,48],[14,10,14,23,12,31],[15,15,15,25,25,26],[15,32,21,37,16,40]],[[8,0,7,10,19,12,22,1],[12,18,5,21,4,30],[11,37,7,43,1,45],[14,14,14,26,12,35],[15,18,22,26,26,21],[13,37,18,43,21,51]],[[8,4,7,14,18,16,21,5],[11,20,4,24,1,32],[11,38,11,44,4,44],[13,18,14,30,11,37],[15,21,22,27,27,23],[13,38,18,45,16,53]],[[8,0,7,10,19,12,22,1],[13,17,11,27,15,37],[14,36,18,44,10,42],[14,14,14,26,12,33],[14,17,15,27,16,34],[11,36,11,45,8,53]],[[8,-3,7,7,19,9,22,-2],[12,15,8,20,9,31],[14,32,22,37,16,40],[14,10,14,23,12,31],[15,15,16,23,25,26],[11,32,7,42,2,51]]]
		],
		down: [
			[[[0,1,0,11,12,13,12,0],"#ffffff","",1],[[5,18,4,26,6,34],"#ffffff","",0],[[5,37,7,43,7,51],"#ffffff","",0],[[6,15,6,26,5,35],"#ffffff","",0],[[6,17,5,25,7,35],"#ffffff","",0],[[4,37,4,44,3,51],"#ffffff","",0]],
			[[[18,18,11,24,16,33,25,26],[10,29,11,38,13,46],[4,45,10,48,3,50],[12,29,3,35,3,43],[11,30,14,38,17,46],[2,45,6,48,0,51]]],
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
			[100, 300, 500],
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
	const b = [25, 45];
	const death = {
		DYING_TIME: 3000,
		type: 0, // 0 - by rock; 1 - fallingDawn; 2? - By cold on the top of the mountain;
		dead: false,
		dying: false,
		startDying: 0
	};
	let covered = false;

	run();

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
		sprite = new Anim(...g.running, 50);
		speed = RUNNING_SPEED;
	}

	function walk() {
		sprite = new Anim(...g.running, 200);
		speed = WALKING_SPEED;
	}

	function sitDown() {
		sprite = new Anim(...g.down);
		speed = 0;
		velocity = 0;
	}

	function stop() {
		sprite = new Anim(...g.stand);
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

		if (avalanche.collision(position, 20)) {
			die(0);
		}
	}

	return {
		isDead: () => death.dead,
		interaction: (mousePosition) => {
			if (restState.resting) {
				restState.resting = false;
				restState.walkingOut = true;
				walk();
			}
		},
		i: () => {
			position = new Vector(800, 0);
			speed = RUNNING_SPEED;
		},
		n: () => {
			if (!death.dying) {
				if (velocity <= speed) {
					velocity += acceleration;
					velocity = velocity > speed ? speed : velocity;
				} else {
					velocity -= acceleration;
					velocity = velocity < speed ? speed : velocity;
				}

				position.add(new Vector(velocity, 0));
				position.y = mountain.getHeight(position.x);
				checkForRest();

				collision();
			} else {
				if (death.type) {
					position.add(new Vector(.4, -4));
				} else {
					position.add(new Vector(.1, -.1));
				}
			}

			checkDying();
		},
		r: () => {
			c.save();
			c.translate(position.x, gc.res.y - position.y - b[1]);
			c.lineWidth = 3;
			draw.r(sprite.n());
			c.restore();
		},
		getPosition: () => position
	};
})();