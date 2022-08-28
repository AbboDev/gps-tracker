import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';
import { Peer, DataConnection } from 'peerjs';
import { onData } from '../../includes/peer';

const mutation: MutationTree<AppStateInterface> = {
  assignPeer(state: AppStateInterface, peer: Peer) {
    state.peer = peer;
  },
  toggleHistoryPath(state: AppStateInterface, toggle: boolean) {
    state.showHistoryPath = toggle;
  },
  addNewUser(state: AppStateInterface, id: string) {
    if (!state.peer) {
      console.warn("C'è stato un errore durante la connessione. Riavviare l'app");
      return;
    }

    const connection: DataConnection = state.peer.connect(id);

    connection.on('open', () => {
      connection.send({ status: 'first', id });

      connection.on('data', onData);
    });

    state.group[id] = connection;
  },
};

export default mutation;
