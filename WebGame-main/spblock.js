class Spblock{

    constructor(game, x, y, type) { //I need to know the type of special block! All special blocks are 32 by 32
        //acceptable types are 'health', 'spike', 'flower', 'bomb'.
        this.game = game;
        //maybe create a block that reacts to current velocity and maybe changes it's direction randomly.

        this.type = type;
        this.x = x;
        this.y = y;

        this.width = 64;
        this.height = 64;

        this.sheetX = 0;
        this.sheetY = 0;
        this.determineBlock();

        this.lastBB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, true);

        this.animator = new Animator(ASSET_MANAGER.getAsset("./big-special.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
    };

        //I should create a specific bomb animation.
    determineBlock() {
        switch(this.type){
            case "flower":
                this.sheetX = 0;
                break;
            case "bomb":
                this.sheetX = 64;
                break;
            case "spike":
                this.sheetX = 128;
                break;
            case "health":
                this.sheetX = 192;
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
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    draw(ctx) {
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y);
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./big-special.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./big-special.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
    };






};