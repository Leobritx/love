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
    constructor(gv: GameView) {
        this.gameView = gv;
    }
    public enter() {

    }
    public update() {

    }
    public exit() {

    }
}
class InGameState implements StateBase {
    gameView: GameView;
    constructor(gv: GameView) {
        this.gameView = gv;
    }
    public enter() {

    }
    public update() {

    }
    public exit() {

    }
}


class GameManager {
    public static Instance: GameManager;

    private curState: StateType;
    private lastState: StateType;
    private stateMap: StateBase[] = [];

    constructor(gv: GameView) {
        GameManager.Instance = this;
        this.lastState = StateType.Init;
        this.curState = StateType.Init;

        this.stateMap[StateType.Init] = new InitState(gv);
        this.stateMap[StateType.InGame] = new InGameState(gv);
    }

    public SwitchState(state: StateType) {
        this.lastState = this.curState;
        this.curState = state;
        this.stateMap[this.lastState].exit();
        this.stateMap[this.curState].enter();
    }
}
