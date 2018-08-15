var MazeCell = /** @class */ (function () {
    function MazeCell() {
    }
    return MazeCell;
}());
var MazeData = /** @class */ (function () {
    function MazeData() {
        //初始化迷宫
        for (var i = 0; i < MazeData.ROW_NUM; i++) {
            this.mazeArr[i] = [];
            for (var j = 0; j < MazeData.COLUMN_NUM; j++) {
                this.mazeArr[i][j] = [0, 0, 0, 0, 0];
            }
        }
    }
    MazeData.ROW_NUM = 10;
    MazeData.COLUMN_NUM = 10;
    return MazeData;
}());
//# sourceMappingURL=MazeData.js.map