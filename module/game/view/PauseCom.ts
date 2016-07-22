class PauseCom extends eui.Component {
	public constructor() {
		super();

		this.skinName = customSkins.PauseComSkin;
	}


	public resume_gr: eui.Group;
	public resumeBg_img: eui.Image;
	public resumeCnt_img: eui.Image;
	public resumeIcon_img: eui.Image;
	
	public pause_img: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();


	}
	public init(): void {
        this.resumeBg_img.touchEnabled = true;

        this.resume_gr.visible = false;

        this.resumeIcon_img.visible = true;
        this.resumeCnt_img.visible = false;

        this.pause_img.visible = true;
    }

}