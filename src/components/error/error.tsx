import ErrorStyles from './error.module.css';
import {ErrorProps} from './error.d'

function Error(props: ErrorProps) {
  const {error} = props
  return (
    <>
      <h1 className={ErrorStyles.error}>ERROR</h1>
      <h2 className={ErrorStyles.error}>STATUS: {error}</h2>
    </>
  )
}

export default Error;
