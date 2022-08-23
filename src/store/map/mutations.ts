import { MutationTree } from 'vuex';
import { HistoryPoint, MapStateInterface, Point, UniquePoint } from './state';

const mutation: MutationTree<MapStateInterface> = {
  updateCenter(state: MapStateInterface, center: Point) {
    state.center = center;
  },

  push(state: MapStateInterface, point: UniquePoint) {
    state.points.push(point);
  },

  setCurrent(state: MapStateInterface, id: string) {
    state.current = id;
  },

  pushMultiple(state: MapStateInterface, points: UniquePoint[]) {
    state.points = state.points.concat(points);
  },

  update(state: MapStateInterface, { index, position }) {
    const point = state.points[index as number];

    const lastPoint: HistoryPoint = {
      coords: {
        lat: point.lat,
        lng: point.lng,
      },
      timestamp: Date.now(),
    };

    point.lat = (position as Point).lat;
    point.lng = (position as Point).lng;
    point.history.push(lastPoint);

    state.points[index as number] = point;
  },

  remove(state: MapStateInterface, point: UniquePoint) {
    const index = state.points.indexOf(point);

    state.points.splice(index, 1);
  },
};

export default mutation;
