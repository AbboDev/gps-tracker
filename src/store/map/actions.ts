import { point } from 'leaflet';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HistoryPoint, MapStateInterface, Point, UniquePoint } from './state';

interface PushObject {
  id: string;
  point: UniquePoint;
}

const actions: ActionTree<MapStateInterface, StateInterface> = {
  updateCenter({ commit }, center: Point) {
    if (Array.isArray(center) && center.length === 2 && !isNaN(center.lat) && !isNaN(center.lng)) {
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
  push({ commit }, { id, point }: PushObject) {
    const currentPoint: HistoryPoint = {
      coords: {
        lat: point.lat,
        lng: point.lng,
      },
      timestamp: Date.now(),
    };

    point.history.push(currentPoint);
    commit('push', { id, point });
  },
  update({ commit }, { id, position }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    if (!point) {
      throw new Error('ID mancante');
    }

    commit('update', { id, position });
  },
  remove({ commit, getters }, id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const point = getters.getPoint(id);

    if (!point) {
      throw new Error('ID mancante');
    }

    commit('remove', id);
  },
};

export default actions;
