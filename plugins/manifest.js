class Manifest {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap("Manifest", (stats) => {
      // console.log(stats);
    });
  }
}

module.exports = Manifest;
