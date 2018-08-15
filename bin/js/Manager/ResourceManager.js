var ResType;
(function (ResType) {
    ResType[ResType["Image"] = 0] = "Image";
    ResType[ResType["Text"] = 1] = "Text";
})(ResType || (ResType = {}));
var ResourceManager = /** @class */ (function () {
    function ResourceManager() {
        this.ROBOT_DATA_PATH = "res/data/l1.json";
        this.ROBOT_TEXTURE_PATH = "res/atlas/gameui.atlas";
        this.ROBOT_IMG_PATH = "res/atlas/gameui.png";
        this.resArr = [];
        ResourceManager.Instance = this;
    }
    ResourceManager.prototype.Load = function (call) {
        //资源图集预加载
        var resArray = [];
        //resArray.push({ url: this.ROBOT_DATA_PATH, type: Laya.Loader.JSON});
        resArray.push({ url: this.ROBOT_TEXTURE_PATH, type: Laya.Loader.ATLAS });
        resArray.push({ url: this.ROBOT_IMG_PATH, type: Laya.Loader.IMAGE });
        //  需要loading界面的话就在此函数增加一个回调函数
        Laya.loader.load(resArray, call);
    };
    ResourceManager.prototype.Get = function (type, obj, call) {
        if (obj === void 0) { obj = null; }
        if (call === void 0) { call = null; }
    };
    return ResourceManager;
}());
//# sourceMappingURL=ResourceManager.js.map