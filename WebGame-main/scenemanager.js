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

        gameEngine.addEntity(new JumpSprite(gameEngine));

        gameEngine.addEntity(new Platform(gameEngine, 64, 664, 64));
        gameEngine.addEntity(new Platform(gameEngine, 250, 664, 64));
        gameEngine.addEntity(new Platform(gameEngine, 350, 624, 64));
        gameEngine.addEntity(new Platform(gameEngine, 64, 528, 64));
        gameEngine.addEntity(new Platform(gameEngine, 200, 500, 128));

        gameEngine.addEntity(new Platform(gameEngine, 364, 164, 64));
        gameEngine.addEntity(new Platform(gameEngine, 550, 164, 64));
        gameEngine.addEntity(new Platform(gameEngine, 650, 124, 64));
        gameEngine.addEntity(new Platform(gameEngine, 364, 28, 64));
        gameEngine.addEntity(new Platform(gameEngine, 500, 0, 360));
    
        gameEngine.addEntity(new Spblock(gameEngine, 350, 560, "spike"));
        gameEngine.addEntity(new Spblock(gameEngine, 414, 560, "health"));
        gameEngine.addEntity(new Spblock(gameEngine, 478, 560, "flower"));
        gameEngine.addEntity(new Spblock(gameEngine, 542, 660, "bomb"));

        var exitPortal1 = new Portal(gameEngine, 670, -250, "exit")
        var startPortal1 = new Portal(gameEngine, 606, 560, "start", exitPortal1)
        gameEngine.addEntity(exitPortal1);
        gameEngine.addEntity(startPortal1);
        //if (level.music && !this.title) {
          //  ASSET_MANAGER.pauseBackgroundMusic();
          //  ASSET_MANAGER.playAsset(level.music);
        //}
        //I'm also contemplating creating a grapple hook ...
        //I also want to implement basketballs and hoop....
    };
    // Audio play
    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

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