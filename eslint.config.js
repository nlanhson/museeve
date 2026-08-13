const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'ios/*', 'android/*', 'node_modules/*'],
  },
  {
    rules: {
      // RN renders a bare "" or 0 outside <Text> and crashes in production
      'react/jsx-no-leaked-render': 'error',
    },
  },
]);
