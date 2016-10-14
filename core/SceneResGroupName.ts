class SceneResGroupName {
	public static PRELOAD: string = 'preload';
	public static LOGIN: string = 'login';
	public static HOME: string = 'home';
	public static WORLD: string = 'world';
	public static FIGHT: string = 'fight';

}

class SceneResGroupMap {
	public data: any;
	public constructor() {
		this.data = {};
		this.data[SceneResGroupName.PRELOAD] = { isLoading: 0, groups: ['preload', 'config', 'test'] };
		this.data[SceneResGroupName.LOGIN] = { isLoading: 0, groups: ['login', 'common'] };
		this.data[SceneResGroupName.HOME] = { isLoading: 0, groups: ['home'] };
		this.data[SceneResGroupName.WORLD] = { isLoading: 0, groups: ['world'] };
		this.data[SceneResGroupName.FIGHT] = { isLoading: 0, groups: ['fight'] };
	}
}
