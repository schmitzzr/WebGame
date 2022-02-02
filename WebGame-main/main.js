const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./google.png");
ASSET_MANAGER.queueDownload("./fire-dino.png");
//ASSET_MANAGER.queueDownload("./music/overworld.mp3");

ASSET_MANAGER.queueDownload("./grass-platform.png");
ASSET_MANAGER.queueDownload("./big-special.png");
ASSET_MANAGER.queueDownload("./portal-sheet.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

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
