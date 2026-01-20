const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

// Build the main plugin code
async function buildCode() {
  const ctx = await esbuild.context({
    entryPoints: ['src/code.ts'],
    bundle: true,
    outfile: 'dist/code.js',
    target: 'es6',
    format: 'iife',
    minify: !isWatch,
    define: {
      '__html__': JSON.stringify(fs.readFileSync('src/ui.html', 'utf8')),
    },
  });

  if (isWatch) {
    await ctx.watch();
    console.log('Watching code.ts...');
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

// Copy and process UI HTML
async function buildUI() {
  const srcPath = path.join(__dirname, 'src', 'ui.html');
  const distPath = path.join(__dirname, 'dist', 'ui.html');
  
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Copy ui.html to dist
  fs.copyFileSync(srcPath, distPath);
  console.log('UI copied to dist/');
}

async function build() {
  try {
    await buildCode();
    await buildUI();
    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
