import styles from './order-complete-card.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TIngredient} from '../../types/tingredient';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import {formatOrderTime} from '../../utils/utils';

type TOrderCompleteCardProps = {
  nutrientRecord: {
    ingredient: TIngredient | undefined,
    count: number
  }
}

function OrderCompleteCard(props: TOrderCompleteCardProps): JSX.Element {
  const {ingredient, count} = props.nutrientRecord;

  return (
    ingredient === undefined ? <></>
      :
      <div className={styles.order_complete_card}>
        <div className={styles.info_wrapper}>
          <div className={styles.icon_wrapper}>
            <IngredientIcon ingredient={ingredient._id}/>
          </div>
          <p className={'text text_type_main-default'}>{ingredient.name}</p>
        </div>
        <div className={styles.price}>
          {ingredient.type === 'bun' ?
            <span className={'text text_type_digits-default'}>{2*count} x</span>
            :
            <span className={'text text_type_digits-default'}>{count} x </span>
          }
          <span className={'text text_type_digits-default mr-5'}>{ingredient.price} </span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
  )
}

export default OrderCompleteCard;
