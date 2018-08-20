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
        Laya.timer.loop(500, _this, _this.update);
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
    Maze.prototype.CheckValidStep = function (cur, next) {
        var dr = next.row - cur.row;
        var dc = next.col - cur.col;
        console.log(dc, dr);
        if ((!!dr == !!dc) || Math.abs(dc) > 1 || Math.abs(dr) > 1) {
            console.log("false", dc, dr);
            return false;
        }
        var mazeArr = this.data.mazeArr;
        var cell = mazeArr[cur.col][cur.row];
        if (cell[0] == 0 && dc == -1 && dr == 0) { //left
            return false;
        }
        if (cell[1] == 0 && dc == 0 && dr == -1) { //up
            return false;
        }
        if (cell[2] == 0 && dc == 1 && dr == 0) { //right
            return false;
        }
        if (cell[3] == 0 && dc == 0 && dr == 1) { //down
            return false;
        }
        return true;
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
                        this.drawWall(col, row, wall, Maze.mzWallWidth);
                    }
                    else {
                        this.drawWall(col, row, wall, 1, "#ffffff");
                        this.drawCircle(col, row, wall);
                    }
                }
            }
        }
    };
    //画一面墙
    Maze.prototype.drawWall = function (c, r, w, wWidth, color) {
        var cW = this.CellWidth;
        var cH = this.CellHeight;
        var mwClr = color || Maze.mzWallColor;
        if (w == 0) {
            //画左边的墙
            this.graphics.drawLine(c * cW, r * cH, c * cW, (r + 1) * cH, mwClr, wWidth);
        }
        if (w == 1) {
            //画上边的墙
            this.graphics.drawLine(c * cW, r * cH, (c + 1) * cW, r * cH, mwClr, wWidth);
        }
        if (w == 2) {
            //画右边的墙
            this.graphics.drawLine((c + 1) * cW, r * cH, (c + 1) * cW, (r + 1) * cH, mwClr, wWidth);
        }
        if (w == 3) {
            //画下边的墙
            this.graphics.drawLine(c * cW, (r + 1) * cH, (c + 1) * cW, (r + 1) * cH, mwClr, wWidth);
        }
    };
    //给墙的缝隙画上
    Maze.prototype.drawCircle = function (c, r, w) {
        var cW = this.CellWidth;
        var cH = this.CellHeight;
        var mwClr = Maze.mzWallColor;
        var mwWidth = Maze.mzWallWidth;
        if (w == 0) {
            this.graphics.drawCircle(c * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.graphics.drawCircle(c * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
        if (w == 1) {
            this.graphics.drawCircle(c * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.graphics.drawCircle((c + 1) * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
        if (w == 2) {
            this.graphics.drawCircle((c + 1) * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.graphics.drawCircle((c + 1) * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
        if (w == 3) {
            this.graphics.drawCircle(c * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.graphics.drawCircle((c + 1) * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
    };
    Maze.prototype.drawPathByCell = function (cell) {
    };
    Maze.prototype.drawPathByCellParam = function (col, row) {
    };
    ///Event Handlers
    Maze.prototype.update = function (e) {
        var nextCell = this.pathArr.shift();
        if (nextCell != null) {
            var curCell = this.ownerPlayer.GetCurCell();
            if (!curCell.Equal(nextCell)) {
                this.ownerPlayer.SetCurCell(nextCell);
                var pos = this.CellToPos(nextCell);
                Laya.Tween.to(this.ownerPlayer, { x: pos.x, y: pos.y }, 200);
            }
        }
    };
    Maze.prototype.onTouchDown = function (e) {
        this.pathArr = new Array();
        var curCell = this.ownerPlayer.GetCurCell();
        this.pathArr.push(curCell);
        //添加鼠标移到侦听
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    Maze.prototype.onTouchUp = function (e) {
        //添加鼠标移到侦听
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.off(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    Maze.prototype.onTouchMove = function (e) {
        //console.log("onTouchMove",Laya.stage.mouseX,Laya.stage.mouseY);
        var mzPos = this.convertPosToMaze(Laya.stage.mouseX, Laya.stage.mouseY);
        var nextCell = this.PosPointToCell(mzPos);
        var curCell = this.pathArr.pop() || this.ownerPlayer.GetCurCell();
        this.pathArr.push(curCell);
        if (this.CheckValidStep(curCell, nextCell)) {
            if (!nextCell.Equal(curCell)) {
                this.pathArr.push(nextCell);
            }
        }
    };
    Maze.prototype.convertPosToMaze = function (x, y) {
        var rx = x - this.x;
        rx = rx > 0 ? rx : 0;
        rx = rx - this.width > 0 ? this.width : rx;
        var ry = y - this.y;
        ry = ry > 0 ? ry : 0;
        ry = rx - this.height > 0 ? this.height : ry;
        return new Laya.Point(rx, ry);
    };
    Maze.mzBgUrl = "gameui/brickbg.png";
    Maze.mzWallColor = "#734d26";
    Maze.mzWallWidth = 8;
    return Maze;
}(Laya.Sprite));
//# sourceMappingURL=Maze.js.map