class ParticleFactory implements IParticleFactory{
	

	// private psMap: any;
	public constructor() {
		// this.psMap = {};
	}

	public getParticle(name_t: string, name_c: string): particle.ParticleSystem {

		if("" == name_t || "" == name_c){
			egret.log('textureName or configName为空', name_t, name_c);
			return;
		}
		var ps: particle.ParticleSystem;
		var texture: any;
		var config: any;

		texture = RES.getRes(name_t);
		config = RES.getRes(name_c);
		if(null == texture || null == config){
			egret.log('texture or config为空', texture, config);
			return;
		}
		ps = new particle.ParticleSystem(texture, config);

		return ps;
	}
	// public getParticle(textureName: string, configName: string): particle.ParticleSystem {

	// 	var ps: particle.ParticleSystem;
	// 	var texture: any
	// 	var config: any;
	// 	var list: particle.ParticleSystem[] = this.psMap[configName];
	// 	if (list) {
	// 		if (list.length > 0) {
	// 			ps = list.pop();
	// 		} else {
	// 			texture = RES.getRes(textureName);
	// 			config = RES.getRes(configName);
	// 			ps = new particle.ParticleSystem(texture, config);
	// 		}
	// 	} else {
	// 		this.psMap[configName] = [];

	// 		texture = RES.getRes(textureName);
	// 		config = RES.getRes(configName);
	// 		ps = new particle.ParticleSystem(texture, config);
	// 	}

	// 	return ps;
	// }

	// public recyclePS(configName: string, ps: particle.ParticleSystem): void {
	// 	ps.stop();
	// 	this.psMap[configName].push(ps);
	// }
}
