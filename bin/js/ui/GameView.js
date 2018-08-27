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
        //实例化迷宫
        this.curMaze = new Maze(0, 200, 600, 600);
        //创建迷雾
        this.fog = new Laya.Sprite();
        this.fog.loadImage(GameView.mzFogUrl, 0, 180, this.curMaze.width, this.curMaze.height + 40);
        //添加玩家
        this.ownerPlayer = new Player(this.curMaze, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        //this.otherPlayer = new Player(this.curMaze, 0, 0);
        this.ownerPlayer.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
        this.addChild(this.fog);
        this.addChild(this.curMaze);
        this.addChild(this.ownerPlayer);
        this.light = new Laya.Sprite();
        this.light.loadImage(GameView.mzLightUrl);
        this.light.pivot(this.light.width * 0.5, this.light.height * 0.5).scale(3, 3);
        var mzPos = this.curMaze.PosToMazePos(this.ownerPlayer.x, this.ownerPlayer.y);
        this.light.pos(mzPos.x, mzPos.y);
        this.curMaze.mask = this.light;
        new GameManager(this);
        GameManager.Instance.SwitchState(StateType.Init);
        Laya.timer.loop(1000 / (DisplayConfig.Instance.fps || 30), this, this.update);
    };
    GameView.prototype.SetTitle = function (title) {
        this.lblTimer.text = title;
    };
    GameView.prototype.onTouchDown = function (e) {
        this.curMaze.ClearPathData();
        var curCell = this.ownerPlayer.GetCurCell();
        this.curMaze.AddPathCell(curCell);
        //添加鼠标移到侦听
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    GameView.prototype.onTouchUp = function (e) {
        //添加鼠标移到侦听
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.off(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    GameView.prototype.onTouchMove = function (e) {
        if (Laya.timer.currFrame % 5 != 0) {
            return;
        }
        var nextCell = this.curMaze.PosToMazeCell(Laya.stage.mouseX, Laya.stage.mouseY);
        var curCell = this.curMaze.PopPathCell() || this.ownerPlayer.GetCurCell();
        this.curMaze.AddPathCell(curCell);
        if (this.curMaze.CheckValidStep(curCell, nextCell)) {
            if (!nextCell.Equal(curCell)) {
                this.curMaze.AddPathCell(nextCell);
                //this.curMaze.DrawPathByCell(nextCell);
            }
        }
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
        this.removeSelf();
    };
    GameView.prototype.hide = function () {
        this.visible = false;
    };
    GameView.prototype.show = function () {
    };
    GameView.mzFogUrl = "gameui/fog.png";
    GameView.mzLightUrl = "gameui/light.png";
    return GameView;
}(ui.UI.GamePageUI));
//# sourceMappingURL=GameView.js.map