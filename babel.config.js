module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.test.tsx',
          '.jsx',
          '.js',
          '.json',
          '.svg',
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
