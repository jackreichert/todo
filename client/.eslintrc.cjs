module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module', 
    project: 'tsconfig.eslint.json', 
    "tsconfigRootDir": __dirname, 
  },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react-refresh/only-export-components': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
