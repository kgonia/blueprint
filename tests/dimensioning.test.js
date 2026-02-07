import test from 'node:test';
import assert from 'node:assert/strict';
import { Vector2, Vector3 } from 'three';
import { Dimensioning } from '../src/scripts/core/dimensioning.js';
import { Configuration, scale } from '../src/scripts/core/configuration.js';

test('Dimensioning pixelToCmVector2D uses pixelToCm conversion', () => {
  Configuration.setValue(scale, 1);
  const input = new Vector2(10, 20);
  const out = Dimensioning.pixelToCmVector2D(input);

  assert.equal(out.x, Dimensioning.pixelToCm(10));
  assert.equal(out.y, Dimensioning.pixelToCm(20));
});

test('Dimensioning pixelToCmVector3D uses pixelToCm conversion', () => {
  Configuration.setValue(scale, 1);
  const input = new Vector3(10, 20, 30);
  const out = Dimensioning.pixelToCmVector3D(input);

  assert.equal(out.x, Dimensioning.pixelToCm(10));
  assert.equal(out.y, Dimensioning.pixelToCm(20));
  assert.equal(out.z, Dimensioning.pixelToCm(30));
});
