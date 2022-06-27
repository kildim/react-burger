//@ts-nocheck
import styles from './sign-in.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../services/auth/auth';


function SignIn() {
  const {isAuthenticated, signIn} = useAuth();
  const dispatch = useDispatch();

  console.log(isAuthenticated)


  const [form, setValue] = useState({email: '', password: ''});

  const onChange = e => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  const handleSignInClick = useCallback(
    e => {
      e.preventDefault();
      dispatch(signIn(form))
    },
    [signIn, form]
  );

  if (isAuthenticated) {
    return <Redirect to={'/'}/>
  }

  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Вход</h1>
      <div className={'p-3'}/>
      <Input
        type={'email'}
        placeholder={'e-mail'}
        name={'email'}
        value={form.email}
        onChange={onChange}
      />
      <div className={'p-3'}/>
      <PasswordInput
        name={'password'}
        value={form.password}
        onChange={onChange}
      />
      <div className={'p-3'}/>
      <Button type="primary" size="large" onClick={handleSignInClick}>Войти</Button>
      <div className={'p-10'}/>
      <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link to={'/register'}
        className={styles.page_ref}>Зарегистрироваться</Link></p>
      <div className={'p-2'}/>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to={'/forgot-password'}
        className={styles.page_ref}>Восстановить пароль</Link></p>
    </section>
  )
}

export default SignIn;
