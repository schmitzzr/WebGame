const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./image/google.png");
ASSET_MANAGER.queueDownload("./image/spritesheet.png");

//decoration
ASSET_MANAGER.queueDownload("./image/cherry-blossom-three.png");
ASSET_MANAGER.queueDownload("./image/cherry-blossom-two.png");

//bazooka
ASSET_MANAGER.queueDownload("./image/bazooka-pig.png");
ASSET_MANAGER.queueDownload("./image/bazooka-rpg.png");

//door
ASSET_MANAGER.queueDownload("./image/door.png");

ASSET_MANAGER.queueDownload("./image/grass-platform.png");
ASSET_MANAGER.queueDownload("./image/move-platform.png");
ASSET_MANAGER.queueDownload("./image/weak-platform.png");
ASSET_MANAGER.queueDownload("./image/big-special.png");

ASSET_MANAGER.queueDownload("./image/spike-death.png");
ASSET_MANAGER.queueDownload("./image/spikes.png");

ASSET_MANAGER.queueDownload("./image/portal-sheet.png");
ASSET_MANAGER.queueDownload("./image/lever_sheet.png");

ASSET_MANAGER.queueDownload("./image/bat.png");
//background
ASSET_MANAGER.queueDownload("./image/lantern w_o.png");
ASSET_MANAGER.queueDownload("./image/lantern w.png");
ASSET_MANAGER.queueDownload("./image/no_trees_w_o.png");
ASSET_MANAGER.queueDownload("./image/no_trees_w.png");
ASSET_MANAGER.queueDownload("./image/trees and gate.png");
ASSET_MANAGER.queueDownload("./image/trees w_o.png");
ASSET_MANAGER.queueDownload("./image/trees w.png");
//music
ASSET_MANAGER.queueDownload("./Audio.mp3");
//title
ASSET_MANAGER.queueDownload("./image/forest.jpg");
ASSET_MANAGER.downloadAll(() => {
	
	ASSET_MANAGER.autoRepeat("./Audio.mp3");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.clientWidth;
	PARAMS.CANVAS_HEIGHT = canvas.clientHeight;
	
	gameEngine.addEntity(new SceneManager(gameEngine));

	// gameEngine.addEntity(new JumpSprite(gameEngine));

	// gameEngine.addEntity(new Platform(gameEngine, 64, 664, 64));
	// gameEngine.addEntity(new Platform(gameEngine, 250, 664, 64));
	// gameEngine.addEntity(new Platform(gameEngine, 350, 624, 64));
	// gameEngine.addEntity(new Platform(gameEngine, 64, 528, 64));
	// gameEngine.addEntity(new Platform(gameEngine, 200, 500, 128));

	// gameEngine.addEntity(new Spblock(gameEngine, 350, 560, "spike"));
	// gameEngine.addEntity(new Spblock(gameEngine, 414, 560, "health"));
	// gameEngine.addEntity(new Spblock(gameEngine, 478, 560, "flower"));
	// gameEngine.addEntity(new Spblock(gameEngine, 542, 560, "bomb"));


	gameEngine.init(ctx);


	gameEngine.start();
});
