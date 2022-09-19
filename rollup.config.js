import css from "rollup-plugin-import-css";
import { terser } from "rollup-plugin-terser";

export default {
	input: 'src/js/horizontally.js',
	output: [
		{
			name: 'horizontally',
			file: 'dist/horizontally.js',
			format: 'umd',
		}, 
		{
			name: 'horizontally',
			file: 'dist/horizontally.min.js',
			plugins: [
				terser({
					compress: {
						passes: 2,
						drop_console: true,
					}
				})
			],
			format: 'umd',
		}       
	],
	plugins: [ 
		css({
			minify: true
		})
	]
};