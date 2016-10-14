class PanelName {

	//fight
	public static FIGHT_FAIL: string = 'FIGHT_FAIL';
	public static Fight_WIN: string = 'Fight_WIN';


	//hero info
	public static HERO_VIEW: string = 'HERO_VIEW';
	public static Embattle_VIEW: string = 'Embattle_VIEW';
	public static HeroChoose_VIEW: string = 'HeroChoose_VIEW';
	public static AlertPanel:string = 'AlertPanel';
	//login
	public static REG: string = 'REG';

}

class PanelClsMap {
	public data: any;
	public constructor() {
		this.data = {};
		this.data[PanelName.FIGHT_FAIL] = FightFailPanel;
		this.data[PanelName.Fight_WIN] = FightWinPanel;


		this.data[PanelName.HERO_VIEW] = HeroViewPanel;
		this.data[PanelName.Embattle_VIEW] = EmbattlePanel;
		this.data[PanelName.HeroChoose_VIEW] = HeroChoosePanel;
		this.data[PanelName.AlertPanel] = AlertPanel;


		this.data[PanelName.REG] = RegPanel;
		


	}
}
