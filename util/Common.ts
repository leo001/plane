//	公共模块
//	暂时不知道应该写在什么地方的代码，都统一写到这里来，以后有时间再分类

module common {
    export function parseCSV(csv: string): Array<Array<string>> {
        var lines = [];
        var line = [];
        var inQuote = false;
        var str = "";
        for (var i = 0; i < csv.length; ++i) {
            var c = csv[i];
            if (!inQuote) {
                if (c == ",") {
                    line.push(str);
                    str = "";
                } else if (c == "\n") {
                    line.push(str);
                    str = "";
                    lines.push(line);
                    line = [];
                } else if (c == "\"")
                    inQuote = true;
                else
                    str += c;
            } else {
                if (c == "\"") {
                    if (i < csv.length - 1 && csv[i + 1] == "\"")
                        str += c;
                    inQuote = false;
                } else
                    str += c;
            }
        }
        return lines;
    }

    export function ToNumber(val: string): number {
        if (!val)
            return undefined;
        return Number(val);
    }

    /**
     * 字典
     * TypeScript字典中的Key只能为String 或者 Number
     * 使用方法：
     * 例如有个学生类Student,学生的学号为Number类型,需要将N个学生实例按照学号为Key，实例为Value的形式存入Dictionary
     * 定义：var dict: Dictionary<Student> = {};
     * 存入：dict[201038889066] = stu1;    //stu1是一个Student实例
     * 读取：var value = dict[201038889066];
     * 遍历：        for(var dicKey in dict)
     *                        console.log("key=" + dicKey + "value=" + dict[dicKey]);
     */
    export interface Dictionary<TValue> {
        [key: string]: TValue;
        [key: number]: TValue;
    }


    /**
     * 是否是处于加速器中
     */
    export function isNative(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    }

    /**
     * 通过 【绝对URL】 或 【相对URL】 方式获取外部资源（返回promise）
     * @param url 资源的url
     * @param type 资源类型,使用 RES.ResourceItem.TYPE_XXX 中定义的静态常量。若不设置将根据文件扩展名生成。
     */
    export function loadResByUrl(url: string, type?: string) {
        var d = Promise.defer<any>();
        //if (isNative())
        //    url = RES.$getVirtualUrl(url);
        RES.getResByUrl(url, (data, _url) => {
            if (data)
                d.resolve(data);
            else
                d.reject({ message: "IOError:" + _url });
        }, this, type);

        return d.promise();
    }

    /**
     * 加载 配置文件（resource/default.res.json） 中定义的资源（返回promise）
     * @param name 配置文件（resource/default.res.json） 中的name或者 sbuKeys 属性的一项
     */
    export function loadResByKey(name: string) {
        var d = Promise.defer<any>();
        RES.getResAsync(name, (data, _url) => {
            if (data)
                d.resolve(data);
            else
                d.reject({ message: "IOError:" + _url });
        }, this);
        return d.promise();
    }

    /**
     *贝塞尔曲线辅助类
     */
    class BeiSaiEr {
        private _obj: any = null;
        private pos0: egret.Point = null;
        private pos1: egret.Point = null;
        private pos2: egret.Point = null;

        public constructor(obj: any, posArr: Array<egret.Point>) {
            this._obj = obj;
            this.pos0 = posArr[0];
            this.pos1 = posArr[1];
            this.pos2 = posArr[2];
        }

        private get factor(): number {
            return 0;
        }

        private set factor(value: number) {
            this._obj.x = (1 - value) * (1 - value) * this.pos0.x + 2 * value * (1 - value) * this.pos1.x + value * value * this.pos2.x;
            this._obj.y = (1 - value) * (1 - value) * this.pos0.y + 2 * value * (1 - value) * this.pos1.y + value * value * this.pos2.y;
        }

        public play(time: number, ease?: Function) {
            var d = Promise.defer<void>();
            egret.Tween.get(this)
                .to({ factor: 1 }, time, ease)
                .call(() => {
                    d.resolve(null);
                }, this);
            return d.promise();
        }
    }

