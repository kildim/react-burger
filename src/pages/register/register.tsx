//@ts-nocheck
import styles from './register.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

function Register() {
  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Регистрация</h1>
      <div className={'p-3'}/>
      <Input
        type={'text'}
        placeholder={'Имя'}
      />
      <div className={'p-3'}/>
      <Input
        type={'email'}
        placeholder={'e-mail'}
      />
      <div className={'p-3'}/>
      <PasswordInput/>
      <div className={'p-3'}/>
      <Button type="primary" size="large">Зарегистрироваться</Button>
      <div className={'p-10'}/>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link
        className={styles.page_ref}>Войти</Link></p>
    </section>
  )
}

export default Register;
