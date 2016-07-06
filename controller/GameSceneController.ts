class GameSceneController extends SceneController{ 
	private frameTimer: egret.Timer;

	private dragCon: DragController;

	public scene: GameScene;

	public bulletArr: Bullet[];

	public plane: Plane;

	private cntTimer:egret.Timer;

	public cnt:number;


	public constructor() {
		super();

		
		this.scene = new GameScene();

		this.scene.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
		
		this.frameTimer = new egret.Timer(1000 / 30);
		this.frameTimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdate, this);

		this.bulletArr = [];

		this.cntTimer = new egret.Timer(1000);
		this.cntTimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateTime, this);

		this.cnt = 0;
	}

	private onUpdateTime():void{
		this.cnt++;
		this.scene.useTime_lb.text = '所用时间：' + this.cnt + '秒';
	}

	public init(data?:any):void{
	
		this.initScene();

		this.initPlane();

		this.initBullet();

		this.initDrag();

		this.start();
	}

	private initScene():void{
		this.scene.init();
	}
	private initPlane(): void {
		if (!this.plane) {
			this.plane = new Plane();
			this.scene.addChild(this.plane);
		}
        this.plane.x = Lyrs.inst.W * .5;
        this.plane.y = Lyrs.inst.H * .5;
    }

    private initBullet(): void {
        var b: Bullet;
        var des:egret.Point;
        var ra: number;
        //front
		var num = 40;
        for (var i = 0; i < num; i++) {
            b = BulletFactory.inst.getBullet();
            this.bulletArr.push(b);
            b.x = Rand.rand(0, Lyrs.inst.W);
            b.y = 0;
			b.speed = Rand.rand(4, 6);

			if(i >= 0 && i < num * .5){
				//back
				des = this.getDes_back();
			}else if(i >= num * .5 && i < num * .75){
				//left
				des = this.getDes_left();
			}else if(i >= num * .75 && i < num){
				//right
				des = this.getDes_right();
			}
            
            
            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.scene.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
		//back
		num = 40;
        for (var i = 0; i < num; i++) {
            b = BulletFactory.inst.getBullet();
            this.bulletArr.push(b);
            b.x = Rand.rand(0, Lyrs.inst.W);
            b.y = Lyrs.inst.H;
			b.speed = Rand.rand(4, 6);

			if(i >= 0 && i < num * .5){
				//front
				des = this.getDes_front();
			}else if(i >= num * .5 && i < num * .75){
				//left
				des = this.getDes_left();
			}else if(i >= num * .75 && i < num){
				//right
				des = this.getDes_right();
			}
            
            
            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.scene.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
		//left
		num = 20;
        for (var i = 0; i < num; i++) {
            b = BulletFactory.inst.getBullet();
            this.bulletArr.push(b);
            b.x = 0;
            b.y = Rand.rand(0, Lyrs.inst.H);
			b.speed = Rand.rand(4, 6);

			if(i >= 0 && i < num * .5){
				//right
				des = this.getDes_right();
			}else if(i >= num * .5 && i < num * .75){
				//front
				des = this.getDes_front();
			}else if(i >= num * .75 && i < num){
				//back
				des = this.getDes_back();
			}
            
            
            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.scene.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
		//right
		num = 20;
        for (var i = 0; i < num; i++) {
            b = BulletFactory.inst.getBullet();
            this.bulletArr.push(b);
            b.x = Lyrs.inst.W;
            b.y = Rand.rand(0, Lyrs.inst.H);
			b.speed = Rand.rand(4, 6);

			if(i >= 0 && i < num * .5){
				//left
				des = this.getDes_left();
			}else if(i >= num * .5 && i < num * .75){
				//front
				des = this.getDes_front();
			}else if(i >= num * .75 && i < num){
				//back
				des = this.getDes_back();
			}
            
            
            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.scene.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
    }

	
	private getDes_front():egret.Point{
		return new egret.Point(Rand.rand(0, Lyrs.inst.W), 0);
	}
	private getDes_back():egret.Point{
		return new egret.Point(Lyrs.inst.W, Rand.rand(0, Lyrs.inst.H));
	}
	private getDes_left():egret.Point{
		return new egret.Point(0, Rand.rand(0, Lyrs.inst.H));            	
	}
	private getDes_right():egret.Point{
		return new egret.Point(Lyrs.inst.W, Rand.rand(0, Lyrs.inst.H));
	}

	public initDrag(): void {
		if (!this.dragCon) {
			this.dragCon = new DragController(this.scene.bg_rt, this.plane);
		}
	}

	public start(): void {
		this.frameTimer.start();
		this.cntTimer.start();
	}

	public stop(): void {
		this.frameTimer.stop();
		this.cntTimer.stop();
	}

	private onUpdate(e: egret.TimerEvent): void {
		var b: Bullet;
		var vx: number, vy: number;

		for (var len = this.bulletArr.length, i = len - 1; i >= 0; i--) {
			b = this.bulletArr[i];
			vx = Math.cos(b.ra) * b.speed;
			vy = Math.sin(b.ra) * b.speed;
			b.x += vx;
			b.y += vy;


			if (b.x < 0 || b.x > Lyrs.inst.W || b.y < 0 || b.y > Lyrs.inst.H) {
				BulletFactory.inst.recycle(b);
				b.parent.removeChild(b);
				// this.bulletArr.splice(i, 1);
				this.swap(i, this.bulletArr.length - 1);
				this.bulletArr.pop();
			}
		}

		if (len > 10) {
			var rt_bullet: egret.Rectangle = new egret.Rectangle();
			var rt_plane: egret.Rectangle = new egret.Rectangle();
			this.plane.getBounds(rt_plane);
			rt_plane.x = this.plane.x;
			rt_plane.y = this.plane.y;
			// egret.log('plane', rt_plane);

			for (i = 0, len = this.bulletArr.length; i < len; i++) {
				b = this.bulletArr[i];
				b.getBounds(rt_bullet);
				rt_bullet.x = b.x;
				rt_bullet.y = b.y;
				// egret.log('bullet', rt_bullet);

				if (rt_bullet.intersects(rt_plane)) {
					// egret.log('collision');
					this.destory();
					return;
				}
			}
		} else {
			this.plus();
		}		
	}

	private plus():void{
		this.initBullet();
	}

	private swap(cur, last): void {
		if (cur == last) {
			return;
		}
		var tmp = this.bulletArr[cur];
		this.bulletArr[cur] = this.bulletArr[last];
		this.bulletArr[last] = tmp;
	}

	private destory(): void {
		this.stop();

        var b: Bullet;
        for (var i = 0, len = this.bulletArr.length; i < len; i++) {
            b = this.bulletArr[i];
            BulletFactory.inst.recycle(b);
            b.parent.removeChild(b);
        }
        this.bulletArr.length = 0;

		this.cnt = 0;

        SceneManager.inst.enterScene('end', {time:this.cnt});
	}
}