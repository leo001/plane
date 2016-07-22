class DragLogic {

    private bg: egret.DisplayObject;
    public plane: Plane;

    private offsetX;
    private offsetY;

    public isPause: boolean;

    public constructor(bg: egret.DisplayObject, plane: Plane) {
        this.bg = bg;
        this.plane = plane;

        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

        this.isPause = true;

    }

    public stop(): void {
        this.isPause = true;
    }
    public start(): void {
        this.isPause = false;
    }
    private onTouchBegin(e: egret.TouchEvent): void {
        if (this.isPause) {
            return;
        }
        this.plane.run();

        this.addListeners();

        this.offsetX = e.stageX - this.plane.x;
        this.offsetY = e.stageY - this.plane.y;
    }

    private onTouchMove(e: egret.TouchEvent): void {
        var x1 = e.stageX - this.offsetX;
        var y1 = e.stageY - this.offsetY;
        if (x1 < 0) {
            x1 = 0;
        } else if (x1 > Lyrs.inst.W - this.plane.width) {
            x1 = Lyrs.inst.W - this.plane.width;
        }

        if (y1 < Lyrs.inst.SCENE_TOP) {
            y1 = Lyrs.inst.SCENE_TOP;
        } else if (y1 > Lyrs.inst.H - this.plane.height) {
            y1 = Lyrs.inst.H - this.plane.height;
        }
        //=========================================================
        var dir = this.plane.dir;
        if (x1 > this.plane.x) {
            dir = Plane.RIGHT;
        } else if (x1 < this.plane.x) {
            dir = Plane.LEFT;
        }

        if (dir != this.plane.dir) {
            this.plane.dir = dir;
            this.plane.scaleX = -dir;
            this.plane.updateFlower();
        }
        //=========================================================

        this.plane.x = x1;
        this.plane.y = y1;
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        this.plane.stand();

        this.removeListeners();
    }

    private removeListeners(): void {
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    private addListeners(): void {
        this.removeListeners();
        
        this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

    }
}