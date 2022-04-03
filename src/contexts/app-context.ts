import {createContext} from 'react';
import {AppState} from '../components/app/app.d'

export const AppContext = createContext([[], () => null]);
