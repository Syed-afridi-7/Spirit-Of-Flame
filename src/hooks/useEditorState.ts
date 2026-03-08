import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language } from "@/types/problem";

interface EditorState {
    language: Language | string;
    theme: string;
    codeByLanguage: Record<string, string>;
    setLanguage: (lang: string) => void;
    setTheme: (theme: string) => void;
    setCode: (code: string) => void;
    getCode: () => string;
}

export const useEditorState = create<EditorState>()(
    persist(
        (set, get) => ({
            language: "Python",
            theme: "Tokyo Night",
            codeByLanguage: {},

            setLanguage: (lang) => set({ language: lang }),
            setTheme: (theme) => set({ theme: theme }),
            setCode: (code) =>
                set((state) => ({
                    codeByLanguage: {
                        ...state.codeByLanguage,
                        [state.language]: code,
                    },
                })),
            getCode: () => {
                const state = get();
                return state.codeByLanguage[state.language] || "";
            },
        }),
        {
            name: "ide-storage",
        }
    )
);
