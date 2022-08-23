import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {
  toggleHistoryPath(state: AppStateInterface, toggle: boolean) {
    state.showHistoryPath = toggle;
  },
};

export default mutation;
