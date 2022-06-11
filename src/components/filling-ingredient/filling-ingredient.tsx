import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import fillingIngredientStyle from './filling-ingredient.module.css';
import {FillingIngredientPropsType} from './filling-ingredient.d'
import {useDispatch} from 'react-redux';
import {removeFilling} from '../../services/actions/action';
import {useDrag, useDrop} from 'react-dnd';
import {useRef} from 'react';

function FillingIngredient(props: FillingIngredientPropsType) {
  const {name, price, image, _id, uniqueIndex} = props.filling;

  const ref = useRef(null);
  const dispatch = useDispatch();
  const [, dropFilling] = useDrop({
    accept: 'filling',
    // hover: (item, monitor) => {
    //   dispatch(placeInCard())
    // }
  })
  const [{isDragging}, dragFilling] = useDrag({
    type: 'filling',
    item: () => {
      return {_id}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const draggingStyle = isDragging ? {opacity: 0} : {opacity: 1};
  dragFilling(dropFilling(ref))

  return (
    <div className={fillingIngredientStyle.wrapper} style={draggingStyle} ref={ref}>
      <div className={fillingIngredientStyle.handle_wrapper}>
        <DragIcon type="primary"/>
      </div>
      <div className={fillingIngredientStyle.element_wrapper}>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => {
            dispatch(removeFilling(uniqueIndex));
          }
          }
        />
      </div>

    </div>

  )
}

export default FillingIngredient;
