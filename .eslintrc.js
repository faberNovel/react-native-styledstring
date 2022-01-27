module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  globals: {
    JSX: 'readonly', // avoid error "'JSX' is not defined" for rule no-undef
  },
  ignorePatterns: ['lib/**/*', '.eslintrc.js'],
}
