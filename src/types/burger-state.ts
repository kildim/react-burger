import {Burger} from './burger';
import {Dispatch, SetStateAction} from 'react';

export type BurgerState = [Burger, Dispatch<SetStateAction<Burger>>]
