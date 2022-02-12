const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./google.png");
ASSET_MANAGER.queueDownload("./fire-dino.png");
ASSET_MANAGER.queueDownload("./spritesheet.png");

//decoration
ASSET_MANAGER.queueDownload("./cherry-blossom.png");
ASSET_MANAGER.queueDownload("./cherry-blossom-two.png");

//bazooka
ASSET_MANAGER.queueDownload("./bazooka-pig.png");
ASSET_MANAGER.queueDownload("./bazooka-rpg.png");

ASSET_MANAGER.queueDownload("./grass-platform.png");
ASSET_MANAGER.queueDownload("./move-platform.png");
ASSET_MANAGER.queueDownload("./big-special.png");

ASSET_MANAGER.queueDownload("./spike-death.png");
ASSET_MANAGER.queueDownload("./spikes.png");

ASSET_MANAGER.queueDownload("./portal-sheet.png");
ASSET_MANAGER.queueDownload("./lever_sheet.png");

ASSET_MANAGER.queueDownload("./bat.png");

//music
ASSET_MANAGER.queueDownload("./Audio.mp3");

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
