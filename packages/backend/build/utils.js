"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePythonCode = exports.savePythonCode = void 0;
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const DEFAULT_TIMEOUT_SECONDS = 2;
const savePythonCode = (srcCode, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.promises.writeFile(filePath, srcCode);
});
exports.savePythonCode = savePythonCode;
const executePythonCode = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, child_process_1.execSync)(`timeout ${DEFAULT_TIMEOUT_SECONDS} python3 ${filePath}`);
        return result.toString("utf8");
    }
    catch (error) {
        const err = error;
        if (err.errno === -105) {
            return "Time limit exceeded.";
        }
        let finalOutput = err.stdout.toString("utf8");
        for (const output of err.output) {
            if (output) {
                finalOutput = finalOutput.concat(output.toString("utf8"));
            }
        }
        return finalOutput;
    }
});
exports.executePythonCode = executePythonCode;
//# sourceMappingURL=utils.js.map