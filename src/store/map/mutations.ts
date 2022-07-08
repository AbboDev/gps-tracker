import { MutationTree } from 'vuex';
import { MapStateInterface, Point, UniquePoint } from './state';

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

  update(state: MapStateInterface, { point, position }) {
    const index = state.points.indexOf(point as UniquePoint);

    state.points[index] = {
      ...state.points[index],
      ...position,
    };
  },

  remove(state: MapStateInterface, point: UniquePoint) {
    const index = state.points.indexOf(point);

    state.points.splice(index, 1);
  },
};

export default mutation;
