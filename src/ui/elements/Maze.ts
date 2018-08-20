class Maze extends Laya.Sprite {
    private static mzBgUrl = "gameui/brickbg.png";
    private static mzWallColor = "#734d26";
    private static mzWallWidth = 8;

    private data: MazeData;

    private CellWidth: number;
    private CellHeight: number;

    private ownerPlayer: Player;
    private otherPlayer: Player;

    private pathArr: Array<MazeCell>;

    constructor(x, y, w, h) {
        super();
        //初始化迷宫数据
        this.data = new MazeData();
        this.pathArr = new Array<MazeCell>();
        //迷宫UI表现初始化
        //设置迷宫背景
        this.loadImage(Maze.mzBgUrl, 0, 0, w, h);
        this.pos(x, y);

        this.CellWidth = this.width / MazeData.COLUMN_NUM;//需要从测试看是否向下取整
        this.CellHeight = this.height / MazeData.ROW_NUM;

        //添加玩家
        this.ownerPlayer = new Player(this, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        this.otherPlayer = new Player(this, 0, 0);

        this.ownerPlayer.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);

        let fps = 60;//帧率
        let deltaTime = 1000 / fps;
        Laya.timer.loop(500, this, this.update);

        this.DrawWalls();
    }

    public PosPointToCell(pos: Laya.Point) {
        return this.PosToCell(pos.x, pos.y);
    }

    public PosToCell(x: number, y: number) {
        let cell = new MazeCell(x / this.CellWidth, y / this.CellHeight);
        return cell;
    }

    public CellParamsToPos(col: number, row: number) {
        let pos = new Laya.Point();
        pos.x = Math.floor((col + 0.5) * this.CellWidth);
        pos.y = Math.floor((row + 0.5) * this.CellHeight);
        return pos;
    }

    public CellToPos(cell: MazeCell) {
        return this.CellParamsToPos(cell.col, cell.row);
    }

    public CheckValidStep(cur: MazeCell, next: MazeCell) {
        let dr = next.row - cur.row;
        let dc = next.col - cur.col;
        console.log(dc, dr)
        if ((!!dr == !!dc) || Math.abs(dc) > 1 || Math.abs(dr) > 1) {
            console.log("false", dc, dr)
            return false;
        }
        let mazeArr = this.data.mazeArr;
        let cell = mazeArr[cur.col][cur.row];
        if (cell[0] == 0 && dc == -1 && dr == 0) {//left
            return false;
        }
        if (cell[1] == 0 && dc == 0 && dr == -1) {//up
            return false;
        }
        if (cell[2] == 0 && dc == 1 && dr == 0) {//right
            return false;
        }
        if (cell[3] == 0 && dc == 0 && dr == 1) {//down
            return false;
        }
        return true;
    }

    ///Drawing
    //画墙
    private DrawWalls() {
        let mazeArr = this.data.mazeArr;
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
    }
    //画一面墙
    private drawWall(c, r, w, wWidth, color?) {
        let cW = this.CellWidth;
        let cH = this.CellHeight;
        let mwClr = color || Maze.mzWallColor;
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
    }
    //给墙的缝隙画上
    private drawCircle(c, r, w) {
        let cW = this.CellWidth;
        let cH = this.CellHeight;
        let mwClr = Maze.mzWallColor;
        let mwWidth = Maze.mzWallWidth;
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
    }

    private drawPathByCell(cell: MazeCell) {

    }

    private drawPathByCellParam(col: number, row: number) {

    }

    ///Event Handlers
    private update(e) {
        let nextCell = this.pathArr.shift();
        if (nextCell != null) {
            let curCell = this.ownerPlayer.GetCurCell();
            if (!curCell.Equal(nextCell)) {
                this.ownerPlayer.SetCurCell(nextCell);
                let pos = this.CellToPos(nextCell);
                Laya.Tween.to(this.ownerPlayer, { x: pos.x, y: pos.y }, 200);
            }
        }
    }

    private onTouchDown(e) {
        this.pathArr = new Array<MazeCell>();
        let curCell = this.ownerPlayer.GetCurCell();
        this.pathArr.push(curCell);
        //添加鼠标移到侦听
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);

        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    }

    private onTouchUp(e) {
        //添加鼠标移到侦听
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);

        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.off(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    }

    private onTouchMove(e) {
        //console.log("onTouchMove",Laya.stage.mouseX,Laya.stage.mouseY);
        let mzPos = this.convertPosToMaze(Laya.stage.mouseX, Laya.stage.mouseY);
        let nextCell = this.PosPointToCell(mzPos);
        let curCell = this.pathArr.pop() || this.ownerPlayer.GetCurCell();
        this.pathArr.push(curCell);
        if (this.CheckValidStep(curCell, nextCell)) {
            if (!nextCell.Equal(curCell)) {
                this.pathArr.push(nextCell);
            }
        }
    }

    private convertPosToMaze(x, y) {
        let rx = x - this.x;
        rx = rx > 0 ? rx : 0;
        rx = rx - this.width > 0 ? this.width : rx;
        let ry = y - this.y;
        ry = ry > 0 ? ry : 0;
        ry = rx - this.height > 0 ? this.height : ry;
        return new Laya.Point(rx, ry);
    }
}