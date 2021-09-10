module.exports = {
	extends: [
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		indent: [
			"error",
			"tab"
		],
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				varsIgnorePattern: "React",
				argsIgnorePattern: "^_",
			},
		],
		quotes: [
			"error",
			"double",
		],
	}
}