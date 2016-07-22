class PauseLogic extends egret.EventDispatcher implements IObserver {

	public cnt: number;

	public pauseCom: PauseCom;

	public constructor(pauseCom) {
		super();

		this.pauseCom = pauseCom;

		this.pauseCom.pause_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
        this.pauseCom.resumeBg_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResume, this);
	}

	public init(): void {
		this.pauseCom.init();
		this.enable(false);
	}

	public enable(v: boolean): void {
		this.pauseCom.touchEnabled = this.pauseCom.touchChildren = v;
	}
	//========================================================================================================
    private onPause(): void {
        // var p:PauseProxy = new PauseProxy();
        // p.pause({});
        this.cb_pause();
    }

    public cb_pause(): void {

        this.pauseCom.resume_gr.visible = true;

        this.pauseCom.pause_img.visible = false;

		this.dispatchEventWith(MyEvent.PAUSE_GAME);
    }


    private onResume(): void {
        // var p:ResumeProxy = new ResumeProxy();
        // p.resume({});

        this.cb_resume();

    }
    public cb_resume(): void {
        this.pauseCom.resumeBg_img.touchEnabled = false;

        this.pauseCom.resumeIcon_img.visible = false;
        this.pauseCom.resumeCnt_img.visible = true;

		this.cnt = 3;

		this.start();
		this.updateTime();
    }

	//===========================================================================================
	public tick(): void {
		this.cnt--;
		if (0 == this.cnt) {
			this.resumeGame();
			return;
		}

		this.updateTime();
	}

	public start(): void {
		GlobalTimer.inst.register(this);
	}
	public stop(): void {
		GlobalTimer.inst.unRegister(this);
	}
	//===========================================================================================
	private resumeGame(): void {
		this.stop();
		this.pauseCom.init();
		this.dispatchEventWith(MyEvent.RESUME_GAME);
	}



	private updateTime(): void {
		this.pauseCom.resumeCnt_img.texture = RES.getRes(this.cnt + '_03_png');
	}


}