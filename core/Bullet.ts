class Bullet extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		var s:egret.Shape= new egret.Shape();
		var g:egret.Graphics = s.graphics;
		g.beginFill(0xffff00);
		g.drawRect(0, 0, 4, 4);
		g.endFill();
		this.addChild(s);
	}

	public speed:number;
	public ra:number;
}