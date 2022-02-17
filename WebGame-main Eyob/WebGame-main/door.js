class Door{

    constructor(game, x, y, levelHeight) { 
        
        Object.assign(this, { game, x, y, levelHeight});

        this.vertPad = 186;
        //this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (LEVELPARAMS.ONE - y);
        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (LEVELPARAMS.ONE - y + (this.vertPad /  PARAMS.BLOCKWIDTH));

        this.width = 186.55;
        this.height = 234;

        this.sheetX = 0;
        this.sheetY = 0;

        //should the door be playing it's opening animation
        this.openDoor = false;
        
        //entity status
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);
        this.updateBB();

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./image/google.png"), 0, 0, 64, 64, 1, .5, true);

        //this.animator = new Animator(ASSET_MANAGER.getAsset("./image/big-special.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
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
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);
    };

    draw(ctx) {
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        if(this.openDoor) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y);
        } else  {
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y);
        }
        
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/door.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .3, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/door.png"), this.sheetX, this.sheetY, this.width, this.height, 6, .3, false);
    };

};