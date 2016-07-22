class GameLogic extends egret.EventDispatcher implements IObserver {


	public sky_gr: eui.Group;
	public plane: Plane;

	public bulletArr: Bullet[];

	
	public cnt: number;

	//回合数
	private round:number;
	//子弹基数
	private BASE_PER_ROUND_F_B:number = 12;
	private BASE_PER_ROUND_L_R:number = 6;
	//子弹增加数
	private ADD_PER_ROUND_F_B:number = 2;
	private ADD_PER_ROUND_L_R:number = 1;
	//子弹数上限
	private LIMIT_ROUND_F_B:number = 20;
	private LIMIT_ROUND_L_R:number = 10;


	public constructor(sky_gr: eui.Group) {
		super();

		this.sky_gr = sky_gr;

		this.bulletArr = [];

		this.plane = new Plane();
		this.plane.addEventListener(MyEvent.START_ANIMATION_END, ()=>{this.dispatchEventWith(MyEvent.GAME_START);}, this);
        sky_gr.addChild(this.plane);

		this.round = 0;
	}



	public init(): void {
		this.round = 0;
		
		this.initPlane();

		this.initBullet();
	}



	private initPlane(): void {
        this.plane.x = Math.floor(Lyrs.inst.W * .5);
        this.plane.y = Math.floor(Lyrs.inst.SCENE_H * .5);
		this.plane.born();
    }

	//获取前后子弹数量
	private getNum_F_B():number{
		var num = this.BASE_PER_ROUND_F_B + this.round * this.ADD_PER_ROUND_F_B;
		if(num > this.LIMIT_ROUND_F_B){
			num = this.LIMIT_ROUND_F_B;
		}
		return num;
	}

	private getNum_L_R():number{
		var num = this.BASE_PER_ROUND_L_R + this.round * this.ADD_PER_ROUND_L_R;
		if(num > this.LIMIT_ROUND_L_R){
			num = this.LIMIT_ROUND_L_R;
		}
		return num;
	}
    private initBullet(): void {
        var b: Bullet;
        var des: egret.Point;
        var ra: number;
        //front
		var num = this.getNum_F_B();
        for (var i = 0; i < num; i++) {
            b = BulletFactory.getBullet();
            this.bulletArr.push(b);
            b.x = Rand.rand(0, Lyrs.inst.W);
            b.y = 0;

			if (i >= 0 && i < num * .5) {
				//back
				des = this.getDes_back();
			} else if (i >= num * .5 && i < num * .75) {
				//left
				des = this.getDes_left();
			} else if (i >= num * .75 && i < num) {
				//right
				des = this.getDes_right();
			}


            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.sky_gr.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
		//back
        for (var i = 0; i < num; i++) {
            b = BulletFactory.getBullet();
            this.bulletArr.push(b);
            b.x = Rand.rand(0, Lyrs.inst.W);
            b.y = Lyrs.inst.H;

			if (i >= 0 && i < num * .5) {
				//front
				des = this.getDes_front();
			} else if (i >= num * .5 && i < num * .75) {
				//left
				des = this.getDes_left();
			} else if (i >= num * .75 && i < num) {
				//right
				des = this.getDes_right();
			}


            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.sky_gr.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
		//left
		num = this.getNum_L_R();
        for (var i = 0; i < num; i++) {
            b = BulletFactory.getBullet();
            this.bulletArr.push(b);
            b.x = 0;
            b.y = Rand.rand(0, Lyrs.inst.H);

			if (i >= 0 && i < num * .5) {
				//right
				des = this.getDes_right();
			} else if (i >= num * .5 && i < num * .75) {
				//front
				des = this.getDes_front();
			} else if (i >= num * .75 && i < num) {
				//back
				des = this.getDes_back();
			}


            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.sky_gr.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }
		//right
		
        for (var i = 0; i < num; i++) {
            b = BulletFactory.getBullet();
            this.bulletArr.push(b);
            b.x = Lyrs.inst.W;
            b.y = Rand.rand(0, Lyrs.inst.H);

			if (i >= 0 && i < num * .5) {
				//left
				des = this.getDes_left();
			} else if (i >= num * .5 && i < num * .75) {
				//front
				des = this.getDes_front();
			} else if (i >= num * .75 && i < num) {
				//back
				des = this.getDes_back();
			}


            ra = Math.atan2(des.y - b.y, des.x - b.x);
            b.ra = ra;

            this.sky_gr.addChild(b);
            // egret.log(b.x, b.y, desX, desY, ra, Math.round(ra * 180 / Math.PI));
        }

		this.round++;
    }


	private getDes_front(): egret.Point {
		return new egret.Point(Rand.rand(0, Lyrs.inst.W), 0);
	}
	private getDes_back(): egret.Point {
		return new egret.Point(Lyrs.inst.W, Rand.rand(0, Lyrs.inst.H));
	}
	private getDes_left(): egret.Point {
		return new egret.Point(0, Rand.rand(0, Lyrs.inst.H));
	}
	private getDes_right(): egret.Point {
		return new egret.Point(Lyrs.inst.W, Rand.rand(0, Lyrs.inst.H));
	}





	public update(): void {
		var b: Bullet;
		var vx: number, vy: number;


		for (var len = this.bulletArr.length, i = len - 1; i >= 0; i--) {
			b = this.bulletArr[i];
			vx = Math.cos(b.ra) * b.speed;
			vy = Math.sin(b.ra) * b.speed;
			b.x += vx;
			b.y += vy;
			b.rotation += 10;

			if (b.x < 0 || b.x > Lyrs.inst.W || b.y < 0 || b.y > Lyrs.inst.H) {
				BulletFactory.recycle(b);
				b.parent.removeChild(b);
				// this.bulletArr.splice(i, 1);
				this.swap(i, this.bulletArr.length - 1);
				this.bulletArr.pop();
			}
		}

		// if (len > 10) {
		// 	this.checkCollision();
		// } else {
		// 	this.plus();
		// }

		this.checkCollision();
	}


	public start(): void {
		GlobalTimer.inst.register(this);
		this.cnt = 0;
	}

	public stop(): void {
		GlobalTimer.inst.unRegister(this);
	}

	public tick(): void {
		this.cnt++;
		if(this.cnt < 20){
			if(0 == this.cnt % 5){
				this.addBullet();
			}
		}else{
			if(0 == this.cnt % 4){
				this.addBullet();
			}
		}		
	}
	

	private checkCollision(): void {
		if (DebugParam.isIgnoreCollision) {
			return;
		}
		// var b: Bullet;
		// var rt_bullet: egret.Rectangle = new egret.Rectangle();
		// var rt_plane: egret.Rectangle = new egret.Rectangle();
		// this.plane.hitArea.getBounds(rt_plane);
		// rt_plane.x = this.plane.x;
		// rt_plane.y = this.plane.y;
		// // egret.log('plane', rt_plane);

		// for (var i = 0, len = this.bulletArr.length; i < len; i++) {
		// 	b = this.bulletArr[i];
		// 	b.getBounds(rt_bullet);
		// 	rt_bullet.x = b.x;
		// 	rt_bullet.y = b.y;
		// 	// egret.log('bullet', rt_bullet);

		// 	if (rt_bullet.intersects(rt_plane)) {
		// 		// egret.log('collision');
		// 		this.gameEnd();
		// 		return;
		// 	}
		// }
		var b: Bullet;
		var bound_bullet: BoundCircle = new BoundCircle();
		var bound_plane: BoundCircle = new BoundCircle();
		bound_plane.x = this.plane.x - 1;
		bound_plane.y = this.plane.y - 3;
		bound_plane.r = 25;
		// egret.log('bullet', bound_plane);
		for (var i = 0, len = this.bulletArr.length; i < len; i++) {
			b = this.bulletArr[i];

			bound_bullet.x = b.x;
			bound_bullet.y = b.y;
			bound_bullet.r = 15;
			// egret.log('bullet', bound_bullet);

			if (this.intersect(bound_bullet, bound_plane)) {
				// egret.log('collision');
				this.gameEnd();
				return;
			}
		}
	}

	private intersect(boundA, boundB): boolean {
		var a = boundA.x - boundB.x;
		var b = boundA.y - boundB.y;
		var r = boundA.r + boundB.r;
		if (a * a + b * b <= r * r) {
			return true;
		}
		return false;
	}

	private addBullet(): void {
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

	private gameEnd(): void {

        var b: Bullet;
        for (var i = 0, len = this.bulletArr.length; i < len; i++) {
            b = this.bulletArr[i];
            BulletFactory.recycle(b);
            b.parent.removeChild(b);
        }
        this.bulletArr.length = 0;

		this.dispatchEventWith(MyEvent.GAME_END);
	}
}