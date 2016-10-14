class RESLoader extends egret.EventDispatcher {


	private info: any;

	private loadingUI: LoadingUI;

	private loadedGroupNum: number;

	private curSN: string;

	public constructor(param: any) {
		super();

		this.info = param;


		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);


	}

	public load(sn: string, isShowLoading: boolean): void {
		if (RES.isGroupLoaded(sn)) {
			this.dispatchEventWith(CoreEvent.RES_LOADED + sn);
		} else {
			if (!this.isLoading(sn)) {
				if (isShowLoading) {
					this.addLoadingUI();
				}
				this.curSN = sn;
				this.loadedGroupNum = 0;
				this.setIsLoading(sn, 1);

				var groups = this.getGroups(sn);
				groups.forEach(element => {
					RES.loadGroup(element);
				});
			}
		}
	}

	public unload(sn: string): void {
		var b = RES.destroyRes(sn);
		if (b) {
		} else {
			egret.log('destory group failed');
		}
	}

	private getGroups(sn: string): string[] {
		return this.info[sn].groups;
	}
	private addLoadingUI(): void {
		if (!this.loadingUI) {
			this.loadingUI = new LoadingUI();
		}
		CoreCollection.lyrs.LOADING.addChild(this.loadingUI);
		this.loadingUI.playAni();
	}

	private removeLoadingUI(): void {
		if (this.loadingUI && this.loadingUI.parent) {
			this.loadingUI.parent.removeChild(this.loadingUI);
			this.loadingUI.stopAni();
		}
	}

	private onResourceLoadComplete(event: RES.ResourceEvent): void {
		console.log(event.groupName + " is loaded");

		this.loadedGroupNum++;
		if (this.loadedGroupNum == this.getGroupNum()) {
			this.removeLoadingUI();
			this.setIsLoading(this.curSN, 0);
			this.dispatchEventWith(CoreEvent.RES_LOADED + this.curSN);
		}
    }
	private getGroupNum(): number {
		return this.info[this.curSN].groups.length;
	}
	/**
	* 资源组加载出错
	*  The resource group loading failed
	*/
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.warn("sn:" + this.curSN + " Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }
    /**
     * 资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
		//    event.itemsLoaded, event.itemsTotal

    }

	public isLoading(sn: string): boolean {
		return (1 == this.info[sn].isLoading) ? true : false;
	}

	private setIsLoading(sn: string, v: number): void {
		this.info[sn].isLoading = v;
	}

}
