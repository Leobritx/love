var StateType;
(function (StateType) {
    StateType[StateType["Init"] = 0] = "Init";
    StateType[StateType["Prepare"] = 1] = "Prepare";
    StateType[StateType["InGame"] = 2] = "InGame";
    StateType[StateType["End"] = 3] = "End";
})(StateType || (StateType = {}));
var InitState = /** @class */ (function () {
    function InitState(gv) {
        this.gameView = gv;
    }
    InitState.prototype.enter = function () {
        this.counter = 0;
        console.log("InitState  enter!");
    };
    InitState.prototype.update = function () {
        this.counter++;
        if (this.counter > 600) {
            console.log("InitState  change to InGameState!");
            GameManager.Instance.SwitchState(StateType.InGame);
        }
    };
    InitState.prototype.exit = function () {
        console.log("InitState  exit!");
    };
    return InitState;
}());
var InGameState = /** @class */ (function () {
    function InGameState(gv) {
        this.gameView = gv;
    }
    InGameState.prototype.enter = function () {
        console.log("InGameState  enter!");
    };
    InGameState.prototype.update = function () {
        var nextCell = this.gameView.curMaze.ShiftFirstPathCell();
        if (nextCell != null) {
            var curCell = this.gameView.ownerPlayer.GetCurCell();
            if (!curCell.Equal(nextCell)) {
                this.gameView.ownerPlayer.SetCurCell(nextCell);
                var pos = this.gameView.curMaze.CellToPos(nextCell);
                Laya.Tween.to(this.gameView.ownerPlayer, { x: pos.x, y: pos.y }, 200);
                Laya.Tween.to(this.gameView.light, { x: pos.x, y: pos.y }, 200);
            }
        }
    };
    InGameState.prototype.exit = function () {
        console.log("InGameState  exit!");
    };
    return InGameState;
}());
var GameManager = /** @class */ (function () {
    function GameManager(gv) {
        this.stateMap = [];
        GameManager.Instance = this;
        this.stateMap[StateType.Init] = new InitState(gv);
        this.stateMap[StateType.InGame] = new InGameState(gv);
    }
    GameManager.prototype.CurState = function () {
        return this.curState;
    };
    GameManager.prototype.SwitchState = function (state) {
        this.lastState = this.curState;
        this.curState = state;
        var last = this.stateMap[this.lastState];
        var cur = this.stateMap[this.curState];
        if (last) {
            last.exit();
        }
        if (cur) {
            cur.enter();
        }
    };
    GameManager.prototype.UpdateCurState = function () {
        this.stateMap[this.curState].update();
    };
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map