
class MazeCell{
    public row:number;//行
    public col:number;//列
}
    
class MazeData{
    public static ROW_NUM = 10;
    public static COLUMN_NUM = 10;

    private mazeArr:any[];

    constructor(){
        //初始化迷宫
        for(let i=0;i<MazeData.ROW_NUM;i++){
            this.mazeArr[i] = [];
            for(let j=0;j<MazeData.COLUMN_NUM;j++){
                this.mazeArr[i][j] = [0,0,0,0,0];
            }
        }
    }
}