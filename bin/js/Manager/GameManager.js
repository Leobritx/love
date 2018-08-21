var StateType;
(function (StateType) {
    StateType[StateType["Init"] = 0] = "Init";
    StateType[StateType["Main"] = 1] = "Main";
    StateType[StateType["Game"] = 2] = "Game";
})(StateType || (StateType = {}));
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.dataArr = [];
        GameManager.Instance = this;
    }
    GameManager.prototype.Get = function (type) {
    };
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map