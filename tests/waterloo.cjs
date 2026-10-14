const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { window: {}, Intl, Date };
vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js', 'utf8'), context);
const app = fs.readFileSync('app.js', 'utf8');
vm.runInContext(app.slice(0, app.indexOf('  /* tile icons')) + '\nwindow.test = {pool, activeFilters, hoodCoord, cafeLocation}; })();', context);
const api = context.window.test;
assert.equal(api.pool().some(c => c.city === 'Waterloo'), false);
api.activeFilters.city = 'Waterloo';
const cafes = api.pool();
assert.equal(cafes.length, 8);
assert.equal(new Set(cafes.map(c => c.name)).size, 8);
for (const cafe of cafes) {
  assert.ok(api.cafeLocation(cafe).includes('Waterloo'));
  assert.ok(!api.cafeLocation(cafe).includes('Toronto'));
  assert.ok(api.hoodCoord(cafe)[1] < -80.5);
  assert.equal(cafe.wifi, 'unknown');
  assert.equal(cafe.outlets, 'unknown');
  assert.ok(cafe.sources.length);
}
api.activeFilters.area = 'Northfield, Waterloo';
assert.equal(api.pool()[0].name, 'Camellia Bake Shop');
api.activeFilters.area = null;
// Tuesday 10am Toronto: Camellia closed; unknown schedules excluded.
context.Date = class extends Date { constructor() { super('2026-10-13T14:00:00Z'); } };
api.activeFilters.openNow = true;
assert.equal(api.pool().length, 4);
assert.ok(api.pool().every(c => c.weeklyHours));
context.Date = class extends Date { constructor() { super('2026-10-14T03:00:00Z'); } };
assert.equal(api.pool().length, 0);
console.log('Passed: city separation, 8 unique Waterloo listings, map locations, area filtering and opening hours.');
