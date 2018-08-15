/*
* 资源管理器;
*/
interface DataBase {

}

enum DataType {
    OwnerPlayer, //
    OtherPlayer,
    MazeData,

}

class DataManager {
    public static Instance: DataManager;

    private dataArr: DataBase[] = [];

    constructor() {
        DataManager.Instance = this;

    }

    public Get(type: ResType, obj: any[] = null, call: Laya.Handler = null) {

    }
}
