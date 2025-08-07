/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = {
  resolver: {
    blockList: exclusionList([/.yalc\/.*/])
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
