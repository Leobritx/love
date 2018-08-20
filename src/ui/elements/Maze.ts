class Maze extends Laya.Sprite {
    private static mzBgUrl = "gameui/brickbg.png";
    private static mzWallColor = "#ffffff";
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

    ///Drawing
    //画墙
    private DrawWalls() {
        let mazeArr = this.data.mazeArr;
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
    }
    //画一面墙
    private drawWall(c, r, w) {
        let cW = this.CellWidth;
        let cH = this.CellHeight;
        let mwClr = Maze.mzWallColor;
        let mwWidth = Maze.mzWallWidth;
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
    }
    //给墙的缝隙画上
    private drawCircle(c, r, w) {
        let cW = this.CellWidth;
        let cH = this.CellHeight;
        let mwClr = Maze.mzWallColor;
        let mwWidth = Maze.mzWallWidth;
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
    }

    private drawPathByCell(cell: MazeCell) {

    }

    private drawPathByCellParam(col: number, row: number) {

    }

    ///Event Handlers
    private update(e) {
        this.pathArr.reverse();//要使用队列，先使用数组翻转解决
        let nextCell = this.pathArr.pop();
        if (nextCell != null) {
            let pos = this.CellToPos(nextCell);
            Laya.Tween.to(this.ownerPlayer, { x: pos.x, y: pos.y }, 200);
        }
        this.pathArr.reverse();
    }

    private onTouchDown(e) {
        this.pathArr = new Array<MazeCell>();
        let mzPos = this.convertPosToMaze(Laya.stage.mouseX, Laya.stage.mouseY);
        let curCell = this.PosPointToCell(mzPos);
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
        let curCell = this.PosPointToCell(mzPos);
        for (let i = 0; i < this.pathArr.length; i++) {
            let element = this.pathArr[i];
            if (element.col == curCell.col && element.row == curCell.row) {
                return
            }
        }
        this.pathArr.push(curCell);
    }

    private convertPosToMaze(x, y) {
        return new Laya.Point(x - this.x > 0 ? x - this.x : 0, y - this.y > 0 ? y - this.y : 0);
    }

}