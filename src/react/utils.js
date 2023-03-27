const files = require.context("./components", false, /\.jsx$/);

const modlues = {};
files.keys().forEach((key) => {
  modlues[key.split(".")[1].replace("/", "")] = files(key);
});

export default modlues;
