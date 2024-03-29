import styles from './profile.module.css';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, Route, Switch} from 'react-router-dom';
import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../../services/auth/auth';
// import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../index';
import OrdersHistory from '../../components/orders-history/orders-history';
import {ordersClose, ordersInit} from '../../services/actions/profile-ws-action';
import Loader from '../../components/loader/loader';
import {useAppDispatch, useAppSelector} from '../../services/app-hooks';

const REF_CLASS = `text text_type_main-large text_color_inactive mb-3 mt-3`;

const ACTIVE_REF_STYLE = {color: 'white', textDecoration: 'none'};

type TUserState = {
  name: string,
  email: string
}

function Profile() {
  const {signOut} = useAuth();
  const dispatch = useAppDispatch();
  const {name, email} = useAppSelector((store) => ({name: store.auth.nick, email: store.auth.email}));
  const [form, setValue] = useState({email: email, password: '', name: name});
  const isProfileDataLoading = useAppSelector((store) => (store.wsProfile.wsProfileDataLoading));



  const onChange = useCallback(e => {
    setValue({...form, [e.target.name]: e.target.value});
  }, []);
  const handleLogoutClick = useCallback(
    e => {
      e.preventDefault();
      dispatch(signOut())
    },
    [signOut]
  );

  useEffect(() => {
    dispatch(ordersInit())

    return (() => {
      dispatch(ordersClose())
    })
  }, []);


  return (
    isProfileDataLoading ? <Loader />
      :
    <section className={styles.content}>
      <Switch>
        <Route exact path="/profile">
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
        </Route>
        <Route exact path="/profile/orders">
          <div className={styles.history}>
            {/*{console.log(getCookie("authorization")?.slice(7))}*/}
            <OrdersHistory />
          </div>
        </Route>
      </Switch>
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
