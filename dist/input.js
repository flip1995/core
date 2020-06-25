"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
function getInput(name, options) {
    const inputFullName = name.replace(/-/g, '_');
    const value = core.getInput(inputFullName, options);
    if (value.length > 0) {
        return value;
    }
    return core.getInput(name, options);
}
exports.getInput = getInput;
function getInputBool(name, options) {
    const value = getInput(name, options);
    if (value && (value === 'true' || value === '1')) {
        return true;
    }
    else {
        return false;
    }
}
exports.getInputBool = getInputBool;
function getInputList(name, options) {
    const raw = getInput(name, options);
    return raw
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
}
exports.getInputList = getInputList;
function getInputAsArray(name, options) {
    return getInput(name, options)
        .split("\n")
        .map(s => s.trim())
        .filter(x => x !== "");
}
exports.getInputAsArray = getInputAsArray;
//# sourceMappingURL=input.js.map