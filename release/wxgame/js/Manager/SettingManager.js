var ConfigType;
(function (ConfigType) {
    ConfigType[ConfigType["Resolution"] = 0] = "Resolution";
    ConfigType[ConfigType["Language"] = 1] = "Language";
    ConfigType[ConfigType["Volume"] = 2] = "Volume";
})(ConfigType || (ConfigType = {}));
var SettingManager = /** @class */ (function () {
    function SettingManager() {
        this.configArr = [];
        SettingManager.Instance = this;
    }
    SettingManager.prototype.Set = function (type, obj, call) {
        if (obj === void 0) { obj = null; }
        if (call === void 0) { call = null; }
    };
    return SettingManager;
}());
//# sourceMappingURL=SettingManager.js.map