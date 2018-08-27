/*
* 游戏管理器;
*/
interface StateBase {
    enter();
    update();
    exit();
}

enum StateType {
    Init, //
    Prepare,
    InGame,
    End,
}

class InitState implements StateBase {
    gameView: GameView;
    counter: number;
    constructor(gv: GameView) {
        this.gameView = gv;
    }
    public enter() {
        this.counter = 0;
        console.log("InitState  enter!")
    }
    public update() {
        this.counter++;
        this.gameView.SetTitle(this.counter.toString());
        if (this.counter > 200) {
            console.log("InitState  change to InGameState!")
            this.gameView.SetTitle("In Game!");
            GameManager.Instance.SwitchState(StateType.InGame);
        }

    }
    public exit() {
        console.log("InitState  exit!")
    }
}
class InGameState implements StateBase {
    gameView: GameView;
    constructor(gv: GameView) {
        this.gameView = gv;
    }
    public enter() {
        console.log("InGameState  enter!")
    }
    public update() {
        let nextCell = this.gameView.curMaze.ShiftFirstPathCell();
        let curCell = this.gameView.ownerPlayer.GetCurCell();
        if (nextCell != null) {
            if (!curCell.Equal(nextCell)) {
                this.gameView.ownerPlayer.SetCurCell(nextCell);
                let mzPos = this.gameView.curMaze.CellToMazePos(nextCell);
                let pos = this.gameView.curMaze.MazePosToPos(mzPos.x,mzPos.y);
                Laya.Tween.to(this.gameView.ownerPlayer, { x: pos.x, y: pos.y }, 200);
                Laya.Tween.to(this.gameView.light, { x: mzPos.x, y: mzPos.y }, 200);
            }
        }
        if (curCell.col == 0 && curCell.row == 0) {
            GameManager.Instance.SwitchState(StateType.End);
        }
    }
    public exit() {
        console.log("InGameState  exit!")
    }
}

class EndGameState implements StateBase {
    gameView: GameView;
    constructor(gv: GameView) {
        this.gameView = gv;
    }
    public enter() {
        this.gameView.SetTitle("Success!");
        console.log("EndGameState  enter!")
    }
    public update() {
    }
    public exit() {
        console.log("EndGameState  exit!")
    }
}

class GameManager {
    public static Instance: GameManager;

    private curState: StateType;
    private lastState: StateType;
    private stateMap: StateBase[] = [];

    constructor(gv: GameView) {
        GameManager.Instance = this;

        this.stateMap[StateType.Init] = new InitState(gv);
        this.stateMap[StateType.InGame] = new InGameState(gv);
        this.stateMap[StateType.End] = new EndGameState(gv);
    }

    public CurState() {
        return this.curState;
    }

    public SwitchState(state: StateType) {
        this.lastState = this.curState;
        this.curState = state;
        let last = this.stateMap[this.lastState];
        let cur = this.stateMap[this.curState];
        if (last) {
            last.exit();
        }
        if (cur) {
            cur.enter();
        }
    }

    public UpdateCurState() {
        this.stateMap[this.curState].update();
    }
}
