/*
* 配置管理器;
*/
interface ConfigBase {
    type: ConfigType;
    Get();
    Set();
}

enum ConfigType {
    Display,    //显示
    Language,   //语言
    Volume,     //音量
    Game,
}

class DisplayConfig implements ConfigBase {
    public static Instance: DisplayConfig;
    type: ConfigType = ConfigType.Display;

    public width: number;
    public height: number;
    public fps: number;

    constructor() {
        DisplayConfig.Instance = this;
    }

    public Get() {
        this.width = parseInt(Laya.LocalStorage.getItem("width"));
        this.height = parseInt(Laya.LocalStorage.getItem("height"));
        this.fps = parseInt(Laya.LocalStorage.getItem("fps"));
    }
    public Set() {
        Laya.LocalStorage.setItem("width", this.width.toString());
        Laya.LocalStorage.setItem("height", this.height.toString());
        Laya.LocalStorage.setItem("fps", this.fps.toString());
    }
}

class VolumeConfig implements ConfigBase {
    public static Instance: VolumeConfig;
    type: ConfigType = ConfigType.Volume;

    public volume: number;

    constructor() {
        VolumeConfig.Instance = this;
    }

    public Get() {
        this.volume = parseInt(Laya.LocalStorage.getItem("volume"));
    }
    public Set() {
        Laya.LocalStorage.setItem("volume", this.volume.toString());
    }
}

class LanguageConfig implements ConfigBase {
    public static Instance: LanguageConfig;
    type: ConfigType = ConfigType.Language;

    public language: string;

    constructor() {
        LanguageConfig.Instance = this;
    }

    public Get() {
        this.language = Laya.LocalStorage.getItem("language");
    }
    public Set() {
        Laya.LocalStorage.setItem("language", this.language);
    }
}

class GameConfig implements ConfigBase {
    public static Instance: GameConfig;
    type: ConfigType = ConfigType.Game;

    public mazecolnum: number;
    public mazerownum: number;

    constructor() {
        GameConfig.Instance = this;
    }

    public Get() {
        this.mazecolnum = parseInt(Laya.LocalStorage.getItem("mazecolnum"));
        this.mazerownum = parseInt(Laya.LocalStorage.getItem("mazerownum"));
    }
    public Set() {
        Laya.LocalStorage.setItem("mazecolnum", this.mazecolnum.toString());
        Laya.LocalStorage.setItem("mazerownum", this.mazerownum.toString());
    }
}

class SettingManager {
    public static Instance: SettingManager;

    private configMap: ConfigBase[] = [];

    constructor() {
        SettingManager.Instance = this;

        //配置实例化
        this.configMap[ConfigType.Display] = new DisplayConfig();
        this.configMap[ConfigType.Language] = new LanguageConfig();
        this.configMap[ConfigType.Volume] = new VolumeConfig();
        this.configMap[ConfigType.Game] = new GameConfig();
    }

    public Set(type?: ConfigType) {
        if (!type) {
            for (let index = 0; index < this.configMap.length; index++) {
                let element = this.configMap[index];
                element.Set();
            }
            return;
        }
        this.configMap[type].Set();
    }

    public Get(type?: ConfigType) {
        if (!type) {
            for (let index = 0; index < this.configMap.length; index++) {
                let element = this.configMap[index];
                element.Get();
            }
            return;
        }
        this.configMap[type].Get();
    }
}
