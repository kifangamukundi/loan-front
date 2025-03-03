/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',  // Your app's source files
    '../../shared/kifanga-ui-*/components/**/*.{js,ts,jsx,tsx,mdx}',  // All components in kifanga-ui-* shared libraries
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#38A169',
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                color: '#2F855A',
                textDecoration: 'underline',
                backgroundColor: '#e6fffa', 
                padding: '2px', 
                borderRadius: '4px',
              },
            },
            // Targeting paragraphs
            p: {
              color: '#4A5568',
            },
            // Targeting all headings (h1 to h6)
            h1: {
              color: '#2D3748',
            },
            h2: {
              color: '#2D3748',
            },
            h3: {
              color: '#2D3748', 
            },
            h4: {
              color: '#2D3748',
            },
            h5: {
              color: '#2D3748',
            },
            h6: {
              color: '#2D3748',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};