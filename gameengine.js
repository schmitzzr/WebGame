// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        //control keys
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.actionOne = false;
        this.actionTwo = false;
        this.actionThree = false;

        //scene manager should supply game engine with a field this.background which it uses to paint backgrounds.

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    // determineBackground() {
    //     if(this.currLevel == 1){
    //         return this.oneBackground;
    //     } else if(this.currLevel == 2){
    //         return this.twoBackground;
    //     } else if(this.currLevel == 3){
    //         return this.threeBackground;
    //     } else {
    //         return this.oneBackground;
    //     }


    // };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        window.addEventListener("keydown", event => this.keys[event.key] = true);
        window.addEventListener("keyup", event => this.keys[event.key] = false);
            
        var that = this; //need access to game engine object

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch(e.code) {
                case "KeyA":
                    that.left = true;
                    break;
                case "KeyD":
                    that.right = true;
                    break;
                case "KeyW":
                    that.up = true;
                    break;
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyC":
                    that.actionOne = true;
                    break;
                case "KeyE":
                    that.actionTwo = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch(e.code) {
                case "KeyA":
                    that.left = false;
                    break;
                case "KeyD":
                    that.right = false;
                    break;
                case "KeyW":
                    that.up = false;
                    break;
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyC":
                    that.actionOne = false;
                    break;
                case "KeyE":
                    that.actionTwo = false;
                    break;
            }
        }, false);

    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if(this.isPlaying) { //not sure what title screen / death animations will draw
            this.background.draw(this.ctx) //draw background elements first!
        }
        
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        this.camera.draw(this.ctx) //in case I want scene manager to draw last. 
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {``
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };


    

};

// KV Le was here :)