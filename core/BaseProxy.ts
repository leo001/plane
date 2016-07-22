class BaseProxy {
	public constructor() {
	}

	public excute(data: any): void {
		Locker.inst.add();
	}

	public cb_excute(data: any): void {
		Locker.inst.remove();
	}
}