class JumpSprite {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.game.jumpsprite = this;

        //entity status
        this.removeFromWorld = false;
        this.health = 100; 
        this.dead = false;

        //JumpSprite's .x and .y are different from all of the other entities?
        this.blockX = this.x / PARAMS.BLOCKWIDTH; //.x with respect to blocks
        this.blockY = this.y / PARAMS.BLOCKWIDTH; //.y with respect to blocks 


        this.width = 2 * PARAMS.BLOCKWIDTH;
        this.height = 2 * PARAMS.BLOCKWIDTH;

        this.velocity = {x : 0, y : 0};

        this.fallAcc = 562.5;
        this.speed = 75;
        this.onGround = false; //default false;

        this.state = 0; 
        this.facing = 0; //0==right 1==left

        this.stayCrawling = false;

        this.left = false;
        this.right = false;
        this.jump = false;
        this.crawl = false;
        this.interact = false;

        this.hitBomb = false;

        this.vOffset = 0;
        this.hOffset = 24;  // horizontal distance between the edge of the character model and the edge of the bounding box

        this.updateBB();

        //this.animations = [];
        this.anims = [];
        this.loadAnimations();

        this.animator = new Animator(ASSET_MANAGER.getAsset("./image/google.png"), 0, 0, 64, 64, 1, .5, false);
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {  // 4 states
            this.anims.push([]);
            for (var j = 0; j < 2; j++) {  // two directions
                this.anims[i].push([]);
            }
        }