    /**
     * 播放贝塞尔曲线（返回一个控制器，调用stop()可以停止动画，调用complete.then 可以监听完成回调）
     * @param obj 需要进行贝塞尔曲线的对象
     * @param posArr 进行贝塞尔曲线的三个坐标
     * @param time 进行贝塞尔曲线的总时间
     * @param ease egret.Ease.xxx
     */
    export function playBeiSaiEr(obj: any, posArr: Array<egret.Point>, time: number, ease?: Function): { stop: () => void, complete: Promise.Promise<void> } {
        var promise = new BeiSaiEr(obj, posArr).play(time, ease);
        return { stop: () => { egret.Tween.removeTweens(obj) }, complete: promise };
    }

    /**
     * 根据组名加载一组资源。
     * @param name 要加载资源组的组名。
     * @param priority 加载优先级,可以为负数,默认值为 0。
     * <br>低优先级的组必须等待高优先级组完全加载结束才能开始，同一优先级的组会同时加载。
     */
    export function loadGroup(name: string, priority?: number, onProgress?: (evt3: RES.ResourceEvent) => void) {
        var d = Promise.defer<RES.ResourceEvent>();
        var name = name;
        if (RES.isGroupLoaded(name)) {
            d.resolve(null);
        } else {
            var loadCompFunc: (evt: RES.ResourceEvent) => void = (evt: RES.ResourceEvent) => {
                if (d.status === Promise.Status.Unfulfilled && evt.groupName === name) {
                    RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, loadCompFunc, this);
                    RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, loadError, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, loadProgress, this);
                    d.resolve(evt);
                }
            };

            var loadError: (evt2: RES.ResourceEvent) => void = (evt2: RES.ResourceEvent) => {
                if (evt2.groupName == name) {
                    d.reject({ message: evt2.groupName + "加载出错" });
                }
            };

            var loadProgress: (evt3: RES.ResourceEvent) => void = (evt3: RES.ResourceEvent) => {
                //每加载完一个文件
                if (evt3.groupName == name) {
                    if (onProgress)
                        onProgress(evt3);
                }
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, loadCompFunc, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, loadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, loadProgress, this);
            RES.loadGroup(name, priority);
        }
        return d.promise();
    }

    /**
     * 加载一张图片（本方法可以保证图片是加载完的，add后可以立刻显示出来且可以获取宽高）
     * @param resKey resource/default.res.json 里所写的key，或者一个网址
     */
    export function loadImage(resKey: string) {
        var d = Promise.defer<eui.Image>();
        var getResImpl: eui.IAssetAdapter = Main.instance.stage.getImplementation("eui.IAssetAdapter");
        getResImpl.getAsset(resKey, (content: any, source: string) => {
            if (source == resKey) {
                var image: eui.Image = new eui.Image(content);
                d.resolve(image);
            }
        }, this);
        return d.promise();
    }

    /** 解析 x,y 类型的字符串 */
    export function parsePoint(val: string): egret.Point {
        if (!val) {
            egret.error(`无法解析 ${val} ==> egret.Point`);
            return null;
        }
        let arr = val.split(',');
        if (arr.length != 2) {
            egret.error(`无法解析 ${val} ==> egret.Point`);
            return null;
        }

        let x = arr[0];
        let y = arr[1];
        return new egret.Point(parseInt(x), parseInt(y));
    }

    /** 
     * 随机一个范围内的数字（整数），范围的左边是闭区间，右边是开区间
     */
    export function random(min: number, max: number) {
        let d = Math.floor(max) - Math.floor(min);
        return min + Math.floor(Math.random() * d);
    }

    /**
     * 将一个数组随机打乱
     * @param arr
     */
    export function Shuffle<T>(arr: Array<T>) {
        for (var i = 0; i < arr.length; i++) {
            var index = random(0, arr.length);
            QuickSwap(arr, index, i);
        }
    }

    /**
     * 数组的两个元素交换
     * @param arr
     * @param idx1
     * @param idx2
     */
    export function QuickSwap<T>(arr: Array<T>, idx1: number, idx2: number) {
        var temp: T = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    export function showText(str: string) {
        let label = new eui.Label(str);
        label.textColor = 0xFFFFFF;
        label.stroke = 3;
        label.strokeColor = 0x401303;
        label.size = 40;
        label.fontFamily = "黑体";
        label.horizontalCenter = 0;
        label.verticalCenter = 0;
        label.touchEnabled = false;
        CoreCollection.lyrs.TIP.addChild(label);

        egret.Tween.get(label).to(
            {
                verticalCenter: -100,
                alpha: 0
            }, 1000
        ).call(() => {
            CoreCollection.lyrs.TIP.removeChild(label);
        }, this);
    }

    /**
     * 格式化字符串  "xxx {0} {1} " 变成 ==> "xxx 参数1 参数2"
     */
    export function format(format: string, parameter: Array<string>): string {
        if (!parameter || parameter.length == 0)
            return format;
        parameter.forEach((param, idx) => {
            format = format.replace(`{${idx}}`, param);
        });
        return format;
    }
}

