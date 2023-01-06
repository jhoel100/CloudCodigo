import { promises as fs } from "fs";
import { execSync, SpawnSyncReturns } from "child_process";

const DEFAULT_TIMEOUT_SECONDS = 2;

export const savePythonCode = async (srcCode: string, filePath: string) => {
	await fs.writeFile(filePath, srcCode);
};

export const executePythonCode = async (filePath: string): Promise<string> => {
	try {
		const result = execSync(
			`timeout ${DEFAULT_TIMEOUT_SECONDS} python3 ${filePath}`
		);

		return result.toString("utf8");
	} catch (error) {
		const err = error as SpawnSyncReturns<Buffer>;
		if ((err as any).errno === -105) {
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
};
