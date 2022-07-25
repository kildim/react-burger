import styles from './card-order.module.css'
import {TOrder} from '../../types/torder';
import {formatOrderTime} from '../../utils/utils';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import {STACK_DIMENSION} from '../../constants/env-config';

type TCardOrderProps = {
  order: TOrder
}

const genStack = (items: string[]) => {
  const tailIndex = items.length > STACK_DIMENSION ? STACK_DIMENSION : items.length;
  const bunchSize =  items.length > STACK_DIMENSION ? items.length - STACK_DIMENSION +1 : 0;
  let result = [];
  let order = STACK_DIMENSION - 1;

  let stackCount = 0;

  for (let i =0; i < tailIndex; i++) {
    stackCount = i === tailIndex -1 ? bunchSize : 0;
    result.push((<IngredientIcon ingredient={items[i]} stackCount={stackCount}  order={order} offset={50*i} key={i}/>))
    order--;
  }

  return result;
}

function CardOrder(props: TCardOrderProps): JSX.Element {
  const {ingredients, _id, status, name, number, updatedAt} = props.order
  return (
    <article className={styles.article}>
      <div className={styles.info}>
        <p className={"text text_type_digits-default"}>#{number}</p>
        <p className={"text text_type_main-default text_color_inactive"}>{formatOrderTime(updatedAt)}</p>
      </div>
      <p className={'text text_type_main-medium mt-6'}>{name}</p>
      <div className={styles.stackWrapper.concat(' mt-6')}>
        <div className={styles.stack}>
          {genStack(ingredients)}
        </div>
        <p>{ingredients.length}</p>
      </div>

    </article>
  )
}

export default CardOrder;
