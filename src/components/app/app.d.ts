import {IngredientData} from '../../types/ingredient-data';
import {Dispatch, SetStateAction} from 'react';

export type AppData = IngredientData[];
export type AppState = [state: AppData, setState: Dispatch<SetStateAction<IngredientData>>]
