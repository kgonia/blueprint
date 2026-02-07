import test from 'node:test';
import assert from 'node:assert/strict';
import { BoundaryView3D } from '../src/scripts/viewer3d/BoundaryView3D.js';

function buildBoundary() {
  return {
    isValid: true,
    width: 200,
    height: 150,
    points: [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 200, y: 150 },
      { x: 0, y: 150 },
    ],
    style: {
      type: 'color',
      color: '#00FF00',
      repeat: 50,
      colormap: null,
    },
  };
}

test('BoundaryView3D builds floor without UV runtime error', () => {
  const scene = {
    add() {},
    remove() {},
  };
  const view = new BoundaryView3D(scene, null, null, buildBoundary());

  assert.ok(view.__floorPlane);
  assert.ok(view.__floorPlane.geometry);

  const uv = view.__floorPlane.geometry.getAttribute('uv');
  assert.ok(uv);
  assert.ok(uv.count > 0);

  const values = uv.array;
  for (let i = 0; i < values.length; i += 1) {
    assert.equal(Number.isFinite(values[i]), true);
  }
});
