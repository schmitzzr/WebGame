class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.x = 0;
        this.y = 0;

        //Current level? I think that the scene manager should probably know this.
        this.currLevel = "World 1";
        this.gameOver = false;

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.lives = 3;

        this.startLevel = 1; // change this to change the starting level for debugging purposes

        this.timer = 0;
        this.countingDown = false;

        // For calculating scores
        this.deathCount = 0;
        this.coins = 0;
        this.times = {
            levelOne: 90,
            levelTwo: 120,
            levelThree: 120
        };

        this.level = null;
        this.levelLabel = null;
        this.levelTimer = 0;

        this.credits = false;
        this.controls = false;

        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;

        this.win = false;

        //this.cointAnimation = new Animator(ASSET_MANAGER.getAsset("..."), 0, 160, 8, 8, 4, 0.2, 0, false);

        this.game.jumpsprite = new JumpSprite(game, 0, 0);

        this.title = true;
        this.levelLoaded = false;

        this.deathTimer = 0;
        this.winTimer = 0;

        //this.loadBackground();

    };


    //addCoin() {}
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }
    
    loadLevel(level, transition, title) {

        this.title = title;
        this.clearEntities();

        this.level = level;
        switch(this.level) {
            case 1: 
                this.timer = this.times.levelOne;
                this.levelLabel = "LEARNING THE BASICS";
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, title));
                else {
                    this.loadLevelOne(); 
                    this.countingDown = true;
                };
                break;
            case 2: 
                this.timer = this.times.levelTwo;
                this.levelLabel = "THINKING WITH PORTALS";
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, title));
                else {
                    this.loadLevelTwo(); 
                    this.countingDown = true;
                };
                break;
            case 3: 
                this.timer = this.times.levelThree;
                this.levelLabel = "CHOOSE WISELY";
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, title));
                else {
                    this.loadLevelThree(); 
                    this.countingDown = true;
                };
                break;
            // case 4:
            //     this.levelLabel = "LEVERING THE PLAYING FIELD";
            //     if (transition) this.game.addEntity(new TransitionScreen(this.game, level, title));
            //     else this.loadDebugLevel;
            //     break;
            default: 
                this.levelLabel = "DEBUG LEVEL";
                this.timer = 1;
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, title));
                this.loadDebugLevel();
        }

    }

    loadDebugLevel() {
        const DEBUG_HEIGHT = 64;
        this.currLevel = "Debug Level";

        this.game.isPlaying = true;
        this.game.background = new Background(this.game, "./backgrounds/level1background.png", 1024, 2688, DEBUG_HEIGHT);
              
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
        this.currLevel = "World 2";

        const LEVEL_TWO_HEIGHT = 64;

        this.game.isPlaying = true;
        this.game.background = new Background(this.game, "./backgrounds/level1background.png", 1024, 2688, LEVEL_TWO_HEIGHT);
        
        this.game.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 10)); //essentially (5, )
        //this.game.addEntity(new Coin)
        //this.game.addEntity(new JumpSprite(gameEngine, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 10)); //essentially (5, )

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
        var exitPortal6 = new Portal(gameEngine, 5, 9, LEVEL_TWO_HEIGHT, "exit"); // 5 9
        var startPortal6 = new Portal(gameEngine, 1, 26, LEVEL_TWO_HEIGHT, "start", exitPortal6); //1 26 
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
        this.game.addEntity(new BasicPlatform(this.game, 14, 0, 2, 9, LEVEL_TWO_HEIGHT));

       // this.game.addEntity(new Spblock(this.game, 11, 10, "bomb", LEVEL_TWO_HEIGHT));
        this.game.addEntity(new Spikes(gameEngine, 14, 9, "down", LEVEL_TWO_HEIGHT, true));

        var movePlatform = new MovingPlatform(this.game, 17, -18, 1, 10, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(movePlatform);

        this.game.addEntity(new Lever(this.game, 30, 10, LEVEL_TWO_HEIGHT, false, movePlatform));

        //two parallel platforms and one more platform to the door
        var moveSecond = new MovingPlatform(this.game, 25, -8, 1, 0, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveSecond);

        this.game.addEntity(new Lever(this.game, 30, 10, LEVEL_TWO_HEIGHT, false, moveSecond));

        var moveThird = new MovingPlatform(this.game, 5, -12, 1, 5, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveThird);

        this.game.addEntity(new Lever(this.game, 30, 10, LEVEL_TWO_HEIGHT, false, moveThird));

        //different lever
        var moveFourth = new MovingPlatform(this.game, 15, -38, 1, -16, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveFourth);

        this.game.addEntity(new Lever(this.game, 5, -10, LEVEL_TWO_HEIGHT, false, moveFourth));

        var moveFifth= new MovingPlatform(this.game, 28, -31, 1, -10, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveFifth);

        this.game.addEntity(new Lever(this.game, 5, -10, LEVEL_TWO_HEIGHT, false, moveFifth));

        var moveSixth = new MovingPlatform(this.game, 5, -35, 1, -10, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveSixth);

        this.game.addEntity(new Lever(this.game, 5, -10, LEVEL_TWO_HEIGHT, false, moveSixth));

        var moveSeven = new MovingPlatform(this.game, 10, -35, 1, -22, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveSeven);

        this.game.addEntity(new Lever(this.game, 5, -10, LEVEL_TWO_HEIGHT, false, moveSeven));

        this.game.addEntity(new BasicPlatform(this.game, 5, -26, 6, 2, LEVEL_TWO_HEIGHT)); ///////////////////////////

        //different lever
        var moveEight = new MovingPlatform(this.game, 17, -38, 1, -22, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveEight);

        this.game.addEntity(new Lever(this.game, 28, -30, LEVEL_TWO_HEIGHT, false, moveEight));

        var moveNine= new MovingPlatform(this.game, 25, -58, 1, -32, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveNine);

        this.game.addEntity(new Lever(this.game, 28, -30, LEVEL_TWO_HEIGHT, false, moveNine));

        var moveTen = new MovingPlatform(this.game, 5, -42, 1, -43, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveTen);

        this.game.addEntity(new Lever(this.game, 28, -30, LEVEL_TWO_HEIGHT, false, moveTen));

        var moveEleven = new MovingPlatform(this.game, 10, -50, 1, -39, 3, 1, true, true, LEVEL_TWO_HEIGHT);
        this.game.addEntity(moveEleven);

        this.game.addEntity(new Lever(this.game, 28, -30, LEVEL_TWO_HEIGHT, false, moveEleven));

        this.game.addEntity(new BasicPlatform(this.game, 0, -50, 12, 2, LEVEL_TWO_HEIGHT));

        //portals and pigs
        //exit the portal tunnel
        var exitPortal7 = new Portal(gameEngine, 0, -48, LEVEL_TWO_HEIGHT, "exit"); 
        var startPortal7 = new Portal(gameEngine, 0, -2, LEVEL_TWO_HEIGHT, "start", exitPortal7); 
        gameEngine.addEntity(exitPortal7);
        gameEngine.addEntity(startPortal7);

        var exitPortal8 = new Portal(gameEngine, 14, -46, LEVEL_TWO_HEIGHT, "exit"); 
        var startPortal8 = new Portal(gameEngine, 14, -10, LEVEL_TWO_HEIGHT, "start", exitPortal8); 
        gameEngine.addEntity(exitPortal8);
        gameEngine.addEntity(startPortal8);

        var exitPortal9 = new Portal(gameEngine, 30, -48, LEVEL_TWO_HEIGHT, "exit"); 
        var startPortal9 = new Portal(gameEngine, 30, -2, LEVEL_TWO_HEIGHT, "start", exitPortal9); 
        gameEngine.addEntity(exitPortal9);
        gameEngine.addEntity(startPortal9);

        this.game.addEntity(new Pig(this.game, 0, -58, "right", "bad"));

        this.game.addEntity(new Pig(this.game, 30, -58, "left", "bad"));

        this.game.addEntity(new Pig(this.game, 14, -74, "left", "bad"));

        this.game.addEntity(new Pig(this.game, 14, -53, "right", "bad"));

        //this.game.addEntity(new Pig(this.game, 0, -58, "right", "bad"));







        // Door
        this.game.addEntity(new Door(this.game, 1, -51, LEVEL_TWO_HEIGHT));



        

    }

    loadLevelThree() {

        this.currLevel = "World 3";
        const LEVEL_THREE_HEIGHT = 64;

        ASSET_MANAGER.playAsset("./Nightclub.mp3");

        this.game.isPlaying = true;
        this.game.background = new Background(this.game, "./backgrounds/level3background.png", 1024, 2688, LEVEL_THREE_HEIGHT);
        
        // borders
        this.game.addEntity(new BasicPlatform(this.game, 0, 0, 1, LEVEL_THREE_HEIGHT, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, -2, 0, 2, 1, LEVEL_THREE_HEIGHT)); // horizontal wrap
        this.game.addEntity(new BasicPlatform(this.game, 32, 0, 2, 1, LEVEL_THREE_HEIGHT)); // horizontal wrap
        this.game.addEntity(new BasicPlatform(this.game, 31, 0, 1, LEVEL_THREE_HEIGHT, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 0, LEVEL_THREE_HEIGHT, 32, 14, LEVEL_THREE_HEIGHT));

        // Platforms
        this.game.addEntity(new BasicPlatform(this.game, 3, 4, 28, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 3, 13, 28, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 3, 22, 28, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 3, 31, 28, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 3, 4, 1, 27, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 40, 4, 3, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 25, 40, 4, 3, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 43, 28, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 8, 14, 1, 5, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 9, 18, 4, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 1, 50, 4, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 9, 53, 1, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 18, 56, 1, 1, LEVEL_THREE_HEIGHT));
        this.game.addEntity(new BasicPlatform(this.game, 26, 60, 1, 1, LEVEL_THREE_HEIGHT));

        // Moving Platforms
        var vertPlatform = new MovingPlatform(this.game, 1, 4, 1, 39, 2, 1, false, true, LEVEL_THREE_HEIGHT);
        this.game.addEntity(vertPlatform);

        var horizPlatform = new MovingPlatform(this.game, 25, 19, 17, 19, 3, 1, false, false, LEVEL_THREE_HEIGHT);
        this.game.addEntity(horizPlatform);

        // Weak Platforms
        this.game.addEntity(new WeakPlatform(this.game, 9, 40, 3, 1, LEVEL_THREE_HEIGHT, 1.5));
        this.game.addEntity(new WeakPlatform(this.game, 17, 40, 3, 1, LEVEL_THREE_HEIGHT, 1.5));

        // Bats
        this.game.addEntity(new Bat(this.game, 9, 7, 6, LEVEL_THREE_HEIGHT, 1));
        this.game.addEntity(new Bat(this.game, 15, 6, 6, LEVEL_THREE_HEIGHT, 2));
        this.game.addEntity(new Bat(this.game, 23, 8, 6, LEVEL_THREE_HEIGHT, 3));
        this.game.addEntity(new Bat(this.game, 19, 10, 6, LEVEL_THREE_HEIGHT, 4));

        // Bombs
        this.game.addEntity(new Spblock(this.game, 15, 24, "bomb", LEVEL_THREE_HEIGHT));
        this.game.addEntity(new Spblock(this.game, 10, 28, "bomb", LEVEL_THREE_HEIGHT));
        this.game.addEntity(new Spblock(this.game, 21, 23, "bomb", LEVEL_THREE_HEIGHT));
        this.game.addEntity(new Spblock(this.game, 24, 29, "bomb", LEVEL_THREE_HEIGHT));


        // Spikes
        this.game.addEntity(new Spikes(this.game, 9, 19, "down", LEVEL_THREE_HEIGHT, true)); 
        this.game.addEntity(new Spikes(this.game, 11, 19, "down", LEVEL_THREE_HEIGHT, true));

        this.game.addEntity(new Spikes(this.game, 17, 20, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 19, 20, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 21, 20, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 23, 20, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 25, 20, "up", LEVEL_THREE_HEIGHT, true));

        this.game.addEntity(new Spikes(this.game, 5, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 7, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 9, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 11, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 13, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 15, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 17, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 19, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 21, 41, "up", LEVEL_THREE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 23, 41, "up", LEVEL_THREE_HEIGHT, true));

        // Sprite
        this.game.addEntity(new JumpSprite(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * -40));
        //this.game.addEntity(new JumpSprite(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 16)); // for debugging

        // Levers
        this.game.addEntity(new Lever(this.game, 28, 24, LEVEL_THREE_HEIGHT, false, vertPlatform));
        this.game.addEntity(new Lever(this.game, 10, 15, LEVEL_THREE_HEIGHT, false, horizPlatform));

        // Portals
        var mainExitPortal = new Portal(this.game, 3, 1, LEVEL_THREE_HEIGHT, "exit");
        this.game.addEntity(mainExitPortal);

        this.game.addEntity(new Portal(this.game, 5, 6, LEVEL_THREE_HEIGHT, "start", mainExitPortal));
        this.game.addEntity(new Portal(this.game, 28, 19, LEVEL_THREE_HEIGHT, "start", mainExitPortal));
        this.game.addEntity(new Portal(this.game, 5, 24, LEVEL_THREE_HEIGHT, "start", mainExitPortal));
        
        var exitPortal1 = new Portal(this.game, 28, 6, LEVEL_THREE_HEIGHT, "exit");
        this.game.addEntity(exitPortal1);
        this.game.addEntity(new Portal(this.game, 19, 1, LEVEL_THREE_HEIGHT, "start", exitPortal1));
        
        var exitPortal2 = new Portal(this.game, 5, 15, LEVEL_THREE_HEIGHT, "exit");
        this.game.addEntity(exitPortal2);
        this.game.addEntity(new Portal(this.game, 11, 1, LEVEL_THREE_HEIGHT, "start", exitPortal2));
        
        var exitPortal3 = new Portal(this.game, 5, 28, LEVEL_THREE_HEIGHT, "exit");
        this.game.addEntity(exitPortal3);
        this.game.addEntity(new Portal(this.game, 27, 1, LEVEL_THREE_HEIGHT, "start", exitPortal3));

        // Door
        this.game.addEntity(new Door(this.game, 1, 49, LEVEL_THREE_HEIGHT));

        // Background
        //this.game.addEntity(new Background(this.game, "./backgrounds/sunset.png", 1920, 1080, LEVEL_THREE_HEIGHT));
        //this.game.addEntity(new Background(this.game, "./backgrounds/level1background.png", 1024, 2688, LEVEL_THREE_HEIGHT));

    }

    // Order of priority:  Platforms/Obstacles > Sprite > Pickups/Levers/Portals/Doors
    loadLevelOne() { //less important is loaded first, then mains. 
        this.x = 0;
        this.currLevel = "World 1";
        //this.level = level;

        const LEVEL_ONE_HEIGHT = 64;

        //ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./Audio.mp3");

        this.game.isPlaying = true;
        this.game.background = new Background(this.game, "./backgrounds/level1background.png", 1024, 2688, LEVEL_ONE_HEIGHT);


        //test for a moving platform

        this.game.addEntity(new MovingPlatform(this.game, 1, 56, 8, 62, 3, 1, true, true, LEVEL_ONE_HEIGHT));
        
        var movePlatform = new MovingPlatform(this.game, 1, 3, 1, 17, 3, 1, true, true, LEVEL_ONE_HEIGHT);
        this.game.addEntity(movePlatform);

        this.game.addEntity(new BasicPlatform(this.game, 12, 57, 6, 1, LEVEL_ONE_HEIGHT));
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
        
        
        this.game.addEntity(new Spikes(this.game, 29, 62, "left", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 29, 60, "left", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 29, 58, "left", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 29, 56, "left", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 29, 54, "left", LEVEL_ONE_HEIGHT, true));

        this.game.addEntity(new Spikes(this.game, 27, 54, "down", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 25, 54, "down", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 23, 54, "down", LEVEL_ONE_HEIGHT, true));
        this.game.addEntity(new Spikes(this.game, 21, 54, "down", LEVEL_ONE_HEIGHT, true));


        //gameEngine.addEntity(new CherryBlossom(gameEngine, 8, 40, LEVEL_ONE_HEIGHT));

        this.game.addEntity(new Spblock(this.game, 14, 55, "bomb", LEVEL_ONE_HEIGHT));
        


        this.game.addEntity(new JumpSprite(this.game, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 5)); // platforms and 

        //Levers, Doors, Portals, and Power-ups should be loaded after the JumpSprite

        var exitPortal1 = new Portal(this.game, 21, 32, LEVEL_ONE_HEIGHT, "exit");
        var startPortal1 = new Portal(this.game, 26, 58, LEVEL_ONE_HEIGHT, "start", exitPortal1);
        this.game.addEntity(exitPortal1);
        this.game.addEntity(startPortal1);

        this.game.addEntity(new Lever(this.game, 2, 21, LEVEL_ONE_HEIGHT, false, movePlatform));
        this.game.addEntity(new Door(this.game, 25, 2, LEVEL_ONE_HEIGHT));


        this.game.addEntity(new ControlsSheet(this.game, 1, 42, 0.5, LEVEL_ONE_HEIGHT, true));

        //this.game.addEntity(new Background(this.game, "./backgrounds/level1background.png", 1024, 2688, LEVEL_ONE_HEIGHT));

    };

    // loadBackground() {

    // }

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

        //start button
        if (this.title && !this.credits && !this.controls) {
            if (this.game.click && this.game.click.y > 13.5 * PARAMS.BLOCKWIDTH && this.game.click.y < 14.5 * PARAMS.BLOCKWIDTH) {
                this.title = false;
                if (!this.levelLoaded) {
                    this.levelLoaded = true;
                    this.loadLevel(this.startLevel, true, false);  //I can manually load different levels after start screen
                }
            // controls button
            } else if (this.game.click && this.game.click.y > 15 * PARAMS.BLOCKWIDTH && this.game.click.y < 16 * PARAMS.BLOCKWIDTH) {
                this.controls = true;
            // credits button
            } else if (this.game.click && this.game.click.y > 16.5 * PARAMS.BLOCKWIDTH && this.game.click.y < 17.5 * PARAMS.BLOCKWIDTH) {
                this.credits = true;
            }
        } else if (this.title && (this.credits || this.controls)) {
            if ((this.game.click && this.game.click.y > 21 * PARAMS.BLOCKWIDTH && this.game.click.y < 22 * PARAMS.BLOCKWIDTH)) {
                this.controls = false;
                this.credits = false;   
            }
        } else if (this.win) {
            this.clearEntities();
            this.game.addEntity(new WinningScreen(this.game, this.times, this.coins, this.deathCount));
            if ((this.game.click && this.game.click.y > 21 * PARAMS.BLOCKWIDTH && this.game.click.y < 22 * PARAMS.BLOCKWIDTH)) {
                this.win = false;
                this.title = true;
                this.levelLoaded = false;
            }
        }

        if (this.game.levelComplete) {
            this.winTimer += this.game.clockTick;
            this.countingDown = false;

            switch(this.level) {
                case 1: 
                    this.times.levelOne = this.timer;
                    break;
                case 2: 
                    this.times.levelTwo = this.timer;
                    break;
                case 3: 
                    this.times.levelThree = this.timer;
                    break;
            }

            if (this.winTimer > 1.5) {
                ASSET_MANAGER.pauseBackgroundMusic();
                this.game.levelComplete = false;
                this.winTimer = 0;
                if (this.level < 3) this.loadLevel(this.level + 1, true, false);  //set to +1 when level 2 is complete
                else {
                    this.clearEntities();
                    this.win = true;
                    //this.levelLoaded = false;
                }
            }
        } 

        if(this.countingDown) {
            this.timer -= this.game.clockTick;
            if (this.timer <= 0) {
                this.timer = 0;
                this.game.jumpsprite.health -= this.game.clockTick * 5;
            }
        }

        if(this.game.jumpsprite.dead) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.deathTimer += this.game.clockTick;
            this.countingDown = false;
            if (this.deathTimer > 2) {
                this.deathTimer = 0;
                this.game.jumpsprite.dead = false;
                this.gameOver = false;
                this.deathCount++;
                this.loadLevel(this.level, true, false);
            }
        };
    };

    //in main characters draw method
    //this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE); //differenece should always be midpoint
    //I wan tto do this.y - this.game.camera.y //all entites take into account changes in scene manager.

    //scene manager is the only entity created in main, other entities are created in scene managers "load level one ()". It will load all of the other elements. //adds a ton of entites.
    //resets this.x = 0; 
    //scene manager is drawn last.

    //The scene manager draw function is basically the HUD.
    draw(ctx){ 
        var currHealth = this.game.jumpsprite.health;
        //not sure I need ctx.translate(0, -10); hack to move elements up by 10 pixels
        ctx.fillStyle = "Black";
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = "center";
        //ctx.font = "20px Georgia";

        //ctx.lineWidth = ;
        if (this.title) ctx.drawImage(ASSET_MANAGER.getAsset("./backgrounds/title_screen.png"), 0, 0, 1024, 768);
        if (this.title && !this.controls && !this.credits) {
            ctx.font = PARAMS.BLOCKWIDTH * 1.5 + 'px "Press Start 2P"';

            ctx.fillStyle = "black";
            ctx.fillText("SPEEDFALL", 16 * PARAMS.BLOCKWIDTH, 11 * PARAMS.BLOCKWIDTH);

            ctx.font = PARAMS.BLOCKWIDTH * 0.75 + 'px "Press Start 2P"';
            //start button
            if ((this.game.mouse && this.game.mouse.y > 13.5 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 14.5 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("START", 16 * PARAMS.BLOCKWIDTH, 14.5*PARAMS.BLOCKWIDTH);
            } else {
                ctx.fillStyle = "black";
                ctx.fillText("START", 16 * PARAMS.BLOCKWIDTH, 14.5*PARAMS.BLOCKWIDTH);
            }
            
            //controls button
            if ((this.game.mouse && this.game.mouse.y > 15 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 16 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("CONTROLS", 16 * PARAMS.BLOCKWIDTH, 16*PARAMS.BLOCKWIDTH);
            } else  {
                ctx.fillStyle = "black";
                ctx.fillText("CONTROLS", 16 * PARAMS.BLOCKWIDTH, 16*PARAMS.BLOCKWIDTH);
            }

            //credits button
            if ((this.game.mouse && this.game.mouse.y > 16.5 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 17.5 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("CREDITS", 16 * PARAMS.BLOCKWIDTH, 17.5*PARAMS.BLOCKWIDTH);
            } else  {
                ctx.fillStyle = "black";
                ctx.fillText("CREDITS", 16 * PARAMS.BLOCKWIDTH, 17.5*PARAMS.BLOCKWIDTH);
            }
        } else if (this.title && this.credits) {

            ctx.fillStyle = "black";
            //ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
            ctx.fillText("Developed by:", 16 * PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);
            ctx.fillText("Eyob Fenta", 16 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
            ctx.fillText("Zachary Schmitz", 16 * PARAMS.BLOCKWIDTH, 14.5 * PARAMS.BLOCKWIDTH);
            ctx.fillText("David Taylor", 16 * PARAMS.BLOCKWIDTH, 16 * PARAMS.BLOCKWIDTH);

            if ((this.game.mouse && this.game.mouse.y > 21 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 22 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            } else  {
                ctx.fillStyle = "black";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            }
        } else if (this.title && this.controls) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./image/control-sheet.png"), 
            4 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 24 * PARAMS.BLOCKWIDTH, 18 * PARAMS.BLOCKWIDTH);
            
            if ((this.game.mouse && this.game.mouse.y > 21 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 22 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            } else  {
                ctx.fillStyle = "black";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            }
        } else if (!this.title && this.win) {
            
            ctx.font = PARAMS.BLOCKWIDTH * 0.75 + 'px "Press Start 2P"';
            
            if ((this.game.mouse && this.game.mouse.y > 21 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 22 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            } else  {
                ctx.fillStyle = "white";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            }

        } else {
            ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
            ctx.fillText("HEALTH", 2 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
            ctx.fillText(Math.ceil(currHealth) + " / 100", 7 * PARAMS.BLOCKWIDTH, 1* PARAMS.BLOCKWIDTH);

            ctx.fillText("LEVEL", 15.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
            ctx.fillText(this.level, 17.5 * PARAMS.BLOCKWIDTH, 1* PARAMS.BLOCKWIDTH);

            if (this.timer < 10) ctx.fillStyle = "red";
            ctx.fillText("TIME", 28 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
            ctx.fillText(this.timerCalc(this.timer), 30.5 * PARAMS.BLOCKWIDTH, 1* PARAMS.BLOCKWIDTH);
        }

        if(this.gameOver == true){
            ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
            ctx.fillText("YOU DIED!", 16 * PARAMS.BLOCKWIDTH, 10*PARAMS.BLOCKWIDTH);
        }

    }; //should draw all of the stores, world numbers, text drawing stuff.
    
    timerCalc(seconds) {
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        
        return minutes + ":" + seconds;
    };
};