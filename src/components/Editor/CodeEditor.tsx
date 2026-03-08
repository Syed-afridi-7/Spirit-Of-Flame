import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useEditorStore } from "@/store/editorStore";
import { LanguageSelector } from "./LanguageSelector";
import { EditorActions } from "./EditorActions";
import { runCode } from "@/services/judge0Service";
import { ExecutionResult, ProblemDetail, SubmissionRecord } from "@/types/problem";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
    problem: ProblemDetail;
    setExecutionResult: (result: ExecutionResult) => void;
}

const mapLanguageToMonaco = (lang: string) => {
    switch (lang.toLowerCase()) {
        case "c++": return "cpp";
        case "java": return "java";
        case "python": return "python";
        case "javascript": return "javascript";
        default: return "python";
    }
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ problem, setExecutionResult }) => {
    const {
        getLang, setLang, getCode, setCode,
        editorTheme, addSubmission, markSolved,
        setRunning, setSubmitting, running, submitting
    } = useEditorStore();

    const language = getLang(problem.id);
    const [localCode, setLocalCode] = useState("");

    // Initialize code
    useEffect(() => {
        const langKey = language.toLowerCase() === "c++" ? "cpp" : language.toLowerCase();
        const starter = problem.starterCode[langKey] || "";
        const savedCode = getCode(problem.id, language, starter);
        setLocalCode(savedCode);
    }, [language, problem.id, problem.starterCode, getCode]);

    const handleEditorChange = (value: string | undefined) => {
        const newVal = value ?? "";
        setLocalCode(newVal);
        setCode(problem.id, language, newVal);
    };

    const handleRun = async () => {
        setRunning(true);
        setExecutionResult({ status: "Pending", runtime: 0, memory: 0, output: "" });
        try {
            const result = await runCode(localCode, language);
            setExecutionResult(result);
        } catch (err) {
            setExecutionResult({
                status: "Runtime Error",
                runtime: 0,
                memory: 0,
                output: "Failed to connect to execution service.",
            });
        } finally {
            setRunning(false);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setExecutionResult({ status: "Pending", runtime: 0, memory: 0, output: "" });

        try {
            const result = await runCode(localCode, language);
            setExecutionResult(result);

            // Create submission record
            const submission: SubmissionRecord = {
                id: Math.random().toString(36).substring(7),
                problemId: problem.id,
                language: language,
                code: localCode,
                verdict: result.status as any,
                runtime: result.runtime,
                memory: result.memory,
                timestamp: Date.now(),
            };

            addSubmission(submission);

            if (result.status === "Accepted") {
                markSolved(problem.id);
            }
        } catch (err) {
            setExecutionResult({
                status: "Runtime Error",
                runtime: 0,
                memory: 0,
                output: "Submission failed.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-[#333]">
            <LanguageSelector problemId={problem.id} />

            <div className="flex-1 relative min-h-0">
                <MonacoEditor
                    language={mapLanguageToMonaco(language)}
                    theme={editorTheme === "tokyo-night" ? "vs-dark" : "vs-dark"}
                    value={localCode}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        padding: { top: 16, bottom: 16 },
                        renderLineHighlight: "all",
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                        formatOnPaste: true,
                    }}
                    loading={
                        <div className="flex items-center justify-center text-gray-400 h-full w-full bg-[#1e1e1e]">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    }
                />
            </div>

            <EditorActions
                onRunMode={handleRun}
                onSubmit={handleSubmit}
                isExecuting={running || submitting}
            />
        </div>
    );
};
