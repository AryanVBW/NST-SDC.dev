import { type ITheme } from '@xterm/xterm';

const style = getComputedStyle(document.documentElement);
function cssVar(name: string) {
  return style.getPropertyValue(name) || undefined;
}

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar('--nst-sdc-elements-terminal-cursorColor'),
    cursorAccent: cssVar('--nst-sdc-elements-terminal-cursorColorAccent'),
    foreground: cssVar('--nst-sdc-elements-terminal-textColor'),
    background: cssVar('--nst-sdc-elements-terminal-backgroundColor'),
    selectionBackground: cssVar('--nst-sdc-elements-terminal-selection-backgroundColor'),
    selectionForeground: cssVar('--nst-sdc-elements-terminal-selection-textColor'),
    selectionInactiveBackground: cssVar('--nst-sdc-elements-terminal-selection-backgroundColorInactive'),

    // ANSI Colors
    black: cssVar('--nst-sdc-elements-terminal-color-black'),
    red: cssVar('--nst-sdc-elements-terminal-color-red'),
    green: cssVar('--nst-sdc-elements-terminal-color-green'),
    yellow: cssVar('--nst-sdc-elements-terminal-color-yellow'),
    blue: cssVar('--nst-sdc-elements-terminal-color-blue'),
    magenta: cssVar('--nst-sdc-elements-terminal-color-magenta'),
    cyan: cssVar('--nst-sdc-elements-terminal-color-cyan'),
    white: cssVar('--nst-sdc-elements-terminal-color-white'),
    brightBlack: cssVar('--nst-sdc-elements-terminal-color-brightBlack'),
    brightRed: cssVar('--nst-sdc-elements-terminal-color-brightRed'),
    brightGreen: cssVar('--nst-sdc-elements-terminal-color-brightGreen'),
    brightYellow: cssVar('--nst-sdc-elements-terminal-color-brightYellow'),
    brightBlue: cssVar('--nst-sdc-elements-terminal-color-brightBlue'),
    brightMagenta: cssVar('--nst-sdc-elements-terminal-color-brightMagenta'),
    brightCyan: cssVar('--nst-sdc-elements-terminal-color-brightCyan'),
    brightWhite: cssVar('--nst-sdc-elements-terminal-color-brightWhite'),

    ...overrides,
  };
}
