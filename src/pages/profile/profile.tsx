//@ts-nocheck
import styles from './profile.module.css';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from 'react-router-dom';

const REF_CLASS = `text text_type_main-large text_color_inactive mb-3 mt-3`;

const ACTIVE_REF_STYLE = {color: 'white', textDecoration: 'none'};



function Profile() {
  return (
    <section className={styles.content}>
        <div className={styles.info}>
            <Input
              type={'text'}
              placeholder={`Имя`}
              icon={'EditIcon'}
              value={''}
              onChange={() => null}
            />
            <div className={'p-3'}/>
            <Input
              type={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              value={''}
              onChange={() => null}
            />
            <div className={'p-3'}/>
            <Input
              type={'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}
              value={''}
              onChange={() => null}
            />
        </div>
        <div className={styles.menu}>
            <NavLink to={'/profile'} exact={true} className={REF_CLASS} activeStyle={ACTIVE_REF_STYLE}>Профиль</NavLink>
            <NavLink to={'/profile/orders'} exact={true} className={REF_CLASS} activeStyle={ACTIVE_REF_STYLE}>История заказов</NavLink>
            <NavLink to={'/profile/orders/:id'} exact={true} className={REF_CLASS} activeStyle={ACTIVE_REF_STYLE}>Выход</NavLink>
        </div>
    </section>
  )
}

export default Profile;
