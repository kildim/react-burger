// @ts-nocheck
import ErrorStyles from './error.module.css';

function Error(props) {
  const {error} = props
  return (
    <h2 className={ErrorStyles.error}>{error}</h2>
  )
}

export default Error;
