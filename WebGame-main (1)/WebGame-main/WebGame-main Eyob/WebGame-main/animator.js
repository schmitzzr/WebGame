class Animator {
    constructor(spriteSheet, xStart, yStart, width, height, frameCount, frameDuration, reverse) { //loop
        Object.assign(this, {spriteSheet, xStart, yStart, width, height, frameCount, frameDuration, reverse});


        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
        this.scale = 1;
    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime; //makes it loop?
        const frame = this.currentFrame();

        if(this.reverse){ //if I should draw this in reverse.
            ctx.save();
            ctx.scale(-1, 1); //issue with flipping canvas...
            ctx.drawImage(this.spriteSheet,
                this.xStart + this.width*frame, this.yStart,
                this.width, this.height,
                -x-this.width*this.scale, y, 
                this.width*this.scale, this.height*this.scale)
            ctx.restore();
        } else {
            ctx.drawImage(this.spriteSheet, 
            this.xStart + this.width*frame, this.yStart, 
            this.width, this.height,
            x, y, 
            this.width*this.scale, this.height*this.scale);
        };
    };

        

    currentFrame() {
        return Math.floor(this.elapsedTime/ this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };


};