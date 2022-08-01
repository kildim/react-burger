import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import BuilderStyle from './builder.module.css';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import React, {useEffect} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {selectIngredient, showIngredientDetail} from '../../services/actions/action';
import {useAppDispatch} from '../../services/app-hooks';
// import {useDispatch} from 'react-redux';


const CAPTION_STYLE = `${BuilderStyle.caption} text text_type_main-large`;

function Builder() {

  const history = useHistory<{id: number}>();
  const dispatch = useAppDispatch();

  const rootPathIsCurrent = useRouteMatch({path: '/', exact: true})

  useEffect(() => {
    if (history.location.state) {
      const ingredientId = history.location.state.id;
      dispatch(selectIngredient(ingredientId))
      dispatch(showIngredientDetail())
    }
  }, [history.location.state])


  return history.location.state || rootPathIsCurrent !== null ?
    (
      <section className={BuilderStyle.grid}>
        <h1 className={CAPTION_STYLE}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </section>
    )
    :
    null
}


export default Builder;
