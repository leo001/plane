class DBArmature extends egret.DisplayObjectContainer {
	private armature: dragonBones.Armature;
	private clock: dragonBones.WorldClock;

	public constructor(armature: dragonBones.Armature, clock: dragonBones.WorldClock) {
		super();

		this.armature = armature;
		this.clock = clock;

		this.addChild(this.armature.display);
	}

	/**
	 * @aName 动画名
	 */
	public play(aName: string, playTimes: number = 0): void {
		var idx = this.armature.animation.animationList.indexOf(aName);
		if (-1 == idx) {
			egret.log('[ERROR]:骨架中没有此动画', aName);
			return;
		}
		this.clock.add(this.armature);

		this.armature.animation.play(aName, playTimes);
	}

	public stop(): void {
		this.clock.remove(this.armature);

		this.armature.animation.stop();
    }

	// public gotoAndPlay(aName: string, playTimes: number = 0): void {

	// 	this.clock.add(this.armature);

	// 	this.armature.animation.gotoAndPlay(aName, -1, -1, playTimes);
	// }
	// public gotoAndStop(aName: string, time: number = 0): void {
	// 	this.clock.add(this.armature);

	// 	this.armature.animation.gotoAndStop(aName, time);
	// }
}
