class Platform {

    constructor(game, x, y, width) {
        this.game = game;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = 64;

        this.lastBB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

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
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./grass-platform.png"), 0, 0, this.width, this.height, 1, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./grass-platform.png"), 0, 0, this.width, this.height, 1, .5, false);
    };






};