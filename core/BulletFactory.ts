class BulletFactory {
	private static instance:BulletFactory;
    public static get inst():BulletFactory{
        if(!this.instance){
            this.instance = new BulletFactory();
        }
        
        return this.instance;
    }
	public constructor() {
		this.bulletPool = [];
	}

	private bulletPool:Bullet[];

	public getBullet():Bullet{
		if(this.bulletPool.length > 0){
			return this.bulletPool.pop();
		}else{
			return new Bullet();
		}
	}

	public recycle(b:Bullet):void{
		this.bulletPool.push(b);
	}
}