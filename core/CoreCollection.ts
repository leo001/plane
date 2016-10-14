module CoreCollection {
	export var serverUrl = "/msg";

	export var lyrs: Lyrs;
	export var loader: RESLoader;

	export var panelManager: IPanelManager;
	export var sceneManager: SceneManager;
	export var serverApi: Net.GameRequestProxy;

	export function init(main: Main): void {
		lyrs = new Lyrs(main);

		var a: PanelClsMap = new PanelClsMap();
        panelManager = new PanelManager(a.data);

        var b: SceneResGroupMap = new SceneResGroupMap();
		loader = new RESLoader(b.data);

        var c: SceneControlMap = new SceneControlMap();
		sceneManager = new SceneManager(c.data);

		//http://192.168.1.105:8888/msg
		
		serverApi = new Net.GameRequestProxy(serverUrl);
	}
}
