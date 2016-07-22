class SceneManager {

    private static instance: SceneManager;
    public static get inst(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    private start: StartScene;
    private game: GameScene;
    private end: EndScene;

    private scene: any;

    public sn: string;
    public data: any;

    public enterScene(sn: string, data?: any): void {
        this.sn = sn;
        this.data = data;
        // if(RESLoader.inst.isLoaded(sn)){
        //     this.toEnterScene();
        // }else{
        RESLoader.inst.addEventListener(MyEvent.RES_LOADED + sn, this.toEnterScene, this);
        RESLoader.inst.load(sn, true);
        // }
    }

    public toEnterScene(): void {
        RESLoader.inst.removeEventListener(MyEvent.RES_LOADED + this.sn, this.toEnterScene, this);

        var isCreated = false;
        if ('start' == this.sn) {
            if (!this.start) {
                this.start = new StartScene();
            } else {
                isCreated = true;
            }
            this.scene = this.start;
        } else if ('game' == this.sn) {
            if (!this.game) {
                this.game = new GameScene();
                this.game.once(eui.UIEvent.CREATION_COMPLETE, () => { this.game.init(); }, this);
            } else {
                isCreated = true;
            }
            this.scene = this.game;
        } else if ('end' == this.sn) {
            if (!this.end) {
                this.end = new EndScene();
                this.end.once(eui.UIEvent.CREATION_COMPLETE, () => { this.end.init(this.data); }, this);
            } else {
                isCreated = true;
            }
            this.scene = this.end;
        }
        if (isCreated) {
            this.scene.init(this.data);
        }
        Lyrs.inst.SCENE.removeChildren();
        Lyrs.inst.SCENE.addChild(this.scene);
    }


    public getScene(sn: string): any {
        if ('start' == sn) {
            return this.start;
        } else if ('game' == sn) {
            return this.game;
        } else if ('end' == sn) {
            return this.end;
        }
    }
}