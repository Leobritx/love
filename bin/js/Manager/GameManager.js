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
        this.gameView.SetTimer(this.counter);
        if (this.counter > 2000) {
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