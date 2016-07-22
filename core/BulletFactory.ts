class BulletFactory {
	

	private static bulletPool:Bullet[] = [];

	public static getBullet():Bullet{
		if(this.bulletPool.length > 0){
			return this.bulletPool.pop();
		}else{
			return new Bullet();
		}
	}

	public static recycle(b:Bullet):void{
		this.bulletPool.push(b);
	}
}