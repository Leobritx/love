
class MazeCell {
    public row: number;//行
    public col: number;//列
    constructor(c?: number, r?: number) {
        this.row = Math.floor(r || 0);
        this.col = Math.floor(c || 0);
    }

    public Equal(to: MazeCell) {
        return to && this.row == to.row && this.col == to.col;
    }
}

class MazeData {
    public static COLUMN_NUM = 8;
    public static ROW_NUM = 8;

    public mazeArr: any[];

    constructor() {
        MazeData.COLUMN_NUM = GameConfig.Instance.mazecolnum || MazeData.COLUMN_NUM;
        MazeData.ROW_NUM = GameConfig.Instance.mazerownum || MazeData.ROW_NUM;
        //初始化迷宫
        this.initArr();
        this.initMaze();
    }

    private initArr() {
        this.mazeArr = new Array(MazeData.COLUMN_NUM);
        for (let i = 0; i < MazeData.COLUMN_NUM; i++) {
            this.mazeArr[i] = new Array(MazeData.ROW_NUM);
            for (let j = 0; j < MazeData.ROW_NUM; j++) {
                this.mazeArr[i][j] = [0, 0, 0, 0, 0];
            }
        }
    }

    private initMaze() {

        var history = new Array();

        var r = 0; var c = 0;
        history.push([c, r]);

        while (history.length > 0) {
            this.mazeArr[c][r][4] = 1; // designate this location as visited

            let check = new Array();
            if (c > 0 && this.mazeArr[c - 1][r][4] == 0) {
                check.push('L')
            }
            if (r > 0 && this.mazeArr[c][r - 1][4] == 0) {
                check.push('U')
            }
            if (c < MazeData.COLUMN_NUM - 1 && this.mazeArr[c + 1][r][4] == 0) {
                check.push('R')
            }
            if (r < MazeData.ROW_NUM - 1 && this.mazeArr[c][r + 1][4] == 0) {
                check.push('D')
            }

            if (check.length > 0) { // If there is a valid cell to move to.
                // Mark the walls between cells as open if we move
                history.push([c, r])
                let index = Math.floor(Math.random() * 4)
                let move_direction = check[index];
                if (move_direction == 'L') {
                    this.mazeArr[c][r][0] = 1
                    c = c - 1
                    this.mazeArr[c][r][2] = 1
                }
                if (move_direction == 'U') {
                    this.mazeArr[c][r][1] = 1
                    r = r - 1
                    this.mazeArr[c][r][3] = 1
                }
                if (move_direction == 'R') {
                    this.mazeArr[c][r][2] = 1
                    c = c + 1
                    this.mazeArr[c][r][0] = 1
                }
                if (move_direction == 'D') {
                    this.mazeArr[c][r][3] = 1
                    r = r + 1
                    this.mazeArr[c][r][1] = 1
                }
            }
            else {
                let outarr = history.pop()
                c = outarr[0]; r = outarr[1];
            }
        }

        //入口和出口墙去掉
        this.mazeArr[0][0][1] = 1
        this.mazeArr[MazeData.COLUMN_NUM - 1][MazeData.ROW_NUM - 1][3] = 1
    }
}