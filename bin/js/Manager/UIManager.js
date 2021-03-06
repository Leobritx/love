var UIType;
(function (UIType) {
    UIType[UIType["MainView"] = 0] = "MainView";
    UIType[UIType["GameView"] = 1] = "GameView";
    UIType[UIType["Login"] = 2] = "Login";
})(UIType || (UIType = {}));
var UIManager = /** @class */ (function () {
    function UIManager() {
        this.openArray = [];
        this.hideArray = [];
        this.viewMap = [];
        UIManager.Instance = this;
        //将View做一个映射
        this.viewMap[UIType.MainView] = function () { return new MainView(); };
        this.viewMap[UIType.GameView] = function () { return new GameView(); };
    }
    UIManager.prototype.OpenUI = function (type, obj, call) {
        if (obj === void 0) { obj = null; }
        if (call === void 0) { call = null; }
        var hide = false;
        var ui;
        var index;
        for (var i = 0; i < this.hideArray.length; i++) {
            //如果是隐藏的UI，显示UI
            if (this.hideArray[i].type == type) {
                index = i;
                hide = true;
                ui = this.hideArray[i];
                break;
            }
        }
        if (hide) {
            this.hideArray.splice(index, 1);
            this.openArray.push(ui);
        }
        else {
            for (var i = 0; i < this.openArray.length; i++) {
                //如果已经打开，刷新还是不响应看需求
                if (this.openArray[i].type == type)
                    return;
            }
            try {
                //将uitype的string和类名关联
                ui = this.viewMap[type]();
            }
            catch (e) {
                console.log(e);
                return;
            }
        }
        //打开UI
        ui.open(obj, new Laya.Handler(this, this.onOpen, [ui, call]));
        this.openArray.push(ui);
    };
    UIManager.prototype.HideUI = function (type) {
        var ui = null;
        var index;
        for (var i = 0; i < this.openArray.length; i++) {
            if (this.openArray[i].type == type) {
                ui = this.openArray[i];
                index = i;
            }
        }
        if (ui) {
            this.openArray.splice(index, 1);
            this.hideArray.push(ui);
        }
    };
    UIManager.prototype.SwitchUI = function (type, obj, call) {
        if (obj === void 0) { obj = null; }
        if (call === void 0) { call = null; }
        var topUi = this.openArray.pop();
        topUi.hide();
        this.OpenUI(type, obj, call);
    };
    //获取已经打开的UI
    UIManager.prototype.GetUI = function (type) {
        for (var i = 0; i < this.openArray.length; i++) {
            if (this.openArray[i].type == type)
                return this.openArray[i];
        }
        return null;
    };
    UIManager.prototype.onOpen = function (ui, call) {
        Laya.stage.addChild(ui);
        ui.visible = true;
        ui.show();
        if (call)
            call.run();
    };
    return UIManager;
}());
//# sourceMappingURL=UIManager.js.map