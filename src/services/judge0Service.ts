import { ExecutionResult, Language } from "@/types/problem";

const JUDGE0_BASE_URL = "https://judge0-ce.p.rapidapi.com";
// Alternatively, if they use a self hosted:
// const JUDGE0_BASE_URL = "http://localhost:2358";

const LANGUAGE_IDS: Record<Language | string, number> = {
    "C++": 54, // GCC 9.2.0
    "Java": 62, // OpenJDK 13.0.1
    "Python": 71, // Python 3.8.1
    "JavaScript": 93, // Node.js 18.15.0
};

export const runCode = async (
    code: string,
    language: Language | string,
    testInput: string = ""
): Promise<ExecutionResult> => {
    // Try to use a mock delay to simulate since user didn't provide API keys yet.
    // In a real env, you would make standard fetch calls to Judge0.
    // We'll mimic the exact judge0 structure as requested:

    return new Promise((resolve) => {
        setTimeout(() => {
            // Basic simulation based on code content for visual testing purposes
            if (code.includes("error") || code.includes("SyntaxError")) {
                resolve({
                    status: "Compilation Error",
                    runtime: 0,
                    memory: 0,
                    output: "SyntaxError: Unexpected token",
                });
                return;
            }

            if (code.includes("while(true)") || code.includes("infinite")) {
                resolve({
                    status: "Time Limit Exceeded",
                    runtime: 2000,
                    memory: 24.5,
                    output: "Process killed: TLE limit reached.",
                });
                return;
            }

            if (code.includes("return false") || code.includes("Wrong")) {
                resolve({
                    status: "Wrong Answer",
                    runtime: 11,
                    memory: 8.5,
                    output: "Output: [0,0]\nExpected: [0,1]",
                });
                return;
            }

            resolve({
                status: "Accepted",
                runtime: 18, // random realistic runtime ms
                memory: 9.2, // random MB
                output: testInput ? `Result for test: ${testInput}\n[0,1]` : "[0,1]\nProgram executed successfully.",
            });
        }, 1500); // simulate network delay
    });
};
