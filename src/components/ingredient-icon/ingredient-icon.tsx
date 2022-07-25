import styles from './ingredient-icon.module.css'
import {useSelector} from 'react-redux';
import {TIngredient} from '../../types/tingredient';
import {RootState} from '../../index';

type TIngredientIconProps = {
  ingredient: string,
  stackCount?: number | null,
  order: number,
  offset: number,
}

function IngredientIcon(props: TIngredientIconProps): JSX.Element {
  const {ingredient, stackCount = 0, order = 0, offset = 0} = props;


  const icon = useSelector<RootState, string>((store) => {
    const found = store.main.ingredients.find((nutrient) => nutrient._id === ingredient);
    return found?.image || '';
  })

  const fadeBackground = stackCount !== 0 ? {opacity: '0.3'} : {}
  return (
    <div className={styles.container} style={{zIndex: order.toString(), left: offset.toString().concat('px')}}>
      <div className={styles.content}>
      </div>
      <img src={icon} className={styles.image} style={fadeBackground}/>
      {stackCount === 0 ? null : (<p className={styles.stackCount}>+{stackCount}</p>)}
    </div>
  )
}

export default IngredientIcon;
