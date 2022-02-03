class Bat{

    /*The bat is non player controlled entity that chases JumpSprite. It should follow a designated horizontal path length.
    The bat should not be able to go through platforms. The batch should be able to chase JumpSprite if within line of sight.
    The bat should have knock back. The bat colliding with JumpSprite should be handled in JumpSprite. The bat colliding with a wall
    should be handled by the Bat.*/

    //NOTE The bat class needs collision detection for platforms and such. The issue is that the bat can move in both a horizontal and vertical way.
    //How can collisions be done in this situation?
    constructor(game, x, y, pathwidth, sightLength, levelHeight) {
        Object.assign(this, { game, x, y, pathwidth, sightLength, levelHeight});
        //maybe create a block that reacts to current velocity and maybe changes its direction randomly.

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);
        this.width = 64;
        this.height = 52;

        this.sheetX = 0;
        this.sheetY = 0;

        this.moveSpeed = .015;

        this.startPoint = x;
        this.endPoint = x+sightLength;

        //I should always know which direction that the bat is going
        this.movingLeft = false;
        this.movingRight = true;
        this.movingUp = false;
        this.movingDown = false; 

        this.vertCollision = false; //if moving y position causes a collision
        this.horiCollision = false; // if moving x causes a collision

        this.offT = 14;
        this.offL = 6;
        this.offR = 12;
        this.offB = 8; 
        //top offset -> 14
        //left offset -> 6
        //right offset -> 12
        //bottom offset -> 8
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH+6, this.y * PARAMS.BLOCKWIDTH + 14, this.width-18, this.height-30);
        this.updateBB();

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./google.png"), 0, 0, 64, 64, 1, .5, true);

        this.animator = new Animator(ASSET_MANAGER.getAsset("./bat.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .5, false);
    };

    checkForMain(){
        var mainX = this.game.jumpsprite.x / PARAMS.BLOCKWIDTH; //jumpSprites x and y are odd!
        var mainY = this.game.jumpsprite.y / PARAMS.BLOCKWIDTH;
        var distX = Math.abs(mainX - this.x);
        var distY = Math.abs(mainY - this.y);
        var euclidean = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)); 

        return euclidean;
    };

    clearDirections(){
        this.movingRight = false;
        this.movingLeft = false;
        this.movingUp = false;
        this.movingDown = false;
    };

    update() {
        var euclidean = this.checkForMain()

        if(euclidean <= this.sightLength){ //if Bat has identified the main character in sight //should follow
            this.clearDirections()
            if(this.x <= (this.game.jumpsprite.x / PARAMS.BLOCKWIDTH)){
                this.x += .015;
                this.movingRight = true;
            } else {
                this.x -= .015;
                this.movingLeft = true;
            }

            //if(this.checkBB()) this.horiCollision = true;

            if(this.y >= (this.game.jumpsprite.y / PARAMS.BLOCKWIDTH)){
                this.y -= .015;
                this.movingUp = true;
            } else {
                this.y += .015;
                this.movingDown = true;
            }

            //if(this.checkBB() && this.horiCollision == false) this.vertCollision = true;

        } else { //bat's normal movement along horizontal path
            if(this.movingRight){
                this.clearDirections();
                if(this.x <= this.endPoint){
                    this.x +=this.moveSpeed;
                    this.movingRight = true;;
                } else {
                    this.movingLeft = true;
                }
            } else if(this.movingLeft){
                this.clearDirections();
                if(this.x >= this.startPoint){
                    this.x -=this.moveSpeed;
                    this.movingLeft = true;
                } else {
                    this.movingRight = true;
                }
            }



        }


        this.updateBB();

        // issue with collisions...
        // collisions for bat.

        // var that = this; //that refers to bat object.
        // this.game.entities.forEach(function (entity) {
        //     if(entity.BB && that.BB.collide(entity.BB)){
        //         if(entity instanceof BasicPlatform){
        //             if(that.lastBB.right > entity.BB.left){
        //                 that.x = entity.BB.left - that.width;
        //             }

        //             if(that.lastBB.left < entity.BB.right){
        //                 that.x = entity.BB.right + that.width;
        //             }

        //             if(that.lastBB.top < entity.BB.bottom){
        //                 that.y = entity.BB.bottom + that.height;
        //             }

        //             if(that.lastBB.bottom > entity.BB.top){
        //                 var currY = that.y;
        //                 that.y = (entity.BB.top - that.height) / PARAMS.BLOCKWIDTH;
        //             }
        //         }
        //     }
               
        // });
        
    };

    updateBB() {
        this.lastBB = this.BB;
        //Yeah this might need some standardization.
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH+6, this.y * PARAMS.BLOCKWIDTH + 14, this.width-18, this.height-30);
    };

    //checkBB has the ability to create a temporary bounding box to check if there is collision in the x or y direction.
    checkBB(){
        var tempBB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH+6, this.y * PARAMS.BLOCKWIDTH + 14, this.width-18, this.height-30);
        var isCollision = false;
        this.game.entities.forEach(function (entity) {
            if(tempBB && that.BB.collide(entity.BB)){
                isCollision = true;
            }
        });
        return isCollision;
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

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./bat.png"), this.sheetX, this.sheetY, this.width, this.height, 2, .3, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./bat.png"), this.sheetX, this.sheetY, this.width, this.height, 2, .3, false);
    };

};