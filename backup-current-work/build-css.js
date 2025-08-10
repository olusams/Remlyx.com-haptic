const fs = require('fs');
const path = require('path');

// CSS optimization script
class CSSOptimizer {
  constructor() {
    this.cssDir = 'assets/css';
    this.modulesDir = 'assets/css/modules';
    this.outputDir = 'assets/css/dist';
  }

  // Create output directory if it doesn't exist
  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Minify CSS by removing comments, whitespace, and unnecessary characters
  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim();
  }

  // Combine multiple CSS files
  combineCSSFiles(files) {
    let combinedCSS = '';
    
    files.forEach(file => {
      const filePath = path.join(this.cssDir, file);
      if (fs.existsSync(filePath)) {
        const css = fs.readFileSync(filePath, 'utf8');
        combinedCSS += `/* ${file} */\n${css}\n\n`;
      }
    });
    
    return combinedCSS;
  }

  // Build optimized CSS
  buildOptimizedCSS() {
    console.log('Building optimized CSS...');
    
    this.ensureOutputDir();
    
    // Define which CSS files to include (only essential ones)
    const essentialFiles = [
      'modules/base.css',
      'modules/components.css',
      'bootstrap.min.css',
      'swiper.min.css'
    ];
    
    // Combine and minify
    const combinedCSS = this.combineCSSFiles(essentialFiles);
    const minifiedCSS = this.minifyCSS(combinedCSS);
    
    // Write optimized file
    const outputPath = path.join(this.outputDir, 'style-optimized.min.css');
    fs.writeFileSync(outputPath, minifiedCSS);
    
    const originalSize = fs.statSync(path.join(this.cssDir, 'style.css')).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ Optimization complete!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Size reduction: ${reduction}%`);
    console.log(`📏 Original: ${(originalSize / 1024).toFixed(2)}KB`);
    console.log(`📏 Optimized: ${(optimizedSize / 1024).toFixed(2)}KB`);
    
    return outputPath;
  }

  // Create a development version (non-minified)
  buildDevCSS() {
    console.log('Building development CSS...');
    
    this.ensureOutputDir();
    
    const essentialFiles = [
      'modules/base.css',
      'modules/components.css',
      'bootstrap.min.css',
      'swiper.min.css'
    ];
    
    const combinedCSS = this.combineCSSFiles(essentialFiles);
    const outputPath = path.join(this.outputDir, 'style-optimized.css');
    fs.writeFileSync(outputPath, combinedCSS);
    
    console.log(`✅ Development CSS built: ${outputPath}`);
    return outputPath;
  }
}

// Run the optimizer
const optimizer = new CSSOptimizer();

// Check command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'build';

switch (command) {
  case 'build':
    optimizer.buildOptimizedCSS();
    break;
  case 'dev':
    optimizer.buildDevCSS();
    break;
  case 'both':
    optimizer.buildOptimizedCSS();
    optimizer.buildDevCSS();
    break;
  default:
    console.log('Usage: node build-css.js [build|dev|both]');
    console.log('  build - Create minified production CSS');
    console.log('  dev   - Create development CSS');
    console.log('  both  - Create both versions');
} 