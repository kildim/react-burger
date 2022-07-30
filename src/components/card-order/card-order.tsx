import styles from './card-order.module.css'
import {TOrder} from '../../types/torder';
import {formatOrderTime} from '../../utils/utils';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import {STACK_DIMENSION} from '../../constants/env-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TIngredient} from '../../types/tingredient';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useHistory} from 'react-router-dom';

type TCardOrderProps = {
  order: TOrder,
  from: string
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

const translateStatus = (status: string) => {
  let translation = '';
  switch (status) {
    case 'done':
      translation = 'Выполнен';
      break;
    case 'created':
      translation = 'Создан';
      break;
    case 'pending':
      translation = 'Готовится';
      break;
  }
  return translation
}

function CardOrder(props: TCardOrderProps): JSX.Element {
  const {ingredients, _id, status, name, number, updatedAt} = props.order;
  const from = props.from;
  const nutrients = useSelector<RootState, TIngredient[]>((store) => store.main.ingredients);

  const history = useHistory<{from: string}>();

  const orderItems = ingredients.map((ingredient) => nutrients.find((nutrient) => nutrient._id === ingredient))
  const cost = orderItems.length > 0 ? orderItems.reduce(
    (accumulator, currentValue) => accumulator
      + (currentValue ? currentValue.type === 'bun' ? currentValue.price*2 : currentValue.price : 0), 0) : 0;
  const handleCardClick = () => {
    history.replace({pathname: `${from}/${_id}`, state: {from: from}})
  }

  return (
    <article className={styles.article} onClick={handleCardClick}>
      <div className={styles.info}>
        <p className={"text text_type_digits-default"}>#{number}</p>
        <p className={"text text_type_main-default text_color_inactive"}>{formatOrderTime(updatedAt)}</p>
      </div>
      <p className={'text text_type_main-medium mt-6'}>{name}</p>
      <p className={styles.status}>{translateStatus(status)}</p>
      <div className={styles.stackWrapper.concat(' mt-6')}>
        <div className={styles.stack}>
          {genStack(ingredients)}
        </div>
        <p className="text text_type_digits-default">{cost}</p>
        <CurrencyIcon type="primary" />
      </div>

    </article>
  )
}

export default CardOrder;
