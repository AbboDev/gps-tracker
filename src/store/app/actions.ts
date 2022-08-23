import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

const actions: ActionTree<AppStateInterface, StateInterface> = {
  toggleHistoryPath({ commit, state }, toggle?: boolean) {
    if (typeof toggle !== 'boolean') {
      toggle = !state.showHistoryPath;
    }

    commit('toggleHistoryPath', toggle);
  },
};

export default actions;
