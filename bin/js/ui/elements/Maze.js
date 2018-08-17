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
        _this.pathArr = new Array();
        //迷宫UI表现初始化
        //设置迷宫背景
        _this.loadImage(Maze.mzBgUrl, 0, 0, w, h);
        _this.pos(x, y);
        _this.CellWidth = _this.width / MazeData.COLUMN_NUM; //需要从测试看是否向下取整
        _this.CellHeight = _this.height / MazeData.ROW_NUM;
        //添加玩家
        _this.ownerPlayer = new Player(_this, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        _this.otherPlayer = new Player(_this, 0, 0);
        _this.ownerPlayer.on(Laya.Event.MOUSE_DOWN, _this, _this.onTouchDown);
        var fps = 60; //帧率
        var deltaTime = 1000 / fps;
        Laya.timer.loop(1000 / 60, _this, _this.update);
        _this.DrawWalls();
        return _this;
    }
    Maze.prototype.PosPointToCell = function (pos) {
        return this.PosToCell(pos.x, pos.y);
    };
    Maze.prototype.PosToCell = function (x, y) {
        var cell = new MazeCell(x / this.CellWidth, y / this.CellHeight);
        return cell;
    };
    Maze.prototype.CellParamsToPos = function (col, row) {
        var pos = new Laya.Point();
        pos.x = Math.floor((col + 0.5) * this.CellWidth);
        pos.y = Math.floor((row + 0.5) * this.CellHeight);
        return pos;
    };
    Maze.prototype.CellToPos = function (cell) {
        return this.CellParamsToPos(cell.col, cell.row);
    };
    ///Drawing
    //画墙
    Maze.prototype.DrawWalls = function () {
        var mazeArr = this.data.mazeArr;
        for (var col = 0; col < MazeData.COLUMN_NUM; col++) {
            for (var row = 0; row < MazeData.ROW_NUM; row++) {
                for (var wall = 0; wall < 4; wall++) {
                    //0为有墙，1为没有墙
                    if (mazeArr[col][row][wall] == 0) {
                        this.drawWall(col, row, wall);
                    }
                    else {
                        this.drawCircle(col, row, wall);
                    }
                }
            }
        }
    };
    //画一面墙
    Maze.prototype.drawWall = function (c, r, w) {
        var cW = this.CellWidth;
        var cH = this.CellHeight;
        var mwClr = Maze.mzWallColor;
        var mwWidth = Maze.mzWallWidth;
        if (w == 0) {
            //画左边的墙
            this.graphics.drawLine(c * cW, r * cH, c * cW, (r + 1) * cH, mwClr, mwWidth);
        }
        if (w == 1) {
            //画上边的墙
            this.graphics.drawLine(c * cW, r * cH, (c + 1) * cW, r * cH, mwClr, mwWidth);
        }
        if (w == 2) {
            //画右边的墙
            this.graphics.drawLine((c + 1) * cW, r * cH, (c + 1) * cW, (r + 1) * cH, mwClr, mwWidth);
        }
        if (w == 3) {
            //画下边的墙
            this.graphics.drawLine(c * cW, (r + 1) * cH, (c + 1) * cW, (r + 1) * cH, mwClr, mwWidth);
        }
    };
    //给墙的缝隙画上
    Maze.prototype.drawCircle = function (c, r, w) {
        var cW = this.CellWidth;
        var cH = this.CellHeight;
        var mwClr = Maze.mzWallColor;
        var mwWidth = Maze.mzWallWidth;
        if (w == 0) {
            this.graphics.drawCircle(c * cW, r * cH, mwWidth / 2, mwClr, mwClr, 1);
            this.graphics.drawCircle(c * cW, (r + 1) * cH, mwWidth / 2, mwClr, mwClr, 1);
        }
        if (w == 1) {
            this.graphics.drawCircle(c * cW, r * cH, mwWidth / 2, mwClr, mwClr, 1);
            this.graphics.drawCircle((c + 1) * cW, r * cH, mwWidth / 2, mwClr, mwClr, 1);
        }
        if (w == 2) {
            this.graphics.drawCircle((c + 1) * cW, r * cH, mwWidth / 2, mwClr, mwClr, 1);
            this.graphics.drawCircle((c + 1) * cW, (r + 1) * cH, mwWidth / 2, mwClr, mwClr, 1);
        }
        if (w == 3) {
            this.graphics.drawCircle(c * cW, (r + 1) * cH, mwWidth / 2, mwClr, mwClr, 1);
            this.graphics.drawCircle((c + 1) * cW, (r + 1) * cH, mwWidth / 2, mwClr, mwClr, 1);
        }
    };
    Maze.prototype.drawPathByCell = function (cell) {
    };
    Maze.prototype.drawPathByCellParam = function (col, row) {
    };
    ///Event Handlers
    Maze.prototype.update = function (e) {
        var nextCell = this.pathArr.pop();
        if (nextCell != null) {
            var pos = this.CellToPos(nextCell);
            Laya.Tween.to(this.ownerPlayer, { x: pos.x, y: pos.y }, 1000 / 60);
        }
    };
    Maze.prototype.onTouchDown = function (e) {
        var mzPos = this.convertPosToMaze(Laya.stage.mouseX, Laya.stage.mouseY);
        var curCell = this.PosPointToCell(mzPos);
        this.pathArr.push(curCell);
        //添加鼠标移到侦听
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    Maze.prototype.onTouchUp = function (e) {
        this.pathArr = new Array();
        //添加鼠标移到侦听
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.off(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    Maze.prototype.onTouchMove = function (e) {
        var mzPos = this.convertPosToMaze(Laya.stage.mouseX, Laya.stage.mouseY);
        var curCell = this.PosPointToCell(mzPos);
        for (var i = 0; i < this.pathArr.length; i++) {
            var element = this.pathArr[i];
            if (element.col == curCell.col && element.row == curCell.row) {
                return;
            }
        }
        this.pathArr.push(curCell);
    };
    Maze.prototype.convertPosToMaze = function (x, y) {
        return new Laya.Point(x - this.x > 0 ? x - this.x : 0, y - this.y > 0 ? y - this.y : 0);
    };
    Maze.mzBgUrl = "gameui/brickbg.png";
    Maze.mzWallColor = "#ffffff";
    Maze.mzWallWidth = 8;
    return Maze;
}(Laya.Sprite));
//# sourceMappingURL=Maze.js.map