module tiled {


    interface ITiledMapData {
        /** 宽度（格子） */
        width: number;
        /** 高度（格子） */
        height: number;
        /** 每个格子宽度（像素） */
        tilewidth: number;
        /** 每个格子高度（像素） */
        tileheight: number;
        /** 图层 */
        layers: Array<ITiledMapLayerData>;
        /** 素材 */
        tilesets: Array<ITilesetData>;
    }

    interface ITiledMapLayerData {
        data: Array<number>;
        /** 宽度（格子） */
        width: number;
        /** 高度（格子） */
        height: number;
        name: string;
        type: string;
        visible: boolean;
        x: number;
        y: number;
        /** 透明度 */
        opacity: number;
    }

    interface ITilesetData {
        name: string;
        /** 第一个块id */
        firstgid: number;
        /** 图片地址 */
        image: string;
        /** 像素 */
        imageheight: number;
        /** 像素 */
        imagewidth: number;
        margin: number;
        spacing: number;
        /** 总格子数 */
        tilecount: number;
        /** 列数 */
        columns: number;
        /** 格子高度（像素） */
        tileheight: number;
        /** 格子宽度（像素） */
        tilewidth: number;
    }



    /** 初始化 TiledMap 素材库  */
    function loadTilesets(tilesets: Array<ITilesetData>, baseUrl: string) {
        var d = Promise.defer<Tilesets>();
        //实例，用于返回
        let sheets: { [key: number]: egret.SpriteSheet } = {};
        let loadImagePeomiseList = [];

        //加载图片
        for (let i = 0; i < tilesets.length; i++) {
            let image = tilesets[i].image;
            let startPos = image.lastIndexOf("\\");
            if (startPos < 0) {
                startPos = image.lastIndexOf("/");
            }
            let fileName = image.substr(startPos + 1);
            let url = baseUrl + fileName;
            loadImagePeomiseList.push(common.loadResByUrl(url, RES.ResourceItem.TYPE_IMAGE));
        }

        //所有图片全部加载完毕
        Promise.when(loadImagePeomiseList).then(textures => {
            for (let i = 0; i < tilesets.length; i++) {
                let tileset_item = tilesets[i];
                let texture_item = textures[i];
                let firstgid = tileset_item.firstgid;
                let tilewidth = tileset_item.tilewidth;
                let tileheight = tileset_item.tileheight;
                let tilecount = tileset_item.tilecount;
                let length = tilecount;
                let columns = tileset_item.columns;
                let rows = tilecount / columns;
                let sheet = new egret.SpriteSheet(texture_item);
                sheets[firstgid] = sheet;
                let gidIdx = firstgid;
                for (let i = 0; i < length; i++) {
                    let name = gidIdx.toString();
                    let row = Math.floor(i % columns);
                    let col = Math.floor(i / columns);
                    let startX = row * tilewidth;
                    let startY = col * tileheight;
                    sheet.createTexture(name, startX, startY, tilewidth, tileheight);
                    gidIdx++;
                }
            }
            d.resolve(new Tilesets(sheets, tilesets[0].tilewidth, tilesets[0].tileheight));
        }).fail(err => {
            d.reject(err);
        });

        return d.promise();
    }

    /** TiledMap 素材库 */
    class Tilesets {
        /** key = firstgid */
        private sheets: { [key: number]: egret.SpriteSheet } = {};
        private _gidSorted: Array<number> = [];
        private _tilewidth: number;
        private _tileheight: number;

        constructor(sheetsDict: { [key: number]: egret.SpriteSheet }, tilewidth: number, tileheight: number) {
            this.sheets = sheetsDict;
            this._tilewidth = tilewidth;
            this._tileheight = tileheight;
            //对gid进行排序
            let gids: Array<number> = [];
            for (let gid in this.sheets) {
                gids.push(parseInt(gid));
            }
            gids = gids.sort((a, b) => { return a - b; });
            this._gidSorted = gids;
        }

