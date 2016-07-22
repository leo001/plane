class UseTimeLogic implements IObserver {

	public cnt: number;
	public useTime_lb: eui.Label;

	public constructor(lb: eui.Label) {
		this.useTime_lb = lb;
		
	}

	public init():void{
		this.cnt = 0;
		this.updateLb();
	}

	private updateLb():void{
		this.useTime_lb.text = '' + this.cnt;
	}

	public tick(): void {
		this.cnt++;
		this.updateLb();
	}

	public start(): void {
		GlobalTimer.inst.register(this);
	}
	public stop(): void {
		GlobalTimer.inst.unRegister(this);
	}

}