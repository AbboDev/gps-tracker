import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MapStateInterface, UniquePoint } from './state';

const getters: GetterTree<MapStateInterface, StateInterface> = {
  getPoint(state) {
    return (id: string) => {
      return state.points.find((item: UniquePoint) => {
        return item.id === id;
      });
    };
  },
  getPointIndex(state, getters) {
    return (id: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return state.points.indexOf(getters.getPoint(id) as UniquePoint);
    };
  },
  getCurrentPoint(state, getters) {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const point: UniquePoint = getters.getPoint(state.current) as UniquePoint;
      return point;
    };
  },
  getCurrentHistory(state, getters) {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const point: UniquePoint = getters.getCurrentPoint();
      return point?.history;
    };
  },
};

export default getters;
