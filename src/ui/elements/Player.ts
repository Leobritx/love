class Player extends Laya.Sprite {
    private data: PlayerData;//玩家数据
    private static plBgUrl = "gameui/player.png";

    private maze: Maze;//所在迷宫

    constructor(maze: Maze, c?: number, r?: number, cell?: MazeCell) {
        super();
        this.maze = maze;
        this.data = new PlayerData(cell && cell.col || c, cell && cell.row || r);

        this.loadImage(Player.plBgUrl);
        this.maze.addChild(this);

        this.pivot(this.width * 0.5, this.height * 0.5).scale(0.5, 0.5);
        this.RefreshMazePos();
    }

    public RefreshMazePos() {
        let pos = this.maze.CellToPos(this.data.mazePos);
        this.pos(pos.x, pos.y);
    }

    public SetCurCellByParams(c, r) {
        this.data.mazePos.col = c || 0;
        this.data.mazePos.row = r || 0;
    }

    public SetCurCell(cell: MazeCell) {
        this.data.mazePos = cell;
    }

    public GetCurCell() {
        return this.data.mazePos;
    }
}