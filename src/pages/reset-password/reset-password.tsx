import styles from './reset-password.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {SyntheticEvent, useCallback, useState} from 'react';
// import {useDispatch} from 'react-redux';
import {useAuth} from '../../services/auth/auth';
import {useAppDispatch} from '../../services/app-hooks';

type TFormControlEvent = SyntheticEvent & {target: {name: string, value: string}}

function ResetPassword() {
  const [form, setValue] = useState({password: '', token: ''});
  const {postResetPassword} = useAuth();

  const onChange = useCallback((e: TFormControlEvent) => {
    setValue({...form, [e.target.name]: e.target.value});
  }, []);
  const handleResetPasswordButtonClick = useCallback((e: SyntheticEvent) => dispatch(postResetPassword(form)), [])


  const dispatch = useAppDispatch();

  return (
    <section className={styles.content}>
      <h1 aria-label={'Страница авторизации'} className={'text text_type_main-large'}>Восстановление пароля</h1>
      <form className={`${styles.form} p-3`} onSubmit={handleResetPasswordButtonClick}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={onChange}
          icon={'ShowIcon'}
          value={form.password}
          name={'password'}
        />
        <div className={'p-3'}/>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.token}
          name={'token'}
        />
        <div className={'p-3'}/>
        <Button type="primary" size="large">Сохранить</Button>
        <div className={'p-3'}/>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={'/login'}
          className={styles.page_ref}>Войти</Link></p>
      </form>
    </section>
  )
}

export default ResetPassword;
