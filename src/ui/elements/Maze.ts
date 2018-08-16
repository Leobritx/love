class Maze extends Laya.Sprite {
    private static mzBgUrl = "gameui/brickbg.png";

    private data: MazeData;

    private CellWidth: number;
    private CellHeight: number;

    constructor(x, y, w, h) {
        super();
        //初始化迷宫数据
        this.data = new MazeData();
        //迷宫UI表现初始化
        //设置迷宫背景
        this.loadImage(Maze.mzBgUrl, 0, 0, w, h);
        this.pos(x, y);

        this.CellWidth = this.width / MazeData.COLUMN_NUM;//需要从测试看是否向下取整
        this.CellHeight = this.height / MazeData.ROW_NUM;

        //添加玩家
        let ownerPlayer = new Player(this, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        let otherPlayer = new Player(this, 0, 0);

        //this.graphics.drawLine(0, 0, 100, 200, "#ffffff", 8);
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

    private DrawWalls() {
        let mazeArr = this.data.mazeArr;
        for (var col = 0; col < MazeData.COLUMN_NUM; col++) {
            for (var row = 0; row < MazeData.ROW_NUM; row++) {
                for (var wall = 0; wall < 4; wall++) {
                    //0为有墙，1为没有墙
                    if (mazeArr[col][row][wall] == 0) {
                        this.drawWall(col, row, wall)
                    }
                }
            }
        }
    }

    private drawWall(c, r, w) {
        if (w == 0) {
            //画左边的墙
            this.graphics.drawLine(c * this.CellWidth, r * this.CellHeight, c * this.CellWidth, (r + 1) * this.CellHeight, "#ffffff", 8);
        }
        if (w == 1) {
            //画上边的墙
            this.graphics.drawLine(c * this.CellWidth, r * this.CellHeight, (c + 1) * this.CellWidth, r * this.CellHeight, "#ffffff", 8);
        }
        if (w == 2) {
            //画右边的墙
            this.graphics.drawLine((c + 1) * this.CellWidth, r * this.CellHeight, (c + 1) * this.CellWidth, (r + 1) * this.CellHeight, "#ffffff", 8);
        }
        if (w == 3) {
            //画下边的墙
            this.graphics.drawLine(c * this.CellWidth, (r + 1) * this.CellHeight, (c + 1) * this.CellWidth, (r + 1) * this.CellHeight, "#ffffff", 8);
        }
    }
}