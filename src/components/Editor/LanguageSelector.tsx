import React from "react";
import { useEditorStore } from "@/store/editorStore";
import type { EditorThemeKey } from "@/lib/monacoThemes";

const languageOptions = [
  { value: "Python", label: "Python" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
] as const;

const themeOptions: Array<{ value: EditorThemeKey; label: string }> = [
  { value: "tokyo-night", label: "Tokyo Night" },
  { value: "one-dark", label: "One Dark" },
  { value: "night-owl", label: "Night Owl" },
  { value: "github-dark", label: "GitHub Dark" },
  { value: "vs-dark", label: "VS Dark" },
  { value: "vs-light", label: "VS Light" },
];

interface LanguageSelectorProps {
  problemId: number;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ problemId }) => {
  const { getLang, setLang, editorTheme, setEditorTheme } = useEditorStore();
  const language = getLang(problemId);

  return (
    <div className="flex items-center gap-4 border-b border-[#333] bg-[#111] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 transition-colors">
      <div className="group flex items-center gap-2">
        <label
          className="transition-colors group-hover:text-gray-300"
          htmlFor={`language-selector-${problemId}`}
        >
          Language:
        </label>
        <select
          id={`language-selector-${problemId}`}
          value={language}
          onChange={(event) => setLang(problemId, event.target.value)}
          className="cursor-pointer rounded border border-[#333] bg-[#222] px-2 py-1 text-gray-300 outline-none transition hover:border-gray-600 focus:ring-1 focus:ring-blue-500"
          aria-label="Select programming language"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="group flex items-center gap-2">
        <label
          className="transition-colors group-hover:text-gray-300"
          htmlFor={`theme-selector-${problemId}`}
        >
          Theme:
        </label>
        <select
          id={`theme-selector-${problemId}`}
          value={editorTheme}
          onChange={(event) => setEditorTheme(event.target.value as EditorThemeKey)}
          className="cursor-pointer rounded border border-[#333] bg-[#222] px-2 py-1 text-gray-300 outline-none transition hover:border-gray-600 focus:ring-1 focus:ring-blue-500"
          aria-label="Select editor theme"
        >
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
