import { Store } from '../store';
import { Dialog } from 'quasar';

export interface PeerMessage {
  status: string;
  id: string;
  [key: string]: string;
}

export function isPeerMessage(object: unknown): object is PeerMessage {
  return Object.prototype.hasOwnProperty.call(object, 'status');
}

export const onData = (ping: unknown) => {
  if (typeof ping === 'string') {
    Dialog.create({
      dark: true,
      title: 'Ops!',
      message: 'Qualcosa è andato storto',
    });

    return;
  }

  if (!ping || typeof ping !== 'object' || !isPeerMessage(ping)) {
    return;
  }

  let message = 'Ops!';
  let title = 'Qualcosa è andato storto';
  let dialog = false;

  switch (ping.status) {
    case 'first':
      message = `Un nuovo dispositivo si è unito al tuo gruppo. Il suo ID è ${ping.id}`;
      title = 'Congratulazioni!';
      dialog = true;
      break;
    case 'first_2':
      message = `Hai aggiunto con successo il dispositivo ${ping.id}`;
      title = 'Congratulazioni!';
      dialog = true;
      break;

    default:
      console.debug({
        id: ping.id,
        position: ping.coords,
      });
      void Store.dispatch('map/update', {
        id: ping.id,
        position: ping.coords,
      });
      break;
  }

  if (dialog) {
    Dialog.create({
      dark: true,
      title,
      message,
    });
  }
};
