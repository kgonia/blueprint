import test from 'node:test';
import assert from 'node:assert/strict';
import { buildStateSnapshot } from '../src/scripts/llm/stateSnapshot.js';

test('buildStateSnapshot returns minimal deterministic shape', () => {
  const mockModel = {
    __stateVersion: 7,
    floorplan: {
      corners: [],
      walls: [],
      rooms: [],
      getRooms() { return []; },
      getWalls() { return []; },
    },
    roomItems: [],
  };

  const snapshot = buildStateSnapshot(mockModel, { detail: 'summary' });

  assert.equal(snapshot.state_version, 7);
  assert.deepEqual(snapshot.units, { length: 'cm', angle: 'deg' });
  assert.ok(Array.isArray(snapshot.rooms));
  assert.ok(Array.isArray(snapshot.walls));
  assert.ok(Array.isArray(snapshot.items));
});
