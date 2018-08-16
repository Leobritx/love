class PlayerData {
    public mazePos: MazeCell;

    constructor(c?: number, r?: number) {
        this.mazePos = new MazeCell(c, r);
    }
}