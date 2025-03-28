/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class', //dark mode is apply when there is change in the root class
    theme: {
        fontFamily: {
            // add the font-size to 62.%% in .css file in html tag
            poppins: ['Poppins', 'sans-serif'], //font links should be at the index.html scripts
            custom_font_name: ['ADELIA', 'cursive'],
            // font-poppins , font-adelia to use the custom fonts classes
        },
        fontSize: {
            12: '1.2rem', // 12px
            14: '1.4rem', // 14px
            16: '1.6rem', // 16px
            18: '1.8rem', // 18px
            20: '2.0rem', // 20px
            24: '2.4rem', // 24px
            28: '2.8rem', //28px
            32: '3.2rem', // 32px
            48: '4.8rem', // 48px
            56: '5.6rem', // 56px
            64: '6.4rem', // 64px
        },
        extend: {
            // screen responsive break-points
            screens: {
                '@sm': { max: '639px' },
                '@md': { min: '640px', max: '1023px' },
                '@lg': { min: '1024px', max: '1440px' },
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                primary: '#084245',
                'primary-opacity': 'rgba(8, 66, 69, 0.7)',
                secondary: { DEFAULT: '#d9dd28' },
                warning: { DEFAULT: '#fb8903', light: '#fff0ca' },
                danger: { DEFAULT: '#ff0000', light: ' #ffebeb' },
                success: { DEFAULT: '#5cb85c', light: '#ecffef' },
                gray: {
                    dark: '#2D4A58',
                    DEFAULT: '#3c4858',
                    medium: '#818181',
                    light: '#b7b7b7',
                    lightest: '#f2f2f3',
                },

                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                // primary: {
                //     DEFAULT: 'hsl(var(--primary))',
                //     foreground: 'hsl(var(--primary-foreground))',
                // },
                // secondary: {
                //     DEFAULT: 'hsl(var(--secondary))',
                //     foreground: 'hsl(var(--secondary-foreground))',
                // },
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
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },

                borderRadius: {
                    lg: 'var(--radius)',
                    md: 'calc(var(--radius) - 2px)',
                    sm: 'calc(var(--radius) - 4px)',
                },

                filled: {},
            },
            padding: {
                5: '1rem',
                15: '2rem',
            },
            borderWidth: {
                DEFAULT: '1px',
                0: '0px',
                1: '1px',
            },
        },
    },
    plugins: [],
    important: true,
};

('https://mrtnschndlr.medium.com/things-to-rethink-with-tailwind-css-part-1-breakpoints-b2809e2bbb2');
