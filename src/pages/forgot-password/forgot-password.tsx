//@ts-nocheck
import styles from './forgot-password.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../services/auth/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const {postRememberPasswordNotification} = useAuth();
  const dispatch = useDispatch();

  const handleEmailInputChange = useCallback((e) => setEmail(e.target.value));
  const handleRememberPasswordButtonClick = useCallback((e) => dispatch(postRememberPasswordNotification(email)))

  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Восстановление пароля</h1>
      <form className={`${styles.form} p-3`} onSubmit={handleRememberPasswordButtonClick}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleEmailInputChange}
          value={email}
        />
        <div className={'p-3'}/>
        <Button type="primary" size="large">Восстановить</Button>
        <div className={'p-10'}/>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link
          to={'/login'} className={styles.page_ref}>Войти</Link></p>
      </form>

    </section>
  )
}

export default ForgotPassword;
