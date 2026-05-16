/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        'deep-primary': 'var(--deep-primary)',
        'dark-purple': 'var(--dark-purple)',
        'main-purple': 'var(--main-purple)',
        'muted-rose': 'var(--muted-rose)',
        'soft-rose': 'var(--soft-rose)',
        'light-cream': 'var(--light-cream)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 0.5rem)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 0.25rem)',
        xl: 'calc(var(--radius) + 0.5rem)',
        '2xl': 'calc(var(--radius) + 1rem)',
        '3xl': 'calc(var(--radius) + 1.5rem)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(82, 44, 93, 0.10), 0 1px 4px rgba(82, 44, 93, 0.06)',
        'card-lg': '0 8px 40px rgba(82, 44, 93, 0.18), 0 2px 8px rgba(82, 44, 93, 0.10)',
        'bottom-nav': '0 -4px 24px rgba(82, 44, 93, 0.08)',
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};