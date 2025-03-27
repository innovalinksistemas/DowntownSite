/** @type {import('tailwindcss').Config} */
export default {
	
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		
		extend: {

			
			backgroundImage:{
				'fondo1': "url('/src/assets/fondo1.webp')",
				'fondo2': "url('/src/assets/fondo2cc.png')",
				
			},
			colors:{
				fondo: '#FFFFFF',
				fondog:'#F2F2F2',
				fondoF:'#CCCACA',
				botones:"#AA1A2B",
				gris:"#424b59",
				titulo:"#6D6C6C",
				texto:"#3F3F3F"
			},

			fontFamily: {
				BadScript: ["Bad Script", "sans-serif"],
				Lobster: ["Lobster", "sans-serif"],
				Montserrat: ["Montserrat", "sans-serif"],
			  },

			borderRadius: {
				'4xl': '8rem'
			},
		},

	},
	plugins: [
		require('flowbite/plugin')
	],
}
