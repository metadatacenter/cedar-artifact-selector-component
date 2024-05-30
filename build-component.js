const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{
  const files = [
    './dist/cedar-artifact-selector-component/runtime.js',
    './dist/cedar-artifact-selector-component/polyfills.js',
    './dist/cedar-artifact-selector-component/scripts.js',
    './dist/cedar-artifact-selector-component/main.js'
  ];

  await fs.ensureDir('widget');
  await concat(files, '.dist/cedar-artifact-selector-component/artifact-selector.js');
}
build();
