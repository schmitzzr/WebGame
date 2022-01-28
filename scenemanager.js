class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.x = 0;
        this.y = 0;

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.coins = 0;
        this.lives = 3;

        //this.cointAnimation = new Animator(ASSET_MANAGER.getAsset("..."), 0, 160, 8, 8, 4, 0.2, 0, false);

        this.loadLevelOne();
    };

    //addCoin() {}
    //clearEntities();
    loadLevelOne() { //less important is loaded first, then mains. 
        this.x = 0

        const LEVEL_ONE_HEIGHT = 64;

        gameEngine.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 5));

        // gameEngine.addEntity(new Platform(gameEngine, 0, 664, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 64, 664, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 64, 600, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 250, 664, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 350, 624, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 64, 528, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 200, 500, 128));

        // gameEngine.addEntity(new Platform(gameEngine, 364, 164, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 550, 164, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 650, 124, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 364, 28, 64));
        // gameEngine.addEntity(new Platform(gameEngine, 500, 0, 360));

        this.game.addEntity(new BasicPlatform(this.game, 13, 57, 5, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 21, 53, 10, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 24, 46, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 41, 20, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 19, 29, 1, 11, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 9, 34, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 19, 28, 12, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 4, 18, 1, 18, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 27, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 18, 3, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 32, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 32, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 0, 64, 32, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));

    
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*11, PARAMS.BITWIDTH*17, "spike"));
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*13, PARAMS.BITWIDTH*18, "health"));
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*15, PARAMS.BITWIDTH*18, "flower"));
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*4, PARAMS.BITWIDTH*21, "bomb"));

        var exitPortal1 = new Portal(gameEngine, PARAMS.BITWIDTH*21, PARAMS.BITWIDTH*(-8), "exit");
        var startPortal1 = new Portal(gameEngine, PARAMS.BITWIDTH*19, PARAMS.BITWIDTH*18, "start", exitPortal1);
        gameEngine.addEntity(exitPortal1);
        gameEngine.addEntity(startPortal1);

        //I'm also contemplating creating a grapple hook ...
        //I also want to implement basketballs and hoop....
    };

    update() { //I want the screen to follow the dino both top and bottom. 
        //PARAMS.DEBUG = document.getElementById("debug").checked;

        //let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS> BLOCKWIDTH / 2;
        //let midpoint = canvas height/2
        let VerticalMid = 768 / 2;//harcoded for canvas size //I should also account for character sprite.

        //if(this.x < this.mario.x - midpoint) this.x = this.mario.x - midpoint;
        //if(this.y < this.mario.y - midpoint) this.y = this.mario.y - midpoint;
        //if(this.y > this.mario.y + midpoint) this.y = this.mario.y + midpoint;
        //standard scrolling
        this.y = this.game.jumpsprite.y - VerticalMid;



        // if(this.mario.dead && this.mario.y > PARAMS > BLOCKWIDTH * 16) {
        //     //this.clearEntites();
        //     //this.loadLevelOne();
        // };
    };

    //in main characters draw method
    //this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE); //differenece should always be midpoint
    //I wan tto do this.y - this.game.camera.y //all entites take into account changes in scene manager.

    //scene manager is the only entity created in main, other entities are created in scene managers "load level one ()". It will load all of the other elements. //adds a ton of entites.
    //resets this.x = 0; 
    //scene manager is drawn last.

    draw(ctx){

    }; //should draw all of the stores, world numbers, text drawing stuff. 
};