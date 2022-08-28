import { MutationTree } from 'vuex';
import { HistoryPoint, MapStateInterface, Point, UniquePoint } from './state';

interface PushObject {
  id: string;
  point: UniquePoint;
}

interface UpdateObject {
  id: string;
  position: Point;
}

const mutation: MutationTree<MapStateInterface> = {
  updateCenter(state: MapStateInterface, center: Point) {
    state.center = center;
  },

  push(state: MapStateInterface, { id, point }: PushObject) {
    state.points[id] = point;
  },

  update(state: MapStateInterface, { id, position }: UpdateObject) {
    const point = state.points[id];

    const lastPoint: HistoryPoint = {
      coords: {
        lat: point.lat,
        lng: point.lng,
      },
      timestamp: Date.now(),
    };

    point.lat = position.lat;
    point.lng = position.lng;
    point.history.unshift(lastPoint);

    state.points[id] = point;
  },

  remove(state: MapStateInterface, id: string) {
    delete state.points[id];
  },
};

export default mutation;
