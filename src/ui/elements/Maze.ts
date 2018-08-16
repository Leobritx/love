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
        this.loadImage(Maze.mzBgUrl, x, y, w, h);
        this.CellWidth = this.width / MazeData.COLUMN_NUM;//需要从测试看是否向下取整
        this.CellHeight = this.height / MazeData.ROW_NUM;

        //添加玩家
        let ownerPlayer = new Player(this, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        let otherPlayer = new Player(this, 0, 0);
    }

    public PosPointToCell(pos: Laya.Point) {
        return this.PosToCell(pos.x, pos.y);
    }

    public PosToCell(x: number, y: number) {
        let cell = new MazeCell(x / this.CellWidth, y / this.CellHeight);
        return cell
    }

    public CellToPos(cell: MazeCell) {
        let pos = new Laya.Point();
        pos.x = Math.floor((cell.col + 0.5) * this.CellWidth);
        pos.y = Math.floor((cell.row + 0.5) * this.CellHeight);
        return pos
    }
}