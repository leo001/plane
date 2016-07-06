/**
 * Created by leo
 * on 2016/7/1.
 *
 */
class GameScene extends BaseScene{
    constructor() {
        super();
       
        this.skinName = customSkins.GameSceneSkin;
    }

    public bg_rt:eui.Rect;
    public useTime_lb:eui.Label;

    public childrenCreated():void{
        super.childrenCreated();

        this.init();
    }

    public init():void{
        this.useTime_lb.text = '所用时间：0秒';
    }
}