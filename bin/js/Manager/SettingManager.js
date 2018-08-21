var ConfigType;
(function (ConfigType) {
    ConfigType[ConfigType["Resolution"] = 0] = "Resolution";
    ConfigType[ConfigType["Language"] = 1] = "Language";
    ConfigType[ConfigType["Volume"] = 2] = "Volume";
    ConfigType[ConfigType["Game"] = 3] = "Game";
})(ConfigType || (ConfigType = {}));
var ResolutionConfig = /** @class */ (function () {
    function ResolutionConfig() {
        this.type = ConfigType.Resolution;
        ResolutionConfig.Instance = this;
    }
    ResolutionConfig.prototype.Get = function () {
        this.width = parseInt(Laya.LocalStorage.getItem("width"));
        this.height = parseInt(Laya.LocalStorage.getItem("height"));
    };
    ResolutionConfig.prototype.Set = function () {
        Laya.LocalStorage.setItem("width", this.width.toString());
        Laya.LocalStorage.setItem("height", this.height.toString());
    };
    return ResolutionConfig;
}());
var VolumeConfig = /** @class */ (function () {
    function VolumeConfig() {
        this.type = ConfigType.Volume;
        VolumeConfig.Instance = this;
    }
    VolumeConfig.prototype.Get = function () {
        this.volume = parseInt(Laya.LocalStorage.getItem("volume"));
    };
    VolumeConfig.prototype.Set = function () {
        Laya.LocalStorage.setItem("volume", this.volume.toString());
    };
    return VolumeConfig;
}());
var LanguageConfig = /** @class */ (function () {
    function LanguageConfig() {
        this.type = ConfigType.Language;
        LanguageConfig.Instance = this;
    }
    LanguageConfig.prototype.Get = function () {
        this.language = Laya.LocalStorage.getItem("language");
    };
    LanguageConfig.prototype.Set = function () {
        Laya.LocalStorage.setItem("language", this.language);
    };
    return LanguageConfig;
}());
var GameConfig = /** @class */ (function () {
    function GameConfig() {
        this.type = ConfigType.Game;
        GameConfig.Instance = this;
    }
    GameConfig.prototype.Get = function () {
        this.mazecolnum = parseInt(Laya.LocalStorage.getItem("mazecolnum"));
        this.mazerownum = parseInt(Laya.LocalStorage.getItem("mazerownum"));
    };
    GameConfig.prototype.Set = function () {
        Laya.LocalStorage.setItem("mazecolnum", this.mazecolnum.toString());
        Laya.LocalStorage.setItem("mazerownum", this.mazerownum.toString());
    };
    return GameConfig;
}());
var SettingManager = /** @class */ (function () {
    function SettingManager() {
        this.configArr = [];
        SettingManager.Instance = this;
        //配置实例化
        this.configArr[ConfigType.Resolution] = new ResolutionConfig();
        this.configArr[ConfigType.Language] = new LanguageConfig();
        this.configArr[ConfigType.Volume] = new VolumeConfig();
        this.configArr[ConfigType.Game] = new GameConfig();
    }
    SettingManager.prototype.Set = function (type) {
        if (!type) {
            for (var index = 0; index < this.configArr.length; index++) {
                var element = this.configArr[index];
                element.Set();
            }
            return;
        }
        this.configArr[type].Set();
    };
    SettingManager.prototype.Get = function (type) {
        if (!type) {
            for (var index = 0; index < this.configArr.length; index++) {
                var element = this.configArr[index];
                element.Get();
            }
            return;
        }
        this.configArr[type].Get();
    };
    return SettingManager;
}());
//# sourceMappingURL=SettingManager.js.map