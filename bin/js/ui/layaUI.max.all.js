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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var UI;
    (function (UI) {
        var GamePageUI = /** @class */ (function (_super) {
            __extends(GamePageUI, _super);
            function GamePageUI() {
                return _super.call(this) || this;
            }
            GamePageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.GamePageUI.uiView);
            };
            GamePageUI.uiView = { "type": "View", "props": { "width": 600, "height": 1000 }, "child": [{ "type": "Label", "props": { "y": 100, "width": 300, "var": "lblTimer", "text": "当前阶段", "height": 30, "fontSize": 28, "font": "Arial", "color": "#10aebc", "centerX": 0, "align": "center" } }] };
            return GamePageUI;
        }(View));
        UI.GamePageUI = GamePageUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var MainPageUI = /** @class */ (function (_super) {
            __extends(MainPageUI, _super);
            function MainPageUI() {
                return _super.call(this) || this;
            }
            MainPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.MainPageUI.uiView);
            };
            MainPageUI.uiView = { "type": "View", "props": { "width": 600, "height": 1000 }, "child": [{ "type": "Button", "props": { "y": 550, "x": 150, "width": 300, "var": "btnStart", "skin": "gameui/button.png", "labelSize": 40, "labelFont": "Microsoft YaHei", "label": "Start", "height": 100, "sizeGrid": "5,10,10,5" } }, { "type": "Image", "props": { "y": 300, "x": 225, "width": 150, "var": "imgAvatar", "height": 150 } }, { "type": "Image", "props": { "y": 920, "x": 520, "width": 80, "var": "btnSetting", "skin": "gameui/setting.png", "height": 80 } }] };
            return MainPageUI;
        }(View));
        UI.MainPageUI = MainPageUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var SettingDialogUI = /** @class */ (function (_super) {
            __extends(SettingDialogUI, _super);
            function SettingDialogUI() {
                return _super.call(this) || this;
            }
            SettingDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.SettingDialogUI.uiView);
            };
            SettingDialogUI.uiView = { "type": "Dialog", "props": { "width": 400, "height": 360, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 400, "skin": "gameui/brickbg.png", "height": 360, "sizeGrid": "2,2,2,2" } }, { "type": "Button", "props": { "width": 119, "var": "btnConfirm", "skin": "gameui/button.png", "label": "Confirm", "height": 37, "centerY": 120, "centerX": 0, "sizeGrid": "5,10,10,5" } }, { "type": "Button", "props": { "y": 1, "x": 368, "width": 30, "var": "btnClose", "skin": "gameui/button.png", "label": "X", "height": 28, "sizeGrid": "5,10,10,5" } }, { "type": "HSlider", "props": { "width": 312, "value": 50, "skin": "template/ScrollBar/BackProgressBar.png", "sizeGrid": "0,15,0,15", "height": 45, "centerY": 30, "centerX": 0 } }] };
            return SettingDialogUI;
        }(Dialog));
        UI.SettingDialogUI = SettingDialogUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map