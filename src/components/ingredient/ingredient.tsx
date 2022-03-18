import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css';
const PRICE = 20;
const DESCRIPTION = 'Краторная булка N-200i Краторная булка N-200i Краторная булка N-200i Краторная булка N-200i Краторная булка N-200i';

const DESCRIPTION_STYLE = `${ingredientStyle.description} text text_type_main-default`

function Ingredient() {
  return (
    <article className={ingredientStyle.grid}>
      <Counter count={1} size="default" />
      <img src={'https://code.s3.yandex.net/react/code/meat-01.png'}
           alt={'Ingredient illustration'}
           width={240}
           height={120}
           className={ingredientStyle.illustration}
      />
      <p className={ingredientStyle.price}>
        <span className={'text text_type_digits-default'}>{PRICE}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={DESCRIPTION_STYLE}>
        {DESCRIPTION}
      </p>
    </article>
  )
}

export default Ingredient;
