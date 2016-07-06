class Lyrs {

	private static instance:Lyrs;
    public static get inst():Lyrs{
        if(!this.instance){
            this.instance = new Lyrs();
        }
        
        return this.instance;
    }

    public constructor(){

    }
    public W:number;
    public H:number;

	public SCENE:egret.DisplayObjectContainer;
	
	public init(main:eui.UILayer) {
        
        this.W = main.width;
        this.H = main.height;

        this.SCENE = new egret.DisplayObjectContainer();
        this.SCENE.name = 'SCENE';
        this.SCENE.width = main.width;
        this.SCENE.height = main.height;
        main.addChild(this.SCENE);
        
	}
}