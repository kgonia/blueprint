import test from 'node:test';
import assert from 'node:assert/strict';
import { Version } from '../src/scripts/core/version.js';
import pkg from '../package.json' with { type: 'json' };

test('Version technical and informal versions align with package version', () => {
  assert.equal(Version.getTechnicalVersion(), pkg.version);
  assert.equal(Version.getInformalVersion(), pkg.version);
});
