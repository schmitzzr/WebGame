class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.x = 0;
        this.y = 0;

        //Current level? I think that the scene manager should probably know this.
        this.currLevel = "World 1"

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
        PARAMS.LEVEL_ONE_HEIGHT = 64;

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

        this.game.addEntity(new BasicPlatform(this.game, 13, 57, 5, 1));
        this.game.addEntity(new BasicPlatform(this.game, 21, 53, 10, 1));
        this.game.addEntity(new BasicPlatform(this.game, 24, 46, 2, 1));
        this.game.addEntity(new BasicPlatform(this.game, 1, 41, 20, 1));
        this.game.addEntity(new BasicPlatform(this.game, 19, 29, 1, 11));
        this.game.addEntity(new BasicPlatform(this.game, 9, 34, 2, 1));
        this.game.addEntity(new BasicPlatform(this.game, 19, 28, 12, 1));
        this.game.addEntity(new BasicPlatform(this.game, 4, 18, 1, 18)); //started out 18
        this.game.addEntity(new BasicPlatform(this.game, 1, 27, 1, 1));
        this.game.addEntity(new BasicPlatform(this.game, 1, 18, 3, 1));
        this.game.addEntity(new BasicPlatform(this.game, 1, 32, 1, 1));
        this.game.addEntity(new BasicPlatform(this.game, 1, 32, 1, 1));
        this.game.addEntity(new BasicPlatform(this.game, 0, 64, 32, 1));

        //horizontal warp borders
        this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, 35));
        this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, 38));
        //offscreen platforms for horizontal wrap
        this.game.addEntity(new BasicPlatform(this.game, -2, 50, 2, 1));
        this.game.addEntity(new BasicPlatform(this.game, 32, 50, 2, 1));
        //bottom
        this.game.addEntity(new BasicPlatform(this.game, 0, 41, 1, 35));
        this.game.addEntity(new BasicPlatform(this.game, 31, 50, 1, 43));
        //experimental bomb
        
        this.game.addEntity(new Spblock(this.game, 29, 51, "bomb"));

        gameEngine.addEntity(new Spblock(gameEngine, 11, 57, "spike"));
        gameEngine.addEntity(new Spblock(gameEngine, 13, 58, "health"));
        gameEngine.addEntity(new Spblock(gameEngine, 15, 58, "flower"));
        gameEngine.addEntity(new Spblock(gameEngine, 4, 61, "bomb"));
        
        //used for fully bordered level. Curr testing horizontal wrap
        //this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        //this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));

        var exitPortal1 = new Portal(gameEngine, 21, 32, "exit");
        var startPortal1 = new Portal(gameEngine, 19, 58, "start", exitPortal1);
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