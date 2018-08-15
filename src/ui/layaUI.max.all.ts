
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.UI {
    export class GamePageUI extends View {
		public imgMazeBg:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":1000},"child":[{"type":"Image","props":{"y":200,"x":0,"width":100,"skin":"comp/brick.png","height":100}},{"type":"Image","props":{"y":352,"x":56,"width":449,"var":"imgMazeBg","skin":"comp/brick.png","height":373}},{"type":"Image","props":{"y":36,"x":36,"width":152,"skin":"comp/image.png","height":134}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":600,"height":1000},"child":[{"type":"Button","props":{"y":550,"x":150,"width":300,"var":"btnStart","skin":"gameui/button.png","labelSize":40,"labelFont":"Microsoft YaHei","label":"Start","height":100,"sizeGrid":"5,10,10,5"}},{"type":"Image","props":{"y":300,"x":225,"width":150,"var":"imgAvatar","skin":"comp/image.png","height":150}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UI.MainPageUI.uiView);

        }

    }
}
