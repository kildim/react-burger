import styles from './ingredient-icon.module.css'
import {useSelector} from 'react-redux';
import {TIngredient} from '../../types/tingredient';
import {RootState} from '../../index';

type TIngredientIconProps = {
  ingredient: string,
  stackCount?: number | null
}

function IngredientIcon(props: TIngredientIconProps): JSX.Element {
  const {ingredient, stackCount = null} = props;

  const icon = useSelector<RootState, string>((store) => {
    const found = store.main.ingredients.find((nutrient) => nutrient._id === ingredient);
    return found?.image || '';
  })

  const fadeBackground = stackCount !== null ? {opacity: '0.3'} : {}
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      </div>
      <img src={icon} className={styles.image} style={fadeBackground}/>
      {stackCount === null ?  null : (<p className={styles.stackCount}>+{stackCount}</p>)}
    </div>
  )
}

export default IngredientIcon;
