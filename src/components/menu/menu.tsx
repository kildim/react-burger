import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink} from 'react-router-dom';

import logo from '../../images/logo.png';
import menuStyle from './menu.module.css';

const ACTIVE_REF = `${menuStyle.menu_ref} text text_type_main-default`;
const INACTIVE_REF = `${menuStyle.menu_profile} text text_type_main-default text_color_inactive`

function Menu() {

  return (
    <nav className={menuStyle.container}>
      <ul className={menuStyle.menu_list}>
        <li><NavLink to={'/'} exact={true} className={INACTIVE_REF} activeClassName={ACTIVE_REF}><BurgerIcon type="secondary"/>Конструктор</NavLink></li>
        <li><NavLink to={'/feed'} className={INACTIVE_REF} activeClassName={ACTIVE_REF}><ListIcon type="secondary"/>Лента заказов</NavLink></li>
      </ul>
      <Link to={'/'} className={menuStyle.menu_logo}><img src={logo} style={{width: '290px'}}/></Link>
      <NavLink to={'/profile'} className={INACTIVE_REF} activeClassName={ACTIVE_REF}><ProfileIcon type="secondary"/>Личный кабинет</NavLink>
    </nav>
  )
};

export default Menu;