        public get tilewidth(): number {
            return this._tilewidth;
        }

        public get tileheight(): number {
            return this._tileheight;
        }

        public getTileByGid(gid: number): egret.Bitmap {
            if (gid == 0) {
                return null;
            }
            let sheet: egret.SpriteSheet = null;
            for (let i = 0; i < this._gidSorted.length; i++) {
                let idx = this._gidSorted[i];
                let nextIdx = this._gidSorted[i + 1];
                if (gid >= idx && ((gid < nextIdx) || (nextIdx == undefined))) {
                    sheet = this.sheets[idx];
                    break;
                }
            }

            if (!sheet) {
                egret.error("不存在gid：" + gid);
                return null;
            }
            else {
                let texture = sheet.getTexture(gid.toString());
                if (!texture) {
                    return null;
                }
                else {
                    let bitmap = new egret.Bitmap(texture);
                    bitmap.touchEnabled = false;
                    return bitmap;
                }
            }
        }
    }


    class TiledLayer extends egret.Sprite {
        private sheets: Tilesets;
        private layerDaya: ITiledMapLayerData;

        constructor(layerDaya: ITiledMapLayerData, sheets: Tilesets) {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
            this.layerDaya = layerDaya;
            this.sheets = sheets;
            this.render();
        }

        private render() {
            let tileWidth = this.sheets.tilewidth;
            let tileHeight = this.sheets.tileheight;

            let rows = this.layerDaya.height;
            let cols = this.layerDaya.width;

            let dataIdx = 0;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let gid = this.layerDaya.data[dataIdx++];
                    let image = this.sheets.getTileByGid(gid);
                    if (!image) {
                        continue;
                    }
                    image.x = col * tileWidth;
                    image.y = row * tileHeight;
                    this.addChild(image);
                }
            }
        }

    }

    export interface ITiledMap extends egret.Sprite {
        rawMapData: ITiledMapData;
        dispose(): void;
    }

    class TiledMap extends egret.Sprite implements ITiledMap {

        private _layers: Array<TiledLayer>;
        private _rawMapData: ITiledMapData;

        constructor(rawMapData: ITiledMapData, layers: Array<TiledLayer>) {
            super();
            this.touchEnabled = false;
            this.touchChildren = true;
            this._rawMapData = rawMapData;
            this._layers = layers;
            this.width = this._rawMapData.tilewidth * this._rawMapData.width;
            this.height = this._rawMapData.tileheight * this._rawMapData.height;
            for (let i = 0; i < this._layers.length; i++) {
                let layer = this._layers[i];
                this.addChild(layer);
            }
        }

        public get rawMapData(): ITiledMapData {
            return this._rawMapData;
        }

        public dispose() {
        }
    }

    /** json地图文件地址，例如： /resource/mapData/testMap.json */
    export function creat(jsonUrl: string) {
        let d = Promise.defer<TiledMap>();
        let baseUrl = decodeURIComponent(jsonUrl);
        let lastIndex: number = baseUrl.lastIndexOf("/");
        baseUrl = baseUrl.slice(0, lastIndex + 1);

        let layers: Array<TiledLayer> = [];
        let rawMapData: ITiledMapData;

        common.loadResByUrl(jsonUrl, RES.ResourceItem.TYPE_JSON).then(jsonData => {
            rawMapData = jsonData;
            return loadTilesets(rawMapData.tilesets, baseUrl);
        }).then(sheets => {
            for (let i = 0; i < rawMapData.layers.length; i++) {
                let layerData = rawMapData.layers[i];
                let layer = new TiledLayer(layerData, sheets);
                layers.push(layer);
            }
            d.resolve(new TiledMap(rawMapData, layers));
        }).fail(err => {
            d.reject(err);
        })

        return d.promise();
    }
}








module Net {

    /**
     * 错误信息映射表
     * key = 错误代码
     * vale = format字符串
     */
    let errorMessageMap: { [key: number]: string } = {};

    export function initErrorMessageMap() {
        let d = Promise.defer<void>();

        common.loadResByUrl("resource/errorMessageMap.json").then(errMsg => {
            let data = <Array<{ i: number; f: string }>>errMsg;
            data.forEach(item => {
                errorMessageMap[item.i] = item.f;
            })
            d.resolve(null);
        }).fail(err => {
            d.reject(err);
        });

        return d.promise();
    }

