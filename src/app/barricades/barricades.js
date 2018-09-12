window.barricades = (() => {
	let brides = [];
	let panels = [];

	return {
		checkBridges: (blockId) => {
			const bridge = brides.filter((item) => blockId === item.getBlockId());
			return !!bridge.length;
		},
		checkPanels: (position) => {
			const panel = panels.filter((item) => position.distance(item.position) <= 10);
			return !!panel.length;
		},
		add: (mousePosition) => {
			const posX = -camera.getPosition().x + mousePosition.x;
			const block = mountain.getBlock(posX);
			const height = mountain.getHeight(posX);
			if (block.type !== 'camp') {
				if (block.type === 'hole') {
					brides = [];
					brides.push(new Bridge(block));
				} else {
					panels = [];
					panels.push(new Panel(new Vector(posX, height), block));
				}
			}
		},
		reset: () => {
			brides = [];
			panels = [];
		},
		n: () => {
			panels = panels.filter((panel) => panel.isActive());
			panels.forEach((panel) => {
				panel.n();
			});

			brides = brides.filter((bridge) => bridge.isActive());
			brides.forEach((bridge) => {
				bridge.n();
			});
		},
		r: () => {
			panels.forEach((panel) => {
				panel.r();
			});

			brides.forEach((bridge) => {
				bridge.r();
			});
		}
	};
})();