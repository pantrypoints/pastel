/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
pastel: {
    // Blue - Based on #0A75AD
    blue: '#3c95d3',
'blue-light': '#B2D6F0',
    'blue-dark': '#2A6B99',

    // Green - Based on #00BD6C
    green: '#00BD6C',
    'green-light': '#8EE6C1',
    'green-dark': '#008A4F',

    // Red - Based on #FF6666
    red: '#FF6666',
    'red-light': '#FFB3B3',
    'red-dark': '#D14D4D',

    // Yellow - Based on #FFA500
    yellow: '#FFA500',
    'yellow-light': '#FFD27F',
    'yellow-dark': '#CC8400'
}

				// pastel: {
				// 	blue: '#A8D5E2',
				// 	'blue-light': '#D4EEF7',
				// 	'blue-dark': '#5BA3C0',
				// 	green: '#A8DDB5',
				// 	'green-light': '#D4F0D9',
				// 	'green-dark': '#5AAF72',
				// 	red: '#F4ACAC',
				// 	'red-light': '#FAD4D4',
				// 	'red-dark': '#D46A6A',
				// 	yellow: '#F4E285',
				// 	'yellow-light': '#FAF0B0',
				// 	'yellow-dark': '#C4B030'
				// }
			},
			fontFamily: {
				display: ['"Nunito"', 'system-ui', 'sans-serif'],
				body: ['"DM Sans"', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'monospace']
			},
			fontWeight: {
				'600': '600',
				'700': '700',
				'800': '800',
				'900': '900',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'bounce-slow': 'bounce 3s infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			}
		}
	},
	plugins: []
};
