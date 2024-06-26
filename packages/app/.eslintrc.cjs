module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"cypress/globals": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"cypress",
		"jest"
	],
	"settings": {
		"react": {
			"version": "^18.2.0"
		}
	},
	"rules": {
		"indent": ["error", "tab"]
	},
	"ignorePatterns" : "dist"
}
