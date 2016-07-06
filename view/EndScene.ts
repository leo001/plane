/**
 * Created by leo
 * on 2016/7/1.
 *
 */
class EndScene extends BaseScene {
    constructor() {
        super();

        this.skinName = customSkins.EndSceneSkin;
    }
    public again_btn:eui.Button;
    public childrenCreated():void {
        super.childrenCreated();

        this.again_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgain, this);
    }

    private onAgain(e:egret.TouchEvent):void{
        SceneManager.inst.enterScene('game');
    }

}