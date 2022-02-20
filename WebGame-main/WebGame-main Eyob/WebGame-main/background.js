class lantern_w_o {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class lantern_w {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class no_trees_w_o {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class no_trees_w {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class trees_and_gate {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class trees_w_o {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class trees_w {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,0,1700,1000);
	};
};

class Barrel{
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,this.y,64,64);
	};
};

class LanternPost{
	constructor(game, x, y) {
		Object.assign(this, { game, x, y});
		
		this.spritesheet = ASSET_MANAGER.getAsset("./image/forest.jpg");
	};
	
	update() {
		
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet,this.x-this.game.camera.x-400,this.y,64,256);
	};
};