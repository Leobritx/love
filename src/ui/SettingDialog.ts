class SettingDialog extends ui.UI.SettingDialogUI {

    constructor() {
        super();
        this.btnClose.on(Laya.Event.CLICK,this,this.onClose);
    }

    private onClose(e){
        this.removeSelf();
    }
}