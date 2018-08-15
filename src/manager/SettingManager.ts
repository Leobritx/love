/*
* 配置管理器;
*/
interface ConfigBase {

}

enum ConfigType {
    Resolution, //分辨率
    Language,   //语言
    Volume,     //音量

}

class SettingManager {
    public static Instance: SettingManager;

    private configArr: ConfigBase[] = [];

    constructor() {
        SettingManager.Instance = this;
    }

    public Set(type: ConfigType, obj: any[] = null, call: Laya.Handler = null) {

    }
}
