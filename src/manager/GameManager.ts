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
        this.gameView.SetTimer(this.counter);
        if (this.counter > 200) {
            console.log("InitState  change to InGameState!")
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
        if (nextCell != null) {
            let curCell = this.gameView.ownerPlayer.GetCurCell();
            if (!curCell.Equal(nextCell)) {
                this.gameView.ownerPlayer.SetCurCell(nextCell);
                let pos = this.gameView.curMaze.CellToPos(nextCell);
                Laya.Tween.to(this.gameView.ownerPlayer, { x: pos.x, y: pos.y }, 200);
                Laya.Tween.to(this.gameView.light, { x: pos.x, y: pos.y }, 200);
            }
        }

    }
    public exit() {
        console.log("InGameState  exit!")
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
