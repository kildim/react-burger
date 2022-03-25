import {ReactNode} from 'react';

type ModalPropsType = {
  header: string,
  show: boolean,
  onCloseClick: () => void,
  children: ReactNode,
}

export type {ModalPropsType};
