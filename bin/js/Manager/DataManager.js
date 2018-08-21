var DataType;
(function (DataType) {
    DataType[DataType["OwnerPlayer"] = 0] = "OwnerPlayer";
    DataType[DataType["OtherPlayer"] = 1] = "OtherPlayer";
    DataType[DataType["MazeData"] = 2] = "MazeData";
})(DataType || (DataType = {}));
var DataManager = /** @class */ (function () {
    function DataManager() {
        this.dataArr = [];
        DataManager.Instance = this;
    }
    DataManager.prototype.Get = function (type) {
    };
    return DataManager;
}());
//# sourceMappingURL=DataManager.js.map