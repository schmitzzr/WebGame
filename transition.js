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

class WinningScreen {
    constructor(game, times, coins, deaths) {
        Object.assign(this, { game, times, coins, deaths });

        this.totalTime = this.times.levelOne + this.times.levelTwo + this.times.levelThree;

        this.score = Math.floor(this.totalTime * 100 + this.coins * 2500 - this.deaths * 2000);

        this.scoreboard = false;
    };

    update() {
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.textAlign = "center";
        
        ctx.font = PARAMS.BLOCKWIDTH * 1.5 + 'px "Press Start 2P"';
        ctx.fillStyle = "White";

        ctx.fillText("YOU WON!", 16* PARAMS.BLOCKWIDTH, 8 * PARAMS.BLOCKWIDTH);

        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';

        ctx.fillText("TIME REMAINING", 16* PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);
        ctx.fillText("LEVEL 1 - " + this.timerCalc(this.times.levelOne), 16* PARAMS.BLOCKWIDTH, 11 * PARAMS.BLOCKWIDTH);
        ctx.fillText("LEVEL 2 - " + this.timerCalc(this.times.levelTwo), 16* PARAMS.BLOCKWIDTH, 12 * PARAMS.BLOCKWIDTH);
        ctx.fillText("LEVEL 3 - " + this.timerCalc(this.times.levelThree), 16* PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
        ctx.fillText("TOTAL - " + this.timerCalc(this.totalTime), 16* PARAMS.BLOCKWIDTH, 14 * PARAMS.BLOCKWIDTH);

        ctx.fillText("COINS - " + this.coins, 16* PARAMS.BLOCKWIDTH, 16 * PARAMS.BLOCKWIDTH);

        ctx.fillText("DEATHS - " + this.deaths, 16* PARAMS.BLOCKWIDTH, 17 * PARAMS.BLOCKWIDTH);

        ctx.fillText("FINAL SCORE: " + this.score, 16* PARAMS.BLOCKWIDTH, 19 * PARAMS.BLOCKWIDTH);
    };

    timerCalc(seconds) {
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        
        return minutes + ":" + seconds;
    };
};