module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ATENÇÃO: Este plugin deve ser o último da lista de plugins.
    'react-native-reanimated/plugin',
  ],
};