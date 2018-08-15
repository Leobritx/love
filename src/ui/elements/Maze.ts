import Sprite = Laya.Sprite
import Point = Laya.Point

class Maze extends Sprite {
    private data: MazeData;

    private CellWidth: number;
    private CellHeight: number;

    constructor() {
        super();
        //初始化迷宫数据
        this.data = new MazeData();
        //迷宫UI表现初始化
        //设置迷宫背景
        this.loadImage('', 0, 0, 100, 100);
        this.CellWidth = this.width / MazeData.COLUMN_NUM;//需要从测试看是否向下取整
        this.CellHeight = this.height / MazeData.ROW_NUM;
    }

    public PosToCell(x, y) {
        let cell = new MazeCell();
        return cell
    }

    public CellToPos(cell: MazeCell) {
        let pos = new Point();
        pos.x = Math.floor((cell.col + 0.5) * this.CellWidth);
        pos.y = Math.floor((cell.row + 0.5) * this.CellHeight);
        return pos
    }
}