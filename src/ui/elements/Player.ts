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
        this.SetPlayerMazePosByCell(this.data.mazePos);
    }

    public SetPlayerMazePos(c, r) {
        let pos = this.maze.CellParamsToPos(c, r);
        this.pos(pos.x, pos.y);
    }

    public SetPlayerMazePosByCell(cell: MazeCell) {
        let pos = this.maze.CellToPos(cell);
        this.pos(pos.x, pos.y);
    }
}