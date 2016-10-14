class SceneManager2{

    private sceneControlInst: any;
    private sceneControlCls: any;


    //当前场景
    private curSceneControl: SceneControl;

    public sn: string;
    public data: any;

    constructor(param: any) {
        this.sceneControlInst = {};

        this.sceneControlCls = param;

    }


    public enterScene(sn: string, data?: any): void {
        this.sn = sn;
        this.data = data;

        var preSceneControl = this.curSceneControl;
        if (preSceneControl) {
            preSceneControl.dispose();
        }

        CoreCollection.loader.addEventListener(CoreEvent.RES_LOADED + sn, this.toEnterScene, this);
        CoreCollection.loader.load(sn, true);
    }

    private toEnterScene(): void {
        CoreCollection.loader.removeEventListener(CoreEvent.RES_LOADED + this.sn, this.toEnterScene, this);

        var newSceneControl = this.sceneControlInst[this.sn];
        if (newSceneControl) {
            this.curSceneControl = newSceneControl;
            this.curSceneControl.init(this.data);
        } else {
            this.curSceneControl = new this.sceneControlCls[this.sn]();
            this.curSceneControl.createScene(this.data);

            this.sceneControlInst[this.sn] = this.curSceneControl;
        }

        CoreCollection.lyrs.SCENE.removeChildren();
        CoreCollection.lyrs.SCENE.addChild(this.curSceneControl.scene);
    }

    public getControl(sn: string): any {
        return this.sceneControlInst[sn];
    }
}
