module.exports = function(api) {
  api.cache(true);
  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ],
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }]
  ];
  return {
    presets,
    plugins
  };
};
