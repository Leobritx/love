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
        this.gameView.SetTitle(this.counter.toString());
        if (this.counter > 200) {
            console.log("InitState  change to InGameState!");
            this.gameView.SetTitle("In Game!");
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
        var curCell = this.gameView.ownerPlayer.GetCurCell();
        if (nextCell != null) {
            if (!curCell.Equal(nextCell)) {
                this.gameView.ownerPlayer.SetCurCell(nextCell);
                var mzPos = this.gameView.curMaze.CellToMazePos(nextCell);
                var pos = this.gameView.curMaze.MazePosToPos(mzPos.x, mzPos.y);
                Laya.Tween.to(this.gameView.ownerPlayer, { x: pos.x, y: pos.y }, 200);
                Laya.Tween.to(this.gameView.light, { x: mzPos.x, y: mzPos.y }, 200);
            }
        }
        if (curCell.col == 0 && curCell.row == 0) {
            GameManager.Instance.SwitchState(StateType.End);
        }
    };
    InGameState.prototype.exit = function () {
        console.log("InGameState  exit!");
    };
    return InGameState;
}());
var EndGameState = /** @class */ (function () {
    function EndGameState(gv) {
        this.gameView = gv;
    }
    EndGameState.prototype.enter = function () {
        this.gameView.SetTitle("Success!");
        console.log("EndGameState  enter!");
    };
    EndGameState.prototype.update = function () {
    };
    EndGameState.prototype.exit = function () {
        console.log("EndGameState  exit!");
    };
    return EndGameState;
}());
var GameManager = /** @class */ (function () {
    function GameManager(gv) {
        this.stateMap = [];
        GameManager.Instance = this;
        this.stateMap[StateType.Init] = new InitState(gv);
        this.stateMap[StateType.InGame] = new InGameState(gv);
        this.stateMap[StateType.End] = new EndGameState(gv);
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