/**
 * Created by leo on 2016/7/1.
 *
 */
class StartScene extends BaseScene{
    constructor() {
        super();
        this.skinName = customSkins.StartSceneSkin;
    }
    public start_btn:eui.Button;
    
    public childrenCreated():void{
        super.childrenCreated();

        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    }

    private onStart(e:egret.TouchEvent):void{
        SceneManager.inst.enterScene('game');
    }
}