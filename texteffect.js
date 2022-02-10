class Texteffect {

    constructor(game, x, y, message) {
        Object.assign(this, {game, x, y, message});

        //this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (LEVELPARAMS.ONE - y);
        this.alpha = 1.0
        //entity status
        this.removeFromWorld = false;

        this.onScreenTime = 100;

    };


    update() {
        this.onScreenTime -= 1;
        this.alpha -= .01;

        if(this.onScreenTime <= 0) this.removeFromWorld = true;

    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        this.game;
        this.game.camera;
        ctx.font = "20px Georgia"
        ctx.fillStyle = "rgba(255, 0, 0, " + this.alpha +")";
        ctx.fillText(this.message, this.x * PARAMS.BITWIDTH, this.y * PARAMS.BITWIDTH - this.game.camera.y);
    };

};