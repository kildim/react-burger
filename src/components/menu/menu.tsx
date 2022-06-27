// @ts-nocheck

import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useLocation} from 'react-router-dom';

import logo from '../../images/logo.png';
import menuStyle from './menu.module.css';

// const INACTIVE_REF = `${menuStyle.menu_ref} text text_type_main-default text_color_inactive`;
const ACTIVE_REF = `${menuStyle.menu_ref} text text_type_main-default`;
const INACTIVE_REF = `${menuStyle.menu_profile} text text_type_main-default text_color_inactive`

function Menu() {
  const location = useLocation();

  return (
    <nav className={menuStyle.container}>
      <ul className={menuStyle.menu_list}>
        <li><NavLink to={'/'} exact={true} className={INACTIVE_REF} activeClassName={ACTIVE_REF}><BurgerIcon type="secondary"/>Конструктор</NavLink></li>
        <li><a href={'#'} className={INACTIVE_REF}><ListIcon type="secondary"/>Лента заказов</a></li>
      </ul>
      <a href={'#'} className={menuStyle.menu_logo}><img src={logo} style={{width: '290px'}}/></a>
      <NavLink to={'/profile'} className={INACTIVE_REF} activeClassName={ACTIVE_REF}><ProfileIcon type="secondary"/>Личный кабинет</NavLink>
    </nav>
  )
};

export default Menu;
