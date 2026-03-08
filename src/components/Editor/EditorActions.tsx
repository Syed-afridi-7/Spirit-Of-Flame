import React from "react";
import { Play, Send } from "lucide-react";

interface EditorActionsProps {
    onRunMode: () => void;
    onSubmit: () => void;
    isExecuting?: boolean;
}

export const EditorActions: React.FC<EditorActionsProps> = ({
    onRunMode,
    onSubmit,
    isExecuting = false,
}) => {
    return (
        <div className="flex items-center justify-end px-4 py-3 bg-[#1e1e1e] border-t border-[#333] space-x-3">
            <button
                onClick={onRunMode}
                disabled={isExecuting}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded hover:bg-gray-700 transition disabled:opacity-50"
            >
                <Play className="w-4 h-4" /> Run Code
            </button>
            <button
                onClick={onSubmit}
                disabled={isExecuting}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition disabled:opacity-50"
            >
                <Send className="w-4 h-4" /> Submit
            </button>
        </div>
    );
};
