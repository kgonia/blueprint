import test from 'node:test';
import assert from 'node:assert/strict';
import { Model } from '../src/scripts/model/model.js';
import { EVENT_ITEM_REMOVED } from '../src/scripts/core/events.js';

function buildMockItem(id, itemType = 1) {
  return {
    id,
    metadata: { itemType },
    disposed: false,
    dispose() {
      this.disposed = true;
    },
  };
}

test('Model.removeItem removes the exact item and dispatches removal event', () => {
  const model = new Model();

  const itemA = buildMockItem('a', 1);
  const itemB = buildMockItem('b', 1);
  const itemC = buildMockItem('c', 1);

  model.__roomItems = [itemA, itemB, itemC];
  model.__floorItems = [itemA, itemB, itemC];

  const events = [];
  model.addEventListener(EVENT_ITEM_REMOVED, (evt) => {
    events.push(evt.item);
  });

  model.removeItem(itemB, false);

  assert.deepEqual(model.__roomItems.map((i) => i.id), ['a', 'c']);
  assert.deepEqual(model.__floorItems.map((i) => i.id), ['a', 'c']);
  assert.equal(itemB.disposed, true);
  assert.deepEqual(events, [itemB]);
});

test('Model.removeItem on missing item is safe and does not mutate lists', () => {
  const model = new Model();

  const itemA = buildMockItem('a', 1);
  const itemB = buildMockItem('b', 1);
  const missing = buildMockItem('x', 1);

  model.__roomItems = [itemA, itemB];
  model.__floorItems = [itemA, itemB];

  model.removeItem(missing, false);

  assert.deepEqual(model.__roomItems.map((i) => i.id), ['a', 'b']);
  assert.deepEqual(model.__floorItems.map((i) => i.id), ['a', 'b']);
});
