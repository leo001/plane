class DragController {
	
	private bg:egret.DisplayObject;
	private plane:egret.DisplayObject;

 	private offsetX;
    private offsetY;

	public constructor(bg:egret.DisplayObject, plane:egret.DisplayObject) {
		this.bg = bg;
		this.plane = plane;

		this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}

	private onTouchBegin(e:egret.TouchEvent):void{
        this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

        this.offsetX = e.stageX - this.plane.x;
        this.offsetY = e.stageY - this.plane.y;
    }

    private onTouchMove(e:egret.TouchEvent):void{
        var x1 = e.stageX - this.offsetX;
        var y1 = e.stageY - this.offsetY;
        if(x1 < 0){
            x1 = 0;
        }else if(x1 > Lyrs.inst.W - this.plane.width){
            x1 = Lyrs.inst.W - this.plane.width;
        }

        if(y1 < 0){
            y1 = 0;
        }else if(y1 > Lyrs.inst.H - this.plane.height){
            y1 = Lyrs.inst.H - this.plane.height;
        }
        this.plane.x = x1;
        this.plane.y = y1;
    }

    private onTouchEnd(e:egret.TouchEvent):void{
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }
}