    export class ProxyBase {
        private _url: string = "";

        constructor(serverUrl: string) {
            this._url = serverUrl;
        }

        private downloadString(url) {
            var d = Promise.defer<string>();

            var req = new egret.HttpRequest();
            req.responseType = egret.HttpResponseType.TEXT;
            req.once(egret.Event.COMPLETE, (evt: egret.Event) => {
                d.resolve(req.response);
            }, this);
            req.once(egret.IOErrorEvent.IO_ERROR, (evt: egret.IOErrorEvent) => {
                d.reject({ message: `http IO error : ${evt.data}` });
            }, this);
            req.open(url, egret.HttpMethod.GET);
            req.withCredentials = true;
            req.send();

            return d.promise();
        }

        protected send(d: Promise.Deferred<any>, msgID: any, data: any) {
            CoreCollection.lockScreen();
            var url = this._url + '?msgID=' + encodeURIComponent(msgID) + '&data=' + encodeURIComponent(JSON.stringify(data));
            if (DEBUG) {
                //追踪Cookie问题
                egret.log(`==> msgID=${msgID} Cookie=${document.cookie}`);
            }
            this.downloadString(url).then(response => {
                CoreCollection.unLockScreen();
                try {
                    var response_json = JSON.parse(response);
                    if (response_json.result != 1) {
                        let error = errorMessageMap[response_json.result];
                        let message = `Http Request catch an error. msgId=${msgID} result = ${response_json.result}  参考信息：${common.format(error, response_json.data)}`;
                        this.showHttpError(message);
                        d.reject({ message: message });
                    } else {
                        d.resolve(response_json.data);
                    }
                } catch (e) {
                    let message = `Http Request catch an error. msgId=${msgID} data = ${JSON.stringify(data)} message:${e.message}`;
                    this.showHttpError(message);
                    d.reject({ message: message, error: e });
                }
            }).fail(err => {
                this.showHttpError(err.message);
                CoreCollection.unLockScreen();
                d.reject(err);
            })
        }

        protected showHttpError(message: string): void {
            egret.error(message);
            // control.alert(message);
        }
    }
}


module temp {
    export class skeletonBase extends egret.DisplayObjectContainer {
        protected _pos: egret.Point = null;
        protected _animation: dragonBones.FastAnimation;
        public _armature: dragonBones.FastArmature;
        public ar: dragonBones.EgretArmatureDisplay;
        public static dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        /**
         * 创建龙骨骼动画
         * @param dragonbonesData 龙谷歌导出的动画json文件
         * @param textureData 龙谷歌导出的纹理json文件
         * @param texture 龙谷歌导出的纹理png文件
         */
        public constructor(dragonbonesData: any, textureData: any, texture: any) {
            super();
            this.touchEnabled = false;
            let name = "test";
            this.ar = skeletonBase.dragonbonesFactory.buildArmatureDisplay(name);
            if (!this.ar) {
                if (!dragonbonesData || !textureData || !texture) {
                    console.error("dragonbonesData 或 textureData 或 texture 为null");
                    return;
                }
                //构建骨骼
                //var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
                if (dragonbonesData.armature && dragonbonesData.armature[0]) {
                    dragonbonesData.armature[0].name = name;
                }
                dragonbonesData.name = textureData.name = name;
                skeletonBase.dragonbonesFactory.parseDragonBonesData(dragonbonesData);
                skeletonBase.dragonbonesFactory.parseTextureAtlasData(textureData, texture);
                this.ar = skeletonBase.dragonbonesFactory.buildArmatureDisplay(name);
            }
            //dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            //dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            //var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("armature");	//普通模式，性能低，功能多
            //var armature:dragonBones.FastArmature = dragonbonesFactory.buildFastArmature(dragonbonesData.armature[0].name); //快速模式，性能高，功能少
            //armature.enableAnimationCache(30);
            this._animation = this.ar.animation;
            this._armature = this.ar.armature;

            this.ar.x = 0;
            this.ar.y = 0;
            this.addChild(this.ar);
            //dragonBones.WorldClock.clock.add(armature);
            this.ar.animation.gotoAndPlayByProgress(this.animation.animationNames[0], 0, 0);
        }

