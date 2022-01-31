class JumpSprite {
    constructor(game) {
        this.game = game;
        this.game.jumpsprite = this;

        this.x = 64;
        this.y = 500;

        this.width = 64;
        this.height = 64;

        this.velocityX = 0;
        this.velocityY = 0;

        this.fallACC = 25;
        this.speed = 75;
        this.onGround = false; //default false;

        this.state = 0; 
        this.facing = 0; //0==right 1==left
        this.dead = false; 
        this.health = 100; 

        this.hitBomb = false;

        this.lastBB = new BoundingBox(this.x, this.y, 64, 64);
        this.BB = this.lastBB;

        this.animations = [];
        this.loadAnimations();

        this.animator = new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, false);
    };


    update() {

        //movement constants
        const TICK = this.game.clockTick;

        const MIN_RUN = 25;
        const MAX_RUN = 200;
        
        const MAX_JUMP = 1000;
        const MIN_FALL = 10;
        const MAX_FALL = 150;

        const ACC_RUN = 100;

        const DEC_SKD = 300;
        const DEC_SPD = 75;

        const ACC_FALL = 50;
        //I should also work on pixels / second for velocity.
        if (this.onGround) { //ground physics
            if (Math.abs(this.velocityX) < MIN_RUN) { //slower than minimum run
                this.velocityX = 0;
                this.state = 0;
                if (this.game.left) {
                    this.velocityX -= MIN_RUN
                    this.facing = 1;
                }
                if (this.game.right) {
                    this.velocityX += MIN_RUN
                    this.facing = 0;
                }
            } else if (Math.abs(this.velocityX) >= MIN_RUN) {
                if (this.facing === 0) {
                    if (this.game.right && !this.game.left) {
                        this.velocityX += ACC_RUN * TICK; //tick is always around .13 seconds
                    } else if (this.game.left && !this.game.left) {
                        this.velocityX -= DEC_SKD * TICK;
                        //new state?
                    } else { //nothing pressed
                        this.velocityX -= DEC_SPD * TICK;
                    }
                }
                if (this.facing === 1) {
                    if (this.game.left && !this.game.right) {
                        this.velocityX -= ACC_RUN * TICK; //tick is always around .13 seconds
                    } else if (this.game.right && !this.game.left) {
                        this.velocityX += DEC_SKD * TICK;
                        //new state ? skid?
                    } else { //nothing pressed
                        this.velocityX += DEC_SPD * TICK;
                    }
                }
            }

            if(this.game.up) { //jump
                this.velocityY = -60;
                this.onGround = false;
                //Change to a jumping state?
            }
        } else { //air physics
            this.velocityY += ACC_FALL * TICK;

            //horizontal physics
            if(this.game.right && !this.game.left) {
                this.velocityX += ACC_RUN * TICK;
                this.facing = 0;
            } else if(this.game.left && !this.game.right) {
                this.velocityX -= ACC_RUN * TICK;
                this.facing = 1;
            } else {
                //do nothing.
            }
        }

        //max speed calculation
        if(this.velocityY >= MAX_JUMP) this.velocityY = MAX_JUMP;
        if(this.velocityY <= -MAX_FALL) this.velocityY = -MAX_FALL;

        if(this.velocityX >= MAX_RUN) this.velocityX = MAX_RUN;
        if(this.velocityX <= -MAX_RUN) this.velocityX = -MAX_RUN;

        //update position 
        this.x += this.velocityX * TICK;
        this.y += this.velocityY * TICK * 4;
        this.updateBB();

        //updateBB then check for a collision
        var onPlatform = false;
        //collision detection
        var that = this; //that refers to JumpSprite object.
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(that.velocityY > 0) { //falling
                    if((entity instanceof Platform) && (that.lastBB.bottom) <= entity.BB.top) {
                        that.y = entity.BB.top - that.height;
                        that.velocityY = 0;
                        that.onGround = true;
                        onPlatform = true;
                    } else if((entity instanceof Spblock) && (entity.type === 'bomb')){
                        that.velocityY = -150;
                        that.hitBomb = true;
                    } else if((entity instanceof Portal) && (entity.type === 'start')) {
                        //launch to corresponding exit portal.
                        that.y = entity.linkY; //will spit me out at exit!
                        that.x = entity.linkX;
                        that.onGround = false;
                    };
                };
            };

            if(!onPlatform) {
                that.onGround = false;
            }
        });



        // //DYNAMIC MOVEMENT / ANIMATIONS
        // if(this.game.left){ //this appear to be working!
        //     this.x -= this.speed*this.game.clockTick;
        //     this.facing = 1;
        //     console.log("I have been told to go left!"); //add animations?
        //     console.log(this.game.clockTick)
        // };

        // if(this.game.right){
        //     this.x += this.speed *this.game.clockTick;
        //     this.facing = 0;
        //     console.log("I have been told to go right!");
        // };

        // if(this.game.up){
        //     this.y -= this.speed*this.game.clockTick;
        //     console.log("I have been told to go up!");
        // };

        // if(this.game.down){
        //     this.y += this.speed*this.game.clockTick;
        //     console.log("I have been told to go down!");
        // };
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    draw(ctx) {
        ctx.strokeStyle = "Green";
        //this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        //works for before scene manager capabilities. 
        // if(this.facing === 0){ //if direction is right //must be a better way to trigger which animation I want to run// default animation?
        //     if(this.hitBomb === true) { //must be a simple way to implement this.
        //         this.animations[2].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        //         this.hitBomb = false;
        //     } else {
        //         this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        //     }
        // } else {
        //     if(this.hitBomb === true) { //must be a simple way to implement this.
        //         this.animations[3].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        //         this.hitBomb = false;
        //     } else {
        //         this.animations[1].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top, this.BB.width, this.BB.height);
        //     };

            
        // };

        //accounting for scene manager.
        if(this.facing === 0){ //if direction is right //must be a better way to trigger which animation I want to run// default animation?
            if(this.hitBomb === true) { //must be a simple way to implement this.
                this.animations[2].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
                ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
                this.hitBomb = false;
            } else {
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
                ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
            }
        } else {
            if(this.hitBomb === true) { //must be a simple way to implement this.
                this.animations[3].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
                ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
                this.hitBomb = false;
            } else {
                this.animations[1].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
                ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height);
            };

            
        };        

        
    };

//BB -> bounding boxes.
    loadAnimations() {
        //first I gotta set up the list of lists.
        // for (var state = 0; state < 4;  state++) { //4 possible states
        //     this.animations.push([]);
        //     for (let index = 0; index < 2; index++) { //facing either right or left
        //         this.animations[state].push([]);
        //     };
        // };
        for (var state = 0; state <4; state++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, true);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./fire-dino.png"), 0, 0, 64, 64, 1, .5, false);
        this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./fire-dino.png"), 0, 0, 64, 64, 1, .5, true);
    };



};