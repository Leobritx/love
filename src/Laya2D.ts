// 程序入口
class GameApp {

	public static Instance: GameApp;

	constructor() {
		GameApp.Instance = this;

		//管理器
		new SettingManager();
		new ResourceManager();
		new DataManager();
		new UIManager();

		//初始化引擎
		Laya.MiniAdpter.init();
		Laya.init(DisplayConfig.Instance.width || 600, DisplayConfig.Instance.height || 1000, Laya.WebGL);

		//设置适配模式
		Laya.stage.scaleMode = "showall";
		Laya.stage.alignH = "center";
		Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;

		SettingManager.Instance.Get();
		ResourceManager.Instance.Load(Laya.Handler.create(this, this.onloaded));
	}
	public onloaded(): void {
		UIManager.Instance.OpenUI(UIType.MainView);
	}
}
new GameApp();