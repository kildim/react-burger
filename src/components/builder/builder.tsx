import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BuilderStyle from './builder.module.css';
import {BuilderProps} from './builder.d'

import {useContext, useState} from 'react';
import {Burger} from '../../types/burger';
import {AppContext} from '../../contexts/app-context';

const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

function Builder() {

  return (
    <section className={BuilderStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>

        <BurgerIngredients />
        <BurgerConstructor />
    </section>
  )
}

export default Builder;
