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
        if (this.counter > 2000) {
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
