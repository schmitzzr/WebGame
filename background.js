class ControlsSheet {

    constructor(game, x, y, scale, levelHeight, portion = null) {
        Object.assign(this, { game, x, scale, levelHeight, portion});

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./image/control-sheet.png");

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
