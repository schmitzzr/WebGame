class Bat{

    /*The bat is non player controlled entity that chases JumpSprite. It should follow a designated horizontal path length.
    The bat should not be able to go through platforms. The batch should be able to chase JumpSprite if within line of sight.
    The bat should have knock back. The bat colliding with JumpSprite should be handled in JumpSprite. The bat colliding with a wall
    should be handled by the Bat.*/

    //NOTE The bat class needs collision detection for platforms and such. The issue is that the bat can move in both a horizontal and vertical way.
    //How can collisions be done in this situation?
    constructor(game, x, y, sightLength, levelHeight, uniqueId) {
        Object.assign(this, { game, x, y, sightLength, levelHeight, uniqueId});
        //maybe create a block that reacts to current velocity and maybe changes its direction randomly.

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.width = 52;
        this.height = 35;

        this.sheetX = 0;
        this.sheetY = 0;

        this.moveSpeed = .015;

        //entity status
        this.removeFromWorld = false;

        //instead of a pathwidth I'm just going to have bats go horizontal until collision.

        //which direction that the bat is going
        this.movingLeft = false;
        this.movingRight = true;

        this.followHPath = true; //state of bat, true == following default horizontal path.

        //these BB are in respect to pixels
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.widt, this.height);
        this.updateBB();

        this.animations = [];
        this.loadAnimations(); // new Animator(ASSET_MANAGER.getAsset("./image/google.png"), 0, 0, 64, 64, 1, .5, true);
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

        if(euclidean <= this.sightLength){ //when following character, bat should only move in a way that it doesn't collide with plaforms!
            //check future, only move if future is viable. 
            this.followHPath = false;
            this.clearDirections();
            //check horizontal movement
            if(this.x <= (this.game.jumpsprite.x / PARAMS.BLOCKWIDTH)){
                var futureBB = this.testBB(.016, 0);
                if(!this.checkBB(futureBB)){ //test if I can actually go horizontal right, then move 
                    this.x += .015;
                    this.movingRight = true;
                } else {
                    //this.x -= .005;
                }   
            } else {
                var futureBB = this.testBB(-.016, 0);
                if(!this.checkBB(futureBB)){ //only move if it doesn't cause a collision.
                    this.x -= .015;
                    this.movingLeft = true;
                } else {
                    //this.x += .005;
                }
            }

            //check vertical movement
            if(this.y >= (this.game.jumpsprite.y / PARAMS.BLOCKWIDTH)){
                var futureBB = this.testBB(0, -.016);
                if(!this.checkBB(futureBB)){                    //test if I can actually go vertical up, then move else don't move
                    this.y -= .015;
                    this.movingUp = true;
                } else {
                    //this.y += .005;
                }
            } else {
                var futureBB = this.testBB(0, .016);
                if(!this.checkBB(futureBB)){ //test if I can actually go vertical down, then move else don't move
                    this.y += .015;
                    this.movingDown = true;
                } else {
                    //this.y -= .005;
                }         
            }

        } else { //bat's normal movement along horizontal path
            this.followHPath = true;
            if(this.movingRight){
                var futureBB = this.testBB(.016, 0);
                if(!this.checkBB(futureBB)){ //test if I can still go right.
                    this.clearDirections()
                    this.x += this.moveSpeed;
                    this.movingRight = true;
                } else {
                    this.clearDirections()
                    this.movingLeft = true;
                }
            } else if(this.movingLeft){
                var futureBB = this.testBB(-.016, 0);
                if(!this.checkBB(futureBB)){
                    this.x -= this.moveSpeed;
                    this.clearDirections()
                    this.movingLeft = true;
                } else {
                    this.clearDirections()
                    this.movingRight = true;
                }
            }
        }


        this.updateBB();

        var that = this;
        //collision detection
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)){
                if(entity instanceof JumpSprite){
                    var distance = Math.floor(that.lastBB.y - (entity.lastBB.y + entity.lastBB.height) ) ;
                    if(entity.velocity.y > 0 && (Math.abs(that.lastBB.y - (entity.lastBB.y+entity.lastBB.height) ) <= 4) ){ //if jump sprite is falling and the feet are within 4 pixels of bat top
                        //entity.x += 4;
                        entity.velocity.y = -400;
                        entity.y -= 4;

                        that.removeFromWorld = true; //jumping on the head of a bat will trigger a small jump and kill the bat

                        that.game.addEntity(new Texteffect(that.game, that.x, that.y, "POP!"));
                        //that.game.addEntity(new RPG(that.game, that.x, that.y, "left"));
                        //that.game.addEntity(new Pig(that.game, that.x, that.y ));
                    } //possibility for other collisions

                }
            }
        });
        
    };

    updateBB() {
        this.lastBB = this.BB;
        //Yeah this might need some standardization.
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);
    };

    testBB(modX, modY) {
        var currBB = this.BB;
        return new BoundingBox( (this.x+modX) * PARAMS.BLOCKWIDTH, (this.y+modY) * PARAMS.BLOCKWIDTH, this.width, this.height);
    };

    //checkBB has the ability to create a temporary bounding box to check if there is collision in the x or y direction.
    checkBB(possibleBB){
        var that = this;
        var futureBB = possibleBB;
        var isCollision = false;
        this.game.entities.forEach(function (entity) {
            if(entity instanceof BasicPlatform || (entity instanceof Bat && entity.uniqueId != that.uniqueId) || entity instanceof JumpSprite){
                var width = entity.BB.width;
                var height = entity.BB.height;
                var x = entity.BB.x;
                var y = entity.BB.y;

                var width2 = entity.BB.width;
                var height2 = entity.BB.height;
                var x2 = futureBB.x;
                var y2 = futureBB.y;

                if(futureBB.collide(entity.BB) && entity instanceof JumpSprite){
                    entity.health -= .1;
                }


                if(futureBB.collide(entity.BB)){
                    isCollision = true;
                }
            }
            
        });
        return isCollision;
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Green";
            ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        }

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y);
        
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/bat.png"), this.sheetX, this.sheetY, this.width, this.height, 2, .3, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/bat.png"), this.sheetX, this.sheetY, this.width, this.height, 2, .3, false);
    };

};