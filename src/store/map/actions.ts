import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MapStateInterface, Point, UniquePoint } from './state';

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
    commit('push', point);
  },
  pushMultiple({ commit }, points: UniquePoint[]) {
    commit('pushMultiple', points);
  },
  update({ commit, getters }, { id, position }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const point = getters.getPoint(id);

    if (point) {
      commit('update', { point, position });
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
