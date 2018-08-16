class Player extends Laya.Sprite {
    private data: PlayerData;//玩家数据

    private maze: Maze;//所在迷宫

    constructor(maze: Maze, c?: number, r?: number, cell?: MazeCell) {
        super();
        this.maze = maze;
        this.data = new PlayerData(cell && cell.col || c,cell && cell.row || r);
    }
}