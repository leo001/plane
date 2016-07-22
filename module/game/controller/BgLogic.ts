class BgLogic {

	private bgArr: egret.Bitmap[];
	// private fgArr: egret.Bitmap[];

	private bgScrollSpeed = 1;
	// private fgScrollSpeed = 3;


	public constructor(bg_gr: eui.Group, fg_gr: eui.Group) {

		this.bgArr = [];
		var tex: egret.Texture = RES.getRes('bg_jpg');
		var bgTexHeight = tex.textureHeight;
		var num = Math.ceil(Lyrs.inst.H / bgTexHeight) + 1;
		var bmp: egret.Bitmap;
		for (var i = 1; i <= num; i++) {
			bmp = new egret.Bitmap(tex);
			this.bgArr.push(bmp);
			bmp.y = Lyrs.inst.H - bgTexHeight - bgTexHeight * (num - i);
			bmp.x = 0;
			bmp.width = Lyrs.inst.W;
			bg_gr.addChild(bmp);
		}

		// this.fgArr = [];
		// tex = RES.getRes('fg_02_png');
		// bmp = new egret.Bitmap(tex);
		// this.fgArr.push(bmp);
		// bmp.y = 200;
		// fg_gr.addChild(bmp);

		// tex = RES.getRes('fg_03_png');
		// bmp = new egret.Bitmap(tex);
		// this.fgArr.push(bmp);
		// bmp.x = Lyrs.inst.W - bmp.width;
		// bmp.y = 500;
		// fg_gr.addChild(bmp);



	}

	public update(): void {
		//===============================================
		var bmp: egret.Bitmap;
		for (var i = 0, len = this.bgArr.length; i < len; i++) {
			bmp = this.bgArr[i];
			bmp.y += this.bgScrollSpeed;
		}

		if (bmp.y > Lyrs.inst.H) {
			bmp.y = this.bgArr[0].y - bmp.height;
			bmp = this.bgArr.pop();
			this.bgArr.unshift(bmp);
		}

		//===============================================
		// for (i = 0, len = this.fgArr.length; i < len; i++) {
		// 	bmp = this.fgArr[i];
		// 	bmp.y += this.fgScrollSpeed;

		// 	if (bmp.y > Lyrs.inst.H) {
		// 		bmp.y = - bmp.height;
		// 	}
		// }

		
	}
}