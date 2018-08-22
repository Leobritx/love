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
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        //定义UI类型
        _this.type = UIType.GameView;
        _this.init();
        return _this;
    }
    GameView.prototype.init = function () {
        Laya.stage.bgColor = "#f8d3e5";
        //添加迷宫
        this.curMaze = new Maze(0, 200, 600, 600);
        this.addChild(this.curMaze);
        new GameManager(this);
        GameManager.Instance.SwitchState(StateType.Init);
        Laya.timer.loop(1000 / (DisplayConfig.Instance.fps || 30), this, this.update);
    };
    GameView.prototype.update = function (e) {
        GameManager.Instance.UpdateCurState();
    };
    //UIBase接口
    GameView.prototype.open = function (obj, call) {
        //初始化UI，数据加载    
        //加载完后调用回调显示UI
        if (call) {
            call.run();
            call = null;
        }
    };
    GameView.prototype.close = function () {
    };
    GameView.prototype.hide = function () {
    };
    GameView.prototype.show = function () {
    };
    return GameView;
}(ui.UI.GamePageUI));
//# sourceMappingURL=GameView.js.map