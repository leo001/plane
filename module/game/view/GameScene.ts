/**
 * Created by leo
 * on 2016/7/1.
 *
 */
class GameScene extends eui.Component {
    constructor() {
        super();

        this.skinName = customSkins.GameSceneSkin;
    }

    public bg_gr: eui.Group;
    public sky_gr: eui.Group;
    public fg_gr: eui.Group;
    public pauseCom: PauseCom;
    public useTime_lb: eui.Label;


    private frameTimer: egret.Timer;

    private gameLogic: GameLogic;
    private bgLogic: BgLogic;
    private useTimeLogic: UseTimeLogic;
    private pauseLogic: PauseLogic;
    private dragLogic: DragLogic;

    public childrenCreated(): void {
        super.childrenCreated();

        this.sky_gr.touchEnabled = false;
        this.fg_gr.touchEnabled = false;
        this.useTime_lb.touchEnabled = false;




        this.gameLogic = new GameLogic(this.sky_gr);
        this.gameLogic.addEventListener(MyEvent.GAME_END, this.onGameEnd, this);
        this.gameLogic.addEventListener(MyEvent.GAME_START, this.onGameStart, this);

        this.dragLogic = new DragLogic(this.bg_gr, this.gameLogic.plane);

        this.bgLogic = new BgLogic(this.bg_gr, this.fg_gr);

        this.frameTimer = new egret.Timer(1000 / 30);
        this.frameTimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateEntity, this);


        this.useTimeLogic = new UseTimeLogic(this.useTime_lb);


        this.pauseLogic = new PauseLogic(this.pauseCom);
        this.pauseLogic.addEventListener(MyEvent.RESUME_GAME, this.onResumeGame, this);
        this.pauseLogic.addEventListener(MyEvent.PAUSE_GAME, this.onPauseGame, this);
    }

    private onGameStart(): void {
        this.start();
        this.pauseLogic.enable(true);
    }
    private onPauseGame():void{
        this.stop();
    }
    private onResumeGame():void{
        this.start();
    }
    private onGameEnd(): void {
        this.stop();

        var p: GameEndProxy = new GameEndProxy();
        // p.excute({});        

        p.cb_excute({ useTime: this.useTimeLogic.cnt });
    }
    //========================================================================================================
    public init(): void {

        this.useTimeLogic.init();

        this.gameLogic.init();

        this.pauseLogic.init();
    }

    //========================================================================================================
    private start(): void {
        this.frameTimer.start();
        this.useTimeLogic.start();
        this.gameLogic.start();
        this.dragLogic.start();
    }

    private stop(): void {
        this.frameTimer.stop();
        this.useTimeLogic.stop();
        this.gameLogic.stop();
        this.dragLogic.stop();
    }
    //=========================================================================================
    private onUpdateEntity(e: egret.TimerEvent): void {
        this.gameLogic.update();
        this.bgLogic.update();
    }

}