"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
exports.escapeData = escapeData;
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
exports.escapeProperty = escapeProperty;
const CMD_STRING = '::';
function render(level, message, properties) {
    let cmdStr = CMD_STRING + level;
    if (properties && Object.keys(properties).length > 0) {
        cmdStr += ' ';
        let first = true;
        for (const [key, value] of Object.entries(properties)) {
            if (value) {
                if (first) {
                    first = false;
                }
                else {
                    cmdStr += ',';
                }
                cmdStr += `${key}=${escapeProperty(value)}`;
            }
        }
    }
    cmdStr += `${CMD_STRING}${escapeData(message)}`;
    return cmdStr;
}
function annotate(annotation) {
    let level;
    switch (annotation.annotation_level) {
        case 'notice':
        case 'warning':
            level = 'warning';
            break;
        case 'failure':
            level = 'error';
            break;
    }
    const text = render(level, annotation.message, {
        file: annotation.path,
        line: annotation.start_line,
        col: annotation.start_column,
    });
    process.stdout.write(text + os.EOL);
}
exports.annotate = annotate;
//# sourceMappingURL=annotations.js.map