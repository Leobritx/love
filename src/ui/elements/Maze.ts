class Maze extends Laya.Sprite {
    private static mzWallColor = "#734d26";
    private static mzWallWidth = 8;

    private data: MazeData;

    private CellWidth: number;
    private CellHeight: number;

    private staticCanvas: Laya.Sprite;
    private pathArr: Array<MazeCell>;

    constructor(x, y, w, h) {
        super();
        //初始化迷宫数据
        this.data = new MazeData();
        this.ClearPathData();
        //迷宫UI表现初始化
        this.pos(x, y);
        //设置迷宫背景
        this.loadImage(ResourceManager.MzBgUrl, 0, 0, w, h);
        this.staticCanvas = new Laya.Sprite();
        //this.staticCanvas.width = w;
        //this.staticCanvas.height = h;
        this.addChild(this.staticCanvas);
        this.staticCanvas.cacheAsBitmap = true;

        this.CellWidth = this.width / MazeData.COLUMN_NUM;//需要从测试看是否向下取整
        this.CellHeight = this.height / MazeData.ROW_NUM;

        this.DrawWalls();
    }

    public MazePosPointToCell(pos: Laya.Point): MazeCell {
        return this.MazePosToCell(pos.x, pos.y);
    }

    public MazePosToCell(x: number, y: number): MazeCell {
        let cell = new MazeCell(x / this.CellWidth, y / this.CellHeight);
        return cell;
    }

    public CellParamsToMazePos(col: number, row: number) {
        let pos = new Laya.Point();
        pos.x = Math.floor((col + 0.5) * this.CellWidth);
        pos.y = Math.floor((row + 0.5) * this.CellHeight);
        return pos;
    }

    public CellToMazePos(cell: MazeCell) {
        return this.CellParamsToMazePos(cell.col, cell.row);
    }

    public PosToMazeCell(x, y) {
        let mzPos = this.PosToMazePos(x, y);
        return this.MazePosPointToCell(mzPos);
    }

    public MazeCellToPos(cell: MazeCell) {
        let mzPos = this.CellToMazePos(cell);
        return this.MazePosToPos(mzPos.x, mzPos.y);
    }

    public PosToMazePos(x, y) {
        let rx = x - this.x;
        rx = rx > 0 ? rx : 0;
        rx = rx - this.width > 0 ? this.width : rx;
        let ry = y - this.y;
        ry = ry > 0 ? ry : 0;
        ry = rx - this.height > 0 ? this.height : ry;
        return new Laya.Point(rx, ry);
    }

    public MazePosToPos(x, y) {
        let rx = x + this.x;
        let ry = y + this.y;
        return new Laya.Point(rx, ry);
    }

    public CheckValidStep(cur: MazeCell, next: MazeCell) {
        let dr = next.row - cur.row;
        let dc = next.col - cur.col;
        //console.log(dc, dr)
        if ((!!dr == !!dc) || Math.abs(dc) > 1 || Math.abs(dr) > 1) {
            //console.log("false", dc, dr)
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

    // Path操作
    public ClearPathData() {
        this.pathArr = new Array<MazeCell>();
    }

    public ShiftFirstPathCell() {
        return this.pathArr.shift();
    }

    public AddPathCell(cell: MazeCell) {
        this.pathArr.push(cell);
    }

    public PopPathCell() {
        return this.pathArr.pop();
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
            this.staticCanvas.graphics.drawLine(c * cW, r * cH, c * cW, (r + 1) * cH, mwClr, wWidth);
        }
        if (w == 1) {
            //画上边的墙
            this.staticCanvas.graphics.drawLine(c * cW, r * cH, (c + 1) * cW, r * cH, mwClr, wWidth);
        }
        if (w == 2) {
            //画右边的墙
            this.staticCanvas.graphics.drawLine((c + 1) * cW, r * cH, (c + 1) * cW, (r + 1) * cH, mwClr, wWidth);
        }
        if (w == 3) {
            //画下边的墙
            this.staticCanvas.graphics.drawLine(c * cW, (r + 1) * cH, (c + 1) * cW, (r + 1) * cH, mwClr, wWidth);
        }
    }
    //给墙的缝隙画上
    private drawCircle(c, r, w) {
        let cW = this.CellWidth;
        let cH = this.CellHeight;
        let mwClr = Maze.mzWallColor;
        let mwWidth = Maze.mzWallWidth;
        if (w == 0) {
            this.staticCanvas.graphics.drawCircle(c * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.staticCanvas.graphics.drawCircle(c * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
        if (w == 1) {
            this.staticCanvas.graphics.drawCircle(c * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.staticCanvas.graphics.drawCircle((c + 1) * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
        if (w == 2) {
            this.staticCanvas.graphics.drawCircle((c + 1) * cW, r * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.staticCanvas.graphics.drawCircle((c + 1) * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
        if (w == 3) {
            this.staticCanvas.graphics.drawCircle(c * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
            this.staticCanvas.graphics.drawCircle((c + 1) * cW, (r + 1) * cH, mwWidth / 2 + 2, mwClr, mwClr, 1);
        }
    }

    public DrawPathByCell(cell: MazeCell) {
        this.drawPathByCellParam(cell.col, cell.row);
    }

    private drawPathByCellParam(col: number, row: number) {
        let cW = this.CellWidth;
        let cH = this.CellHeight;
        this.graphics.drawRect(col * cW + 10, row * cH + 10, cW - 20, cH - 20, "#ffffff");
    }
}