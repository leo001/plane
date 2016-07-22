class Bullet extends egret.DisplayObjectContainer {


	public constructor() {
		super();



		var tex = RES.getRes('feibiao_03_png');
		var img = new egret.Bitmap(tex);
		img.x = -Math.floor(img.width * .5);
		img.y = -Math.floor(img.height * .5);
		this.addChild(img);

		if (DebugParam.isShowCollisionArea) {
			var hitArea: egret.Shape = new egret.Shape();
			var g: egret.Graphics = hitArea.graphics;
			g.beginFill(0xffff00, .9);
			g.drawCircle(0, 0, 15);
			g.endFill();
			this.addChild(hitArea);
		}
		this.rotation = Rand.rand(0, 90);
		this.speed = Rand.rand(4, 6);
	}

	public speed: number;
	public ra: number;
}