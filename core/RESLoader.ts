class RESLoader extends egret.EventDispatcher {
	private static instance: RESLoader;
    public static get inst(): RESLoader {
        if (!this.instance) {
            this.instance = new RESLoader();
        }

        return this.instance;
    }

	private info: any;

	private loadingUI: LoadingUI;

	public constructor() {
		super();

		this.info = {};
		this.info['preload'] = { isLoading: 0, isLoaded: 0, priority: 4 };
		this.info['start'] = { isLoading: 0, isLoaded: 0, priority: 3 };
		this.info['game'] = { isLoading: 0, isLoaded: 0, priority: 2 };
		this.info['end'] = { isLoading: 0, isLoaded: 0, priority: 1 };

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

		this.loadingUI = new LoadingUI();
	}

	//gn--group name
	public load(gn: string, isShowLoading: boolean): void {
		if (this.isLoaded(gn)) {
			this.dispatchEventWith(MyEvent.RES_LOADED + gn);
		} else {
			if (!this.isLoading(gn)) {
				if (isShowLoading) {
					this.addLoadingUI();
				}
				var priority = this.getPriority(gn);
				RES.loadGroup(gn, priority);
				this.setIsLoading(gn, 1);

			}
		}
	}

	public getPriority(gn: string): number {
		return this.info[gn].priority;
	}
	private addLoadingUI(): void {
		Lyrs.inst.LOADING.addChild(this.loadingUI);
		this.loadingUI.playAni();
	}

	private removeLoadingUI(): void {
		if (this.loadingUI.parent) {
			Lyrs.inst.LOADING.removeChild(this.loadingUI);
			this.loadingUI.stopAni();
		}
	}

	private onResourceLoadComplete(event: RES.ResourceEvent): void {
		console.log(event.groupName + " is loaded");

		this.removeLoadingUI();
		this.setIsLoading(event.groupName, 0);
		this.setIsLoaded(event.groupName, 1);
       	this.dispatchEventWith(MyEvent.RES_LOADED + event.groupName);
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
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }
    /**
     * 资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
		//    event.itemsLoaded, event.itemsTotal

    }

	public isLoaded(gn: string): boolean {
		return (1 == this.info[gn].isLoaded) ? true : false;
	}

	public isLoading(gn: string): boolean {
		return (1 == this.info[gn].isLoading) ? true : false;
	}

	private setIsLoading(gn: string, v: number): void {
		this.info[gn].isLoading = v;
	}

	private setIsLoaded(gn: string, v: number): void {
		this.info[gn].isLoaded = v;
	}
}