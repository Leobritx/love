
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.UI {
    export class GamePageUI extends View {
		public lblTimer:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":1000},"child":[{"type":"Label","props":{"y":100,"width":300,"var":"lblTimer","text":"当前阶段","height":30,"fontSize":28,"font":"Arial","color":"#10aebc","centerX":0,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UI.GamePageUI.uiView);

        }

    }
}

module ui.UI {
    export class MainPageUI extends View {
		public btnStart:Laya.Button;
		public imgAvatar:Laya.Image;
		public btnSetting:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":1000},"child":[{"type":"Button","props":{"y":550,"x":150,"width":300,"var":"btnStart","skin":"gameui/button.png","labelSize":40,"labelFont":"Microsoft YaHei","label":"Start","height":100,"sizeGrid":"5,10,10,5"}},{"type":"Image","props":{"y":300,"x":225,"width":150,"var":"imgAvatar","height":150}},{"type":"Image","props":{"y":920,"x":520,"width":80,"var":"btnSetting","skin":"gameui/setting.png","height":80}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UI.MainPageUI.uiView);

        }

    }
}

module ui.UI {
    export class SettingDialogUI extends Dialog {
		public btnConfirm:Laya.Button;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":400,"height":360,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"gameui/brickbg.png","height":360,"sizeGrid":"2,2,2,2"}},{"type":"Button","props":{"width":119,"var":"btnConfirm","skin":"gameui/button.png","label":"Confirm","height":37,"centerY":120,"centerX":0,"sizeGrid":"5,10,10,5"}},{"type":"Button","props":{"y":1,"x":368,"width":30,"var":"btnClose","skin":"gameui/button.png","label":"X","height":28,"sizeGrid":"5,10,10,5"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UI.SettingDialogUI.uiView);

        }

    }
}
