class Spikes{

    //I need a scenemanager variable to determine if I'm working with scenemanager or creating based on correct blocks. 
    constructor(game, x, y, facing, levelHeight, SceneManager) { //I need to know the type of special block! All special blocks are 32 by 32
        //acceptable types are 'health', 'spike', 'flower', 'bomb'.
        Object.assign(this, { game, x, facing, levelHeight });
        //maybe create a block that reacts to current velocity and maybe changes its direction randomly.

        //Thinking of implementing this for all entities, determines whether something is created in scene manager or not.
        this.y = (SceneManager) ? PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y) : y;

        this.width = 64;
        this.height = 64;

        this.sheetX = 0;
        this.sheetY = 0;
        this.determineBlock();

        //make bounding boxes smaller for spikes, only when clearly on spikes will you die from them.
        this.xPad = 10;
        this.yPad = 10;
        
        //entity status
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);
        this.updateBB();

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./image/google.png"), 0, 0, 64, 64, 1, .5, true);

    };

        //I should create a specific bomb animation.
    determineBlock() {
        switch(this.facing){
            case "up":
                this.sheetX = 0;
                break;
            case "left":
                this.sheetX = 64;
                break;
            case "right":
                this.sheetX = 128;
                break;
            case "down":
                this.sheetX = 192;
                break;
            default:
                this.sheetX = 0;
        };
    };


    update() {

        //movement constants
        //const TICK = this.game.clockTick;
        this.updateBB();
        //currently I don't update BB and move position.
        //updateBB then check for a collision

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);

       if(this.facing === "up") {
           this.BB =  new BoundingBox(this.x * PARAMS.BLOCKWIDTH + this.xPad, this.y * PARAMS.BLOCKWIDTH + this.yPad, this.width - (this.xPad * 2), this.height - (this.yPad * 2));
       } else if(this.facing === "down") {
            this.BB =  new BoundingBox(this.x * PARAMS.BLOCKWIDTH + this.xPad, this.y * PARAMS.BLOCKWIDTH, this.width -(2 * this.xPad), this.height - (2* this.yPad));
       } else if(this.facing === "left") {
            this.BB =  new BoundingBox(this.x * PARAMS.BLOCKWIDTH + this.xPad, this.y * PARAMS.BLOCKWIDTH + this.yPad, this.width - (2 * this.xPad), this.height - (2*this.yPad));
       } else if(this.facing === "right") {
            this.BB =  new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH + this.yPad, this.width - (2*this.xPad), this.height - (2 * this.yPad));
       } else {
           console.log("bounding box on spike error");
       }
       
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

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/spikes.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/spikes.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
    };

};

class SpikesCorpse{

    constructor(game, x, y, facing, levelHeight) { //I need to know the type of special block! All special blocks are 32 by 32
        //acceptable types are 'health', 'spike', 'flower', 'bomb'.
        Object.assign(this, { game, x, y, facing, levelHeight });
        //maybe create a block that reacts to current velocity and maybe changes its direction randomly.

        this.width = 64;
        this.height = 64;

        this.sheetX = 0;
        this.sheetY = 0;
        this.determineBlock();
        
        //entity status
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);
        this.updateBB();

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./image/google.png"), 0, 0, 64, 64, 1, .5, true);

    };

        //I should create a specific bomb animation.
    determineBlock() {
        switch(this.facing){
            case "up":
                this.sheetX = 0;
                break;
            case "left":
                this.sheetX = 192;
                break;
            case "right":
                this.sheetX = 128;
                break;
            case "down":
                this.sheetX = 256;
                break;
            default:
                this.sheetX = 0;
        };
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

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y);
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/spike-death.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/spike-death.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
    };

};