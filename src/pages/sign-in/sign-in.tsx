//@ts-nocheck
import styles from './sign-in.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

function SignIn() {
  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Вход</h1>
      <div className={'p-3'} />
        <Input
          type={'email'}
          placeholder={'e-mail'}
        />
      <div className={'p-3'} />
      <PasswordInput />
      <div className={'p-3'} />
      <Button type="primary" size="large">Войти</Button>
      <div className={'p-10'} />
      <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className={styles.page_ref}>Зарегистрироваться</Link></p>
      <div className={'p-2'} />
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className={styles.page_ref}>Восстановить пароль</Link></p>
    </section>
  )
}

export default SignIn;
