class CherryBlossom{

    //cherry blossom trees can be placed like any platform/spikes in the scene manager, placement in respect to bottom left corner.
    //while JumpSprite is within the cherry blossoms base bounding box he will be healed. 
    //This bounding box will be represented by a falling cherry blossom animation.
    constructor(game, x, y, levelHeight) {

        Object.assign(this, { game, x, y, levelHeight});
        //maybe create a block that reacts to current velocity and maybe changes its direction randomly.
        this.vertPad = 226
        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (LEVELPARAMS.ONE - y + (this.vertPad /  PARAMS.BLOCKWIDTH));

        this.width = 289;
        this.height = 290;

        this.sheetX = 0;
        this.sheetY = 0;
        
        //entity status
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH + this.vertPad/2, this.width, this.height - this.vertPad/2);
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
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH + this.vertPad/2, this.width, this.height - this.vertPad/2);
    };

    draw(ctx) {
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y);
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/cherry-blossom-three.png"), this.sheetX, this.sheetY, this.width, this.height, 5, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/cherry-blossom-three.png"), this.sheetX, this.sheetY, this.width, this.height, 5, .5, false);
    };

};