module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:storybook/recommended',
		'prettier'
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'eslint-plugin-storybook',
		'react',
		'prettier'
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'react/no-unescaped-entities': 'warn',
		'no-extra-semi': 'off',
		'indent': 'off',
		'keyword-spacing': 'error',
		'no-tabs': 0,
		'linebreak-style': 0,
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'no-mixed-spaces-and-tabs': 0,
	},
};
