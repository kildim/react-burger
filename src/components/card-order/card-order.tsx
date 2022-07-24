import styles from './card-order.module.css'
import {TOrder} from '../../types/torder';
import {formatOrderTime} from '../../utils/utils';
import IngredientIcon from '../ingredient-icon/ingredient-icon';

type TCardOrderProps = {
  order: TOrder
}

function CardOrder(props: TCardOrderProps): JSX.Element {

  const {ingredients, _id, status, name, number, createdAt, updatedAt} = props.order
  console.log(props.order);
  return (
    <article className={styles.article}>
      <div className={styles.info}>
        <p className={"text text_type_digits-default"}>#{number}</p>
        <p className={"text text_type_main-default text_color_inactive"}>{formatOrderTime(updatedAt)}</p>
      </div>
      <p className={'text text_type_main-medium mt-6'}>{name}</p>
      <IngredientIcon ingredient={ingredients[3]} />
    </article>
  )
}

export default CardOrder;
