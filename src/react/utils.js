const files = require.context("./components", false, /\.(j|t)sx$/);

const modlues = {};
files.keys().forEach((key) => {
  modlues[key.split(".")[1].replace("/", "")] = files(key);
});

export default modlues;
