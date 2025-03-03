import rootConfig from '../../eslint.config.mjs';

export default {
  env: {
    node: true,
    es2021: true,
  },
  extends: [rootConfig, 'eslint:recommended', 'next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Additional rules can be added here
  },
};
