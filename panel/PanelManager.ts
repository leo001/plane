class PanelManager {
	private static instance: PanelManager;
    public static get inst(): PanelManager {
        if (!this.instance) {
            this.instance = new PanelManager();
        }

        return this.instance;
    }
	private panelCls: any;
	private panelInst: any;

	private block: egret.Shape;

	public constructor() {
		this.panelCls = {};
		this.panelInst = {};

		this.panelCls[PanelName.HELP] = HelpPanel;
		

		this.block = BlockFactory.getBlock();
	}

	public open(pn: string, info?: any): void {
		var inst = this.panelInst[pn];
		if (inst) {
			if (0 == Lyrs.inst.PANEL.numChildren) {
				Lyrs.inst.PANEL.addChild(this.block);
			}
		} else {
			var cls = this.panelCls[pn];
			if (cls) {
				inst = new cls(info);
			} else {
				egret.log('不存在的面板类')
			}
		}
		if (Lyrs.inst.PANEL.numChildren >= 2) {
			this.swapLast();
		}
		Lyrs.inst.PANEL.addChild(inst);
	}

	public close(): void {
		Lyrs.inst.PANEL.removeChildAt(Lyrs.inst.PANEL.numChildren - 1);
		if (Lyrs.inst.PANEL.numChildren >= 2) {
			this.swapLast();
		}else{
			Lyrs.inst.PANEL.removeChildAt(Lyrs.inst.PANEL.numChildren - 1);
		}
	}

	public swapLast():void{
		Lyrs.inst.PANEL.swapChildrenAt(Lyrs.inst.PANEL.numChildren - 2, Lyrs.inst.PANEL.numChildren - 1);
	}

	public closeAll(): void {
		Lyrs.inst.PANEL.removeChildren();
	}
}