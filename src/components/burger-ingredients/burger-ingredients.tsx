import IngredientsList from '../ingredients-list/ingredients-list';

import ingredientsStyle from './burger-ingredients.module.css';
// import {useSelector} from 'react-redux';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';

import {RootState} from '../../index';
import {TIngredient} from '../../types/tingredient';
import {useAppSelector} from '../../services/app-hooks';


const SELECTED_PART_ITEM = `${ingredientsStyle.part_item} ${ingredientsStyle.part_item__selected}`;
const INACTIVE_PART_ITEM = `${ingredientsStyle.part_item}`;
const UNSELECTED_REF = `${ingredientsStyle.part_ref__unselected} text text_type_main-default text_color_inactive`;
const SELECTED_REF = `${ingredientsStyle.part_ref} text text_type_main-default`;


function BurgerIngredients() {
  const ingredientsListSectionRef = useRef<HTMLElement>(null);
  const tabsListRef = useRef<HTMLUListElement>(null);
  const prevActiveTitleRef = useRef<string | null>(null);
  const [ingredientTitles, setIngredientTitles] = useState<Array<HTMLHeadingElement> | null >(null);

  useEffect(() => {
    if (ingredientsListSectionRef.current === null) {
      console.error('Ошибка связи с DOM');
    } else {
      const ingredientsHeadings = Array.from(ingredientsListSectionRef.current.querySelectorAll('h3'));
      setIngredientTitles(ingredientsHeadings);
      prevActiveTitleRef.current = 'Булки'
    }
  }, [])

  const ingredients = useAppSelector((store) => {
    const ingredients = store.main.ingredients.map((ingredient: TIngredient) => {
      if (ingredient.type === 'bun') {
        return ( ingredient._id === store.main.burger.bun._id) ? {...ingredient, count: 2} : {...ingredient, count: 0}
      } else {
        const ingredientCount = store.main.burger.fillings.filter((filling: TIngredient) => ingredient._id === filling._id).length;
        return {...ingredient, count: ingredientCount}
      }
    });
    return ingredients
  })

  if (ingredients.length === 0) {
    return null
  }


  const unSelectTabsListItems = () => {
    if (tabsListRef.current === null) {
      console.error('Ошибка связи с DOM')
    } else {
      tabsListRef.current.querySelectorAll('li').forEach((listItem) => {
        const listItemRef = listItem.firstChild as HTMLLIElement | null;

        listItem.classList.remove(`${ingredientsStyle.part_item__selected}`);
        if (listItemRef === null) {
          console.error('Ошибка связи с DOM')
        } else {
          listItemRef.classList.remove(`${ingredientsStyle.part_ref}`);
          listItemRef.classList.add(`${ingredientsStyle.part_ref__unselected}`, 'text_color_inactive')
        }
      })
    }
  }

  const findTabItemByText = (tabText: string | null): HTMLLIElement | undefined => {
    if (tabsListRef.current === null) {
      console.error('Ошибка связи с DOM')
    } else {
      const tabsItems = Array.from(tabsListRef.current.querySelectorAll('li'));

      return tabsItems.find((tabsItem) => {
        if (tabsItem.firstChild === null) {
          return false
        } else {
          return tabsItem.firstChild.textContent === tabText
        }
      })
    }
  }

  const addPartItemRefSelection = (partItem: HTMLAnchorElement) => {
    partItem.classList.remove(`${ingredientsStyle.part_ref__unselected}`, `${ingredientsStyle.text_color_inactive}`);
    partItem.classList.add(`${ingredientsStyle.part_ref}`);
  }

  const addPartItemSelection = (activeTabItem: HTMLLIElement) => {
    activeTabItem.classList.add(`${ingredientsStyle.part_item__selected}`)
  }

  const setActiveTitle = (activeTitleText: string | null) => {
    const activeTabItem = findTabItemByText(activeTitleText);
    if (!activeTabItem) {
      console.error('Ошибка связи с DOM')
    } else {
      unSelectTabsListItems();
      addPartItemRefSelection(activeTabItem.firstChild as HTMLAnchorElement);
      addPartItemSelection(activeTabItem);
    }
  }

  const partItemRefClickHandler = (e: SyntheticEvent) => {
    setActiveTitle(e.currentTarget.textContent);
    if (ingredientTitles === null) {
      console.error('Ошибка связи с DOM')
    } else {
      const foundTitle = ingredientTitles.find((ingredientHeader) => (e.currentTarget.textContent === ingredientHeader.textContent));
      if (!foundTitle) {
        console.error('Не найден foundTitle')
      } else {
        foundTitle.scrollIntoView();
      }
    }
  };

  const partItemClickHandler = (e: SyntheticEvent) => {
    e.currentTarget.classList.add(`${ingredientsStyle.part_item__selected}`);
  }

  const partsListClickHandler = (_e: SyntheticEvent) => {
    unSelectTabsListItems();
  }

  const ingredientsListScrollHandler = (_e: SyntheticEvent) => {
    if (ingredientTitles === null) {
      console.error('Ошибка связи с DOM')
    } else {
      const distance = ingredientTitles.map(
        (ingredientTitle) => {
          if (ingredientsListSectionRef.current === null) {
            console.error("ingredientsListSectionRef is null")
            return 0;
          } else {
            return Math.abs(ingredientTitle.getBoundingClientRect().top - ingredientsListSectionRef.current.getBoundingClientRect().top)
          }
        }
      );

      const min = Math.min(...distance);
      const upSideTitleIndex = distance.indexOf(min);
      const activeTitle = ingredientTitles[upSideTitleIndex].textContent;

      if (prevActiveTitleRef.current === null) {
        console.error('Ошибка связи с DOM')
      } else {
        if (activeTitle !== prevActiveTitleRef.current) {
          prevActiveTitleRef.current = activeTitle;
          setActiveTitle(prevActiveTitleRef.current)
        }
      }

    }
  }


  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const buns = ingredients.filter((item) => item.type === 'bun');

  return (
    <section className={ingredientsStyle.grid}>
      <ul className={ingredientsStyle.parts_list} onClickCapture={partsListClickHandler} ref={tabsListRef}>
        <li className={SELECTED_PART_ITEM} onClick={partItemClickHandler}><a href="#" className={SELECTED_REF}
          onClick={partItemRefClickHandler}>Булки</a></li>
        <li className={INACTIVE_PART_ITEM} onClick={partItemClickHandler}><a href="#" className={UNSELECTED_REF}
          onClick={partItemRefClickHandler}>Соусы</a></li>
        <li className={INACTIVE_PART_ITEM} onClick={partItemClickHandler}><a href="#" className={UNSELECTED_REF}
          onClick={partItemRefClickHandler}>Начинки</a></li>
      </ul>
      <section className={ingredientsStyle.ingredients} ref={ingredientsListSectionRef}
        onScroll={ingredientsListScrollHandler}>
        <h3 className={ingredientsStyle.ingredient_caption}>Булки</h3>
        <IngredientsList data={buns}/>
        <h3 className={ingredientsStyle.ingredient_caption}>Соусы</h3>
        <IngredientsList data={sauces}/>
        <h3 className={ingredientsStyle.ingredient_caption}>Начинки</h3>
        <IngredientsList data={mains}/>
      </section>
    </section>
  )
}

export default BurgerIngredients;
