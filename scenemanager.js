class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.x = 0;
        this.y = 0;

        //Current level? I think that the scene manager should probably know this.
        this.currLevel = "World 1";

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.coins = 0;
        this.lives = 3;

        //this.cointAnimation = new Animator(ASSET_MANAGER.getAsset("..."), 0, 160, 8, 8, 4, 0.2, 0, false);

        let debug = true; // set to true if you want to test entities in the debug level

        if (debug)  {
            this.loadDebugLevel(); 
        } else { 
            this.loadLevelOne(); 
        }
    };

    //addCoin() {}
    //clearEntities();

    loadDebugLevel() {
        const DEBUG_HEIGHT = 64;
        this.currLevel = "Debug Level";
        this.game.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 5));
        
        // platform testing
        this.game.addEntity(new BasicPlatform(this.game, -2, DEBUG_HEIGHT, 36, 1, DEBUG_HEIGHT));
        this.game.addEntity(new MovingPlatform(this.game, 16, 56, 16, 62, 3, 1, true, true, DEBUG_HEIGHT));
        this.game.addEntity(new MovingPlatform(this.game, 21, 60, 26, 50, 3, 1, true, false, DEBUG_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 20, 62, 3, 1, DEBUG_HEIGHT));
    }

    loadLevelOne() { //less important is loaded first, then mains. 
        this.x = 0
        this.currLevel = "World 1";

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

        //test for a moving platform
        this.game.addEntity(new MovingPlatform(this.game, 8, 56, 8, 62, 3, 1, true, true, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new MovingPlatform(this.game, 1, 3, 1, 17, 3, 1, true, true, LEVEL_ONE_HEIGHT));

        this.game.addEntity(new BasicPlatform(this.game, 13, 57, 5, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 21, 53, 10, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 24, 46, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 41, 20, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 19, 29, 1, 11, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 9, 34, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 19, 28, 12, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 4, 18, 1, 18, LEVEL_ONE_HEIGHT)); //started out 18
        this.game.addEntity(new BasicPlatform(this.game, 1, 27, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 18, 3, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 34, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 0, 64, 32, 10, LEVEL_ONE_HEIGHT));

        this.game.addEntity(new BasicPlatform(this.game, 28, 22, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 22, 17, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 26, 12, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 12, 9, 9, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 4, 3, 27, 1, LEVEL_ONE_HEIGHT));

        //horizontal warp borders
        this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, 35, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, 38, LEVEL_ONE_HEIGHT));
        //offscreen platforms for horizontal wrap
        this.game.addEntity(new BasicPlatform(this.game, -2, 50, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 32, 50, 2, 1, LEVEL_ONE_HEIGHT));
        //bottom
        this.game.addEntity(new BasicPlatform(this.game, 0, 41, 1, 23, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 31, 50, 1, 14, LEVEL_ONE_HEIGHT));
        //experimental bomb
        
        this.game.addEntity(new Spblock(this.game, 29, 51, "bomb", LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Bat(this.game, 4, 54, 10, LEVEL_ONE_HEIGHT)); 
        this.game.addEntity(new Bat(this.game, 13, 53, 10, LEVEL_ONE_HEIGHT));

        gameEngine.addEntity(new Spblock(gameEngine, 11, 57, "spike", LEVEL_ONE_HEIGHT));
        gameEngine.addEntity(new Spblock(gameEngine, 13, 58, "health", LEVEL_ONE_HEIGHT));
        gameEngine.addEntity(new Spblock(gameEngine, 15, 58, "flower", LEVEL_ONE_HEIGHT));
        gameEngine.addEntity(new Spblock(gameEngine, 4, 56, "bomb", LEVEL_ONE_HEIGHT));
        
        //used for fully bordered level. Curr testing horizontal wrap
        //this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        //this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));

        var exitPortal1 = new Portal(gameEngine, 21, 32, LEVEL_ONE_HEIGHT, "exit");
        var startPortal1 = new Portal(gameEngine, 19, 58, LEVEL_ONE_HEIGHT, "start", exitPortal1);
        gameEngine.addEntity(exitPortal1);
        gameEngine.addEntity(startPortal1);

        //I'm also contemplating creating a grapple hook ...
        //I also want to implement basketballs and hoop....
    };

    update() { //I want the screen to follow the dino both top and bottom. 
        //PARAMS.DEBUG = document.getElementById("debug").checked;

        //let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS> BLOCKWIDTH / 2;
        //let midpoint = canvas height/2
        let VerticalMid = PARAMS.CANVAS_HEIGHT / 2;//harcoded for canvas size //I should also account for character sprite.

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

    //The scene manager draw function is basically the HUD.
    draw(ctx){ 
        var currHealth = this.game.jumpsprite.health
        //not sure I need ctx.translate(0, -10); hack to move elements up by 10 pixels
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia"
        //ctx.lineWidth = ;
        ctx.fillText("HEALTH", 1.5 * PARAMS.BITWIDTH, 1 * PARAMS.BITWIDTH);
        ctx.fillText(currHealth + " / 100", 5 * PARAMS.BITWIDTH, 1* PARAMS.BITWIDTH);

        ctx.fillText("LEVEL", 21.5 * PARAMS.BITWIDTH, 1 * PARAMS.BITWIDTH);
        ctx.fillText(this.currLevel, 25 * PARAMS.BITWIDTH, 1* PARAMS.BITWIDTH);

        if(currHealth <= 0){
            ctx.fillText("GAME OVER", 15*PARAMS.BITWIDTH, 10*PARAMS.BITWIDTH);
        }



    }; //should draw all of the stores, world numbers, text drawing stuff. 
};