#!/bin/bash

# Step 1: Run the Angular build with output hashing set to none
ng build --output-hashing none

# Step 2: Concatenate the JavaScript files into a single file
cat dist/cedar-artifact-selector-component/main.js dist/cedar-artifact-selector-component/polyfills.js dist/cedar-artifact-selector-component/runtime.js > dist/cedar-artifact-selector-component/artifact-selector.js

# Step 3: Copy the concatenated file to the target directory
cp dist/cedar-artifact-selector-component/artifact-selector.js ../cedar-template-editor/app/

# Print a message indicating the script has finished
echo "Build and copy completed successfully."
