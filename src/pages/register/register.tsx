import styles from './register.module.css';
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {SyntheticEvent, useCallback, useState} from 'react';
import {useAuth} from '../../services/auth/auth';
import {useDispatch} from 'react-redux';

function Register() {
  const {postRegister} = useAuth();
  const [form, setValue] = useState({email: '', password: '', name: ''});
  const dispatch = useDispatch();

  type TFormControlEvent = SyntheticEvent & {target: {name: string, value: string}}

  const onChange = (e: TFormControlEvent) => {
    setValue({...form, [e.target.name]: e.target.value});
  };
  const handleRegisterClick = useCallback(
    e => {
      e.preventDefault();
      dispatch(postRegister(form));
    },
    [postRegister, form]
  );

  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Регистрация</h1>
      <div className={'p-3'}/>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        name={'name'}
        value={form.name}
      />
      <div className={'p-3'}/>
      <Input
        type={'email'}
        placeholder={'e-mail'}
        onChange={onChange}
        value={form.email}
        name={'email'}
      />
      <div className={'p-3'}/>
      <PasswordInput
        onChange={onChange}
        name={'password'}
        value={form.password}
      />
      <div className={'p-3'}/>
      <Button type="primary" size="large" onClick={handleRegisterClick}>Зарегистрироваться</Button>
      <div className={'p-10'}/>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link
        to={'/login'} className={styles.page_ref}>Войти</Link></p>
    </section>
  )
}

export default Register;
