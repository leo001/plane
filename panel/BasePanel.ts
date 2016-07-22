class BasePanel extends eui.Component{
	public close_btn:eui.Button;

	public constructor() {
		super();

		
	}

	public childrenCreated():void{
		this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
	}

	public onClose(){
		PanelManager.inst.close();
	}
}