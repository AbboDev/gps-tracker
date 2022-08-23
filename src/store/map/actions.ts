import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HistoryPoint, MapStateInterface, Point, UniquePoint } from './state';

const actions: ActionTree<MapStateInterface, StateInterface> = {
  updateCenter({ commit }, center: Point) {
    if (
      Array.isArray(center) &&
      center.length === 2 &&
      !isNaN(center.lat) &&
      !isNaN(center.lng)
    ) {
      commit('updateCenter', center);
    }
  },
  // updateCenterById({ commit, getters }, id) {
  //   const point = getters.getPoint(id);
  //   if (point) {
  //     commit('updateCenter', point.center);
  //   }
  // },
  setCurrent({ commit }, id: string) {
    commit('setCurrent', id);
  },
  push({ commit }, point: UniquePoint) {
    const currentPoint: HistoryPoint = {
      coords: {
        lat: point.lat,
        lng: point.lng,
      },
      timestamp: Date.now(),
    };

    point.history.push(currentPoint);
    commit('push', point);
  },
  pushMultiple({ commit }, points: UniquePoint[]) {
    commit('pushMultiple', points);
  },
  update({ commit, getters }, { id, position }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const index: number = getters.getPointIndex(id);

    if (index > -1) {
      commit('update', { index, position });
    }
  },
  remove({ commit, getters }, id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const point = getters.getPoint(id);

    if (point) {
      commit('remove', point);
    }
  },
};

export default actions;
