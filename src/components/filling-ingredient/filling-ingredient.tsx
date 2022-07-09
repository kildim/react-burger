import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import fillingIngredientStyle from './filling-ingredient.module.css';
import {useDispatch} from 'react-redux';
import {removeFilling, replaceFillings} from '../../services/actions/action';
import {useDrag, useDrop} from 'react-dnd';
import {useRef} from 'react';
import type {XYCoord} from 'dnd-core';
import {TIngredient} from '../../types/tingredient';

type FillingIngredientPropsType = {
  filling: TIngredient,
}

type DragDropItemType = {
  _id: string,
  uniqueIndex: number,
  type?: string,
  index?: number
}

function FillingIngredient(props: FillingIngredientPropsType) {
  const {name, price, image, _id, uniqueIndex} = props.filling;

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [, dropFilling] = useDrop({
    accept: 'filling',
    hover: (item: DragDropItemType, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = uniqueIndex;
      const hoverIndex = item.uniqueIndex;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (!dragIndex && !dragIndex) {
        return;
      } else {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
      }

      item.index = hoverIndex


      dispatch(replaceFillings(dragIndex, hoverIndex))
    }
  })
  const [{isDragging}, dragFilling] = useDrag({
    type: 'filling',
    item: (): DragDropItemType => {
      return {_id, uniqueIndex} as DragDropItemType
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
