module.exports = {
   root: true,
   extends: '@react-native',
   plugins: ['simple-import-sort', 'eslint-plugin-import'],
   rules: {
      quotes: ['warn', 'single'],
      'react/react-in-jsx-scope': 'off',
      'no-dupe-else-if': 'error',
      'no-unused-vars': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'sort-imports': 0,
      'import/order': 0,
      'simple-import-sort/imports': [
         1,
         {
            groups: [
               ['^react$', '^react-native$'],
               ['^react-native'],
               ['^\\u0000'],
               ['^@?\\w'],
               ['^\\.'],
            ],
         },
      ],
      'simple-import-sort/exports': 1,
      'import/first': 1,
      'import/newline-after-import': 1,
      'import/no-duplicates': 1,
      'import/no-extraneous-dependencies': 1,
   },
}
