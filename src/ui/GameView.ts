//主逻辑控住类  
class GameView extends ui.UI.GamePageUI implements UIBase {
    //定义UI类型
    type: UIType = UIType.GameView;

    private static mzFogUrl = "gameui/fog.png";
    private static mzLightUrl = "gameui/light.png";

    public curMaze: Maze;
    public ownerPlayer: Player;
    public otherPlayer: Player;

    public fog: Laya.Sprite;
    public light: Laya.Sprite;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        Laya.stage.bgColor = "#f8d3e5";

        //实例化迷宫
        this.curMaze = new Maze(0, 200, 600, 600);

        //创建迷雾
        this.fog = new Laya.Sprite();
        this.fog.loadImage(GameView.mzFogUrl, 0, 180, this.curMaze.width, this.curMaze.height + 40);

        //添加玩家
        this.ownerPlayer = new Player(this.curMaze, MazeData.COLUMN_NUM - 1, MazeData.ROW_NUM - 1);
        //this.otherPlayer = new Player(this.curMaze, 0, 0);

        this.ownerPlayer.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);

        this.addChild(this.fog);
        this.addChild(this.curMaze);
        this.addChild(this.ownerPlayer);

        this.light = new Laya.Sprite();
        this.light.loadImage(GameView.mzLightUrl);
        this.light.pivot(this.light.width * 0.5, this.light.height * 0.5).scale(3, 3);
        let mzPos = this.curMaze.PosToMazePos(this.ownerPlayer.x, this.ownerPlayer.y);
        this.light.pos(mzPos.x, mzPos.y);
        this.curMaze.mask = this.light;

        new GameManager(this);
        GameManager.Instance.SwitchState(StateType.Init);

        Laya.timer.loop(1000 / (DisplayConfig.Instance.fps || 30), this, this.update);
    }

    public SetTitle(title: string) {
        this.lblTimer.text = title;
    }

    private onTouchDown(e) {
        this.curMaze.ClearPathData();
        let curCell = this.ownerPlayer.GetCurCell();
        this.curMaze.AddPathCell(curCell);
        //添加鼠标移到侦听
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);

        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    }

    private onTouchUp(e) {
        //添加鼠标移到侦听
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);

        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.ownerPlayer.off(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    }

    private onTouchMove(e) {
        if (Laya.timer.currFrame % 5 != 0) {
            return;
        }
        let nextCell = this.curMaze.PosToMazeCell(Laya.stage.mouseX, Laya.stage.mouseY);
        let curCell = this.curMaze.PopPathCell() || this.ownerPlayer.GetCurCell();
        this.curMaze.AddPathCell(curCell);
        if (this.curMaze.CheckValidStep(curCell, nextCell)) {
            if (!nextCell.Equal(curCell)) {
                this.curMaze.AddPathCell(nextCell);
                //this.curMaze.DrawPathByCell(nextCell);
            }
        }
    }

    private update(e) {
        GameManager.Instance.UpdateCurState();
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