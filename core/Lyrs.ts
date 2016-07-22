class Lyrs {

    private static instance: Lyrs;
    public static get inst(): Lyrs {
        if (!this.instance) {
            this.instance = new Lyrs();
        }

        return this.instance;
    }

    public constructor() {

    }
    public W: number;
    public H: number;
    public SCENE_H: number;
    public SCENE_TOP: number;

    public SCENE: egret.DisplayObjectContainer;
    public PANEL: egret.DisplayObjectContainer;
    public LOCK: egret.DisplayObjectContainer;
    public LOADING: egret.DisplayObjectContainer;

    public init(main: eui.UILayer) {

        this.W = main.width;
        this.H = main.height;

        this.SCENE_TOP = 91;
        this.SCENE_H = this.H - 91;

        this.SCENE = new egret.DisplayObjectContainer();
        this.SCENE.name = 'SCENE';
        this.SCENE.width = main.width;
        this.SCENE.height = main.height;
        main.addChild(this.SCENE);

        this.PANEL = new egret.DisplayObjectContainer();
        this.PANEL.name = 'PANEL';
        this.PANEL.width = main.width;
        this.PANEL.height = main.height;
        main.addChild(this.PANEL);

        this.LOCK = new egret.DisplayObjectContainer();
        this.LOCK.name = 'LOCK';
        this.LOCK.width = main.width;
        this.LOCK.height = main.height;
        main.addChild(this.LOCK);

        this.LOADING = new egret.DisplayObjectContainer();
        this.LOADING.name = 'LOADING';
        this.LOADING.width = main.width;
        this.LOADING.height = main.height;
        main.addChild(this.LOADING);
    }
}