        // idle look up -> state = 0
        this.anims[0][0] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 0, 648, 80, 64, 7, 0.2, false); // facing right

        this.anims[0][1] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 0, 648, 80, 64, 7, 0.2, true); // facing left

        // walking -> state = 1
        this.anims[1][0] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 80, 8, 80, 64, 8, 0.1, false); // move right
        
        this.anims[1][1] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 80, 8, 80, 64, 8, 0.1, true); // move leftddd
        
        // crawling -> state = 2
        this.anims[2][0] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 400, 88, 80, 64, 7, 0.1, false); // crawl right
        
        this.anims[2][1] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 400, 88, 80, 64, 7, 0.1, true); // crawl left

        // jumping -> state = 3
        this.anims[3][0] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 560, 328, 80, 64, 1, 0.1, false); // jump right

        this.anims[3][1] = new Animator(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 560, 328, 80, 64, 1, 0.1, true); // jump left

        
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.state === 2) {
            this.BB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH) //32x32 hitbox
        } else { 
            this.BB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset, PARAMS.BLOCKWIDTH, 2*PARAMS.BLOCKWIDTH); //32x64 hitbox
        } 

        //this.standingBB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset, PARAMS.BLOCKWIDTH, 2*PARAMS.BLOCKWIDTH);

    };

    update() {

        const H_OFFSET = this.hOffset;
        //movement constants
        this.left = (this.game.keys["a"] || this.game.keys["A"] || this.game.keys["ArrowLeft"]);
        this.right = (this.game.keys["d"] || this.game.keys["D"] || this.game.keys["ArrowRight"]);
        this.jump = (this.game.keys["w"] ||  this.game.keys["W"] || this.game.keys[" "] || this.game.keys["ArrowUp"]);
        this.crawl = (this.game.keys["s"] || this.game.keys["S"] || this.game.keys["ArrowDown"]);
        this.interact = (this.game.keys["e"] || this.game.keys["E"]);

        //this.power1 = (this.game.keys["c"] || this.game.keys["C"]); //companion power up

        const TICK = this.game.clockTick;

        const MIN_WALK = 25;
        const MAX_WALK = 300;
        const MAX_CRAWL = 50;

        const ACC_WALK = 350;
        const ACC_CRAWL = 75;
        const DEC_REL = 1000;
        const FALL_SPD = 1575;
        const WALK_FALL = 1000;

        const MAX_FALL = 1000;
        var maxJump = -2000;  // this can change with a powerup

        //I should also work on pixels / second for velocity.
        if(this.state !== 3) {
            
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
                        if (this.crawl) {
                            this.velocity.x += ACC_CRAWL * TICK;
                        } else this.velocity.x += ACC_WALK * TICK; 
                    } else this.velocity.x -= DEC_REL * TICK;
                }
                if (this.facing == 1) {
                    if (this.left && !this.right) { // walking right
                        if (this.crawl) {
                            this.velocity.x -= ACC_CRAWL * TICK;
                        } else this.velocity.x -= ACC_WALK * TICK;
                    } else this.velocity.x += DEC_REL * TICK;
                }
            }

            if (this.jump && !this.stayCrawling) {
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

        if (this.velocity.x >= MAX_CRAWL && (this.crawl || this.stayCrawling)) this.velocity.x = MAX_CRAWL;
        if (this.velocity.x <= -MAX_CRAWL && (this.crawl || this.stayCrawling)) this.velocity.x = -MAX_CRAWL;
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;

        //update position 
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        
        //experimental wrap
        if(this.x <= -PARAMS.BLOCKWIDTH) this.x = PARAMS.CANVAS_WIDTH;
        if(this.x >= PARAMS.CANVAS_WIDTH + PARAMS.BLOCKWIDTH) this.x = -PARAMS.BLOCKWIDTH;
        
        //updateBB then check for a collision
        this.updateBB();

        //collision detection
        var that = this; //that refers to JumpSprite object.
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof MovingPlatform) && (that.lastBB.bottom) <= entity.BB.top + 5) { // +5 because for some reason this works
                    that.y = entity.BB.top - 2*PARAMS.BLOCKWIDTH; // because JumpSprite is 2 blocks tall
                    
                    that.velocity.y = entity.velocity.y * PARAMS.BLOCKWIDTH;
                    //if (!entity.vertical && that.state == 0) that.velocity.x = entity.velocity.x * PARAMS.BLOCKWIDTH;
                    
                    if(that.state === 3) that.state = 0; // set state to idle
                    that.updateBB();
                    
                }
                else if(that.velocity.y >= 0) { //falling or walking
                    if((entity instanceof BasicPlatform || entity instanceof WeakPlatform) && (that.lastBB.bottom) <= entity.BB.top) {
                        that.y = entity.BB.top - 2*PARAMS.BLOCKWIDTH; // because JumpSprite is 2 blocks tall
                        that.velocity.y = 0;

                        if (entity instanceof WeakPlatform) entity.state = 1;

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
                        that.game.addEntity(new TextBomb(entity.game, entity.x, entity.y, "BOOOM!"));
                        entity.removeFromWorld = true; //I also want to add a text explosion!
                        that.hitBomb = true;
                        that.health -= 25;
                    } 
                    else if ((entity instanceof BasicPlatform || (entity instanceof MovingPlatform) || entity instanceof WeakPlatform) // hit side
                        && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                        
                        if (that.velocity.x < 0) that.x = entity.BB.right - H_OFFSET; // move out of collision
                        else if (that.velocity.x > 0) that.x = entity.BB.left - H_OFFSET - PARAMS.BLOCKWIDTH; // move out of collision
                        
                        that.velocity.x = 0;
                    } else if(entity instanceof Bat){
                        // if(that.velocity.y > 0) {
                        //     that.velocity.y = -600;
                        // }

                        // that.velocity.x += 100;
                        // that.x += 10
                        // that.health -= 5;

                    }
                } else if (that.velocity.y < 0) { // jumping or walking 
                    if (entity instanceof BasicPlatform || entity instanceof MovingPlatform || entity instanceof WeakPlatform) {                   
                        if ((that.lastBB.top) >= entity.BB.bottom) { // hit ceiling
                            that.velocity.y = 0;
                            that.y = entity.BB.bottom;
                            if (entity instanceof MovingPlatform) {
                                entity.updateBB();
                            }
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
                    } else if(entity instanceof Bat){
                        if(that.lastBB.top <= entity.lastBB.bottom){
                            // that.velocity.y = 600;
                            // that.velocity.x = that.velocity.x * -1.4 + 100;
                            // that.x += 10
                            // that.health -= 5;
                        }
                    }
                }
                if((entity instanceof Portal) && (entity.type === 'start')) {
                    //launch to corresponding exit portal.
                    that.y = entity.linkY; //will spit me out at exit!
                    that.x = entity.linkX;
                    //that.onGround = false;
                }
                if((entity instanceof Spikes)){ //insta death spikes
                    if(entity.facing === "right"){
                        if(that.velocity.x < 0 && (Math.abs((entity.lastBB.x+entity.lastBB.width) - that.lastBB.x ) <= 4 && !that.dead) ){ //if jump sprite is falling and the feet are within 4 pixels of bat top
                            //in case spikes shouldn't be deadly? 
                            //that.x += 6;
                            //that.velocity.x += 500;
                            that.dead = true;
                            that.health = 0;
                            that.game.camera.gameOver = true;
                            entity.removeFromWorld = true;
                            that.removeFromWorld = true;
                            that.game.addEntity(new SpikesCorpse(entity.game, entity.x, entity.y, "right", LEVELPARAMS.ONE));
                            that.game.addEntity(new Spikes(entity.game, entity.x, entity.y, "right", LEVELPARAMS.ONE), false);
                            //this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);
                        }
                    } else if(entity.facing === 'left'){
                        if(that.velocity.x > 0 && (Math.abs((entity.lastBB.x) - (that.lastBB.x + that.lastBB.width) <= 4)) && !that.dead){
                            that.dead = true;
                            that.health = 0;
                            that.game.camera.gameOver = true;
                            entity.removeFromWorld = true;
                            that.removeFromWorld = true;
                            that.game.addEntity(new SpikesCorpse(entity.game, entity.x, entity.y, "left", LEVELPARAMS.ONE));
                            that.game.addEntity(new Spikes(entity.game, entity.x, entity.y, "left", LEVELPARAMS.ONE), false);
                        }
                    } else if(entity.facing === 'up') {
                        if(that.velocity.y > 0 && (Math.abs((entity.lastBB.y) - (that.lastBB.y + that.lastBB.height) <= 4)) && !that.dead){
                            that.dead = true;
                            that.health = 0;
                            that.game.camera.gameOver = true;
                            entity.removeFromWorld = true;
                            that.removeFromWorld = true;
                            that.game.addEntity(new SpikesCorpse(entity.game, entity.x, entity.y, "up", LEVELPARAMS.ONE));
                            that.game.addEntity(new Spikes(entity.game, entity.x, entity.y, "up", LEVELPARAMS.ONE), false);
                        }
                    } else if(entity.facing === 'down'){
                        if(that.velocity.y < 0 && (Math.abs((entity.lastBB.y + entity.lastBB.height) - (that.lastBB.y) <= 4)) && !that.dead){
                            that.dead = true;
                            that.health = 0;
                            that.game.camera.gameOver = true;
                            entity.removeFromWorld = true;
                            that.removeFromWorld = true;
                            that.game.addEntity(new SpikesCorpse(entity.game, entity.x, entity.y, "down", LEVELPARAMS.ONE));
                            that.game.addEntity(new Spikes(entity.game, entity.x, entity.y, "down", LEVELPARAMS.ONE), false);
                        }

                    }
                    
                    
                }
                if(entity instanceof CherryBlossom){
                    that.health += .1;
                }
                if(entity instanceof Door){
                    if(that.interact){
                        entity.openDoor = true;
                        that.game.actionTwo = false;
                    }
                }
            }
        });

        if (!this.crawl && this.state === 2) {
            this.state = 1;
            this.updateBB();
            this.stayCrawling = false;

            this.game.entities.forEach(function (entity) {
                if ((entity instanceof MovingPlatform || entity instanceof BasicPlatform || entity instanceof WeakPlatform)
                    && (entity.BB && that.BB.collide(entity.BB))) {
                    that.state = 2;
                    that.stayCrawling = true;
                } 
            });
        } 

        

        // update state
        if (this.state !== 3) {
            if (this.crawl || this.stayCrawling) this.state = 2;
            else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
            else this.state = 0;
        } else {

        }

        if(this.state !== 3) {
            if(this.game.actionOne){
                //JumpSprite is in pixels and not with respect to BLOCKWIDTH
                var trueX = this.x / PARAMS.BLOCKWIDTH;
                var trueY = this.y / PARAMS.BLOCKWIDTH;

                // Placement of Pig Entity
                if(trueX < 15){ //(I should also check if immediate next blocks are not empty)
                    if(this.facing == 0){
                        this.game.addEntity(new Pig(this.game, trueX+ 1, trueY, "right")); //put pig either one block to the left or right
                    } else {
                        this.game.addEntity(new Pig(this.game, trueX+ 1, trueY, "left")); //put pig either one block to the left or right
                    } 
                } else { //(I should also check if immediate next blocks are not empty)
                    if(this.facing == 0){
                        this.game.addEntity(new Pig(this.game, trueX - 1, trueY, "right"));
                    } else {
                        this.game.addEntity(new Pig(this.game, trueX - 1, trueY, "left"));
                    }
                    
                }
                this.game.actionOne = false;
            }
        }


        if(this.health > 100) this.health = 100;
        if(this.health < 0) this.health = 0;
        if(this.health == 0){
            this.game.camera.gameOver = true;
            this.removeFromWorld = true;
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
        
    };

};