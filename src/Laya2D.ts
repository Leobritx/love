// 程序入口
class GameApp {

	public static Instance: GameApp;

	constructor() {
		GameApp.Instance = this;
		
		//管理器
		new UIManager();
		new ResourceManager();
		new DataManager();
		new SettingManager();

		//初始化引擎
		Laya.init(600, 1000, Laya.WebGL);
		Laya.MiniAdpter.init();

		//设置适配模式
		Laya.stage.scaleMode = "showall";
		Laya.stage.alignH = "center";
		Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;

		ResourceManager.Instance.Load(Laya.Handler.create(this, this.onloaded));

	}
	public onloaded(): void {
		UIManager.Instance.openUI(UIType.MainView);
	}
}
new GameApp();