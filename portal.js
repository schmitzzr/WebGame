class Portal{

    //I need to know x, y, protal type, and if it's a starting protal, a pointer to the end portal. 
    constructor(game, x, y, levelHeight, type, link = null) { //I need to know the type of special block! All special blocks are 32 by 32 //I can pass default values in.
        //acceptable types are 'health', 'spike', 'flower', 'bomb'.
        Object.assign(this, { game, x, type, link});
        this.linkX; //a start portal needs to know the x and y of exit portal.
        this.linkY;

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (levelHeight - y);

        //where in canvas context
        this.width = 64;
        this.height = 64;

        //where in spritesheet
        this.sheetX = 0;
        this.sheetY = 0;

        this.determinePortal();

        this.updateBB();

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, true);

        this.animator = new Animator(ASSET_MANAGER.getAsset("./portal-sheet.png"), this.sheetX, this.sheetY, this.width, this.height, 3, .5, false);
    };

    determinePortal() {
        switch(this.type){
            case "start":
                this.sheetX = 0;
                this.linkX = this.link.x * PARAMS.BLOCKWIDTH;
                this.linkY = this.link.y * PARAMS.BLOCKWIDTH;
                break;
            case "exit":
                this.sheetX = 192;
                break;
            default: //default to exit -> doesn't go anywhere.
                this.sheetX = 192;
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

    loadAnimations() { //might need animations for movement... //not really

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        //one animation for both types of portals.
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./portal-sheet.png"), this.sheetX, this.sheetY, this.width, this.height, 3, .2, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./portal-sheet.png"), this.sheetX, this.sheetY, this.width, this.height, 3, .2, false);
    };






};