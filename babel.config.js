module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          'leanplum': './leanplum',
          'screens': './src/screens',
          'components': './src/components',
          'utils': './src/utils',
          'navigations': './src/navigations',
        },
      },
    ],
  ],
};
