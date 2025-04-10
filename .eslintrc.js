module.exports = {
   root: true,
   extends: '@react-native',
   rules: {
      quotes: ['warn', 'single'],
      'react/react-in-jsx-scope': 'off',
      'no-dupe-else-if': 'error',
      'no-unused-vars': 'error',
      'react-hooks/exhaustive-deps': 'off',
   },
}
