/**
 * Created by leo on 2016/7/1.
 *
 */
class StartScene extends eui.Component {
    constructor() {
        super();
        this.skinName = customSkins.StartSceneSkin;
    }
    public start_btn: eui.Button;
    public help_btn: eui.Button;

    public childrenCreated(): void {
        super.childrenCreated();

        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this.help_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
        // this.start_btn.y = Lyrs.inst.H * .7;
        // this.help_btn.y = Lyrs.inst.H * .85;
    }

    private onStart(e: egret.TouchEvent): void {
        var proxy:GameStartProxy = new GameStartProxy();
        // proxy.execute({});

        proxy.cb_excute({});
    }


    private onHelp(e: egret.TouchEvent): void {
        PanelManager.inst.open(PanelName.HELP)
    }
}