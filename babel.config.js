// Create this ONLY for jest testing. having import issues
// https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-in-jest
// module.exports = { presets: ['@babel/preset-env'] };

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};