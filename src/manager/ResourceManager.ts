/*
* 资源管理器;
*/
interface ResBase {

}

enum ResType {
    Image, //
    Text,

}

class ResourceManager {
    public static Instance: ResourceManager;

    public static MzBgUrl = "gameui/brickbg.png";
    public static PlBgUrl = "gameui/player.png";

    //private DATA_PATH: string = "res/data/l1.json";
    private UI_TEXTURE_PATH: string = "res/atlas/gameui.atlas";
    private UI_IMG_PATH: string = "res/atlas/gameui.png";

    private resArr: ResBase[] = [];

    constructor() {
        ResourceManager.Instance = this;

    }

    public Load(call: Laya.Handler) {
        //资源图集预加载
        let resArray: Array<any> = [];
        //resArray.push({ url: this.DATA_PATH, type: Laya.Loader.JSON});
        resArray.push({ url: this.UI_TEXTURE_PATH, type: Laya.Loader.ATLAS });
        resArray.push({ url: this.UI_IMG_PATH, type: Laya.Loader.IMAGE });
        //  需要loading界面的话就在此函数增加一个回调函数
        Laya.loader.load(resArray, call);

    }

    public Get(type: ResType, obj: any[] = null, call: Laya.Handler = null) {

    }
}
