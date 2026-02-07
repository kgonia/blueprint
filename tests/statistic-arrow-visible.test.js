import test from 'node:test';
import assert from 'node:assert/strict';
import { StatisticArrow } from '../src/scripts/viewer3d/ItemStatistics3D.js';
import { Vector3 } from 'three';

function installDomStubs() {
  const created = [];

  global.document = {
    body: {
      appendChild(node) {
        created.push(node);
      },
    },
    getElementById() {
      return null;
    },
    createElement(tag) {
      if (tag === 'canvas') {
        return {
          width: 0,
          height: 0,
          style: {},
          getContext() {
            return {
              clearRect() {},
              fillRect() {},
              strokeRect() {},
              fillText() {},
              set font(_) {},
              set textBaseLine(_) {},
              set textAlign(_) {},
              set fillStyle(_) {},
              set strokeStyle(_) {},
            };
          },
        };
      }
      return {
        id: '',
        style: {},
        appendChild(node) {
          created.push(node);
        },
      };
    },
  };
}

test('StatisticArrow visible getter/setter is stable and non-recursive', () => {
  installDomStubs();

  const arrow = new StatisticArrow(
    new Vector3(1, 0, 0),
    new Vector3(0, 0, 0),
    10,
    0xff0000,
    2,
    2,
  );

  arrow.visible = false;
  assert.equal(arrow.visible, false);
  assert.equal(arrow.__arrow.visible, false);
  assert.equal(arrow.__reverseArrow.visible, false);

  arrow.visible = true;
  assert.equal(arrow.visible, true);
  assert.equal(arrow.__arrow.visible, true);
  assert.equal(arrow.__reverseArrow.visible, true);
});
