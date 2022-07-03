import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientStyle from './ingredient.module.css';
import {IngredientProps} from './ingredient.d'
import React from 'react';

import {DragPreviewImage, useDrag} from 'react-dnd';
import {useHistory} from 'react-router-dom';


function Ingredient(props: IngredientProps) {
  const {price = 0, name = '', image = '', _id = null, count = 0} = props.data
  const history = useHistory();

  const [, dragRef, dragPreviewRef] = useDrag(() => ({
    type: 'ingredient',
    item: {_id},


  }))

  const handleCardClick = () => {
    history.replace({pathname: `/ingredient/${_id}`, state: {from: '/', id: _id}})
  }

  return (
    <>
      <DragPreviewImage connect={dragPreviewRef} src={image} />

      <article className={ingredientStyle.grid} onClick={handleCardClick} ref={dragRef}>
        <Counter count={count} size="default"/>
        <img src={image}
          alt={`${name} ingredient illustration`}
          width={240}
          height={120}
        />
        <p className={ingredientStyle.price}>
          <span className={'text text_type_digits-default'}>{price}</span>
          <CurrencyIcon type="primary"/>
        </p>
        <p className={`${ingredientStyle.description} text text_type_main-default`}>
          {name}
        </p>
      </article>
    </>
  )
}

export default Ingredient;
