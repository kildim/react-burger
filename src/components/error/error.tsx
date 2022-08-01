import ErrorStyles from './error.module.css';
import React from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {hideErrorMessage} from '../../services/actions/action';
import Modal from '../modal/modal';
import {RootState} from '../../index';
import {useAppDispatch, useAppSelector} from '../../services/app-hooks';

type TErrorState = {showErrorMessage: boolean, errorMessage: string | null}

function Error(): JSX.Element {
  const dispatch = useAppDispatch();
  const {showErrorMessage, errorMessage} = useAppSelector((state) => ({showErrorMessage: state.main.showErrorMessage, errorMessage: state.main.errorMessage}));


  const handleClosePopup = () => {
    dispatch(hideErrorMessage())
  }

  return {showErrorMessage} &&
    <Modal header={''} onClosePopup={handleClosePopup}>
      <section>
        <h1 className={ErrorStyles.error}>ERROR</h1>
        <h2 className={ErrorStyles.error}>{`STATUS: ${errorMessage}`}</h2>
      </section>
    </Modal>
}

export default Error;
