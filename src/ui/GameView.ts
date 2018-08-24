//主逻辑控住类  
class GameView extends ui.UI.GamePageUI implements UIBase {
    //定义UI类型
    type: UIType = UIType.GameView;

    private curMaze: Maze;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        Laya.stage.bgColor = "#f8d3e5";

        //添加迷宫
        this.curMaze = new Maze(0, 200, 600, 600);
        this.addChild(this.curMaze);

        new GameManager(this);
        GameManager.Instance.SwitchState(StateType.Init);

        Laya.timer.loop(1000 / (DisplayConfig.Instance.fps || 30), this, this.update);
    }

    private update(e) {
        GameManager.Instance.UpdateCurState();
    }

    public SetTimer(count:number){
        this.lblTimer.text = count.toString();
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
        this.removeSelf();
    }
    public hide() {
        this.visible = false;
    }
    public show() {
    }
}