/*
* UI管理器;
*/
interface UIBase extends laya.ui.View {
    type: UIType;
    /**
     * 打开UI
     * obj打开UI时传入的参数
     * call打开UI后加载完数据的回调
     */
    open(obj: any[], call: Laya.Handler);
    close();//销毁关闭UI
    hide();//隐藏不销毁UI
    show();//打开后加载完数据显示UI
}

enum UIType {
    MainView,   //主界面
    GameView,   //游戏界面
    Login,      //登录
}

class UIManager {
    public static Instance: UIManager;
    private openArray: UIBase[] = [];
    private hideArray: UIBase[] = [];

    private viewMap: any = [];

    constructor() {
        UIManager.Instance = this;
        //将View做一个映射
        this.viewMap[UIType.MainView] = () => { return new MainView(); };
        this.viewMap[UIType.GameView] = () => { return new GameView(); };
    }

    public OpenUI(type: UIType, obj: any[] = null, call: Laya.Handler = null) {
        let hide: boolean = false;
        let ui: UIBase;
        let index: number;
        for (let i = 0; i < this.hideArray.length; i++) {
            //如果是隐藏的UI，显示UI
            if (this.hideArray[i].type == type) {
                index = i;
                hide = true;
                ui = this.hideArray[i];
                break;
            }
        }

        if (hide) {
            this.hideArray.splice(index, 1);
            this.openArray.push(ui);
        }
        else {
            for (let i = 0; i < this.openArray.length; i++) {
                //如果已经打开，刷新还是不响应看需求
                if (this.openArray[i].type == type)
                    return;
            }

            try {
                //将uitype的string和类名关联
                ui = this.viewMap[type]();
            }
            catch (e) {
                console.log(e);
                return;
            }
        }

        //打开UI
        ui.open(obj, new Laya.Handler(this, this.onOpen, [ui, call]));
        this.openArray.push(ui);
    }

    public HideUI(type: UIType) {
        let ui = null;
        let index: number;
        for (let i = 0; i < this.openArray.length; i++) {
            if (this.openArray[i].type == type) {
                ui = this.openArray[i];
                index = i;
            }
        }
        if (ui) {
            this.openArray.splice(index, 1);
            this.hideArray.push(ui);
        }
    }

    public SwitchUI(type: UIType, obj: any[] = null, call: Laya.Handler = null) {
        var topUi = this.openArray.pop();
        topUi.hide();
        this.OpenUI(type, obj, call);

    }
    //获取已经打开的UI
    public GetUI(type: UIType): UIBase {
        for (let i = 0; i < this.openArray.length; i++) {
            if (this.openArray[i].type == type)
                return this.openArray[i];
        }
        return null;
    }

    private onOpen(ui: UIBase, call: Laya.Handler) {
        Laya.stage.addChild(ui);
        ui.visible = true;
        ui.show();
        if (call)
            call.run();
    }

}
