import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientStyle from './ingredient.module.css';

type IngredientProps = {
  data: {
    price: string,
    name: string,
    image: string
  }
}

function Ingredient(props: IngredientProps) {
  const {price = '', name = '', image = ''} = props.data
  return (
    <article className={ingredientStyle.grid}>
      <Counter count={1} size="default" />
      <img src={image}
           alt={'Ingredient illustration'}
           width={240}
           height={120}
           className={ingredientStyle.illustration}
      />
      <p className={ingredientStyle.price}>
        <span className={'text text_type_digits-default'}>{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${ingredientStyle.description} text text_type_main-default`}>
        {name}
      </p>
    </article>
  )
}

export default Ingredient;
