import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientStyle from './ingredient.module.css';
import {IngredientProps, DropResult} from './ingredient.d'
import React from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'
import {DragPreviewImage, useDrag} from 'react-dnd';


function Ingredient(props: IngredientProps) {
  const {price = 0, name = '', image = '', _id = null, count = 0} = props.data
  const [state, setState] = React.useState({showModal: false})

  const [{isDragging}, dragRef, dragPreviewRef] = useDrag(() => ({
    type: 'ingredient',
    item: {_id},

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const handleModalClose = () => {
    setState({...state, showModal: false})
  }
  const handleCardClick = () => {
    setState(({...state, showModal: true}))
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
      {
        state.showModal &&
        <Modal header={'Детали ингредиента'} onCloseClick={handleModalClose}>
          <IngredientDetails data={props.data}/>
        </Modal>
      }
    </>

  )
}

export default Ingredient;
