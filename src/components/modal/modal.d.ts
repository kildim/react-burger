import {ReactNode} from 'react';

type ModalPropsType = {
  header: string,
  onCloseClick: () => void,
  children: ReactNode,
}

export type {ModalPropsType};
