class GameStartProxy {
	public constructor() {
	}
	public execute(a: any): void {

		var msgSender: HttpSender = new HttpSender();
		var data: string = 'startGame?uid=' +  'helo';
		
        msgSender.send(data, this.cb_excute);
	}

	public cb_excute(data: any): void {
		SceneManager.inst.enterScene('game');
	}
}