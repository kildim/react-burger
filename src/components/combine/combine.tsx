import combineStyle from './combine.module.css';

function Combine() {
  return (
    <section className={combineStyle.grid}>
      <h1 className={`${combineStyle.caption} text text_type_main-large`}>Соберите бургер</h1>
    </section>
  )
}

export default Combine;
