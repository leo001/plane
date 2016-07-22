class McManager {
	private static instance: McManager;
    public static get inst(): McManager {
		if (!this.instance) {
            this.instance = new McManager();
        }
        return this.instance;
    }

	private characterMcFactory: egret.MovieClipDataFactory;
	

	public constructor() {
		var data = RES.getRes("character_json");
		var txtr = RES.getRes("character_png");
		this.characterMcFactory = new egret.MovieClipDataFactory(data, txtr);


	}

	public getCharacter(name: string): egret.MovieClip {
		return new egret.MovieClip(this.characterMcFactory.generateMovieClipData(name));
	}
	
}