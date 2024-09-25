/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				rojo: '#6A28331',
				azulOscuro: '#424B59',
				fondo: '#FFF5E4'
			},

			fontFamily: {
				BadScript: ["Bad Script", "sans-serif"],
				Lobster: ["Lobster", "sans-serif"],
				Montserrat: ["Montserrat", "sans-serif"],
			  },
		},

	},
	plugins: [],
}
