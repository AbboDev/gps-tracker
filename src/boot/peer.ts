import { boot } from 'quasar/wrappers';
import { Peer } from 'peerjs';
import { onData } from '../includes/peer';
import { StateInterface } from 'src/store';

export default boot(({ store }) => {
  const state = store.state as StateInterface;

  if (!state.app.id) {
    throw new Error(
      "C'è stato un errore durante la connessione. Riavviare l'app"
    );
  }

  const peer = new Peer(state.app.id);

  peer
    .on('open', (id) => {
      console.log('My peer ID is: ' + id);
    })
    .on('connection', (connection) => {
      void store.dispatch('app/registerConnection', {
        id: connection.peer,
        connection,
      });

      connection.on('data', onData);

      connection.on('open', () => {
        connection.send({ status: 'first_2', id: state.app.id });
      });
    });

  void store.dispatch('app/assignPeer', peer);
  // app.config.globalProperties.$peer = peer;
});
