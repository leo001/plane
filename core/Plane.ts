class Plane extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		var s:egret.Shape= new egret.Shape();
		var g:egret.Graphics = s.graphics;
		g.beginFill(0x00cc00);
		g.drawRect(0, 0, 30, 30);
		g.endFill();
		this.addChild(s);
	}
}