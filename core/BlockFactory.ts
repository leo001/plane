class BlockFactory {
	
	public static getBlock():egret.Shape{
		var s = new egret.Shape();		
		var g:egret.Graphics = s.graphics;
		g.beginFill(0, DebugParam.blockAlpha);
		g.drawRect(0, 0, Lyrs.inst.W, Lyrs.inst.H);
		g.endFill();

		return s;
	}
}