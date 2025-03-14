/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  singleQuote: true,
  importOrder: [
    '<BUILT_IN_MODULES>',
    '',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/app/(.*)$',
    '^~/assets/(.*)$',
    '^~/common/(.*)$',
    '^~/core/(.*)$',
    '^~/features/(.*)$',
    '',
    '^~/application/(.*)$',
    '^~/di/(.*)$',
    '^~/entities/(.*)$',
    '^~/infrastructure/(.*)$',
    '^~/interface-adapters/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
