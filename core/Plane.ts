class Plane extends egret.DisplayObjectContainer {
	private mc: egret.MovieClip;
	public dir: number;

	private flower: egret.Bitmap;

	public static LEFT: number = -1;
	public static RIGHT: number = 1;
	public constructor() {
		super();

		this.dir = Plane.LEFT;

		this.mc = McManager.inst.getCharacter('renzhe');
		this.mc.addEventListener(egret.Event.COMPLETE, this.finishAnimation, this);
		this.addChild(this.mc);

		this.flower = new egret.Bitmap(RES.getRes('hua_png'));
		this.flower.x = 5;
		this.flower.y = -15;
		this.addChild(this.flower);


		if (DebugParam.isShowCollisionArea) {
			var hitArea = new egret.Shape();
			var g = hitArea.graphics;
			g.beginFill(0, 0.9);
			g.drawCircle(0, 0, 25);
			g.endFill();
			this.addChild(hitArea);
		}
	}

	public updateFlower(): void {
		if (Plane.RIGHT == this.dir) {
			this.flower.visible = false;
		} else {
			this.flower.visible = true;
		}
	}

	public run(): void {
		this.mc.gotoAndPlay('run', -1);
	}

	public stand(): void {
		this.mc.gotoAndStop(1);
	}

	public born(): void {
		this.flower.visible = false;
		this.mc.x = -40;
		this.mc.y = -40;
		this.mc.gotoAndPlay('born', 1);
		this.mc.addEventListener(egret.Event.COMPLETE, this.finishAnimation, this);
	}

	private finishAnimation(e: egret.Event): void {
		this.updateFlower();
		this.mc.x = this.mc.y = 0;
		this.stand();
		this.dispatchEventWith(MyEvent.START_ANIMATION_END);
	}
}