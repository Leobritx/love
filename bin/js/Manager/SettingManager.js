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
        this.configMap = [];
        SettingManager.Instance = this;
        //配置实例化
        this.configMap[ConfigType.Resolution] = new ResolutionConfig();
        this.configMap[ConfigType.Language] = new LanguageConfig();
        this.configMap[ConfigType.Volume] = new VolumeConfig();
        this.configMap[ConfigType.Game] = new GameConfig();
    }
    SettingManager.prototype.Set = function (type) {
        if (!type) {
            for (var index = 0; index < this.configMap.length; index++) {
                var element = this.configMap[index];
                element.Set();
            }
            return;
        }
        this.configMap[type].Set();
    };
    SettingManager.prototype.Get = function (type) {
        if (!type) {
            for (var index = 0; index < this.configMap.length; index++) {
                var element = this.configMap[index];
                element.Get();
            }
            return;
        }
        this.configMap[type].Get();
    };
    return SettingManager;
}());
//# sourceMappingURL=SettingManager.js.map