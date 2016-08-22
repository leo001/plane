class GlobalTimer {
	private static instance:GlobalTimer;
    public static get inst():GlobalTimer{
         if(!this.instance){
            this.instance = new GlobalTimer();
        }
        return this.instance;
    }
	private observers:IObserver[];

	private timer:egret.Timer;

	public constructor() {
		this.observers = [];

		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTick, this)
	}

	public register(observer:IObserver):void{
		this.observers.push(observer);
		if(!this.timer.running){
			this.timer.start();
		}
	}

	public unRegister(observer:IObserver):void{
		var idx = this.observers.indexOf(observer);
		if(-1 != idx){
			this.observers.splice(idx, 1);
			if(0 == this.observers.length){
				this.timer.stop();
			}
		}else{
			egret.warn('unRegister error: not in obsevers');
		}
	}


	public onTick():void{
		var observer:IObserver;
		for(var len = this.observers.length, i = len - 1; i >= 0; i--){
			observer = this.observers[i];
			observer.tick();
		}
	}

}