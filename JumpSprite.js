class JumpSprite {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.game.jumpsprite = this;

        //character status
        this.dead = false; 
        this.health = 100; 


        this.width = 64;
        this.height = 64;

        this.velocity = {x : 0, y : 0};

        this.fallAcc = 562.5;
        this.speed = 75;
        this.onGround = false; //default false;

        this.state = 0; 
        this.facing = 0; //0==right 1==left


        this.left = false;
        this.right = false;
        this.jump = false;
        this.crawl = false;

        this.hitBomb = false;

        this.vOffset = 0;
        this.hOffset = 24;  // horizontal distance between the edge of the character model and the edge of the bounding box

        this.updateBB();

        //this.animations = [];
        this.anims = [];
        this.loadAnimations();

        this.animator = new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, false);
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {  // 4 states
            this.anims.push([]);
            for (var j = 0; j < 2; j++) {  // two directions
                this.anims[i].push([]);
            }
        }

        // idle look up -> state = 0
        this.anims[0][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 0, 648, 80, 64, 7, 0.2, false); // facing right

        this.anims[0][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 0, 648, 80, 64, 7, 0.2, true); // facing left

        // walking -> state = 1
        this.anims[1][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 8, 80, 64, 8, 0.1, false); // move right
        
        this.anims[1][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 8, 80, 64, 8, 0.1, true); // move leftddd
        
        // crawling -> state = 2
        this.anims[2][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 400, 88, 80, 64, 7, 0.1, false); // crawl right
        
        this.anims[2][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 400, 88, 80, 64, 7, 0.1, true); // crawl left

        // jumping -> state = 3
        this.anims[3][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 560, 328, 80, 64, 1, 0.1, false); // jump right

        this.anims[3][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 560, 328, 80, 64, 1, 0.1, true); // jump left


        
        
        // for (var state = 0; state <4; state++) {
        //     this.animations.push([]);
        // }

        // this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 8, 80, 64, 8, 0.1, false); // move right
        // this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 0, 80, 80, 8, 0.1, true); // move left
        // this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./fire-dino.png"), 0, 0, 64, 64, 1, .5, false); 
        // this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./fire-dino.png"), 0, 0, 64, 64, 1, .5, true);
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.state == 2) {
            this.BB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH) //32x32 hitbox
        } else { 
            this.BB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset, PARAMS.BLOCKWIDTH, 2*PARAMS.BLOCKWIDTH); //32x64 hitbox
        }
    };

    update() {

        const H_OFFSET = this.hOffset;
        //movement constants
        this.left = (this.game.keys["a"] || this.game.keys["ArrowLeft"]);
        this.right = (this.game.keys["d"] || this.game.keys["ArrowRight"]);
        this.jump = this.game.keys["w"] ||  this.game.keys[" "] || this.game.keys["ArrowUp"];
        this.crawl = this.game.keys["s"] ||  this.game.keys["ArrowDown"];

        const TICK = this.game.clockTick;

        const MIN_WALK = 25;
        const MAX_WALK = 500;
        const MAX_CRAWL = 25;

        const ACC_WALK = 250;
        const ACC_CRAWL = 37.5;
        const DEC_REL = 1000;
        const FALL_SPD = 1575;
        const WALK_FALL = 1000;

        const MAX_FALL = 1000;
        var maxJump = -2000;  // this can change with a powerup

        //I should also work on pixels / second for velocity.
        if(this.state != 3) {
            
            if (Math.abs(this.velocity.x) < MIN_WALK) {
                this.velocity.x = 0;
                //this.state = 0;
                if (this.left) {
                    this.velocity.x -= MIN_WALK;
                }
                if (this.right) {
                    this.velocity.x += MIN_WALK;
                }
            }

            else if (Math.abs(this.velocity.x) >= MIN_WALK) {
                if (this.facing == 0) {
                    if (this.right && !this.left) { // walking right
                        if (this.game.keys["s"]) {
                            this.velocity.x += ACC_CRAWL * TICK;
                        } else this.velocity.x += ACC_WALK * TICK; 
                    } else this.velocity.x -= DEC_REL * TICK;
                }
                if (this.facing == 1) {
                    if (this.left && !this.right) { // walking right
                        if (this.game.keys["s"]) {
                            this.velocity.x -= ACC_CRAWL * TICK;
                        } else this.velocity.x -= ACC_WALK * TICK;
                    } else this.velocity.x += DEC_REL * TICK;
                }
            }

            if (this.jump) {
                if (Math.abs(this.velocity.x) < 16) {  // shorter jump if standing still
                    this.velocity.y = -800;
                }
                else {
                    this.velocity.y = -900; 
                }
                this.fallAcc = FALL_SPD;
                this.doublejump = true;
                this.state = 3;
            }
        } else { //air physics

            //horizontal physics
            if (this.right && !this.left) {
                this.velocity.x += ACC_WALK * TICK;
            } else if (this.left && !this.right) {
                this.velocity.x -= ACC_WALK * TICK;
            } else {
                // do nothing
            }
        }
        this.velocity.y += this.fallAcc * TICK;
        //console.log("y velocity", this.velocity.y)

        //max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= maxJump) this.velocity.y = maxJump;

        if (this.velocity.x >= MAX_CRAWL && this.game.keys["s"]) this.velocity.x = MAX_CRAWL;
        if (this.velocity.x <= -MAX_CRAWL && this.game.keys["s"]) this.velocity.x = -MAX_CRAWL;
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;

        //update position 
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        
        //experimental wrap
        if(this.x <= -PARAMS.BLOCKWIDTH) this.x = PARAMS.CANVAS_WIDTH;
        if(this.x >= PARAMS.CANVAS_WIDTH + PARAMS.BLOCKWIDTH) this.x = -PARAMS.BLOCKWIDTH;
        
        
        this.updateBB();


        //updateBB then check for a collision
        var onPlatform = false;
        //collision detection
        var that = this; //that refers to JumpSprite object.
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(that.velocity.y >= 0) { //falling or walking
                    if((entity instanceof BasicPlatform) && (that.lastBB.bottom) <= entity.BB.top) {
                        that.y = entity.BB.top - 2*PARAMS.BLOCKWIDTH; // because JumpSprite is 2 blocks tall
                        that.velocity.y = 0;

                        if(that.state === 3) that.state = 0; // set state to idle
                        that.updateBB();
                    } else if((entity instanceof Spblock) && (entity.type === 'bomb')){                    

                        if (that.velocity.y < 0) {
                            that.velocity.y = 1000;
                        } else if (that.velocity.y > 0) {
                            that.velocity.y = -1150;
                        } else {
                            if (that.velocity.x < 0) {
                                that.velocity.x = 1000;
                            } else if (that.velocity.x > 0) {
                                that.velocity.x = -1000;
                            }
                        }
                        //that.velocity.y = -1500;
                        that.hitBomb = true;
                        that.health -= 25;
                    } 
                    else if ((entity instanceof BasicPlatform) // hit side
                        && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                        if (that.velocity.x < 0) that.x = entity.BB.right - H_OFFSET; // move out of collision
                        else if (that.velocity.x > 0) that.x = entity.BB.left - H_OFFSET - PARAMS.BLOCKWIDTH; // move out of collision
                        
                        that.velocity.x = 0;
                    }
                } else if (that.velocity.y < 0) { // jumping or walking 
                    if (entity instanceof BasicPlatform) {                   
                        if ((that.lastBB.top) >= entity.BB.bottom) { // hit ceiling
                            that.velocity.y = 0;
                            that.y = entity.BB.bottom;
                        } 
                        else if (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left)) { // hit side                   
                            if (that.velocity.x < 0) that.x = entity.BB.right - H_OFFSET; // move out of collision
                            else if (that.velocity.x > 0) that.x = entity.BB.left - H_OFFSET - PARAMS.BLOCKWIDTH; // move out of collision
                            that.velocity.x = 0;
                        }
                    } else if(entity instanceof Spblock && entity.type ==='bomb') {
                        if(that.lastBB.top <= entity.lastBB.bottom){
                            that.velocity.y = 1000;
                            that.velocity.x = that.velocity.x * -1; //switch x velocity away from block
                            that.hitBomb = true;
                            that.health -= 10;
                        } 
                    }
                }
                if((entity instanceof Portal) && (entity.type === 'start')) {
                    //launch to corresponding exit portal.
                    that.y = entity.linkY; //will spit me out at exit!
                    that.x = entity.linkX;
                    //that.onGround = false;
                }
            }
        });

        // update state
        if (this.state !== 3) {
            if (this.game.keys["s"]) this.state = 2;
            else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
            else this.state = 0;
        } else {

        }
        
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;
    };

    draw(ctx) {
        ctx.strokeStyle = "Green";
        
        this.anims[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y -this.game.camera.y, this.BB.width, this.BB.height);
        }

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

        // //accounting for scene manager.
        // if(this.facing === 0){ //if direction is right //must be a better way to trigger which animation I want to run// default animation?
        //     if(this.hitBomb === true) { //must be a simple way to implement this.
        //         this.animations[2].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        //         this.hitBomb = false;
        //     } else {
        //         this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        //     }
        // } else {
        //     if(this.hitBomb === true) { //must be a simple way to implement this.
        //         this.animations[3].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        //         this.hitBomb = false;
        //     } else {
        //         this.animations[1].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
        //         ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height);
        //     };

            
        // };
        
    };

};