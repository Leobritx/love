class PlayerData {
    public playerCell: MazeCell;

    constructor(c?: number, r?: number) {
        this.playerCell = new MazeCell(c, r);
    }
}