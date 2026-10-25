import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('PWA & Offline Configuration Suite', () => {
  const rootDir = path.resolve();

  describe('Web App Manifest (PWA Compliance)', () => {
    it('manifest.json exists and is valid JSON', () => {
      const manifestPath = path.join(rootDir, 'public', 'manifest.json');
      assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist in public directory');

      const content = fs.readFileSync(manifestPath, 'utf8');
      const manifest = JSON.parse(content);

      assert.equal(manifest.name, 'Hidden Cost Finder – Calculate Your Yearly Waste');
      assert.equal(manifest.short_name, 'Cost Finder');
      assert.equal(manifest.display, 'standalone');
      assert.equal(manifest.start_url, '/');
      assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2, 'manifest must specify icons');
    });

    it('all manifest icon assets physically exist on disk', () => {
      const manifestPath = path.join(rootDir, 'public', 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

      for (const icon of manifest.icons) {
        const iconPath = path.join(rootDir, 'public', icon.src.replace(/^\//, ''));
        assert.ok(fs.existsSync(iconPath), `Icon file ${icon.src} must exist at ${iconPath}`);
        const stat = fs.statSync(iconPath);
        assert.ok(stat.size > 0, `Icon file ${icon.src} must not be empty`);
      }
    });
  });

  describe('Service Worker (Network-Only & No Offline Working Requirement)', () => {
    it('sw.js exists and explicitly does not cache resources offline', () => {
      const swPath = path.join(rootDir, 'public', 'sw.js');
      assert.ok(fs.existsSync(swPath), 'sw.js must exist in public directory');

      const swContent = fs.readFileSync(swPath, 'utf8');
      // Must not contain caches.open or cache.put
      assert.ok(!swContent.includes('caches.open'), 'sw.js must not open offline cache');
      assert.ok(!swContent.includes('cache.put'), 'sw.js must not save offline cache');
      assert.ok(swContent.includes('fetch(event.request)'), 'sw.js must forward fetch requests directly to network');
    });
  });

  describe('HTML Shell & PWA Linkage', () => {
    it('index.html references manifest and PWA mobile meta tags', () => {
      const indexPath = path.join(rootDir, 'index.html');
      const indexHtml = fs.readFileSync(indexPath, 'utf8');

      assert.ok(indexHtml.includes('rel="manifest"'), 'index.html must reference manifest');
      assert.ok(indexHtml.includes('name="theme-color"'), 'index.html must specify theme-color');
      assert.ok(indexHtml.includes('name="apple-mobile-web-app-capable"'), 'index.html must specify iOS web app capable');
    });
  });

  describe('Footer & Offline Blocker Components', () => {
    it('Footer.jsx contains Install App button and PWA trigger', () => {
      const footerPath = path.join(rootDir, 'src', 'components', 'Footer.jsx');
      const footerContent = fs.readFileSync(footerPath, 'utf8');

      assert.ok(footerContent.includes('Install App'), 'Footer must contain Install App button text');
      assert.ok(footerContent.includes('triggerInstall'), 'Footer must bind triggerInstall');
      assert.ok(footerContent.includes('InstallModal'), 'Footer must include InstallModal');
    });

    it('OfflineBlocker.jsx informs users that the app does not work offline', () => {
      const blockerPath = path.join(rootDir, 'src', 'components', 'OfflineBlocker.jsx');
      const blockerContent = fs.readFileSync(blockerPath, 'utf8');

      assert.ok(blockerContent.includes('Offline Mode Disabled'), 'OfflineBlocker must state offline mode is disabled');
      assert.ok(blockerContent.includes('does not work offline'), 'OfflineBlocker must state app does not work offline');
    });
  });
});
