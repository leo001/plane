class SceneManager
{

    private static instance:SceneManager;
    public static get inst():SceneManager{
         if(!this.instance){
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    private startCon:StartSceneController;
    private gameCon:GameSceneController;
    private endCon:EndSceneController;

    private con:any;

    public enterScene(sn:string, data?:any):void{
        if('start' == sn){
            if(!this.startCon){            
                this.startCon = new StartSceneController();
            }
            this.con = this.startCon;
        }else if('game' == sn){
            if(!this.gameCon){                
                this.gameCon = new GameSceneController();
            }
            this.con = this.gameCon;        
        }else if('end' == sn){
            if(!this.endCon){                
                this.endCon = new EndSceneController();
            }
            this.con = this.endCon;    
        }
        this.con.init(data);
        Lyrs.inst.SCENE.removeChildren();
        Lyrs.inst.SCENE.addChild(this.con.scene);
    }
}