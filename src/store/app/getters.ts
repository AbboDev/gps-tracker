import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

const getters: GetterTree<AppStateInterface, StateInterface> = {
  hasConnections(state) {
    return () => {
      const keys = Object.keys(state.group);
      return keys.length > 0;
    };
  },
};

export default getters;
