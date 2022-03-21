import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import logo from '../../images/logo.png';
import menuStyle from './menu.module.css';


function Menu() {
  const INACTIVE_REF = `${menuStyle.menu_ref} text text_type_main-default text_color_inactive`;
  const ACTIVE_REF = `${menuStyle.menu_ref} text text_type_main-default`;

  const INACTIVE_PROFILE = `${menuStyle.menu_profile} text text_type_main-default text_color_inactive`

  return (
    <nav className={menuStyle.container}>
      <ul className={menuStyle.menu_list}>
        <li><a href={'#'} className={ACTIVE_REF}><BurgerIcon type="primary"/>Конструктор</a></li>
        <li><a href={'#'} className={INACTIVE_REF}><ListIcon type="secondary"/>Лента заказов</a></li>
      </ul>
      <a href={'#'} className={menuStyle.menu_logo}><img src={logo} style={{width: '290px'}}/></a>
      <a href={'#'} className={INACTIVE_PROFILE}><ProfileIcon type="secondary"/>Личный кабинет</a>
    </nav>
  )
};

export default Menu;
