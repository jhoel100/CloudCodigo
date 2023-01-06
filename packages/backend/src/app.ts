import express from "express";
import { TCodeSubmitData } from "./common";
import { executePythonCode, savePythonCode } from "./utils";

const app = express();
const port = 8080;
const FILE_PATH = "./script.py";

// parsea el body de todos los requests que entran como si fueran json
app.use(express.json());

// todos los request post que lleguen al endpoint /submit_code entran a esta función
app.post("/submit_code", async (req, res) => {
	const codeSubmitData: TCodeSubmitData = req.body;
	console.log("[POST] /submit_code", codeSubmitData);

    // decoding source code
	const srcCode = decodeURIComponent(codeSubmitData.src_code);

	// save source code into script.py
	await savePythonCode(srcCode, FILE_PATH);

	// execute script.py and save its output
	const output = await executePythonCode(FILE_PATH);
    
	res.json({
		output,
	});
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
