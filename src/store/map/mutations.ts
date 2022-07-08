import { MutationTree } from 'vuex';
import { MapStateInterface, Point, UniquePoint } from './state';

const mutation: MutationTree<MapStateInterface> = {
  updateCenter(state: MapStateInterface, center: Point) {
    state.center = center;
  },

  push(state: MapStateInterface, point: UniquePoint) {
    console.debug('mutations', point, state);
    state.points.push(point);
  },

  pushMultiple(state: MapStateInterface, points: UniquePoint[]) {
    state.points = state.points.concat(points);
  },

  update(state: MapStateInterface, { point, data }) {
    const index = state.points.indexOf(point as UniquePoint);

    state.points[index] = {
      ...state.points[index],
      ...data,
    };
  },

  remove(state: MapStateInterface, point: UniquePoint) {
    const index = state.points.indexOf(point);

    state.points.splice(index, 1);
  },
};

export default mutation;
