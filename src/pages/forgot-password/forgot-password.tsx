//@ts-nocheck
import styles from './forgot-password.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

function ForgotPassword() {
  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Восстановление пароля</h1>
      <div className={'p-3'}/>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
      />
      <div className={'p-3'}/>
      <Button type="primary" size="large">Восстановить</Button>
      <div className={'p-10'}/>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link
        className={styles.page_ref}>Войти</Link></p>
    </section>
  )
}

export default ForgotPassword;
