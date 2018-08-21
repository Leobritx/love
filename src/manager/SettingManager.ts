/*
* 配置管理器;
*/
interface ConfigBase {
    type: ConfigType;
    Get();
    Set();
}

enum ConfigType {
    Resolution, //分辨率
    Language,   //语言
    Volume,     //音量
    Game,
}

class ResolutionConfig implements ConfigBase {
    public static Instance: ResolutionConfig;
    type: ConfigType = ConfigType.Resolution;

    public width: number;
    public height: number;

    constructor() {
        ResolutionConfig.Instance = this;
    }

    public Get() {
        this.width = parseInt(Laya.LocalStorage.getItem("width"));
        this.height = parseInt(Laya.LocalStorage.getItem("height"));
    }
    public Set() {
        Laya.LocalStorage.setItem("width", this.width.toString());
        Laya.LocalStorage.setItem("height", this.height.toString());
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

    private configArr: ConfigBase[] = [];

    constructor() {
        SettingManager.Instance = this;

        //配置实例化
        this.configArr[ConfigType.Resolution] = new ResolutionConfig();
        this.configArr[ConfigType.Language] = new LanguageConfig();
        this.configArr[ConfigType.Volume] = new VolumeConfig();
        this.configArr[ConfigType.Game] = new GameConfig();
    }

    public Set(type?: ConfigType) {
        if (!type) {
            for (let index = 0; index < this.configArr.length; index++) {
                let element = this.configArr[index];
                element.Set();
            }
            return;
        }
        this.configArr[type].Set();
    }

    public Get(type?: ConfigType) {
        if (!type) {
            for (let index = 0; index < this.configArr.length; index++) {
                let element = this.configArr[index];
                element.Get();
            }
            return;
        }
        this.configArr[type].Get();
    }
}
