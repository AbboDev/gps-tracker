import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MapStateInterface, UniquePoint, HistoryPoint } from './state';

const getters: GetterTree<MapStateInterface, StateInterface> = {
  getPoint(state) {
    return (id: string) => {
      return state.points[id];

      // return state.points.find((item: UniquePoint) => {
      //   return item.id === id;
      // });
    };
  },
  getCurrentPoint(state, getters, rootState) {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const point: UniquePoint = getters.getPoint(rootState.app.id) as UniquePoint;
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
  getCurrentHistoryFormatted(state, getters) {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const history: HistoryPoint[] | boolean = getters.getCurrentHistory();
      if (typeof history !== 'object') {
        return [];
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return history.map((point: HistoryPoint) => {
        return [point.coords.lat, point.coords.lng, new Date(point.timestamp).toLocaleString('it-IT')];
      });
    };
  },
};

export default getters;
