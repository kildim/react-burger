import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientStyle from './ingredient.module.css';

const DESCRIPTION_STYLE = `${ingredientStyle.description} text text_type_main-default`

function Ingredient(props: any) {
  const {price = '', name = '', image = ''} = {...props.data}
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
      <p className={DESCRIPTION_STYLE}>
        {name}
      </p>
    </article>
  )
}

export default Ingredient;
