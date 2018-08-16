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
var Maze = /** @class */ (function (_super) {
    __extends(Maze, _super);
    function Maze(x, y, w, h) {
        var _this = _super.call(this) || this;
        //初始化迷宫数据
        _this.data = new MazeData();
        //迷宫UI表现初始化
        //设置迷宫背景
        _this.loadImage(Maze.mzBgUrl, x, y, w, h);
        _this.CellWidth = _this.width / MazeData.COLUMN_NUM; //需要从测试看是否向下取整
        _this.CellHeight = _this.height / MazeData.ROW_NUM;
        //添加玩家
        var ownerPlayer = new Player(_this, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        var otherPlayer = new Player(_this, 0, 0);
        return _this;
    }
    Maze.prototype.PosPointToCell = function (pos) {
        return this.PosToCell(pos.x, pos.y);
    };
    Maze.prototype.PosToCell = function (x, y) {
        var cell = new MazeCell(x / this.CellWidth, y / this.CellHeight);
        return cell;
    };
    Maze.prototype.CellToPos = function (cell) {
        var pos = new Laya.Point();
        pos.x = Math.floor((cell.col + 0.5) * this.CellWidth);
        pos.y = Math.floor((cell.row + 0.5) * this.CellHeight);
        return pos;
    };
    Maze.mzBgUrl = "gameui/brickbg.png";
    return Maze;
}(Laya.Sprite));
//# sourceMappingURL=Maze.js.map