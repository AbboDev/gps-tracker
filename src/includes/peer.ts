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

  switch (ping.status) {
    case 'first':
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message = `Un nuovo dispositivo si è unito al tuo gruppo. Il suo ID è ${ping.id}`;
      title = 'Congratulazioni!';
      break;
    case 'first_2':
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message = `Hai aggiunto con successo il dispositivo ${ping.id}`;
      title = 'Congratulazioni!';
      break;

    default:
      break;
  }

  Dialog.create({
    dark: true,
    title,
    message,
  });
};
