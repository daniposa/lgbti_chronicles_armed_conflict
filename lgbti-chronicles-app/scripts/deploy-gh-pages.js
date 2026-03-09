#!/usr/bin/env node
/**
 * Deploys the built app to GitHub Pages.
 * Copies index.html to 404.html for SPA routing (GitHub Pages serves 404 for unknown paths).
 * Uses gh-pages package to push to gh-pages branch.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, '../dist/lgbti-chronicles-app/browser');
const indexPath = path.join(browserDir, 'index.html');
const notFoundPath = path.join(browserDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('Build output not found. Run: npm run build:gh-pages');
  process.exit(1);
}

// Copy index.html to 404.html for SPA routing on GitHub Pages
fs.copyFileSync(indexPath, notFoundPath);
console.log('Created 404.html for SPA routing');

// Deploy using gh-pages
execSync('npx gh-pages -d dist/lgbti-chronicles-app/browser', {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..')
});

console.log('Deployed to GitHub Pages!');
