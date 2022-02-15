class Pig{

    /*The pig is non player controlled entity that helps JumpSprite by firing an RPG. The pig is constantally falling
    and therefore is able to collide with the main type of platforms. The pig waits a few seconds then shoots an rpg.
    When finished the rpg should be able to destroy all entites withing a certain range. Blasts should also trigger a
    text bomb. The pig companion should be only used a limited amount of times becuase they are powerful. I'm also
    thinking of implementing some dialouge into the game. All dialouge will be in an array and anyone can modify it.  */

    constructor(game, x, y, facing) {
        Object.assign(this, { game, x, y, facing});
        
        //voice ideas -> communism my dear brother, some animals are more equal than others, Do not become a cog in the machine! 

        this.width = 64;
        this.height = 74;

        this.sheetX = 0;
        this.sheetY = 0;

        //entity status
        this.removeFromWorld = false;

        //pig is constantly falling.
        this.velocityY = .05;

        //these BB are in respect to pixels
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.widt, this.height);
        this.updateBB();

        this.animations = [];
        this.loadAnimations(); 

        //calculate the current frame of animation to line up rpg shot.
        this.frameDur = .3;
        this.amountFrames = 5; 
        this.totalTime = .3 * 5;
        this.currTime = 0;

        //start and end with an idle animation.
        this.startIdle = true;
        this.endIdle = false;

        //stops pig from firing more than 1 rpg on frame 5
        this.rocketSent = false;
    };
    


    update() {

        this.velocityY += .01 * this.game.clockTick;
        
        this.updateBB();

        this.currTime += this.game.clockTick;

        //Fire rocket on the fifth frame.
        if(Math.floor(this.currTime / this.frameDur) == 5 && !this.rocketSent && !this.startIdle && !this.endIdle) {
            this.game.addEntity(new RPG(this.game, this.x, this.y, this.facing));
            this.rocketSent = true;
            this.endIdle = true;
            this.currTime = 0 //reset time
        }

        // Start idle/falling for 10 seconds.
        if(Math.floor(this.currTime / this.frameDur) >= 10 && this.startIdle){
            this.currTime = 0; //reset time
            this.startIdle = false;
        }

        // End idle / wait 10 seconds after firing off a shot. 
        if(Math.floor(this.currTime / this.frameDur) >= 10 && this.endIdle){
            this.removeFromWorld = true;
        }

        // falling physics for pig entity.
        var that = this;
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB) && entity instanceof BasicPlatform ){
                that.velocityY = 0;
            }
            
        });
        this.y += this.velocityY;

        
        
    };

    updateBB() {
        this.lastBB = this.BB;
        //Yeah this might need some standardization.
        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height -10);

    };


    draw(ctx) {
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.BB.left, this.BB.top - this.game.camera.y, this.BB.width, this.BB.height); //strokeRect(x, y, width, height);
        if(this.startIdle || this.endIdle){
            if(this.facing === 'left'){
                this.animations[1].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y - 10);
            } else {
                ctx.save()
                ctx.scale(-1, 1);
                this.animations[1].drawFrame(this.game.clockTick, ctx, (-1) * this.x * PARAMS.BLOCKWIDTH - (PARAMS.BLOCKWIDTH * 2), this.y * PARAMS.BLOCKWIDTH - this.game.camera.y - 10);
                ctx.restore();
            }
        } else {
             if(this.facing === 'left'){
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y - 10);
            } else {
                ctx.save()
                ctx.scale(-1, 1);
                this.animations[0].drawFrame(this.game.clockTick, ctx, (-1) * this.x * PARAMS.BLOCKWIDTH - (PARAMS.BLOCKWIDTH * 2), this.y * PARAMS.BLOCKWIDTH - this.game.camera.y - 10);
                ctx.restore();
            }
        }
       
       
    };

    loadAnimations() { //might need animations for movement...

        for (var direction = 0; direction <2; direction++) {
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/bazooka-pig.png"), this.sheetX, this.sheetY, this.width, this.height, 6, .3, false); //shooting animation
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/bazooka-pig.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .3, false); //idle
    };

};

class RPG {

    //called by entities rather than scene manager
constructor(game, x, y, facing) {
    Object.assign(this, {game, x, y, facing});

    this.width = 64;
    this.height = 64

    this.sheetX = 0;
    this.sheetY = 0;

    this.determineD();
    //this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (LEVELPARAMS.ONE - y);
    this.alpha = 1.0
    //entity status
    this.removeFromWorld = false;

    this.onScreenTime = 100;

    this.animations = [];
    this.loadAnimations();

    this.rpgSpeed = 0.03;

    // What direction is the rpg moving 
    this.moveRight = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;

    this.determineD();

    this.currTime =  0;
    this.possibleTime = 30; //should be able to last until the end of the screen.

    this.padding = 15;

    this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.widt, this.height);


};

updateBB() { //minimize the size of rpg bouding box
    this.lastBB = this.BB;
    //Yeah this might need some standardization.
    this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH + this.padding, this.y * PARAMS.BLOCKWIDTH + this.padding, this.width - (2 * this.padding), this.height - (2 * this.padding));
};

determineD() {
    if(this.facing === 'right'){
        this.sheetX = 64;
        this.moveRight = true;
        this.moveUp = true;
    } else if(this.facing === 'left'){
        this.sheetX = 128;
        this.moveLeft = true;
        this.moveUp = true;
    } else {
        this.sheetX = 0;
        console.log("Error on rpg facing!")
    }
};


update() {

    if(this.facing === 'right'){
        this.x += this.rpgSpeed;
        this.y -= this.rpgSpeed;
    } else if(this.facing === 'left'){
        this.x -= this.rpgSpeed;
        this.y -= this.rpgSpeed;
    }

    this.currTime += this.game.clockTick;
    if(this.currTime > this.possibleTime){
        this.removeFromWorld = true;
    }
    

    this.updateBB();

    //collisions for rpg //not yet implemented.
    var that = this;
    this.game.entities.forEach(function (entity) {
        if(entity.BB && that.BB.collide(entity.BB) && entity instanceof BasicPlatform ){
            that.rpgSpeed = 0;
            that.game.addEntity(new TextBomb(that.game, that.x, that.y, "WOW!"));
            that.removeFromWorld = true;
        } else if(entity.BB && that.BB.collide(entity.BB) && entity instanceof JumpSprite){
            that.rpgSpeed = 0;
            that.game.addEntity(new TextBomb(that.game, that.x, that.y, "WOW!"));
            that.removeFromWorld = true;
            entity.health -= 75;
            if(that.moveRight){
                entity.velocity.x = 800;
            } else {
                entity.velocity.x = -800;
            }
            if(that.moveUp){
                entity.velocity.y = -800;
            } else {
                entity.velocity.y = 800;
            }
        }

        
    });

    //if(this.onScreenTime <= 0) this.removeFromWorld = true;

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

    this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./image/bazooka-rpg.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .3, false);
    this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./image/bazooka-rpg.png"), this.sheetX, this.sheetY, this.width, this.height, 1, .3, false);
};

};