import type * as Monaco from "monaco-editor";
import type { editor } from "monaco-editor";

export const EDITOR_THEMES = [
  { key: 'vs-dark', label: 'VS Code Dark', builtin: true },
  { key: 'vs-light', label: 'VS Code Light', builtin: true },
  { key: 'tokyo-night', label: 'Tokyo Night', builtin: false },
  { key: 'one-dark', label: 'One Dark Pro', builtin: false },
  { key: 'night-owl', label: 'Night Owl', builtin: false },
  { key: 'github-dark', label: 'GitHub Dark', builtin: false },
] as const;

export type EditorThemeKey = (typeof EDITOR_THEMES)[number]['key'];

// ---------------------------------------------------------------------------
// Tokyo Night
// ---------------------------------------------------------------------------
export const tokyoNight: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
    { token: 'keyword', foreground: '9d7cd8' },
    { token: 'keyword.control', foreground: '9d7cd8' },
    { token: 'string', foreground: '9ece6a' },
    { token: 'number', foreground: 'ff9e64' },
    { token: 'type', foreground: '2ac3de' },
    { token: 'type.identifier', foreground: '2ac3de' },
    { token: 'function', foreground: '7aa2f7' },
    { token: 'variable', foreground: 'c0caf5' },
    { token: 'variable.predefined', foreground: 'c0caf5' },
    { token: 'operator', foreground: '89ddff' },
    { token: 'delimiter', foreground: '89ddff' },
    { token: 'tag', foreground: 'f7768e' },
    { token: 'attribute.name', foreground: '7aa2f7' },
    { token: 'attribute.value', foreground: '9ece6a' },
  ],
  colors: {
    'editor.background': '#1a1b26',
    'editor.foreground': '#c0caf5',
    'editor.lineHighlightBackground': '#292e42',
    'editor.selectionBackground': '#33467c',
    'editorCursor.foreground': '#c0caf5',
    'editorLineNumber.foreground': '#3b4261',
    'editorLineNumber.activeForeground': '#737aa2',
    'editorIndentGuide.background': '#292e42',
    'editorIndentGuide.activeBackground': '#3b4261',
    'editor.selectionHighlightBackground': '#33467c55',
    'editorBracketMatch.background': '#33467c44',
    'editorBracketMatch.border': '#33467c',
  },
};

// ---------------------------------------------------------------------------
// One Dark Pro
// ---------------------------------------------------------------------------
export const oneDarkPro: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c678dd' },
    { token: 'keyword.control', foreground: 'c678dd' },
    { token: 'string', foreground: '98c379' },
    { token: 'number', foreground: 'd19a66' },
    { token: 'type', foreground: 'e5c07b' },
    { token: 'type.identifier', foreground: 'e5c07b' },
    { token: 'function', foreground: '61afef' },
    { token: 'variable', foreground: 'e06c75' },
    { token: 'variable.predefined', foreground: 'e06c75' },
    { token: 'operator', foreground: '56b6c2' },
    { token: 'delimiter', foreground: '56b6c2' },
    { token: 'tag', foreground: 'e06c75' },
    { token: 'attribute.name', foreground: 'd19a66' },
    { token: 'attribute.value', foreground: '98c379' },
  ],
  colors: {
    'editor.background': '#282c34',
    'editor.foreground': '#abb2bf',
    'editor.lineHighlightBackground': '#2c313c',
    'editor.selectionBackground': '#3e4451',
    'editorCursor.foreground': '#528bff',
    'editorLineNumber.foreground': '#4b5263',
    'editorLineNumber.activeForeground': '#abb2bf',
    'editorIndentGuide.background': '#3b4048',
    'editorIndentGuide.activeBackground': '#4b5263',
    'editor.selectionHighlightBackground': '#3e445155',
    'editorBracketMatch.background': '#3e445144',
    'editorBracketMatch.border': '#3e4451',
  },
};

// ---------------------------------------------------------------------------
// Night Owl
// ---------------------------------------------------------------------------
export const nightOwl: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '637777', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c792ea' },
    { token: 'keyword.control', foreground: 'c792ea' },
    { token: 'string', foreground: 'ecc48d' },
    { token: 'number', foreground: 'f78c6c' },
    { token: 'type', foreground: 'ffcb8b' },
    { token: 'type.identifier', foreground: 'ffcb8b' },
    { token: 'function', foreground: '82aaff' },
    { token: 'variable', foreground: 'addb67' },
    { token: 'variable.predefined', foreground: 'addb67' },
    { token: 'operator', foreground: '7fdbca' },
    { token: 'delimiter', foreground: '7fdbca' },
    { token: 'tag', foreground: 'f78c6c' },
    { token: 'attribute.name', foreground: 'addb67' },
    { token: 'attribute.value', foreground: 'ecc48d' },
  ],
  colors: {
    'editor.background': '#011627',
    'editor.foreground': '#d6deeb',
    'editor.lineHighlightBackground': '#010e1a',
    'editor.selectionBackground': '#1d3b53',
    'editorCursor.foreground': '#80a4c2',
    'editorLineNumber.foreground': '#4b6479',
    'editorLineNumber.activeForeground': '#c5e4fd',
    'editorIndentGuide.background': '#1d3b53',
    'editorIndentGuide.activeBackground': '#4b6479',
    'editor.selectionHighlightBackground': '#1d3b5355',
    'editorBracketMatch.background': '#1d3b5344',
    'editorBracketMatch.border': '#1d3b53',
  },
};

// ---------------------------------------------------------------------------
// GitHub Dark
// ---------------------------------------------------------------------------
export const githubDark: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'ff7b72' },
    { token: 'keyword.control', foreground: 'ff7b72' },
    { token: 'string', foreground: 'a5d6ff' },
    { token: 'number', foreground: '79c0ff' },
    { token: 'type', foreground: 'ffa657' },
    { token: 'type.identifier', foreground: 'ffa657' },
    { token: 'function', foreground: 'd2a8ff' },
    { token: 'variable', foreground: 'ffa657' },
    { token: 'variable.predefined', foreground: 'ffa657' },
    { token: 'operator', foreground: 'ff7b72' },
    { token: 'delimiter', foreground: 'ff7b72' },
    { token: 'tag', foreground: '7ee787' },
    { token: 'attribute.name', foreground: '79c0ff' },
    { token: 'attribute.value', foreground: 'a5d6ff' },
  ],
  colors: {
    'editor.background': '#0d1117',
    'editor.foreground': '#c9d1d9',
    'editor.lineHighlightBackground': '#161b22',
    'editor.selectionBackground': '#264f78',
    'editorCursor.foreground': '#c9d1d9',
    'editorLineNumber.foreground': '#484f58',
    'editorLineNumber.activeForeground': '#c9d1d9',
    'editorIndentGuide.background': '#21262d',
    'editorIndentGuide.activeBackground': '#484f58',
    'editor.selectionHighlightBackground': '#264f7855',
    'editorBracketMatch.background': '#264f7844',
    'editorBracketMatch.border': '#264f78',
  },
};

// ---------------------------------------------------------------------------
// Registration helper
// ---------------------------------------------------------------------------
export function registerThemes(monaco: typeof Monaco): void {
  monaco.editor.defineTheme("tokyo-night", tokyoNight);
  monaco.editor.defineTheme("one-dark", oneDarkPro);
  monaco.editor.defineTheme("night-owl", nightOwl);
  monaco.editor.defineTheme("github-dark", githubDark);
}
