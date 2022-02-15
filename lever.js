class Lever {

    constructor(game, x, y, levelHeight, up, linkUp = null, linkDown = null) {
        Object.assign(this, {game, x, up, linkUp, linkDown});

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - y);
        this.height = 64;
        this.width = 32;

        //entity status
        this.removeFromWorld = false;

        this.timeout = false;
        this.countdown = 0;

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);

        this.spritesheet = ASSET_MANAGER.getAsset("./image/lever_sheet.png");
    };


    update() {

        if (this.up) {
            if (this.linkUp instanceof MovingPlatform) this.linkUp.inMotion = true;
            if (this.linkDown instanceof MovingPlatform) this.linkDown.inMotion = false;
        } else {
            if (this.linkUp instanceof MovingPlatform) this.linkUp.inMotion = false;
            if (this.linkDown instanceof MovingPlatform) this.linkDown.inMotion = true;
        }

        if (this.countdown == 0) {
            this.timeout = false;
        } else {
            this.timeout = true;
            this.countdown -= 1;
        }

        var that = this; //that refers to MovingPlatform object.
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(entity.interact && !that.timeout) {
                    that.up = !that.up;
                    that.countdown = 50;
                }
            }
        });

    };

    draw(ctx) {
        
        if (this.up) {
            ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x * PARAMS.BLOCKWIDTH, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        } else {
            ctx.drawImage(this.spritesheet, 32, 0, this.width, this.height, this.x * PARAMS.BLOCKWIDTH, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

};