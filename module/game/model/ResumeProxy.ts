class ResumeProxy {
	public constructor() {
	}

	public excute(a:any): void {

		var msgSender: HttpSender = new HttpSender();
		var data: any = {};
		data['a'] = a;
        msgSender.send(data, this.cb_excute);
	}

	public cb_excute(): void {
		
		var s = SceneManager.inst.getScene('game');
		s.resume();
	}
}