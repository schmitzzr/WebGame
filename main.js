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
ASSET_MANAGER.queueDownload("./image/evil-pig-one.png");

//door
ASSET_MANAGER.queueDownload("./image/door.png");

ASSET_MANAGER.queueDownload("./image/grass-platform.png");
ASSET_MANAGER.queueDownload("./image/move-platform.png");
ASSET_MANAGER.queueDownload("./image/weak-platform.png");
ASSET_MANAGER.queueDownload("./image/big-special.png");
ASSET_MANAGER.queueDownload("./image/coin.png");

ASSET_MANAGER.queueDownload("./image/spike-death.png");
ASSET_MANAGER.queueDownload("./image/spikes.png");

ASSET_MANAGER.queueDownload("./image/portal-sheet.png");
ASSET_MANAGER.queueDownload("./image/lever_sheet.png");
ASSET_MANAGER.queueDownload("./image/control-sheet.png");
ASSET_MANAGER.queueDownload("./image/control-sheet-muted.png");

ASSET_MANAGER.queueDownload("./image/bat.png");

// backgrounds
ASSET_MANAGER.queueDownload("./backgrounds/title_screen.png");
ASSET_MANAGER.queueDownload("./backgrounds/forest.png");
ASSET_MANAGER.queueDownload("./backgrounds/level1background.png");
ASSET_MANAGER.queueDownload("./backgrounds/level3background.png");

//sound effects
ASSET_MANAGER.queueDownload("./sounds/explosion.mp3");
ASSET_MANAGER.queueDownload("./sounds/portal.mp3");
ASSET_MANAGER.queueDownload("./sounds/lever.mp3");
ASSET_MANAGER.queueDownload("./sounds/door.mp3");
ASSET_MANAGER.queueDownload("./sounds/glass_break.mp3");
ASSET_MANAGER.queueDownload("./sounds/coin.mp3");

//music
ASSET_MANAGER.queueDownload("./music/Audio.mp3");
ASSET_MANAGER.queueDownload("./music2/Audio.mp3");

ASSET_MANAGER.downloadAll(() => {
	
	ASSET_MANAGER.autoRepeat("./music/Audio.mp3");
	ASSET_MANAGER.autoRepeat("./music2/Audio.mp3");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.clientWidth;
	PARAMS.CANVAS_HEIGHT = canvas.clientHeight;
	
	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.init(ctx);


	gameEngine.start();
});
