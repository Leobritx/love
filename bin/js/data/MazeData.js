var MazeCell = /** @class */ (function () {
    function MazeCell(c, r) {
        this.row = Math.floor(r || 0);
        this.col = Math.floor(c || 0);
    }
    return MazeCell;
}());
var MazeData = /** @class */ (function () {
    function MazeData() {
        //初始化迷宫
        this.initArr();
    }
    MazeData.prototype.initArr = function () {
        this.mazeArr = new Array(MazeData.COLUMN_NUM);
        for (var i = 0; i < MazeData.COLUMN_NUM; i++) {
            this.mazeArr[i] = new Array(MazeData.ROW_NUM);
            for (var j = 0; j < MazeData.ROW_NUM; j++) {
                this.mazeArr[i][j] = [0, 0, 0, 0, 0];
            }
        }
    };
    MazeData.prototype.initMaze = function () {
    };
    MazeData.ROW_NUM = 10;
    MazeData.COLUMN_NUM = 10;
    return MazeData;
}());
//# sourceMappingURL=MazeData.js.map