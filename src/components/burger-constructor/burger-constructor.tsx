import constructorStyle from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import FillingIngredient from '../filling-ingredient/filling-ingredient'

function BurgerConstructor(props: any) {
  const ingredients = [];
  let upside = null;
  let downside = null;

  // props.forEach( (item: any) => {
  //   switch (item) {
  //     case 'top':
  //       upside = item;
  //       break;
  //     case 'bottom':
  //       downside = item
  //       break;
  //     default:
  //       ingredients.push(item)
  //   }
  // })

  return (
    <section className={constructorStyle.grid}>
      <section className={constructorStyle.upper_cover}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </section>
      <section className={constructorStyle.filling}>
        {/*<div className={constructorStyle.ingredient}>*/}
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
          <FillingIngredient />
        {/*</div>*/}
      </section>
      <section className={constructorStyle.bottom_cover}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </section>
    </section>
  )
}

export default BurgerConstructor;