        public set pos(val: egret.Point) {
            this._pos = val;
            this.x = val.x;
            this.y = val.y;
        }

        public get pos(): egret.Point {
            return this._pos;
        }

        /*
         * FastAnimation实例隶属于FastArmature,用于控制FastArmature的动画播放。和Animation相比，FastAnimation为了优化性能，不支持动画融合，在开启缓存的情况下，不支持无极的平滑补间
         * 详情见Egret的API文档 dragonBones.FastAnimation
         */
        public get animation(): dragonBones.FastAnimation {
            return this._animation;
        }

        /*
         * FastArmature 是 DragonBones 高效率的骨骼动画系统。他能缓存动画数据，大大减少动画播放的计算不支持动态添加Bone和Slot，换装请通过更换Slot的dispaly或子骨架childArmature来实现
         * 详情见Egret的API文档 dragonBones.FastArmature
         */
        public get armature(): dragonBones.FastArmature {
            return this._armature;
        }

        /**
         * 时间缩放倍数
         */
        public get timeScale(): number {
            return this._animation.timeScale;
        }

        public set timeScale(val: number) {
            this._animation.timeScale = val;
        }

        /**
         * 播放指定动画
         * @param lable 美术制作的动画名称（找美术要）
         */
        public playLable(lable: string) {
            var d = Promise.defer<void>();
            if (this._animation && this._animation.animationNames && this._animation.animationNames.indexOf(lable) > -1) {
                this.ar.once(dragonBones.AnimationEvent.LOOP_COMPLETE, (evt: dragonBones.AnimationEvent) => {
                    d.resolve(null);
                }, this);
                this.animation.gotoAndPlayByFrame(lable, 0, -1);
            }
            return d.promise();
        }

        /**
         * 播放动画一次，并停在最后一帧
         * @param lable
         */
        public playAndStopAtLast(lable: string) {
            var time = this.getActionDuration(lable);
            this.animation.gotoAndPlayByProgress(lable, 0, -1);
            egret.setTimeout(() => {
                this.animation.stop();
            }, this, time - 100);
            // for (var i = 0; i < this.animation.animationDataList.length; i++) {
            //     var action = this.animation.animationDataList[i].name;
            //     if (action == lable) {
            //         var time = this.animation.animationDataList[i].duration;
            //         break;
            //     }
            // }
            //this.animation.g(lable);
        }

        public resumeAction() {
            this.animation.play();
        }



        protected _playLable(lable: string, onComplete: () => void) {
            if (this._animation && this._animation.animationNames && this._animation.animationNames.indexOf(lable) > -1) {
                this.ar.once(dragonBones.AnimationEvent.LOOP_COMPLETE, (evt: dragonBones.AnimationEvent) => {
                    onComplete();
                }, this);
                this.animation.gotoAndPlayByFrame(lable, 0, -1);
            }
        }


        public dispose() {
            //dragonBones.WorldClock.clock.remove(this._armature);
            //this._animation.dispose();
            this.ar.dispose();
            //this._armature.dispose();
        }

        public getActionDuration(label: string): number {
            if (this._animation.animations[label]) {
                return this._animation.animations[label].duration * 1000;
            } else {
                return 0;
            }
        }
    }

    /**
     * 加载一个swf动画。swf需要已文件夹形式放在resource/bones/ （通过done方法取得结果）
     * @param BonesName 龙骨骼导出的数据，每个角色导出的文件有3个，需要放在同一个文件夹里，这个参数就是这个文件夹的名字（支持中文）
     *
     */
    export function loadBones() {
        var d = Promise.defer<skeletonBase>();

        //TODO:luowende 后面需要改为zip包方式加载
        var textureUrl = "resource/test/1/texture.png";
        var textureDataUrl = "resource/test/1/texture.json";
        var dragonbonesDataUrl = "resource/test/1/1.json";

        var t = [common.loadResByUrl(textureUrl), common.loadResByUrl(textureDataUrl), common.loadResByUrl(dragonbonesDataUrl)];
        Promise.when(t).then(result => {
            var dragonbonesData = result[2];
            var textureData = result[1];
            var texture = result[0];
            var skeleton = new skeletonBase(dragonbonesData, textureData, texture);

            d.resolve(skeleton);
        });
        return d.promise();
    }

}
