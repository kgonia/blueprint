import { Configuration, gridSpacing, snapToGrid, configWallHeight } from '../core/configuration.js';
import { Version } from '../core/version.js';

function safeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function mapRoom(room) {
  const corners = Array.isArray(room?.corners) ? room.corners : [];
  const cornersList = corners.map((corner) => corner?.id).filter(Boolean);

  let id = room?.id;
  if (!id && typeof room?.roomIdentifier === 'function') {
    id = room.roomIdentifier();
  }
  if (!id && typeof room?.getUuid === 'function') {
    id = room.getUuid();
  }

  return {
    id: id || cornersList.join(',') || null,
    name: room?.name || room?._name || 'Room',
    area_cm2: safeNumber(room?.area, 0),
    corners: cornersList,
  };
}

function mapWall(wall) {
  return {
    id: wall?.id || null,
    start: wall?.start?.id || null,
    end: wall?.end?.id || null,
    thickness_cm: safeNumber(wall?.thickness, 0),
    height_cm: safeNumber(wall?.height, 0),
    type: wall?.wallType || wall?._walltype?.description || wall?._walltype || 'STRAIGHT',
  };
}

function mapItem(item) {
  const metadata = item?.metadata || item?.__metadata || {};
  const position = item?.position || metadata?.position;
  const innerRotation = item?.innerRotation || metadata?.innerRotation;

  return {
    id: item?.id || metadata?.id || null,
    type: metadata?.itemName || metadata?.itemType || 'item',
    position_cm: Array.isArray(position) ? position : (position?.toArray ? position.toArray() : [0, 0, 0]),
    rotation_deg: Array.isArray(innerRotation) ? innerRotation : (innerRotation?.toArray ? innerRotation.toArray() : [0, 0, 0]),
    room_id: null,
  };
}

export function buildStateSnapshot(model, options = {}) {
  const detail = options.detail || 'summary';
  const floorplan = model?.floorplan;
  const rooms = Array.isArray(floorplan?.rooms) ? floorplan.rooms : [];
  const walls = Array.isArray(floorplan?.walls) ? floorplan.walls : [];
  const items = Array.isArray(model?.roomItems) ? model.roomItems : [];

  const snapshot = {
    state_version: safeNumber(model?.__stateVersion, 0),
    runtime_version: Version.getTechnicalVersion(),
    units: { length: 'cm', angle: 'deg' },
    settings: {
      grid: safeNumber(Configuration.getNumericValue(gridSpacing), 0),
      snap: Configuration.getBooleanValue(snapToGrid),
      wall_height: safeNumber(Configuration.getNumericValue(configWallHeight), 0),
    },
    rooms: rooms.map(mapRoom),
    walls: walls.map(mapWall),
    items: items.map(mapItem),
  };

  if (detail === 'full') {
    snapshot.meta = {
      corners_count: Array.isArray(floorplan?.corners) ? floorplan.corners.length : 0,
      rooms_count: snapshot.rooms.length,
      walls_count: snapshot.walls.length,
      items_count: snapshot.items.length,
    };
  }

  return snapshot;
}
