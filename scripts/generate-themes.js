/**
 * Script that reads all the scss themes and compiles them to css.
 * The output theme directory was added in the assets directory so that they could be served as static files for ng serve.
 */
const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');

// Directories
const rootDir = path.join(__dirname, '..');
const inputDir = path.join(rootDir, 'src', 'assets', 'scss', 'themes');
const outputDir = path.join(rootDir, 'src', 'assets', 'themes');

// Check that src/assets/themes exists, if not create it
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Get all the theme files
const themes = fs.readdirSync(inputDir);

// For each theme scss file compile it and save the css output
themes.forEach(filename => {
    const inputFile = path.join(inputDir, filename);
    const outputFile = path.join(outputDir, filename).replace('.scss', '.css'); // dirty but quick ;)

    const theme = sass.renderSync({file: inputFile});
    fs.writeFileSync(outputFile, theme.css);

    minify({
        compressor: cleanCSS,
        input: outputFile,
        output: outputFile,
    });
});
