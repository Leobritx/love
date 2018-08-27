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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(maze, c, r, cell) {
        var _this = _super.call(this) || this;
        _this.maze = maze;
        _this.data = new PlayerData(cell && cell.col || c, cell && cell.row || r);
        _this.loadImage(ResourceManager.PlBgUrl);
        _this.pivot(_this.width * 0.5, _this.height * 0.5).scale(0.5, 0.5);
        _this.RefreshPlayerPos();
        return _this;
    }
    Player.prototype.RefreshPlayerPos = function () {
        var mzPos = this.maze.CellToMazePos(this.data.playerCell);
        var pos = this.maze.MazePosToPos(mzPos.x, mzPos.y);
        this.pos(pos.x, pos.y);
    };
    Player.prototype.SetCurCellByParams = function (c, r) {
        this.data.playerCell.col = c || 0;
        this.data.playerCell.row = r || 0;
    };
    Player.prototype.SetCurCell = function (cell) {
        this.data.playerCell = cell;
    };
    Player.prototype.GetCurCell = function () {
        return this.data.playerCell;
    };
    return Player;
}(Laya.Sprite));
//# sourceMappingURL=Player.js.map