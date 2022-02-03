class Platform {

    constructor(game, x, y, width) {
        this.game = game;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = 64;

        // this.lastBB = new BoundingBox(this.x, this.y, this.width, this.height);
         this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        //this.updateBB(); 

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, true);

        this.animator = new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, false);
    };


    update() {

        //movement constants
        //const TICK = this.game.clockTick;
        //this.updateBB();
        //currently I don't update BB and move position.
        //updateBB then check for a collision

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    draw(ctx) {
        //before change
        // ctx.strokeStyle = "Green";
        // ctx.strokeRect(this.BB.left, this.BB.top, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);

        // this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y);

        //accounting for scene manager
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y) //just needed to account for other objects!
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./grass-platform.png"), 0, 0, this.width, this.height, 1, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./grass-platform.png"), 0, 0, this.width, this.height, 1, .5, false);
    };

};

class BasicPlatform {
    constructor(game, x, y, width, height, levelHeight) {
        Object.assign(this, { game, x, width, height, levelHeight});

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./grass-platform.png");

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

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - y);
        this.endY = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - endY);

        this.startX = this.x;
        this.startY = this.y;

        this.velocity = {x: 0, y: 0};

        if (this.vertical) {
            this.velocity.y = 3;  // 3 blocks per second
        } else {
            this.velocity.x = 3;  // 3 blocks per second
        }

        this.spritesheet = ASSET_MANAGER.getAsset("./grass-platform.png");
        this.updateBB();
        
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
    };

    update() {
        if (this.inMotion) {
            if (this.vertical) {
                if ((this.startY < this.endY) && 
                ((this.y > this.endY) || (this.y < this.startY))) {
                    this.velocity.y = -this.velocity.y;
                } else if ((this.startY > this.endY) && 
                ((this.y < this.endY) || (this.y > this.startY))) {
                    this.velocity.y = -this.velocity.y;
                } 
            } else {
                if ((this.startX <= this.endX) && 
                ((this.x >= this.endX) || (this.x <= this.startX))) {
                    this.velocity.x = -this.velocity.x;
                } else if ((this.startX >= this.endX) && 
                ((this.x <= this.endX) || (this.x >= this.startX))) {
                    this.velocity.x = -this.velocity.x;
                } 
            }
            this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
            this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
            this.updateBB();

        }
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