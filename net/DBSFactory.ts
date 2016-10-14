/**
 * dragonBones管理类
 */
class DBSFactory implements IDBSFactory {
	

	public constructor() {
		this.factory = new dragonBones.EgretFactory();
		this.clocks = [];
		this.clocks[DBSFactory.CLOCK_NORMAL] = new dragonBones.WorldClock();

		this.start();
	}
	private factory: dragonBones.EgretFactory;
	public clocks: dragonBones.WorldClock[];

	public static CLOCK_NORMAL: number = 0;
	public start(): void {
		egret.Ticker.getInstance().register(this.onEnterFrame, this);
	}

	public stop(): void {
		egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
	}

	private onEnterFrame(frameTime: number): void {
		for (var i: number = 0, len = this.clocks.length; i < len; i++) {
            var clock: dragonBones.WorldClock = this.clocks[i];
            clock.advanceTime(frameTime * .001);
        }
	}
	//=================================================================================================
	/**
	 * @armatureName 骨架名
	 * @armatureTexName 纹理名
	 */
	public addData(armatureName: string, armatureTexName: string): void {
		var dragonData = RES.getRes(armatureName + '_json');//Dragon_json
        var textureData = RES.getRes(armatureTexName + '_json');//texture_json
        var texture = RES.getRes(armatureTexName + '_png');//texture_png
		if(null == dragonData || null == textureData || null == texture){
			egret.log("[ERROR]:加入新骨骼失败", armatureName, armatureTexName);
			return;
		}
        this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonData));
        this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
	}

	//=================================================================================================
	/**
	 * 获得Armature
	 */
	public getArmature(ArmatureName: string, clockName: number = 0): DBArmature {

		var a: dragonBones.Armature = this.factory.buildArmature(ArmatureName);
		var re: DBArmature = new DBArmature(a, this.clocks[DBSFactory.CLOCK_NORMAL]);

		return re;
	}


	// public getArmature(name: string): dragonBones.Armature {
	// 	var armature: dragonBones.Armature;

	// 	var list: dragonBones.Armature[] = this.armatureMap[name];
	// 	if (list) {
	// 		if (list.length > 0) {
	// 			armature = list.pop();
	// 		} else {
	// 			armature = this.factory.buildArmature(name);
	// 		}
	// 	} else {
	// 		this.armatureMap[name] = [];
	// 		armature = this.factory.buildArmature(name);
	// 	}


	// 	return armature;
	// }
	/**
	 * 移除Armature
	 */
	// public recycleArmature(name, armature: dragonBones.Armature): void {
	// 	this.stop(armature);
	// 	this.armatureMap[name].push(armature);
	// }

}
