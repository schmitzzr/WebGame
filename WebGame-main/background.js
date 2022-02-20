class ControlsSheet {

    constructor(game, x, y, scale, levelHeight, muted = false, portion = null) {
        Object.assign(this, { game, x, scale, levelHeight, muted, portion});

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        
        if (this.muted) {
            this.spritesheet = ASSET_MANAGER.getAsset("./image/control-sheet-muted.png");
        } else  { this.spritesheet = ASSET_MANAGER.getAsset("./image/control-sheet.png"); }

        this.width = 1024 * scale;
        this.height = 768 * scale;

    };

    update() {
    };

    draw(ctx) {
        switch (this.portion) {
            case "movement":
                break;
            case "jump":
                ctx.drawImage(this.spritesheet, 170, 430, 850, 710, this.x * PARAMS.BLOCKWIDTH, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y, this.width, this.height);
                break;
            case "crawl":
                break;
            case "interact":
                break;
            default:
                ctx.drawImage(this.spritesheet, 0,0, 1024, 768, this.x * PARAMS.BLOCKWIDTH, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y, this.width, this.height);   
        }
    };
};

//backgrounds should be standardized to 1024 pixel width
//height of picture should be 640 pixels more than the level height
class Background {
    constructor(game, image, width, height, levelHeight) {
        Object.assign(this, {game, width, height, levelHeight});
        
        this.spritesheet = ASSET_MANAGER.getAsset(image);
        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - this.levelHeight;

        this.canvasWidth = this.levelHeight * PARAMS.BLOCKWIDTH * this.width / this.height;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, 0, (this.y - 20)* PARAMS.BLOCKWIDTH - this.game.camera.y, this.width, this.height);
    };
}
