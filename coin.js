class Coin {
    constructor(game, x, y, levelHeight ) {
        Object.assign(this, { game, x, levelHeight});

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./image/coin.png");

        this.animation = new Animator(this.spritesheet, 0, 0, 64, 64, 6, 0.1, false);

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, 64, 64);
    };

    update() {

    };

    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y);

    };
};