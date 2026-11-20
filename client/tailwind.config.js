/**
 * DUDU BUBU FRIED CHICKEN design system.
 *
 * A late-night takeaway menu board: warm cream paper, cocoa-black ink, chilli
 * red and fried-gold accents, heavy condensed display caps with tight leading
 * and a marquee ticker. Deliberately louder and warmer than the quiet serif
 * storefronts this stack was first built for.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F7EFE1', // page paper — warm, like a paper menu
        ivory: '#FFFBF3', // raised surfaces
        sand: '#EDE1CE', // fills, skeletons
        clay: '#DFCFB6',
        ink: '#1A1512', // cocoa black — text and dark sections
        'ink-soft': '#6B5E54',
        'ink-faint': '#9C8D7F',

        chilli: {
          50: '#FDECE7',
          100: '#FAD6CC',
          200: '#F3AD9A',
          400: '#EA6A4B',
          500: '#DE3A1F',
          600: '#B92A13',
          700: '#8F1F0D',
          900: '#4A120A',
        },
        fry: {
          100: '#FDF0D2',
          200: '#FADFA6',
          300: '#F5C86A',
          400: '#EFAF3D',
          500: '#D98E1B',
          700: '#8F5A08',
        },
        herb: {
          100: '#E4EBD8',
          300: '#B9C9A0',
          500: '#7C9560',
          700: '#4F6339',
        },

        // Legacy token names kept so every existing surface inherits the new
        // palette without a sweeping class rename.
        sage: {
          50: '#F1F4EA',
          100: '#E4EBD8',
          200: '#CBD8B8',
          400: '#9DB184',
          500: '#7C9560',
          600: '#5F7647',
          700: '#4F6339',
          900: '#2F3A23',
        },
        taupe: {
          100: '#F7EBD9',
          300: '#E0C6A3',
          500: '#C08F5C',
          700: '#8A5F35',
        },
        wine: {
          500: '#B92A13',
          600: '#8F1F0D',
          700: '#6B170A',
        },
      },
      fontFamily: {
        display: ['Anton', '"Arial Narrow"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        micro: '0.22em',
        wide2: '0.14em',
        tight2: '-0.02em',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        pill: '999px',
      },
      boxShadow: {
        lift: '0 18px 40px -28px rgba(26, 21, 18, 0.55)',
        panel: '0 24px 60px -32px rgba(26, 21, 18, 0.45)',
        sticker: '4px 4px 0 0 rgba(26, 21, 18, 1)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        snap: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.92) rotate(-3deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-3deg)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.65s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in-right': 'slide-in-right 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 10s ease-out both',
        marquee: 'marquee 26s linear infinite',
        pop: 'pop 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) both',
        steam: 'steam 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
