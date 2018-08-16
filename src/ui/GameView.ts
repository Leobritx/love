//主逻辑控住类  
class GameView extends ui.UI.GamePageUI implements UIBase {
    //定义UI类型
    type: UIType = UIType.GameView;
    constructor() {
        super();
        this.init();
    }

    //public evm:ElementViewManage; 	
    //private levm: LevelReqViewManage;

    public init(): void {
        Laya.stage.bgColor = "#959595";
        
        //添加迷宫
        let maze = new Maze(0,200,600,600);
        this.addChild(maze);        
    }

    //UIBase接口
    public open(obj: any[], call: Laya.Handler) {
        //初始化UI，数据加载    
        //加载完后调用回调显示UI
        if (call) {
            call.run();
            call = null;
        }
    }

    public close() {
    }

    public hide() {

    }

    public show() {
    }

}