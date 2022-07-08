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
  push({ commit }, point: UniquePoint) {
    // if (typeof point.center === 'undefined') {
    //   point.center = state.center;
    // }
    console.debug('actions', point);
    commit('push', point);
  },
  pushMultiple({ commit }, points: UniquePoint[]) {
    // for (const point of points) {
    //   if (typeof point.center === 'undefined') {
    //     point.center = state.center;
    //   }
    //   commit('push', point);
    // }
    commit('pushMultiple', points);
  },
  update({ commit, getters }, { id, data }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const point = getters.getPoint(id);
    if (point) {
      commit('update', { point, data });
    }
  },
  // remove({ commit, getters }, id) {
  //   const point = getters.getPoint(id);
  //   if (point) {
  //     commit('remove', point);
  //   }
  // },
};

export default actions;
