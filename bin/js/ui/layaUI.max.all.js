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
            GamePageUI.uiView = { "type": "View", "props": { "width": 600, "height": 1000 }, "child": [{ "type": "Image", "props": { "y": 200, "x": 0, "width": 100, "skin": "comp/brick.png", "height": 100 } }, { "type": "Image", "props": { "y": 352, "x": 56, "width": 449, "var": "imgMazeBg", "skin": "comp/brick.png", "height": 373 } }, { "type": "Image", "props": { "y": 36, "x": 36, "width": 152, "skin": "comp/image.png", "height": 134 } }] };
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
            MainPageUI.uiView = { "type": "View", "props": { "width": 600, "height": 1000 }, "child": [{ "type": "Button", "props": { "y": 550, "x": 150, "width": 300, "var": "btnStart", "skin": "gameui/button.png", "labelSize": 40, "labelFont": "Microsoft YaHei", "label": "Start", "height": 100, "sizeGrid": "5,10,10,5" } }, { "type": "Image", "props": { "y": 300, "x": 225, "width": 150, "var": "imgAvatar", "skin": "comp/image.png", "height": 150 } }] };
            return MainPageUI;
        }(View));
        UI.MainPageUI = MainPageUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map