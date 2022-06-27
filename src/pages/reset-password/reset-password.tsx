//@ts-nocheck
import styles from './reset-password.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../services/auth/auth';

function ResetPassword() {
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const {postResetPassword} = useAuth();

  const handleEmailInputChange = useCallback((e) => setPassword(e.target.value));
  const handleTokenInputChange = useCallback((e) => setToken(e.target.value));
  const handleResetPasswordButtonClick = useCallback((e) => dispatch(postResetPassword({password: password, token: token})))


  const dispatch = useDispatch();

  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Восстановление пароля</h1>
      <div className={'p-3'}/>
      <Input
        type={'password'}
        placeholder={'Введите новый пароль'}
        onChange={handleEmailInputChange}
        icon={'ShowIcon'}
      />
      <div className={'p-3'}/>
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={handleTokenInputChange}
      />
      <div className={'p-3'}/>
      <Button type="primary" size="large" onClick={handleResetPasswordButtonClick}>Сохранить</Button>
      <div className={'p-10'}/>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={'/login'}
        className={styles.page_ref}>Войти</Link></p>
    </section>
  )
}

export default ResetPassword;
