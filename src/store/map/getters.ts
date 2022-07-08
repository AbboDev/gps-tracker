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
};

export default getters;
