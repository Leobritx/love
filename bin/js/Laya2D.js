// 程序入口
var GameApp = /** @class */ (function () {
    function GameApp() {
        GameApp.Instance = this;
        //初始化引擎
        Laya.MiniAdpter.init();
        Laya.init(600, 1000, Laya.WebGL);
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        Laya.stage.alignH = "center";
        Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
        //管理器
        new UIManager();
        new ResourceManager();
        new DataManager();
        new SettingManager();
        ResourceManager.Instance.Load(Laya.Handler.create(this, this.onloaded));
    }
    GameApp.prototype.onloaded = function () {
        UIManager.Instance.openUI(UIType.MainView);
    };
    return GameApp;
}());
new GameApp();
//# sourceMappingURL=Laya2D.js.map