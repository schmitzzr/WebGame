class Texteffect {

        //called by entities rather than scene manager
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

class TextBomb {
    constructor(game, x, y, message, onScreenTime = 100) {
        Object.assign(this, {game, x, y, message, onScreenTime});

        //this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (LEVELPARAMS.ONE - y);
        this.alpha = this.onScreenTime / 100;
        //entity status
        this.removeFromWorld = false;

        //this.onScreenTime = 100;

        this.tickAmount = 1;

    };


    update() {
        this.onScreenTime -= 1;
        this.alpha -= .01;

        for(var i = 0; i < this.tickAmount; i++) {
            var signX = ((Math.random() * 101 % 2) == 0) ? -1 : 1;
            var signY = ((Math.random() * 101 % 2) == 0) ? -1 : 1;
            var xMod = Math.random() * 3;
            var yMod = Math.random() * 3;
            this.game.addEntity(new Texteffect(this.game, (this.x) + (xMod * signX), (this.y) + (yMod * signY), this.message));
        }

        if(this.onScreenTime <= 0) {
            this.removeFromWorld = true;
        }
        

    };

    draw(ctx) {
    };

};