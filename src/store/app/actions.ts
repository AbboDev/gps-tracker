import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';
import { Peer, DataConnection } from 'peerjs';

interface RegisterConnectionObject {
  id: string;
  connection: DataConnection;
}

const actions: ActionTree<AppStateInterface, StateInterface> = {
  assignPeer({ commit, state }, peer: Peer) {
    if (state.peer) {
      console.warn(
        "C'è stato un errore durante la connessione. Riavviare l'app"
      );
      return;
    }

    commit('assignPeer', peer);
  },
  toggleHistoryPath({ commit, state }, toggle?: boolean) {
    if (typeof toggle !== 'boolean') {
      toggle = !state.showHistoryPath;
    }

    commit('toggleHistoryPath', toggle);
  },
  addNewUser({ commit, state }, id: string) {
    if (!state.peer) {
      console.warn(
        "C'è stato un errore durante la connessione. Riavviare l'app"
      );
      return;
    }

    if (!id || id.trim().length === 0) {
      console.warn('ID non valido');
      return;
    }

    if (state.id === id) {
      console.warn("L'ID inserito è il proprio");
      return;
    }

    if (id in state.group) {
      console.warn("L'ID inserito è già registrato");
      return;
    }

    commit('addNewUser', id);
  },
  registerConnection(
    { commit, state },
    { id, connection }: RegisterConnectionObject
  ) {
    if (!state.peer) {
      console.warn(
        "C'è stato un errore durante la connessione. Riavviare l'app"
      );
      return;
    }
    if (!id || id.trim().length === 0) {
      console.warn('ID non valido');
      return;
    }

    if (state.id === id) {
      console.warn("L'ID inserito è il proprio");
      return;
    }

    if (id in state.group) {
      console.warn("L'ID inserito è già registrato");
      return;
    }

    commit('registerConnection', { id, connection });
  },
};

export default actions;
