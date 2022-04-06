import {IngredientData} from './ingredient-data';

export type Burger = {bun: IngredientData | {}, ingredients: IngredientData[] | []};
