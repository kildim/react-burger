import styles from './order-complete-card.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {useSelector} from 'react-redux';
import {RootState} from '../../index';
import {TIngredient} from '../../types/tingredient';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import {formatOrderTime} from '../../utils/utils';

type TOrderCompleteCardProps = {
  id: string,
}

function OrderCompleteCard(props: TOrderCompleteCardProps): JSX.Element {
  const {id} = props;
  const ingredient = useSelector<RootState, TIngredient | undefined>(
    (state) => state.main.ingredients.find((ingredient) => ingredient._id === id));

  return (
    ingredient === undefined ? <></>
      :
      <div className={styles.order_complete_card}>
        <div className={styles.info_wrapper}>
          <div className={styles.icon_wrapper}>
            <IngredientIcon ingredient={ingredient._id}/>
          </div>
          <p className={"text text_type_main-default"}>{ingredient.name}</p>
        </div>
        <div className={styles.price}>
          {ingredient.type === "bun" ?
            <span className={"text text_type_digits-default"}>2 x </span>
          :
            <span className={"text text_type_digits-default"}>1 x </span>
          }
          <span className={"text text_type_digits-default mr-5"}>{ingredient.price} </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
  )
}

export default OrderCompleteCard;
