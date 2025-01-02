import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'nst-sdc';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D1D1D6',
    400: '#A0A0AB',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },
  accent: {
    50: '#EEF2FF',  // Indigo-inspired
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
    950: '#1E1B4B',
  },
  green: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    950: '#022C22',
  },
  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
    950: '#431407',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
  blue: {  // New blue palette for additional accents
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  purple: {  // New purple palette for rich contrasts
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
    950: '#3B0764',
  }
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    blue: generateAlphaPalette(BASE_COLORS.blue[500]),
    purple: generateAlphaPalette(BASE_COLORS.purple[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
  },
};

export default defineConfig({
  safelist: [
    'i-ph:check',
    'i-ph:copy',
    'i-ph:x',
  ],
  shortcuts: {
    'nst-sdc-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 nst-sdc-ease-cubic-bezier',
    kdb: 'bg-nst-sdc-elements-code-background text-nst-sdc-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      'nst-sdc': {
        elements: {
          borderColor: {
            DEFAULT: 'var(--nst-sdc-elements-borderColor)',
            light: BASE_COLORS.gray[200],
            dark: BASE_COLORS.gray[800],
          },
          borderColorActive: {
            DEFAULT: 'var(--nst-sdc-elements-borderColorActive)',
            light: BASE_COLORS.accent[300],
            dark: BASE_COLORS.accent[700],
          },
          background: {
            depth: {
              1: {
                DEFAULT: 'var(--nst-sdc-elements-bg-depth-1)',
                light: BASE_COLORS.white,
                dark: BASE_COLORS.gray[900],
              },
              2: {
                DEFAULT: 'var(--nst-sdc-elements-bg-depth-2)',
                light: BASE_COLORS.gray[50],
                dark: BASE_COLORS.gray[800],
              },
              3: {
                DEFAULT: 'var(--nst-sdc-elements-bg-depth-3)',
                light: BASE_COLORS.gray[100],
                dark: BASE_COLORS.gray[700],
              },
              4: {
                DEFAULT: 'var(--nst-sdc-elements-bg-depth-4)',
                light: BASE_COLORS.gray[200],
                dark: BASE_COLORS.gray[600],
              },
            },
          },
          textPrimary: {
            DEFAULT: 'var(--nst-sdc-elements-textPrimary)',
            light: BASE_COLORS.gray[900],
            dark: BASE_COLORS.gray[50],
          },
          textSecondary: {
            DEFAULT: 'var(--nst-sdc-elements-textSecondary)',
            light: BASE_COLORS.gray[700],
            dark: BASE_COLORS.gray[300],
          },
          textTertiary: {
            DEFAULT: 'var(--nst-sdc-elements-textTertiary)',
            light: BASE_COLORS.gray[500],
            dark: BASE_COLORS.gray[400],
          },
          code: {
            background: 'var(--nst-sdc-elements-code-background)',
            text: 'var(--nst-sdc-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--nst-sdc-elements-button-primary-background)',
              backgroundHover: 'var(--nst-sdc-elements-button-primary-backgroundHover)',
              text: 'var(--nst-sdc-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--nst-sdc-elements-button-secondary-background)',
              backgroundHover: 'var(--nst-sdc-elements-button-secondary-backgroundHover)',
              text: 'var(--nst-sdc-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--nst-sdc-elements-button-danger-background)',
              backgroundHover: 'var(--nst-sdc-elements-button-danger-backgroundHover)',
              text: 'var(--nst-sdc-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: {
              DEFAULT: 'var(--nst-sdc-elements-item-contentDefault)',
              light: BASE_COLORS.gray[600],
              dark: BASE_COLORS.gray[300],
            },
            contentActive: {
              DEFAULT: 'var(--nst-sdc-elements-item-contentActive)',
              light: BASE_COLORS.gray[900],
              dark: BASE_COLORS.gray[50],
            },
            contentAccent: {
              DEFAULT: 'var(--nst-sdc-elements-item-contentAccent)',
              light: BASE_COLORS.accent[600],
              dark: BASE_COLORS.accent[400],
            },
            backgroundDefault: {
              DEFAULT: 'var(--nst-sdc-elements-item-backgroundDefault)',
              light: 'transparent',
              dark: 'transparent',
            },
            backgroundActive: {
              DEFAULT: 'var(--nst-sdc-elements-item-backgroundActive)',
              light: BASE_COLORS.gray[100],
              dark: BASE_COLORS.gray[700],
            },
            backgroundAccent: {
              DEFAULT: 'var(--nst-sdc-elements-item-backgroundAccent)',
              light: BASE_COLORS.accent[50],
              dark: `${BASE_COLORS.accent[900]}33`,
            },
          },
          actions: {
            background: 'var(--nst-sdc-elements-actions-background)',
            code: {
              background: 'var(--nst-sdc-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--nst-sdc-elements-artifacts-background)',
            backgroundHover: 'var(--nst-sdc-elements-artifacts-backgroundHover)',
            borderColor: 'var(--nst-sdc-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--nst-sdc-elements-artifacts-inlineCode-background)',
              text: 'var(--nst-sdc-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--nst-sdc-elements-messages-background)',
            linkColor: 'var(--nst-sdc-elements-messages-linkColor)',
            code: {
              background: 'var(--nst-sdc-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--nst-sdc-elements-messages-inlineCode-background)',
              text: 'var(--nst-sdc-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--nst-sdc-elements-icon-success)',
            error: 'var(--nst-sdc-elements-icon-error)',
            primary: 'var(--nst-sdc-elements-icon-primary)',
            secondary: 'var(--nst-sdc-elements-icon-secondary)',
            tertiary: 'var(--nst-sdc-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--nst-sdc-elements-preview-addressBar-background)',
              backgroundHover: 'var(--nst-sdc-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--nst-sdc-elements-preview-addressBar-backgroundActive)',
              text: 'var(--nst-sdc-elements-preview-addressBar-text)',
              textActive: 'var(--nst-sdc-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: {
              DEFAULT: 'var(--nst-sdc-elements-terminals-background)',
              light: BASE_COLORS.gray[950],
              dark: BASE_COLORS.gray[950],
            },
            buttonBackground: {
              DEFAULT: 'var(--nst-sdc-elements-terminals-buttonBackground)',
              light: BASE_COLORS.gray[800],
              dark: BASE_COLORS.gray[700],
            },
          },
          dividerColor: 'var(--nst-sdc-elements-dividerColor)',
          loader: {
            background: 'var(--nst-sdc-elements-loader-background)',
            progress: 'var(--nst-sdc-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--nst-sdc-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--nst-sdc-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: {
              DEFAULT: 'var(--nst-sdc-elements-sidebar-buttonBackgroundDefault)',
              light: BASE_COLORS.gray[100],
              dark: BASE_COLORS.gray[800],
            },
            buttonBackgroundHover: {
              DEFAULT: 'var(--nst-sdc-elements-sidebar-buttonBackgroundHover)',
              light: BASE_COLORS.gray[200],
              dark: BASE_COLORS.gray[700],
            },
            buttonText: {
              DEFAULT: 'var(--nst-sdc-elements-sidebar-buttonText)',
              light: BASE_COLORS.gray[700],
              dark: BASE_COLORS.gray[300],
            },
          },
          cta: {
            background: 'var(--nst-sdc-elements-cta-background)',
            text: 'var(--nst-sdc-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
      unit: 'em',
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
