class GameEndProxy {
	public constructor() {
	}

	public execute(a: any): void {

		var msgSender: HttpSender = new HttpSender();
		var data: any = {};
		data['a'] = a;
        msgSender.send(data, this.cb_excute);
	}
	
	public cb_excute(data: any): void {
		
		SceneManager.inst.enterScene('end', { useTime: data.useTime });
	}
}