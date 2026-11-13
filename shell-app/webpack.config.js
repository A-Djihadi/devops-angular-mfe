const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',

  // The remote entry URL is resolved at runtime (see src/app/core/remote-loader.ts)
  // so the same image can be deployed to any environment without a rebuild.

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
