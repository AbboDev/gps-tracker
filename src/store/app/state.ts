import { uid } from 'quasar';
import { Peer, DataConnection } from 'peerjs';
import { Dictionary } from '../../components/models';

export interface AppStateInterface {
  id: string;
  peer?: Peer;
  showHistoryPath: boolean;
  group: Dictionary<DataConnection>;
}

function state(): AppStateInterface {
  return {
    id: uid(),
    showHistoryPath: false,
    group: {},
  };
}

export default state;
