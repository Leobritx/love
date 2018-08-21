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
    };
    InitState.prototype.update = function () {
    };
    InitState.prototype.exit = function () {
    };
    return InitState;
}());
var InGameState = /** @class */ (function () {
    function InGameState(gv) {
        this.gameView = gv;
    }
    InGameState.prototype.enter = function () {
    };
    InGameState.prototype.update = function () {
    };
    InGameState.prototype.exit = function () {
    };
    return InGameState;
}());
var GameManager = /** @class */ (function () {
    function GameManager(gv) {
        this.stateMap = [];
        GameManager.Instance = this;
        this.lastState = StateType.Init;
        this.curState = StateType.Init;
        this.stateMap[StateType.Init] = new InitState(gv);
        this.stateMap[StateType.InGame] = new InGameState(gv);
    }
    GameManager.prototype.SwitchState = function (state) {
        this.lastState = this.curState;
        this.curState = state;
        this.stateMap[this.lastState].exit();
        this.stateMap[this.curState].enter();
    };
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map