// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

import { relative } from 'path';
import { cwd } from 'process';

/**
 * @param {string[]} filenames
 * @returns {string}
 */
const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => relative(cwd(), f)).join(' --file ')}`;

/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*.{js,jsx,ts,tsx,cjs,mjs}': [buildEslintCommand],
  '*': ['prettier --check --ignore-unknown'],
};

export default config;
