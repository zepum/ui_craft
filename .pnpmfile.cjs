module.exports = {
  hooks: {
    readPackage(pkg) {
      // Suppressing react-inspector react peerDependency check
      // @see https://github.com/tajo/ladle/issues/597#issuecomment-2658940532
      if (pkg.name === 'react-inspector') {
        pkg.peerDependencies.react = '*';
      }
      return pkg;
    },
  },
};
