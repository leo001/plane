/**
 * MovieClip工厂类
 */
class MCFactory implements IMCFactory{
	public constructor() {

	}

	public getMC(name: string, action:string): egret.MovieClip {
		if ("" == name) {
			egret.log('name为空');
			return;
		}
		var mc: egret.MovieClip;

		var texture: any;
		var config: any;

		
		texture = RES.getRes(name + '_png');
		config = RES.getRes(name + '_json');
		if (null == texture || null == config) {
			egret.log('texture or config为空', texture, config);
			return;
		}

		var factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(config, texture);
		mc = new egret.MovieClip(factory.generateMovieClipData(action));

		return mc;
	}


}
