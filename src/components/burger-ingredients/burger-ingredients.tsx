// @ts-nocheck
import IngredientsList from '../ingredients-list/ingredients-list';

import ingredientsStyle from './burger-ingredients.module.css';
import {useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';

const SELECTED_PART_ITEM = `${ingredientsStyle.part_item} ${ingredientsStyle.part_item__selected}`;
const INACTIVE_PART_ITEM = `${ingredientsStyle.part_item}`;
const UNSELECTED_REF = `${ingredientsStyle.part_ref__unselected} text text_type_main-default text_color_inactive`;
const SELECTED_REF = `${ingredientsStyle.part_ref} text text_type_main-default`;


function BurgerIngredients() {
  const ingredientsListSectionRef = useRef(null);
  const tabsListRef = useRef(null);
  const prevActiveTitleRef = useRef(null);
  const [ingredientTitles, setIngredientTitles] = useState(null);

  // Запоминаю в ingredientTitles массив ссылок на DOM элементы заголовков ингредиентов
  useEffect(() => {
    setIngredientTitles(Array.from(ingredientsListSectionRef.current.querySelectorAll('h3')));
    prevActiveTitleRef.current = 'Булки'
  }, [])

  const {ingredients} = useSelector((store) => ({
    ingredients: store.ingredients,
  }))

  if (ingredients.length === 0) {
    return null
  }

  const unSelectTabsListItems = () => {
    tabsListRef.current.querySelectorAll('li').forEach((listItem) => {
      const listItemRef = listItem.firstChild;

      listItem.classList.remove(`${ingredientsStyle.part_item__selected}`);
      listItemRef.classList.remove(`${ingredientsStyle.part_ref}`);
      listItemRef.classList.add(`${ingredientsStyle.part_ref__unselected}`, 'text_color_inactive')
    })
  }

  const findTabItemByText = (tabText) => {
    const tabsItems = Array.from(tabsListRef.current.querySelectorAll('li'));
    return tabsItems.find( (tabsItem) => (tabsItem.firstChild.textContent === tabText))
  }

  const addPartItemRefSelection = (partItem) => {
    partItem.classList.remove(`${ingredientsStyle.part_ref__unselected}`, `${ingredientsStyle.text_color_inactive}`);
    partItem.classList.add(`${ingredientsStyle.part_ref}`);
  }

  const addPartItemSelection = (activeTabItem) => {
    activeTabItem.classList.add(`${ingredientsStyle.part_item__selected}`)
  }

  const setActiveTitle = (activeTitleText) => {
    const activeTabItem = findTabItemByText(activeTitleText);
    unSelectTabsListItems();
    addPartItemRefSelection(activeTabItem.firstChild);
    addPartItemSelection(activeTabItem);
  }

  const partItemRefClickHandler = (e) => {
    // Задаю стили выбранного соответствующему табу
    // addPartItemRefSelection(e.currentTarget);
    setActiveTitle(e.currentTarget.textContent);

    // Прокручиваю список, чтобы выбранный в табе ингредиент отобразился вверху списка
    ingredientTitles.find((ingredientHeader) => (e.currentTarget.textContent === ingredientHeader.textContent)).scrollIntoView();
  };

  const partItemClickHandler = (e) => {
    e.currentTarget.classList.add(`${ingredientsStyle.part_item__selected}`);
  }

  const partsListClickHandler = (e) => {
    unSelectTabsListItems();
  }

  const ingredientsListScrollHandler = (e) => {

    // Создаю массив расстояний от заголовка ингридиента до верхней границы элемента-контэйнера
    const distance = ingredientTitles.map(
      (ingredientTitle) =>
        (Math.abs(ingredientTitle.getBoundingClientRect().top - ingredientsListSectionRef.current.getBoundingClientRect().top))
    );

    const min = Math.min(...distance);
    const upSideTitleIndex = distance.indexOf(min);
    const activeTitle = ingredientTitles[upSideTitleIndex].textContent;

    if ( activeTitle !== prevActiveTitleRef.current) {
      prevActiveTitleRef.current = activeTitle;
      setActiveTitle(prevActiveTitleRef.current)
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
