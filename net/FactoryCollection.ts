class FactoryCollection {
	private static instance: FactoryCollection;
    public static get inst(): FactoryCollection {
        if (!this.instance) {
            this.instance = new FactoryCollection();
        }

        return this.instance;
    }
	public mc:IMCFactory;
	public particle:IParticleFactory;
	public db:IDBSFactory;

	public init(dbData:any[]):void{
		this.mc = new MCFactory();

		this.particle = new ParticleFactory();

		this.db = new DBSFactory();

		dbData.forEach(element => {
			this.db.addData(element.armatureName, element.texName);
		});
	}
}
