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

        gameEngine.addEntity(new JumpSprite(gameEngine, PARAMS.BITWIDTH, PARAMS.BITWIDTH*5));

        gameEngine.addEntity(new Platform(gameEngine, 0, PARAMS.BITWIDTH*21, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*2, PARAMS.BITWIDTH*21, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*2, PARAMS.BITWIDTH*19, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*8, PARAMS.BITWIDTH*21, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*11, PARAMS.BITWIDTH*20, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*2, PARAMS.BITWIDTH*17, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*6, PARAMS.BITWIDTH*16, PARAMS.BITWIDTH*4));

        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*11, PARAMS.BITWIDTH*5, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*17, PARAMS.BITWIDTH*5, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*20, PARAMS.BITWIDTH*4, PARAMS.BITWIDTH*2)); //seems a little off becuase blocks are 64 height but placed on 32x32 grid
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*11, PARAMS.BITWIDTH, PARAMS.BITWIDTH*2));
        gameEngine.addEntity(new Platform(gameEngine, PARAMS.BITWIDTH*16, PARAMS.BITWIDTH*0, PARAMS.BITWIDTH*11));
    
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*11, PARAMS.BITWIDTH*17, "spike"));
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*13, PARAMS.BITWIDTH*18, "health"));
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*15, PARAMS.BITWIDTH*18, "flower"));
        gameEngine.addEntity(new Spblock(gameEngine, PARAMS.BITWIDTH*4, PARAMS.BITWIDTH*21, "bomb"));

        var exitPortal1 = new Portal(gameEngine, PARAMS.BITWIDTH*21, PARAMS.BITWIDTH*(-8), "exit")
        var startPortal1 = new Portal(gameEngine, PARAMS.BITWIDTH*19, PARAMS.BITWIDTH*18, "start", exitPortal1)
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