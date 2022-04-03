import React from 'react';

import {BurgerState} from '../types/burger-state';

export const BurgerContext = React.createContext<BurgerState>([{bun: {}, ingredients: []}, value => null]);
