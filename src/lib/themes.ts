export interface Theme {
  name: string;
  label: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    currentLine: string;
    foreground: string;
    comment: string;
    cyan: string;
    green: string;
    orange: string;
    pink: string;
    purple: string;
    red: string;
    yellow: string;
  };
}

export const themes: Record<string, Theme> = {
  dracula: {
    name: "dracula",
    label: "Dracula",
    colors: {
      background: "#282a36",
      backgroundSecondary: "#21222c",
      currentLine: "#44475a",
      foreground: "#f8f8f2",
      comment: "#6272a4",
      cyan: "#8be9fd",
      green: "#50fa7b",
      orange: "#ffb86c",
      pink: "#ff79c6",
      purple: "#bd93f9",
      red: "#ff5555",
      yellow: "#f1fa8c",
    },
  },
  monokai: {
    name: "monokai",
    label: "Monokai",
    colors: {
      background: "#272822",
      backgroundSecondary: "#1e1f1c",
      currentLine: "#3e3d32",
      foreground: "#f8f8f2",
      comment: "#75715e",
      cyan: "#66d9ef",
      green: "#a6e22e",
      orange: "#fd971f",
      pink: "#f92672",
      purple: "#ae81ff",
      red: "#f92672",
      yellow: "#e6db74",
    },
  },
  nord: {
    name: "nord",
    label: "Nord",
    colors: {
      background: "#2e3440",
      backgroundSecondary: "#242933",
      currentLine: "#3b4252",
      foreground: "#eceff4",
      comment: "#616e88",
      cyan: "#88c0d0",
      green: "#a3be8c",
      orange: "#d08770",
      pink: "#b48ead",
      purple: "#b48ead",
      red: "#bf616a",
      yellow: "#ebcb8b",
    },
  },
  "one-dark": {
    name: "one-dark",
    label: "One Dark",
    colors: {
      background: "#282c34",
      backgroundSecondary: "#21252b",
      currentLine: "#2c313c",
      foreground: "#abb2bf",
      comment: "#5c6370",
      cyan: "#56b6c2",
      green: "#98c379",
      orange: "#d19a66",
      pink: "#c678dd",
      purple: "#c678dd",
      red: "#e06c75",
      yellow: "#e5c07b",
    },
  },
  "solarized-dark": {
    name: "solarized-dark",
    label: "Solarized Dark",
    colors: {
      background: "#002b36",
      backgroundSecondary: "#001e26",
      currentLine: "#073642",
      foreground: "#839496",
      comment: "#586e75",
      cyan: "#2aa198",
      green: "#859900",
      orange: "#cb4b16",
      pink: "#d33682",
      purple: "#6c71c4",
      red: "#dc322f",
      yellow: "#b58900",
    },
  },
  "github-light": {
    name: "github-light",
    label: "GitHub Light",
    colors: {
      background: "#ffffff",
      backgroundSecondary: "#f6f8fa",
      currentLine: "#f1f3f5",
      foreground: "#24292e",
      comment: "#6a737d",
      cyan: "#22863a",
      green: "#22863a",
      orange: "#e36209",
      pink: "#d73a49",
      purple: "#6f42c1",
      red: "#d73a49",
      yellow: "#b08800",
    },
  },
};
