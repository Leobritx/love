//主逻辑控住类  
class MainView extends ui.UI.MainPageUI implements UIBase {
    //定义UI类型
    type: UIType = UIType.MainView;
    constructor() {
        super();
        this.init();
    }

    public init(): void {
        var Event = Laya.Event;
        //初始化背景颜色
        Laya.stage.bgColor = "#94deec";
        this.btnStart.on(Event.MOUSE_DOWN, this, this.onMouseDown);
        this.imgAvatar.loadImage("gameui/brick.png");

    }


    private onMouseDown(e) {
        UIManager.Instance.SwitchUI(UIType.GameView);
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

    //回调后会调用show，用于显示UI时的一些表现
    public show() {
    }

}