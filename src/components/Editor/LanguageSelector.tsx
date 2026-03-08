import React from "react";
import { useEditorStore } from "@/store/editorStore";

const supportedLanguages = ["Python", "JavaScript", "Java", "C++"];
const supportedThemes = ["tokyo-night", "vs-dark", "light"];

interface LanguageSelectorProps {
    problemId: number;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ problemId }) => {
    const { getLang, setLang, editorTheme, setEditorTheme } = useEditorStore();
    const language = getLang(problemId);

    return (
        <div className="flex items-center gap-4 bg-[#111] border-b border-[#333] px-4 py-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider transition-colors">
            <div className="flex items-center gap-2 group">
                <span className="group-hover:text-gray-300 transition-colors">Language:</span>
                <select
                    value={language}
                    onChange={(e) => setLang(problemId, e.target.value)}
                    className="bg-[#222] text-gray-300 border border-[#333] rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 transition cursor-pointer hover:border-gray-600"
                >
                    {supportedLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2 group">
                <span className="group-hover:text-gray-300 transition-colors">Theme:</span>
                <select
                    value={editorTheme}
                    onChange={(e) => setEditorTheme(e.target.value)}
                    className="bg-[#222] text-gray-300 border border-[#333] rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 transition cursor-pointer hover:border-gray-600"
                >
                    {supportedThemes.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
