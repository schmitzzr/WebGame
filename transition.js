class TransitionScreen {
    constructor(game, level, gameOver) {
        Object.assign(this, { game, level, gameOver });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.elapsed > 2) this.game.camera.loadLevel(this.level, this.x, this.y, false, this.gameOver);
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.textAlign = "center";

        ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
        ctx.fillStyle = "White";

        
        if (this.gameOver) {
            ctx.fillText("GAME OVER", 16 * PARAMS.BLOCKWIDTH, 16 * PARAMS.BLOCKWIDTH);
        } else {
            ctx.fillText("LEVEL " + this.level, 16* PARAMS.BLOCKWIDTH, 10* PARAMS.BLOCKWIDTH);
            ctx.fillText(this.game.camera.levelLabel, 16 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
            ctx.drawImage(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 0, 880, 80, 80, 14 * PARAMS.BLOCKWIDTH, 14 * PARAMS.BLOCKWIDTH, 4*PARAMS.BLOCKWIDTH, 4*PARAMS.BLOCKWIDTH);
        }
    };
};