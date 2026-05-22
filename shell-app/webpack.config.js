const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',

  remotes: {
    // Le remote est chargé dynamiquement depuis l'environnement
    // Voir src/app/core/remote-loader.ts
    remoteApp: 'remoteApp@http://localhost:4201/remoteEntry.js',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
