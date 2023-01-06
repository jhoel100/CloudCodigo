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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const port = 3001;
const FILE_PATH = "./script.py";
// parsea el body de todos los requests que entran como si fueran json
app.use(express_1.default.json());
// todos los request post que lleguen al endpoint /submit_code entran a esta función
app.post("/submit_code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const codeSubmitData = req.body;
    console.log("[POST] /submit_code", codeSubmitData);
    // decoding source code
    const srcCode = decodeURIComponent(codeSubmitData.src_code);
    // save source code into script.py
    yield (0, utils_1.savePythonCode)(srcCode, FILE_PATH);
    // execute script.py and save its output
    const output = yield (0, utils_1.executePythonCode)(FILE_PATH);
    res.json({
        output,
    });
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map