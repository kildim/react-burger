//@ts-nocheck
import styles from './profile.module.css';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from 'react-router-dom';
import {useCallback, useState} from 'react';
import {useAuth} from '../../services/auth/auth';
import {useDispatch, useSelector} from 'react-redux';

const REF_CLASS = `text text_type_main-large text_color_inactive mb-3 mt-3`;

const ACTIVE_REF_STYLE = {color: 'white', textDecoration: 'none'};


function Profile() {
  const {signOut} = useAuth();
  const dispatch = useDispatch();
  const {name, email} = useSelector((store) => ({name: store.auth.name, email: store.auth.email}));
  const [form, setValue] = useState({email: email, password: '', name: name});


  const onChange = useCallback(e => {
    setValue({...form, [e.target.name]: e.target.value});
  });
  const handleLogoutClick = useCallback(
    e => {
      e.preventDefault();
      dispatch(signOut())
    },
    [signOut]
  );


  return (
    <section className={styles.content}>
      <div className={styles.info}>
        <Input
          type={'text'}
          placeholder={`Имя`}
          icon={'EditIcon'}
          value={''}
          name={'name'}
          onChange={onChange}
        />
        <div className={'p-3'}/>
        <Input
          type={'email'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          value={''}
          name={'email'}
          onChange={onChange}
        />
        <div className={'p-3'}/>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          value={''}
          name={'password'}
          onChange={onChange}
        />
      </div>
      <div className={styles.menu}>
        <NavLink to={'/profile'} exact={true} className={REF_CLASS} activeStyle={ACTIVE_REF_STYLE}>Профиль</NavLink>
        <NavLink to={'/profile/orders'} exact={true} className={REF_CLASS} activeStyle={ACTIVE_REF_STYLE}>История
          заказов</NavLink>
        <NavLink to={'/'} exact={true} className={REF_CLASS} activeStyle={ACTIVE_REF_STYLE}
          onClick={handleLogoutClick}>Выход</NavLink>
      </div>
    </section>
  )
}

export default Profile;
