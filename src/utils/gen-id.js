function genId () {
  let counter = 0;
  return (() => {return (counter += 1)})
}

export default genId
