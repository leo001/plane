
class Q_building_Container
	{
	
		public static map:HashMap;
		public static isInit:boolean = false;

		
		public static init(data:any[]):void
		{
			if(this.isInit){
				egret.log('重复初始化');
				return;
			}
			this.map = new HashMap;
			var t;
			for (var i = 0, len = data.length; i < len; i++){
				t = new Q_building_Bean(data[i]);
				this.map.put(t[Q_building_Bean.pKey], t);
			}
			this.isInit = true;
		}
		
		public static getData(key:any):Q_building_Bean
		{
			if(this.map.has(key)){
				return this.map.get(key);
			}
			return null;
		}		
	}

