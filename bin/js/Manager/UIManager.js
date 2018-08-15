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
        UIManager.Instance = this;
    }
    UIManager.prototype.openUI = function (type, obj, call) {
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
                ui = eval("new " + UIType[type] + "()");
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
    UIManager.prototype.hideUI = function (type) {
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
    UIManager.prototype.switchUI = function (type, obj, call) {
        if (obj === void 0) { obj = null; }
        if (call === void 0) { call = null; }
        var topUi = this.openArray.pop();
        topUi.hide();
        this.openUI(type, obj, call);
    };
    //获取已经打开的UI
    UIManager.prototype.getUI = function (type) {
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