// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
},
{
  ignores: [
    'api-types/**',
    '**/api-types/**/*.ts',
  ],
},
)
