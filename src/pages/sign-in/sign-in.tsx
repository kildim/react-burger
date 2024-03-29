import styles from './sign-in.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {SyntheticEvent, useCallback, useState} from 'react';
// import {useDispatch} from 'react-redux';
import {useAuth} from '../../services/auth/auth';
import {useAppDispatch} from '../../services/app-hooks';

type TFormControlEvent = SyntheticEvent & {target: {name: string, value: string}};
type TLocationPath = {from: {pathname: string}}  | undefined;

function SignIn() {
  const {isAuthenticated, signIn} = useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocationPath>();

  const [form, setValue] = useState({email: '', password: ''});

  const onChange = (e: TFormControlEvent) => {
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
    const {from} = location.state || {from: {pathname: '/'}};
    history.push(from);
  }

  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Вход</h1>
      <form className={`${styles.form} p-3`} onSubmit={handleSignInClick}>
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
        <Button type="primary" size="large">Войти</Button>
        <div className={'p-10'}/>
        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link to={'/register'}
          className={styles.page_ref}>Зарегистрироваться</Link></p>
        <div className={'p-2'}/>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to={'/forgot-password'}
          className={styles.page_ref}>Восстановить пароль</Link></p>
      </form>
    </section>
  )
}

export default SignIn;
