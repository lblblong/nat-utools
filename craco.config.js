const CracoAlias = require('craco-alias')

module.exports = {
  eslint: {
    enable: false,
    model: 'file',
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
}
