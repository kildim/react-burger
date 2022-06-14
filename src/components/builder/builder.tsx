import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BuilderStyle from './builder.module.css';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';

const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

function Builder() {

  return (
    <section className={BuilderStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </section>
  )
}

export default Builder;
