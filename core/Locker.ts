class Locker {
	private static instance:Locker;
    public static get inst():Locker{
        if(!this.instance){
            this.instance = new Locker();
        }
        
        return this.instance;
    }
	public constructor(){
		this.cnt = 0;

		this.shape = BlockFactory.getBlock();
    }
	private shape:egret.Shape;
	private cnt:number;
	public add():void{
		this.cnt++;
		if(this.cnt > 0){
			if(0 == Lyrs.inst.LOCK.numChildren){
				Lyrs.inst.LOCK.addChild(this.shape);
			}	
		}
	}

	public remove():void{
		this.cnt--;
		if(this.cnt <= 0){
			// if(0 < this.cnt){
			// 	egret.log('remove多了')
			// }
			this.cnt = 0;
			if(Lyrs.inst.LOCK.numChildren > 0){
				Lyrs.inst.LOCK.removeChild(this.shape);
			}	
		}
	}
}