// @ts-nocheck
import ErrorStyles from './error.module.css';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideErrorMessage} from '../../services/actions/action';
import Modal from '../modal/modal';

function Error() {
  const dispatch = useDispatch();
  const {showErrorMessage, errorMessage} = useSelector((state) => ({showErrorMessage: state.main.showErrorMessage, errorMessage: state.main.errorMessage}))


  const handleClosePopup = () => {
    dispatch(hideErrorMessage())
  }

  return showErrorMessage &&
    <Modal header={''} onClosePopup={handleClosePopup}>
      <section>
        <h1 className={ErrorStyles.error}>ERROR</h1>
        <h2 className={ErrorStyles.error}>STATUS: {errorMessage.errorMessage}</h2>
      </section>
    </Modal>
}

export default Error;
