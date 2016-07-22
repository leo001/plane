class HttpSender {
	public constructor() {
		
	}

	private static WEB_URL:string = 'http://192.168.1.106:3000/';
	private cb:Function;

	public send(data:any, cb:Function):void{
		this.cb = cb;

		// var dataB = JSON.stringify(data);
		var url = HttpSender.WEB_URL + data;
		var req:egret.HttpRequest = new egret.HttpRequest();
		req.responseType = egret.HttpResponseType.TEXT;
		req.open(url, egret.HttpMethod.GET);		
		req.send();
		req.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        req.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}

	 private onGetComplete(event:egret.Event):void {
        var req = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",req.response);
		var obj = JSON.parse(req.response);
		this.cb.apply(null, obj);
    }

    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }

    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}