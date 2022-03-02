class BasicPlatform {
    constructor(game, x, y, width, height, levelHeight) {
        Object.assign(this, { game, x, width, height, levelHeight});

        //entity status
        this.removeFromWorld = false;

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./image/grass-platform.png");

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
    };

    update() {
    };

    draw(ctx) {

        let wBrickCount = this.width;
        let hBrickCount = this.height;
        for (var i = 0; i < wBrickCount; i++) {
            for (var j = 0; j < hBrickCount; j++) {
                ctx.drawImage(this.spritesheet, 0,0, 64, 64, (this.x + i) * PARAMS.BLOCKWIDTH, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    };
};

class MovingPlatform {
    constructor(game, x, y, endX, endY, width, height, inMotion, vertical, levelHeight) {
        Object.assign(this, { game, x, endX, width, height, inMotion, vertical});

        //entity status
        this.removeFromWorld = false;

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - y);
        this.endY = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - endY);

        // initialize lower and upper bounds of movement -- startX should always be lower than endX, etc.
        if (this.x < this.endX) {
            this.startX = this.x;
        } else {
            this.startX = this.endX;
            this.endX = this.x;
        }

        if (this.y < this.endY) {
            this.startY = this.y;
        } else {
            this.startY = this.endY;
            this.endY = this.y;
        }

        this.velocity = {x: 0, y: 0};

        if (this.vertical) {
            this.velocity.y = 3;  // 3 blocks per second
        } else {
            this.velocity.x = 3;  // 3 blocks per second
        }

        this.spritesheet = ASSET_MANAGER.getAsset("./image/move-platform.png");
        this.updateBB();
        
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
    };

    update() {
        // moves back and forth between starting and ending locations
        if (this.inMotion) {  
            if (this.vertical) {
                if (this.y > this.endY) {
                    this.velocity.y = -3;
                } else if (this.y < this.startY) {
                    this.velocity.y = 3;
                } 
            } else {
                if (this.x > this.endX) {
                    this.velocity.x = -3;
                } else if (this.x < this.startX) {
                    this.velocity.x = 3;
                } 
            }
            this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
            this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
            this.updateBB();

        }

        //collisions

        var that = this; //that refers to MovingPlatform object.
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if (that.vertical && that.velocity.y > 0) {
                    if((entity instanceof JumpSprite) && (that.lastBB.bottom) >= entity.BB.top) { // player hits ceiling
                        that.y -= 5 / PARAMS.BLOCKWIDTH; // bumps it up a slight bit to prevent collisions
                        that.velocity.y = -that.velocity.y;  //reverse direction
                        entity.velocity.y = 0;
                        that.updateBB();
                    } 
                } else if (that.vertical) {
                    if((entity instanceof JumpSprite) && (that.lastBB.bottom) >= entity.BB.top) { // player hits ceiling
                        entity.velocity.y = 0;
                        that.updateBB();
                    } 
                }

                if (!that.vertical && that.inMotion) {               
                    if (entity instanceof JumpSprite && (that.lastBB.left) <= entity.BB.right) { // hits left side
                        that.x += 2 / PARAMS.BLOCKWIDTH; 
                        that.velocity.x = 3;
                    } else if (entity instanceof JumpSprite && (that.lastBB.right) >= entity.BB.left) { // player hits right side
                        that.x -= 2 / PARAMS.BLOCKWIDTH;
                        that.velocity.x = -3;
                    }
                    that.updateBB();
                }
            }
        });
    };

    draw(ctx) {

        let wBrickCount = this.width;
        let hBrickCount = this.height;

        for (var i = 0; i < wBrickCount; i++) {
            for (var j = 0; j < hBrickCount; j++) {
                ctx.drawImage(this.spritesheet, 0,0, 64, 64, (this.x + i) * PARAMS.BLOCKWIDTH, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    };
};

class WeakPlatform {
    constructor(game, x, y, width, height, levelHeight, duration = 1.5) {
        Object.assign(this, { game, x, width, height, levelHeight});

        //entity status
        this.removeFromWorld = false;

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - y);

        this.state = 0; //0 for intact, 1 for cracking, 2 for breaking

        this.breaking = false;

        this.countdown = duration;
        this.breakpoint = duration / 2;

        // initialize lower and upper bounds of movement -- startX should always be lower than endX, etc.

        this.spritesheet = ASSET_MANAGER.getAsset("./image/weak-platform.png");
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
        
    };

    update() {
        if (this.breaking) {
            this.countdown -= this.game.clockTick;
            if (this.countdown <= this.breakpoint) this.state = 2;
            else this.state = 1;
        }

        if (this.countdown <= 0) {
            this.game.addEntity(new TextBomb(this.game, this.x, this.y, "BREAK!", 10)); // possibly removed
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {

        let wBrickCount = this.width;
        let hBrickCount = this.height;

        for (var i = 0; i < wBrickCount; i++) {
            for (var j = 0; j < hBrickCount; j++) {
                if (this.state === 2)    
                    ctx.drawImage(this.spritesheet, 64, 0, 32, 32, (this.x + i) * PARAMS.BLOCKWIDTH, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
                else if (this.state === 1)
                    ctx.drawImage(this.spritesheet, 32, 0, 32, 32, (this.x + i) * PARAMS.BLOCKWIDTH, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
                else if (this.state === 0)
                    ctx.drawImage(this.spritesheet, 0, 0, 32, 32, (this.x + i) * PARAMS.BLOCKWIDTH, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    };
};
