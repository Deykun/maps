import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
    {languageOptions: { globals: globals.browser }},
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        rules: {
            "react/react-in-jsx-scope": 0,
            'indent': ['error', 4, {
                ignoredNodes: ['JSXElement *', 'JSXElement'],
                SwitchCase: 1,
                flatTernaryExpressions: true,
            }],
            "at-rule-name-space-after": "always-single-line",
            "at-rule-semicolon-newline-after": "always",
            "block-closing-brace-empty-line-before": "never",
            "block-closing-brace-newline-after": "always",
            "block-closing-brace-newline-before": "always-multi-line",
            "block-closing-brace-space-before": "always-single-line",
        }
    }
];