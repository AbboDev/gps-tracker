import { uid } from 'quasar';

export interface AppStateInterface {
  id: string;
  showHistoryPath: boolean;
}

function state(): AppStateInterface {
  return {
    id: uid(),
    showHistoryPath: false,
  };
}

export default state;
