const plugin = require('tailwindcss/plugin');

const iconTokens = {
  'neutral-weakest': '#557086',
  'neutral-weaker': '#2f4553',
  'neutral-weak': '#b1b4d3',
  'neutral-default': '#fff',
  'neutral-strong': '#1a2c38',
  'neutral-stronger': '#0f212e',
  'neutral-strongest': '#071824',
  'primary-foreground': 'hsl(var(--primary-foreground))',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', 'class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        xl: '1200px',
        lg: '1024px',
        md: '768px',
        sm: '640px',
      },
    },
    screens: {
      sm: '400px',
      md: '640px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          disabled: 'hsl(var(--input-disabled))',
        },
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          light: 'hsl(var(--secondary-light))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          glow: 'hsl(var(--accent-glow))',
        },
        'accent-purple': {
          DEFAULT: 'hsl(var(--accent-purple))',
          foreground: 'hsl(var(--accent-foreground))',
          glow: 'hsl(var(--accent-glow))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      gridColumn: {
        span14: 'span 14 / span 14',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-20px)', opacity: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        slideInLeft: 'slideInLeft 600ms ease-out',
        slideOutLeft: 'slideOutLeft 600ms ease-out',
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      fontFamily: {
        custom: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        card: 'var(--shadow-card)',
      },
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
        'neutral-weak': '#557086',
        'neutral-weaker': '#2f4553',
        'neutral-weak': '#b1b4d3',
        'neutral-default': '#fff',
        'neutral-strong': '#1a2c38',
        'neutral-stronger': '#0f212e',
        'neutral-strongest': '#1a2c38',
        'brand-weakest': '#557086',
        'brand-weaker': '#2f4553',
        'brand-weak': '#213743',
        'brand-default': '#1a2c38',
        'brand-strong': '#1a2c38',
        'brand-stronger': '#0f212e',
        'brand-strongest': '#071824',
        'roulette-red': '#fe2247',
        'roulette-red-hover': '#fe6e86',
        'roulette-black': '#2f4553',
        'roulette-black-hover': '#4b6e84',
        'roulette-green': '#419e3f',
        'roulette-green-hover': '#69c267',
        'keno-selected-tile': '#962EFF',
        'keno-selected-tile-hover': 'rgb(176, 97, 255)',
      }),
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-subtle': 'var(--gradient-subtle)',
        'gradient-glow': 'var(--gradient-glow)',
      },
      textColor: ({ theme }) => ({
        'roulette-red': '#fe2247',
        'roulette-red-hover': '#fe6e86',
        'roulette-black': '#2f4553',
        'roulette-black-hover': '#4b6e84',
        'roulette-green': '#419e3f',
        'roulette-green-hover': '#69c267',
        'neutral-weak': '#557086',
        'neutral-weaker': '#2f4553',
        'neutral-weak': '#b1b4d3',
        'neutral-default': '#fff',
        'neutral-strong': '#1a2c38',
        'neutral-stronger': '#0f212e',
        'neutral-strongest': '#1a2c38',
        'brand-weakest': '#1a2c38',
        'brand-weaker': '#1a2c38',
        'brand-weak': '#1a2c38',
        'brand-default': '#1a2c38',
        'brand-strong': '#1a2c38',
        'brand-stronger': '#1a2c38',
        'brand-strongest': '#071824',
        ...theme('colors'),
      }),
      borderColor: ({ theme }) => ({
        'roulette-red': '#fe2247',
        'roulette-red-hover': '#fe6e86',
        'roulette-black': '#2f4553',
        'roulette-black-hover': '#4b6e84',
        'roulette-green': '#419e3f',
        'roulette-green-hover': '#69c267',
        'neutral-weak': '#557086',
        'neutral-weaker': '#2f4553',
        'neutral-weak': '#b1b4d3',
        'neutral-default': '#fff',
        'neutral-strong': '#1a2c38',
        'neutral-stronger': '#0f212e',
        'neutral-strongest': '#1a2c38',
        'brand-weakest': '#557086',
        'brand-weaker': '#2f4553',
        'brand-weak': '#213743',
        'brand-default': '#1a2c38',
        'brand-strong': '#1a2c38',
        'brand-stronger': '#0f212e',
        'brand-strongest': '#071824',
        ...theme('colors'),
      }),
      fill: ({ theme }) => ({
        'neutral-weak': '#557086',
        'neutral-weaker': '#2f4553',
        'neutral-weak': '#b1b4d3',
        'neutral-default': '#fff',
        'neutral-strong': '#1a2c38',
        'neutral-stronger': '#0f212e',
        'neutral-strongest': '#1a2c38',
        'brand-weakest': '#557086',
        'brand-weaker': '#2f4553',
        'brand-weak': '#213743',
        'brand-default': '#1a2c38',
        'brand-strong': '#1a2c38',
        'brand-stronger': '#0f212e',
        'brand-strongest': '#071824',
        ...theme('colors'),
      }),
    },
    transitionProperty: {
      smooth: 'var(--transition-smooth)',
      glow: 'var(--transition-glow)',
    },
  },
  safelist: [
    ...Array.from({ length: 20 }, (_, i) => `row-start-${i + 1}`),
    ...Array.from({ length: 20 }, (_, i) => `row-end-${i + 1}`),
  ],
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ matchUtilities }) => {
      matchUtilities(
        {
          icon: value => ({ color: value }),
        },
        {
          values: { ...iconTokens },
        }
      );
    }),
  ],
};
