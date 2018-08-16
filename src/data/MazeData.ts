
class MazeCell {
    public row: number;//行
    public col: number;//列
    constructor(c?: number, r?: number) {
        this.row = Math.floor(r || 0);
        this.col = Math.floor(c || 0);
    }
}

class MazeData {
    public static ROW_NUM = 10;
    public static COLUMN_NUM = 10;

    private mazeArr: any[];

    constructor() {
        //初始化迷宫
        this.initArr();
    }

    private initArr(){
        this.mazeArr = new Array(MazeData.COLUMN_NUM);
        for (let i = 0; i < MazeData.COLUMN_NUM; i++) {
            this.mazeArr[i] = new Array(MazeData.ROW_NUM);
            for (let j = 0; j < MazeData.ROW_NUM; j++) {
                this.mazeArr[i][j] = [0, 0, 0, 0, 0];
            }
        }        
    }

    private initMaze(){

    }
}