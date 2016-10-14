class SceneName {
	public static LOGIN: string = 'login';
	public static HOME: string = 'home';
	public static WORLD: string = 'world';
	public static FIGHT: string = 'fight';

}

class SceneControlMap {
	public data:any;
	public constructor() {
		this.data = {};

		this.data[SceneName.LOGIN] = LoginControl;
		this.data[SceneName.HOME] = HomeControl;
		this.data[SceneName.WORLD] = WorldControl;
		this.data[SceneName.FIGHT] = FightControl;
	}
}
