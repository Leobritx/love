class Player extends Laya.Sprite {
    private data: PlayerData;//玩家数据

    private maze: Maze;//所在迷宫

    constructor(maze: Maze, c?: number, r?: number, cell?: MazeCell) {
        super();
        this.maze = maze;
        this.data = new PlayerData(cell && cell.col || c, cell && cell.row || r);

        this.loadImage(ResourceManager.PlBgUrl);

        this.pivot(this.width * 0.5, this.height * 0.5).scale(0.5, 0.5);
        this.RefreshPlayerPos();
    }

    public RefreshPlayerPos() {
        let mzPos = this.maze.CellToMazePos(this.data.playerCell);
        let pos = this.maze.MazePosToPos(mzPos.x,mzPos.y);
        this.pos(pos.x, pos.y);
    }

    public SetCurCellByParams(c, r) {
        this.data.playerCell.col = c || 0;
        this.data.playerCell.row = r || 0;
    }

    public SetCurCell(cell: MazeCell) {
        this.data.playerCell = cell;
    }

    public GetCurCell() {
        return this.data.playerCell;
    }
}