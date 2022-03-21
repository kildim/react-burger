import combineStyle from './combine.module.css';

const CAPTION_STYLE = `${combineStyle.caption} text text_type_main-large`;
function Combine() {
  return (
    <section className={combineStyle.grid}>
      <h1 className={CAPTION_STYLE}>Соберите бургер</h1>
    </section>
  )
}

export default Combine;
