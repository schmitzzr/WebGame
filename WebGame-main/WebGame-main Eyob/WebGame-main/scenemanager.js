class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.x = 0;
        this.y = 0;
this.title = true;
this.transition = false;
this.death = false;
this.level = null;
this.flag = false;
this.titleBackground = ASSET_MANAGER.getAsset("./image/forest.jpg");
this.JumpSprite = new JumpSprite(this.game, 100, 100);
this.hp = ASSET_MANAGER.getAsset("./image/play.png");
        this.loadLevel(levelOne, false, this.title);
    
        //Current level? I think that the scene manager should probably know this.
        this.currLevel = "World 1";
        this.gameOver = false;

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.coins = 0;
        this.lives = 3;

        this.level = null;

        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;

        //this.cointAnimation = new Animator(ASSET_MANAGER.getAsset("..."), 0, 160, 8, 8, 4, 0.2, 0, false);

        let debug = false; // set to true if you want to test entities in the debug level
        let lvlOne = true;
        let lvlTwo =  false;

        if (debug)  {
            this.loadDebugLevel(); 
        } else if(lvlOne){ 
            this.loadLevelOne(); 
        } else if(lvlTwo) {
            this.loadLevelTwo();
        } else {
            this.loadDebugLevel();
        }

        this.loadBackground();

    };

    //addCoin() {}
    //clearEntities();

    loadDebugLevel() {
        const DEBUG_HEIGHT = 64;
        this.currLevel = "Debug Level";
              
        // platform testing
        this.game.addEntity(new BasicPlatform(this.game, -2, DEBUG_HEIGHT, 36, 1, DEBUG_HEIGHT));

        var vertPlatform = new MovingPlatform(this.game, 16, 62, 16, 56, 3, 1, true, true, DEBUG_HEIGHT);
        var horzPlatform = new MovingPlatform(this.game, 21, 60, 26, 50, 3, 1, true, false, DEBUG_HEIGHT);
        this.game.addEntity(vertPlatform);
        this.game.addEntity(horzPlatform);
        this.game.addEntity(new WeakPlatform(this.game, 7, 62, 3, 1, DEBUG_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 4, 62, 3, 1, DEBUG_HEIGHT));

        //lever

        this.game.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 5));

        this.game.addEntity(new Lever(this.game, 2, 62, DEBUG_HEIGHT, false, vertPlatform, horzPlatform));

    }

    loadLevelTwo() {
        this.x = 0;
        this.CurrLevel = "World 2";

        const LEVEL_TWO_HEIGHT = 64;
       
    
                //Adding Obstacles, Enemies,
        gameEngine.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * -36)); //essentially (5, )

        this.game.addEntity(new BasicPlatform(this.game, -2, 64, 36, 1, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 6, 62, 26, 2, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 9, 60, 23, 2, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 12, 58, 20, 2, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 15, 56, 17, 2, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 18, 54, 14, 2, LEVEL_TWO_HEIGHT));

        this.game.addEntity(new Spikes(this.game, 4, 62, "left", LEVEL_TWO_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 7, 60, "left", LEVEL_TWO_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 10, 58, "left", LEVEL_TWO_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 13, 56, "left", LEVEL_TWO_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 16, 54, "left", LEVEL_TWO_HEIGHT, true));

        var exitPortal1 = new Portal(gameEngine, 18, 36, LEVEL_TWO_HEIGHT, "exit");
        var startPortal1 = new Portal(gameEngine, 3, 46, LEVEL_TWO_HEIGHT, "start", exitPortal1);
        gameEngine.addEntity(exitPortal1);
        gameEngine.addEntity(startPortal1);

        this.game.addEntity(new BasicPlatform(this.game, 18, 40, 14, 2, LEVEL_TWO_HEIGHT));

        var exitPortal2 = new Portal(gameEngine, 25, 20, LEVEL_TWO_HEIGHT, "exit");
        var startPortal2 = new Portal(gameEngine, 25, 32, LEVEL_TWO_HEIGHT, "start", exitPortal2);
        gameEngine.addEntity(exitPortal2);
        gameEngine.addEntity(startPortal2);

        this.game.addEntity(new BasicPlatform(this.game, 0, 30, 32, 2, LEVEL_TWO_HEIGHT));

        var exitPortal3 = new Portal(gameEngine, 15, 20, LEVEL_TWO_HEIGHT, "exit");
        var startPortal3 = new Portal(gameEngine, 17, 26, LEVEL_TWO_HEIGHT, "start", exitPortal3);
        gameEngine.addEntity(exitPortal3);
        gameEngine.addEntity(startPortal3);

        var exitPortal4 = new Portal(gameEngine, 10, 20, LEVEL_TWO_HEIGHT, "exit");
        var startPortal4 = new Portal(gameEngine, 13, 26, LEVEL_TWO_HEIGHT, "start", exitPortal4);
        gameEngine.addEntity(exitPortal4);
        gameEngine.addEntity(startPortal4);

        var exitPortal5 = new Portal(gameEngine, 4, 20, LEVEL_TWO_HEIGHT, "exit");
        var startPortal5 = new Portal(gameEngine, 7, 26, LEVEL_TWO_HEIGHT, "start", exitPortal5);
        gameEngine.addEntity(exitPortal5);
        gameEngine.addEntity(startPortal5);

        //exit the portal tunnel
        var exitPortal6 = new Portal(gameEngine, 1, 26, LEVEL_TWO_HEIGHT, "exit");
        var startPortal6 = new Portal(gameEngine, 5, 9, LEVEL_TWO_HEIGHT, "start", exitPortal6);
        gameEngine.addEntity(exitPortal6);
        gameEngine.addEntity(startPortal6);

        //spikes for tunnel
        gameEngine.addEntity(new Spikes(gameEngine, 0, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 2, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 4, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 6, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 8, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 10, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 12, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 14, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 16, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 18, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 20, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 22, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 24, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 26, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 28, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 30, 28, "up", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 32, 28, "up", LEVEL_TWO_HEIGHT, true));

        gameEngine.addEntity(new Spikes(gameEngine, 0, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 2, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 4, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 6, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 8, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 10, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 12, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 14, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 16, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 18, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 20, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 22, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 24, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 26, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 28, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 30, 14, "down", LEVEL_TWO_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 32, 14, "down", LEVEL_TWO_HEIGHT, true));


        //spikes for tunnel

        this.game.addEntity(new BasicPlatform(this.game, 0, 12, 32, 2, LEVEL_TWO_HEIGHT));

        this.game.addEntity(new Bat(this.game, 4, 4, 9, LEVEL_TWO_HEIGHT, 2)); 
        this.game.addEntity(new Bat(this.game, 26, 8, 8, LEVEL_TWO_HEIGHT, 3));
        this.game.addEntity(new Bat(this.game, 8, 4, 7, LEVEL_TWO_HEIGHT, 4)); 
        this.game.addEntity(new Bat(this.game, 16, 8, 6, LEVEL_TWO_HEIGHT, 5));
        this.game.addEntity(new Bat(this.game,21, 4, 12, LEVEL_TWO_HEIGHT, 6)); 
        this.game.addEntity(new Bat(this.game, 23, 8, 12, LEVEL_TWO_HEIGHT, 7));
        this.game.addEntity(new Bat(this.game, 19, 4, 12, LEVEL_TWO_HEIGHT, 8)); 
        this.game.addEntity(new Bat(this.game, 6, 8, 7, LEVEL_TWO_HEIGHT, 9));

        this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, 12, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, 12, LEVEL_TWO_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 14, 0, 1, 12, LEVEL_TWO_HEIGHT));

        var movePlatform = new MovingPlatform(this.game, 17, -10, 1, 10, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(movePlatform);

        this.game.addEntity(new Lever(this.game, 30, 10, LEVEL_TWO_HEIGHT, false, movePlatform));





    }

    loadLevelOne() { //less important is loaded first, then mains. 
        this.x = 0;
        this.currLevel = "World 1";
        //this.level = level;

        const LEVEL_ONE_HEIGHT = 64;

        //ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./Audio.mp3");


        //test for a moving platform

        this.game.addEntity(new MovingPlatform(this.game, 8, 56, 8, 62, 3, 1, true, true, LEVEL_ONE_HEIGHT));
        
        var movePlatform = new MovingPlatform(this.game, 1, 3, 1, 17, 3, 1, true, true, LEVEL_ONE_HEIGHT);
        this.game.addEntity(movePlatform);

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
        
        // save the bats for level 2

        // this.game.addEntity(new Bat(this.game, 4, 54, 10, LEVEL_ONE_HEIGHT, 2)); 
        // this.game.addEntity(new Bat(this.game, 13, 53, 10, LEVEL_ONE_HEIGHT, 3));

        // gameEngine.addEntity(new SpikesCorpse(gameEngine, 11, 51, "left", LEVEL_ONE_HEIGHT));
        // gameEngine.addEntity(new SpikesCorpse(gameEngine, 11, 53, "right", LEVEL_ONE_HEIGHT));
        // gameEngine.addEntity(new SpikesCorpse(gameEngine, 11, 57, "up", LEVEL_ONE_HEIGHT));
        //gameEngine.addEntity(new SpikesCorpse(gameEngine, 11, 55, "down", LEVEL_ONE_HEIGHT));

        gameEngine.addEntity(new Spikes(gameEngine, 29, 62, "left", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 29, 60, "left", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 29, 58, "left", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 29, 56, "left", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 29, 54, "left", LEVEL_ONE_HEIGHT, true));

        gameEngine.addEntity(new Spikes(gameEngine, 27, 54, "down", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 25, 54, "down", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 23, 54, "down", LEVEL_ONE_HEIGHT, true));
        gameEngine.addEntity(new Spikes(gameEngine, 21, 54, "down", LEVEL_ONE_HEIGHT, true));


        //gameEngine.addEntity(new CherryBlossom(gameEngine, 8, 40, LEVEL_ONE_HEIGHT));

        // gameEngine.addEntity(new Spblock(gameEngine, 13, 58, "health", LEVEL_ONE_HEIGHT));
        // gameEngine.addEntity(new Spblock(gameEngine, 15, 58, "flower", LEVEL_ONE_HEIGHT));
        gameEngine.addEntity(new Spblock(gameEngine, 4, 56, "bomb", LEVEL_ONE_HEIGHT));
        
        //used for fully bordered level. Curr testing horizontal wrap
        //this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        //this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));

        gameEngine.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 5)); // platforms and 

        //Levers, Doors, Portals, and Power-ups should be loaded after the JumpSprite

        var exitPortal1 = new Portal(gameEngine, 21, 32, LEVEL_ONE_HEIGHT, "exit");
        var startPortal1 = new Portal(gameEngine, 19, 58, LEVEL_ONE_HEIGHT, "start", exitPortal1);
        gameEngine.addEntity(exitPortal1);
        gameEngine.addEntity(startPortal1);

        this.game.addEntity(new Lever(this.game, 2, 21, LEVEL_ONE_HEIGHT, false, movePlatform));
        this.game.addEntity(new Door(gameEngine, 25, 2, LEVEL_ONE_HEIGHT));

        //I'm also contemplating creating a grapple hook ...
        //I also want to implement basketballs and hoop....
    };

    loadBackground() {

    }

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
        let VerticalMid = PARAMS.CANVAS_HEIGHT / 2;//harcoded for canvas size //I should also account for character sprite.

        //if(this.x < this.mario.x - midpoint) this.x = this.mario.x - midpoint;
        //if(this.y < this.mario.y - midpoint) this.y = this.mario.y - midpoint;
        //if(this.y > this.mario.y + midpoint) this.y = this.mario.y + midpoint;
        //standard scrolling
        this.y = this.game.jumpsprite.y - VerticalMid;

         // Gamepad control of debug
         if (this.game.gamepad != null && this.game.gamepad.buttons[8].pressed && this.menuButtonTimer > this.menuButtonCooldown) {
            if (document.getElementById("debug").checked) {
                document.getElementById("debug").checked = false;
            } else {
                document.getElementById("debug").checked = true;
            }
            this.menuButtonTimer = 0;
        }

        // Gamepad control of debug
        if (this.game.gamepad != null && this.game.gamepad.buttons[9].pressed && this.menuButtonTimer > this.menuButtonCooldown) {
            if (document.getElementById("mute").checked) {
                document.getElementById("mute").checked = false;
            } else {
                document.getElementById("mute").checked = true;
            }
            this.menuButtonTimer = 0;
        }

        // Gamepad control of volume slider
        if (this.game.gamepad != null && Math.abs(this.game.gamepad.axes[2]) > 0.3 && this.menuButtonTimer > this.menuButtonCooldown) {
            if (this.game.gamepad.axes[2] > 0.3) {
                document.getElementById("volume").value = parseFloat(document.getElementById("volume").value, 10) + 0.05;
            } 
            if (this.game.gamepad.axes[2] < -0.3) {
                document.getElementById("volume").value -= 0.05;
            }
            this.menuButtonTimer = 0;
        } 

        this.updateAudio();
        PARAMS.DEBUG = document.getElementById("debug").checked;

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
        ctx.fillText(currHealth.toFixed(1) + " / 100", 5 * PARAMS.BITWIDTH, 1* PARAMS.BITWIDTH);

        ctx.fillText("LEVEL", 21.5 * PARAMS.BITWIDTH, 1 * PARAMS.BITWIDTH);
        ctx.fillText(this.currLevel, 25 * PARAMS.BITWIDTH, 1* PARAMS.BITWIDTH);

        if(this.gameOver == true){
            ctx.fillText("GAME OVER", 15*PARAMS.BITWIDTH, 10*PARAMS.BITWIDTH);
        }



    }; //should draw all of the stores, world numbers, text drawing stuff. 
};