window.character = (() => {
	const MASS = .4;
	const g = {
		stand: [
			[[[0,1,0,11,12,13,12,0],"#ffffff","",1],[[5,18,4,26,6,34],"#ffffff","",0],[[5,37,7,43,7,51],"#ffffff","",0],[[6,15,6,26,5,35],"#ffffff","",0],[[6,17,5,25,7,35],"#ffffff","",0],[[4,37,4,44,3,51],"#ffffff","",0]],
			[]
		],
		walking: [
			[[[8,0,7,10,19,12,22,1],"#ffffff","",1],[[11,18,5,22,4,30],"#ffffff","",0],[[15,38,18,43,21,50],"#ffffff","",0],[[14,14,14,26,13,35],"#ffffff","",0],[[15,18,21,25,25,22],"#ffffff","",0],[[10,37,6,43,0,46],"#ffffff","",0]],
			[[[8,3,7,13,18,15,21,4],[11,20,4,23,2,31],[15,38,19,44,17,50],[14,18,14,29,12,37],[15,21,21,28,27,23],[11,38,11,45,4,44]],[[8,0,7,10,19,12,22,1],[14,18,10,25,14,34],[12,36,11,43,7,51],[14,14,14,26,12,35],[14,18,10,25,15,34],[14,35,17,41,10,42]],[[8,-3,7,7,19,9,22,-2],[13,15,6,20,7,30],[11,33,7,41,1,48],[14,10,14,23,12,31],[15,15,15,25,25,26],[15,32,21,37,16,40]],[[8,0,7,10,19,12,22,1],[12,18,5,21,4,30],[11,37,7,43,1,45],[14,14,14,26,12,35],[15,18,22,26,26,21],[13,37,18,43,21,51]],[[8,4,7,14,18,16,21,5],[11,20,4,24,1,32],[11,38,11,44,4,44],[13,18,14,30,11,37],[15,21,22,27,27,23],[13,38,18,45,16,53]],[[8,0,7,10,19,12,22,1],[13,17,11,27,15,37],[14,36,18,44,10,42],[14,14,14,26,12,33],[14,17,15,27,16,34],[11,36,11,45,8,53]],[[8,-3,7,7,19,9,22,-2],[12,15,8,20,9,31],[14,32,22,37,16,40],[14,10,14,23,12,31],[15,15,16,23,25,26],[11,32,7,42,2,51]]],
			100
		],
		jumping: [
			[[[0,1,0,11,12,13,12,0],"#ffffff","",1],[[5,18,4,26,6,34],"#ffffff","",0],[[5,37,7,43,7,51],"#ffffff","",0],[[6,15,6,26,5,35],"#ffffff","",0],[[6,17,5,25,7,35],"#ffffff","",0],[[4,37,4,44,3,51],"#ffffff","",0]],
			[[[6,7,3,18,16,22,17,9],[8,22,2,26,-3,34],[7,38,11,44,7,51],[9,21,9,30,6,38],[9,23,2,28,-1,36],[5,39,7,44,2,50]],[[1,1,3,12,14,11,14,-2],[8,16,2,24,0,33],[4,36,1,43,-2,51],[9,14,7,26,5,35],[9,17,4,25,2,34],[5,36,3,44,0,52]],[[6,0,4,11,15,14,18,2],[7,17,9,24,17,22],[5,37,13,36,10,44],[8,15,7,26,4,35],[8,16,9,22,17,22],[4,37,12,36,8,44]],[[0,1,0,11,12,13,12,0],[5,18,8,26,16,32],[5,37,8,44,11,51],[6,15,6,26,5,35],[6,17,8,25,16,31],[4,37,5,44,7,52]],[[0,1,0,11,12,13,12,0],[5,18,5,26,14,28],[5,37,8,43,7,50],[6,15,6,26,5,35],[6,17,7,25,14,27],[4,37,5,43,3,50]]],
			100
		],
		down: [
			[[[0,1,0,11,12,13,12,0],"#ffffff","",1],[[5,18,4,26,6,34],"#ffffff","",0],[[5,37,7,43,7,51],"#ffffff","",0],[[6,15,6,26,5,35],"#ffffff","",0],[[6,17,5,25,7,35],"#ffffff","",0],[[4,37,4,44,3,51],"#ffffff","",0]],
			[[[18,18,11,24,16,33,25,26],[10,29,11,38,13,46],[4,45,10,48,3,50],[12,29,3,35,3,43],[11,30,14,38,17,46],[2,45,6,48,0,51]]],
			200,
			true
		]
	};

	let spriteType = 'stand';
	let sprite = new Anim(...g.stand);

	let position;
	const b = [25, 45];

	let velocity = new Vector();

	const jumpState = {
		active: false,
		can: true
	};

	function jump() {
		jumpState.active = true;
		jumpState.can = false;
		velocity.add(new Vector(0, 10));
		toAnim('jumping');
	}

	function toAnim(state, force) {
		if (state !== spriteType || force) {
			spriteType = state;
			switch (spriteType) {
				case 'stand':
					sprite = new Anim(...g.stand);
					return;
				case 'walking':
					sprite = new Anim(...g.walking);
					return;
				case 'jumping':
					sprite = new Anim(...g.jumping);
					return;
				case 'down':
					sprite = new Anim(...g.down);
					return;
				default:
					return;
			}
		}
	}

	return {
		i: () => {
			position = new Vector(200, 0);
		},
		n: () => {
			const mountainDirection = mountain.getDirection(position.x);
			let movementForce = new Vector();
			if (!gc.keys.d) {
				movementForce = new Vector(gc.keys.l ? mountainDirection.get().mult(-1).x : gc.keys.r ? mountainDirection.get().x : 0, 0);
			}
			let acc = velocity.get().normalize().mult(-0.2);
			acc.add(gc.gravity.get().mult(MASS));
			acc.add(movementForce);

			velocity.add(acc);

			if (Math.abs(velocity.x) > 2) {
				if (velocity.x > 0) {
					velocity.x = 2;
				} else {
					velocity.x = -2;
				}
			}

			position.add(velocity);

			if (!gc.keys.l && !gc.keys.r) {
				velocity.x = 0;
			}
			if (!jumpState.can && !gc.keys.u) {
				jumpState.can = true;
			}

			const high = mountain.getHeight(position.x);
			if (position.y < high) {
				position.y = high;
				velocity.y = 0;
				if (jumpState.active) {
					jumpState.active = false;
					toAnim('stand');
				}
			}

			if (gc.keys.u && !jumpState.active && jumpState.can) {
				jump();
			} else if (gc.keys.d && !jumpState.active) {
				toAnim('down');
			} else if (gc.keys.r && !jumpState.active) {
				toAnim('walking');
			} else if (gc.keys.l && !jumpState.active) {
				toAnim('walking');
			} else if (!jumpState.active) {
				toAnim('stand');
			}

			// const movementForce = new Vector(gc.keys.l ? -3 : gc.keys.r ? 3 : 0, 0);
			// const next = position.get().add(movementForce);
			// const block = mountain.getBlock(position);
			//
			// let diffX = (position.x - block.start.x) / (block.end.x - block.start.x);
			// let diffY = block.start.y + ((block.end.y - block.start.y) * diffX);
			// next.apply(new Vector(next.x, diffY));
			// position.apply(next);
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