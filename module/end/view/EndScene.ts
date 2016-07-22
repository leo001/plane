/**
 * Created by leo
 * on 2016/7/1.
 *
 */
class EndScene extends eui.Component {
    constructor() {
        super();

        this.skinName = customSkins.EndSceneSkin;
    }
    public again_btn: eui.Button;
    public share_btn: eui.Button;

    public useTime_lb: eui.Label;

    public result_img: eui.Image;

    public childrenCreated(): void {
        super.childrenCreated();

        this.again_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgain, this);
        this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);


        // this.again_btn.y = Lyrs.inst.H * .7;
        // this.share_btn.y = Lyrs.inst.H * .8;
    }

    private onAgain(e: egret.TouchEvent): void {
        // var proxy:GameStartProxy = new GameStartProxy();
        // proxy.execute({});

         SceneManager.inst.enterScene('game');
    }

      

    private onShare(e: egret.TouchEvent): void {

    }

    public init(data: any): void {
        this.useTime_lb.text = '' + data.useTime;

        if (data.useTime >= 0 && data.useTime < 10) {
            this.result_img.texture = RES.getRes('result3_02_png');
        } else if (data.useTime >= 10 && data.useTime < 20) {
            this.result_img.texture = RES.getRes('result2_02_png');
        } else if (data.useTime >= 20) {
            this.result_img.texture = RES.getRes('result1_02_png');
        }
    }
}