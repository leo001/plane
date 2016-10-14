class Q_building_Bean {
	/*
	 * 主键
	 */
	public static pKey:string = 'q_buildingId';
		    	
	constructor(obj:any){
		for (var key in obj) {
			this[key] = obj[key];
		}
	}
}
