var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//主逻辑控住类  
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        //定义UI类型
        _this.type = UIType.MainView;
        _this.init();
        return _this;
    }
    MainView.prototype.init = function () {
        var Event = Laya.Event;
        //初始化背景颜色
        Laya.stage.bgColor = "#94deec";
        this.btnStart.on(Event.CLICK, this, this.onStartClick);
        this.imgAvatar.loadImage("gameui/brick.png");
        this.btnSetting.on(Event.CLICK, this, this.onSettingClick);
    };
    MainView.prototype.onStartClick = function (e) {
        UIManager.Instance.SwitchUI(UIType.GameView);
    };
    MainView.prototype.onSettingClick = function (e) {
        this.addChild(new SettingDialog());
    };
    //UIBase接口
    MainView.prototype.open = function (obj, call) {
        //初始化UI，数据加载    
        //加载完后调用回调显示UI
        if (call) {
            call.run();
            call = null;
        }
    };
    MainView.prototype.close = function () {
        this.removeSelf();
    };
    MainView.prototype.hide = function () {
        this.visible = false;
    };
    //回调后会调用show，用于显示UI时的一些表现
    MainView.prototype.show = function () {
    };
    return MainView;
}(ui.UI.MainPageUI));
//# sourceMappingURL=MainView.js.map